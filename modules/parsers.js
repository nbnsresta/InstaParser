function extractDPImageUrl(parsedObject) {
  return new Promise((resolve, reject) => {
    const page = parsedObject["entry_data"]["ProfilePage"]; // array

    page || reject("Not a valid profile");

    const gqNode = page.find(({ graphql }) => graphql);
    const user = gqNode["graphql"]["user"];
    resolve([user["profile_pic_url_hd"] || user["profile_pic_url"]]);
  });
}

function extractMediaContents(parsedObject) {
  return new Promise((resolve, reject) => {
    const postPage = parsedObject["entry_data"]["PostPage"];

    postPage || reject("Private or invalid post");

    const gqNode = postPage.find(({ graphql }) => graphql);
    const media = gqNode["graphql"]["shortcode_media"];
    const isSingleVideo = media["is_video"];
    const hasMultipleMedia = "edge_sidecar_to_children" in media;

    if (hasMultipleMedia) {
      const urlSet = media["edge_sidecar_to_children"]["edges"].map(
        ({ node }) =>
          node["is_video"] ? node["video_url"] : node["display_url"]
      );
      resolve(urlSet);
    }

    if (isSingleVideo) {
      resolve([media["video_url"]]);
    }
    resolve([media["display_url"]]);
  });
}

module.exports = { extractDPImageUrl, extractMediaContents };
