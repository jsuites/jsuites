/**
 * (c) jSuites Javascript Plugins and Web Components (v4)
 *
 * Website: https://jsuites.net
 * Description: Create amazing web based applications.
 * Plugin: Javascript audio player
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

    if (! jSuites) {
        if (window.jSuites) {
            var jSuites = window.jSuites;
        } else if (typeof(require) === 'function') {
            var jSuites = require('jsuites');
        }
    }

    return (function(el, options) {
        const obj = {};

        if (options && !options.data) {
            options.data = [];
        }

        obj.options = options || { data: [] };

        let shuffled = false;
        let unshuffledData = obj.options.data.map(function(music) {
            return music;
        });

        const defaults = {
            data: null,
            position: 'bottom',
            autoplay: true,
        }

        const state = {
            // stores the current K
            current: null,
            previousVolume: null,
        }

        for (let property in defaults) {
            if (! obj.options[property]) {
                obj.options[property] = defaults[property];
            }
        }

        // Element reference
        let player_container = null;
        let extraControls = null;
        let optionsContainer = null;
        let audioEl = null;
        let sourceEl = null;
        let volume = null;
        let queue = null;
        let volumeWrapper = null;
        let timerProgress = null;
        let timerTotal = null;
        let progressBar_percent = null;
        let progressBar = null;
        let songImage = null;
        let songTitle = null;
        let songArtist = null;
        let timerContainer = null;
        let playButton = null;
        let closeButton = null;

        // Private methods


        /**
         * Call an event if exists in the configuration object
         */
        const invokeEventIfExists = function(eventName, ...params) {
            if (obj.options[eventName] && typeof obj.options[eventName] == 'function') {
                obj.options[eventName](...params)
            }

            if (obj[eventName] && typeof obj[eventName] == 'function') {
                obj[eventName](...params)
            }
        }

        /**
         * Create the HTML elements and assign the events
         */
        const init = function() {
            player_container = document.createElement('div');
            player_container.classList.add('jplayer-player');
            player_container.style.display = 'none';
            
            // Inner component
            const leftContainer = document.createElement('div');
            const contentContainer = document.createElement('div');
            const rightContainer = document.createElement('div');

            // Left container content
            const songInfoWrapper = document.createElement('div');
            songInfoWrapper.classList.add('jplayer-info-wrapper');

            const songImageWrapper = document.createElement('div');
            songImage = document.createElement('img');
            const songLabelWrapper = document.createElement('div');
            songTitle = document.createElement('a');
            songArtist = document.createElement('span');

            leftContainer.appendChild(songInfoWrapper);
            songInfoWrapper.appendChild(songImageWrapper);
            songInfoWrapper.appendChild(songLabelWrapper);
            songImageWrapper.appendChild(songImage);
            songLabelWrapper.appendChild(songTitle);
            songLabelWrapper.appendChild(songArtist);

            player_container.appendChild(leftContainer);
            player_container.appendChild(contentContainer);

            if (window.innerWidth <= 576) {
                leftContainer.appendChild(rightContainer);
            } else {
                player_container.appendChild(rightContainer);
            }

            window.addEventListener('resize', function() {
                if (window.innerWidth <= 576) {
                    leftContainer.appendChild(rightContainer);
                } else {
                    player_container.appendChild(rightContainer);
                }
            })

            // Create main container
            const playerMainContainer = document.createElement('div');
            playerMainContainer.classList.add('jplayer-main-options');

            optionsContainer = document.createElement('div');
            optionsContainer.classList.add('jplayer-options-container');

            // options container content
            const iconNames = ['shuffle', 'arrow_left', 'play_arrow', 'arrow_right', 'replay'];
            const ariaLabels = ['Active random order', 'Return', 'Play/Pause', 'Next', 'Replay']

            for (let i = 0; i < 5; i ++) {
                const button = document.createElement('button');
                button.setAttribute('title', ariaLabels[i]);
                button.classList.add('jplayer-options-button');
                button.innerHTML = '<i class="material-icons secondary">' + iconNames[i] + '</i>';
                optionsContainer.appendChild(button);

                if (i === 0) {
                    button.onclick = shuffleController;
                } else if (i === 1) {
                    button.onclick = previousSongEvent;
                } else if (i === 3) {
                    button.onclick = nextSongEvent;
                } else if (i === 4) {
                    button.onclick = replaySongEvent;
                }
            }

            // set playButton reference
            playButton = optionsContainer.children[2];

            // Options events
            playButton.setAttribute('action', 'play');
            playButton.onclick = playEvent;

            timerContainer = document.createElement('div');
            timerContainer.classList.add('jplayer-timer-container');

            // player progress content
            timerProgress = document.createElement('div');
            const progressBarWrapper = document.createElement('div');
            progressBar = document.createElement('div');
            progressBar_percent = document.createElement('div');
            timerTotal = document.createElement('div');

            timerProgress.classList.add('jplayer-timer-progress');
            timerTotal.classList.add('jplayer-timer-progress');
            progressBarWrapper.classList.add('jplayer-progressbar-wrapper');
            progressBar.classList.add('jplayer-progressbar');
            progressBar_percent.classList.add('jplayer-progressbar-percent');

            timerContainer.appendChild(timerProgress);
            timerContainer.appendChild(progressBarWrapper);
            timerContainer.appendChild(timerTotal);

            progressBarWrapper.appendChild(progressBar);
            progressBar.appendChild(progressBar_percent);

            playerMainContainer.appendChild(optionsContainer);
            playerMainContainer.appendChild(timerContainer);
            contentContainer.appendChild(playerMainContainer);

            // right container inner content
            extraControls = document.createElement('div');
            extraControls.classList.add('jplayer-extra-controls');

            queue = document.createElement('a');
            volume = document.createElement('div');

            const volumeIcon = document.createElement('div');
            volumeIcon.innerHTML = '<i class="material-icons">volume_up</i>'

            volumeWrapper = document.createElement('input');
            volumeWrapper.setAttribute('type', 'range');
            volumeWrapper.setAttribute('min', 0);
            volumeWrapper.setAttribute('max', 100);
            volumeWrapper.value = state.previousVolume = 100;
            volumeWrapper.classList.add('jplayer-volume');

            volume.appendChild(volumeIcon);
            volume.appendChild(volumeWrapper);

            queue.innerHTML = '<i class="material-icons">queue_music</i>';
            queue.href = obj.options.queueRedirect;

            extraControls.appendChild(queue);
            extraControls.appendChild(volume);

            closeButton = document.createElement('span');
            closeButton.classList.add('material-icons', 'cursor', 'ml1');
            closeButton.innerHTML = 'close';
            extraControls.appendChild(closeButton);
            rightContainer.appendChild(extraControls);

            // position logic
            if(obj.options.position === 'bottom') {
                player_container.classList.add('position_bottom');
            }

            if (el instanceof HTMLElement) {
                // append saorock player into el
                el.appendChild(player_container);

                // create hide player
                audioEl = document.createElement('audio');
                sourceEl = document.createElement('source');
                audioEl.setAttribute('controls', 'controls');
                audioEl.appendChild(sourceEl);
            
                // events
                window.onresize = window.onload = applyResponsiveComportamment;
                extraControls.children[1].children[0].onclick = muteEvent;
                volumeWrapper.oninput = setVolume;
                volumeWrapper.onchange = setVolume;
                audioEl.ontimeupdate = timeUpdate;
                audioEl.onended = songEnd;
                progressBarWrapper.onmousedown = setProgressbarPosition;
                closeButton.onclick = close;
            }
            else {
                document.body.appendChild(player_container);
            }
        }

        /**
         * Handles the responsiveness of the player
         */
        const applyResponsiveComportamment = function(event) {
            if (jSuites.getWindowWidth() < 576) {
                optionsContainer.parentNode.insertBefore(timerContainer, optionsContainer);
                if (! optionsContainer.parentNode.classList.contains('mobile')) {
                    optionsContainer.parentNode.classList.add('mobile');
                }
            } else {
                if (optionsContainer.parentNode.classList.contains('mobile')) {
                    optionsContainer.parentNode.classList.remove('mobile');
                    optionsContainer.parentNode.appendChild(timerContainer);
                }
            }
        }

        /**
         * Returns the current song object
         */
        const getCurrentAudio = function() {
            if (! obj.options.data || (! obj.options.data.length)) {
                return null;
            } else {
                if (! state.current) {
                    state.current = 0;
                }
                return obj.options.data[state.current];
            }
        }

        /**
         * Toggles the icon between pause and play
         */
        const changePlayIcon = function() {
            if (! audioEl.paused) {
                playButton.setAttribute('action', 'pause');
                playButton.children[0].innerHTML = 'pause';
            } else {
                playButton.setAttribute('action', 'play');
                playButton.children[0].innerHTML = 'play_arrow';
            }
        }

        /**
         * Handles the play toggle event
         */
        const playEvent = function(event) {  
            if (playButton.getAttribute('action') == 'play') {
                obj.play();
            } else if (playButton.getAttribute('action') == 'pause') {
                obj.stop();
            }

            changePlayIcon();
        }

        /**
         * Handles the mute toggle event
         */
        const muteEvent = function(e) {
            const volumeIcon = volume.children[0].children[0];

            if (audioEl.muted) {
                audioEl.muted = false;
                volumeIcon.innerHTML = 'volume_up';
                volumeWrapper.value = state.previousVolume;
                invokeEventIfExists('onunmute', e);
            } else {
                state.previousVolume = volumeWrapper.value;
                volumeWrapper.value = 0;
                volumeIcon.innerHTML = 'volume_mute';
                audioEl.muted = true;
                invokeEventIfExists('onmute', e);
            }
        }

        /**
         * Handles the volume change event
         */
        const setVolume = function(e) {
            audioEl.volume = (volumeWrapper.value / 100); 

            if (! audioEl.volume) {
                audioEl.muted = true;
                volume.children[0].children[0].innerHTML = 'volume_mute';
            }else if (audioEl.muted) {
                audioEl.muted = false;
                volume.children[0].children[0].innerHTML = 'volume_up';
            }

            invokeEventIfExists('onvolumechange', e, audioEl.volume);
        }

        /**
         * Handles the song time change event
         */
        const timeUpdate = function(e) {
            const currentTime = parseInt(audioEl.currentTime);
            const min = parseInt(currentTime / 60);
            const seconds = parseInt(currentTime - min * 60);

            timerProgress.textContent = (jSuites.two(min) + ':' + jSuites.two(seconds));

            // Update progressbar
            progressBar_percent.style.width = (currentTime / audioEl.duration) * 100 + '%';
        }

        /**
         * Handles the progress bar change event
         */
        const setProgressbarPosition = function(e) {
            const rect = progressBar.getBoundingClientRect();
            const clickedX = e.clientX - rect.left;
            const percent = (clickedX / progressBar.offsetWidth) * 100;
            progressBar_percent.style.width = percent + '%';

            // Set current time in the player
            audioEl.currentTime = percent * audioEl.duration / 100;
        }

        /**
         * Returns true if there is a song after the current
         */
        const hasNextSong = function() {
            if (obj.options.data[state.current + 1]) {
                return true;
            }
            return false;
        }

        /**
         * Returns true if there is a song before the current
         */
        const hasPreviousSong = function() {
            if (obj.options.data[state.current - 1]) {
                return true;
            }
            return false;
        }

        /**
         * Handles the jump to the next song
         */
        const nextSongEvent = function(e) {
            if (hasNextSong()) {
                obj.next();
            } else {
                state.current = 0;
                obj.loadSong();
            }
        }

        /**
         * Handles the jump to the previous song
         */
        const previousSongEvent = function(e) {
            if (hasPreviousSong()) {
                obj.previous();
            } else {
                state.current = obj.options.data.length - 1;
                obj.loadSong();
            }
        }

        /**
         * Handles the replay of the current song
         */
        const replaySongEvent = function(e) {
            obj.restart();
        }

        /**
         * Handles the end of a song
         */
        const songEnd = function(e) {
            if (hasNextSong()) {
                obj.next();
            } else {
                obj.restart();
                changePlayIcon();
            }
        }

        /**
         * Hides the player and resets the audio
         */
        const close = function(e) {
            obj.close();
        }

        /**
         * Makes the player_container visible
         */
        obj.show = function() {
            player_container.style.display = '';

            invokeEventIfExists('onopen');
        }

        /**
         * Makes the player_container non-visible
         */
        obj.hide = function() {
            player_container.style.display = 'none';

            invokeEventIfExists('onclose');
        }

        /**
         * Hides the player and resets the audio
         */
        obj.close = function() {
            if (player_container) {
                obj.hide();
                audioEl.src = '';
            }
        }

        /**
         * Set a new value for the queue
         */
        obj.setQueue = function(queueRedirect) {
            obj.options.queueRedirect = queueRedirect;
        }

        /**
         * Load the song object 
         */
        obj.loadSong = function() {
            const audioObj = getCurrentAudio();

            if (audioObj) {
                audioEl.src = audioObj.file || '';

                if (typeof audioObj.file === 'string') {
                    audioEl.load();
                }

                audioEl.onloadeddata = function() {

                    if (playButton.children[0].innerHTML === 'pause') {
                        audioEl.play();
                    }

                    const total = parseInt(audioEl.duration);
                    const totalMin = parseInt(total / 60);
                    const totalSeconds = parseInt(total - totalMin * 60);

                    timerTotal.textContent = (jSuites.two(totalMin) + ':' + jSuites.two(totalSeconds));
                }
            }

            songImage.src = audioObj.image;
            songTitle.href = '/songs/' + audioObj.id;
            songTitle.textContent = audioObj.title;
            songArtist.textContent = audioObj.author;

            queue.href = obj.options.queueRedirect;
        }

        /**
         * Set the value of songs data
         */
        obj.setData = function(data) {
            obj.options.data = data;
            shuffled = false;
            unshuffledData = obj.options.data.map(function(music) {
                return music;
            });

            const randomButton = optionsContainer.children[0];
            randomButton.children[0].style.removeProperty('color');

            playButton.setAttribute('action', 'pause');
            playButton.children[0].innerHTML = 'pause';

            obj.loadSong();
        }

        /**
         * Triggers the play in audio
         */
        obj.play = function() {
            // Show player
            obj.show();

            if (!audioEl.src) {
                obj.loadSong();
            }

            audioEl.play();
            changePlayIcon();

            invokeEventIfExists('onplay');
        }

        /**
         * Triggers the pause in audio
         */
        obj.stop = function() {
            audioEl.pause();

            invokeEventIfExists('onpause');
        }

        /**
         * Set the time of the current audio to zero
         */
        obj.restart = function() {
            if (audioEl.currentTime) {
                audioEl.currentTime = 0;
            }
        }
        
        /**
         * Changes the state to the next song
         */
        obj.next = function() {
            state.current = state.current + 1;
            // obj.setPosition();

            obj.loadSong();
            invokeEventIfExists('onsongchange', obj.options.data[state.current]);
        }
        
        /**
         * Changes the state to the previous song
         */
        obj.previous = function() {
            state.current = state.current - 1;
            // obj.setPosition();
            obj.loadSong();
            invokeEventIfExists('onsongchange', obj.options.data[state.current]);
        }

        /**
         * Changes the state to X position
         */
        obj.setAlbumMusic = function(position) {
            if (position >= 0) {
                state.current = position;
            }
        }

        const shuffleController = function() {
            if (shuffled) {
                obj.unshuffle();
            } else {
                obj.shuffle();
            }

            shuffled = !shuffled;
        }

        /**
         * Randomizes the position of the songs
         */
        obj.shuffle = function() {
            if (!shuffled) {
                const randomButton = optionsContainer.children[0];
                randomButton.children[0].style.color = '#4bce4b';
            }

            let temp = obj.options.data[state.current];
            obj.options.data[state.current] = obj.options.data[0];
            obj.options.data[0] = temp;

            for (let index = 1; index < obj.options.data.length; index++) {
                const randomPosition = Math.floor(Math.random() * (obj.options.data.length - 1)) + 1;

                temp = obj.options.data[index];
                obj.options.data[index] = obj.options.data[randomPosition];
                obj.options.data[randomPosition] = temp;
            }

            state.current = 0;
        }

        /**
         * Makes the song positions go back to original order
         */
        obj.unshuffle = function() {
            if (shuffled && unshuffledData) {
                const randomButton = optionsContainer.children[0];
                randomButton.children[0].style.removeProperty('color');

                state.current = unshuffledData.indexOf(obj.options.data[state.current]);

                obj.options.data = unshuffledData.map(function(music) {
                    return music;
                });
            }
        }

        /**
         * Add a song to the end of the queue
         */
        obj.addSong = function(audioObj) {
            if (obj.options.data && Array.isArray(obj.options.data)) {
                obj.options.data.push(audioObj);

                if (obj.options.data.length === 1) {
                    obj.loadSong();
                }
            }
        }

        /**
         * Remove a song from the given index
         */
        obj.removeSong = function(index) {
            if (obj.options.data && obj.options.data.length && (obj.options.data.length > index)) {
                obj.options.data.splice(index, 1)
            }
        }

        /**
         * Sets mobile layout
         */
        obj.setMobileMode = function() {
            if (playButton) {
                playButton.style.background = 'transparent';
                playButton.style.color = '#FFF';
                playButton.style.margin = '0px 6px';
                extraControls.appendChild(playButton);
                playButton = extraControls.children[2];
            }
        }

        obj.getQueue = function() {
            return obj.options.data;
        }

        init();

        return obj;
    });
})));