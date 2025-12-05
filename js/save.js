// Create readable PDF document
// Note: This requires jsPDF library to be loaded via CDN in HTML

// Helper function to strip HTML tags and decode entities
function stripHTML(html) {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}

// Helper function to extract text from Quill Delta format
function extractTextFromQuill(content) {
    try {
        // Check if content is a Quill Delta JSON string
        if (typeof content === 'string' && content.trim().startsWith('{')) {
            const delta = JSON.parse(content);
            if (delta.ops && Array.isArray(delta.ops)) {
                // Extract text from all ops
                return delta.ops.map(op => {
                    if (typeof op.insert === 'string') {
                        return op.insert;
                    }
                    return '';
                }).join('');
            }
        }
        // If not Quill format, return as is
        return content;
    } catch (e) {
        // If parsing fails, return original content
        return content;
    }
}

// Helper function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Function to save data as PDF
function saveAsPDF(data, filename) {
    const doc = new window.jspdf.jsPDF();

    // Set document properties
    doc.setProperties({
        title: 'Decision By Consent - Session Report',
        subject: 'Decision Making Process',
        author: 'Decision By Consent Helper',
        keywords: 'decision, consent, meeting',
        creator: 'Decision By Consent Helper v5'
    });

    let yPosition = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - (margin * 2);

    // Title
    doc.setFontSize(20);
    doc.setFont(undefined, 'bold');
    doc.text('Decision By Consent', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 10;

    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text('Session Report', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;

    // Date and language info
    doc.setFontSize(10);
    doc.setTextColor(100);
    if (data.savedAt) {
        doc.text(`Date: ${formatDate(data.savedAt)}`, margin, yPosition);
        yPosition += 6;
    }
    if (data.language) {
        doc.text(`Language: ${data.language.toUpperCase()}`, margin, yPosition);
        yPosition += 10;
    }

    doc.setTextColor(0);

    // Function to check if we need a new page
    const checkNewPage = (spaceNeeded) => {
        if (yPosition + spaceNeeded > pageHeight - margin) {
            doc.addPage();
            yPosition = margin;
            return true;
        }
        return false;
    };

    // Function to add a section
    const addSection = (title, content) => {
        checkNewPage(30);

        // Section title
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(0, 102, 204); // Blue color
        doc.text(title, margin, yPosition);
        yPosition += 8;

        // Underline
        doc.setDrawColor(0, 102, 204);
        doc.setLineWidth(0.5);
        doc.line(margin, yPosition, pageWidth - margin, yPosition);
        yPosition += 6;

        doc.setTextColor(0);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(10);

        if (content) {
            // First extract text from Quill format if needed
            let textContent = extractTextFromQuill(content);
            // Then strip any remaining HTML
            const cleanContent = stripHTML(textContent);
            if (cleanContent.trim()) {
                const lines = doc.splitTextToSize(cleanContent, maxWidth);

                lines.forEach(line => {
                    checkNewPage(7);
                    doc.text(line, margin, yPosition);
                    yPosition += 5;
                });
            } else {
                doc.setTextColor(150);
                doc.text('(No content)', margin, yPosition);
                yPosition += 5;
                doc.setTextColor(0);
            }
        }

        yPosition += 8;
    };

    // Participants section
    if (data.persons && data.persons.length > 0) {
        checkNewPage(40);

        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(0, 102, 204);
        doc.text('Participants', margin, yPosition);
        yPosition += 8;

        doc.setDrawColor(0, 102, 204);
        doc.setLineWidth(0.5);
        doc.line(margin, yPosition, pageWidth - margin, yPosition);
        yPosition += 10;

        doc.setTextColor(0);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(10);

        // Create table data
        const tableData = data.persons.map((person, index) => [
            (index + 1).toString(),
            person.name
        ]);

        doc.autoTable({
            startY: yPosition,
            head: [['#', 'Name']],
            body: tableData,
            theme: 'striped',
            headStyles: {
                fillColor: [0, 102, 204],
                textColor: 255,
                fontStyle: 'bold'
            },
            styles: {
                fontSize: 10,
                cellPadding: 3
            },
            margin: { left: margin, right: margin },
            didDrawPage: function (data) {
                yPosition = data.cursor.y + 10;
            }
        });

        yPosition = doc.lastAutoTable.finalY + 15;
    }

    // Contents sections
    if (data.contents) {
        // Driver
        if (data.contents.driver) {
            addSection('Driver', data.contents.driver);
        }

        // Proposal
        if (data.contents.proposal) {
            addSection('Proposal', data.contents.proposal);
        }

        // Clarifications
        if (data.contents.clarifications) {
            try {
                const clarData = JSON.parse(data.contents.clarifications);
                let clarText = '';

                if (clarData && typeof clarData === 'object') {
                    Object.entries(clarData).forEach(([person, content]) => {
                        if (content && content.trim()) {
                            clarText += `\n${person}:\n${stripHTML(content)}\n`;
                        }
                    });
                }

                if (clarText.trim()) {
                    addSection('Clarifications', clarText);
                }
            } catch (e) {
                addSection('Clarifications', data.contents.clarifications);
            }
        }

        // Reactions
        if (data.contents.reactions) {
            try {
                const reactData = JSON.parse(data.contents.reactions);
                let reactText = '';

                if (reactData && typeof reactData === 'object') {
                    Object.entries(reactData).forEach(([person, content]) => {
                        if (content && content.trim()) {
                            reactText += `\n${person}:\n${stripHTML(content)}\n`;
                        }
                    });
                }

                if (reactText.trim()) {
                    addSection('Reactions', reactText);
                }
            } catch (e) {
                addSection('Reactions', data.contents.reactions);
            }
        }

        // Objections
        if (data.contents.objections) {
            try {
                const objData = JSON.parse(data.contents.objections);
                let objText = '';

                if (objData && typeof objData === 'object') {
                    Object.entries(objData).forEach(([person, content]) => {
                        if (content && content.trim()) {
                            objText += `\n${person}:\n${stripHTML(content)}\n`;
                        }
                    });
                }

                if (objText.trim()) {
                    addSection('Objections', objText);
                }
            } catch (e) {
                addSection('Objections', data.contents.objections);
            }
        }

        // Concerns
        if (data.contents.concerns) {
            addSection('Concerns', data.contents.concerns);
        }
    }

    // Footer on last page
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
        'Generated by Decision By Consent Helper v5',
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
    );

    // Save the PDF
    doc.save(filename);
};

// Make function available globally if needed
if (typeof window !== 'undefined') {
    window.saveAsPDF = saveAsPDF;
}