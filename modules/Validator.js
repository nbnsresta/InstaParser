const postUrlRegex = /^((https?:\/\/)?www.)?instagram\.com\/p\/[a-zA-Z0-9._-]+/i;
const isPost = url => postUrlRegex.test(url)

const profileUrlRegex = /^((https?:\/\/)?www.)?instagram\.com\/[a-zA-Z0-9._]+/i;
const isProfile = url => profileUrlRegex.test(url)

const instagramUrlRegex = /^((https?:\/\/)?www.)?instagram\.com\/[a-zA-Z0-9._\/-]+/i;
const isInstagramUrl = url => instagramUrlRegex.test(url)

module.exports = { isPost, isProfile, isInstagramUrl }