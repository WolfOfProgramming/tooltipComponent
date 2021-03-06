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
})({"node_modules/lodash.debounce/index.js":[function(require,module,exports) {
var global = arguments[3];
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = debounce;

},{}],"src/scripts/renderTextOptions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderTextOptions = void 0;

var renderTextOptions = function renderTextOptions() {
  return (
    /* HTML */
    "\n        <div\n            class=\"settings-container__section settings-container__section--text\"\n        >\n            <h2 class=\"settings-container__heading\">Text</h2>\n            <ul\n                class=\"settings-container__settings-list settings-container__settings-list--text\"\n            >\n                <li class=\"text-settings-list__item\">\n                    <label for=\"text-color\">Text color(HEX)</label>\n                    <input\n                        type=\"text\"\n                        id=\"text-color\"\n                        name=\"color HEX\"\n                        value=\"#ffffff\"\n                        class=\"text-settings-list__text-color-input\"\n                    />\n                </li>\n\n                <li class=\"text-settings-list__item\">\n                    <label for=\"max-length\">Max text length</label>\n                    <input\n                        type=\"text\"\n                        id=\"max-length\"\n                        name=\"Max length\"\n                        value=\"100\"\n                        class=\"text-settings-list__max-text-lenght-input\"\n                    />\n                </li>\n                <li class=\"text-settings-list__item\">\n                    <textarea\n                        class=\"text-settings-list__text-input\"\n                        name=\"text-area\"\n                        id=\"text-area\"\n                        cols=\"30\"\n                        rows=\"10\"\n                    ></textarea>\n                </li>\n            </ul>\n        </div>\n    "
  );
};

exports.renderTextOptions = renderTextOptions;
},{}],"src/scripts/renderColorOptions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderColorOptions = void 0;

var renderColorOptions = function renderColorOptions() {
  return (
    /* HTML */
    "\n        <div\n            class=\"settings-container__section settings-container__section--color\"\n        >\n            <h2 class=\"settings-container__heading\">Color</h2>\n            <ul\n                class=\"settings-container__settings-list settings-container__settings-list--color\"\n            >\n                <li class=\"color-settings-list__item\">\n                    <input\n                        class=\"settings-container__input color-settings-list__input\"\n                        type=\"radio\"\n                        id=\"primary\"\n                        name=\"color\"\n                        value=\"primary\"\n                        checked\n                    />\n                    <label class=\"settings-container__label\" for=\"primary\"\n                        >Primary</label\n                    >\n                </li>\n                <li class=\"color-settings-list__item\">\n                    <input\n                        class=\"settings-container__input color-settings-list__input\"\n                        type=\"radio\"\n                        id=\"secondary\"\n                        name=\"color\"\n                        value=\"secondary\"\n                    />\n                    <label class=\"settings-container__label\" for=\"secondary\"\n                        >Secondary</label\n                    >\n                </li>\n                <li class=\"color-settings-list__item\">\n                    <input\n                        class=\"settings-container__input color-settings-list__input\"\n                        type=\"radio\"\n                        id=\"dark\"\n                        name=\"color\"\n                        value=\"dark\"\n                    />\n                    <label class=\"settings-container__label\" for=\"dark\"\n                        >Dark</label\n                    >\n                </li>\n\n                <li class=\"color-settings-list__item\">\n                    <input\n                        class=\"settings-container__input color-settings-list__input\"\n                        type=\"radio\"\n                        id=\"light\"\n                        name=\"color\"\n                        value=\"light\"\n                    />\n                    <label class=\"settings-container__label\" for=\"light\"\n                        >Light</label\n                    >\n                </li>\n                <li class=\"color-settings-list__item\">\n                    <input\n                        class=\"settings-container__input color-settings-list__input\"\n                        type=\"radio\"\n                        id=\"accent\"\n                        name=\"color\"\n                        value=\"accent\"\n                    />\n                    <label class=\"settings-container__label\" for=\"accent\"\n                        >Accent</label\n                    >\n                </li>\n            </ul>\n        </div>\n    "
  );
};

exports.renderColorOptions = renderColorOptions;
},{}],"src/scripts/renderPositionOptions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderPositionOptions = void 0;

