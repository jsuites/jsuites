<?php

function g($type = '', $modules = null, $excluded = null) {
if ($handle = opendir('src')) {
    $js = '';
    $wc = '';
    $css = '';
    while (false !== ($entry = readdir($handle))) {
        if ($entry != "." && $entry != ".." && (! isset($modules) || in_array(substr($entry, 0, strpos($entry, '.')), $modules))  && (! isset($excluded) || ! in_array(substr($entry, 0, strpos($entry, '.')), $excluded))) {
            echo $entry . "\n";
            if (substr($entry, -3) == 'css') {
                $css .= file_get_contents('src/'.$entry) . "\r\n\r\n";
            } else if (substr($entry, -15) == 'webcomponent.js') {
                $wc .= file_get_contents('src/'.$entry) . "\r\n\r\n";
            } else {
                $js .= file_get_contents('src/'.$entry) . "\r\n\r\n";
            }
        }
    }
    closedir($handle);

    $js = "/**
 * (c) jSuites Javascript Web Components
 *
 * Website: https://jsuites.net
 * Description: Create amazing web based applications.
 *
 * MIT License
 *
 */
;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.jSuites = factory();
}(this, (function () {

    'use strict';

$js

    return jSuites;

})));";

$wc = "
/**
 * (c) jSuites Javascript Web Components
 *
 * Website: https://jsuites.net
 * Description: Create amazing web based applications.
 *
 * MIT License
 *
 */

$wc
";

    $css = "
/**
 * (c) jSuites Javascript Web Components
 *
 * Website: https://jsuites.net
 * Description: Create amazing web based applications.
 *
 * MIT License
 *
 */

$css
";


    file_put_contents("dist/jsuites{$type}.js", $js);
    file_put_contents("dist/jsuites{$type}.css", $css);
    if (! $type) {
        file_put_contents('dist/jsuites.webcomponents.js', $wc);
    }
}
}

g('.basic', [ 'a', 'ajax', 'animation', 'calendar', 'color', 'contextmenu', 'dropdown', 'editor', 'image', 'helpers', 'lazyloading', 'loading', 'mask', 'notification', 'rating', 'tabs', 'toolbar', 'sorting', 'picker', 'palette' ]);
g('.layout', [ 'layout', 'template', 'login', 'buttons', 'organogram', 'timeline', 'chat', 'menu', 'crop', 'signature', 'heatmap', 'player', 'floating' ]);
g('', null, [ 'app', 'dialog', 'refresh', 'layout', 'template', 'login', 'buttons', 'organogram', 'timeline', 'chat', 'menu', 'crop', 'signature', 'heatmap', 'player', 'floating', 'progress' ]);

echo "Done!\n";