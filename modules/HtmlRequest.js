const request = require("request");
const { instagramUrlRegex, jsonExtractionRegex } = require("./regex");

module.exports = function(requestUrl) {
  const url = requestUrl.match(instagramUrlRegex)[0];

  return new Promise(function(resolve, reject) {
    url || reject("Invalid URL");

    request(url, function(error, response, body) {
      console.log(url)
      if(error) console.log(error)
      error && reject("Error on page request");

      const json = extractJSON(body);
      json ? resolve(json) : reject("Error parsing content");
    });
  });
};

function extractJSON(element) {
  const state = element.match(jsonExtractionRegex);
  if (state && state.length >= 3) {
    return JSON.parse(state[2]);
  }
}