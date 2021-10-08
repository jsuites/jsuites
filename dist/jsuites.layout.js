jSuites.crop = (function(el, options) {
    // Already created, update options
    if (el.classList.contains('jcrop')) {
        return el.crop.setOptions(options);
    }

    // New instance
    var obj = {};
    obj.options = {};

    el.classList.add('jcrop');
    // Upload icon
    el.classList.add('jupload');

    // Area do crop
    var crop = document.createElement('div');
    crop.classList.add('jcrop-area');
    el.appendChild(crop);

    // Canvas editor
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    el.appendChild(canvas);

    // Image
    var drawImage = function() {
        if (el.clientHeight > obj.image.height) {
            var pointY = (el.clientHeight - obj.image.height) / 2;
        } else {
            var pointY = 0;
        }

        if (el.clientWidth > obj.image.width) {
            var pointX = (el.clientWidth - obj.image.width) / 2;
        } else {
            var pointX = 0;
        }

        obj.image.left = pointX;
        obj.image.top = pointY;

        context.translate(pointX, pointY);
        context.drawImage(obj.image, 0, 0, obj.image.width, obj.image.height);
    }

    obj.image = new Image();
    obj.image.onload = function onload() {
        obj.resetCanvas();

        var w = obj.options.area[0] / this.naturalWidth;
        var h = obj.options.area[1] / this.naturalHeight;

        // Proportion
        var p = this.naturalHeight > this.naturalWidth ? h : w;

        // Image size
        this.width = this.naturalWidth * p;
        this.height = this.naturalHeight * p;

        // Do adjustment
        canvas.width = obj.options.area[0];
        canvas.height = obj.options.area[1];

        if (this.width > canvas.width) {
            canvas.width = this.width;
        }

        if (this.height > canvas.height) {
            canvas.height = this.height;
        }

        drawImage();

        // Edition model
        el.classList.add('jcrop_edition');

        // Reset selection on desktop only
        if (jSuites.getWindowWidth() > 800) {
            obj.resetCropSelection();
        } else {
            crop.classList.add('mobile');
        }

        // Onchange
        if (typeof(obj.options.onchange) == 'function') {
            obj.options.onchange(el, obj.image);
        }
    };

    // Properties
    var properties = {
        zoom: {
            origin: { x: null, y: null, },
            scale: 1,
            fingerDistance: 0
        },
        contrast: 0,
        brightness: 0,
        rotate: 0,
        saturation: 0,
    };

    var secondCanvas = document.createElement('canvas');
    var secondContext = secondCanvas.getContext('2d');
    var secondImage = document.createElement('img');

    // Reload filters
    var refreshFilters = function() {
        secondCanvas.width = obj.image.width;
        secondCanvas.height = obj.image.height;

        secondContext.clearRect(0, 0, secondContext.width, secondContext.height);

        secondImage.width = secondCanvas.width;
        secondImage.height = secondCanvas.height;

        if (obj.image) {
            //drawImage();
            secondContext.drawImage(obj.image, 0, 0, obj.image.width, obj.image.height);
        }

        // Performs the contrast, if its value is different from the initial
        if (properties.contrast) {
            runContrast();
        }

        // Performs the brightness, if its value is different from the initial
        if (properties.brightness) {
            runBrightness();
        }

        if (properties.greyScale) {
            runGreyScale();
        }

        if (properties.saturation) {
            runSaturation();
        }

        secondImage.src = secondCanvas.toDataURL(obj.getImageType);
        secondImage.onload = function() {
            context.drawImage(secondImage, 0, 0, secondImage.width, secondImage.height);
        }
    }

    /**
     * Set options
     */
    obj.setOptions = function(options) {
        // Default configuration
        var defaults = {
            area: [ 800, 600 ],
            crop: [ 200, 150 ],
            value: null,
            onload: null,
            onchange: null,
            remoteParser: null,
            allowResize: true,
            text: {
                extensionNotAllowed: 'The extension is not allowed',
                imageTooSmall: 'The resolution is too low, try a image with a better resolution. width > 800px',
            }
        };

        // Loop through our object
        for (var property in defaults) {
            if (options && options.hasOwnProperty(property)) {
                obj.options[property] = options[property];
            } else {
                obj.options[property] = defaults[property];
            }
        }

        // Default for mobile
        if (jSuites.getWindowWidth() < 800) {
            if (! obj.options.area[0]) {
                obj.options.area[0] = window.clientWidth * 2;
            }
            if (! obj.options.area[1]) {
                obj.options.area[1] = window.clientHeight * 2;
            }
        }

        // Set options
        el.style.width = obj.options.area[0] + 'px';
        el.style.height = obj.options.area[1] + 'px';

        // Reset all
        obj.reset();

        // Initial image
        if (obj.options.value) {
            obj.image.src = obj.options.value;
        }
    }

    /**
     * Reset crop to the initial conditions
     */
    obj.resetCropSelection = function() {
        crop.style.left = (obj.options.area[0]/2 - obj.options.crop[0]/2) + 'px';
        crop.style.top = (obj.options.area[1]/2 - obj.options.crop[1]/2) + 'px';
        crop.style.width = obj.options.crop[0] + 'px';
        crop.style.height = obj.options.crop[1] + 'px';
        crop.style.zIndex = 1;
    }

    obj.getCropSelection = function() {
        obj.getSelectionCoordinates();
    }

    // Reset canvas
    obj.resetCanvas = function() {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0,0,canvas.width,canvas.height);
    }

    // Reset all the properties
    obj.reset = function() {
        // Reset crop selection
        obj.resetCropSelection()
        // Reset canvas
        obj.resetCanvas();
        // Reset state
        properties = {
            zoom: {
                origin: { x: null, y: null },
                scale: 1,
            },
            contrast: 0,
            brightness: 0,
            rotate: 0,
            greyScale: 0,
            saturation: 0,
        }
        // Stop edition
        el.classList.remove('jcrop_edition')
    }

    // Apply the contrast on the image data
    var runContrast = function() {
        var contrast = properties.contrast;
        var imageData = secondContext.getImageData(0, 0, secondCanvas.width, secondCanvas.height);
        var data = imageData.data;  // Note: original dataset modified directly!
        contrast *= 255;
        var factor = (contrast + 255) / (255.01 - contrast);  //add .1 to avoid /0 error.

        for (var i = 0; i < data.length; i+=4) {
            data[i] = factor * (data[i] - 128) + 128;
            data[i+1] = factor * (data[i+1] - 128) + 128;
            data[i+2] = factor * (data[i+2] - 128) + 128;
        }

        secondContext.putImageData(imageData, 0, 0);

        return imageData;  //optional (e.g. for filter function chaining)
    }

    // Change the contrast and apply that to the image
    obj.contrast = function(val) { // contrast input as percent; range [-1..1]
        if (! Number.isNaN(parseFloat(val))) {
            properties.contrast = val;
        }

        refreshFilters();
    }

    // Apply the brightness on the image data
    var runBrightness = function () {  // brightness input as percent; range [-1..1]
        var brightness = properties.brightness;
        var imageData = secondContext.getImageData(0, 0, secondCanvas.width, secondCanvas.height);

        var data = imageData.data;  // Note: original dataset modified directly!
        brightness *= 255;

        for (var i = 0; i < data.length; i+=4) {
            data[i] += brightness;
            data[i+1] += brightness;
            data[i+2] += brightness;
        }

        secondContext.putImageData(imageData, 0, 0);

        return imageData;  //optional (e.g. for filter function chaining)
    }

    // Change the brightness and apply that to the image
    obj.brightness = function(val) {
        if (! Number.isNaN(parseFloat(val))) {
            properties.brightness = val;
        }

        refreshFilters();
    }

    /**
     * Returns the current image type
     */
    obj.getImageType = function() {
        var dataType = obj.image.src.substr(0,20);
        if (dataType.includes('data')){
            return dataType.split('/')[1].split(';')[0];
        }
        return null;
    }
     /**
     * Returns cropped area coordinates
     */
    obj.getSelectionCoordinates = function() {
        return {
            left: crop.offsetLeft,
            top: crop.offsetTop,
            right: crop.offsetLeft + crop.clientWidth,
            bottom: crop.offsetTop + crop.clientHeight
        }
    }

    /**
     * Returns cropped image on canvas
     */
    obj.getCroppedImage = function() {
        return jSuites.image.create({
            extension: obj.getImageType(),
            file: obj.getCroppedContent(),
            name: '',
            size: '',
        });
    }

    /**
     * Get cropped base64 content
     */
    obj.getCroppedContent = function() {
        var coordinates = obj.getSelectionCoordinates();
        var canvasCropped = document.createElement('canvas');
        var contextCropped = canvasCropped.getContext('2d');
        canvasCropped.width = crop.clientWidth;
        canvasCropped.height = crop.clientHeight;

        // Get cropped selection
        var imageData = context.getImageData(coordinates.left, coordinates.top, crop.clientWidth, crop.clientHeight);
        contextCropped.putImageData(imageData,0,0);
        return canvasCropped.toDataURL(obj.getImageType());
    }

    /**
     * Get cropped as blob
     */
    obj.getCroppedAsBlob = function(callback) {
        if (! typeof(callback) == 'function') {
            console.error('Callback not defined')
            return false;
        }

        var coordinates = obj.getSelectionCoordinates();
        var canvasCropped = document.createElement('canvas');
        var contextCropped = canvasCropped.getContext('2d');
        canvasCropped.width = crop.clientWidth;
        canvasCropped.height = crop.clientHeight;

        // Get cropped selection
        var imageData = context.getImageData(coordinates.left, coordinates.top, crop.clientWidth, crop.clientHeight);
        contextCropped.putImageData(imageData,0,0);

        // Callback
        canvasCropped.toBlob(callback);
    }

    /**
     * Returns the current image on canvas
     */
    obj.getImage = function() {
        return obj.image;
    }

    /**
     *  Returns the attachment input
     */
    obj.getFileInput = function() { 
        return attachmentInput;
    }

    /**
     * Returns the current canvas
     */
    obj.getCanvas = function() {
        return canvas;
    }

    /**
     * Load a image from the computer
     */
    obj.addFromFile = function(file) {
        var type = file.type.split('/');
        if (type[0] == 'image') {
            var imageFile = new FileReader();
            imageFile.addEventListener("load", function (v) {
                obj.image.src = v.target.result;
            });
            imageFile.readAsDataURL(file);
        } else {
            alert(obj.options.text.extensionNotAllowed);
        }
    }

    /**
     * Load a image from a remote URL
     */
    obj.addFromUrl = function(src) {
        if (src.substr(0,4) != 'data' && ! obj.options.remoteParser) {
            console.error('remoteParser not defined in your initialization');
        } else {
            src = obj.options.remoteParser + src;
            obj.image.src = src;
        }
    }

    // X-axis spacing of the zoom at the last scroll change
    var zoomOffsetX;

    // Y-axis spacing of the zoom at the last scroll change
    var zoomOffsetY;

    // Mouse position on the x-axis in the last use of the scroll
    var lastX;

    // Mouse position on the y-axis in the last use of the scroll
    var lastY;

    // Last zoom applied
    var lastScale;

    // Runs image movements
    var runMove = function() {
        // If the mouse was moved after the last scroll, it moves the image in relation to the x-axis
        if (lastX && lastX !== properties.zoom.origin.x) {
            var temp = Math.abs(properties.zoom.origin.x - zoomOffsetX - obj.image.left);
            temp /= lastScale;
            temp -= properties.zoom.origin.x - obj.image.left;

            obj.image.left -= temp;
        }

        // If the mouse was moved after the last scroll, it moves the image in relation to the y-axis
        if (lastY && lastY !== properties.zoom.origin.y) {
            var temp = Math.abs(properties.zoom.origin.y - zoomOffsetY - obj.image.top);
            temp /= lastScale;
            temp -= properties.zoom.origin.y - obj.image.top;

            obj.image.top -= temp;
        }

        // Update variables
        zoomOffsetX = (properties.zoom.origin.x - obj.image.left) - (properties.zoom.origin.x - obj.image.left) * properties.zoom.scale;
        zoomOffsetY = (properties.zoom.origin.y - obj.image.top) - (properties.zoom.origin.y - obj.image.top) * properties.zoom.scale;
        lastX = properties.zoom.origin.x;
        lastY = properties.zoom.origin.y;
        lastScale = properties.zoom.scale;

        // Move image
        context.translate(obj.image.left + zoomOffsetX, obj.image.top + zoomOffsetY);
    }

    // Reload resizers and filters
    var refreshResizers = function() {
        // Clear canvas
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);

        runMove();

        // Performs the zoom, if its value is different from the initial
        if (properties.zoom.scale !== 1) {
            runZoom();
        }

        // Performs the rotation, if its value is different from the initial
        if (properties.rotate) {
            runRotate();
        }

        // Calls the filter reloader
        if (properties.brightness || properties.contrast) {
            context.drawImage(secondImage, 0, 0, secondImage.width, secondImage.height);
        } else {
            context.drawImage(obj.image, 0, 0, obj.image.width, obj.image.height);
        }
    }

    // Apply the zoom on the image
    var runZoom = function() {
        context.scale(properties.zoom.scale, properties.zoom.scale);
    }

    /**
     * Change the zoom and apply that to the image
     * @param mixed value / null to refresh or int for a new percentage of zoom
     */
    obj.zoom = function(value) {
        if (value) {
            properties.zoom.scale = value;
        }
        refreshResizers();
    }

    // Apply the rotations on the image
    var runRotate = function() {
        var value = properties.rotate;
        value *= 180;

        context.translate(obj.image.width / 2, obj.image.height / 2);
        context.rotate(value * Math.PI / 180);
        context.translate(- obj.image.width / 2, - obj.image.height / 2);
    }

    // Change the rotation and apply that to the image
    obj.rotate = function(val) {  // rotate input as percent; range [-1..1]
        if (! Number.isNaN(parseFloat(val))) {
            properties.rotate = val;
        }

        refreshResizers();
    }

    // HTML element to load a image from the computer
    var attachmentInput = document.createElement('input');
    attachmentInput.type = 'file';
    attachmentInput.setAttribute('accept', 'image/*');
    attachmentInput.onchange = function() {
        for (var i = 0; i < this.files.length; i++) {
            obj.addFromFile(this.files[i]);
        }
    }

    /** Events start here **/
    var editorAction = null;
    var scaling = null;

    var editorMouseUp = function(e) {
        editorAction = false;
    }

    var editorMouseDown = function(e) {
        if (e.target.classList.contains('jcrop-area')) {
            var rect = e.target.getBoundingClientRect();

            var offsetX = (e.target.style.left !== '') ? e.target.style.left : '0px';
            var offsetY = (e.target.style.top !== '') ? e.target.style.top : '0px';

            if (e.target.style.cursor) {
                editorAction = {
                    e: e.target,
                    x: e.clientX,
                    y: e.clientY,
                    w: rect.width,
                    h: rect.height,
                    d: e.target.style.cursor,
                    xOffset: e.clientX - parseInt(offsetX.slice(0, offsetX.length - 2)),
                    yOffset: e.clientY - parseInt(offsetY.slice(0, offsetY.length - 2)),
                }

                if (! e.target.style.width) {
                    e.target.style.width = rect.width + 'px';
                }

                if (! e.target.style.height) {
                    e.target.style.height = rect.height + 'px';
                }

                var s = window.getSelection();
                if (s.rangeCount) {
                    for (var i = 0; i < s.rangeCount; i++) {
                        s.removeRange(s.getRangeAt(i));
                    }
                }
            }
        } else { 
            editorAction = true;
        }
    }

    var editorMouseMove = function(e) {
        e = e || window.event;
        if (typeof(e.buttons) !== undefined) {
            var mouseButton = e.buttons;
        } else if (typeof(e.button) !== undefined) {
            var mouseButton = e.button;
        } else {
            var mouseButton = e.which;
        }

        if (! e.buttons) {
            if (e.target.classList.contains('jcrop-area')) {
                var rect = e.target.getBoundingClientRect();
                if (obj.options.allowResize == true) {
                    if (e.clientY - rect.top < 5) {
                        if (rect.width - (e.clientX - rect.left) < 5) {
                            e.target.style.cursor = 'ne-resize';
                        } else if (e.clientX - rect.left < 5) {
                            e.target.style.cursor = 'nw-resize';
                        } else {
                            e.target.style.cursor = 'n-resize';
                        }
                    } else if (rect.height - (e.clientY - rect.top) < 5) {
                        if (rect.width - (e.clientX - rect.left) < 5) {
                            e.target.style.cursor = 'se-resize';
                        } else if (e.clientX - rect.left < 5) {
                            e.target.style.cursor = 'sw-resize';
                        } else {
                            e.target.style.cursor = 's-resize';
                        }
                    } else if (rect.width - (e.clientX - rect.left) < 5) {
                        e.target.style.cursor = 'e-resize';
                    } else if (e.clientX - rect.left < 5) {
                        e.target.style.cursor = 'w-resize';
                    } else {
                        e.target.style.cursor = 'move';
                    }
                } else {
                    e.target.style.cursor = 'move';
                }
            }
        }

        if (mouseButton == 1 && editorAction && editorAction.d) {
            // Change position or size
            if (editorAction.d == 'move') {
                // Change the position of the cropper
                var cropOffsetX = e.clientX - editorAction.xOffset;
                var cropOffsetY = e.clientY - editorAction.yOffset;

                if (cropOffsetX < 0) {
                    editorAction.e.style.left = '0px';
                } else if (cropOffsetX > el.offsetWidth - crop.offsetWidth - 2) {
                    editorAction.e.style.left = el.offsetWidth - crop.offsetWidth - 2 + 'px';
                } else {
                    editorAction.e.style.left = cropOffsetX + 'px';
                }
                
                if (cropOffsetY < 0) {
                    editorAction.e.style.top = '0px';
                } else if (cropOffsetY > el.offsetHeight - crop.offsetHeight - 2){
                    editorAction.e.style.top = el.offsetHeight - crop.offsetHeight - 2 + 'px';
                } else {
                    editorAction.e.style.top = cropOffsetY + 'px';
                }
            } else {
                // Change the size of the cropper
                if (editorAction.d == 'e-resize' || editorAction.d == 'ne-resize' ||  editorAction.d == 'se-resize') {
                    // Handles size changes involving the right side of the cropper
                    var newWidth = editorAction.w + e.clientX - editorAction.x;
                    var offset = editorAction.e.style.left.slice(0, editorAction.e.style.left.length - 2);

                    if (newWidth < obj.options.crop[0]) {
                        editorAction.e.style.width = obj.options.crop[0] + 'px';
                    } else if (newWidth + parseInt(offset) > el.offsetWidth - 2) {
                        editorAction.e.style.width = el.offsetWidth - offset - 2 + 'px';
                    } else {
                        editorAction.e.style.width = editorAction.w + e.clientX - editorAction.x + 'px';
                    }
                } else if (editorAction.d == 'w-resize' || editorAction.d == 'nw-resize' ||  editorAction.d == 'sw-resize') {
                    // Handles size changes involving the left side of the cropper
                    var newOffset = e.clientX - editorAction.xOffset;
                    var newWidth = editorAction.x + editorAction.w - e.clientX;

                    if (newWidth < obj.options.crop[0]) {
                        editorAction.e.style.left = editorAction.x + editorAction.w - obj.options.crop[0] - editorAction.xOffset + 'px';
                        editorAction.e.style.width = obj.options.crop[0] + 'px';
                    } else if (newOffset < 0) {
                        editorAction.e.style.left = '0px';
                        editorAction.e.style.width = editorAction.x + editorAction.w - editorAction.xOffset + 'px';
                    } else {
                        editorAction.e.style.left = newOffset + 'px';
                        editorAction.e.style.width = newWidth + 'px';
                    }
                }

                if (editorAction.d == 's-resize' || editorAction.d == 'se-resize' ||  editorAction.d == 'sw-resize') {
                    // Handles size changes involving the top side of the cropper
                    var newHeight = editorAction.h + e.clientY - editorAction.y;
                    var offset = editorAction.e.style.top.slice(0, editorAction.e.style.top.length - 2);

                    if (newHeight < obj.options.crop[1]) {
                        editorAction.e.style.height = obj.options.crop[1] + 'px';
                    } else if (newHeight + parseInt(offset) > el.offsetHeight - 2) {
                        editorAction.e.style.height = el.offsetHeight - parseInt(offset) - 2 + 'px';
                    } else {
                        editorAction.e.style.height = newHeight + 'px';
                    }
                } else if (editorAction.d == 'n-resize' || editorAction.d == 'ne-resize' ||  editorAction.d == 'nw-resize') {
                    // Handles size changes involving the bottom side of the cropper
                    var newOffset = e.clientY - editorAction.yOffset;
                    var newHeight = editorAction.h + editorAction.y - e.clientY;

                    if (newHeight < obj.options.crop[1]) {
                        editorAction.e.style.top = editorAction.y + editorAction.h - obj.options.crop[1] - editorAction.yOffset + 'px';
                        editorAction.e.style.height = obj.options.crop[1] + 'px';
                    } else if (newOffset < 0) {
                        editorAction.e.style.top = '0px';
                        editorAction.e.style.height = editorAction.y + editorAction.h - editorAction.yOffset + 'px';
                    } else {
                        editorAction.e.style.top = newOffset + 'px';
                        editorAction.e.style.height = newHeight + 'px';
                    }
                }
            }
        }
    }

    // image state to change its current position in el container (mobile only)
    var imageState = {
        mousedown: false,
        mouseX: 0,
        mouseY: 0
    }

    var touchstartListener = function(e) {
        if (! e.target.classList.contains('jcrop-area')) {
            imageState.mousedown = true;
        }

        if (e.changedTouches && e.changedTouches[0]) {
            imageState.mouseX = e.changedTouches[0].clientX;
            imageState.mouseY = e.changedTouches[0].clientY;
        } else {
            imageState.mouseX = e.clientX;
            imageState.mouseY = e.clientY;
        }

        if (e.touches) {
            if(e.touches.length == 2) {
                imageState.mousedown = false;
                scaling = true;
                pinchStart(e);
            }
        }
    }
    var touchEndListener = function(e) {
        if (scaling) {
            scaling = false;
        }
    }

    var imageMoveListener = function(e) {
        if (el.classList.contains('jcrop_edition') && ! scaling) {
            // Mark position
            if (e.changedTouches && e.changedTouches[0]) {
                var x = e.changedTouches[0].clientX;
                var y = e.changedTouches[0].clientY;
            } else {
                var x = e.clientX;
                var y = e.clientY;
            }

            var currentX = x;
            var newX = currentX - imageState.mouseX;
            imageState.mouseX = currentX;

            var currentY = y;
            var newY = currentY - imageState.mouseY;
            imageState.mouseY = currentY;

            if (imageState.mousedown) {
                obj.image.left += newX/properties.zoom.scale;
                obj.image.top += newY/properties.zoom.scale;
                refreshResizers();
            }

            e.preventDefault();
        }

        if(scaling) {
            pinchMove(e);
        }
    }

    document.addEventListener('mouseup', function(e) {
        imageState.mousedown = false;
    });

    el.addEventListener('mouseup', editorMouseUp);
    el.addEventListener('mousedown', editorMouseDown);
    el.addEventListener('mousemove', editorMouseMove);
    el.addEventListener('touchstart',touchstartListener);

    el.addEventListener('touchend', touchEndListener);
    el.addEventListener('touchmove', imageMoveListener);
    el.addEventListener('mousedown',touchstartListener);
    el.addEventListener('mousemove', imageMoveListener);

    el.addEventListener("dblclick", function(e) {
        jSuites.click(attachmentInput);
    });

    el.addEventListener('dragenter', function(e) {
        el.style.border = '1px dashed #000';
    });

    el.addEventListener('dragleave', function(e) {
        el.style.border = '1px solid #eee';
    });

    el.addEventListener('dragstop', function(e) {
        el.style.border = '1px solid #eee';
    });

    el.addEventListener('dragover', function(e) {
        e.preventDefault();
    });

    el.addEventListener('drop', function(e) {
        e.preventDefault();  
        e.stopPropagation();


        var html = (e.originalEvent || e).dataTransfer.getData('text/html');
        var file = (e.originalEvent || e).dataTransfer.files;

        if (file.length) {
            for (var i = 0; i < e.dataTransfer.files.length; i++) {
                obj.addFromFile(e.dataTransfer.files[i]);
            }
        } else if (html) {
            // Create temp element
            var div = document.createElement('div');
            div.innerHTML = html;

            // Extract images
            var img = div.querySelector('img');

            if (img) {
                obj.addFromUrl(img.src);
            }
        }

        el.style.border = '1px solid #eee';

        return false;
    });

    el.addEventListener("wheel", function(e) {
        if (el.classList.contains('jcrop_edition')) {
            // Update scale
            if (e.deltaY > 0) {
                if (properties.zoom.scale > 0.1) {
                    properties.zoom.scale *= 0.9;
                }
            } else {
                if (properties.zoom.scale < 5) {
                    properties.zoom.scale *= 1.1;
                }
            }
            properties.zoom.scale = parseFloat(properties.zoom.scale.toFixed(2));

            // Update coordinates
            var rect = el.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;

            // Zoom on the image
            var c = context.getImageData(x, y, 1, 1).data;
            if (c[3] != 0) {
                properties.zoom.origin.x = x;
                properties.zoom.origin.y = y;
            } else {
            }

            // Apply zoom
            obj.zoom();

            e.preventDefault();
        }
    });

    // mobile events
    el.addEventListener("click", function(e) {
        if (! el.classList.contains('jcrop_edition')) {
            jSuites.click(attachmentInput);
        }
    });

    // Onchange
    if (typeof(obj.options.onload) == 'function') {
        obj.options.onload(el, obj);
    }

    // Mobile pinch zoom
    var pinchStart = function(e) {
        var rect = el.getBoundingClientRect();
        properties.zoom.fingerDistance = Math.hypot(
                e.touches[0].pageX - e.touches[1].pageX,
                e.touches[0].pageY - e.touches[1].pageY);

        properties.zoom.origin.x = ((e.touches[0].pageX - rect.left) + (e.touches[1].pageX - rect.left))/2;
        properties.zoom.origin.y = ((e.touches[0].pageY - rect.top) + (e.touches[1].pageY - rect.top))/2;
    }

    var pinchMove = function(e) {
        e.preventDefault();

        var dist2 = Math.hypot(e.touches[0].pageX - e.touches[1].pageX,e.touches[0].pageY - e.touches[1].pageY);

        if (dist2 > properties.zoom.fingerDistance) {
            var dif =  dist2 - properties.zoom.fingerDistance;
            var newZoom = properties.zoom.scale + properties.zoom.scale * dif * 0.0025;
            if (newZoom <= 5.09) {
               obj.zoom(newZoom);
            }
        }

        if (dist2 < properties.zoom.fingerDistance) {
            var dif =  properties.zoom.fingerDistance - dist2;
            var newZoom = properties.zoom.scale - properties.zoom.scale * dif * 0.0025;
            if (newZoom >= 0.1) {
               obj.zoom(newZoom);
            }
        }
        properties.zoom.fingerDistance = dist2;
    }

    // Initial options
    obj.setOptions(options);

    el.crop = obj;

    return obj;
});

