import Code from "./code";
import SavedUrls from "./savedUrls";
import { CorrectLevel } from "../shared/correctLevel";
import { MessageTypes } from "../shared/messageTypes";
import settings from "../shared/settings";
import { AddUrlMessage, AddUrlResponse, GetQrSettingsAndDarkModeMessage, GetQrSettingsAndDarkModeResponse, GetUrlsMessage, GetUrlsResponse, SetCorrectLevelMessage, ToggleDarkModeMessage, ToggleDarkModeResponse } from "../shared/types";

type AllElements = {
    app: HTMLDivElement;
        appContents: HTMLDivElement;
            topBar: HTMLDivElement;
                popupButton: HTMLButtonElement;
                    popupImage: HTMLImageElement;
                savedUrlsButton: HTMLButtonElement;
                darkModeButton: HTMLButtonElement;
            savedUrlsMenu: HTMLDivElement;
            qrCode: HTMLDivElement;
            urlOptionsContainer: HTMLDivElement;
                pageButtonContainer: HTMLDivElement;
                    thisPageButton: HTMLButtonElement;
                    customPageButton: HTMLButtonElement;
                saveUrlButton: HTMLButtonElement;
            input: HTMLInputElement;
            correctLevelContainer: HTMLDivElement;
                correctLevelDescription: HTMLSpanElement;
                correctLevelButtonContainer: HTMLDivElement;
                    correctLevelLButton: HTMLButtonElement;
                    correctLevelMButton: HTMLButtonElement;
                    correctLevelQButton: HTMLButtonElement;
                    correctLevelHButton: HTMLButtonElement;
            licensingText: HTMLAnchorElement;
}

function createAndGetElements(): AllElements {
    return {
        app: document.getElementById("app") as HTMLDivElement,
            appContents: document.createElement("div"),
                topBar: document.createElement("div"),
                    popupButton: document.createElement("button"),
                        popupImage: document.createElement("img"),
                    savedUrlsButton: document.createElement("button"),
                    darkModeButton: document.createElement("button"),
                savedUrlsMenu: document.createElement("div"),
                qrCode: document.createElement("div"),
                urlOptionsContainer: document.createElement("div"),
                    pageButtonContainer: document.createElement("div"),
                        thisPageButton: document.createElement("button"),
                        customPageButton: document.createElement("button"),
                    saveUrlButton: document.createElement("button"),
                input: document.createElement("input"),
                correctLevelContainer: document.createElement("div"),
                    correctLevelDescription: document.createElement("div"),
                    correctLevelButtonContainer: document.createElement("div"),
                        correctLevelLButton: document.createElement("button"),
                        correctLevelMButton: document.createElement("button"),
                        correctLevelQButton: document.createElement("button"),
                        correctLevelHButton: document.createElement("button"),
                licensingText: document.createElement("a")
    }
}

function combineElements({ app, appContents, topBar, popupButton, popupImage, saveUrlButton, darkModeButton, savedUrlsMenu, qrCode, urlOptionsContainer, pageButtonContainer, thisPageButton, customPageButton, savedUrlsButton, input, correctLevelContainer, correctLevelDescription, correctLevelButtonContainer, correctLevelLButton, correctLevelMButton, correctLevelQButton, correctLevelHButton, licensingText }: AllElements) {
    app.appendChild(appContents);
        appContents.appendChild(topBar);
            topBar.appendChild(popupButton);
                popupButton.appendChild(popupImage);
            topBar.appendChild(savedUrlsButton);
            topBar.appendChild(darkModeButton);
        appContents.appendChild(savedUrlsMenu);
        appContents.appendChild(qrCode);
        appContents.append(urlOptionsContainer);
            urlOptionsContainer.appendChild(pageButtonContainer);
                pageButtonContainer.appendChild(thisPageButton);
                pageButtonContainer.appendChild(customPageButton);
            urlOptionsContainer.appendChild(saveUrlButton);
        appContents.appendChild(input);
        appContents.appendChild(correctLevelContainer);
            correctLevelContainer.appendChild(correctLevelDescription);
            correctLevelContainer.appendChild(correctLevelButtonContainer);
                correctLevelButtonContainer.appendChild(correctLevelLButton);
                correctLevelButtonContainer.appendChild(correctLevelMButton);
                correctLevelButtonContainer.appendChild(correctLevelQButton);
                correctLevelButtonContainer.appendChild(correctLevelHButton);
        appContents.appendChild(licensingText);
}

