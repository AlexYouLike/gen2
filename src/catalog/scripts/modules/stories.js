
function openStory(tile) {
  let clipUrl = tile.getAttribute('data-url')

  let clipIframe = document.createElement('iframe')
  setAttributes(clipIframe, {
    'class': 'clip-iframe',
    'src': clipUrl + '/simulator?test=1&in_simulator=1'
  })

  tile.appendChild(clipIframe)

}
