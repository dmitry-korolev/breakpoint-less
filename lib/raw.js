((function () {
    'use strict';

    var args = '@{media}',
        parRegExp = /\(([^)]+)\)/g,
        parts = [],
        matches = [],
        result = '',
        /**
         * Checks if a string contains digit characters.
         * @param   {String} string A string to check.
         * @returns {bool}   True if does, false otherwise.
         */
        isNumber = function (string) {
            return string.replace(/\D/g, '').length > 0;
        },
        /**
         * Generates css media rule.
         * @param   {array}  rule Array of rule name and rule value
         * @returns {String} generated rule, e.g. (min-height: 150px)
         */
        createRule = function (rule) {
            return '(' + rule[0] + ': ' + rule[1] + ')';
        },
        /**
         * Generates css media rules from given string.
         * @param   {String} part
         * @returns {string} Media rules
         */
        doPart = function (part) {
            if (part.indexOf(' ') !== -1) { // Check if the part contains more than one parameters.
                parts = part.split(' ');
                if (isNumber(parts[0]) && isNumber(parts[1])) { // Check if both sides of the part contain numbers
                    parts.forEach(function (el, i) {
                        result = result + (i > 0 ? ' and ' : '') + createRule([(i > 0 ? 'min-height' : 'min-width'), el]); // If they do, generate defaults.
                    });
                    return result;
                }
                return createRule(parts);
            } else {
                return createRule(['min-width', part]); // If there is only one parameter, generate default.
            }

        };

    // Remove quotes if present
    if (args.charAt(0) === '"' && args.charAt(args.length - 1) === '"') {
        args = args.substr(1, args.length -2);
    }

    // If arguments contain open parenthesis
    if (args.indexOf('(') !== -1) {
        while ((matches = parRegExp.exec(args)) !== null) {
            parts.push(matches[1]);
        }
        parts.forEach(function (el, i) {
            result += (i > 0 ? ' and ' : '') + doPart(el);
        });
        return result;
    }

    result += doPart(args);
    return result;

}()));

((function () {
    'use strict';

    var args = '@{type}',
        typeRegExp = /^(all|screen|print|speech)/;

    // Remove quotes if present
    if (args.charAt(0) === '"' && args.charAt(args.length - 1) === '"') {
        args = args.substr(1, args.length -2);
    }

    // Add 'only' if necessary
    if (typeRegExp.exec(args) !== null) {
        args = 'only ' + args;
    }
    return args;
}()));
