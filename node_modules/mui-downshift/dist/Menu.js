'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactVirtualized = require('react-virtualized');

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _Paper = require('@material-ui/core/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _Popper = require('@material-ui/core/Popper');

var _Popper2 = _interopRequireDefault(_Popper);

var _styles = require('@material-ui/core/styles');

var _zIndex = require('@material-ui/core/styles/zIndex');

var _zIndex2 = _interopRequireDefault(_zIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = function styles(theme) {
  return {
    keyboardFocused: {
      backgroundColor: theme.palette.divider
    }
  };
};

function getRowCount(items, includeFooter) {
  return (items ? items.length : 0) + (includeFooter ? 1 : 0);
}

function getMenuHeight(rowHeight, items, menuItemCount, showEmpty, includeFooter) {
  var rowCount = getRowCount(items, includeFooter);
  if (rowCount) {
    var visibleCount = Math.min(rowCount, menuItemCount); // Maximum items before scrolling
    var height = 0;
    for (var i = 0; i < visibleCount; i++) {
      height += typeof rowHeight === 'function' ? rowHeight({ index: i }) : rowHeight;
    }
    return height;
  } else if (showEmpty) {
    // Return the height of a single item
    return typeof rowHeight === 'function' ? rowHeight({ index: 0 }) : rowHeight;
  }
  return 0;
}

var MuiVirtualList = function (_Component) {
  _inherits(MuiVirtualList, _Component);

  function MuiVirtualList() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MuiVirtualList);

    for (var _len = arguments.length, args = Array(_len), _key2 = 0; _key2 < _len; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MuiVirtualList.__proto__ || Object.getPrototypeOf(MuiVirtualList)).call.apply(_ref, [this].concat(args))), _this), _this.cache = new _reactVirtualized.CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 48,
      keyMapper: _this.props.getListItemKey
    }), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MuiVirtualList, [{
    key: 'UNSAFE_componentWillReceiveProps',
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (this.props.getListItemKey !== nextProps.getListItemKey) {
        this.cache._keyMapper = nextProps.getListItemKey;
      }

      if (this.props.width !== nextProps.width) {
        // Need to recalculate all heights since new widths
        this.cache.clearAll();
        this.list.recomputeRowHeights();
      }

      if (this.props.items !== nextProps.items) {
        if (!this.props.getListItemKey) {
          // Only need to recalculate heights if no getListItemKey is defined as CellMeasureCache.defaultKeyMapper only uses indexes for keys (and new items at the same index might have different heights)
          this.cache.clearAll();
        }

        this.list.recomputeRowHeights();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          items = _props.items,
          width = _props.width,
          menuItemCount = _props.menuItemCount,
          menuHeight = _props.menuHeight,
          getListItem = _props.getListItem,
          showEmpty = _props.showEmpty,
          includeFooter = _props.includeFooter,
          getVirtualListProps = _props.getVirtualListProps,
          getListItemKey = _props.getListItemKey,
          _onRowsRendered = _props.onRowsRendered,
          registerChild = _props.registerChild,
          downshiftProps = _props.downshiftProps,
          classes = _props.classes;


      var virtualListProps = getVirtualListProps && getVirtualListProps({ downshiftProps: downshiftProps });
      var rowHeight = virtualListProps && virtualListProps.rowHeight ? virtualListProps.rowHeight : this.cache.rowHeight;
      var useCellMeasurer = !(virtualListProps && virtualListProps.rowHeight);
      var height = menuHeight || getMenuHeight(rowHeight, items, menuItemCount, showEmpty, includeFooter);

      return _react2.default.createElement(_reactVirtualized.List, _extends({
        width: width
      }, downshiftProps.highlightedIndex != null && { scrollToIndex: downshiftProps.highlightedIndex }, {
        height: height,
        rowCount: getRowCount(items, includeFooter),
        rowHeight: rowHeight,
        rowRenderer: function rowRenderer(_ref2) {
          var index = _ref2.index,
              style = _ref2.style,
              parent = _ref2.parent,
              key = _ref2.key;

          var item = items ? items[index] : null;
          var isHighlighted = downshiftProps.highlightedIndex === index;
          var className = (0, _classnames4.default)(_defineProperty({}, classes.keyboardFocused, isHighlighted));
          // Convenience helper to simplify typical usage
          var getItemProps = function getItemProps(props) {
            return downshiftProps.getItemProps(_extends({
              item: item,
              index: index,
              className: className
            }, props));
          };
          var listItem = getListItem({
            getItemProps: getItemProps,
            item: item,
            index: index,
            downshiftProps: downshiftProps,
            style: style
          });

          var _key = getListItemKey ? getListItemKey(index) : key;

          if (useCellMeasurer) {
            return _react2.default.createElement(
              _reactVirtualized.CellMeasurer,
              {
                cache: _this2.cache,
                columnIndex: 0,
                rowIndex: index,
                parent: parent,
                key: _key,
                width: width
              },
              _react2.default.createElement(
                'div',
                { style: style },
                listItem
              )
            );
          }
          return _react2.default.createElement(
            'div',
            { style: style, key: key },
            listItem
          );
        },
        noRowsRenderer: function noRowsRenderer() {
          // TODO: Support non-default (48) row height.  Either figure out how to use CellMeasurer (initial attempt failed) or allow passing an explicit height.  This might be  fixed now that the cache is cleared when `items` are changed
          var index = 0;
          var item = null;
          var isHighlighted = downshiftProps.highlightedIndex === index;
          var className = (0, _classnames4.default)(_defineProperty({}, classes.keyboardFocused, isHighlighted));
          // Convenience helper to simplify typical usage
          var getItemProps = function getItemProps(props) {
            return downshiftProps.getItemProps(_extends({
              item: item,
              index: index,
              className: className
            }, props));
          };
          return getListItem({
            getItemProps: getItemProps,
            item: item,
            index: index,
            downshiftProps: downshiftProps
          });
        },
        onRowsRendered: function onRowsRendered(args) {
          if (useCellMeasurer) {
            // Force update to recalculate menuHeight with updated cache values.  See issue #45
            _this2.forceUpdate();
          }
          _onRowsRendered && _onRowsRendered(args);
        }
      }, useCellMeasurer && { deferredMeasurementCache: this.cache }, {
        ref: function ref(el) {
          _this2.list = el;
          if (registerChild) {
            registerChild(el);
          }
        }
      }, virtualListProps));
    }
  }]);

  return MuiVirtualList;
}(_react.Component);

