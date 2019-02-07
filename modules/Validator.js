const { postUrlRegex, profileUrlRegex, instagramUrlRegex } = require('./regex')

const isPost = url => postUrlRegex.test(url)
const isProfile = url => profileUrlRegex.test(url)
const isInstagramUrl = url => instagramUrlRegex.test(url)

module.exports = { isPost, isProfile, isInstagramUrl }