jSuites.heatMap = (function(el, options) {
    // New instance
    var obj = {};
    obj.options = {};

    // Create and apply the plugin body
    var createBody = function() {
        // Highest value in the data list
        var maxValue = obj.options.data.reduce(function(max, current) {
            return max > current.value ? max : current.value;
        }, 0);

        // Represents the date currently being used
        var date = new Date(obj.options.date);
        date.setDate(date.getDate() + 1);

        // Variable that stores the month currently being used
        var month = date.getMonth();

        // Array that stores the tds that correspond to the days until these tds are added to their respective table
        var setOfDays = [
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ];

        // Month name abbreviations
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        // Variable that stores the html that will later be inserted in the body of the plugin
        var pluginBody = `
          <table>
            <tbody>
              <tr>
                <td rowspan="2">Sun</td>
              </tr>
              <tr>
                <td></td>
              </tr>
              <tr>
                <td></td>
              </tr>
              <tr>
                <td></td>
              </tr>
              <tr>
                <td></td>
              </tr>
              <tr>
                <td></td>
              </tr>
              <tr>
                <td>Sat</td>
              </tr>
            </tbody>
          </table>
        `;

        pluginBody += `
          <table>
            <thead>
              <tr>
                <td colspan="6">${monthNames[date.getMonth()]}</td>
              </tr>
            </thead>
            <tbody>
        `;

        // Add empty tds to create an offset if the month doesn't start on Sunday
        var aux = 0;
        for (var aux = 0; aux < date.getDay(); aux++) {
            setOfDays[aux].push('<td class="blank-day"></td>');
        }

        // Last date that the plugin should show
        var finalDate = new Date(obj.options.date);
        finalDate.setFullYear(finalDate.getFullYear() + 1);

        var timeFinalDate = finalDate.getTime();

        // Function that checks the condition of the cycle
        var isValidDate = function() {
            return date.getTime() <= timeFinalDate;
        }

        // Cycle that spans one year from the date entered in the date parameter
        while (isValidDate()) {
            // Adaptation due to the difference of one day when creating a date object with a string
            var adaptedDate = new Date(date.getTime());
            adaptedDate.setDate(adaptedDate.getDate() - 1);

            var textAdaptedDate = adaptedDate.toISOString().slice(0, 10);

            // Object in the data array that corresponds to the date currently being treated
            var currentDay = obj.options.data.find(function(day) {
                return day.date === textAdaptedDate;
            });

            // If currentDay exists, a TD referring to it is added with a color resulting from its value
            if (currentDay) {
                var percentage = Math.trunc((currentDay.value * 100) / maxValue);

                var colorPosition = Math.trunc((percentage / 10) / 2);
                if (colorPosition > 4) {
                    colorPosition = 4;
                }

                setOfDays[date.getDay()].push(`<td style="background-color: ${obj.options.colors[colorPosition]}"></td>`);

                // If currentDay does not exist, a date with the day-not-informed class is added
            } else {
                setOfDays[date.getDay()].push(`<td class="day-not-informed"></td>`);
            }

            // Increment the date being treated by one day
            date.setDate(date.getDate() + 1);

            // If the date used in the next cycle is a different month from the treaty until then, fill in and close the month table
            if (date.getMonth() !== month) {
                setOfDays.forEach(function(days) {
                    pluginBody += '<tr>';

                    days.forEach(function(day) {
                        pluginBody += day;
                    })

                    pluginBody += '</tr>';
                });

                // Reset variable setOfDays
                setOfDays = [
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    []
                ];

                pluginBody += '</tbody></table>';

                // If the new date value is valid for entering the cycle again, a new table starts
                if (isValidDate()) {
                    pluginBody += `
                        <table>
                          <thead>
                            <tr>
                              <td colspan="6">${monthNames[date.getMonth()]}</td>
                            </tr>
                          </thead>
                          <tbody>
                      `;

                    // Add empty tds to create an offset if the month doesn't start on Sunday
                    var aux = 0;
                    for (var aux = 0; aux < date.getDay(); aux++) {
                        setOfDays[aux].push('<td class="blank-day"></td>');
                    }

                    // Update the variable that stores the current month
                    month = date.getMonth();
                }
            }
        }

        // Fill in and close the last month table
        setOfDays.forEach(function(days) {
            pluginBody += '<tr>';

            days.forEach(function(day) {
                pluginBody += day;
            });

            pluginBody += '</tr>';
        });

        pluginBody += '</tbody></table>';

        // Apply the plugin body to the tag passed as an argument
        el.getElementsByClassName('jheat-map-body')[0].innerHTML = pluginBody;
    }

    obj.setData = function(data) {
        obj.options.data = data;

        createBody();
    }

    obj.getData = function() {
        return obj.options.data.map(function(element) {
            return element;
        });
    }

    // Initializes the plugin
    var init = (function() {
        var defaults = {
            title: '',
            tooltip: false,
            colors: ['#FFECB3', '#FFD54F', '#FFC107', '#FFA000', '#FF6F00'],
            data: [],
            date: new Date().toISOString().slice(0, 10),
            onload: null,
        }

        // Fill the obj.options object
        for (var property in defaults) {
            if (options && options.hasOwnProperty(property)) {
                obj.options[property] = options[property];
            } else {
                obj.options[property] = defaults[property];
            }
        }

        // Add the plugin class to the tag that will receive it
        el.classList.add('jheat-map');

        // Apply the plugin header if it was passed as an argument
        if (obj.options.title !== '') {
            var pluginHeader = `
                <div class="jheat-map-header">${obj.options.title}</div>
              `;

            el.innerHTML = pluginHeader;
        }

        // Apply the plugin body if it was passed as an argument
        if (obj.options.data) {
            el.innerHTML += '<div class="jheat-map-body"></div>';
            createBody();
        }

        // Apply the plugin tooltip if it was passed as an argument
        if (obj.options.tooltip) {
            var pluginFooter = `
                <div class="jheat-map-footer">
                  <div>Less</div>
                  <table>
                    <tr>
                      <td style="background-color: ${obj.options.colors[0]}"></td>
                      <td style="background-color: ${obj.options.colors[1]}"></td>
                      <td style="background-color: ${obj.options.colors[2]}"></td>
                      <td style="background-color: ${obj.options.colors[3]}"></td>
                      <td style="background-color: ${obj.options.colors[4]}"></td>
                    </tr>
                  </table>
                  <div>More</div>
                </div>
              `;

            el.innerHTML += pluginFooter;
        }

        // Call the onload function, if it was passed as an argument
        if (obj.options.onload) {
            obj.options.onload(el, obj);
        }
    })();

    return obj;
});