function Menu(_ref3) {
  var getInfiniteLoaderProps = _ref3.getInfiniteLoaderProps,
      inputRef = _ref3.inputRef,
      props = _objectWithoutProperties(_ref3, ['getInfiniteLoaderProps', 'inputRef']);

  return props.downshiftProps.isOpen ? _react2.default.createElement(
    _reactVirtualized.AutoSizer,
    null,
    function (_ref4) {
      var width = _ref4.width;
      return _react2.default.createElement(
        _Popper2.default,
        {
          open: true,
          anchorEl: inputRef,
          placement: 'bottom-start',
          style: { zIndex: _zIndex2.default.modal },
          modifiers: {
            preventOverflow: { enabled: false },
            hide: { enabled: false }
          }
        },
        _react2.default.createElement(
          'div',
          props.downshiftProps.getMenuProps({}, { suppressRefError: true }),
          _react2.default.createElement(
            _Paper2.default,
            { style: { width: width } },
            getInfiniteLoaderProps ? _react2.default.createElement(
              _reactVirtualized.InfiniteLoader,
              getInfiniteLoaderProps({ downshiftProps: props.downshiftProps }),
              function (_ref5) {
                var onRowsRendered = _ref5.onRowsRendered,
                    registerChild = _ref5.registerChild;
                return _react2.default.createElement(MuiVirtualList, _extends({}, props, {
                  width: width,
                  onRowsRendered: onRowsRendered,
                  registerChild: registerChild
                }));
              }
            ) : _react2.default.createElement(MuiVirtualList, _extends({}, props, { width: width }))
          )
        )
      );
    }
  ) : null;
}

exports.default = (0, _styles.withStyles)(styles)(Menu);