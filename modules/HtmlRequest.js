const request = require('request')
const { instagramUrlRegex } = require('./regex')

module.exports = function (requestUrl) {
  console.log("URL is ", requestUrl)
  const url = requestUrl.match(instagramUrlRegex)[0]
  const promise = new Promise()
  if (!url) {
    promise.reject("Invalid URL")
  }

  request(url, function (error, response, body) {
    if (error) {
      promise.reject("Invalid URL")
    }
    const json = extractJSON(body)
    json ? promise.resolve(json) : promise.reject()
  })
  return promise
}

function extractJSON(element) {
  const state = element.match(jsonExtractionRegex)
  if (state && state.length >= 3) {
    return JSON.parse[2]
  }
}