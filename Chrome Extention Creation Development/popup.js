document.getElementById("openAuth").addEventListener("click", () => {
  chrome.tabs.create({ url: "https://dev.zitics.com/auth/" }, (newTab) => {
    chrome.scripting.executeScript({
      target: { tabId: newTab.id },
      function: () => {
        alert(
          "To install this site as an app, click the install icon in the address bar or go to the browser's menu and select 'Install Zitics'."
        );
      },
    });
  });
});

document.getElementById("openPaps").addEventListener("click", () => {
  chrome.tabs.create({ url: "https://dev.zitics.com/paps/" }, (newTab) => {
    chrome.scripting.executeScript({
      target: { tabId: newTab.id },
      function: () => {
        alert(
          "To install this site as an app, click the install icon in the address bar or go to the browser's menu and select 'Install Zitics'."
        );
      },
    });
  });
});

document.getElementById("openSupport").addEventListener("click", () => {
  chrome.tabs.create({ url: "https://zitics.com/" }, (newTab) => {
    chrome.scripting.executeScript({
      target: { tabId: newTab.id },
      function: () => {
        alert(
          "To install this site as an app, click the install icon in the address bar or go to the browser's menu and select 'Install Zitics'."
        );
      },
    });
  });
});
