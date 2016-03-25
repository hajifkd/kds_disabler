'use strict';
let latestRequestId = null;

chrome.webRequest.onAuthRequired.addListener(details => {
  if (latestRequestId == details.requestId) return;
  latestRequestId = details.requestId;
  let password = details.realm.split('password: ')[1].substr(0, 6).replace(' ','');
  return {
    authCredentials: {
      username: 'kds',
      password: password,
    }
  };
}, {urls: ["<all_urls>"]}, ["blocking"]);