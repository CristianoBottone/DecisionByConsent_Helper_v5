// Dizionario multilingua

const dictionary = {
    it: {
        // Pagina di selezione lingua
        languageTitle: "Scegli una lingua / Choose a language",
        languageItalian: "Italiano",
        languageEnglish: "English",

        // Navbar
        navLanguage: "Lingua",
        navStart: "Cominciamo",
        navPreparation: "Preparazione",
        navDriver: "Driver",
        navProposal: "Proposta",
        navClarifications: "Chiarimenti",
        navReactions: "Reazioni",
        navObjections: "Obiezioni",
        navConcerns: "Preoccupazioni",
        navSave: "Salva",

        // Starter page
        starterTitle: "Cominciamo",
        btnNewActivity: "Nuova attività",
        btnLoadActivity: "Carica un'attività",

        // Preparation page
        preparationTitle: "Aggiungi i partecipanti",

        // Driver/Proposta/Preoccupazioni/ ecc. pages
        driverTitle: "Driver",
        proposalTitle: "Proposta",
        concernsTitle: "Preoccupazioni",
        clarificationsTitle: "Chiarimenti",
        reactionsTitle: "Reazioni",
        objectionsTitle: "Obiezioni",
        driverPlaceholder: "Inserisci qui il testo del driver...",
        proposalPlaceholder: "Inserisci qui il testo della Proposta...",
        concernsPlaceholder: "Inserisci qui Preoccupazioni o Note...",
        txteditorBold: "Grassetto",
        txteditorItalic: "Corsivo",
        txteditorRed: "Rosso",
        txteditorBlue: "Blu",
        txteditorBlack: "Nero",
        txteditorHighlighted: "Evidenziato",

        // Form
        formName: "Nome",
        formSurname: "Cognome",
        btnAdd: "Aggiungi",
        btnEdit: "Modifica",
        btnDelete: "Elimina",

        // Tabella
        tableName: "Nome",
        tableActions: "Azioni",
        btnUpdate: "Aggiorna",

        // Messaggi
        emptyState: "Nessun dato presente. Aggiungi il primo nome!",
        emptyParticipants: "Nessun partecipante. Vai a Preparazione per aggiungerne.",
        alertRequired: "Per favore, inserisci il nome",
        confirmDelete: "Sei sicuro di voler eliminare questa persona?",
        noDataToDownload: "Non ci sono dati da scaricare",
        loadSuccess: "Persone caricate con successo!",
        fileError: "Il file deve contenere un array di persone",
        personError: "Ogni persona deve avere un nome",
        confirmReplace: "Ci sono già dati salvati. Vuoi sostituirli con i dati del file?",
        readError: "Errore nella lettura del file",
        loadError: "Errore nel caricamento del file: ",
        confirmNewActivity: "Avviando una nuova attività tutti i dati dell'attività in corso verranno cancellati. Vuoi procedere?",

        // Azioni
        download: "Scarica",
        upload: "Carica",

        // Save options
        saveAsJSON: "Salva come JSON",
        saveAsPDF: "Salva come PDF",
        savePDFSuccess: "PDF scaricato con successo!",
        savePDFError: "Errore nel salvataggio del PDF: "
    },

    en: {
        // Language selection page
        languageTitle: "Scegli una lingua / Choose a language",
        languageItalian: "Italiano",
        languageEnglish: "English",

        // Navbar
        navLanguage: "Language",
        navStart: "Let's Begin",
        navPreparation: "Preparation",
        navDriver: "Driver",
        navProposal: "Proposal",
        navClarifications: "Clarifications",
        navReactions: "Reactions",
        navObjections: "Objections",
        navConcerns: "Concerns",
        navSave: "Save",

        // Starter page
        starterTitle: "Let's Begin",
        btnNewActivity: "New Activity",
        btnLoadActivity: "Load an Activity",

        // Preparation page
        preparationTitle: "Add Participants",

        // Driver/Proposal/Concerns pages
        driverTitle: "Driver",
        proposalTitle: "Proposal",
        concernsTitle: "Concerns",
        reactionsTitle: "Reactions",
        objectionsTitle: "Objections",
        clarificationsTitle: "Clarifications",
        driverPlaceholder: "Enter Driver text here...",
        proposalPlaceholder: "Enter Proposal text here...",
        concernsPlaceholder: "Enter Concerns or Notes here...",
        txteditorBold: "Bold",
        txteditorItalic: "Italic",
        txteditorBlack: "Black",
        txteditorRed: "Red",
        txteditorBlue: "Blue",
        txteditorHighlighted: "Highlighted",

        // Form
        formName: "Name",
        formSurname: "Surname",
        btnAdd: "Add",
        btnEdit: "Edit",
        btnDelete: "Delete",

        // Table
        tableName: "Name",
        tableActions: "Actions",
        btnUpdate: "Update",

        // Messages
        emptyState: "No data available. Add the first name!",
        emptyParticipants: "No participants. Go to Preparation to add some.",
        alertRequired: "Please enter the name",
        confirmDelete: "Are you sure you want to delete this person?",
        noDataToDownload: "No data to download",
        loadSuccess: "people loaded successfully!",
        fileError: "The file must contain an array of people",
        personError: "Each person must have a name",
        confirmReplace: "There is already saved data. Do you want to replace it with the file data?",
        readError: "Error reading file",
        loadError: "Error loading file: ",
        confirmNewActivity: "Starting a new activity will delete all data from the current activity. Do you want to proceed?",

        // Actions
        download: "Download",
        upload: "Upload",

        // Save options
        saveAsJSON: "Save as JSON",
        saveAsPDF: "Save as PDF",
        savePDFSuccess: "PDF downloaded successfully!",
        savePDFError: "Error saving PDF: "
    }
};

// Lingua corrente (default: italiano)
let currentLanguage = localStorage.getItem('language') || 'it';

// Funzione per impostare la lingua
function setLanguage(lang) {
    if (dictionary[lang]) {
        currentLanguage = lang;
        localStorage.setItem('language', lang);
        return true;
    }
    return false;
}

// Funzione per ottenere una traduzione
function getText(key) {
    return dictionary[currentLanguage][key] || key;
}

// Funzione per ottenere la lingua corrente
function getCurrentLanguage() {
    return currentLanguage;
}

// Funzione per aggiornare i testi della pagina
function updatePageTexts() {
    // Aggiorna tutti gli elementi con attributo data-text
    document.querySelectorAll('[data-text]').forEach(element => {
        const key = element.getAttribute('data-text');
        const text = getText(key);

        if (element.tagName === 'INPUT' && element.type !== 'submit') {
            element.placeholder = text;
        } else {
            element.textContent = text;
        }
    });

    // Aggiorna placeholder per contenteditable
    document.querySelectorAll('[data-text-placeholder]').forEach(element => {
        const key = element.getAttribute('data-text-placeholder');
        const text = getText(key);
        element.setAttribute('data-placeholder', text);
    });
}

// Export per uso nei moduli (opzionale) - compatibile con browser e Node.js
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    try {
        module.exports = { dictionary, setLanguage, getText, getCurrentLanguage, updatePageTexts };
    } catch (e) {
        // Ignora errori su browser che non supportano module.exports
        console.log('Module exports not available in browser context');
    }
}
