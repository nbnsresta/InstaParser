const handleUrl = require('./modules/urlInterface')
const opn = require('opn')

const url = 'https://www.instagram.com/elna_stha'

handleUrl(url)
  .then(urlSet => {
    urlSet.map(url => opn(url))
  })
  .catch(message => console.log(message))