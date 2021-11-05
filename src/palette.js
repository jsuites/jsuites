// More palettes https://coolors.co/ or https://gka.github.io/palettes/#/10|s|003790,005647,ffffe0|ffffe0,ff005e,93003a|1|1
jSuites.palette = function(o, v) {
    var palette = {
        material: [
            [ "#ffebee", "#fce4ec", "#f3e5f5", "#e8eaf6", "#e3f2fd", "#e0f7fa", "#e0f2f1", "#e8f5e9", "#f1f8e9", "#f9fbe7", "#fffde7", "#fff8e1", "#fff3e0", "#fbe9e7", "#efebe9", "#fafafa", "#eceff1" ],
            [ "#ffcdd2", "#f8bbd0", "#e1bee7", "#c5cae9", "#bbdefb", "#b2ebf2", "#b2dfdb", "#c8e6c9", "#dcedc8", "#f0f4c3", "#fff9c4", "#ffecb3", "#ffe0b2", "#ffccbc", "#d7ccc8", "#f5f5f5", "#cfd8dc" ],
            [ "#ef9a9a", "#f48fb1", "#ce93d8", "#9fa8da", "#90caf9", "#80deea", "#80cbc4", "#a5d6a7", "#c5e1a5", "#e6ee9c", "#fff59d", "#ffe082", "#ffcc80", "#ffab91", "#bcaaa4", "#eeeeee", "#b0bec5" ],
            [ "#e57373", "#f06292", "#ba68c8", "#7986cb", "#64b5f6", "#4dd0e1", "#4db6ac", "#81c784", "#aed581", "#dce775", "#fff176", "#ffd54f", "#ffb74d", "#ff8a65", "#a1887f", "#e0e0e0", "#90a4ae" ],
            [ "#ef5350", "#ec407a", "#ab47bc", "#5c6bc0", "#42a5f5", "#26c6da", "#26a69a", "#66bb6a", "#9ccc65", "#d4e157", "#ffee58", "#ffca28", "#ffa726", "#ff7043", "#8d6e63", "#bdbdbd", "#78909c" ],
            [ "#f44336", "#e91e63", "#9c27b0", "#3f51b5", "#2196f3", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#9e9e9e", "#607d8b" ],
            [ "#e53935", "#d81b60", "#8e24aa", "#3949ab", "#1e88e5", "#00acc1", "#00897b", "#43a047", "#7cb342", "#c0ca33", "#fdd835", "#ffb300", "#fb8c00", "#f4511e", "#6d4c41", "#757575", "#546e7a" ],
            [ "#d32f2f", "#c2185b", "#7b1fa2", "#303f9f", "#1976d2", "#0097a7", "#00796b", "#388e3c", "#689f38", "#afb42b", "#fbc02d", "#ffa000", "#f57c00", "#e64a19", "#5d4037", "#616161", "#455a64" ],
            [ "#c62828", "#ad1457", "#6a1b9a", "#283593", "#1565c0", "#00838f", "#00695c", "#2e7d32", "#558b2f", "#9e9d24", "#f9a825", "#ff8f00", "#ef6c00", "#d84315", "#4e342e", "#424242", "#37474f" ],
            [ "#b71c1c", "#880e4f", "#4a148c", "#1a237e", "#0d47a1", "#006064", "#004d40", "#1b5e20", "#33691e", "#827717", "#f57f17", "#ff6f00", "#e65100", "#bf360c", "#3e2723", "#212121", "#263238" ],
        ],
        fire: [
            ["0b1a6d","840f38","b60718","de030b","ff0c0c","fd491c","fc7521","faa331","fbb535","ffc73a"],
            ["071147","5f0b28","930513","be0309","ef0000","fa3403","fb670b","f9991b","faad1e","ffc123"],
            ["03071e","370617","6a040f","9d0208","d00000","dc2f02","e85d04","f48c06","faa307","ffba08"],
            ["020619","320615","61040d","8c0207","bc0000","c82a02","d05203","db7f06","e19405","efab00"],
            ["020515","2d0513","58040c","7f0206","aa0000","b62602","b94903","c57205","ca8504","d89b00"],
        ],
        baby: [
            ["eddcd2","fff1e6","fde2e4","fad2e1","c5dedd","dbe7e4","f0efeb","d6e2e9","bcd4e6","99c1de"],
            ["e1c4b3","ffd5b5","fab6ba","f5a8c4","aacecd","bfd5cf","dbd9d0","baceda","9dc0db","7eb1d5"],
            ["daa990","ffb787","f88e95","f282a9","8fc4c3","a3c8be","cec9b3","9dbcce","82acd2","649dcb"],
            ["d69070","ff9c5e","f66770","f05f8f","74bbb9","87bfae","c5b993","83aac3","699bca","4d89c2"],
            ["c97d5d","f58443","eb4d57","e54a7b","66a9a7","78ae9c","b5a67e","7599b1","5c88b7","4978aa"],
        ],
        chart: [
            ['#C1D37F','#4C5454','#FFD275','#66586F','#D05D5B','#C96480','#95BF8F','#6EA240','#0F0F0E','#EB8258','#95A3B3','#995D81'],
        ],
    }

    // Is defined, set new palette value
    if (typeof(v) !== 'undefined') {
        palette[o] = v;
    }

    // Otherwise get palette value
    if (palette[o]) {
        return palette[o];
    } else {
        return palette.material;
    }
}
