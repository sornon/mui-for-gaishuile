'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');

var CircularProgress = React.createClass({
  displayName: 'CircularProgress',

  mixins: [StylePropable],

  propTypes: {
    mode: React.PropTypes.oneOf(['determinate', 'indeterminate']),
    value: React.PropTypes.number,
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    size: React.PropTypes.number
  },

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  _getRelativeValue: function _getRelativeValue() {
    var value = this.props.value;
    var min = this.props.min;
    var max = this.props.max;

    var clampedValue = Math.min(Math.max(min, value), max);
    var rangeValue = max - min;
    var relValue = Math.round(clampedValue / rangeValue * 10000) / 10000;
    return relValue * 100;
  },

  componentDidMount: function componentDidMount() {

    var wrapper = React.findDOMNode(this.refs.wrapper);
    var path = React.findDOMNode(this.refs.path);

    this._scalePath(path);
    this._rotateWrapper(wrapper);
  },
  _scalePath: function _scalePath(path, step) {
    step = step || 0;
    step %= 3;

    setTimeout(this._scalePath.bind(this, path, step + 1), step ? 750 : 250);

    if (!this.isMounted()) return;
    if (this.props.mode != 'indeterminate') return;

    if (step === 0) {

      path.style.strokeDasharray = '1, 200';
      path.style.strokeDashoffset = 0;
      path.style.transitionDuration = '0ms';
    } else if (step == 1) {

      path.style.strokeDasharray = '89, 200';
      path.style.strokeDashoffset = -35;
      path.style.transitionDuration = '750ms';
    } else {

      path.style.strokeDasharray = '89,200';
      path.style.strokeDashoffset = -124;
      path.style.transitionDuration = '850ms';
    }
  },
  _rotateWrapper: function _rotateWrapper(wrapper) {

    setTimeout(this._rotateWrapper.bind(this, wrapper), 10050);

    if (!this.isMounted()) return;
    if (this.props.mode != 'indeterminate') return;

    wrapper.style.transform = null;
    wrapper.style.transform = 'rotate(0deg)';
    wrapper.style.transitionDuration = '0ms';

    setTimeout(function () {
      wrapper.style.transform = 'rotate(1800deg)';
      wrapper.style.transitionDuration = '10s';
    }, 50);
  },

  getDefaultProps: function getDefaultProps() {
    return {
      mode: 'indeterminate',
      value: 0,
      min: 0,
      max: 100,
      size: 1
    };
  },

  getTheme: function getTheme() {
    return this.context.muiTheme.palette;
  },

  getStyles: function getStyles(zoom) {
    zoom *= 1.4;
    var size = '50px';

    var margin = Math.round((50 * zoom - 50) / 2);

    if (margin < 0) margin = 0;

    var styles = {
      root: {
        position: 'relative',
        margin: margin + 'px',
        display: 'inline-block',
        width: size,
        height: size },
      wrapper: {

        width: size,
        height: size,
        margin: '5px',
        display: 'inline-block',
        transition: Transitions.create('transform', '20s', null, 'linear')
      },
      svg: {
        height: size,
        position: 'relative',
        transform: 'scale(' + zoom + ')',
        width: size
      },
      path: {
        strokeDasharray: '89,200',
        strokeDashoffset: 0,
        stroke: this.getTheme().primary1Color,
        strokeLinecap: 'round',
        transition: Transitions.create('all', '1.5s', null, 'ease-in-out')
      }
    };

    if (this.props.mode == 'determinate') {
      var relVal = this._getRelativeValue();
      styles.path.transition = Transitions.create('all', '0.3s', null, 'linear');
      styles.path.strokeDasharray = Math.round(relVal * 1.25) + ',200';
    } else {}

    return styles;
  },

  render: function render() {
    var _props = this.props;
    var style = _props.style;
    var size = _props.size;

    var other = _objectWithoutProperties(_props, ['style', 'size']);

    var styles = this.getStyles(size || 1);

    return React.createElement(
      'div',
      _extends({}, other, { style: this.mergeAndPrefix(styles.root, style) }),
      React.createElement(
        'div',
        { ref: 'wrapper', style: this.mergeAndPrefix(styles.wrapper) },
        React.createElement(
          'svg',
          { style: this.mergeAndPrefix(styles.svg) },
          React.createElement('circle', { ref: 'path', style: this.mergeAndPrefix(styles.path), cx: '25', cy: '25', r: '20', fill: 'none', strokeWidth: '2.5', strokeMiterlimit: '10' })
        )
      )
    );
  }
});

module.exports = CircularProgress;