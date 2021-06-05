jSuites.mask = (function() {
    var obj = {};
    var index = 0;
    var values = []
    var pieces = [];

    /**
     * Apply a mask over a value considering a custom decimal representation. Default: '.'
     */
    obj.run = function(value, mask, decimal) {
        if (value.toString().length && mask.toString().length) {
            // Default decimal separator
            if (typeof(decimal) == 'undefined') {
                decimal = '.';
            }

            if (jSuites.isNumeric(value) && typeof(value) == 'number') {
                var number = (''+value).split('.');
            } else {
                var number = (''+value).split(decimal);
            }

            var value = number[0];
            var valueDecimal = number[1];

            // Helpers
            index = 0;
            values = [];
            // Create mask token
            obj.prepare(mask);
            // Current value
            var v = value;
            if (v) {
                // Checking current value
                for (var i = 0; i < v.length; i++) {
                    if (v[i] != null) {
                        obj.process(v[i]);
                    }
                }
            }
            value = values.join('');
            if (valueDecimal) {
                value += (decimal + valueDecimal);
            }
            // Formatted value
            return value;
        } else {
            return '';
        }
    }

    /**
     * Process new string by keydown or paste
     */
    var execute = function(str) {
        index = 0;
        values = [];
        // Create mask token
        obj.prepare(this.getAttribute('data-mask'));
        // Current value
        var currentValue = '';
        // Process selection
        if (this.tagName == 'DIV') {
            if (this.innerText) {
                var s = window.getSelection();
                if (s && s.anchorOffset != s.focusOffset) {
                    var offset = s.anchorOffset > s.focusOffset ? s.focusOffset : s.anchorOffset;
                    var currentValue = this.innerText.substring(0, offset);
                } else {
                    var currentValue = this.innerText;
                }
            }
        } else {
            if (this.selectionStart < this.selectionEnd) {
                var currentValue = this.value.substring(0, this.selectionStart); 
            } else {
                var currentValue = this.value;
            }
        }

        // New string to the input
        currentValue += str;

        // Checking current value
        for (var i = 0; i < currentValue.length; i++) {
            if (currentValue[i] != null) {
                obj.process(currentValue[i]);
            }
        }

        // New value 
        var value = values.join('');

        // Update value to the element
        if (this.tagName == 'DIV') {
            if (value != this.innerText) {
                this.innerText = value;
                // Set focus
                jSuites.focus(this);
            }
        } else {
            this.value = value;
        }

        // Completed attribute
        if (pieces.length == values.length && pieces[pieces.length-1].length == values[values.length-1].length) {
            this.setAttribute('data-completed', 'true');
        } else {
            this.setAttribute('data-completed', 'false');
        }
    }

    obj.apply = function(e) {
        if (e.target && ! e.target.getAttribute('readonly')) {
            var mask = e.target.getAttribute('data-mask');
            if (mask && e.key && e.key.length < 2 && ! e.ctrlKey) {
                // Prevent default
                e.preventDefault();
                // Process new char
                execute.call(e.target, e.key);
            }
        }
    }

    obj.paste = function(e) {
        if (e.target && ! e.target.getAttribute('readonly')) {
            // Only apply paste to jsuites mask elements
            var mask = e.target.getAttribute('data-mask');
            if (mask) {
                // Get the pasted text
                if (e.clipboardData || e.originalEvent.clipboardData) {
                    var text = (e.originalEvent || e).clipboardData.getData('text/plain');
                } else if (window.clipboardData) {
                    var text = window.clipboardData.getData('Text');
                }
                // Process the new text
                if (text) {
                    // Prevent default
                    e.preventDefault();
                    // Process new information
                    execute.call(e.target, text);
                }
            }
        }
    }

    /**
     * Process inputs and save to values
     */
    obj.process = function(input) {
        do {
            if (pieces[index] == 'mm') {
                if (values[index] == null || values[index] == '') {
                    if (parseInt(input) > 1 && parseInt(input) < 10) {
                        values[index] = '0' + input;
                        index++;
                        return true;
                    } else if (parseInt(input) < 10) {
                        values[index] = input;
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    if (values[index] == 1 && values[index] < 2 && parseInt(input) < 3) {
                        values[index] += input;
                        index++;
                        return true;
                    } else if (values[index] == 0 && values[index] < 10) {
                        values[index] += input;
                        index++;
                        return true;
                    } else {
                        return false
                    }
                }
            } else if (pieces[index] == 'dd') {
                if (values[index] == null || values[index] == '') {
                    if (parseInt(input) > 3 && parseInt(input) < 10) {
                        values[index] = '0' + input;
                        index++;
                        return true;
                    } else if (parseInt(input) < 10) {
                        values[index] = input;
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    if (values[index] == 3 && parseInt(input) < 2) {
                        values[index] += input;
                        index++;
                        return true;
                    } else if (values[index] < 3 && parseInt(input) < 10) {
                        values[index] += input;
                        index++;
                        return true;
                    } else {
                        return false
                    }
                }
            } else if (pieces[index] == 'hh24') {
                if (values[index] == null || values[index] == '') {
                    if (parseInt(input) > 2 && parseInt(input) < 10) {
                        values[index] = '0' + input;
                        index++;
                        return true;
                    } else if (parseInt(input) < 10) {
                        values[index] = input;
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    if (values[index] == 2 && parseInt(input) < 4) {
                        values[index] += input;
                        index++;
                        return true;
                    } else if (values[index] < 2 && parseInt(input) < 10) {
                        values[index] += input;
                        index++;
                        return true;
                    } else {
                        return false
                    }
                }
            } else if (pieces[index] == 'hh') {
                if (values[index] == null || values[index] == '') {
                    if (parseInt(input) > 1 && parseInt(input) < 10) {
                        values[index] = '0' + input;
                        index++;
                        return true;
                    } else if (parseInt(input) < 10) {
                        values[index] = input;
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    if (values[index] == 1 && parseInt(input) < 3) {
                        values[index] += input;
                        index++;
                        return true;
                    } else if (values[index] < 1 && parseInt(input) < 10) {
                        values[index] += input;
                        index++;
                        return true;
                    } else {
                        return false
                    }
                }
            } else if (pieces[index] == 'mi' || pieces[index] == 'ss') {
                if (values[index] == null || values[index] == '') {
                    if (parseInt(input) > 5 && parseInt(input) < 10) {
                        values[index] = '0' + input;
                        index++;
                        return true;
                    } else if (parseInt(input) < 10) {
                        values[index] = input;
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    if (parseInt(input) < 10) {
                        values[index] += input;
                        index++;
                        return true;
                     } else {
                        return false
                    }
                }
            } else if (pieces[index] == 'yy' || pieces[index] == 'yyyy') {
                if (parseInt(input) < 10) {
                    if (values[index] == null || values[index] == '') {
                        values[index] = input;
                    } else {
                        values[index] += input;
                    }
                    
                    if (values[index].length == pieces[index].length) {
                        index++;
                    }
                    return true;
                } else {
                    return false;
                }
            } else if (pieces[index] == '#' || pieces[index] == '#.##' || pieces[index] == '#,##' || pieces[index] == '# ##' || pieces[index] == "#'##") {
                if (input.match(/[0-9]/g)) {
                    if (pieces[index] == '#.##') {
                        var separator = '.';
                    } else if (pieces[index] == '#,##') {
                        var separator = ',';
                    } else if (pieces[index] == '# ##') {
                        var separator = ' ';
                    } else if (pieces[index] == "#'##") {
                        var separator = "'";
                    } else {
                        var separator = '';
                    }
                    if (values[index] == null || values[index] == '') {
                        values[index] = input;
                    } else {
                        values[index] += input;
                        if (separator) {
                            values[index] = values[index].match(/[0-9]/g).join('');
                            var t = [];
                            var s = 0;
                            for (var j = values[index].length - 1; j >= 0 ; j--) {
                                t.push(values[index][j]);
                                s++;
                                if (! (s % 3)) {
                                    t.push(separator);
                                }
                            }
                            t = t.reverse();
                            values[index] = t.join('');
                            if (values[index].substr(0,1) == separator) {
                                values[index] = values[index].substr(1);
                            } 
                        }
                    }
                    return true;
                } else {
                    if (pieces[index] == '#.##' && input == '.') {
                        // Do nothing
                    } else if (pieces[index] == '#,##' && input == ',') {
                        // Do nothing
                    } else if (pieces[index] == '# ##' && input == ' ') {
                        // Do nothing
                    } else if (pieces[index] == "#'##" && input == "'") {
                        // Do nothing
                    } else {
                        if (values[index]) {
                            index++;
                            if (pieces[index]) {
                                if (pieces[index] == input) {
                                    values[index] = input;
                                    return true;
                                } else {
                                    if (pieces[index] == '0' && pieces[index+1] == input) {
                                        index++;
                                        values[index] = input;
                                        return true;
                                    }
                                }
                            }
                        }
                    }

                    return false;
                }
            } else if (pieces[index] == '0') {
                if (input.match(/[0-9]/g)) {
                    values[index] = input;
                    index++;
                    return true;
                } else {
                    return false;
                }
            } else if (pieces[index] == 'a') {
                if (input.match(/[a-zA-Z]/g)) {
                    values[index] = input;
                    index++;
                    return true;
                } else {
                    return false;
                }
            } else {
                if (pieces[index] != null) {
                    if (pieces[index] == '\\a') {
                        var v = 'a';
                    } else if (pieces[index] == '\\0') {
                        var v = '0';
                    } else if (pieces[index] == '[-]') {
                        if (input == '-' || input == '+') {
                            var v = input;
                        } else {
                            var v = ' ';
                        }
                    } else {
                        var v = pieces[index];
                    }
                    values[index] = v;
                    if (input == v) {
                        index++;
                        return true;
                    }
                }
            }

            index++;
        } while (pieces[index]);
    }

    /**
     * Create tokens for the mask
     */
    obj.prepare = function(mask) {
        pieces = [];
        for (var i = 0; i < mask.length; i++) {
            if (mask[i].match(/[0-9]|[a-z]|\\/g)) {
                if (mask[i] == 'y' && mask[i+1] == 'y' && mask[i+2] == 'y' && mask[i+3] == 'y') {
                    pieces.push('yyyy');
                    i += 3;
                } else if (mask[i] == 'y' && mask[i+1] == 'y') {
                    pieces.push('yy');
                    i++;
                } else if (mask[i] == 'm' && mask[i+1] == 'm' && mask[i+2] == 'm' && mask[i+3] == 'm') {
                    pieces.push('mmmm');
                    i += 3;
                } else if (mask[i] == 'm' && mask[i+1] == 'm' && mask[i+2] == 'm') {
                    pieces.push('mmm');
                    i += 2;
                } else if (mask[i] == 'm' && mask[i+1] == 'm') {
                    pieces.push('mm');
                    i++;
                } else if (mask[i] == 'd' && mask[i+1] == 'd') {
                    pieces.push('dd');
                    i++;
                } else if (mask[i] == 'h' && mask[i+1] == 'h' && mask[i+2] == '2' && mask[i+3] == '4') {
                    pieces.push('hh24');
                    i += 3;
                } else if (mask[i] == 'h' && mask[i+1] == 'h') {
                    pieces.push('hh');
                    i++;
                } else if (mask[i] == 'm' && mask[i+1] == 'i') {
                    pieces.push('mi');
                    i++;
                } else if (mask[i] == 's' && mask[i+1] == 's') {
                    pieces.push('ss');
                    i++;
                } else if (mask[i] == 'a' && mask[i+1] == 'm') {
                    pieces.push('am');
                    i++;
                } else if (mask[i] == 'p' && mask[i+1] == 'm') {
                    pieces.push('pm');
                    i++;
                } else if (mask[i] == '\\' && mask[i+1] == '0') {
                    pieces.push('\\0');
                    i++;
                } else if (mask[i] == '\\' && mask[i+1] == 'a') {
                    pieces.push('\\a');
                    i++;
                } else {
                    pieces.push(mask[i]);
                }
            } else {
                if (mask[i] == '#' && mask[i+1] == '.' && mask[i+2] == '#' && mask[i+3] == '#') {
                    pieces.push('#.##');
                    i += 3;
                } else if (mask[i] == '#' && mask[i+1] == ',' && mask[i+2] == '#' && mask[i+3] == '#') {
                    pieces.push('#,##');
                    i += 3;
                } else if (mask[i] == '#' && mask[i+1] == ' ' && mask[i+2] == '#' && mask[i+3] == '#') {
                    pieces.push('# ##');
                    i += 3;
                } else if (mask[i] == '#' && mask[i+1] == "'" && mask[i+2] == '#' && mask[i+3] == '#') {
                    pieces.push("#'##");
                    i += 3;
                } else if (mask[i] == '[' && mask[i+1] == '-' && mask[i+2] == ']') {
                    pieces.push('[-]');
                    i += 2;
                } else {
                    pieces.push(mask[i]);
                }
            }
        }
    }

    if (typeof document !== 'undefined') {
        document.addEventListener('paste', obj.paste);
        document.addEventListener('keydown', obj.apply);
    }

    return obj;
})();
