const { extractDPImageUrl, extractMediaContents } = require('./modules/parsers')
const { isPost, isProfile, isInstagramUrl } = require('./modules/Validator')
const parseContents = require('./modules/HtmlRequest')

(function main() {
  try {
    let requestUrl = "https://www.instagram.com/nbnsresta/"

    if (isInstagramUrl(requestUrl)) {
      if (isPost(requestUrl)) {
        parseContents(requestUrl)
          .done(data => extractMediaContents(data))
          .error(() => console.log("Parse Error"))
      }
      else if (isProfile(requestUrl)) {
        parseContents(requestUrl)
          .done(data => extractDPImageUrl(data))
          .error(() => console.log("Parse Error"))
      }
    }
    else {
      return "Invalid Url."
    }
  }
  catch (e) {
    console.log("Error occured", e)
  }
})()

