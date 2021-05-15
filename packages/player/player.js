/**
 * (c) jSuites Javascript Plugins and Web Components (v4)
 *
 * Website: https://jsuites.net
 * Description: Create amazing web based applications.
 * Plugin: Mp3 Player
 *
 * MIT License
 */

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.player = factory();

    if (typeof(jSuites) !== 'undefined') {
        jSuites.player = global.player;
    }
}(this, (function () {

    'use strict';

    if (! jSuites && typeof(require) === 'function') {
        var jSuites = require('jsuites');
    }

    return 
})));