const textToCopy = `Hello world!`;

// When the browser action is clicked, `addToClipboard()` will use an offscreen
// document to write the value of `textToCopy` to the system clipboard.
chrome.action.onClicked.addListener(async () => {
  await addToClipboard(textToCopy);
});

// Service workers cannot directly interact with the system clipboard.
// To work around this, create an offscreen document and pass it the data we want to write to the clipboard.
async function addToClipboard(value) {
  // noinspection JSCheckFunctionSignatures
  await chrome.offscreen.createDocument({
    url: 'offscreen.html',
    reasons: [chrome.offscreen.Reason.CLIPBOARD],
    justification: 'Write text to the clipboard.'
  });

  // Now that we have an offscreen document, we can dispatch the message.
  await chrome.runtime.sendMessage({
    type: 'copy-data-to-clipboard',
    target: 'offscreen-doc',
    data: value
  });
}
