# Decision by Consent - Istruzioni / Instructions

## 🇮🇹 Italiano

### Descrizione

**Decision by Consent** è un'applicazione web per facilitare il processo decisionale basato sul metodo della Sociocrazia 3.0. Permette di gestire partecipanti, documentare proposte, raccogliere chiarimenti, reazioni, obiezioni e preoccupazioni in modo strutturato.

### Caratteristiche Principali

- ✅ **Multilingua**: Interfaccia disponibile in Italiano, Inglese e Svedese
- 👥 **Gestione Partecipanti**: Aggiungi, modifica ed elimina i partecipanti
- 📝 **Editor di Testo Formattato**: Scrivi e formatta testi con grassetto, corsivo, colori ed evidenziazioni
- 💾 **Doppio Formato di Salvataggio**: 
  - **JSON**: Per ricaricare e continuare a lavorare sulla sessione
  - **PDF**: Documento leggibile e stampabile con formattazione professionale
- 🔄 **Auto-salvataggio**: I contenuti vengono salvati automaticamente mentre scrivi

### Come Iniziare

#### 1. **Selezione Lingua**

All'apertura dell'applicazione (`index.html`), scegli la lingua preferita:

- Clicca su **Italiano**, **English** o **Svenska**
- La scelta verrà salvata automaticamente per le sessioni future

#### 2. **Avvio Attività**

Dalla pagina **Cominciamo** (`starter.html`):

- **Nuova attività**: Avvia un nuovo processo decisionale (cancella i dati precedenti)
- **Carica un'attività**: Importa un file JSON salvato in precedenza

#### 3. **Preparazione**

Nella pagina **Preparazione** (`preparation.html`):

- Inserisci i nomi dei partecipanti (separati da virgola per aggiungerne multipli)
- Clicca **Aggiungi** per salvarli
- Puoi modificare o eliminare i partecipanti dalla tabella

#### 4. **Driver**

Nella pagina **Driver** (`driver.html`):

- Scrivi la tensione o il bisogno che motiva la decisione
- Usa i pulsanti di formattazione per personalizzare il testo:
  - **G** = Grassetto
  - **I** = Corsivo
  - **Colori**: Rosso, Blu, Nero
  - **Evidenziato**: Sfondo giallo
- Il testo viene salvato automaticamente mentre scrivi

#### 5. **Proposta**

Nella pagina **Proposta** (`proposal.html`):

- Scrivi la proposta di decisione dettagliata
- Usa gli stessi strumenti di formattazione del Driver

#### 6. **Chiarimenti**

Nella pagina **Chiarimenti** (`clarifications.html`):

- Viene creato un campo per ogni partecipante
- Clicca sul pulsante **+/-** per espandere/nascondere ogni campo
- Scrivi le domande o richieste di chiarimento di ciascun partecipante

#### 7. **Reazioni**

Nella pagina **Reazioni** (`reactions.html`):

- Raccogli le reazioni iniziali di ogni partecipante alla proposta
- Ogni partecipante ha un proprio campo di testo

#### 8. **Obiezioni**

Nella pagina **Obiezioni** (`objections.html`):

- Documenta eventuali obiezioni sollevate dai partecipanti
- Le obiezioni sono ragioni per cui la proposta potrebbe causare danno
- o possibilità di miglioramento sostanziale

#### 9. **Preoccupazioni**

Nella pagina **Preoccupazioni** (`concerns.html`):

- Scrivi le preoccupazioni generali o note aggiuntive
- Usa l'editor formattato come per Driver e Proposta

#### 10. **Salvataggio**

Da qualsiasi pagina, clicca su **Salva** nel menu in alto e scegli il formato:

- **Salva come JSON**: File `Decisione_YYYY-MM-DD.json` per ricaricare i dati
  - Contiene tutti i dati: lingua, partecipanti e contenuti
  - Può essere ricaricato con "Carica un'attività"
  
- **Salva come PDF**: Documento `Decisione_YYYY-MM-DD.pdf` leggibile
  - Formato professionale con sezioni organizzate
  - Include data, lingua e tutti i contenuti
  - Tabella partecipanti formattata
  - Perfetto per documentazione, stampa o condivisione

### Struttura dei File

