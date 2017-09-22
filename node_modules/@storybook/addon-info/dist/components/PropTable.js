'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

exports.default = PropTable;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PropVal = require('./PropVal');

var _PropVal2 = _interopRequireDefault(_PropVal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PropTypesMap = new _map2.default(); /* eslint-disable no-underscore-dangle */

(0, _keys2.default)(_propTypes2.default).forEach(function (typeName) {
  var type = _propTypes2.default[typeName];

  PropTypesMap.set(type, typeName);
  PropTypesMap.set(type.isRequired, typeName);
});

var stylesheet = {
  propTable: {
    marginLeft: -10,
    borderSpacing: '10px 5px',
    borderCollapse: 'separate'
  }
};

var isNotEmpty = function isNotEmpty(obj) {
  return obj && obj.props && (0, _keys2.default)(obj.props).length > 0;
};

var renderDocgenPropType = function renderDocgenPropType(propType) {
  if (!propType) {
    return 'unknown';
  }

  var name = propType.name;

  switch (name) {
    case 'arrayOf':
      return propType.value.name + '[]';
    case 'instanceOf':
      return propType.value;
    case 'union':
      return propType.raw;
    case 'signature':
      return propType.raw;
    default:
      return name;
  }
};

var hasDocgen = function hasDocgen(type) {
  return isNotEmpty(type.__docgenInfo);
};

var boolToString = function boolToString(value) {
  return value ? 'yes' : 'no';
};

var propsFromDocgen = function propsFromDocgen(type) {
  var props = {};
  var docgenInfoProps = type.__docgenInfo.props;

  (0, _keys2.default)(docgenInfoProps).forEach(function (property) {
    var docgenInfoProp = docgenInfoProps[property];
    var defaultValueDesc = docgenInfoProp.defaultValue || {};
    var propType = docgenInfoProp.flowType || docgenInfoProp.type || 'other';

    props[property] = {
      property: property,
      propType: renderDocgenPropType(propType),
      required: boolToString(docgenInfoProp.required),
      description: docgenInfoProp.description,
      defaultValue: defaultValueDesc.value
    };
  });

  return props;
};

var propsFromPropTypes = function propsFromPropTypes(type) {
  var props = {};

  if (type.propTypes) {
    (0, _keys2.default)(type.propTypes).forEach(function (property) {
      var typeInfo = type.propTypes[property];
      var required = boolToString(typeInfo.isRequired === undefined);
      var description = type.__docgenInfo && type.__docgenInfo.props && type.__docgenInfo.props[property] ? type.__docgenInfo.props[property].description : null;
      var propType = PropTypesMap.get(typeInfo) || 'other';

      if (propType === 'other') {
        if (type.__docgenInfo && type.__docgenInfo.props && type.__docgenInfo.props[property] && type.__docgenInfo.props[property].type) {
          propType = type.__docgenInfo.props[property].type.name;
        }
      }

      props[property] = { property: property, propType: propType, required: required, description: description };
    });
  }

  if (type.defaultProps) {
    (0, _keys2.default)(type.defaultProps).forEach(function (property) {
      var value = type.defaultProps[property];

      if (value === undefined) {
        return;
      }

      if (!props[property]) {
        props[property] = { property: property };
      }

      props[property].defaultValue = value;
    });
  }

  return props;
};

function PropTable(props) {
  var type = props.type,
      maxPropObjectKeys = props.maxPropObjectKeys,
      maxPropArrayLength = props.maxPropArrayLength,
      maxPropStringLength = props.maxPropStringLength;


  if (!type) {
    return null;
  }

  var accumProps = hasDocgen(type) ? propsFromDocgen(type) : propsFromPropTypes(type);
  var array = (0, _values2.default)(accumProps);

  if (!array.length) {
    return _react2.default.createElement(
      'small',
      null,
      'No propTypes defined!'
    );
  }

  var propValProps = {
    maxPropObjectKeys: maxPropObjectKeys,
    maxPropArrayLength: maxPropArrayLength,
    maxPropStringLength: maxPropStringLength
  };

  return _react2.default.createElement(
    'table',
    { style: stylesheet.propTable },
    _react2.default.createElement(
      'thead',
      null,
      _react2.default.createElement(
        'tr',
        null,
        _react2.default.createElement(
          'th',
          null,
          'property'
        ),
        _react2.default.createElement(
          'th',
          null,
          'propType'
        ),
        _react2.default.createElement(
          'th',
          null,
          'required'
        ),
        _react2.default.createElement(
          'th',
          null,
          'default'
        ),
        _react2.default.createElement(
          'th',
          null,
          'description'
        )
      )
    ),
    _react2.default.createElement(
      'tbody',
      null,
      array.map(function (row) {
        return _react2.default.createElement(
          'tr',
          { key: row.property },
          _react2.default.createElement(
            'td',
            null,
            row.property
          ),
          _react2.default.createElement(
            'td',
            null,
            row.propType
          ),
          _react2.default.createElement(
            'td',
            null,
            row.required
          ),
          _react2.default.createElement(
            'td',
            null,
            row.defaultValue === undefined ? '-' : _react2.default.createElement(_PropVal2.default, (0, _extends3.default)({ val: row.defaultValue }, propValProps))
          ),
          _react2.default.createElement(
            'td',
            null,
            row.description
          )
        );
      })
    )
  );
}

PropTable.displayName = 'PropTable';
PropTable.defaultProps = {
  type: null
};
PropTable.propTypes = {
  type: _propTypes2.default.func,
  maxPropObjectKeys: _propTypes2.default.number.isRequired,
  maxPropArrayLength: _propTypes2.default.number.isRequired,
  maxPropStringLength: _propTypes2.default.number.isRequired
};