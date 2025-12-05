// participants_inputs.js
// Gestisce i campi di input per ogni partecipante con toggle visibility

// Carica i dati dei partecipanti
function loadPersons() {
    const data = localStorage.getItem('personList');
    return data ? JSON.parse(data) : [];
}

// Genera i blocchi per ogni partecipante
function generateParticipantBlocks(containerSelector, storageKey) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const persons = loadPersons();
    
    // Pulisci il contenitore
    container.innerHTML = '';

    // Se non ci sono partecipanti, mostra un messaggio
    if (persons.length === 0) {
        container.innerHTML = `<div class="empty-state">${getText('emptyParticipants')} <a href="preparation.html">${getText('navPreparation')}</a>.</div>`;
        return;
    }

    // Carica i dati salvati
    const savedData = localStorage.getItem(storageKey);
    const participantData = savedData ? JSON.parse(savedData) : {};

    // Crea un blocco per ogni partecipante
    persons.forEach((person, index) => {
        const personBlock = document.createElement('div');
        personBlock.className = 'clarification_person';
        personBlock.dataset.personIndex = index;

        // Contenitore nome e pulsante toggle
        const nameContainer = document.createElement('div');
        nameContainer.className = 'nameContainer';

        const nameDiv = document.createElement('div');
        nameDiv.textContent = person.name;

        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'clarificationToggleBtn';
        toggleBtn.textContent = '-';
        toggleBtn.dataset.personIndex = index;

        nameContainer.appendChild(nameDiv);
        nameContainer.appendChild(toggleBtn);

        // Campo di input contenteditable
        const inputField = document.createElement('div');
        inputField.className = 'clarificationInput';
        inputField.contentEditable = 'true';
        inputField.dataset.personIndex = index;
        
        // Ripristina il contenuto salvato se presente
        if (participantData[person.name]) {
            inputField.innerHTML = participantData[person.name];
        }

        // Aggiungi elementi al blocco
        personBlock.appendChild(nameContainer);
        personBlock.appendChild(inputField);
        container.appendChild(personBlock);

        // Event listener per il toggle
        toggleBtn.addEventListener('click', function() {
            if (inputField.style.display === 'none') {
                inputField.style.display = 'block';
                toggleBtn.textContent = '-';
            } else {
                inputField.style.display = 'none';
                toggleBtn.textContent = '+';
            }
        });

        // Auto-save quando l'utente scrive
        inputField.addEventListener('input', function() {
            saveParticipantData(storageKey);
        });
    });
}

// Salva i dati di tutti i partecipanti
function saveParticipantData(storageKey) {
    const inputs = document.querySelectorAll('.clarificationInput');
    const persons = loadPersons();
    const data = {};

    inputs.forEach((input, index) => {
        if (persons[index]) {
            data[persons[index].name] = input.innerHTML;
        }
    });

    localStorage.setItem(storageKey, JSON.stringify(data));
}

// Carica i dati salvati quando la pagina è pronta
function initParticipantInputs(containerSelector, storageKey) {
    generateParticipantBlocks(containerSelector, storageKey);
}
