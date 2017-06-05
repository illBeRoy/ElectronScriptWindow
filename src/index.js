import {BrowserWindow} from 'electron';
import urllib from 'url';
import path from 'path';
import base64 from 'base-64';


export default class ScriptWindow {

    static _HTMLFileContent = `
        <html>
            <head>{{head}}</head>
            <body style="margin: 0">
                <div id="root"></div>
            </body>
            <script type="text/javascript" src="{{src}}"></script>
        </html>`;

    constructor(...args) {

        this._browserWindow = new BrowserWindow(...args);
        this._head = '';
    }

    get browserWindow() {

        return this._browserWindow;
    }

    addHeadTag(tag) {

        this._head += `${tag}\n`;
    }

    loadURL(url, options) {

        let contentsUrl;
        if (path.extname(url) == '.js') {

            contentsUrl = this._createProxyHtmlFile(url);
        } else {

            contentsUrl = url;
        }

        let baseUrl = path.join(
            path.dirname(module.parent.filename),
            path.dirname(url)
        );

        baseUrl = urllib.format({
            pathname: baseUrl,
            protocol: 'file:'
        });

        console.log(url, baseUrl);

        this.browserWindow.loadURL(
            contentsUrl,
            Object.assign(
                {baseURLForDataURL: baseUrl},
                options
            )
        );
    }

    _createProxyHtmlFile(jsUrl) {

        let htmlFileContents = ScriptWindow._HTMLFileContent;

        for (let [replaceThis, withThis] of [
            ['{{head}}', this._head],
            ['{{src}}', path.basename(jsUrl)]
        ]) {

            htmlFileContents = htmlFileContents.replace(replaceThis, withThis);
        }

        return `data:text/html;base64,${base64.encode(htmlFileContents)}`
    }

}
