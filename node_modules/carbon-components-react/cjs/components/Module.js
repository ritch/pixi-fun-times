'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModuleHeader = exports.ModuleBody = exports.Module = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(['single', 'double'])
};

var moduleBodyPropTypes = {
  children: _propTypes2.default.node,
  centered: _propTypes2.default.bool,
  className: _propTypes2.default.string
};

var moduleHeaderPropTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string
};

var defaultProps = {
  size: 'double'
};

var moduleBodydefaultProps = {
  centered: false
};

var Module = function Module(_ref) {
  var children = _ref.children,
      className = _ref.className,
      size = _ref.size,
      other = _objectWithoutProperties(_ref, ['children', 'className', 'size']);

  var wrapperClasses = (0, _classnames2.default)('bx--module bx--module--' + size, className);

  return _react2.default.createElement(
    'div',
    _extends({ className: wrapperClasses }, other),
    _react2.default.createElement(
      'div',
      { className: 'bx--module__inner' },
      children
    )
  );
};

var ModuleBody = function ModuleBody(_ref2) {
  var children = _ref2.children,
      className = _ref2.className,
      centered = _ref2.centered,
      other = _objectWithoutProperties(_ref2, ['children', 'className', 'centered']);

  var wrapperClasses = (0, _classnames2.default)('bx--module__content', className, {
    'bx--module__content--centered': centered
  });

  return _react2.default.createElement(
    'div',
    _extends({ className: wrapperClasses }, other),
    children
  );
};

var ModuleHeader = function ModuleHeader(_ref3) {
  var children = _ref3.children,
      className = _ref3.className,
      other = _objectWithoutProperties(_ref3, ['children', 'className']);

  var wrapperClasses = (0, _classnames2.default)('bx--module__header', className);

  return _react2.default.createElement(
    'div',
    _extends({ className: wrapperClasses }, other),
    _react2.default.createElement(
      'h1',
      { className: 'bx--module__title' },
      children
    )
  );
};

Module.propTypes = propTypes;
ModuleBody.propTypes = moduleBodyPropTypes;
Module.defaultProps = defaultProps;
ModuleBody.defaultProps = moduleBodydefaultProps;
ModuleHeader.propTypes = moduleHeaderPropTypes;

exports.Module = Module;
exports.ModuleBody = ModuleBody;
exports.ModuleHeader = ModuleHeader;