'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _electron = require('electron');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScriptWindow = function () {
    function ScriptWindow() {
        _classCallCheck(this, ScriptWindow);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        this._browserWindow = new (Function.prototype.bind.apply(_electron.BrowserWindow, [null].concat(args)))();
        this._head = '';
    }

    _createClass(ScriptWindow, [{
        key: 'addHeadTag',
        value: function addHeadTag(tag) {

            this._head += tag + '\n';
        }
    }, {
        key: 'loadURL',
        value: function loadURL(url) {
            var _browserWindow;

            if (_path2.default.extname(url) == '.js') {

                url = this._createProxyHtmlFile(url);
            }

            for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
            }

            (_browserWindow = this.browserWindow).loadURL.apply(_browserWindow, [url].concat(args));
        }
    }, {
        key: '_createProxyHtmlFile',
        value: function _createProxyHtmlFile(jsUrl) {

            var htmlFileName = jsUrl + '.tmp.html';
            var htmlFileContents = ScriptWindow._HTMLFileContent;

            var _arr = [['{{head}}', this._head], ['{{src}}', _path2.default.basename(jsUrl)]];
            for (var _i = 0; _i < _arr.length; _i++) {
                var _arr$_i = _slicedToArray(_arr[_i], 2),
                    replaceThis = _arr$_i[0],
                    withThis = _arr$_i[1];

                htmlFileContents = htmlFileContents.replace(replaceThis, withThis);
            }

            return 'data:text/html;charset=utf-8,' + encodeURI(htmlFileContents);
        }
    }, {
        key: 'browserWindow',
        get: function get() {

            return this._browserWindow;
        }
    }]);

    return ScriptWindow;
}();

ScriptWindow._HTMLFileContent = '\n        <html>\n            <head>{{head}}</head>\n            <body style="margin: 0">\n                <div id="root"></div>\n            </body>\n            <script type="text/javascript" src="{{src}}"></script>\n        </html>';
exports.default = ScriptWindow;