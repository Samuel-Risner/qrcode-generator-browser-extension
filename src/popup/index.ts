import Code from "./code";
import SavedUrls from "./savedUrls";
import { AddUrlMessage, AddUrlResponse, GetDarkModeMessage, GetDarkModeResponse, GetQrSettingsMessage, GetQrSettingsResponse, GetUrlsMessage, GetUrlsResponse, SetCorrectLevelMessage, ToggleDarkModeMessage, ToggleDarkModeResponse } from "./../shared/types";
import { MessageTypes } from "./../shared/messageTypes";
import settings from "../shared/settings";
import { CorrectLevel } from "../shared/correctLevel";

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
                buttonContainer: HTMLDivElement;
                    thisPageButton: HTMLButtonElement;
                    customPageButton: HTMLButtonElement;
                saveUrlButton: HTMLButtonElement;
            input: HTMLInputElement;
            correctLevelContainer: HTMLDivElement;
                correctLevelDescription: HTMLSpanElement;
                qrCodeCorrectLevelContainer: HTMLDivElement;
                    qrCodeCorrectLevelLButton: HTMLButtonElement;
                    qrCodeCorrectLevelMButton: HTMLButtonElement;
                    qrCodeCorrectLevelQButton: HTMLButtonElement;
                    qrCodeCorrectLevelHButton: HTMLButtonElement;
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
                    buttonContainer: document.createElement("div"),
                        thisPageButton: document.createElement("button"),
                        customPageButton: document.createElement("button"),
                    saveUrlButton: document.createElement("button"),
                input: document.createElement("input"),
                correctLevelContainer: document.createElement("div"),
                    correctLevelDescription: document.createElement("div"),
                    qrCodeCorrectLevelContainer: document.createElement("div"),
                        qrCodeCorrectLevelLButton: document.createElement("button"),
                        qrCodeCorrectLevelMButton: document.createElement("button"),
                        qrCodeCorrectLevelQButton: document.createElement("button"),
                        qrCodeCorrectLevelHButton: document.createElement("button"),
                licensingText: document.createElement("a")
    }
}

function combineElements({ app, appContents, topBar, popupButton, popupImage, saveUrlButton, darkModeButton, savedUrlsMenu, qrCode, urlOptionsContainer, buttonContainer, thisPageButton, customPageButton, savedUrlsButton, input, correctLevelContainer, correctLevelDescription, qrCodeCorrectLevelContainer, qrCodeCorrectLevelLButton, qrCodeCorrectLevelMButton, qrCodeCorrectLevelQButton, qrCodeCorrectLevelHButton, licensingText }: AllElements) {
    app.appendChild(appContents);
        appContents.appendChild(topBar);
            topBar.appendChild(popupButton);
                popupButton.appendChild(popupImage);
            topBar.appendChild(savedUrlsButton);
            topBar.appendChild(darkModeButton);
        appContents.appendChild(savedUrlsMenu);
        appContents.appendChild(qrCode);
        appContents.append(urlOptionsContainer);
            urlOptionsContainer.appendChild(buttonContainer);
                buttonContainer.appendChild(thisPageButton);
                buttonContainer.appendChild(customPageButton);
            urlOptionsContainer.appendChild(saveUrlButton);
        appContents.appendChild(input);
        appContents.appendChild(correctLevelContainer);
            correctLevelContainer.appendChild(correctLevelDescription);
            correctLevelContainer.appendChild(qrCodeCorrectLevelContainer);
                qrCodeCorrectLevelContainer.appendChild(qrCodeCorrectLevelLButton);
                qrCodeCorrectLevelContainer.appendChild(qrCodeCorrectLevelMButton);
                qrCodeCorrectLevelContainer.appendChild(qrCodeCorrectLevelQButton);
                qrCodeCorrectLevelContainer.appendChild(qrCodeCorrectLevelHButton);
        appContents.appendChild(licensingText);
}

function _setStyleButtonSelected(el: HTMLButtonElement) {
    el.className = "py-1 px-2 rounded-full bg-neutral-100 dark:bg-slate-500";
}

function _setStyleButtonUnselected(el: HTMLButtonElement) {
    el.className = "py-1 px-2 rounded-full bg-transparent";
}

