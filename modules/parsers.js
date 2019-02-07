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

module.exports = { extractDPImageUrl, extractMediaContents }