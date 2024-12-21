title: Javascript Player
keywords: Javascript, player, player plugin, JS player, Javascript player, developer guide, plugin implementation, usage documentation, music shuffle, music player features, song data, music player documentation, javascript audio player, javascript music player, music bar, sound path, play and pause, volume control
description: Access comprehensive documentation for the Javascript Player Plugin, covering detailed implementation steps, usage examples, and configuration options tailored for developers.
canonical: https://jsuites.net/docs/player

# JavaScript Audio Player

The jSuites.player is a lightweight JavaScript plugin designed to simplify the integration of music into web applications. By working with an array containing file sources and song information, the jSuites Music Player offers integrated features such as shuffle, volume control, and play/pause functionality. These features ensure intuitive audio management for users.

## Documentation

### Installation

```bash
npm install @jsuites/player
```

### Integration

To integrate the Player into your web application, ensure you have the following song information available: audio source, image source, title, and author name.

You can then initialize the Player as demonstrated in the code snippet below:

{.ignore}
```javascript
import player from '@jsuites/player';


const pl = player(element, {
    // The song information should be inside the data array
    data: [
        { title: 'Mysong', author: 'Me', file: '/songs/my-song.mp3', image: '/images/my-album-cover.jpg' }
    ]
})

// Show the player and start playing the songs
pl.play();
```

### Methods

| Method          | Description                                               |
|-----------------|-----------------------------------------------------------|
| `show`          | Makes the `player_container` visible.                     |
| `hide`          | Makes the `player_container` invisible.                   |
| `close`         | Hides the player and resets the audio.                    |
| `setQueue`      | Sets a new value for the queue.                           |
| `loadSong`      | Loads the song object.                                    |
| `setData`       | Sets the song data.                                       |
| `play`          | Triggers play on the audio.                               |
| `stop`          | Triggers pause on the audio.                              |
| `restart`       | Resets the current audio time to zero.                    |
| `next`          | Advances to the next song.                                |
| `previous`      | Returns to the previous song.                             |
| `setAlbumMusic` | Changes the state to a specific position in the album.    |
| `shuffle`       | Randomizes the order of the songs.                        |
| `unshuffle`     | Restores the original song order.                         |
| `setMobileMode` | Activates the mobile layout.                              |
| `addSong` | Add a song to the end of the queue.                             |
| `removeSong` | Remove a song from the given index.                          |


### Initialization options

| Property         | Description                                                               |
|------------------|---------------------------------------------------------------------------|
| data: Song[]   | The song array containing objects with the following structure: { title, author, file, image }. |
| eventName: Function   | Any event listed in the table below can be declared inside the initialization options. |

## Events

| Method   | Description                                                                                                                            |
|----------|----------------------------------------------------------------------------------------------------------------------------------------|
| onplay | Called when the song is resumed. |
| onpause | Called when the song is paused. |
| onmute | Called when the player is muted. |
| onunmute | Called when the player is unmuted. |
| onvolumechange | Called when the volume changes. |
| onsongchange | Called when the song changes. |
| onopen | Called when the player is displayed.|
| onclose | Called when the player is hidden. |

## Loading the Plugin

This example illustrates how to load the plugin, and then demonstrates how to open or close the user interface by attaching external buttons to invoke player methods.

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />
<script src="https://cdn.jsdelivr.net/npm/@jsuites/player/player.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@jsuites/player/player.min.css" type="text/css" />

<input type="button" value="Show Player" id="open-btn"/>
<input type="button" value="Hide Player" id="close-btn"/>

<div id="root"></div>

<script>
let instance;
window.globalCurrentInstance = player(document.getElementById("root"))

document.getElementById("open-btn").onclick = () => window.globalCurrentInstance.show();
document.getElementById("close-btn").onclick = () => window.globalCurrentInstance.hide();
</script>
</html>
```
```jsx
import React, { useRef } from "react";
import Player from 'jsuites/packages/player/react';
import 'jsuites/packages/player/player.css'


