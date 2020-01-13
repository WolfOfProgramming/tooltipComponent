// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/scripts/renderInput.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderInput = renderInput;

function renderInput(activeInputs) {
  var formDeleteButton = "";
  var defaultInputText = '';

  if (activeInputs > 0) {
    formDeleteButton =
    /* HTML */
    "\n            <button class=\"form__delete\" type=\"button\"></button>\n        ";
  } else {
    defaultInputText = 'It is default input text.';
  }

  return "\n        <section class=\"form__section\">\n            <label class=\"form__label\" for=\"input\"\n                >Input\n                <span class=\"form__number\">".concat(activeInputs + 1, "</span></label\n            >\n            <div class=\"form__wrapper\">\n                <input\n                    class=\"form__input\"\n                    type=\"text\"\n                    name=\"input\"\n                    value=\"").concat(defaultInputText, "\"\n                />\n                ").concat(formDeleteButton, "\n            </div>\n        </section>\n    ");
}
},{}],"src/scripts/renderButton.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderButton = void 0;

var renderButton = function renderButton(type) {
  var button =
  /* HTML */
  "\n        <button class=\"form__button form__button--".concat(type, "\" type=\"button\">\n            ").concat(type, "\n        </button>\n    ");
  return button;
};

exports.renderButton = renderButton;
},{}],"src/scripts/validation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createErrorParagraphs = exports.isInputsCorrect = void 0;

var isInputsCorrect = function isInputsCorrect(inputs) {
  return !getEmptyInputs(inputs).length;
};

exports.isInputsCorrect = isInputsCorrect;

var createErrorParagraphs = function createErrorParagraphs(inputs) {
  var emptyInputs = getEmptyInputs(inputs);
  var errorParagraph =
  /* HTML */
  "\n        <p class=\"form__error\">The field cannot be empty</p>\n    ";
  emptyInputs.forEach(function (emptyInput) {
    return emptyInput.parentNode.insertAdjacentHTML('afterend', errorParagraph);
  });
};

exports.createErrorParagraphs = createErrorParagraphs;

var getEmptyInputs = function getEmptyInputs(inputs) {
  return Array.from(inputs).filter(function (input) {
    return input.value === '';
  });
};
},{}],"src/scripts/main.js":[function(require,module,exports) {
"use strict";

var _renderInput = require("./renderInput");

var _renderButton = require("./renderButton");

var _validation = require("./validation");

var formButtons = document.querySelector('.form__buttons');
var formContainer = document.querySelector('.form__container');
formButtons.insertAdjacentHTML('beforeend', (0, _renderButton.renderButton)('add'));
formButtons.insertAdjacentHTML('beforeend', (0, _renderButton.renderButton)('submit'));
var addButton = document.querySelector('.form__button--add');
var submitButton = document.querySelector('.form__button--submit');
var MAX_INPUT_COUNT = 6;
var activeInputs = 0;

var deleteErrorParagraphs = function deleteErrorParagraphs() {
  var formSections = document.querySelectorAll('.form__section');
  formSections.forEach(function (formSection) {
    var formError = formSection.querySelector('.form__error');

    if (formError) {
      formSection.removeChild(formError);
    }
  });
};

var updateCounter = function updateCounter(result) {
  if (result) {
    activeInputs += 1;
  } else {
    activeInputs -= 1;
  }
};

var updateNumbers = function updateNumbers() {
  var spans = document.querySelectorAll('.form__number');
  spans.forEach(function (span, index) {
    return span.textContent = index + 1;
  });
};

var generateInput = function generateInput(activeInputs) {
  var formInput = (0, _renderInput.renderInput)(activeInputs);
  formContainer.insertAdjacentHTML('beforeend', formInput);
  var currentElement = formContainer.lastElementChild;
  var currentDeleteButton = currentElement.querySelector('.form__delete');

  if (currentDeleteButton) {
    currentDeleteButton.addEventListener('click', function (e) {
      if (e.target.parentNode.parentNode.classList.contains('form__section')) {
        e.target.parentNode.parentNode.remove();
        deleteErrorParagraphs();
        updateNumbers();
        updateCounter(false);
        addButton.classList.remove('form__button--disabled');
      }
    });
  }

  currentElement.querySelector('.form__input').focus();
  updateCounter(true);
};

generateInput(activeInputs);
addButton.addEventListener('click', function () {
  var inputs = document.querySelectorAll('.form__input');
  deleteErrorParagraphs();

  if (activeInputs < MAX_INPUT_COUNT) {
    if ((0, _validation.isInputsCorrect)(inputs)) {
      generateInput(activeInputs);
    } else {
      (0, _validation.createErrorParagraphs)(inputs);
    }
  }

  if (activeInputs === MAX_INPUT_COUNT) {
    addButton.classList.add('form__button--disabled');
  }
});
submitButton.addEventListener('click', function (e) {
  e.preventDefault();
  deleteErrorParagraphs();
  var inputs = document.querySelectorAll('.form__input');

  if ((0, _validation.isInputsCorrect)(inputs)) {
    var url = new URL(document.URL);
    var inputsValues = [];
    inputs.forEach(function (input) {
      return inputsValues.push(input.value);
    });
    window.location.href = url.origin + '?passwords=' + inputsValues.join(';');
  } else {
    (0, _validation.createErrorParagraphs)(inputs);
  }
});
},{"./renderInput":"src/scripts/renderInput.js","./renderButton":"src/scripts/renderButton.js","./validation":"src/scripts/validation.js"}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "39003" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/scripts/main.js"], null)
//# sourceMappingURL=/main.a5838760.js.map