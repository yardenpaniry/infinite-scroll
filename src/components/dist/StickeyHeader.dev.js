"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var StickyHeader = function StickyHeader() {
  var defaultSticky = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  var _useState = (0, _react.useState)(defaultSticky),
      _useState2 = _slicedToArray(_useState, 2),
      isSticky = _useState2[0],
      setIsSticky = _useState2[1];

  var tableRef = (0, _react.useRef)(null);
  var toggleSticky = (0, _react.useCallback)(function (_ref) {
    var top = _ref.top,
        bottom = _ref.bottom;

    if (top <= 0 && bottom > 2 * 68) {
      !isSticky && setIsSticky(true);
    } else {
      isSticky && setIsSticky(false);
    }
  }, [isSticky]);
  (0, _react.useEffect)(function () {
    var handleScroll = function handleScroll() {
      toggleSticky(tableRef.current.getBoundingClientRect());
    };

    window.addEventListener("scroll", handleScroll);
    return function () {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [toggleSticky]);
  return {
    tableRef: tableRef,
    isSticky: isSticky
  };
};

var _default = StickyHeader;
exports["default"] = _default;