```
DecisionByConsent(js)/
├── index.html              # Pagina di selezione lingua
├── contents/               # Pagine dell'applicazione
│   ├── style.css          # Stili CSS
│   ├── starter.html       # Avvio nuova/carica attività
│   ├── preparation.html   # Gestione partecipanti
│   ├── driver.html        # Tensione/Driver
│   ├── proposal.html      # Proposta
│   ├── clarifications.html # Chiarimenti per partecipante
│   ├── reactions.html     # Reazioni per partecipante
│   ├── objections.html    # Obiezioni per partecipante
│   └── concerns.html      # Preoccupazioni generali
└── js/                    # Script JavaScript
    ├── dictionary.js      # Traduzioni multilingua
    ├── main.js            # Logica principale
    ├── save.js            # Generazione PDF
    ├── txt_editor.js      # Editor di testo formattato
    └── participants_inputs.js # Gestione input partecipanti
```

### Requisiti Tecnici

- Browser moderno (Chrome, Firefox, Safari, Edge)
- JavaScript abilitato
- LocalStorage abilitato (per il salvataggio automatico)
- Connessione internet (per libreria jsPDF - CDN)

### Note Importanti

- ⚠️ I dati sono salvati localmente nel browser (localStorage)
- 💾 Esporta regolarmente i tuoi dati con il pulsante "Salva"
- 📄 **Salva come PDF** per documentazione permanente e condivisione
- 💿 **Salva come JSON** per continuare a modificare la sessione
- 🔄 Puoi aprire file JSON salvati con "Carica un'attività"
- 🗑️ "Nuova attività" cancella tutti i dati esistenti (chiede conferma)

---

## 🇬🇧 English

### Description

**Decision by Consent** is a web application to facilitate decision-making based on the Sociocracy 3.0 method. It allows you to manage participants, document proposals, collect clarifications, reactions, objections and concerns in a structured way.

### Main Features

- ✅ **Multilingual**: Interface available in Italian, English and Swedish
- 👥 **Participant Management**: Add, edit and delete participants
- 📝 **Formatted Text Editor**: Write and format text with bold, italic, colors and highlighting
- 💾 **Dual Save Format**: 
  - **JSON**: To reload and continue working on the session
  - **PDF**: Readable and printable document with professional formatting
- 🔄 **Auto-save**: Contents are saved automatically as you type

### Getting Started

#### 1. **Language Selection**

When opening the application (`index.html`), choose your preferred language:

- Click on **Italiano**, **English** or **Svenska**
- Your choice will be automatically saved for future sessions

#### 2. **Starting Activity**

From the **Let's Begin** page (`starter.html`):

- **New Activity**: Start a new decision-making process (clears previous data)
- **Load an Activity**: Import a previously saved JSON file

#### 3. **Preparation**

In the **Preparation** page (`preparation.html`):

- Enter participant names (comma-separated to add multiple)
- Click **Add** to save them
- You can edit or delete participants from the table

#### 4. **Driver**

In the **Driver** page (`driver.html`):

- Write the tension or need that motivates the decision
- Use formatting buttons to customize text:
  - **B** = Bold
  - **I** = Italic
  - **Colors**: Red, Blue, Black
  - **Highlighted**: Yellow background
- Text is automatically saved as you type

#### 5. **Proposal**

In the **Proposal** page (`proposal.html`):

- Write the detailed decision proposal
- Use the same formatting tools as Driver

#### 6. **Clarifications**

In the **Clarifications** page (`clarifications.html`):

- A field is created for each participant
- Click the **+/-** button to expand/collapse each field
- Write questions or clarification requests for each participant

#### 7. **Reactions**

In the **Reactions** page (`reactions.html`):

- Collect initial reactions from each participant to the proposal
- Each participant has their own text field

#### 8. **Objections**

In the **Objections** page (`objections.html`):

- Document any objections raised by participants
- Objections are reasons why the proposal might cause harm
- or ways to imrpove the proposal

#### 9. **Concerns**

In the **Concerns** page (`concerns.html`):

- Write general concerns or additional notes
- Use the formatted editor like for Driver and Proposal

#### 10. **Saving**

From any page, click **Save** in the top menu and choose the format:

- **Save as JSON**: File `Decisione_YYYY-MM-DD.json` to reload data
  - Contains all data: language, participants and contents
  - Can be reloaded with "Load an Activity"
  
- **Save as PDF**: Readable document `Decisione_YYYY-MM-DD.pdf`
  - Professional format with organized sections
  - Includes date, language and all contents
  - Formatted participant table
  - Perfect for documentation, printing or sharing

