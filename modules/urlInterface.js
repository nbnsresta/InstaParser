const { extractDPImageUrl, extractMediaContents } = require("./parsers");
const { isPost, isProfile, isInstagramUrl } = require("./Validator");
const parseContents = require("./htmlRequest");

module.exports = function handleUrl(requestUrl) {
  return new Promise((resolve, reject) => {
    try {
      if (isInstagramUrl(requestUrl)) {
        if (isPost(requestUrl)) {
          parseContents(requestUrl)
            .then(data => {
              extractMediaContents(data)
              .then(urlSet => {
                console.log(urlSet);
                resolve(urlSet);
              }).catch(message => reject(message));
            })
            .catch(message => reject(message));
        } else if (isProfile(requestUrl)) {
          parseContents(requestUrl)
            .then(data => {
              extractDPImageUrl(data)
              .then(urlSet => {
                console.log(urlSet);
                resolve(urlSet);
              });
            }).catch(message => reject(message));
        } else {
          reject("The instagram url cannot be parsed for data");
        }
      } else {
        reject("Invalid Url.");
      }
    } catch (e) {
      reject(e.message);
    }
  });
};
