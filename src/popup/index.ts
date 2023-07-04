import Code from "./code";
import SavedUrls from "./savedUrls";
import { AddUrlMessage, AddUrlResponse, GetDarkModeMessage, GetDarkModeResponse, GetUrlsMessage, GetUrlsResponse, ToggleDarkModeMessage, ToggleDarkModeResponse } from "./../shared/types";
import { MessageTypes } from "./../shared/messageTypes";

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
            qrCodeCorrectLevel: HTMLInputElement;
            qrCodeCorrectLevelDataList: HTMLDataListElement;
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
                qrCodeCorrectLevel: document.createElement("input"),
                qrCodeCorrectLevelDataList: document.createElement("datalist"),
                licensingText: document.createElement("a")
    }
}

function combineElements({ app, appContents, topBar, popupButton, popupImage, saveUrlButton, darkModeButton, savedUrlsMenu, qrCode, urlOptionsContainer, buttonContainer, thisPageButton, customPageButton, savedUrlsButton, input, qrCodeCorrectLevel, qrCodeCorrectLevelDataList, licensingText }: AllElements) {
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
        appContents.appendChild(qrCodeCorrectLevel);
        appContents.appendChild(qrCodeCorrectLevelDataList);
        appContents.appendChild(licensingText);
}

function setStyleButtonSelected(el: HTMLButtonElement) {
    el.className = "py-1 px-2 rounded-full bg-neutral-100 dark:bg-slate-500";
}

function setStyleButtonUnselected(el: HTMLButtonElement) {
    el.className = "py-1 px-2 rounded-full bg-transparent";
}

function setStyles(aE: AllElements, url: string | undefined) {
    aE.appContents.className = "bg-gray-100 dark:bg-zinc-800 grid grid-cols-1 gap-2 break-words w-80 text-center p-4";
        aE.topBar.className = "flex flex-row h-8";
            aE.popupButton.className = "w-7";
                aE.popupImage.className = "invert-0 dark:invert active:w-6 m-auto";
            aE.savedUrlsButton.className = "grow bg-zinc-300 rounded-full mx-4 dark:bg-slate-600 text-black dark:text-neutral-200";
            aE.darkModeButton.className = "text-2xl";
        aE.savedUrlsMenu.hidden = true;
        aE.qrCode.className = "m-auto";
        aE.urlOptionsContainer.className = "flex flex-row";
            aE.buttonContainer.className = "p-1 rounded-full bg-neutral-300 w-fit dark:bg-slate-600 text-black dark:text-neutral-200";
            aE.saveUrlButton.className = "mx-auto text-2xl";
        aE.input.className = "text-center rounded-full p-2 bg-neutral-200 dark:bg-slate-600 text-black dark:text-neutral-200  disabled:text-neutral-400 dark:disabled:text-gray-500 dark:disabled:bg-slate-700";
        aE.input.disabled = true;
        aE.qrCodeCorrectLevelDataList.className = "flex flex-row justify-between text-sm ml-2 mr-1 text-black dark:text-neutral-200";
        aE.licensingText.className = "text-sky-600 dark:text-sky-700 text-sm underline decoration-dashed";

    if (url === undefined) {
        setStyleButtonSelected(aE.customPageButton);
        setStyleButtonUnselected(aE.thisPageButton);
        aE.thisPageButton.disabled = true;
    } else {
        setStyleButtonSelected(aE.thisPageButton);
        setStyleButtonUnselected(aE.customPageButton);
    }
}

function setQrCodeCorrectLevelDatalistEntries(datalist: HTMLDataListElement) {
    let option = document.createElement("option");
    option.value = "0";
    option.label = "L";
    datalist.appendChild(option);

    option = document.createElement("option");
    option.value = "1";
    option.label = "M";
    datalist.appendChild(option);

    option = document.createElement("option");
    option.value = "2";
    option.label = "Q";
    datalist.appendChild(option);

    option = document.createElement("option");
    option.value = "3";
    option.label = "H";
    datalist.appendChild(option);
}

