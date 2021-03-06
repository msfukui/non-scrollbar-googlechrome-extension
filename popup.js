let scrollbarToggleSwitch = document.getElementById('scrollbarToggleSwitch')

chrome.storage.sync.get('scrollbar', function(data) {
  if (data.scrollbar) {
    scrollbarToggleSwitch.setAttribute('checked', data.scrollbar)
  }
})

scrollbarToggleSwitch.onchange = function(element) {
  const isScrollbar = element.target.checked
  const scrollbarStyle =
      "var css = \'.non-scrollbar::-webkit-scrollbar { display: none; }\'\n"
    + "var style = document.createElement(\'style\')\n"
    + "style.appendChild(document.createTextNode(css))\n"
    + "document.getElementsByTagName(\'head\')[0].appendChild(style)\n"
  const addScrollbarStyle =
      "if (! document.body.classList.contains(\'non-scrollbar\')) {\n"
    + "  document.body.classList.add(\'non-scrollbar\')\n"
    + "}\n"
  const removeScrollbarStyle =
      "if (document.body.classList.contains(\'non-scrollbar\')) {\n"
    + "  document.body.classList.remove(\'non-scrollbar\')\n"
    + "}\n"
  let setStyle = ''

  if (isScrollbar) {
    setStyle = scrollbarStyle + addScrollbarStyle
  } else {
    setStyle = scrollbarStyle + removeScrollbarStyle
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
}