function _setStyleCorrectLevelButtonSelected(el: HTMLButtonElement) {
    el.className = "py-1 px-3 rounded-full bg-neutral-100 dark:bg-slate-500";
}

function _setStyleCorrectLevelButtonUnselected(el: HTMLButtonElement) {
    el.className = "py-1 px-3 rounded-full bg-transparent";
}

function setStyles(url: string | undefined, code: Code, correctLevel: CorrectLevel, { app, appContents, topBar, popupButton, popupImage, saveUrlButton, darkModeButton, savedUrlsMenu, qrCode, urlOptionsContainer, buttonContainer, thisPageButton, customPageButton, savedUrlsButton, input, correctLevelContainer, correctLevelDescription, qrCodeCorrectLevelContainer, qrCodeCorrectLevelLButton, qrCodeCorrectLevelMButton, qrCodeCorrectLevelQButton, qrCodeCorrectLevelHButton, licensingText }: AllElements) {
    appContents.className = "bg-gray-100 dark:bg-zinc-800 grid grid-cols-1 gap-2 break-words w-80 text-center p-4";
        topBar.className = "flex flex-row h-8";
            popupButton.className = "w-7";
                popupImage.className = "invert-0 dark:invert active:w-6 m-auto";
            savedUrlsButton.className = "grow bg-zinc-300 rounded-full mx-4 dark:bg-slate-600 text-black dark:text-neutral-200";
            darkModeButton.className = "text-2xl";
        savedUrlsMenu.hidden = true;
        qrCode.className = "m-auto";
        urlOptionsContainer.className = "flex flex-row";
            buttonContainer.className = "p-1 rounded-full bg-neutral-300 w-fit dark:bg-slate-600 text-black dark:text-neutral-200";
            saveUrlButton.className = "mx-auto text-2xl";
        input.className = "text-center rounded-full p-2 bg-neutral-200 dark:bg-slate-600 text-black dark:text-neutral-200  disabled:text-neutral-400 dark:disabled:text-gray-500 dark:disabled:bg-slate-700";
        input.disabled = true;
        correctLevelContainer.className = "flex flex-row";
            correctLevelDescription.className = "flex m-auto";
        qrCodeCorrectLevelContainer.className = "p-1 rounded-full bg-neutral-300 w-fit dark:bg-slate-600 text-black dark:text-neutral-200";
        licensingText.className = "text-sky-600 dark:text-sky-700 text-sm underline decoration-dashed";

    if (url === undefined) {
        _setStyleButtonSelected(customPageButton);
        _setStyleButtonUnselected(thisPageButton);
        thisPageButton.disabled = true;
    } else {
        _setStyleButtonSelected(thisPageButton);
        _setStyleButtonUnselected(customPageButton);
    }

    _setStyleCorrectLevelButtonUnselected(qrCodeCorrectLevelLButton);
    _setStyleCorrectLevelButtonUnselected(qrCodeCorrectLevelMButton);
    _setStyleCorrectLevelButtonUnselected(qrCodeCorrectLevelQButton);
    _setStyleCorrectLevelButtonUnselected(qrCodeCorrectLevelHButton);

    if (correctLevel === CorrectLevel.L) {
        _setStyleCorrectLevelButtonSelected(qrCodeCorrectLevelLButton);
    } else if (correctLevel === CorrectLevel.M) {
        _setStyleCorrectLevelButtonSelected(qrCodeCorrectLevelMButton);
    } else if (correctLevel === CorrectLevel.Q) {
        _setStyleCorrectLevelButtonSelected(qrCodeCorrectLevelQButton);
    } else if (correctLevel === CorrectLevel.H) {
        _setStyleCorrectLevelButtonSelected(qrCodeCorrectLevelHButton);
    }
}

