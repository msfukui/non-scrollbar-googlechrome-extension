let scrollbarToggleSwitch = document.getElementById('scrollbarToggleSwitch')

chrome.storage.sync.get('scrollbar', function(data) {
  if (data.scrollbar) {
    scrollbarToggleSwitch.setAttribute('checked', data.scrollbar)
  }
})

scrollbarToggleSwitch.onchange = function(element) {
  let isScrollbar = element.target.checked
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    function(tabs) {
      chrome.tabs.executeScript(
        tabs[0].id,
        {
          code: ''
        }
      )
    }
  )
  if (isScrollbar) {
    chrome.storage.sync.set({scrollbar: true}, function() {
      console.log('The scroll bar is turning on.')
    })
  } else {
    chrome.storage.sync.set({scrollbar: false}, function() {
      console.log('The scroll bar is turning off.')
    })
  }
}