jSuites.login = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        url: window.location.href,
        prepareRequest: null,
        accessToken: null,
        deviceToken: null,
        facebookUrl: null,
        facebookAuthentication: null,
        maxHeight: null,
        onload: null,
        onsuccess: null,
        onerror: null,
        message: null,
        logo: null,
        newProfile: false,
        newProfileUrl: false,
        newProfileLogin: false,
        fullscreen: false,
        newPasswordValidation: null,
    };

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    // Message console container
    if (! obj.options.message) {
        var messageElement = document.querySelector('.message');
        if (messageElement) {
            obj.options.message = messageElement;
        }
    }

    // Action
    var action = null;

    // Container
    var container = document.createElement('form');
    el.appendChild(container);

    // Logo
    var divLogo = document.createElement('div');
    divLogo.className = 'jlogin-logo'
    container.appendChild(divLogo);

    if (obj.options.logo) {
        var logo = document.createElement('img');
        logo.src = obj.options.logo;
        divLogo.appendChild(logo);
    }

    // Code
    var labelCode = document.createElement('label');
    labelCode.innerHTML = 'Please enter here the code received';
    var inputCode = document.createElement('input');
    inputCode.type = 'number';
    inputCode.id = 'code';
    inputCode.setAttribute('maxlength', 6);
    var divCode = document.createElement('div');
    divCode.appendChild(labelCode);
    divCode.appendChild(inputCode);

    // Hash
    var inputHash = document.createElement('input');
    inputHash.type = 'hidden';
    inputHash.name = 'h';
    var divHash = document.createElement('div');
    divHash.appendChild(inputHash);

    // Recovery
    var inputRecovery = document.createElement('input');
    inputRecovery.type = 'hidden';
    inputRecovery.name = 'recovery';
    inputRecovery.value = '1';
    var divRecovery = document.createElement('div');
    divRecovery.appendChild(inputRecovery);

    // Login
    var labelLogin = document.createElement('label');
    labelLogin.innerHTML = 'Login';
    var inputLogin = document.createElement('input');
    inputLogin.type = 'text';
    inputLogin.name = 'login';
    inputLogin.setAttribute('autocomplete', 'off');
    inputLogin.onkeyup = function() {
        this.value = this.value.toLowerCase().replace(/[^a-zA-Z0-9_+]+/gi, '');
    } 
    var divLogin = document.createElement('div');
    divLogin.appendChild(labelLogin);
    divLogin.appendChild(inputLogin);

    // Name
    var labelName = document.createElement('label');
    labelName.innerHTML = 'Name';
    var inputName = document.createElement('input');
    inputName.type = 'text';
    inputName.name = 'name';
    var divName = document.createElement('div');
    divName.appendChild(labelName);
    divName.appendChild(inputName);

    // Email
    var labelUsername = document.createElement('label');
    labelUsername.innerHTML = 'E-mail';
    var inputUsername = document.createElement('input');
    inputUsername.type = 'text';
    inputUsername.name = 'username';
    inputUsername.setAttribute('autocomplete', 'new-username');
    var divUsername = document.createElement('div');
    divUsername.appendChild(labelUsername);
    divUsername.appendChild(inputUsername);

    // Password
    var labelPassword = document.createElement('label');
    labelPassword.innerHTML = 'Password';
    var inputPassword = document.createElement('input');
    inputPassword.type = 'password';
    inputPassword.name = 'password';
    inputPassword.setAttribute('autocomplete', 'new-password');
    var divPassword = document.createElement('div');
    divPassword.appendChild(labelPassword);
    divPassword.appendChild(inputPassword);
    divPassword.onkeydown = function(e) {
        if (e.keyCode == 13) {
            obj.execute();
        }
    }

    // Repeat password
    var labelRepeatPassword = document.createElement('label');
    labelRepeatPassword.innerHTML = 'Repeat the new password';
    var inputRepeatPassword = document.createElement('input');
    inputRepeatPassword.type = 'password';
    inputRepeatPassword.name = 'password';
    var divRepeatPassword = document.createElement('div');
    divRepeatPassword.appendChild(labelRepeatPassword);
    divRepeatPassword.appendChild(inputRepeatPassword);

    // Remember checkbox
    var labelRemember = document.createElement('label');
    labelRemember.innerHTML = 'Remember me on this device';
    var inputRemember = document.createElement('input');
    inputRemember.type = 'checkbox';
    inputRemember.name = 'remember';
    inputRemember.value = '1';
    labelRemember.appendChild(inputRemember);
    var divRememberButton = document.createElement('div');
    divRememberButton.className = 'rememberButton';
    divRememberButton.appendChild(labelRemember);

    // Login button
    var actionButton = document.createElement('input');
    actionButton.type = 'button';
    actionButton.value = 'Log In';
    actionButton.onclick = function() {
        obj.execute();
    }
    var divActionButton = document.createElement('div');
    divActionButton.appendChild(actionButton);

    // Cancel button
    var cancelButton = document.createElement('div');
    cancelButton.innerHTML = 'Cancel';
    cancelButton.className = 'cancelButton';
    cancelButton.onclick = function() {
        obj.requestAccess();
    }
    var divCancelButton = document.createElement('div');
    divCancelButton.appendChild(cancelButton);

    // Captcha
    var labelCaptcha = document.createElement('label');
    labelCaptcha.innerHTML = 'Please type here the code below';
    var inputCaptcha = document.createElement('input');
    inputCaptcha.type = 'text';
    inputCaptcha.name = 'captcha';
    var imageCaptcha = document.createElement('img');
    var divCaptcha = document.createElement('div');
    divCaptcha.className = 'jlogin-captcha';
    divCaptcha.appendChild(labelCaptcha);
    divCaptcha.appendChild(inputCaptcha);
    divCaptcha.appendChild(imageCaptcha);

    // Facebook
    var facebookButton = document.createElement('div');
    facebookButton.innerHTML = 'Login with Facebook';
    facebookButton.className = 'facebookButton';
    var divFacebookButton = document.createElement('div');
    divFacebookButton.appendChild(facebookButton);
    divFacebookButton.onclick = function() {
        obj.requestLoginViaFacebook();
    }
    // Forgot password
    var inputRequest = document.createElement('span');
    inputRequest.innerHTML = 'Request a new password';
    var divRequestButton = document.createElement('div');
    divRequestButton.className = 'requestButton';
    divRequestButton.appendChild(inputRequest);
    divRequestButton.onclick = function() {
        obj.requestNewPassword();
    }
    // Create a new Profile
    var inputNewProfile = document.createElement('span');
    inputNewProfile.innerHTML = 'Create a new profile';
    var divNewProfileButton = document.createElement('div');
    divNewProfileButton.className = 'newProfileButton';
    divNewProfileButton.appendChild(inputNewProfile);
    divNewProfileButton.onclick = function() {
        obj.newProfile();
    }

    el.className = 'jlogin';

    if (obj.options.fullscreen == true) {
        el.classList.add('jlogin-fullscreen');
    }

    /** 
     * Show message
     */
    obj.showMessage = function(data) {
        var message = (typeof(data) == 'object') ? data.message : data;

        if (typeof(obj.options.showMessage) == 'function') {
            obj.options.showMessage(data);
        } else {
            jSuites.alert(data);
        }
    }

    /**
     * New profile
     */
    obj.newProfile = function() {
        container.innerHTML = '';
        container.appendChild(divLogo);
        if (obj.options.newProfileLogin) {
            container.appendChild(divLogin);
        }
        container.appendChild(divName);
        container.appendChild(divUsername);
        container.appendChild(divActionButton);
        if (obj.options.facebookAuthentication == true) {
            container.appendChild(divFacebookButton);
        }
        container.appendChild(divCancelButton);

        // Reset inputs
        inputLogin.value = '';
        inputUsername.value = '';
        inputPassword.value = '';

        // Button
        actionButton.value = 'Create new profile';

        // Action
        action = 'newProfile';
    }

    /**
     * Request the email with the recovery instructions
     */
    obj.requestNewPassword = function() {
        if (Array.prototype.indexOf.call(container.children, divCaptcha) >= 0) {
            var captcha = true;
        }

        container.innerHTML = '';
        container.appendChild(divLogo);
        container.appendChild(divRecovery);
        container.appendChild(divUsername);
        if (captcha) {
            container.appendChild(divCaptcha);
        }
        container.appendChild(divActionButton);
        container.appendChild(divCancelButton);
        actionButton.value = 'Request a new password';
        inputRecovery.value = 1;

        // Action
        action = 'requestNewPassword';
    }

    /**
     * Confirm recovery code
     */
    obj.codeConfirmation = function() {
        container.innerHTML = '';
        container.appendChild(divLogo);
        container.appendChild(divHash);
        container.appendChild(divCode);
        container.appendChild(divActionButton);
        container.appendChild(divCancelButton);
        actionButton.value = 'Confirm code';
        inputRecovery.value = 2;

        // Action
        action = 'codeConfirmation';
    }

    /**
     * Update my password
     */
    obj.changeMyPassword = function(hash) {
        container.innerHTML = '';
        container.appendChild(divLogo);
        container.appendChild(divHash);
        container.appendChild(divPassword);
        container.appendChild(divRepeatPassword);
        container.appendChild(divActionButton);
        container.appendChild(divCancelButton);
        actionButton.value = 'Change my password';
        inputHash.value = hash;

        // Action
        action = 'changeMyPassword';
    }

    /**
     * Request access default method
     */
    obj.requestAccess = function() {
        container.innerHTML = '';
        container.appendChild(divLogo);
        container.appendChild(divUsername);
        container.appendChild(divPassword);
        container.appendChild(divActionButton);
        if (obj.options.facebookAuthentication == true) {
            container.appendChild(divFacebookButton);
        }
        container.appendChild(divRequestButton);
        container.appendChild(divRememberButton);
        container.appendChild(divRequestButton);
        if (obj.options.newProfile == true) {
            container.appendChild(divNewProfileButton);
        }

        // Button
        actionButton.value = 'Login';

        // Password
        inputPassword.value = '';

        // Email persistence
        if (window.localStorage.getItem('username')) {
            inputUsername.value = window.localStorage.getItem('username');
            inputPassword.focus();
        } else {
            inputUsername.focus();
        }

        // Action
        action = 'requestAccess';
    }

    /**
     * Request login via facebook
     */
    obj.requestLoginViaFacebook = function() {
        if (typeof(deviceNotificationToken) == 'undefined') {
            FB.getLoginStatus(function(response) {
                if (! response.status || response.status != 'connected') {
                    FB.login(function(response) {
                        if (response.authResponse) {
                            obj.execute({ f:response.authResponse.accessToken });
                        } else {
                            obj.showMessage('Not authorized by facebook');
                        }
                    }, {scope: 'public_profile,email'});
                } else {
                    obj.execute({ f:response.authResponse.accessToken });
                }
            }, true);
        } else {
            jDestroy = function() {
                fbLogin.removeEventListener('loadstart', jStart);
                fbLogin.removeEventListener('loaderror', jError);
                fbLogin.removeEventListener('exit', jExit);
                fbLogin.close();
                fbLogin = null;
            }

            jStart = function(event) {
                var url = event.url;
                if (url.indexOf("access_token") >= 0) {
                    setTimeout(function(){
                        var u = url.match(/=(.*?)&/);
                        if (u[1].length > 32) {
                            obj.execute({ f:u[1] });
                        }
                        jDestroy();
                   },500);
                }

                if (url.indexOf("error=access_denied") >= 0) {
                   setTimeout(jDestroy ,500);
                   // Not authorized by facebook
                   obj.showMessage('Not authorized by facebook');
                }
            }

            jError = function(event) {
                jDestroy();
            }
        
            jExit = function(event) {
                jDestroy();
            }

            fbLogin = window.open(obj.options.facebookUrl, "_blank", "location=no,closebuttoncaption=Exit,disallowoverscroll=yes,toolbar=no");
            fbLogin.addEventListener('loadstart', jStart);
            fbLogin.addEventListener('loaderror', jError);
            fbLogin.addEventListener('exit', jExit);
        }

        // Action
        action = 'requestLoginViaFacebook';
    }

    // Perform request
    obj.execute = function(data) {
        // New profile
        if (action == 'newProfile') {
            var pattern = new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/);
            if (! inputUsername.value || ! pattern.test(inputUsername.value)) {
                var message = 'Invalid e-mail address'; 
            }

            var pattern = new RegExp(/^[a-zA-Z0-9\_\-\.\s+]+$/);
            if (! inputLogin.value || ! pattern.test(inputLogin.value)) {
                var message = 'Invalid username, please use only characters and numbers';
            }

            if (message) {
                obj.showMessage(message);
                return false;
            }
        } else if (action == 'changeMyPassword') {
            if (inputPassword.value.length < 3) {
                var message = 'Password is too short';
            } else  if (inputPassword.value != inputRepeatPassword.value) {
                var message = 'Password should match';
            } else {
                if (typeof(obj.options.newPasswordValidation) == 'function') {
                    var val = obj.options.newPasswordValidation(obj, inputPassword.value, inputPassword.value);
                    if (val != undefined) {
                        message = val;
                    }
                }
            }

            if (message) {
                obj.showMessage(message);
                return false;
            }
        }

        // Keep email
        if (inputUsername.value != '') {
            window.localStorage.setItem('username', inputUsername.value);
        }

        // Captcha
        if (Array.prototype.indexOf.call(container.children, divCaptcha) >= 0) {
            if (inputCaptcha.value == '') {
                obj.showMessage('Please enter the captch code below');
                return false;
            }
        }

        // Url
        var url = obj.options.url;

        // Device token
        if (obj.options.deviceToken) {
            url += '?token=' + obj.options.deviceToken;
        }

        // Callback
        var onsuccess = function(result) {
            if (result) {
                // Successfully response
                if (result.success == 1) {
                    // Recovery process
                    if (action == 'requestNewPassword') {
                        obj.codeConfirmation();
                    } else if (action == 'codeConfirmation') {
                        obj.requestAccess();
                    } else if (action == 'newProfile') {
                        obj.requestAccess();
                        // New profile
                        result.newProfile = true;
                    }

                    // Token
                    if (result.token) {
                        // Set token
                        obj.options.accessToken = result.token;
                        // Save token
                        window.localStorage.setItem('Access-Token', result.token);
                    }
                }

                // Show message
                if (result.message) {
                    // Show message
                    obj.showMessage(result.message)
                }

                // Request captcha code
                if (! result.data) {
                    if (Array.prototype.indexOf.call(container.children, divCaptcha) >= 0) {
                        divCaptcha.remove();
                    }
                } else {
                    container.insertBefore(divCaptcha, divActionButton);
                    imageCaptcha.setAttribute('src', 'data:image/png;base64,' + result.data);
                }

                // Give time to user see the message
                if (result.hash) {
                    // Change password
                    obj.changeMyPassword(result.hash);
                } else if (result.url) {
                    // App initialization
                    if (result.success == 1) {
                        if (typeof(obj.options.onsuccess) == 'function') {
                            obj.options.onsuccess(result);
                        } else {
                            if (result.message) {
                                setTimeout(function() { window.location.href = result.url; }, 2000);
                            } else {
                                window.location.href = result.url;
                            }
                        }
                    } else {
                        if (typeof(obj.options.onerror) == 'function') {
                            obj.options.onerror(result);
                        }
                    }
                }
            }
        }

        // Password
        if (! data) {
            var data = jSuites.form.getElements(el, true);
            // Encode passworfd
            if (data.password) {
                data.password = jSuites.sha512(data.password);
            }
            // Recovery code
            if (Array.prototype.indexOf.call(container.children, divCode) >= 0 && inputCode.value) {
                data.h = jSuites.sha512(inputCode.value);
            }
        }

        // Loading
        el.classList.add('jlogin-loading');

        // Url
        var url = (action == 'newProfile' && obj.options.newProfileUrl) ? obj.options.newProfileUrl : obj.options.url;

        // Remote call
        jSuites.ajax({
            url: url,
            method: 'POST',
            dataType: 'json',
            data: data,
            success: function(result) {
                // Remove loading
                el.classList.remove('jlogin-loading');
                // Callback
                onsuccess(result);
            },
            error: function(result) {
                // Error
                el.classList.remove('jlogin-loading');

                if (typeof(obj.options.onerror) == 'function') {
                    obj.options.onerror(result);
                }
            }
        });
    }

    var queryString = window.location.href.split('?');
    if (queryString[1] && queryString[1].length == 130 && queryString[1].substr(0,2) == 'h=') {
        obj.changeMyPassword(queryString[1].substr(2));
    } else {
        obj.requestAccess();
    }

    return obj;
});

