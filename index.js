#!d:/NodeJS/node --harmony
//#!/usr/bin/env node
const wget = require("node-wget-promise");
const path = require("path");
var urlLib = require("url");

const handleUrl = require("./modules/urlInterface");

function start() {
  const paths = process.argv;
  if (!paths) {
    console.log("Please write the url");
    return;
  }

  console.log("URL IS ", paths[2]);
  handleUrl(paths[2]).then(urlSet =>
    urlSet
      .map(url => {
        wget(url, {
          onStart: () => {
            console.log("Starting ... ");
          },
          //onProgress:
          output: getFileName(url)
        })
          .then(() => console.log("Images downloaded successfully."))
          .catch(err => console.error("Could not download images.", err));
      })
      .catch(message => console.log(message))
  );

  function getFileName(url) {
    const parsed = urlLib.parse(url);
    return path.basename(parsed.pathname);
  }
}

require("dns").lookup("www.instagram.com", function(err) {
  if (err && err.code == "ENOTFOUND") {
    console.error("Cannot reach server");
  } else {
    start();
  }
});