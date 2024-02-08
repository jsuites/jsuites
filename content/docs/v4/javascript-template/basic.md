title: Javascript template data loading
keywords: Javascript, template plugin, templates, JS template, Javascript template, render data examples
description: Example on how to programmatically load data remotely or locally into a template.

* [jSuites template](/docs/v4/javascript-template)

jSuites Template basic examples
===============================

Examples
--------

`jSuites.template` can load data both remotely and locally. Remote loading works using the `url` attribute, which must point to the address where the data is located.  
  

### Basic remote data loading example

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@jsuites/template/template.min.css" type="text/css" />
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@jsuites/template/template.min.js"></script>

<div class='row'>
<div class='column p10'>
    <div id='jsuites-template' style='border:1px solid #ccc; padding: 10px;'></div>
</div>
</div>

<script>
var template = jSuites.template(document.getElementById('jsuites-template'), {
    url: "/plugins/movies-short.json",
    template: {
        item: function(data) {
            return `
                <div>
                    <div class="row">
                        <div class="column f1 p10 center">
                            <div class="column">
                                <img class="users-large mr1" alt="${data.overview}" src="${data.poster}">
                            </div>
                            <div class="column">
                                ${data.title}
                            </div>
                        </div>
                    </div>
                </div>`
        }
    }
});
</script>
</html>
```

  
  

### Loading local data

to upload data locally, all you need to do is change the `url` attribute to `data` and pass a reference to the data directly.  
  

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@jsuites/template/template.min.css" type="text/css" />
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@jsuites/template/template.min.js"></script>

<div class='row'>
<div class='column p10'>
    <div id='jsuites-template2' style='border:1px solid #ccc; padding: 10px;'></div>
</div>
</div>

<script>
var template = jSuites.template(document.getElementById('jsuites-template2'), {
    data: [
        {"id":"287947","title":"Shazam!","poster":"https://image.tmdb.org/t/p/w500/xnopI5Xtky18MPhK40cZAGAOVeV.jpg","overview":"A boy is given the ability to become an adult superhero in times of need with a single magic word.","release_date":1553299200,"genres":["Action","Comedy","Fantasy"]},
        {"id":"299537","title":"Captain Marvel","poster":"https://image.tmdb.org/t/p/w500/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg","overview":"The story follows Carol Danvers as she becomes one of the universe’s most powerful heroes when Earth is caught in the middle of a galactic war between two alien races. Set in the 1990s, Captain Marvel is an all-new adventure from a previously unseen period in the history of the Marvel Cinematic Universe.","release_date":1551830400,"genres":["Action","Adventure","Science Fiction"]},
        {"id":"522681","title":"Escape Room","poster":"https://image.tmdb.org/t/p/w500/8Ls1tZ6qjGzfGHjBB7ihOnf7f0b.jpg","overview":"Six strangers find themselves in circumstances beyond their control, and must use their wits to survive.","release_date":1546473600,"genres":["Thriller","Action","Horror","Science Fiction"]},
        {"id":"166428","title":"How to Train Your Dragon: The Hidden World","poster":"https://image.tmdb.org/t/p/w500/xvx4Yhf0DVH8G4LzNISpMfFBDy2.jpg","overview":"As Hiccup fulfills his dream of creating a peaceful dragon utopia, Toothless’ discovery of an untamed, elusive mate draws the Night Fury away. When danger mounts at home and Hiccup’s reign as village chief is tested, both dragon and rider must make impossible decisions to save their kind.","release_date":1546473600,"genres":["Animation","Family","Adventure"]}
    ],
    template: {
        item: function(data) {
            return `
                <div>
                    <div class="row">
                        <div class="column f1 p10 center">
                            <div class="column">
                                <img class="users-large mr1" alt="${data.overview}" src="${data.poster}">
                            </div>
                            <div class="column">
                                ${data.title}
                            </div>
                        </div>
                    </div>
                </div>`
        }
    }
});
</script>
</html>
```