function setText(aE: AllElements, url: string | undefined) {
    aE.popupButton.title = "Pop out to a new window";

    aE.popupImage.src = "assets/popup.svg";

    aE.savedUrlsButton.textContent = "Saved URLs";
    aE.savedUrlsButton.title = "Show saved URLs";
    
    aE.thisPageButton.textContent = "This Page";

    aE.customPageButton.textContent = "Custom Page";
    
    aE.saveUrlButton.textContent = "📂";
    aE.saveUrlButton.title = "Save URL";
    
    if (url !== undefined) aE.input.value = url;

    aE.qrCodeCorrectLevel.type = "range";
    aE.qrCodeCorrectLevel.min = String(0);
    aE.qrCodeCorrectLevel.max = String(3);
    aE.qrCodeCorrectLevel.value = "0";
    aE.qrCodeCorrectLevel.setAttribute("list", "setQrCodeCorrectLevelDatalistEntriesId");

    aE.qrCodeCorrectLevelDataList.id = "setQrCodeCorrectLevelDatalistEntriesId";

    setQrCodeCorrectLevelDatalistEntries(aE.qrCodeCorrectLevelDataList);

    aE.licensingText.textContent = "About license";
    aE.licensingText.href = "https://github.com/Samuel-Risner/qrcode-generator-browser-extension#readme";
    aE.licensingText.title = "This Repo is licensed under the MIT license. This does not include the file 'qrcode.js' which is located in 'extension/js/'. The file is licensed under the MIT license by davidshimjs. For more information see this extensions GitHub repo: https://github.com/Samuel-Risner/qrcode-generator-browser-extension#readme";
}

function createQrCode(aE: AllElements, url: string | undefined): any {
    if (url === undefined) {
        // @ts-ignore
        const qrCode = new QRCode(aE.qrCode, { text: "", correctLevel: QRCode.CorrectLevel.H });
        qrCode.clear();

        return qrCode;
    }

    // @ts-ignore
    return new QRCode(aE.qrCode, { text: url, correctLevel: QRCode.CorrectLevel.H });
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

function addEvents(aE: AllElements, qrCode: any, url: string | undefined, savedUrls: SavedUrls) {
    aE.input.oninput = () => {
        qrCode.clear();
        qrCode.makeCode(aE.input.value);
    }

    if (url !== undefined) {
        aE.thisPageButton.onclick = () => {
            setStyleButtonSelected(aE.thisPageButton);
            setStyleButtonUnselected(aE.customPageButton);
            aE.input.disabled = true;
            aE.input.value = url;
            qrCode.clear();
            qrCode.makeCode(url);
        }

        aE.customPageButton.onclick = () => {
            setStyleButtonSelected(aE.customPageButton);
            setStyleButtonUnselected(aE.thisPageButton);
            aE.input.disabled = false;
        }
    }

    aE.popupButton.onclick = () => {
        browser.windows.create( { url: "popup.html", type: "popup", width: window.innerWidth, height: window.innerHeight + 1 });
    }

    aE.saveUrlButton.onclick = () => {
        const msg: AddUrlMessage = { type: MessageTypes.AddUrl, url: aE.input.value };
        browser.runtime.sendMessage(msg).then((res: AddUrlResponse) => {
            savedUrls.setUrls(res.urls, res.urlVersion);
        });
    }

    aE.savedUrlsButton.onclick = () => {
        const msg: GetUrlsMessage = { type: MessageTypes.GetUrls };
        browser.runtime.sendMessage(msg).then((res: GetUrlsResponse) => {
            savedUrls.setUrls(res.urls, res.urlVersion);
        });
        aE.savedUrlsMenu.hidden = !aE.savedUrlsMenu.hidden;
    }

    aE.darkModeButton.onclick = async () => {
        const msg: ToggleDarkModeMessage = { type: MessageTypes.ToggleDarkMode };
        browser.runtime.sendMessage(msg).then((res: ToggleDarkModeResponse) => {
            setDarkMode(aE, res.isDark);
        });
    }

    aE.qrCodeCorrectLevel.oninput = () => {
        aE.qrCodeCorrectLevel.title = String(aE.qrCodeCorrectLevel.value);
    }
}

function addSavedUrl(url: string, aE: AllElements, qrCode: any) {
    aE.input.value = url;
    qrCode.clear();
    qrCode.makeCode(url);
}

async function main() {
    let urlPromise: Promise<browser.tabs.Tab[]> = browser.tabs.query({ currentWindow: true, active: true });

    const allElements = createAndGetElements();
    combineElements(allElements)

    let url: string | undefined = (await urlPromise)[0].url;

    // const code = new Code(url, allElements.qrCode, {});

    setStyles(allElements, url);
    setText(allElements, url);
    const qrCode = createQrCode(allElements, url);
    const savedUrls = new SavedUrls((url: string) => { addSavedUrl(url, allElements, qrCode); }, allElements.savedUrlsMenu);
    addEvents(allElements, qrCode, url, savedUrls);

    const msg: GetDarkModeMessage = { type: MessageTypes.GetDarkMode };
    browser.runtime.sendMessage(msg).then((res: GetDarkModeResponse) => {
        setDarkMode(allElements, res.isDark);
    });

    allElements.app.hidden = false;
}

main();
  