var crypto = require('crypto');

var SHAREKEY_SECRET = '9F4DGB0859A381F0';
var topic_share_url = "";
var collection_share_url = "";
var encodeShareKey = function(data) {
  var cipher = crypto.createCipheriv('aes-128-ecb', SHAREKEY_SECRET, "");
  return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
};

var topicShareUrl = function (id) {
  return topic_share_url + encodeShareKey(id + "")
}

var collectionShareUrl = function (id) {
  return collection_share_url + encodeShareKey(id + "")
}

console.log(topicShareUrl(467))
