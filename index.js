const { extractDPImageUrl, extractMediaContents } = require('./modules/parsers')
const { isPost, isProfile, isInstagramUrl } = require('./modules/Validator')
const parseContents = require('./modules/HtmlRequest')

try {
    const requestUrl = "https://www.instagram.com/p/BtoScvngQBW/?utm_source=ig_web_button_share_sheet"

    if (isInstagramUrl(requestUrl)) {
      if (isPost(requestUrl)) {
        parseContents(requestUrl)
          .then(data => {
            const url = extractMediaContents(data)
            console.log(url)
          })
          .catch(() => console.log("Parse Error"))
      }
      else if (isProfile(requestUrl)) {
        parseContents(requestUrl)
          .then(data => {
            const url = extractDPImageUrl(data)
            console.log(url)
          })
          .catch(message => console.log(message))
      }
    }
    else {
      return "Invalid Url."
    }
  }
  catch (e) {
    console.log("Error occured", e)
  }
