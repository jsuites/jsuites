jSuites.player = (function(el, options) {
    var obj = {};
    obj.options = options || {};

    var defaults = {
        data: null,
        position: 'bottom',
        autoplay: true,
    }

    var state = {
        // stores the current K
        current: null,
        previousVolume: null,
    }

    for (var property in defaults) {
        if (! obj.options[property]) {
            obj.options[property] = defaults[property];
        }
    }

    // Element reference
    var extraControls = null;
    var optionsContainer = null;
    var audioEl = null;
    var sourceEl = null;
    var volume = null;
    var queue = null;
    var volumeWrapper = null;
    var timerProgress = null;
    var progressBar_percent = null;
    var progressBar = null;
    var songImage = null;
    var songTitle = null;
    var songArtist = null;
    var timerContainer = null;

    // Private methods
    var init = function() {
        var player_container = document.createElement('div');
        player_container.classList.add('jplayer-player');
        
        // Inner component
        var leftContainer = document.createElement('div');
        var contentContainer = document.createElement('div');
        var rightContainer = document.createElement('div');

        // Left container content
        var songInfoWrapper = document.createElement('div');
        songInfoWrapper.classList.add('jplayer-info-wrapper');

        var songImageWrapper = document.createElement('div');
        songImage = document.createElement('img');
        var songLabelWrapper = document.createElement('div');
        songTitle = document.createElement('span');
        songArtist = document.createElement('span');

        leftContainer.appendChild(songInfoWrapper);
        songInfoWrapper.appendChild(songImageWrapper);
        songInfoWrapper.appendChild(songLabelWrapper);
        songImageWrapper.appendChild(songImage);
        songLabelWrapper.appendChild(songTitle);
        songLabelWrapper.appendChild(songArtist);

        player_container.appendChild(leftContainer);
        player_container.appendChild(contentContainer);
        player_container.appendChild(rightContainer);

        // Create main container
        var playerMainContainer = document.createElement('div');
        playerMainContainer.classList.add('jplayer-main-options');

        optionsContainer = document.createElement('div');
        optionsContainer.classList.add('jplayer-options-container');

        // options container content
        var iconNames = ['shuffle', 'arrow_left', 'play_arrow', 'arrow_right', 'replay'];
        var ariaLabels = ['Active random order', 'Return', 'Play/Pause', 'Next', 'Replay']

        for (var i = 0; i < 5; i ++) {
            var button = document.createElement('button');
            button.setAttribute('title', ariaLabels[i]);
            button.classList.add('jplayer-options-button');
            button.innerHTML = '<i class="material-icons">' + iconNames[i] + '</i>';
            optionsContainer.appendChild(button);

            if (i === 1) {
                button.onclick = previousSongEvent;
            } else if (i === 3) {
                button.onclick = nextSongEvent;
            } else if (i === 4) {
                button.onclick = replaySongEvent;
            }
        }

        // Options events
        optionsContainer.children[2].setAttribute('action', 'play');
        optionsContainer.children[2].onclick = playEvent;

        timerContainer = document.createElement('div');
        timerContainer.classList.add('jplayer-timer-container');

        // player progress content
        timerProgress = document.createElement('div');
        var progressBarWrapper = document.createElement('div');
        progressBar = document.createElement('div');
        progressBar_percent = document.createElement('div');
        var timerProgress_ = document.createElement('div');

        timerProgress.classList.add('jplayer-timer-progress');
        timerProgress_.classList.add('jplayer-timer-progress');
        progressBarWrapper.classList.add('jplayer-progressbar-wrapper');
        progressBar.classList.add('jplayer-progressbar');
        progressBar_percent.classList.add('jplayer-progressbar-percent');

        timerContainer.appendChild(timerProgress);
        timerContainer.appendChild(progressBarWrapper);
        timerContainer.appendChild(timerProgress_);

        progressBarWrapper.appendChild(progressBar);
        progressBar.appendChild(progressBar_percent);

        playerMainContainer.appendChild(optionsContainer);
        playerMainContainer.appendChild(timerContainer);
        contentContainer.appendChild(playerMainContainer);

        // right container inner content
        extraControls = document.createElement('div');
        extraControls.classList.add('jplayer-extra-controls');

        queue = document.createElement('div');
        volume = document.createElement('div');

        var volumeIcon = document.createElement('div');
        volumeIcon.innerHTML = '<i class="material-icons">volume_up</i>'

        volumeWrapper = document.createElement('input');
        volumeWrapper.setAttribute('type', 'range');
        volumeWrapper.setAttribute('min', 0);
        volumeWrapper.setAttribute('max', 100);
        volumeWrapper.value = state.previousVolume = 100;

        volumeWrapper.classList.add('jplayer-volume');
        
        volume.appendChild(volumeIcon);
        volume.appendChild(volumeWrapper);

        queue.innerHTML = '<i class="material-icons">queue_music</i>'

        extraControls.appendChild(queue);
        extraControls.appendChild(volume);

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
        }
        else {
            document.body.appendChild(player_container);
        }
    }

    var applyResponsiveComportamment = function(event) {
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

    var getCurrentAudio = function() {
        if (! obj.options.data || (! obj.options.data.length)) {
            return null;
        } else {
            if (! state.current) {
                state.current = 0;
            }
            return obj.options.data[state.current];
        }
    }

    var changePlayIcon = function() {
        var playButton = optionsContainer.children[2];     

        if (! audioEl.paused) {
            playButton.setAttribute('action', 'pause');
            playButton.children[0].innerHTML = 'pause';
        } else {
            playButton.setAttribute('action', 'play');
            playButton.children[0].innerHTML = 'play_arrow';
        }
    }

    var playEvent = function(event) {  
        var playButton = optionsContainer.children[2];     
        if (playButton.getAttribute('action') == 'play') {
            obj.play();
        } else if (playButton.getAttribute('action') == 'pause') {
            obj.stop();
        }

        changePlayIcon();
    }

    var muteEvent = function(e) {
        var volumeIcon = volume.children[0].children[0];

        if (audioEl.muted) {
            audioEl.muted = false;
            volumeIcon.innerHTML = 'volume_up';
            volumeWrapper.value = state.previousVolume;
        } else {
            state.previousVolume = volumeWrapper.value;
            volumeWrapper.value = 0;
            volumeIcon.innerHTML = 'volume_mute';
            audioEl.muted = true;
        }
    }

    var setVolume = function(e) {
        audioEl.volume = (volumeWrapper.value / 100); 

        if (! audioEl.volume) {
            audioEl.muted = true;
            volume.children[0].children[0].innerHTML = 'volume_mute';
        }else if (audioEl.muted) {
            audioEl.muted = false;
            volume.children[0].children[0].innerHTML = 'volume_up';
        }
    }


    var timeUpdate = function(e) {
        var currentTime = audioEl.currentTime;
        var min = parseInt(currentTime / 60);
        var seconds = parseInt(currentTime - min * 60);
        timerProgress.textContent = (jSuites.two(min) + ':' + jSuites.two(seconds));

        // Update progressbar
        progressBar_percent.style.width = (currentTime / audioEl.duration) * 100 + '%';
    }

    var setProgressbarPosition = function(e) {
        var rect = progressBar.getBoundingClientRect();
        var clickedX = e.clientX - rect.left;
        var percent = (clickedX / progressBar.offsetWidth) * 100;
        progressBar_percent.style.width = percent + '%';

        // Set current time in the player
        audioEl.currentTime = percent * audioEl.duration / 100;
    }

    var hasNextSong = function() {
        if (obj.options.data[state.current + 1]) {
            return true;
        }
        return false;
    }

    var hasPreviousSong = function() {
        if (obj.options.data[state.current - 1]) {
            return true;
        }
        return false;
    }

    var nextSongEvent = function(e) {
        if (hasNextSong()) {
            obj.next();
        }
    }

    var previousSongEvent = function(e) {
        if (hasPreviousSong()) {
            obj.previous();
        }
    }

    var replaySongEvent = function(e) {
        obj.restart();
    }

    var songEnd = function(e) {
        if (hasNextSong()) {
            obj.next();
        } else {
            obj.restart();
            changePlayIcon();
        }
    }

    obj.loadSong = function() {
        var audioObj = getCurrentAudio();
        if (audioObj) {
            audioEl.src = audioObj.file;
            audioEl.load();
            obj.play();
        }

        songImage.src = audioObj.image;
        songTitle.innerHTML = audioObj.title;
        songArtist.innerHTML = audioObj.author;
    }

    obj.setData = function(data) {
        obj.options.data = data;

        obj.loadSong();
    }

    obj.play = function() {
        audioEl.play();
        changePlayIcon();
    }

    obj.stop = function() {
        audioEl.pause();
    }

    obj.restart = function() {
        if (audioEl.currentTime) {
            audioEl.currentTime = 0;
        }
    }

    obj.next = function() {
        state.current = state.current + 1;
        obj.setPosition();
    }

    obj.previous = function() {
        state.current = state.current - 1;
        obj.setPosition();
    }

    obj.shuffle = function() {
    }

    init();

    return obj;
});