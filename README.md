Tabs to Markdown extensions
===========================

This extension reloads the tabs in the current window and then copies their titles and URLs, as a bullet-point Markdown list, to the clipboard from where they can be pasted into whatever Markdown document you want.

The copy-to-clipboard functionality was largely copied from the [chrome-extensions-samples](https://github.com/GoogleChrome/chrome-extensions-samples) sample [cookbook.offscreen-clipboard-write](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/cookbook.offscreen-clipboard-write).

Install
-------

Clone this repository and then load it as an unpacked extension as described [here](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked).

Run
---

Click the extensions jigsaw piece icon (right of the address bar) and find and click the "Tabs to Markdown V2" extension. Only once all the tabs have reloaded will any Markdown be copied to clipboard.

Development
-----------

If you're using an IDE, like Jetbrains [WebStorm](https://www.jetbrains.com/webstorm/), you'll need to install additional type information so that WebStorm knows about the `chrome` object.

To do this:

```
$ npm init -y
$ npm install --save-dev @types/chrome
```

The `init` step will add a generic starter `package.json` and the `install` step will add a `package-lock.json` and create a `node_modules` subdirectory and install the `@types/chrome` package there.