var renderPositionOptions = function renderPositionOptions() {
  return (
    /* HTML */
    "\n        <div\n            class=\"settings-container__section settings-container__section--position\"\n        >\n            <h2 class=\"settings-container__heading\">Position</h2>\n            <ul\n                class=\"settings-container__settings-list settings-container__settings-list--position\"\n            >\n                <li class=\"position-settings-list__item\">\n                    <input\n                        class=\"settings-container__input position-settings-list__input\"\n                        type=\"radio\"\n                        id=\"top\"\n                        name=\"position\"\n                        value=\"top\"\n                    />\n                    <label class=\"settings-container__label\" for=\"top\"\n                        >Top</label\n                    >\n                </li>\n                <li class=\"position-settings-list__item\">\n                    <input\n                        class=\"settings-container__input position-settings-list__input\"\n                        type=\"radio\"\n                        id=\"bottom\"\n                        name=\"position\"\n                        value=\"bottom\"\n                    />\n                    <label class=\"settings-container__label\" for=\"bottom\"\n                        >Bottom</label\n                    >\n                </li>\n                <li class=\"position-settings-list__item\">\n                    <input\n                        class=\"settings-container__input position-settings-list__input\"\n                        type=\"radio\"\n                        id=\"right\"\n                        name=\"position\"\n                        value=\"right\"\n                    />\n                    <label class=\"settings-container__label\" for=\"right\"\n                        >Right</label\n                    >\n                </li>\n\n                <li class=\"position-settings-list__item\">\n                    <input\n                        class=\"settings-container__input position-settings-list__input\"\n                        type=\"radio\"\n                        id=\"left\"\n                        name=\"position\"\n                        value=\"left\"\n                        checked\n                    />\n                    <label class=\"settings-container__label\" for=\"left\"\n                        >Left</label\n                    >\n                </li>\n            </ul>\n        </div>\n    "
  );
};

