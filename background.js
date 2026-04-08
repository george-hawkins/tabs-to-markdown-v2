// When the browser action is clicked, `addToClipboard()` will use an offscreen
// document to write the value of `textToCopy` to the system clipboard.
chrome.action.onClicked.addListener(async () => {
  const startTime = Date.now();
  console.log('Started at:', new Date(startTime).toISOString());

  // Get all tabs in the current window
  const tabs = await chrome.tabs.query({ currentWindow: true });

  let remaining = tabs.length - 1

  for (const tab of tabs) {
    if (!tab.active) {
      await reloadAndWait(tab.id);
      remaining--;
      console.log('Elapsed time: ', (Date.now() - startTime) / 1000, 's, remaining tabs: ', remaining);
    }
  }

  // Get updated tab information after all refreshes.
  // Use explicit windowId since the service worker's "currentWindow" context
  // can be lost after async operations.
  const updatedTabs = await chrome.tabs.query({ windowId: tabs[0].windowId });

  // Create Markdown list.
  const markdown = updatedTabs
    .map(tab => `* [${tab.title}](${tab.url})`)
    .join('\n');

  console.log('Generated markdown:', markdown);
  console.log('Number of tabs:', updatedTabs.length);

  await addToClipboard(markdown);
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

async function reloadAndWait(tabId) {
  const loadComplete = new Promise((resolve) => {
    const listener = (updatedTabId, changeInfo) => {
      if (updatedTabId === tabId && changeInfo.status === 'complete') {
        chrome.tabs.onUpdated.removeListener(listener);
        resolve();
      }
    };

    chrome.tabs.onUpdated.addListener(listener);
  });

  await chrome.tabs.reload(tabId);
  await loadComplete;
}