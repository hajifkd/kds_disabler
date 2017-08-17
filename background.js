'use strict';
let latestRequestId = null;

chrome.webRequest.onAuthRequired.addListener(details => {
  if (latestRequestId == details.requestId) return;
  latestRequestId = details.requestId;
  let request = new XMLHttpRequest();
  request.open('GET', 'https://kds.kek.jp/info/Authentication.html', false);
  request.send(null);
  //let password = details.realm.split('password: ')[1].substr(0, 6).replace(' ','');
  if (request.status != 200) return;
  let passMatch = request.responseText.match(/PASSWORD : (\w+)/);

  if (passMatch.length != 2) return;

  return {
    authCredentials: {
      username: 'kds',
      password: passMatch[1],
    }
  };
}, {urls: ["<all_urls>"]}, ["blocking"]);