function _setStylePageButtonSelected(el: HTMLButtonElement) {
    el.className = "py-1 px-2 rounded-full bg-neutral-100 dark:bg-slate-500";
}

function _setStylePageButtonUnselected(el: HTMLButtonElement) {
    el.className = "py-1 px-2 rounded-full bg-transparent";
}

function _setStyleCorrectLevelButtonSelected(el: HTMLButtonElement) {
    el.className = "py-1 px-3 rounded-full bg-neutral-100 dark:bg-slate-500";
}

function _setStyleCorrectLevelButtonUnselected(el: HTMLButtonElement) {
    el.className = "py-1 px-3 rounded-full bg-transparent";
}

function _setStylesCorrectLevelButtonUnselected({ correctLevelLButton, correctLevelMButton, correctLevelQButton, correctLevelHButton }: AllElements) {
    _setStyleCorrectLevelButtonUnselected(correctLevelLButton);
    _setStyleCorrectLevelButtonUnselected(correctLevelMButton);
    _setStyleCorrectLevelButtonUnselected(correctLevelQButton);
    _setStyleCorrectLevelButtonUnselected(correctLevelHButton);
}

function setStyles(url: string | undefined, correctLevel: CorrectLevel, allElements: AllElements, { appContents, topBar, popupButton, popupImage, saveUrlButton, darkModeButton, savedUrlsMenu, qrCode, urlOptionsContainer, pageButtonContainer, thisPageButton, customPageButton, savedUrlsButton, input, correctLevelContainer, correctLevelDescription, correctLevelButtonContainer, correctLevelLButton, correctLevelMButton, correctLevelQButton, correctLevelHButton, licensingText }: AllElements) {
    appContents.className = "bg-gray-100 dark:bg-zinc-800 grid grid-cols-1 gap-2 break-words w-80 text-center p-4";
        topBar.className = "flex flex-row h-8";
            popupButton.className = "w-7";
                popupImage.className = "invert-0 dark:invert active:w-6 m-auto";
            savedUrlsButton.className = "grow bg-zinc-300 rounded-full mx-4 dark:bg-slate-600 text-black dark:text-neutral-200";
            darkModeButton.className = "text-2xl";
        savedUrlsMenu.hidden = true;
        qrCode.className = "m-auto";
        urlOptionsContainer.className = "flex flex-row";
            pageButtonContainer.className = "p-1 rounded-full bg-neutral-300 w-fit dark:bg-slate-600 text-black dark:text-neutral-200";
            saveUrlButton.className = "mx-auto text-2xl";
        input.className = "text-center rounded-full p-2 bg-neutral-200 dark:bg-slate-600 text-black dark:text-neutral-200  disabled:text-neutral-400 dark:disabled:text-gray-500 dark:disabled:bg-slate-700";
        correctLevelContainer.className = "flex flex-row";
            correctLevelDescription.className = "flex m-auto text-black dark:text-neutral-200";
            correctLevelButtonContainer.className = "p-1 rounded-full bg-neutral-300 w-fit dark:bg-slate-600 text-black dark:text-neutral-200";
        licensingText.className = "text-sky-600 dark:text-sky-700 text-sm underline decoration-dashed w-fit m-auto";
    
    input.disabled = true;

    if (url === undefined) {
        _setStylePageButtonSelected(customPageButton);
        _setStylePageButtonUnselected(thisPageButton);
        thisPageButton.disabled = true;
    } else {
        _setStylePageButtonSelected(thisPageButton);
        _setStylePageButtonUnselected(customPageButton);
    }

    _setStylesCorrectLevelButtonUnselected(allElements);

    if (correctLevel === CorrectLevel.L) {
        _setStyleCorrectLevelButtonSelected(correctLevelLButton);
    } else if (correctLevel === CorrectLevel.M) {
        _setStyleCorrectLevelButtonSelected(correctLevelMButton);
    } else if (correctLevel === CorrectLevel.Q) {
        _setStyleCorrectLevelButtonSelected(correctLevelQButton);
    } else if (correctLevel === CorrectLevel.H) {
        _setStyleCorrectLevelButtonSelected(correctLevelHButton);
    }
}

