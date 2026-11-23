const copyButtons = document.querySelectorAll("#copy-actions button");
const status = document.querySelector("#status");
const titleElement = document.querySelector("#page-title");
const urlElement = document.querySelector("#page-url");
let pageInfo;

async function loadPageInfo() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    if (!tab?.url || !tab.title) {
      throw new Error("このページの情報を取得できません。");
    }

    pageInfo = { title: tab.title, url: tab.url };
    titleElement.textContent = pageInfo.title;
    urlElement.textContent = pageInfo.url;
    copyButtons.forEach((button) => { button.disabled = false; });
  } catch (error) {
    const message = error instanceof Error ? error.message : "ページ情報を取得できませんでした。";
    titleElement.textContent = message;
    urlElement.textContent = "";
    status.textContent = message;
    status.classList.add("error");
  }
}

copyButtons.forEach((button) => button.addEventListener("click", async () => {
  status.textContent = "";
  status.classList.remove("error");

  try {
    if (!pageInfo) {
      throw new Error("ページ情報を取得できません。");
    }

    const formats = {
      title: pageInfo.title,
      url: pageInfo.url,
      both: `${pageInfo.title}\n${pageInfo.url}`,
      markdown: `[${pageInfo.title}](${pageInfo.url})`,
    };
    await navigator.clipboard.writeText(formats[button.dataset.format]);
    status.textContent = `${button.textContent}しました。`;
  } catch (error) {
    status.textContent = error instanceof Error
      ? error.message
      : "コピーできませんでした。もう一度お試しください。";
    status.classList.add("error");
  }
}));

loadPageInfo();
