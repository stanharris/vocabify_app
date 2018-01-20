/* global browser */
import addDays from "date-fns/add_days";

export const defaultReviewInterval = 3;
export const storage = browser.storage.sync;

const addWord = async word => {
  const { wordsList, wordsData } = await storage.get();

  wordsList.unshift(word);
  wordsData.unshift({
    word,
    fetchDefinition: true,
    reviewDate: addDays(new Date(), defaultReviewInterval),
    // reviewDate: new Date(),
    reviewInterval: defaultReviewInterval
  });
  storage.set({ wordsList, wordsData });
};

browser.contextMenus.create({
  title: "Add to Vocabify",
  id: "1000",
  contexts: ["selection", "editable"]
});

browser.contextMenus.onClicked.addListener(contextInfo => {
  addWord(contextInfo.selectionText);
  browser.notifications.create({
    type: "basic",
    title: contextInfo.selectionText,
    message: 'Successfully added to Vocabify',
    iconUrl: "icon256.png"
  });
});

browser.notifications.onClicked.addListener(() => {
  browser.tabs.create({ url: "/index.html" });
});
