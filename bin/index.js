'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _electron = require('electron');

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

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
    }

    _createClass(ScriptWindow, [{
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
            var htmlFileContents = ScriptWindow._HTMLFileContent.replace('{{src}}', _path2.default.basename(jsUrl));
            var htmlFullPath = _path2.default.join(_path2.default.dirname(module.parent.filename), htmlFileName);

            _fs2.default.writeFileSync(htmlFullPath, htmlFileContents);

            return _url2.default.format({
                pathname: htmlFullPath,
                protocol: 'file:'
            });
        }
    }, {
        key: 'browserWindow',
        get: function get() {

            return this._browserWindow;
        }
    }]);

    return ScriptWindow;
}();

ScriptWindow._HTMLFileContent = '\n        <html>\n            <body style="margin: 0">\n                <div id="root"></div>\n            </body>\n            <script type="text/javascript" src="{{src}}"></script>\n        </html>';
exports.default = ScriptWindow;