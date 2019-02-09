const handleUrl = require('./modules/urlInterface')
const opn = require('opn')

const url = 'https://www.instagram.com/p/BrnUYUbBm57'

handleUrl(url)
  .then(urlSet => {
    urlSet.map(url => opn(url))
  })
  .catch(message => console.log(message))