export default function App() {
    // Spreadsheet array of worksheets
    const player = useRef(null);

    // Render component
    return (
        <>
            <Player ref={player} />
            <button onClick={() => player.current.show()}>Open Player</button>
            <button onClick={() => player.current.hide()}>Hide Player</button>
        </>
    );
}
```

## Adding Songs Programmatically Using a JSON String

This example demonstrates how to add a song to the queue programmatically by providing a JSON string containing valid audio sources and song metadata.

```html
<html>
<script src="https://jsuites.net/v5/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css" type="text/css" />
<script src="https://cdn.jsdelivr.net/npm/@jsuites/player/player.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@jsuites/player/player.min.css" type="text/css" />

<textarea id="json-source" rows="5" cols="100">
{ "title": "Ateapill", "author": "Pyman", "file": "https://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/ateapill.ogg", "image": "https://img.freepik.com/free-vector/pixel-art-mystical-background_52683-87349.jpg" }
</textarea><br>
<input type="button" value="Add Song to Queue" id="submitInput">

<script>

// Add the script code from the previous example here...

document.getElementById("submitInput").onclick = () => {
    window.globalCurrentInstance.addSong(JSON.parse(document.getElementById("json-source").value));
}
</script>
</html>
```
```jsx
import React, { useRef } from "react";
import Player from 'jsuites/packages/player/react';
import 'jsuites/packages/player/player.css'


export default function App() {
    // Spreadsheet array of worksheets
    const player = useRef(null);
    const input = useRef(null);

    // Render component
    return (
        <>
            <Player ref={player} />
            <textarea rows={10} cols={50} ref={input} onChange={(newValue) => this.value = newValue} value='{ "title": "Ateapill", "author": "Pyman", "file": "https://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/ateapill.ogg", "image": "https://img.freepik.com/free-vector/pixel-art-mystical-background_52683-87349.jpg" }' />
            <button onClick={() => player.current.addSong(JSON.parse(input.current.value))}>Add Song</button>
        </>
    );
}
```

## Event Handling

This example demonstrates how to attach functions to events triggered by certain actions within the song player.

After clicking the button to add, try changing song or pausing/unpausing.

```html
<input type="button" value="Add Events" id="addEvents">
<div id="log" style="background-color: inherit; padding: 10px 5px;"></div>

<script>
document.getElementById("addEvents").onclick = () => {
    window.globalCurrentInstance.onplay = function() {
        jSuites.notification({
            name: 'Playing',
            message: `The player is playing now.`,
            timeout: 1000,
        })
    }

    window.globalCurrentInstance.onpause = function() {
        jSuites.notification({
            name: 'Pause',
            message: `The player was paused.`,
            timeout: 1000,
        })
    }

    window.globalCurrentInstance.onsongchange = function(song) {
        jSuites.notification({
            name: 'The song changed',
            message: `${song.title} from ${song.author} is now playing.`,
        })
    }

    document.getElementById("log").innerText = 'Events added!';
}
</script>
```
```jsx
import React, { useRef } from "react";
import Player from 'jsuites/packages/player/react';
import 'jsuites/packages/player/player.css'


export default function App() {
    // Spreadsheet array of worksheets
    const player = useRef(null);
    const log = useRef(null);

    const addEvents = function() {
        player.current.onplay = function() {
            jSuites.notification({
                name: 'Playing',
                message: `The player is playing now.`,
                timeout: 1000,
            })
        }
        player.current.onpause = function() {
            jSuites.notification({
                name: 'Pause',
                message: `The player was paused.`,
                timeout: 1000,
            })
        }
        player.current.onsongchange = function(song) {
            jSuites.notification({
                name: 'The song changed',
                message: `${song.title} from ${song.author} is now playing.`,
            })
        }
        log.current.innerText = 'Events added!';
    }

    // Render component
    return (
        <>
            <Player ref={player} />
            <button onClick={addEvents}>Add Events</button>
            <div ref={log}></div>
        </>
    );
}
```