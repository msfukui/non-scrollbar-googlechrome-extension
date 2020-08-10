let scrollbarToggleSwitch = document.getElementById('scrollbarToggleSwitch')

chrome.storage.sync.get('scrollbar', function(data) {
  if (data.scrollbar) {
    scrollbarToggleSwitch.setAttribute('checked', data.scrollbar)
  }
})

scrollbarToggleSwitch.onchange = function(element) {
  const isScrollbar = element.target.checked
  const noScrollbarStyle =
      "var scrollbar = getComputedStyle(document.body, \'::-webkit-scrollbar\')\n"
    + "var css = \'::-webkit-scrollbar { display: none; }\'\n"
    + "var style = document.createElement(\'style\')\n"
    + "if (scrollbar.getPropertyValue(\'display\') !== \'none\') {\n"
    + "  style.appendChild(document.createTextNode(css))\n"
    + "  document.getElementsByTagName(\'head\')[0].appendChild(style)\n"
    + "}\n"
  const scrollbarStyle =
      "var scrollbar = getComputedStyle(document.body, \'::-webkit-scrollbar\')\n"
    + "var css = \"::-webkit-scrollbar { display: inline; }\"\n"
    + "var style = document.createElement(\'style\')\n"
    + "if (scrollbar.getPropertyValue(\'display\') === \'none\') {\n"
    + "  style.appendChild(document.createTextNode(css))\n"
    + "  document.getElementsByTagName(\'head\')[0].appendChild(style)\n"
    + "}\n"
  let setStyle = ''
  let message = ''

  if (isScrollbar) {
    setStyle = noScrollbarStyle
    message = 'on'
  } else {
    setStyle = scrollbarStyle
    message = 'off'
  }

  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    function(tabs) {
      chrome.tabs.executeScript(
        tabs[0].id,
        {
          code: setStyle
        }
      )
    }
  )
  chrome.storage.sync.set({scrollbar: isScrollbar}, function() {
    console.log('The scroll bar is turning ' + message + '.')
  })
}