### File Structure

```
DecisionByConsent(js)/
├── index.html              # Language selection page
├── contents/               # Application pages
│   ├── style.css          # CSS styles
│   ├── starter.html       # Start new/load activity
│   ├── preparation.html   # Participant management
│   ├── driver.html        # Tension/Driver
│   ├── proposal.html      # Proposal
│   ├── clarifications.html # Clarifications per participant
│   ├── reactions.html     # Reactions per participant
│   ├── objections.html    # Objections per participant
│   └── concerns.html      # General concerns
└── js/                    # JavaScript files
    ├── dictionary.js      # Multilingual translations
    ├── main.js            # Main logic
    ├── save.js            # PDF generation
    ├── txt_editor.js      # Formatted text editor
    └── participants_inputs.js # Participant input management
```

### Technical Requirements

- Modern browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- LocalStorage enabled (for automatic saving)
- Internet connection (for jsPDF library - CDN)

### Important Notes

- ⚠️ Data is saved locally in the browser (localStorage)
- 💾 Regularly export your data with the "Save" button
- 📄 **Save as PDF** for permanent documentation and sharing
- 💿 **Save as JSON** to continue editing the session
- 🔄 You can open saved JSON files with "Load an Activity"
- 🗑️ "New Activity" deletes all existing data (asks for confirmation)

---

## 🇸🇪 Svenska

### Beskrivning

**Decision by Consent** är en webbapplikation som underlättar beslutsfattande enligt metoden Sociocracy 3.0. Den hjälper dig att hantera deltagare, dokumentera förslag och samla in förtydliganden, reaktioner, invändningar och farhågor på ett strukturerat sätt.

### Huvudfunktioner

- ✅ **Flerspråkigt gränssnitt**: Tillgängligt på italienska, engelska och svenska
- 👥 **Deltagarhantering**: Lägg till, redigera och ta bort deltagare
- 📝 **Formaterad textredigerare**: Skriv och formatera text med fetstil, kursiv stil, färger och markeringar
- 💾 **Två sparformat**:
  - **JSON**: För att läsa in och fortsätta arbeta med sessionen
  - **PDF**: Ett lättläst och utskriftsvänligt dokument med professionell formatering
- 🔄 **Automatisk sparning**: Innehållet sparas automatiskt medan du skriver

### Kom igång

#### 1. **Välj språk**

När du öppnar applikationen (`index.html`) väljer du önskat språk:

- Klicka på **Italiano**, **English** eller **Svenska**
- Ditt val sparas automatiskt inför kommande sessioner

#### 2. **Starta en aktivitet**

På sidan **Kom igång** (`starter.html`):

- **Ny aktivitet**: Starta en ny beslutsprocess (föregående data raderas)
- **Läs in en aktivitet**: Importera en JSON-fil som du har sparat tidigare

#### 3. **Förberedelser**

På sidan **Förberedelser** (`preparation.html`):

- Ange deltagarnas namn (separera flera namn med kommatecken)
- Klicka på **Lägg till** för att spara dem
- Du kan redigera eller ta bort deltagare i tabellen

#### 4. **Drivkraft**

På sidan **Drivkraft** (`driver.html`):

- Skriv den spänning eller det behov som ligger bakom beslutet
- Använd formateringsknapparna för att anpassa texten:
  - **F** = Fetstil
  - **K** = Kursiv stil
  - **Färger**: Röd, blå och svart
  - **Markering**: Gul bakgrund
- Texten sparas automatiskt medan du skriver

#### 5. **Förslag**

På sidan **Förslag** (`proposal.html`):

- Skriv ett detaljerat beslutsförslag
- Använd samma formateringsverktyg som för Drivkraft

#### 6. **Förtydliganden**

På sidan **Förtydliganden** (`clarifications.html`):

- Ett fält skapas för varje deltagare
- Klicka på knappen **+/-** för att visa eller dölja respektive fält
- Skriv varje deltagares frågor eller önskemål om förtydliganden

#### 7. **Reaktioner**

På sidan **Reaktioner** (`reactions.html`):

- Samla in varje deltagares första reaktion på förslaget
- Varje deltagare har ett eget textfält

#### 8. **Invändningar**

På sidan **Invändningar** (`objections.html`):