function setText(url: string | undefined, { app, appContents, topBar, popupButton, popupImage, saveUrlButton, darkModeButton, savedUrlsMenu, qrCode, urlOptionsContainer, buttonContainer, thisPageButton, customPageButton, savedUrlsButton, input, correctLevelDescription, qrCodeCorrectLevelContainer, qrCodeCorrectLevelLButton, qrCodeCorrectLevelMButton, qrCodeCorrectLevelQButton, qrCodeCorrectLevelHButton, licensingText }: AllElements) {
    popupButton.title = "Pop out to a new window";

    popupImage.src = "/assets/popup.svg";

    savedUrlsButton.textContent = "Saved URLs";
    savedUrlsButton.title = "Show saved URLs";
    
    thisPageButton.textContent = "This Page";

    customPageButton.textContent = "Custom Page";
    
    saveUrlButton.textContent = "📂";
    saveUrlButton.title = "Save URL";

    qrCodeCorrectLevelLButton.textContent = "L";
    qrCodeCorrectLevelLButton.title = "Low";

    qrCodeCorrectLevelMButton.textContent = "M";
    qrCodeCorrectLevelMButton.title = "Medium";

    qrCodeCorrectLevelQButton.textContent = "Q";
    qrCodeCorrectLevelQButton.title = "Quality";

    qrCodeCorrectLevelHButton.textContent = "H";
    qrCodeCorrectLevelHButton.title = "High";
    
    if (url !== undefined) input.value = url;

    correctLevelDescription.textContent = "correct level:";

    licensingText.textContent = "About license";
    licensingText.href = "https://github.com/Samuel-Risner/qrcode-generator-browser-extension#readme";
    licensingText.title = "This Repo is licensed under the MIT license. This does not include the file 'qrcode.js' which is located in 'extension/js/'. The file is licensed under the MIT license by davidshimjs. For more information see this extensions GitHub repo: https://github.com/Samuel-Risner/qrcode-generator-browser-extension#readme";
}

function setDarkMode(aE: AllElements, isDark: boolean) {
    if (isDark) {
        aE.app.classList.add("dark");
        aE.darkModeButton.textContent = "🌕";
        aE.darkModeButton.title = "Switch to light mode";
    } else {
        aE.app.classList.remove("dark");
        aE.darkModeButton.textContent = "🌑";
        aE.darkModeButton.title = "Switch to dark mode";
    }
}

