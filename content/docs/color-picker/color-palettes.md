title: JavaScript Color Picker Palettes  
keywords: JavaScript, color picker, color palettes, examples, customize colors, color picker customization, JavaScript plugins, web components  
description: Discover how to use and customize native `jSuites color` palettes in the JavaScript color picker plugin. Enhance integration and user experience with predefined and dynamic options.
canonical: https://jsuites.net/docs/color-picker/color-palettes

# JavaScript Color Picker Palettes

The `jSuites` JavaScript Color Picker plugin includes a collection of predefined color palettes to streamline your development process. These palettes are fully customizable, making it easy to match your application's branding or create dynamic user interfaces.

## Example

Below is an example showcasing how to implement and customize predefined color palettes in your JavaScript color picker:

```javascript  
const colorPicker = jsuites.colorPicker(document.getElementById('color-picker'), {  
    palette: ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33C3', '#A833FF']  
});  
```

## Customization

You can define your color palettes by providing an array of hex codes or RGB values. The color picker plugin also supports advanced features such as:

{.all}
```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />

<input id="color-picker">

<script>
jSuites.color(document.getElementById('color-picker'), {
    palette: jSuites.palette('fire')
});
</script>
</html>
```

  

Generated using: [Coolors](https://coolors.co/)

 

## Available Palette


We are going to create more options very soon! But if you wish to contribute [please edit this file on github](https://github.com/jsuites/jsuites/blob/master/src/palette.js).

| Palette  | Colors                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| material | ["ffebee","fce4ec","f3e5f5","e8eaf6","e3f2fd","e0f7fa","e0f2f1","e8f5e9","f1f8e9","f9fbe7","fffde7","fff8e1","fff3e0","fbe9e7","efebe9","fafafa","eceff1" ],<br>[ "ffcdd2","f8bbd0","e1bee7","c5cae9","bbdefb","b2ebf2","b2dfdb","c8e6c9","dcedc8","f0f4c3","fff9c4","ffecb3","ffe0b2","ffccbc","d7ccc8","f5f5f5","cfd8dc" ],<br>[ "ef9a9a","f48fb1","ce93d8","9fa8da","90caf9","80deea","80cbc4","a5d6a7","c5e1a5","e6ee9c","fff59d","ffe082","ffcc80","ffab91","bcaaa4","eeeeee","b0bec5" ],<br>[ "e57373","f06292","ba68c8","7986cb","64b5f6","4dd0e1","4db6ac","81c784","aed581","dce775","fff176","ffd54f","ffb74d","ff8a65","a1887f","e0e0e0","90a4ae" ],<br>[ "ef5350","ec407a","ab47bc","5c6bc0","42a5f5","26c6da","26a69a","66bb6a","9ccc65","d4e157","ffee58","ffca28","ffa726","ff7043","8d6e63","bdbdbd","78909c" ],<br>[ "f44336","e91e63","9c27b0","3f51b5","2196f3","00bcd4","009688","4caf50","8bc34a","cddc39","ffeb3b","ffc107","ff9800","ff5722","795548","9e9e9e","607d8b" ],<br>[ "e53935","d81b60","8e24aa","3949ab","1e88e5","00acc1","00897b","43a047","7cb342","c0ca33","fdd835","ffb300","fb8c00","f4511e","6d4c41","757575","546e7a" ],<br>[ "d32f2f","c2185b","7b1fa2","303f9f","1976d2","0097a7","00796b","388e3c","689f38","afb42b","fbc02d","ffa000","f57c00","e64a19","5d4037","616161","455a64" ],<br>[ "c62828","ad1457","6a1b9a","283593","1565c0","00838f","00695c","2e7d32","558b2f","9e9d24","f9a825","ff8f00","ef6c00","d84315","4e342e","424242","37474f" ],<br>[ "b71c1c","880e4f","4a148c","1a237e","0d47a1","006064","004d40","1b5e20","33691e","827717","f57f17","ff6f00","e65100","bf360c","3e2723","212121","263238"],   |
| fire     | ["0b1a6d","840f38","b60718","de030b","ff0c0c","fd491c","fc7521","faa331","fbb535","ffc73a"],<br>["071147","5f0b28","930513","be0309","ef0000","fa3403","fb670b","f9991b","faad1e","ffc123"],<br>["03071e","370617","6a040f","9d0208","d00000","dc2f02","e85d04","f48c06","faa307","ffba08"],<br>["020619","320615","61040d","8c0207","bc0000","c82a02","d05203","db7f06","e19405","efab00"],<br>["020515","2d0513","58040c","7f0206","aa0000","b62602","b94903","c57205","ca8504","d89b00"],                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |


### More Examples

* [Color Picker Events](/docs/color-picker/events)
* [Color Palettes](/docs/color-picker/color-palettes)
* [Responsive Color Picker](/docs/color-picker/mobile)