- Dokumentera eventuella invändningar från deltagarna
- Invändningar är skäl till att förslaget kan orsaka skada
- eller möjligheter att förbättra förslaget väsentligt

#### 9. **Farhågor**

På sidan **Farhågor** (`concerns.html`):

- Skriv allmänna farhågor eller ytterligare anteckningar
- Använd den formaterade textredigeraren på samma sätt som för Drivkraft och Förslag

#### 10. **Spara**

Klicka på **Spara** i menyn längst upp på valfri sida och välj format:

- **Spara som JSON**: Filen `Decisione_YYYY-MM-DD.json` kan användas för att läsa in data igen
  - Innehåller alla data: språk, deltagare och innehåll
  - Kan läsas in med **Läs in en aktivitet**

- **Spara som PDF**: Det lättlästa dokumentet `Decisione_YYYY-MM-DD.pdf`
  - Professionellt format med tydligt organiserade avsnitt
  - Innehåller datum, språk och allt innehåll
  - Deltagartabell med formatering
  - Passar för dokumentation, utskrift och delning

### Filstruktur

```
DecisionByConsent(js)/
├── index.html              # Sida för språkval
├── contents/               # Applikationens sidor
│   ├── style.css          # CSS-formatmallar
│   ├── starter.html       # Starta eller läsa in en aktivitet
│   ├── preparation.html   # Deltagarhantering
│   ├── driver.html        # Spänning/Drivkraft
│   ├── proposal.html      # Förslag
│   ├── clarifications.html # Förtydliganden per deltagare
│   ├── reactions.html     # Reaktioner per deltagare
│   ├── objections.html    # Invändningar per deltagare
│   └── concerns.html      # Allmänna farhågor
└── js/                    # JavaScript-filer
    ├── dictionary.js      # Översättningar
    ├── main.js            # Applikationens huvudlogik
    ├── save.js            # Skapar PDF-filer
    ├── txt_editor.js      # Formaterad textredigerare
    └── participants_inputs.js # Hantering av deltagarinmatning
```

### Tekniska krav

- En modern webbläsare (Chrome, Firefox, Safari eller Edge)
- JavaScript aktiverat
- LocalStorage aktiverat (för automatisk sparning)
- Internetanslutning (för jsPDF-biblioteket via CDN)

### Viktigt

- ⚠️ Data sparas lokalt i webbläsaren (localStorage)
- 💾 Exportera dina data regelbundet med knappen **Spara**
- 📄 **Spara som PDF** för permanent dokumentation och delning
- 💿 **Spara som JSON** för att fortsätta redigera sessionen
- 🔄 Du kan öppna sparade JSON-filer med **Läs in en aktivitet**
- 🗑️ **Ny aktivitet** raderar alla befintliga data (du ombeds bekräfta)

---

## 🚀 Avvio Rapido / Quick Start / Snabbstart

### Aprire l'applicazione / Open the application / Öppna applikationen

1. Apri `index.html` nel browser / Open `index.html` in your browser / Öppna `index.html` i webbläsaren
2. Scegli la lingua (**Italiano**, **English** o **Svenska**) / Choose a language (**Italiano**, **English** or **Svenska**) / Välj språk (**Italiano**, **English** eller **Svenska**)
3. Vai su "Cominciamo" → "Nuova attività" / Go to "Let's Begin" → "New Activity" / Gå till "Kom igång" → "Ny aktivitet"
4. Inizia ad usare l'app! / Start using the app! / Börja använda appen!

### Salvare i dati / Save data / Spara data

- Clicca "Salva" in alto a destra in qualsiasi momento / Click "Save" in the top right at any time / Klicka på "Spara" uppe till höger när som helst
- Scegli **JSON** per ricaricare i dati o **PDF** per documenti leggibili / Choose **JSON** to reload data or **PDF** for readable documents / Välj **JSON** för att läsa in data igen eller **PDF** för ett lättläst dokument

---

## 📄 Licenza / License / Licens

Questo progetto è open source. / This project is open source / Det här projektet är open source.
by Cristiano Bottone - Transition Italia
cristiano.bottone@transitionitalia.it

## 👨‍💻 Sviluppo / Development / Utveckling

Creato con HTML5, CSS3 e JavaScript vanilla. / Created with HTML5, CSS3 and vanilla JavaScript. / Skapat med HTML5, CSS3 och vanilla JavaScript.