chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({scrollbar: 'on'}, function() {
    console.log('The scroll bar is turning on.')
  })
})
