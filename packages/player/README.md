# Player

jSuites Player is a lightweight JavaScript song player plugin made to facilitate the integration of songs into web application just by providing an array with file sources and information about the songs.

## Installation

jSuites Player can be installed by running the command below in your terminal:

```bash
npm install @jsuites/player
```

## Integration

To integrate the Player into your web application, ensure you have the following song information available: audio source, image source, title, and author name.

You can then initialize the Player as demonstrated in the code snippet below:

```javascript
import player from '@jsuites/player';


const p = player(element, {
    // The song information should be inside the data array
    data: [
        { title: 'Mysong', author: 'Me', file: '/songs/my-song.mp3', image: '/images/my-album-cover.jpg' }
    ]
})

// Load the song queue
p.loadSong();

// Show the player and start playing the songs
p.play();
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