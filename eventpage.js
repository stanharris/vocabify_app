function showWordAddedNotification(wordData) {
  const {word} = wordData;
  const formattedWord = word.charAt(0).toUpperCase() + word.substr(1);
  let definition = wordData.results[0].definition;
  if (definition.length > 65) {
    const truncatedDefinition = definition.substring(0, 64);
    definition = `${truncatedDefinition}...`;
  }
  browser.notifications.create({
    type: "basic",
    title: `'${formattedWord}' added to Vocabify`,
    message: `Definition - ${definition}`,
    iconUrl: "icon256.png"
  });
}

function addWord(uid, word) {
  const wordData = {
    word,
    uid
  };
  fetch('https://vocabifyapp.com/api/word', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(wordData)
  })
    .then( response => response.json())
    .then( json => {
      if (json.error) {
        browser.notifications.create({
          type: "basic",
          title: `Could not add to Vocabify`,
          message: `Definition not found`,
          iconUrl: "icon256.png"
        });
        Raven.captureException(json.error);
      } else {
        showWordAddedNotification(json);
        Raven.captureMessage('Word added (via right-click)', {
          level: 'info',
          extra: {
            word,
            uid
          }
        });
      }
    })
    .catch( error => {
      browser.notifications.create({
        type: "basic",
        title: `Could not add to Vocabify`,
        message: `An unexpected error occurred`,
        iconUrl: "icon256.png"
      });
      Raven.captureException(error);
    });
}

browser.contextMenus.create({
  title: "Add to Vocabify",
  id: '1000',
  contexts: ["selection", "editable"]
});

browser.contextMenus.onClicked.addListener( function(contextInfo) {
  browser.storage.sync.get('vocabifyAuthId', function(storageInfo) {
    if (Object.keys(storageInfo).length) {
      addWord(storageInfo.vocabifyAuthId, contextInfo.selectionText)
    } else {
      browser.notifications.create({
        type: "basic",
        title: `Could not add to Vocabify`,
        message: `Please make sure you are logged in`,
        iconUrl: "icon256.png",
      });
    }
  });
});

browser.notifications.onClicked.addListener( function() {
  browser.storage.sync.get('vocabifyAuthId', function(storageInfo) {
    if (Object.keys(storageInfo).length) {
      browser.tabs.create({url: 'https://vocabifyapp.com/words'})
    }
  });
});
