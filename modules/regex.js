const postUrlRegex = /^((https?:\/\/)?www.)?instagram\.com\/p\/[a-zA-Z0-9._-]+/i;
const profileUrlRegex = /^((https?:\/\/)?www.)?instagram\.com\/[a-zA-Z0-9._]+/i;
const instagramUrlRegex = /^((https?:\/\/)?www.)?instagram\.com\/[a-zA-Z0-9._\/-]+/i;
const jsonExtractionRegex = /(\<script\stype\="text\/javascript">window\._sharedData\s=)(.+)(;\<\/script\>)/im;

module.exports = {postUrlRegex, profileUrlRegex, instagramUrlRegex, jsonExtractionRegex}