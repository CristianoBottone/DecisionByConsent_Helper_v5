// Chiave per localStorage
const STORAGE_KEY = 'personList';

// Variabile per tracciare la modifica
let editingIndex = null;

// Evidenzia la voce di menu attiva
function highlightActiveMenuItem() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.navbar a[href]');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Esegui all'avvio
if (document.querySelector('.navbar')) {
    highlightActiveMenuItem();
}

// Elementi DOM
const personForm = document.getElementById('personForm');
const nameInput = document.getElementById('nameInput');
const submitBtn = document.getElementById('submitBtn');
const tableBody = document.getElementById('tableBody');
const downloadBtn = document.getElementById('downloadBtn');
const uploadBtn = document.getElementById('uploadBtn');
const fileInput = document.getElementById('fileInput');

// Carica i dati dal localStorage
function loadData() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

// Salva i dati nel localStorage
function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Renderizza la tabella
function renderTable() {
    const persons = loadData();

    if (persons.length === 0) {
        tableBody.innerHTML = `
            <tr class="empty-state">
                <td colspan="2" data-text="emptyState">${getText('emptyState')}</td>
            </tr>
        `;
        return;
    }

    tableBody.innerHTML = persons.map((person, index) => `
        <tr>
            <td>${escapeHtml(person.name)}</td>
            <td class="action-buttons">
                <button class="btn-edit" onclick="editPerson(${index})" data-text="btnEdit">${getText('btnEdit')}</button>
                <button class="btn-delete" onclick="deletePerson(${index})" data-text="btnDelete">${getText('btnDelete')}</button>
            </td>
        </tr>
    `).join('');
}

// Escape HTML per prevenire XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Aggiungi o modifica persona
if (personForm) {
    personForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const input = nameInput.value.trim();

        if (!input) {
            alert(getText('alertRequired'));
            return;
        }

        const persons = loadData();

        if (editingIndex !== null) {
            // Modifica persona esistente (un solo nome)
            persons[editingIndex] = { name: input };
            editingIndex = null;
            submitBtn.textContent = getText('btnAdd');
            submitBtn.setAttribute('data-text', 'btnAdd');
            saveData(persons);
            renderTable();
        } else {
            // Verifica se ci sono più nomi separati da virgola
            const names = input.split(',').map(name => name.trim()).filter(name => name.length > 0);

            // Aggiungi tutti i nomi
            names.forEach(name => {
                persons.push({ name });
            });

            saveData(persons);
            renderTable();
        }

        // Reset form
        nameInput.value = '';
        nameInput.focus();
    });
}

// Modifica persona
function editPerson(index) {
    const persons = loadData();
    const person = persons[index];

    nameInput.value = person.name;
    editingIndex = index;
    submitBtn.textContent = getText('btnUpdate');
    submitBtn.setAttribute('data-text', 'btnUpdate');
    nameInput.focus();
}

// Elimina persona
function deletePerson(index) {
    if (!confirm(getText('confirmDelete'))) {
        return;
    }

    const persons = loadData();
    persons.splice(index, 1);
    saveData(persons);
    renderTable();

    // Reset form se stavi modificando la persona eliminata
    if (editingIndex === index) {
        editingIndex = null;
        submitBtn.textContent = getText('btnAdd');
        submitBtn.setAttribute('data-text', 'btnAdd');
        nameInput.value = '';
    }
}

// Function to gather all data for export
function gatherExportData() {
    const persons = loadData();

    // Raccogli tutti i contenuti degli editor dal localStorage
    const editorContents = {};

    // Driver
    const driverContent = localStorage.getItem('driverContent');
    if (driverContent) {
        editorContents.driver = driverContent;
    }

    // Proposta
    const proposalContent = localStorage.getItem('proposalContent');
    if (proposalContent) {
        editorContents.proposal = proposalContent;
    }

    // Chiarimenti
    const clarificationsData = localStorage.getItem('clarificationsData');
    if (clarificationsData) {
        editorContents.clarifications = clarificationsData;
    }

    // Reazioni
    const reactionsData = localStorage.getItem('reactionsData');
    if (reactionsData) {
        editorContents.reactions = reactionsData;
    }

    // Obiezioni
    const objectionsData = localStorage.getItem('objectionsData');
    if (objectionsData) {
        editorContents.objections = objectionsData;
    }

    // Preoccupazioni
    const concernsContent = localStorage.getItem('concernsContent');
    if (concernsContent) {
        editorContents.concerns = concernsContent;
    }

    // Crea un oggetto con tutti i dati
    return {
        language: getCurrentLanguage(),
        persons: persons,
        contents: editorContents,
        savedAt: new Date().toISOString()
    };
}

// Function to download as JSON
function downloadAsJSON() {
    const exportData = gatherExportData();

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });

    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Decisione_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Function to download as PDF
function downloadAsPDF() {
    try {
        // Check if jsPDF is available
        if (typeof window.jspdf === 'undefined' && typeof window.jsPDF === 'undefined') {
            alert('PDF library not loaded. Please refresh the page and try again.');
            return;
        }

        const exportData = gatherExportData();
        const filename = `Decisione_${new Date().toISOString().split('T')[0]}.pdf`;

        // Use the saveAsPDF function from save.js
        if (typeof window.saveAsPDF === 'function') {
            window.saveAsPDF(exportData, filename);
        } else {
            alert(getText('savePDFError') + 'Function not available');
        }
    } catch (error) {
        console.error('PDF Error:', error);
        alert(getText('savePDFError') + error.message);
    }
}

