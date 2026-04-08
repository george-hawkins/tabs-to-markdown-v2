Tabs to Markdown extension
==========================

This extension reloads the tabs in the current window and then copies their titles and URLs, as a bullet-point Markdown list, to the clipboard from where they can be pasted into whatever Markdown document you want.

The copy-to-clipboard functionality was largely copied from the [chrome-extensions-samples](https://github.com/GoogleChrome/chrome-extensions-samples) sample [cookbook.offscreen-clipboard-write](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/cookbook.offscreen-clipboard-write).

**IMPORTANT:** the copy-to-clipboard step often fails with no obvious errors (either via the extension _Error_ button or the console, see below for more on both), so I often simply copy the Markdown from the extension console (see below) where it's also dumped (this never seems to fail).

Install
-------

Clone this repository and then load it as an unpacked extension as described [here](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked).

Run
---

Click the extensions jigsaw piece icon (right of the address bar) and find and click the "Tabs to Markdown V2" extension. Only once all the tabs have reloaded will the Markdown be copied to clipboard.

Console
-------

The extension's service worker has its own console. So to see its console output (including the Markdown that should be copied to the clipboard), go to `chrome://extensions/`, find the extension there, and you should see something like this:

> ID: nobheinomjmcomljdgfofmpnhiglalog  
> Inspect views [service worker](https://developer.chrome.com/docs/workbox/service-worker-overview) <!-- You have to link to something for the underline link look. -->

Click the _service worker_ link, and it'll open a _Developer Tools_ window for the extension's service worker.

Note: if your extension generates errors then an _Error_ button will appear in this area too.

Aside: Chrome deliberately disables links to `chrome://...` URLs so e.g. I can't make `chrome://extensions/` above into a link.

Development
-----------

If you make changes, remember to go to `chrome://extensions/`, find the extension and click its reload icon (beside the enable/disable toggle).

If you're using an IDE, like JetBrains [WebStorm](https://www.jetbrains.com/webstorm/), you'll need to install additional type information so that WebStorm knows about the `chrome` object.

To do this:

```
$ npm init -y
$ npm install --save-dev @types/chrome
```

The `init` step will add a generic starter `package.json` and the `install` step will add a `package-lock.json` and create a `node_modules` subdirectory and install the `@types/chrome` package there.