function setText(url: string | undefined, { popupButton, popupImage, saveUrlButton, thisPageButton, customPageButton, savedUrlsButton, input, correctLevelDescription, correctLevelLButton, correctLevelMButton, correctLevelQButton, correctLevelHButton, licensingText }: AllElements) {
    popupButton.title = "Pop out to a new window";

    popupImage.src = "/assets/popup.svg";

    savedUrlsButton.textContent = "Saved URLs";
    savedUrlsButton.title = "Show saved URLs";
    
    thisPageButton.textContent = "This Page";

    customPageButton.textContent = "Custom Page";
    
    saveUrlButton.textContent = "📂";
    saveUrlButton.title = "Save URL";

    correctLevelLButton.textContent = "L";
    correctLevelLButton.title = "Low";

    correctLevelMButton.textContent = "M";
    correctLevelMButton.title = "Medium";

    correctLevelQButton.textContent = "Q";
    correctLevelQButton.title = "Quality";

    correctLevelHButton.textContent = "H";
    correctLevelHButton.title = "High";
    
    if (url !== undefined) input.value = url;

    correctLevelDescription.textContent = "correct level:";

    licensingText.textContent = "About license";
    licensingText.href = "https://github.com/Samuel-Risner/qrcode-generator-browser-extension#readme";
    licensingText.title = "This Repo is licensed under the MIT license. This does not include the file 'qrcode.js' which is located in 'extension/js/'. The file is licensed under the MIT license by davidshimjs. For more information see this extensions GitHub repo: https://github.com/Samuel-Risner/qrcode-generator-browser-extension#readme";
}

function setDarkMode({ app, darkModeButton }: AllElements, isDark: boolean) {
    if (isDark) {
        app.classList.add("dark");
        darkModeButton.textContent = "🌕";
        darkModeButton.title = "Switch to light mode";
    } else {
        app.classList.remove("dark");
        darkModeButton.textContent = "🌑";
        darkModeButton.title = "Switch to dark mode";
    }
}