// Scarica - Show menu
if (downloadBtn) {
    downloadBtn.addEventListener('click', function (e) {
        e.preventDefault();

        // Create a simple menu
        const menu = document.createElement('div');
        menu.style.cssText = `
            position: absolute;
            background: white;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            padding: 8px 0;
            z-index: 1000;
        `;

        // Create JSON option
        const jsonOption = document.createElement('a');
        jsonOption.href = '#';
        jsonOption.textContent = getText('saveAsJSON');
        jsonOption.style.cssText = `
            display: block;
            padding: 8px 16px;
            text-decoration: none;
            color: #333;
            cursor: pointer;
        `;
        jsonOption.onmouseover = function () { this.style.backgroundColor = '#f0f0f0'; };
        jsonOption.onmouseout = function () { this.style.backgroundColor = 'transparent'; };
        jsonOption.onclick = function (ev) {
            ev.preventDefault();
            downloadAsJSON();
            if (menu.parentNode) {
                document.body.removeChild(menu);
            }
        };

        // Create PDF option
        const pdfOption = document.createElement('a');
        pdfOption.href = '#';
        pdfOption.textContent = getText('saveAsPDF');
        pdfOption.style.cssText = `
            display: block;
            padding: 8px 16px;
            text-decoration: none;
            color: #333;
            cursor: pointer;
        `;
        pdfOption.onmouseover = function () { this.style.backgroundColor = '#f0f0f0'; };
        pdfOption.onmouseout = function () { this.style.backgroundColor = 'transparent'; };
        pdfOption.onclick = function (ev) {
            ev.preventDefault();
            downloadAsPDF();
            if (menu.parentNode) {
                document.body.removeChild(menu);
            }
        };

        menu.appendChild(jsonOption);
        menu.appendChild(pdfOption);

        // Position menu near the button
        const rect = downloadBtn.getBoundingClientRect();
        menu.style.top = (rect.bottom + window.scrollY) + 'px';
        menu.style.left = (rect.left + window.scrollX) + 'px';

        document.body.appendChild(menu);

        // Close menu when clicking outside
        setTimeout(() => {
            document.addEventListener('click', function closeMenu(event) {
                if (!menu.contains(event.target) && event.target !== downloadBtn) {
                    if (document.body.contains(menu)) {
                        document.body.removeChild(menu);
                    }
                    document.removeEventListener('click', closeMenu);
                }
            });
        }, 100);
    });
}

// Apri dialog per caricare fileA
if (uploadBtn) {
    uploadBtn.addEventListener('click', function () {
        fileInput.click();
    });
}

// Carica JSON
if (fileInput) {
    fileInput.addEventListener('change', function (e) {
        const file = e.target.files[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.onload = function (event) {
            try {
                const data = JSON.parse(event.target.result);

                let persons = [];
                let language = null;

                // Verifica se il file ha il nuovo formato con lingua
                if (data.language && data.persons) {
                    language = data.language;
                    persons = data.persons;
                } else if (Array.isArray(data)) {
                    // Supporto per vecchio formato (solo array)
                    persons = data;
                } else {
                    throw new Error(getText('fileError'));
                }

                // Valida il formato dei dati
                if (!Array.isArray(persons)) {
                    throw new Error(getText('fileError'));
                }

                for (const person of persons) {
                    if (!person.name) {
                        throw new Error(getText('personError'));
                    }
                }

                // Chiedi conferma se ci sono già dati
                const existingData = loadData();
                if (existingData.length > 0) {
                    if (!confirm(getText('confirmReplace'))) {
                        fileInput.value = '';
                        return;
                    }
                }

                // Imposta la lingua se presente
                if (language) {
                    setLanguage(language);
                    updatePageTexts();
                }

                saveData(persons);

                // Ripristina i contenuti degli editor se presenti
                if (data.contents) {
                    if (data.contents.driver) {
                        localStorage.setItem('driverContent', data.contents.driver);
                    }
                    if (data.contents.proposal) {
                        localStorage.setItem('proposalContent', data.contents.proposal);
                    }
                    if (data.contents.clarifications) {
                        localStorage.setItem('clarificationsData', data.contents.clarifications);
                    }
                    if (data.contents.reactions) {
                        localStorage.setItem('reactionsData', data.contents.reactions);
                    }
                    if (data.contents.objections) {
                        localStorage.setItem('objectionsData', data.contents.objections);
                    }
                    if (data.contents.concerns) {
                        localStorage.setItem('concernsContent', data.contents.concerns);
                    }
                }

                // Se siamo nella pagina starter, reindirizza a preparation
                if (window.location.pathname.includes('starter.html')) {
                    window.location.href = 'preparation.html';
                } else if (tableBody) {
                    // Se siamo in preparation, aggiorna la tabella
                    renderTable();
                }

                alert(`${persons.length} ${getText('loadSuccess')}`);

            } catch (error) {
                alert(getText('loadError') + error.message);
            }

            // Reset input file
            fileInput.value = '';
        };

        reader.onerror = function () {
            alert(getText('readError'));
            fileInput.value = '';
        };

        reader.readAsText(file);
    });
}

// Inizializza l'applicazione (solo se c'è la tabella)
if (tableBody) {
    renderTable();
}
