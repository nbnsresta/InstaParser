const request = require('request');
const opn = require('opn');

(async function main() {
  try {
    request('https://www.instagram.com/p/Bq979jFB422/', function (error, response, body) {
      const images = parseImageUrl(body);
      images.forEach((image) => opn(image));
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
  const media = gqNode["graphql"]["shortcode_media"]
  if(media["edge_sidecar_to_children"]){
    return media["edge_sidecar_to_children"]["edges"].map(({node}) => node["display_url"])
  }
  return [media["display_url"]]
  //const isVideo = gqNode["graphql"]["shortcode_media"]["is_video"]

}