const request = require('request');
const opn = require('opn');

(async function main() {
  try {
    request('https://www.instagram.com/p/BrF6sJ6lrgK/', function (error, response, body) {
      const parsedObject = extractJSON(body)
      const urlContents = extractMediaContents(parsedObject)
      urlContents.forEach((item) => opn(item));
    });
  }
  catch (e) {
    console.log("Error occured", e)
  }
})();


function extractJSON(element){
  const regex =/(\<script\stype\="text\/javascript">window\._sharedData\s=)(.+)(;\<\/script\>)/im

  const state = element.match(regex)

  let content = state[2];
  //content = content.replace("\\",'.');

  return JSON.parse(content)
}

function extractMediaContents(parsedObject){
  const postPage = parsedObject['entry_data']['PostPage']

  const gqNode = postPage.find(({graphql}) => (graphql))
  const media = gqNode["graphql"]["shortcode_media"]
  const isVideo = media["is_video"]
  
  if(isVideo){
    const videoUrl = media["video_url"]
    return [videoUrl]
  }
  if(media["edge_sidecar_to_children"]){
    return media["edge_sidecar_to_children"]["edges"].map(({node}) => node["display_url"])
  }
  return [media["display_url"]]
}