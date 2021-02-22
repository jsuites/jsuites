/**
 * (c) jSuites Javascript Plugins and Web Components (v4)
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
    global.cropper = factory();
}(this, (function () {

    'use strict';

    if (! jSuites && typeof(require) === 'function') {
        var jSuites = require('jsuites');
        require('jsuites/dist/jsuites.css');
    }

    return (function(el, options) {
        // Already created, update options
        if (el.crop) {
            return el.crop.setOptions(options, true);
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
        obj.setOptions = function(options, reset) {
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
                    if (typeof(obj.options[property]) == 'undefined' || reset === true) {
                        obj.options[property] = defaults[property];
                    }
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
})));