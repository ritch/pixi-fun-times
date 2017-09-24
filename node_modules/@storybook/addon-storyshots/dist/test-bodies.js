'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.snapshot = exports.snapshotWithOptions = undefined;
exports.shallowSnapshot = shallowSnapshot;
exports.renderOnly = renderOnly;

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _shallow = require('react-test-renderer/shallow');

var _shallow2 = _interopRequireDefault(_shallow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var snapshotWithOptions = exports.snapshotWithOptions = function snapshotWithOptions(options) {
  return function (_ref) {
    var story = _ref.story,
        context = _ref.context;

    var storyElement = story.render(context);
    var tree = _reactTestRenderer2.default.create(storyElement, options).toJSON();
    expect(tree).toMatchSnapshot();
  };
};

var snapshot = exports.snapshot = snapshotWithOptions({});

function shallowSnapshot(_ref2) {
  var story = _ref2.story,
      context = _ref2.context;

  var shallowRenderer = _shallow2.default.createRenderer();
  var result = shallowRenderer.render(story.render(context));
  expect(result).toMatchSnapshot();
}

function renderOnly(_ref3) {
  var story = _ref3.story,
      context = _ref3.context;

  var storyElement = story.render(context);
  _reactTestRenderer2.default.create(storyElement);
}