jSuites.login.sha512 = jSuites.sha512;

jSuites.menu = (function(el, options) {
    var obj = {};

    obj.show = function() {
        el.style.display = 'block';
        jSuites.animation.slideLeft(el, 1);
    }

    obj.hide = function() {
        jSuites.animation.slideLeft(el, 0, function() {
            el.style.display = '';
        });
    }

    obj.load = function() {
        if (localStorage) {
            var menu = el.querySelectorAll('nav');
            var selected = null;
            for (var i = 0; i < menu.length; i++) {
                menu[i].classList.remove('selected');
                if (menu[i].getAttribute('data-id')) {
                    var state = localStorage.getItem('jmenu-' + menu[i].getAttribute('data-id'));
                    if (state === null || state == 1) {
                        menu[i].classList.add('selected');
                    }
                }
            }
            var href = window.location.pathname;
            if (href) {
                var menu = document.querySelector('.jmenu a[href="'+ href +'"]');
                if (menu) {
                    menu.classList.add('selected');
                }
            }
        }
    }

    obj.select = function(o) {
        var menu = el.querySelectorAll('nav a');
        for (var i = 0; i < menu.length; i++) {
            menu[i].classList.remove('selected');
        }
        o.classList.add('selected');

        // Better navigation
        if (options && options.collapse == true) {
            if (o.classList.contains('show')) {
                menu = el.querySelectorAll('nav');
                for (var i = 0; i < menu.length; i++) {
                    menu[i].style.display = '';
                }
                o.style.display = 'none';
            } else {
                menu = el.querySelectorAll('nav');
                for (var i = 0; i < menu.length; i++) {
                    menu[i].style.display = 'none';
                }

                menu = el.querySelector('.show');
                if (menu) {
                    menu.style.display = 'block';
                }

                menu = jSuites.findElement(o.parentNode, 'selected');
                if (menu) {
                    menu.style.display = '';
                }
            }
        }

        // Close menu if is oped
        if (jSuites.getWindowWidth() < 800) {
            obj.hide();
        }
    }

    var actionDown = function(e) {
        if (e.target.tagName == 'H2') {
            if (e.target.parentNode.classList.contains('selected')) {
                e.target.parentNode.classList.remove('selected');
                localStorage.setItem('jmenu-' + e.target.parentNode.getAttribute('data-id'), 0);
            } else {
                e.target.parentNode.classList.add('selected');
                localStorage.setItem('jmenu-' + e.target.parentNode.getAttribute('data-id'), 1);
            }
        } else if (e.target.tagName == 'A') {
            // Mark link as selected
            obj.select(e.target);
        }
    }

    if ('ontouchstart' in document.documentElement === true) {
        el.addEventListener('touchstart', actionDown);
    } else {
        el.addEventListener('mousedown', actionDown);
    }

    // Add close action
    var i = document.createElement('i');
    i.className = 'material-icons small-screen-only close';
    i.innerText = 'close';
    i.onclick = function() {
        obj.hide();
    }
    el.appendChild(i);

    // Add menu class
    el.classList.add('jmenu');

    // Load state
    obj.load();

    if (options && typeof(options.onload) == 'function') {
        options.onload(el);
    }

    // Keep reference
    el.menu = obj;

    return obj;
});


