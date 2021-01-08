// Retriving Elements
const consoleLogList = document.querySelector('.editor__console-logs');
const executeCodeBtn = document.querySelector('.editor__run');
const resetCodeBtn = document.querySelector('.editor__reset');

// Setup Code Editor
let codeEditor = ace.edit("editorCode");
let defaultCode = 'console.log("Hellow World!")';
let consoleMessages = [];

// Creating Some Objebcts
let editorLib = {
    clearConsoleScrean() {
        consoleMessages.length = 0;

        // Removing all elements of the previous log list
        while(consoleLogList.firstChild) {
            consoleLogList.removeChild(consoleLogList.firstChild);
        }
    },
    printToConsole() {
        consoleMessages.forEach(log => {
            const newLogItem = document.createElement('li')
            const newLogText = document.createElement('pre');

            newLogText.className = log.class;   // log log--string
            newLogText.textContent = `> ${log.message}`;

            newLogItem.appendChild(newLogText);

            consoleLogList.appendChild(newLogItem);
        })
    },
    init() {
        // Configuring some settings

        // Theme
        codeEditor.setTheme("ace/theme/dracula");

        // Setting the language mode
        codeEditor.session.setMode("ace/mode/javascript");

        // Set font size options
        codeEditor.setOptions({
            fontFamily: 'Consolas',
            fontSize: '12pt',
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: true,
        });

        // Set some Default Code
        codeEditor.setValue(defaultCode);
    }
}

// Events for Run and Reset Button
executeCodeBtn.addEventListener('click', () => {
    // Clear old logs
    editorLib.clearConsoleScrean();
    // Get input from the code editor
    const userCode = codeEditor.getValue();

    // Run the user code
    try{
        new Function(userCode)();
    } catch(err){
        console.error(err);
    }

    // Print to console is calling object 'printToConsole' inside Run
    editorLib.printToConsole();
});

resetCodeBtn.addEventListener('click', () => {
    // Clearing the editor panel
    codeEditor.setValue(defaultCode);

    // Clear the console is calling object 'clearConsoleScrean' inside Reset
    editorLib.clearConsoleScrean();

});

editorLib.init();