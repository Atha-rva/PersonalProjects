chrome.createContextMenus.create({
  title: "Zitics",
  contexts: ["all"],
  onclick: function (info, tab) {
    chrome.tabs.create({ url: "https://dev.zitics.com/auth/" });
  },
});
