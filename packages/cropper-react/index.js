import React, { useState, useRef, useEffect } from "react";
import jSuites from "jsuites";
import cropper from "@jsuites/cropper";

import "./styles.css";
import "../node_modules/jsuites/dist/jsuites.css";
import "../node_modules/jsuites/dist/jsuites.layout.css";
import "../node_modules/@jsuites/cropper/cropper.css";

export default function App() {
  const [controls, setControls] = useState(false);

  const [zoom, setZoom] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);

  const tabsRef = useRef(null);
  const modalRef = useRef(null);
  const previewRef = useRef(null);
  const cropperRef = useRef(null);
  const tabs = useRef(null);
  const crop = useRef(null);
  const modal = useRef(null);

  useEffect(() => {
    // Adjustment for the screen size
    const area = jSuites.getWindowWidth();

    let a;
    let c;

    if (area < 800) {
      a = [area, area * 0.66];
      c = [area, 300];
    } else {
      a = [798, 300];
      c = [300, 200];
    }

    // Create tabs
    tabs.current = jSuites.tabs(tabsRef.current, {
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
    tabs.current.content.style.backgroundColor = "#eee";

    // Create cropper
    console.log(a, c);
    crop.current = cropper(cropperRef.current, {
      area: a,
      crop: c,
      allowResize: false,
      onchange: function (el, image) {
        if (image) {
          setControls(true);
        }
      }
    });

    // Create the modal
    modal.current = jSuites.modal(modalRef.current, {
      closed: true,
      width: "800px",
      height: "600px",
      title: "Photo Upload",
      padding: "0"
    });
  }, []);

  useEffect(() => {
    crop.current.zoom(zoom);
  }, [zoom]);

  useEffect(() => {
    crop.current.rotate(rotate);
  }, [rotate]);

  useEffect(() => {
    crop.current.brightness(brightness);
  }, [brightness]);

  useEffect(() => {
    crop.current.contrast(contrast);
  }, [contrast]);

  const openModal = () => {
    if (!modal.current.isOpen()) {
      // Open modale
      modal.current.open();
      // Create controls for the first time only
      if (!previewRef.current.classList.contains("controls")) {
        // Flag controls are ready
        previewRef.current.classList.add("controls");
      }
    }
  };

  const updatePhoto = () => {
    if (cropperRef.current.classList.contains("jcrop_edition")) {
      previewRef.current.innerHTML = "";

      const newImage = crop.current.getCroppedImage();
      newImage.style.width = "100%";

      var createImage = function (b) {
        newImage.content = newImage.src;

        newImage.src = window.URL.createObjectURL(b);

        previewRef.current.appendChild(newImage);
      };

      crop.current.getCroppedAsBlob(createImage);

      modal.current.close();
    }
  };

  const uploadPhoto = () => {
    jSuites.click(crop.current.getFileInput());
  };

  const deletePhoto = () => {
    crop.current.reset();

    modal.current.close();

    setControls(false);
  };

  return (
    <div className="App" style={{ height: "100px", width: "300px" }}>
      <div ref={previewRef} onMouseUp={openModal} className="jupload" />
      <div ref={modalRef}>
        <div ref={cropperRef}></div>
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
                    className="jrange controls"
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
                    className="jrange controls"
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
                    className="jrange controls"
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
                    className="jrange controls"
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
                className="jbutton dark controls w100"
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
                className="jbutton dark controls w100"
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
