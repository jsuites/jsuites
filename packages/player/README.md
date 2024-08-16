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

## Public Methods

These methods are available to be called from the instance and can be used to control the player’s functionalities.

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
| `addSong` | Add a song to the end of the queue.                              |
| `removeSong` | Remove a song from the given index.                              |

## Private Methods

These methods are not available for direct instance calls; they operate behind the scenes to control the player flow.

| Method                       | Description                                                        |
|------------------------------|--------------------------------------------------------------------|
| `init`                       | Creates the HTML elements and assigns the events.                  |
| `songEnd`                    | Handles the end of a song.                                         |
| `applyResponsiveComportamment` | Handles the responsiveness of the player.                         |
| `getCurrentAudio`            | Returns the current song object.                                   |
| `changePlayIcon`             | Toggles the icon between pause and play.                           |
| `playEvent`                  | Handles the play toggle event.                                     |
| `muteEvent`                  | Handles the mute toggle event.                                     |
| `setVolume`                  | Handles the volume change event.                                   |
| `timeUpdate`                 | Handles the song time change event.                                |
| `hasNextSong`                | Returns `true` if there is a song after the current one.           |
| `hasPreviousSong`            | Returns `true` if there is a song before the current one.          |
| `nextSongEvent`              | Handles the jump to the next song.                                 |
| `previousSongEvent`          | Handles the jump to the previous song.                             |
| `replaySongEvent`            | Handles the replay of the current song.                            |
| `close`                      | Hides the player and resets the audio.                             |