jSuites.signature = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        width: '100%',
        height: '120px',
        lineWidth: 3,
        onchange: null,
        value: null,
        readonly: false,
    }

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    el.style.width = obj.options.width;
    el.style.height = obj.options.height;
    el.classList.add('jsignature');

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    el.appendChild(canvas);

   // Position
    var x = null;
    var y = null;

    // Coordinates
    var coordinates = [];

    obj.setValue = function(c) {
        obj.reset();

        ctx.beginPath();
        ctx.lineWidth = obj.options.lineWidth;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#000';
        ctx.moveTo(c[0][0], c[0][1]);

        for (var i = 1; i < c.length; i++) {
            ctx.lineTo(c[i][0], c[i][1]);
            ctx.stroke();
        }
    }

    obj.getValue = function() {
        return coordinates;
    }

    obj.reset = function() {
        coordinates = [];
        ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    var setPosition = function(e) {
        // Mark position
        if (e.changedTouches && e.changedTouches[0]) {
            var rect = e.target.getBoundingClientRect();
            x = e.changedTouches[0].clientX - rect.x;
            y = e.changedTouches[0].clientY - rect.y;
        } else {
            x = e.offsetX;
            y = e.offsetY;
        }
    }

    var resize = function() {
        ctx.canvas.width = el.offsetWidth;
        ctx.canvas.height = el.offsetHeight;
    }

    var draw = function(e) {
        if (x == null || obj.options.readonly == true) {
            return false;
        } else {
            e = e || window.event;
            if (e.buttons) {
                var mouseButton = e.buttons;
            } else if (e.button) {
                var mouseButton = e.button;
            } else {
                var mouseButton = e.which;
            }

            coordinates.push([ x, y ]);

            ctx.beginPath();
            ctx.lineWidth = obj.options.lineWidth;
            ctx.lineCap = 'round';
            ctx.strokeStyle = '#000';
            ctx.moveTo(x, y);
            setPosition(e);
            ctx.lineTo(x, y);
            ctx.stroke();

            e.preventDefault();
            e.stopPropagation();
        }
    }

    var finalize = function() {
        x = null;
        y = null;
    }

    window.addEventListener('resize', resize);

    if ('ontouchmove' in document.documentElement === true) {
        el.addEventListener('touchstart', setPosition);
        el.addEventListener('touchmove', draw);
        el.addEventListener('touchend', finalize);
    } else {
        el.addEventListener('mousedown', setPosition);
        el.addEventListener('mousemove', draw);
        el.addEventListener('mouseup', finalize);
    }

    resize();

    if (obj.options.value) {
        obj.setValue(obj.options.value);
    }

    el.signature = obj;

    return obj;
});

