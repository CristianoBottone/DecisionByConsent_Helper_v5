// Quill Editor Configuration
const toolbarOptions = [
  // font options
  [{ font: [] }],

  // header options
  [{ header: [1, 2, false] }],

  // text utilities
  ["bold", "italic", "underline", "strike"],

  // text colors and bg colors
  [{ color: [] }, { background: [] }],

  // lists
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],

  // block quotes and code blocks
  ["blockquote", "code-block"],

  // media
  ["link", "image", "video"],

  // alignment
  [{ align: [] }],
];

// Oggetto per memorizzare le istanze di Quill
const quillInstances = {};

// Funzione per inizializzare Quill editor
function initQuillEditor(containerId, storageKey) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`Container with id "${containerId}" not found`);
    return null;
  }

  // Crea l'istanza Quill
  const quill = new Quill(`#${containerId}`, {
    theme: "snow",
    modules: {
      toolbar: toolbarOptions,
    },
    placeholder: 'Inserisci il testo qui...'
  });

  // Carica il contenuto salvato
  const savedContent = localStorage.getItem(storageKey);
  if (savedContent) {
    try {
      const delta = JSON.parse(savedContent);
      quill.setContents(delta);
    } catch (e) {
      // Se il contenuto salvato non è in formato Delta, prova a caricarlo come HTML
      quill.root.innerHTML = savedContent;
    }
  }

  // Salva automaticamente quando l'utente modifica il contenuto
  quill.on('text-change', function () {
    saveQuillContent(quill, storageKey);
  });

  // Memorizza l'istanza
  quillInstances[containerId] = quill;

  return quill;
}

// Funzione per salvare il contenuto di Quill
function saveQuillContent(quill, storageKey) {
  const delta = quill.getContents();
  localStorage.setItem(storageKey, JSON.stringify(delta));
}

// Funzione per caricare il contenuto in Quill
function loadQuillContent(quill, storageKey) {
  const savedContent = localStorage.getItem(storageKey);
  if (savedContent) {
    try {
      const delta = JSON.parse(savedContent);
      quill.setContents(delta);
    } catch (e) {
      console.error('Error loading content:', e);
    }
  }
}

// Funzione per ottenere il contenuto HTML di Quill (per export)
function getQuillHTML(containerId) {
  const quill = quillInstances[containerId];
  if (quill) {
    return quill.root.innerHTML;
  }
  return '';
}
