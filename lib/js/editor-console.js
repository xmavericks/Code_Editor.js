let oldConsole = (function (oldConsole) {
    return {
        formatArgsOutput: function(arg) {
            let outputArgMessage;

            // Deal with the different primitive data types
            switch(this.getType(arg)) {
                case "string":
                    outputArgMessage = `"${arg}`;
                    break;
                case "object":
                    outputArgMessage = `Object ${JSON.stringify(arg)}`;
                    break;
                case "array":
                    outputArgMessage = `Array ${JSON.stringify(arg)}`;
                    break;
                default:
                    outputArgMessage = arg;
                    break;
            }

            return outputArgMessage;
        },
        getType: function(arg) {
            if (typeof arg === "string") return "string";
            if (typeof arg === "boolean") return "boolean";
            if (typeof arg === "function") return "function";
            if (typeof arg === "number") return "number";
            if (typeof arg === "undefined") return "undefined";
            if (typeof arg === "object" && !Array.isArray(arg)) return "object";
            if (typeof arg === "object" && Array.isArray(arg)) return "array";
        },
        logMultipleArguments: function(arguments) {
            let currentLog = "";

            // Deal with multiple arguments
            arguments.forEach(arg => {
                currentLog += this.formatArgsOutput(arg) + " ";
            });

            oldConsole.log.apply(oldConsole, arguments);

            consoleMessages.push({
                message: currentLog,
                class: `log log--default`
            });

            //oldConsole.log(consoleMessages);
        },
        logSingleArgument: function(logItem) {
            oldConsole(logItem);
            consoleMessages.push({
                message: this.formatArgsOutput(logItem),
                class: `log log--${this.getType(logItem)}`
            });
            
            //oldConsole.log(consoleMessages);
        },
        log: function(text) {
            let argsArray = Array.from(arguments);
            //oldConsole.log(argsArray);
            return argsArray.length !== 1 ? this.logMultipleArguments(argsArray) : this.logSingleArgument(text);
        },
        info: function(text) {
            oldConsole.log(text);
        },
        warn: function(text) {
            oldConsole.log(text);
        },
        error: function(err) {
            oldConsole.error(err);
            consoleMessages.push({
                message: `${err.name}: ${err.message}`,
                class: "log log--error"
            });
        }
    }
})(window.console);