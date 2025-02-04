const submenuItems = [
  { id: "ziticsAuth", title: "Auth", url: "https://dev.zitics.com/auth/" },
  { id: "ziticsPaps", title: "Paps", url: "https://dev.zitics.com/paps/" },
  { id: "ziticsSupport", title: "Support", url: "https://zitics.com/" },
];

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "ziticsMenu",
    title: "Zitics",
    contexts: ["all"],
  });

  submenuItems.forEach((item) => {
    chrome.contextMenus.create({
      id: item.id,
      parentId: "ziticsMenu",
      title: item.title,
      contexts: ["all"],
    });
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const menuItem = submenuItems.find((item) => item.id === info.menuItemId);
  if (menuItem) {
    chrome.tabs.create({ url: menuItem.url }, (newTab) => {
      chrome.scripting.executeScript({
        target: { tabId: newTab.id },
        function: () => {
          alert("To install this site as an app, click the install icon in the address bar or go to the browser's menu and select 'Install Zitics'.");
        }
      });
    });
  }
});

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.create({ url: "https://dev.zitics.com/auth/" }, (newTab) => {
    chrome.scripting.executeScript({
      target: { tabId: newTab.id },
      function: () => {
        alert("To install this site as an app, click the install icon in the address bar or go to the browser's menu and select 'Install Zitics'.");
      }
    });
  });
});