function addEvents(code: Code, url: string | undefined, savedUrls: SavedUrls, allElements: AllElements, { popupButton, saveUrlButton, darkModeButton, savedUrlsMenu, thisPageButton, customPageButton, savedUrlsButton, input, correctLevelLButton, correctLevelMButton, correctLevelQButton, correctLevelHButton }: AllElements) {
    popupButton.onclick = () => {
        browser.windows.create( { url: settings.popupHtml, type: "popup", width: window.innerWidth, height: window.innerHeight + 1 });
    }

    saveUrlButton.onclick = () => {
        const msg: AddUrlMessage = { type: MessageTypes.AddUrl, url: input.value };
        browser.runtime.sendMessage(msg).then((res: AddUrlResponse) => {
            savedUrls.setUrls(res.urls, res.urlVersion);
        });
    }

    darkModeButton.onclick = () => {
        const msg: ToggleDarkModeMessage = { type: MessageTypes.ToggleDarkMode };
        browser.runtime.sendMessage(msg).then((res: ToggleDarkModeResponse) => {
            setDarkMode(allElements, res.isDark);
        });
    }

    savedUrlsButton.onclick = async () => {
        const msg: GetUrlsMessage = { type: MessageTypes.GetUrls };
        const data: GetUrlsResponse = await browser.runtime.sendMessage(msg);
        savedUrls.setUrls(data.urls, data.urlVersion);
        savedUrlsMenu.hidden = !savedUrlsMenu.hidden;
    }

    if (url !== undefined) {
        thisPageButton.onclick = () => {
            _setStylePageButtonSelected(thisPageButton);
            _setStylePageButtonUnselected(customPageButton);
            input.disabled = true;
            input.value = url;
            code.createCode(url);
        }

        customPageButton.onclick = () => {
            _setStylePageButtonSelected(customPageButton);
            _setStylePageButtonUnselected(thisPageButton);
            input.disabled = false;
        }
    }

    input.oninput = () => {
        code.createCode(input.value);
    }

    correctLevelLButton.onclick = async () => {
        _setStylesCorrectLevelButtonUnselected(allElements);
        _setStyleCorrectLevelButtonSelected(correctLevelLButton);
        const message: SetCorrectLevelMessage = { type: MessageTypes.SetCorrectLevel, correctLevel: CorrectLevel.L };
        await browser.runtime.sendMessage(message);
        code.setStuff({ correctLevel: CorrectLevel.L });
    }

    correctLevelMButton.onclick = async () => {
        _setStylesCorrectLevelButtonUnselected(allElements);
        _setStyleCorrectLevelButtonSelected(correctLevelMButton);
        const message: SetCorrectLevelMessage = { type: MessageTypes.SetCorrectLevel, correctLevel: CorrectLevel.M };
        await browser.runtime.sendMessage(message);
        code.setStuff({ correctLevel: CorrectLevel.M });
    }

    correctLevelQButton.onclick = async () => {
        _setStylesCorrectLevelButtonUnselected(allElements);
        _setStyleCorrectLevelButtonSelected(correctLevelQButton);
        const message: SetCorrectLevelMessage = { type: MessageTypes.SetCorrectLevel, correctLevel: CorrectLevel.Q };
        await browser.runtime.sendMessage(message);
        code.setStuff({ correctLevel: CorrectLevel.Q });
    }

    correctLevelHButton.onclick = async () => {
        _setStylesCorrectLevelButtonUnselected(allElements);
        _setStyleCorrectLevelButtonSelected(correctLevelHButton);
        const message: SetCorrectLevelMessage = { type: MessageTypes.SetCorrectLevel, correctLevel: CorrectLevel.H };
        await browser.runtime.sendMessage(message);
        code.setStuff({ correctLevel: CorrectLevel.H });
    }
}

function addSavedUrl(url: string, { input }: AllElements, code: Code) {
    input.value = url;
    code.createCode(url);
}

async function main() {
    const urlPromise: Promise<browser.tabs.Tab[]> = browser.tabs.query({ currentWindow: true, active: true });
    const message: GetQrSettingsAndDarkModeMessage = { type: MessageTypes.GetQrSettingsAndDarkMode };
    const qrSettingsAndDarkModePromise = browser.runtime.sendMessage(message);

    const allElements = createAndGetElements();
    combineElements(allElements)

    const url: string | undefined = (await urlPromise)[0].url;
    const qrSettingsAndDarkMode: GetQrSettingsAndDarkModeResponse = await qrSettingsAndDarkModePromise;

    const code = new Code(url, allElements.qrCode, qrSettingsAndDarkMode);
    const savedUrls = new SavedUrls((url: string) => { addSavedUrl(url, allElements, code); }, allElements.savedUrlsMenu);

    setStyles(url, qrSettingsAndDarkMode.correctLevel, allElements, allElements);
    setText(url, allElements);
    addEvents(code, url, savedUrls, allElements, allElements);
    setDarkMode(allElements, qrSettingsAndDarkMode.isDark);

    allElements.app.hidden = false;
}

main();
  