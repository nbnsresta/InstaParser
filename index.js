const request = require('request');

(async function main() {
  try {
    request('https://www.instagram.com/p/BqIdiYBlJzA/', function (error, response, body) {
      var $ = cheerio.load(body);
      console.log(parseImageUrl(body));

      
    });

  }
  catch (e) {
    console.log("Error occured", e)
  }
})();


function parseImageUrl(text){
  
  const regex =/(\<script\stype\="text\/javascript">window\._sharedData\s=)(.+)(;\<\/script\>)/im

  const state = text.match(regex)

  let content = state[2];
  //content = content.replace("\\",'.');

  const _content = JSON.parse(content)

  const postPage = _content['entry_data']['PostPage']

  const gqNode = postPage.find(({graphql}) => (graphql))
  const url = gqNode["graphql"]["shortcode_media"]["display_url"]

  return url
}