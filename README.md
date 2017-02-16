## Electron Script Windows
Windows that need no html files to run

### Abstract
Electron's BrowserWindow component is a powerful tool for displaying html content. Problem is, it's not always html content which we want to display; sometimes we want to manipulate our DOM solely with javascript, especially using frameworks such as react.

Instead of having to create hosting html files, either through webpack or manually, ElectronScriptWindow can display a pure javascript source, hosted inside its own dom.

### Install
Using npm:

`$ npm install electron-script-window`

Using yarn:

`$ yarn add electron-script-window`

### Documentation
* `ScriptWindow(...)` - instantiates a BrowserWindow with the passed args.
* `ScriptWindow.loadUrl(...)` - works exactly as BrowserWindow.loadUrl works, only here you should use a javascript file instead (relative path works).
* `ScriptWindow.browserWindow` - the BrowserWindow instance.

### The generated DOM
ScriptWindow generates a basically clean DOM environment for your script to run in. The generated HTML body contains a single div element called "root", that is so react apps could hook right into it.

The script itself is being loaded **after** the body was created, so there's no need to asynchronously wait for it.

### Example
In your main script file:
```javascript
let win = new ScriptWindow({title: 'Script Window!'});
win.browserWindow.maximize();
win.loadURL('./windows/main/index.js');
```

### License
This project is MIT licensed. Do whatever you want with it.