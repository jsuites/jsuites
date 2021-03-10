import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import jSuites from "jsuites";
import cropper from "@jsuites/cropper";

import "jsuites/dist/jsuites.css";
import "jsuites/dist/jsuites.layout.css";
import "@jsuites/cropper/cropper.css";

function Cropper({ imageUrl, setImage, options }) {
  const [controls, setControls] = useState(false);

  const [zoom, setZoom] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);

  const tabsRef = useRef(null);
  const modalRef = useRef(null);
  const previewRef = useRef(null);
  const cropperRef = useRef(null);

  const jsuitesTabs = useRef(null);
  const jsuitesCrop = useRef(null);
  const jsuitesModal = useRef(null);

  const resetControls = () => {
    setZoom(1);
    setRotate(0);
    setBrightness(0);
    setContrast(0);
  }

  // Create tabs and modal
  useEffect(() => {
    if (!jsuitesTabs.current && !jsuitesModal.current) {
      // Create tabs
      jsuitesTabs.current = jSuites.tabs(tabsRef.current, {
        data: [
          {
            title: "Crop",
            icon: "crop",
            width: "100px"
          },
          {
            title: "Adjusts",
            icon: "image",
            width: "100px"
          }
        ],
        padding: "20px",
        animation: true,
        position: "bottom"
      });
      jsuitesTabs.current.content.style.backgroundColor = "#eee";

      // Create the modal
      jsuitesModal.current = jSuites.modal(modalRef.current, {
        closed: true,
        width: "800px",
        height: "600px",
        title: "Photo Upload",
        padding: "0",
      });
    }
  }, []);

  // Create cropper and update its options
  useEffect(() => {
    // Adjustment for the screen size
    const area = jSuites.getWindowWidth();

    let cropperArea;
    let cropArea;

    if (area < 800) {
      cropperArea = [area, area * 0.66];
      cropArea = [area, area * 0.66];
    } else {
      cropperArea = [798, 300];
      cropArea = [300, 200];
    }

    const defaultOptions = {
      area: cropperArea,
      crop: cropArea,
      allowResize: false
    };

    Object.assign(defaultOptions, options);

    jsuitesCrop.current = cropper(cropperRef.current, {
      ...defaultOptions,
      onchange: (element, image) => {
        resetControls();
        setControls(!!image);
      },
      eventListeners: {
        zoom: (value) => {
          setZoom(value);
        }
      }
    });

    jsuitesModal.current.close();
  }, [options]);

  // Refresh the preview when the image changes
  useEffect(() => {
    resetControls();

    previewRef.current.innerHTML = "";

    const image = document.createElement('img');
    image.style.maxWidth = '100%';
    image.style.maxHeight = '100%';
    image.src = imageUrl;

    previewRef.current.appendChild(image);
  }, [imageUrl]);

  useEffect(() => {
    jsuitesCrop.current.zoom(zoom);
  }, [zoom]);

  useEffect(() => {
    jsuitesCrop.current.rotate(rotate);
  }, [rotate]);

  useEffect(() => {
    jsuitesCrop.current.brightness(brightness);
  }, [brightness]);

  useEffect(() => {
    jsuitesCrop.current.contrast(contrast);
  }, [contrast]);

  const openModal = () => {
    if (!jsuitesModal.current.isOpen()) {
      resetControls();
      setControls(!!imageUrl);

      jsuitesModal.current.open();

      jsuitesCrop.current.setOptions({
        value: imageUrl
      });
    }
  };

  const updatePhoto = () => {
      jsuitesCrop.current.getCroppedAsBlob((blob) => {
        setImage(window.URL.createObjectURL(blob));
      });

      jsuitesModal.current.close();

      jsuitesCrop.current.reset();
  };

  const uploadPhoto = () => {
    jSuites.click(jsuitesCrop.current.getFileInput());
  };

  const deletePhoto = () => {
    setImage("");

    setControls(false);

    jsuitesCrop.current.reset();

    jsuitesModal.current.close();
  };

  return (
    <div style={{ height: "100px", width: "300px", fontFamily: "sans-serif", textAlign: "center" }}>
      <div ref={previewRef} onMouseUp={openModal} className="jupload" />
      <div ref={modalRef}>
        <div ref={cropperRef} />
        <div>
          <div ref={tabsRef}>
            <div>
              <div className="p10" style={{ backgroundColor: "white" }}></div>
              <div className="p10" style={{ backgroundColor: "white" }}></div>
            </div>
            <div style={{ backgroundColor: "#ccc" }}>
              <div>
                <label style={{ textAlign: "center", display: "inline-block" }}>
                  {" "}
                  Zoom
                  <input
                    type="range"
                    step={0.05}
                    min={0.1}
                    max={5.45}
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    style={{
                      display: "block"
                    }}
                    className="jrange"
                    disabled={!controls}
                  />
                </label>
                <label
                  style={{
                    textAlign: "center",
                    display: "inline-block",
                    marginLeft: "20px"
                  }}
                >
                  {" "}
                  Rotate
                  <input
                    type="range"
                    step={0.05}
                    min={-1}
                    max={1}
                    value={rotate}
                    onChange={(e) => setRotate(parseFloat(e.target.value))}
                    style={{
                      display: "block"
                    }}
                    className="jrange"
                    disabled={!controls}
                  />
                </label>
              </div>
              <div>
                <label style={{ textAlign: "center", display: "inline-block" }}>
                  {" "}
                  Brigthness
                  <input
                    type="range"
                    min={-1}
                    max={1}
                    step={0.05}
                    value={brightness}
                    onChange={(e) => setBrightness(parseFloat(e.target.value))}
                    style={{
                      display: "block"
                    }}
                    className="jrange"
                    disabled={!controls}
                  />
                </label>
                <label
                  style={{
                    textAlign: "center",
                    display: "inline-block",
                    marginLeft: "20px"
                  }}
                >
                  {" "}
                  Contrast
                  <input
                    type="range"
                    min={-1}
                    max={1}
                    step={0.05}
                    value={contrast}
                    onChange={(e) => setContrast(parseFloat(e.target.value))}
                    style={{
                      display: "block"
                    }}
                    className="jrange"
                    disabled={!controls}
                  />
                </label>
              </div>
            </div>
          </div>
          <div
            className="row p20 form-group"
            style={{ borderTop: "1px solid #aaa" }}
          >
            <div className="column p6 f1">
              <input
                type="button"
                value="Save Photo"
                className="jbutton dark w100"
                style={{
                  minWidth: "140px"
                }}
                onClick={updatePhoto}
                disabled={!controls}
              />
            </div>
            <div className="column p6">
              <input
                type="button"
                value="Upload Photo"
                className="jbutton dark w100"
                style={{
                  minWidth: "140px"
                }}
                onClick={uploadPhoto}
              />
            </div>
            <div className="column p6" style={{ textAlign: "right" }}>
              <input
                type="button"
                value="Delete Photo"
                className="jbutton dark w100"
                style={{
                  minWidth: "140px"
                }}
                onClick={deletePhoto}
                disabled={!controls}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Cropper.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  setImage: PropTypes.func.isRequired,
  options: PropTypes.shape({
    crop: PropTypes.arrayOf(PropTypes.number),
    remoteParser: PropTypes.string,
    allowResize: PropTypes.bool,
    text: PropTypes.object,
  })
};

export default Cropper;