function addEvents(qrCode: Code, url: string | undefined, savedUrls: SavedUrls, allElements: AllElements, { app, appContents, topBar, popupButton, popupImage, saveUrlButton, darkModeButton, savedUrlsMenu, urlOptionsContainer, buttonContainer, thisPageButton, customPageButton, savedUrlsButton, input, qrCodeCorrectLevelContainer, qrCodeCorrectLevelLButton, qrCodeCorrectLevelMButton, qrCodeCorrectLevelQButton, qrCodeCorrectLevelHButton, licensingText }: AllElements) {
    popupButton.onclick = () => {
        browser.windows.create( { url: settings.popupHtml, type: "popup", width: window.innerWidth, height: window.innerHeight + 1 });
    }

    saveUrlButton.onclick = () => {
        const msg: AddUrlMessage = { type: MessageTypes.AddUrl, url: input.value };
        browser.runtime.sendMessage(msg).then((res: AddUrlResponse) => {
            savedUrls.setUrls(res.urls, res.urlVersion);
        });
    }

    darkModeButton.onclick = async () => {
        const msg: ToggleDarkModeMessage = { type: MessageTypes.ToggleDarkMode };
        browser.runtime.sendMessage(msg).then((res: ToggleDarkModeResponse) => {
            setDarkMode(allElements, res.isDark);
        });
    }

    savedUrlsButton.onclick = () => {
        const msg: GetUrlsMessage = { type: MessageTypes.GetUrls };
        browser.runtime.sendMessage(msg).then((res: GetUrlsResponse) => {
            savedUrls.setUrls(res.urls, res.urlVersion);
        });
        savedUrlsMenu.hidden = !savedUrlsMenu.hidden;
    }

    if (url !== undefined) {
        thisPageButton.onclick = () => {
            _setStyleButtonSelected(thisPageButton);
            _setStyleButtonUnselected(customPageButton);
            input.disabled = true;
            input.value = url;
            qrCode.createCode(url);
        }

        customPageButton.onclick = () => {
            _setStyleButtonSelected(customPageButton);
            _setStyleButtonUnselected(thisPageButton);
            input.disabled = false;
        }
    }

    input.oninput = () => {
        qrCode.createCode(input.value);
    }

    qrCodeCorrectLevelLButton.onclick = async () => {
        _setStyleCorrectLevelButtonSelected(qrCodeCorrectLevelLButton);
        _setStyleCorrectLevelButtonUnselected(qrCodeCorrectLevelMButton);
        _setStyleCorrectLevelButtonUnselected(qrCodeCorrectLevelQButton);
        _setStyleCorrectLevelButtonUnselected(qrCodeCorrectLevelHButton);
        const message: SetCorrectLevelMessage = { type: MessageTypes.SetCorrectLevel, correctLevel: CorrectLevel.L };
        await browser.runtime.sendMessage(message);
        qrCode.setStuff({ correctLevel: CorrectLevel.L });
    }

    qrCodeCorrectLevelMButton.onclick = async () => {
        _setStyleCorrectLevelButtonUnselected(qrCodeCorrectLevelLButton);
        _setStyleCorrectLevelButtonSelected(qrCodeCorrectLevelMButton);
        _setStyleCorrectLevelButtonUnselected(qrCodeCorrectLevelQButton);
        _setStyleCorrectLevelButtonUnselected(qrCodeCorrectLevelHButton);
        const message: SetCorrectLevelMessage = { type: MessageTypes.SetCorrectLevel, correctLevel: CorrectLevel.M };
        await browser.runtime.sendMessage(message);
        qrCode.setStuff({ correctLevel: CorrectLevel.M });
    }

    qrCodeCorrectLevelQButton.onclick = async () => {
        _setStyleCorrectLevelButtonUnselected(qrCodeCorrectLevelLButton);
        _setStyleCorrectLevelButtonUnselected(qrCodeCorrectLevelMButton);
        _setStyleCorrectLevelButtonSelected(qrCodeCorrectLevelQButton);
        _setStyleCorrectLevelButtonUnselected(qrCodeCorrectLevelHButton);
        const message: SetCorrectLevelMessage = { type: MessageTypes.SetCorrectLevel, correctLevel: CorrectLevel.Q };
        await browser.runtime.sendMessage(message);
        qrCode.setStuff({ correctLevel: CorrectLevel.Q });
    }

    qrCodeCorrectLevelHButton.onclick = async () => {
        _setStyleCorrectLevelButtonUnselected(qrCodeCorrectLevelLButton);
        _setStyleCorrectLevelButtonUnselected(qrCodeCorrectLevelMButton);
        _setStyleCorrectLevelButtonUnselected(qrCodeCorrectLevelQButton);
        _setStyleCorrectLevelButtonSelected(qrCodeCorrectLevelHButton);
        const message: SetCorrectLevelMessage = { type: MessageTypes.SetCorrectLevel, correctLevel: CorrectLevel.H };
        await browser.runtime.sendMessage(message);
        qrCode.setStuff({ correctLevel: CorrectLevel.H });
    }
}

function addSavedUrl(url: string, aE: AllElements, qrCode: any) {
    aE.input.value = url;
    qrCode.clear();
    qrCode.makeCode(url);
}

async function main() {
    console.log("foo");

    let urlPromise: Promise<browser.tabs.Tab[]> = browser.tabs.query({ currentWindow: true, active: true });
    const message: GetQrSettingsMessage = { type: MessageTypes.GetQrSettings };
    let qrSettingsPromise = browser.runtime.sendMessage(message);

    const allElements = createAndGetElements();
    combineElements(allElements)

    let url: string | undefined = (await urlPromise)[0].url;
    let qrSettings: GetQrSettingsResponse = await qrSettingsPromise;

    const qrCode = new Code(url, allElements.qrCode, qrSettings);
    const savedUrls = new SavedUrls((url: string) => { addSavedUrl(url, allElements, qrCode); }, allElements.savedUrlsMenu);

    setStyles(url, qrCode, qrSettings.correctLevel, allElements);
    setText(url, allElements);
    addEvents(qrCode, url, savedUrls, allElements, allElements);

    const msg: GetDarkModeMessage = { type: MessageTypes.GetDarkMode };
    browser.runtime.sendMessage(msg).then((res: GetDarkModeResponse) => {
        setDarkMode(allElements, res.isDark);
    });

    allElements.app.hidden = false;
}

main();
  