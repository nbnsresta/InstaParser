const request = require('request')

const jsonExtractionRegex = /(\<script\stype\="text\/javascript">window\._sharedData\s=)(.+)(;\<\/script\>)/im;

export default function (requestUrl) {
  let url = requestUrl.match(instagramUrlRegex)[0]
  const promise = new Promise()
  if (!url) {
    promise.reject("Invalid URL")
  }

  request(url, function (error, response, body) {
    if (error) {
      console.log("Invalid URL..")
      promise.reject()
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