exports.renderPositionOptions = renderPositionOptions;
},{}],"src/scripts/main.js":[function(require,module,exports) {
"use strict";

var _index = _interopRequireDefault(require("lodash.debounce/index"));

var _renderTextOptions = require("../scripts/renderTextOptions");

var _renderColorOptions = require("../scripts/renderColorOptions");

var _renderPositionOptions = require("../scripts/renderPositionOptions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var settingsContainer = document.querySelector('.settings-container');
settingsContainer.insertAdjacentHTML('beforeend', (0, _renderColorOptions.renderColorOptions)());
settingsContainer.insertAdjacentHTML('beforeend', (0, _renderPositionOptions.renderPositionOptions)());
settingsContainer.insertAdjacentHTML('beforeend', (0, _renderTextOptions.renderTextOptions)());
var DEFAULT_TOOLTIP_BACKGROUND_COLOR = 'primary';
var DEFAULT_TOOLTIP_POSITION = 'left';
var DEFAULT_TOOLTIP_TEXT_COLOR = '#ffffff';
var DEFAULT_TOOLTIP_MAX_TEXT_LENGHT = 100;
var DEFAULT_TOOLTIP_TEXT = 'Default Text';
var userSettings = {
  backgroundColor: DEFAULT_TOOLTIP_BACKGROUND_COLOR,
  position: DEFAULT_TOOLTIP_POSITION,
  textColor: DEFAULT_TOOLTIP_TEXT_COLOR,
  maxTextLenght: DEFAULT_TOOLTIP_MAX_TEXT_LENGHT,
  tooltipText: DEFAULT_TOOLTIP_TEXT
};
var interfaceObjects = document.querySelectorAll('.objects-list__item');
var backgroundColorSettings = settingsContainer.querySelector('.settings-container__settings-list--color');
var positionSettings = settingsContainer.querySelector('.settings-container__settings-list--position');
var textColorInput = settingsContainer.querySelector('.text-settings-list__text-color-input');
var maxTextLengthInput = settingsContainer.querySelector('.text-settings-list__max-text-lenght-input');
var tooltipTextInput = settingsContainer.querySelector('.text-settings-list__text-input');
var hexColorValidationRegEx = /^#([0-9A-F]{3}){1,2}$/i; //Checks, if given value is proper HEX color

var activeObject = 0;

var renderTooltip = function renderTooltip(_ref, tooltipText) {
  var backgroundColor = _ref.backgroundColor,
      position = _ref.position;
  return (
    /* HTML */
    "\n        <div\n            class=\"tooltip tooltip--color-".concat(backgroundColor, " tooltip--position-").concat(position, "\"\n        >\n            <span class=\"tooltip__text\">").concat(tooltipText, "</span>\n        </div>\n    ")
  );
};

var updateTooltip = function updateTooltip(userSettings, activeElement) {
  deleteOldTooltip();
  createTooltip(userSettings, activeElement);
};

var getTextareaValue = function getTextareaValue(_ref2) {
  var maxTextLenght = _ref2.maxTextLenght,
      tooltipText = _ref2.tooltipText;

  if (tooltipText.length <= maxTextLenght) {
    return tooltipText;
  }

  return tooltipText.slice(0, maxTextLenght);
};

var updateTextColor = function updateTextColor(_ref3) {
  var textColor = _ref3.textColor;
  var tooltip = document.querySelector('.tooltip');
  var tooltipSpan = tooltip.firstElementChild;

  if (tooltipSpan) {
    tooltipSpan.style.color = textColor;
  }
};

var createTooltip = function createTooltip(userSettings, activeElement) {
  var tooltipText = getTextareaValue(userSettings);
  var tooltip = renderTooltip(userSettings, tooltipText);
  activeElement.insertAdjacentHTML('beforeend', tooltip);
  updateTextColor(userSettings);
};

var deleteOldTooltip = function deleteOldTooltip() {
  var oldTooltip = document.querySelector('.tooltip');

  if (oldTooltip) {
    oldTooltip.remove();
  }
};

var getActiveObjectIndex = function getActiveObjectIndex(object) {
  return Array.from(interfaceObjects).indexOf(object);
};

var addOnClickEvent = function addOnClickEvent(userSettings, element) {
  element.addEventListener('click', function (e) {
    activeObject = getActiveObjectIndex(e.target);
    updateTooltip(userSettings, e.target);
  });
};

var addCustomOnClickEvents = function addCustomOnClickEvents(userSettings, elements) {
  elements.forEach(function (element) {
    return addOnClickEvent(userSettings, element);
  });
};

var isProperHexColor = function isProperHexColor(color) {
  return hexColorValidationRegEx.test(color);
};

var setTextColor = function setTextColor(userSettings) {
  var color = textColorInput.value;

  if (isProperHexColor(color)) {
    userSettings.textColor = color;
  } else {
    userSettings.textColor = DEFAULT_TEXT_COLOR;
  }
};

var isBiggerThanZero = function isBiggerThanZero(value) {
  return value > 0;
};

var isValidNumber = function isValidNumber(value) {
  return !isNaN(value) && value;
};

var setMaxTextLength = function setMaxTextLength(userSettings) {
  var maxTextLenght = maxTextLengthInput.value;
  console.log(maxTextLenght);

  if (isValidNumber(maxTextLenght) && isBiggerThanZero(maxTextLenght)) {
    userSettings.maxTextLenght = maxTextLenght;
  }
};

var setTextareaValue = function setTextareaValue(userSettings) {
  userSettings.tooltipText = tooltipTextInput.value;
};

backgroundColorSettings.addEventListener('change', function () {
  var activeBackgroundColor = settingsContainer.querySelector('.color-settings-list__input:checked');
  userSettings.backgroundColor = activeBackgroundColor.value;
  updateTooltip(userSettings, interfaceObjects[activeObject]);
});
positionSettings.addEventListener('change', function () {
  var activePosition = settingsContainer.querySelector('.position-settings-list__input:checked');
  userSettings.position = activePosition.value;
  updateTooltip(userSettings, interfaceObjects[activeObject]);
});
textColorInput.addEventListener('input', (0, _index.default)(function () {
  setTextColor(userSettings);
  updateTooltip(userSettings, interfaceObjects[activeObject]);
}, 1000));
maxTextLengthInput.addEventListener('input', (0, _index.default)(function () {
  setMaxTextLength(userSettings);
  updateTooltip(userSettings, interfaceObjects[activeObject]);
}, 1000));
tooltipTextInput.addEventListener('input', (0, _index.default)(function () {
  setTextareaValue(userSettings);
  updateTooltip(userSettings, interfaceObjects[activeObject]);
}, 1000));
addCustomOnClickEvents(userSettings, interfaceObjects);
},{"lodash.debounce/index":"node_modules/lodash.debounce/index.js","../scripts/renderTextOptions":"src/scripts/renderTextOptions.js","../scripts/renderColorOptions":"src/scripts/renderColorOptions.js","../scripts/renderPositionOptions":"src/scripts/renderPositionOptions.js"}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "41975" + '/');

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