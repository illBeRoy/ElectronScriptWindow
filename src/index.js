import {BrowserWindow} from 'electron';
import url from 'url';
import fs from 'fs';
import path from 'path';


export default class ScriptWindow {

    static _HTMLFileContent = `
        <html>
            <body style="margin: 0">
                <div id="root"></div>
            </body>
            <script type="text/javascript" src="{{src}}"></script>
        </html>`;

    constructor(...args) {

        this._browserWindow = new BrowserWindow(...args);
    }

    get browserWindow() {

        return this._browserWindow;
    }

    loadURL(url, ...args) {

        if (path.extname(url) == '.js') {

            url = this._createProxyHtmlFile(url);
        }

        this.browserWindow.loadURL(url, ...args);
    }

    _createProxyHtmlFile(jsUrl) {

        let htmlFileName = `${jsUrl}.tmp.html`;
        let htmlFileContents = ScriptWindow._HTMLFileContent.replace('{{src}}', path.basename(jsUrl));
        let htmlFullPath = path.join(path.dirname(module.parent.filename), htmlFileName);

        fs.writeFileSync(htmlFullPath, htmlFileContents);

        return url.format({
            pathname: htmlFullPath,
            protocol: 'file:'
        });
    }

}