jSuites.template = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        url: null,
        data: null,
        filter: null,
        pageNumber: 0,
        numberOfPages: 0,
        template: null,
        render: null,
        noRecordsFound: 'No records found',
        containerClass: null,
        // Searchable
        search: null,
        searchInput: true,
        searchPlaceHolder: '',
        searchValue: '',
        // Remote search
        remoteData: null,
        // Pagination page number of items
        pagination: null,
        onload: null,
        onupdate: null,
        onchange: null,
        onsearch: null,
        onclick: null,
    }

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    // Reset content
    el.innerHTML = '';

    // Input search
    if (obj.options.search && obj.options.searchInput == true) {
        // Timer
        var searchTimer = null;

        // Search container
        var searchContainer = document.createElement('div');
        searchContainer.className = 'jtemplate-results';
        obj.searchInput = document.createElement('input');
        obj.searchInput.value = obj.options.searchValue;
        obj.searchInput.onkeyup = function(e) {
            // Clear current trigger
            if (searchTimer) {
                clearTimeout(searchTimer);
            }
            // Prepare search
            searchTimer = setTimeout(function() {
                obj.search(obj.searchInput.value.toLowerCase());
                searchTimer = null;
            }, 300)
        }
        searchContainer.appendChild(obj.searchInput);
        el.appendChild(searchContainer);

        if (obj.options.searchPlaceHolder) {
            obj.searchInput.setAttribute('placeholder', obj.options.searchPlaceHolder);
        }
    }

    // Pagination container
    if (obj.options.pagination) {
        var pagination = document.createElement('div');
        pagination.className = 'jtemplate-pagination';
        el.appendChild(pagination);
    }

    // Content
    var container = document.createElement('div');
    if (obj.options.containerClass) {
        container.className = obj.options.containerClass;
    }
    container.classList.add ('jtemplate-content');
    el.appendChild(container);

    // Data container
    var searchResults = null;

    obj.updatePagination = function() {
        // Reset pagination container
        if (pagination) {
            pagination.innerHTML = '';
        }

        // Create pagination
        if (obj.options.pagination > 0 && obj.options.numberOfPages > 1) {
            // Number of pages
            var numberOfPages = obj.options.numberOfPages;

            // Controllers
            if (obj.options.pageNumber < 6) {
                var startNumber = 1;
                var finalNumber = numberOfPages < 10 ? numberOfPages : 10;
            } else if (numberOfPages - obj.options.pageNumber < 5) {
                var startNumber = numberOfPages - 9;
                var finalNumber = numberOfPages;
                if (startNumber < 1) {
                    startNumber = 1;
                }
            } else {
                var startNumber = obj.options.pageNumber - 4;
                var finalNumber = obj.options.pageNumber + 5;
            }

            // First
            if (startNumber > 1) {
                var paginationItem = document.createElement('div');
                paginationItem.innerHTML = '<';
                paginationItem.title = 1;
                pagination.appendChild(paginationItem);
            }

            // Get page links
            for (var i = startNumber; i <= finalNumber; i++) {
                var paginationItem = document.createElement('div');
                paginationItem.innerHTML = i;
                pagination.appendChild(paginationItem);

                if (obj.options.pageNumber == i - 1) {
                    paginationItem.style.fontWeight = 'bold';
                }
            }

            // Last
            if (finalNumber < numberOfPages) {
                var paginationItem = document.createElement('div');
                paginationItem.innerHTML = '>';
                paginationItem.title = numberOfPages - 1;
                pagination.appendChild(paginationItem);
            }
        }
    }

    var parse = function(element) {
        // Attributes
        var attr = {};

        if (element.attributes && element.attributes.length) {
            for (var i = 0; i < element.attributes.length; i++) {
                attr[element.attributes[i].name] = element.attributes[i].value;
            }
        }

        // Keys
        var k = Object.keys(attr);

        if (k.length) {
            for (var i = 0; i < k.length; i++) {
                // Parse events
                if (k[i].substring(0,2) == 'on') {
                    // Get event
                    var event = k[i].toLowerCase();
                    var value = attr[k[i]];

                    // Get action
                    element.removeAttribute(event);
                    if (! element.events) {
                        element.events = []
                    }

                    // Keep method to the event
                    element[k[i].substring(2)] = value;
                    element[event] = function(e) {
                        Function('e', element[e.type]).call(obj.options.template, e);
                    }
                }
            }
        }

        // Check the children
        if (element.children.length) {
            for (var i = 0; i < element.children.length; i++) {
                parse(element.children[i]);
            }
        }
    }

    /**
     * Append data to the template and add to the DOMContainer
     * @param data
     * @param contentDOMContainer
     */
    obj.setContent = function(a, b) {
        // Get template
        var c = obj.options.template[Object.keys(obj.options.template)[0]](a, obj);
        // Process events
        if ((c instanceof Element || c instanceof HTMLDocument)) {
            b.appendChild(c);
        } else {
            b.innerHTML = c;
        }

        parse(b);
    }

    obj.addItem = function(data, beginOfDataSet) {
        // Append itens
        var content = document.createElement('div');
        // Append data
        if (beginOfDataSet) {
            obj.options.data.unshift(data);
        } else {
            obj.options.data.push(data);
        }
        // If is empty remove indication
        if (container.classList.contains('jtemplate-empty')) {
            container.classList.remove('jtemplate-empty');
            container.innerHTML = '';
        }
        // Get content
        obj.setContent(data, content);
        // Add animation
        jSuites.animation.fadeIn(content.children[0]);
        // Add and do the animation
        if (beginOfDataSet) {
            container.prepend(content.children[0]);
        } else {
            container.append(content.children[0]);
        }
        // Onchange method
        if (typeof(obj.options.onchange) == 'function') {
            obj.options.onchange(el, obj.options.data);
        }
    }

    obj.removeItem = function(element) {
        if (Array.prototype.indexOf.call(container.children, element) > -1) {
            // Remove data from array
            var index = obj.options.data.indexOf(element.dataReference);
            if (index > -1) {
                obj.options.data.splice(index, 1);
            }
            // Remove element from DOM
            jSuites.animation.fadeOut(element, function() {
                element.parentNode.removeChild(element);

                if (! container.innerHTML) {
                    container.classList.add('jtemplate-empty');
                    container.innerHTML = obj.options.noRecordsFound;
                }
            });
        } else {
            console.error('Element not found');
        }
    }

    obj.setData = function(data) {
        if (data) {
            obj.options.pageNumber = 1;
            obj.options.searchValue = '';
            // Set data
            obj.options.data = data;
            // Reset any search results
            searchResults = null;

            // Render new data
            obj.render();

            // Onchange method
            if (typeof(obj.options.onchange) == 'function') {
                obj.options.onchange(el, obj.options.data);
            }
        }
    }

    obj.appendData = function(data, pageNumber) {
        if (pageNumber) {
            obj.options.pageNumber = pageNumber;
        }

        var execute = function(data) {
            // Concat data
            obj.options.data.concat(data);
            // Number of pages
            if (obj.options.pagination > 0) {
                obj.options.numberOfPages = Math.ceil(obj.options.data.length / obj.options.pagination);
            }
            var startNumber = 0;
            var finalNumber = data.length;
            // Append itens
            var content = document.createElement('div');
            for (var i = startNumber; i < finalNumber; i++) {
                obj.setContent(data[i], content)
                content.children[0].dataReference = data[i]; // TODO: data[i] or i?
                container.appendChild(content.children[0]);
            }
        }

        if (obj.options.url && obj.options.remoteData == true) {
            // URL
            var url = obj.options.url;
            // Data
            var ajaxData = {};
            // Options for backend search
            if (obj.options.remoteData) {
                // Search value
                if (obj.options.searchValue) {
                    ajaxData.q = obj.options.searchValue;
                }
                // Page number
                if (obj.options.pageNumber) {
                    ajaxData.p = obj.options.pageNumber;
                }
                // Number items per page
                if (obj.options.pagination) {
                    ajaxData.t = obj.options.pagination;
                }
            }
            // Remote loading
            jSuites.ajax({
                url: url,
                method: 'GET',
                data: ajaxData,
                dataType: 'json',
                success: function(data) {
                    execute(data);
                }
            });
        } else {
            if (! obj.options.data) {
                console.log('TEMPLATE: no data or external url defined');
            } else {
                execute(data);
            }
        }
    }

    obj.renderTemplate = function() {
        // Data container
        var data = searchResults ? searchResults : obj.options.data;

        // Data filtering
        if (typeof(obj.options.filter) == 'function') {
            data = obj.options.filter(data);
        }

        // Reset pagination
        obj.updatePagination();

        if (! data.length) {
            container.innerHTML = obj.options.noRecordsFound;
            container.classList.add('jtemplate-empty');
        } else {
            // Reset content
            container.classList.remove('jtemplate-empty');

            // Create pagination
            if (obj.options.pagination && data.length > obj.options.pagination) {
                var startNumber = (obj.options.pagination * obj.options.pageNumber);
                var finalNumber = (obj.options.pagination * obj.options.pageNumber) + obj.options.pagination;

                if (data.length < finalNumber) {
                    var finalNumber = data.length;
                }
            } else {
                var startNumber = 0;
                var finalNumber = data.length;
            }

            // Append itens
            var content = document.createElement('div');
            for (var i = startNumber; i < finalNumber; i++) {
                // Get content
                obj.setContent(data[i], content);
                content.children[0].dataReference = data[i]; 
                container.appendChild(content.children[0]);
            }
        }
    }

    obj.render = function(pageNumber, forceLoad) {
        // Update page number
        if (pageNumber != undefined) {
            obj.options.pageNumber = pageNumber;
        } else {
            if (! obj.options.pageNumber && obj.options.pagination > 0) {
                obj.options.pageNumber = 0;
            }
        }

        // Render data into template
        var execute = function() {
            // Render new content
            if (typeof(obj.options.render) == 'function') {
                container.innerHTML = obj.options.render(obj);
            } else {
                container.innerHTML = '';
            }

            // Load data
            obj.renderTemplate();

            // On Update
            if (typeof(obj.options.onupdate) == 'function') {
                obj.options.onupdate(el, obj, pageNumber);
            }

            if (forceLoad) {
                // Onload
                if (typeof(obj.options.onload) == 'function') {
                    obj.options.onload(el, obj, pageNumber);
                }
            }
        }

        if (obj.options.url && (obj.options.remoteData == true || forceLoad)) {
            // URL
            var url = obj.options.url;
            // Data
            var ajaxData = {};
            // Options for backend search
            if (obj.options.remoteData) {
                // Search value
                if (obj.options.searchValue) {
                    ajaxData.q = obj.options.searchValue;
                }
                // Page number
                if (obj.options.pageNumber) {
                    ajaxData.p = obj.options.pageNumber;
                }
                // Number items per page
                if (obj.options.pagination) {
                    ajaxData.t = obj.options.pagination;
                }
            }
            // Remote loading
            jSuites.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                data: ajaxData,
                success: function(data) {
                    // Search and keep data in the client side
                    if (data.hasOwnProperty("total")) {
                        obj.options.numberOfPages = Math.ceil(data.total / obj.options.pagination);
                        obj.options.data = data.data;
                    } else {
                        // Number of pages
                        if (obj.options.pagination > 0) {
                            obj.options.numberOfPages = Math.ceil(data.length / obj.options.pagination);
                        }
                        obj.options.data = data;
                    }

                    // Load data for the user
                    execute();
                }
            });
        } else {
            if (! obj.options.data) {
                console.log('TEMPLATE: no data or external url defined');
            } else {
                // Number of pages
                if (obj.options.pagination > 0) {
                    if (searchResults) {
                        obj.options.numberOfPages = Math.ceil(searchResults.length / obj.options.pagination);
                    } else {
                        obj.options.numberOfPages = Math.ceil(obj.options.data.length / obj.options.pagination);
                    }
                }
                // Load data for the user
                execute();
            }
        }
    }

    obj.search = function(query) {
        obj.options.pageNumber = 0;
        obj.options.searchValue = query ? query : '';

        // Filter data
        if (obj.options.remoteData == true || ! query) {
            searchResults = null;
        } else {
            var test = function(o, query) {
                for (var key in o) {
                    var value = o[key];

                    if ((''+value).toLowerCase().search(query) >= 0) {
                        return true;
                    }
                }
                return false;
            }

            searchResults = obj.options.data.filter(function(item) {
                return test(item, query);
            });
        }

        obj.render();

        if (typeof(obj.options.onsearch) == 'function') {
            obj.options.onsearch(el, obj, query);
        }
    }

    obj.refresh = function() {
        obj.render();
    }

    obj.reload = function() {
        obj.render(0, true);
    }

    el.addEventListener('mousedown', function(e) {
        if (e.target.parentNode.classList.contains('jtemplate-pagination')) {
            var index = e.target.innerText;
            if (index == '<') {
                obj.render(0);
            } else if (index == '>') {
                obj.render(e.target.getAttribute('title'));
            } else {
                obj.render(parseInt(index)-1);
            }
            e.preventDefault();
        }
    });

    el.addEventListener('click', function(e) {
        if (typeof(obj.options.onclick) == 'function') {
            obj.options.onclick(el, obj, e);
        }
    });

    el.template = obj;

    // Render data
    obj.render(0, true);

    return obj;
});

