const request = require('request')
const opn = require('opn')

const postUrlRegex = /^((https?:\/\/)?www.)?instagram\.com\/p\/[a-zA-Z0-9._-]+/i;
const profileUrlRegex = /^((https?:\/\/)?www.)?instagram\.com\/[a-zA-Z0-9._]+/i;
const instagramUrlRegex = /^((https?:\/\/)?www.)?instagram\.com\/[a-zA-Z0-9._\/-]+/i;
const jsonExtractionRegex = /(\<script\stype\="text\/javascript">window\._sharedData\s=)(.+)(;\<\/script\>)/im;

(function main() {
  try {
    let requestUrl = "https://www.instagram.com/p/BrNYqR0BVHt"
    let isPost = url => postUrlRegex.test(url)
    let isProfile = url => profileUrlRegex.test(url)
    let isInstagramUrl = url => instagramUrlRegex.test(url)

    if (isInstagramUrl(requestUrl)) {
      if (isPost(requestUrl)) {
        parseContents(requestUrl, extractMediaContents)
        return
      }
      else if (isProfile(requestUrl)) {
        parseContents(requestUrl, extractDPImageUrl)
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

function parseContents(requestUrl, callback) {
  let url = requestUrl.match(instagramUrlRegex)[0]

  if (!url) {
    return ""
  }

  console.log('Url is ', url)
  request(url, function (error, response, body) {
    if (error) {
      console.log("Invalid URL..")
      return
    }
    const parsedObject = extractJSON(body)

    if (!parsedObject) {
      console.log("Invalid URL...")
      return
    }

    const urlContents = callback(parsedObject)
    urlContents.forEach((item) => opn(item))
  })
}

function extractJSON(element) {
  const state = element.match(jsonExtractionRegex)
  if (!state) {
    return ""
  }
  const content = state[2]
  return JSON.parse(content)
}

function extractDPImageUrl(parsedObject) {
  const page = parsedObject['entry_data']['ProfilePage'] // array
  const gqNode = page.find(({ graphql }) => graphql)
  const user = gqNode['graphql']['user']
  return [user["profile_pic_url_hd"] || user["profile_pic_url"]]
}

function extractMediaContents(parsedObject) {
  const postPage = parsedObject['entry_data']['PostPage']
  const gqNode = postPage.find(({ graphql }) => graphql)
  const media = gqNode['graphql']['shortcode_media']
  const isSingleVideo = media["is_video"]
  const hasMultipleMedia = "edge_sidecar_to_children" in media

  if (hasMultipleMedia) {
    return media["edge_sidecar_to_children"]["edges"].map(({ node }) =>
      node['is_video'] ? node['video_url'] : node["display_url"]
    )
  }

  if (isSingleVideo) {
    return [media["video_url"]]
  }
  return [media["display_url"]]
}