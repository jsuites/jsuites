/**
 * Modal progress
 * @example
 * jSuites.progress.open("My title");
 * jSuites.progress.set(10, "My step 1");
 * jSuites.progress.set(50, "My step 2");
 * jSuites.progress.set(100, "My step 3");
 * jSuites.progress.close();
 *
 * // system async
 * var load = async function() {
 *  await jSuites.progress.open();
 *
 *  await jSuites.progress.set(10, "Step");
 *
 *  await jSuites.progress.close();
 * }
 */
jSuites.progress = (function () {
  var obj = {};

  var modal = null;
  var elProgress = null;
  var elDescription = null;

  var titleModalInit = "Processing";
  var titleModal = titleModalInit;

  /**
   * init function
   * @private
   * @returns {undefined}
   */
  function init() {
    // create modalContainer
    var modalContainer = document.createElement("div");

    jSuites.loading.show();

    // create area description
    elDescription = document.createElement("div");
    elDescription.classList.add("jprogress-description");
    elDescription.style.textAlign = "center";
    elDescription.style.width = "100%";
    elDescription.style.height = "34px";
    elDescription.style.overflow = "hidden";

    // create progress
    elProgress = document.createElement("div");
    elProgress.classList.add("jprogress");
    elProgress.style.width = "100%";

    var elprogress = document.createElement("div");
    elprogress.style.width = "0%";

    elProgress.append(elprogress);

    // Create function setValue
    elProgress.setValue = function (p) {
      p = parseFloat(p);
      elprogress.style.width = p + "%";
      elprogress.innerHTML = p + "%";
    };

    // Append on modal
    modalContainer.append(elDescription);
    modalContainer.append(elProgress);

    // Append the modal to the DOM
    document.body.appendChild(modalContainer);

    // Create modal
    modal = jSuites.modal(modalContainer, {
      width: "600px",
      height: "150px",
      closed: false,
      title: titleModal + " …",
    });

    // put above to loading spin
    modal.container.style.zIndex = 10002;
    modal.content.style.overflow = "hidden";
  }

  /**
   * open modal
   * @param {string} title
   * @returns {undefined}
   */
  obj.open = function (title) {
    if (title) {
      titleModal = title;
    }

    if (!isLoaded()) {
      init();
    } else {
      modal.container.title = titleModal + " …";
    }

    return new Promise(function (resolve, reject) {
      obj.reset();
      modal.open();
      setTimeout(function () {
        resolve(true);
      }, 0);
    });
  };

  /**
   * close modal
   * @returns {undefined}
   */
  obj.close = function () {
    if (!isLoaded()) {
      return;
    }

    return new Promise(function (resolve, reject) {
      modal.close();
      jSuites.loading.hide();
      setTimeout(function () {
        resolve(true);
      }, 0);
    });
  };

  /**
   * define progress information
   * @param {int} pct
   * @param {string} information
   * @returns {undefined}
   */
  obj.set = function (pct, information) {
    if (!isLoaded()) {
      return;
    }

    pct = Math.min(parseInt(pct), 100);

    return new Promise(function (resolve, reject) {
      elProgress.setValue(pct);
      elDescription.innerHTML = information;
      setTimeout(function () {
        resolve(true);
      }, 0);
    });
  };

  /**
   * reset progress system
   * @returns {undefined}
   */
  obj.reset = function () {
    if (!isLoaded()) {
      return;
    }
    elDescription.innerHTML = "&nbsp;";
    elProgress.setValue(0);
    titleModal = titleModalInit;
  };

  /**
   * check if isLoaded
   * @private
   * @returns {boolean}
   */
  function isLoaded() {
    if (elProgress != null && elDescription != null && modal != null) {
      return true;
    } else {
      return false;
    }
  }

  return obj;
})();
