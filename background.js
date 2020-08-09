chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({scrollbar: false}, function() {
    console.log('The scroll bar is turning off.')
  })
})
chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  chrome.declarativeContent.onPageChanged.addRules([{
    conditions: [
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostContains: '.'},
      })
    ],
    actions: [
      new chrome.declarativeContent.ShowPageAction()
    ]
  }])
})