jSuites.timeline = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Two digits
    var two = function(value) {
        value = '' + value;
        if (value.length == 1) {
            value = '0' + value;
        }
        return value;
    }

    // Default date format
    if (! options.date) {
        var date = new Date();
        var y = date.getFullYear();
        var m = two(date.getMonth() + 1);
        date = y + '-' + m;
    }

    // Default configurations
    var defaults = {
        url: null,  
        data: [],
        date: date,
        months: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
        monthsFull: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
        onaction: null,
        text: {
            noInformation: '<div class="jtimeline-message">No information for this period</div>',
        }
    };

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    // Add class
    el.classList.add('jtimeline');

    // Header
    var timelineHeader = document.createElement('div');
    timelineHeader.className = 'jtimeline-header';

    var timelineLabel = document.createElement('div');
    timelineLabel.className = 'jtimeline-label';

    var timelineNavigation = document.createElement('div');
    timelineNavigation.className = 'jtimeline-navigation';

    // Labels 
    var timelineMonth = document.createElement('div');
    timelineMonth.className = 'jtimeline-month';
    timelineMonth.innerHTML = '';
    timelineLabel.appendChild(timelineMonth);

    var timelineYear = document.createElement('div');
    timelineYear.className = 'jtimeline-year';
    timelineYear.innerHTML = '';
    timelineLabel.appendChild(timelineYear);

    // Navigation
    var timelinePrev = document.createElement('div');
    timelinePrev.className = 'jtimeline-prev';
    timelinePrev.innerHTML = '<i class="material-icons">keyboard_arrow_left</i>';
    timelineNavigation.appendChild(timelinePrev);

    var timelineNext = document.createElement('div');
    timelineNext.className = 'jtimeline-next';
    timelineNext.innerHTML = '<i class="material-icons">keyboard_arrow_right</i>';
    timelineNavigation.appendChild(timelineNext);

    timelineHeader.appendChild(timelineLabel);
    timelineHeader.appendChild(timelineNavigation);

    // Data container
    var timelineContainer = document.createElement('div');
    timelineContainer.className = 'jtimeline-container';

    // Append headers
    el.appendChild(timelineHeader);
    el.appendChild(timelineContainer);

    // Date
    if (obj.options.date.length > 7) {
        obj.options.date = obj.options.date.substr(0, 7)
    }

    // Action
    var action = function(o) {
        // Get item
        var item = o.parentNode.parentNode.parentNode.parentNode;
        // Get id
        var id = item.getAttribute('data-id');

    }

    obj.setData = function(rows) {
        var data = [];
        for (var i = 0; i < rows.length; i++) {
            var d = rows[i].date.substr(0,7);

            // Create the object if not exists
            if (! data[d]) {
                data[d] = [];
            }

            // Create array
            data[d].push(rows[i]);
        };
        obj.options.data = data;
        obj.render(obj.options.date);
    }

    obj.add = function(data) {
        var date = data.date.substr(0,7);

        // Create the object if not exists
        if (! obj.options.data[date]) {
            obj.options.data[date] = [];
        }

        // Format date
        data.date = data.date.substr(0,10);

        // Append data
        obj.options.data[date].push(data);

        // Reorder
        obj.options.data[date] = obj.options.data[date].order();

        // Render
        obj.render(date);
    }

    obj.remove = function(item) {
        var index = item.getAttribute('data-index');
        var date = item.getAttribute('data-date');

        jSuites.animation.fadeOut(item, function() {
            item.remove();
        });

        obj.options.data[date].splice(index, 1);
    }

    obj.reload = function() {
        var date = obj.options.date
        obj.render(date);
    }

    obj.render = function(date) {
        // Filter
        if (date.length > 7) {
            var date = date.substr(0,7);
        }

        // Update current date
        obj.options.date = date;

        // Reset data
        timelineContainer.innerHTML = '';

        // Days
        var timelineDays = [];

        // Itens
        if (! obj.options.data[date]) {
            timelineContainer.innerHTML = obj.options.text.noInformation;
        } else {
            for (var i = 0; i < obj.options.data[date].length; i++) {
                var v = obj.options.data[date][i];
                var d = v.date.split('-');

                // Item container
                var timelineItem = document.createElement('div');
                timelineItem.className = 'jtimeline-item';
                timelineItem.setAttribute('data-id', v.id);
                timelineItem.setAttribute('data-index', i);
                timelineItem.setAttribute('data-date', date);

                // Date
                var timelineDateContainer = document.createElement('div');
                timelineDateContainer.className = 'jtimeline-date-container';

                var timelineDate = document.createElement('div');
                if (! timelineDays[d[2]]) {
                    timelineDate.className = 'jtimeline-date jtimeline-date-bullet';
                    timelineDate.innerHTML = d[2];
                } else {
                    timelineDate.className = 'jtimeline-date';
                    timelineDate.innerHTML = '';
                }
                timelineDateContainer.appendChild(timelineDate);

                var timelineContent = document.createElement('div');
                timelineContent.className = 'jtimeline-content';

                // Title
                if (! v.title) {
                    v.title = v.subtitle ? v.subtitle : 'Information';
                }

                var timelineTitleContainer = document.createElement('div');
                timelineTitleContainer.className = 'jtimeline-title-container';
                timelineContent.appendChild(timelineTitleContainer);

                var timelineTitle = document.createElement('div');
                timelineTitle.className = 'jtimeline-title';
                timelineTitle.innerHTML = v.title;
                timelineTitleContainer.appendChild(timelineTitle);

                var timelineControls = document.createElement('div');
                timelineControls.className = 'jtimeline-controls';
                timelineTitleContainer.appendChild(timelineControls);

                var timelineEdit = document.createElement('i');
                timelineEdit.className = 'material-icons timeline-edit';
                timelineEdit.innerHTML = 'edit';
                timelineEdit.onclick = function() {
                    if (typeof(obj.options.onaction) == 'function') {
                        obj.options.onaction(obj, this);
                    }
                }
                if (v.author == 1) {
                    timelineControls.appendChild(timelineEdit);
                }

                var timelineSubtitle = document.createElement('div');
                timelineSubtitle.className = 'jtimeline-subtitle';
                timelineSubtitle.innerHTML = v.subtitle ? v.subtitle : '';
                timelineContent.appendChild(timelineSubtitle);

                // Text
                var timelineText = document.createElement('div');
                timelineText.className = 'jtimeline-text';
                timelineText.innerHTML = v.text;
                timelineContent.appendChild(timelineText);

                // Tag
                var timelineTags = document.createElement('div');
                timelineTags.className = 'jtimeline-tags';
                timelineContent.appendChild(timelineTags);

                if (v.tags) {
                    var createTag = function(name, color) {
                        var timelineTag = document.createElement('div');
                        timelineTag.className = 'jtimeline-tag';
                        timelineTag.innerHTML = name;
                        if (color) {
                            timelineTag.style.backgroundColor = color;
                        }
                        return timelineTag; 
                    }

                    if (typeof(v.tags) == 'string') {
                        var t = createTag(v.tags);
                        timelineTags.appendChild(t);
                    } else {
                        for (var j = 0; j < v.tags.length; j++) {
                            var t = createTag(v.tags[j].text, v.tags[j].color);
                            timelineTags.appendChild(t);
                        }
                    }
                }

                // Day
                timelineDays[d[2]] = true;

                // Append Item
                timelineItem.appendChild(timelineDateContainer);
                timelineItem.appendChild(timelineContent);
                timelineContainer.appendChild(timelineItem);
            };
        }

        // Update labels
        var d = date.split('-');
        timelineYear.innerHTML = d[0];
        timelineMonth.innerHTML = obj.options.monthsFull[parseInt(d[1]) - 1];
    }

    obj.next = function() {
        // Update current date
        var d = obj.options.date.split('-');
        // Next month
        d[1]++;
        // Next year
        if (d[1] > 12) {
            d[0]++;
            d[1] = 1;
        }
        date = d[0] + '-' + (d[1] < 10 ? '0' + d[1] : d[1]);

        // Animation
        jSuites.animation.slideLeft(timelineContainer, 0, function() {
            obj.render(date);
            jSuites.animation.slideRight(timelineContainer, 1);
        });
    }

    obj.prev = function() {
        // Update current date
        var d = obj.options.date.split('-');
        // Next month
        d[1]--;
        // Next year
        if (d[1] < 1) {
            d[0]--;
            d[1] = 12;
        }
        date = d[0] + '-' + (d[1] < 10 ? '0' + d[1] : d[1]);

        // Animation
        jSuites.animation.slideRight(timelineContainer, 0, function() {
            obj.render(date);
            jSuites.animation.slideLeft(timelineContainer, 1);
        });
    }

    obj.load = function() {
        // Init
        if (obj.options.url) {
            jSuites.ajax({
                url: obj.options.url,
                type: 'GET',
                dataType:'json',
                success: function(data) {
                    // Timeline data
                    obj.setData(data);
                }
            });
        } else {
            // Timeline data
            obj.setData(obj.options.data);
        }
    }

    obj.reload = function() {
        obj.load();
    }

    obj.load();

    var timelineMouseUpControls = function(e) {
        if (e.target.classList.contains('jtimeline-next') || e.target.parentNode.classList.contains('jtimeline-next')) {
            obj.next();
        } else if (e.target.classList.contains('jtimeline-prev') || e.target.parentNode.classList.contains('jtimeline-prev')) {
            obj.prev();
        }
    }

    if ('ontouchend' in document.documentElement === true) {
        el.addEventListener("touchend", timelineMouseUpControls);
    } else {
        el.addEventListener("mouseup", timelineMouseUpControls);
    }

    // Add global events
    el.addEventListener("swipeleft", function(e) {
        obj.next();
        e.preventDefault();
        e.stopPropagation();
    });

    el.addEventListener("swiperight", function(e) {
        obj.prev();
        e.preventDefault();
        e.stopPropagation();
    });

    // Orderby
    Array.prototype.order = function() {
        return this.slice(0).sort(function(a, b) {
            var valueA = a.date;
            var valueB = b.date;

            return (valueA > valueB) ? 1 : (valueA < valueB) ? -1 : 0;
        });
    }

    el.timeline = obj;

    return obj;
});