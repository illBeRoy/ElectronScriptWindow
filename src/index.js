import {BrowserWindow} from 'electron';
import url from 'url';
import fs from 'fs';
import path from 'path';


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

    loadURL(url, ...args) {

        if (path.extname(url) == '.js') {

            url = this._createProxyHtmlFile(url);
        }

        this.browserWindow.loadURL(url, ...args);
    }

    _createProxyHtmlFile(jsUrl) {

        let htmlFileName = `${jsUrl}.tmp.html`;
        let htmlFileContents = ScriptWindow._HTMLFileContent

        for (let [replaceThis, withThis] of [
            ['{{head}}', this._head],
            ['{{src}}', path.basename(jsUrl)]
        ]) {

            htmlFileContents = htmlFileContents.replace(replaceThis, withThis);
        }

        return `data:text/html;charset=utf-8,${encodeURI(htmlFileContents)}`
    }

}
