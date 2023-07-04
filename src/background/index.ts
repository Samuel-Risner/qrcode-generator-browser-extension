import { AddUrlMessage, AddUrlResponse, BasicMessage, GetDarkModeResponse, GetQrSettingsResponse, GetUrlsResponse, RemoveUrlMessage, RemoveUrlResponse, ToggleDarkModeResponse } from "./../shared/types";
import { MessageTypes } from "./../shared/messageTypes";
import { removeElementFromArray } from "./../shared/misc";
import { CorrectLevel } from "./../popup/code";

type SavedData = {
    urls: string[];
    urlVersion: number;
    isDark: boolean;
    correctLevel: CorrectLevel;
    colorDark: string;
    colorLight: string;
}

browser.runtime.onInstalled.addListener(() => {
    const data: SavedData = { urls: [], urlVersion: 0, isDark: false, correctLevel: 0, colorDark: "#000000", colorLight: "#ffffff" };
    browser.storage.local.set(data);
});

async function addUrl(sendResponse: (response: AddUrlResponse) => void, url: string) {
    const data = (await browser.storage.local.get()) as SavedData;
    data.urls.push(url);
    data.urlVersion += 1;
    browser.storage.local.set(data);
    sendResponse(data);
}

async function getUrls(sendResponse: (response: GetUrlsResponse) => void) {
    const data = (await browser.storage.local.get()) as SavedData;
    sendResponse(data);
}

async function removeUrl(sendResponse: (response: RemoveUrlResponse) => void, url: string) {
    const data = (await browser.storage.local.get()) as SavedData;
    removeElementFromArray(data.urls, url);
    data.urlVersion += 1;
    browser.storage.local.set(data);
    sendResponse(data);
}

async function toggleDarkMode(sendResponse: (response: ToggleDarkModeResponse) => void) {
    const data = (await browser.storage.local.get()) as SavedData;
    data.isDark = !data.isDark;
    browser.storage.local.set(data);
    sendResponse( { isDark: data.isDark });
}

async function getDarkMode(sendResponse: (response: GetDarkModeResponse) => void) {
    const data = (await browser.storage.local.get()) as SavedData;
    sendResponse( { isDark: data.isDark });
}

async function getQrSettings(sendResponse: (response: GetQrSettingsResponse) => void) {
    const data = (await browser.storage.local.get()) as SavedData;
    sendResponse( { colorDark: data.colorDark, colorLight: data.colorLight, correctLevel: data.correctLevel });
}

browser.runtime.onMessage.addListener((message: BasicMessage, sender: browser.runtime.MessageSender, sendResponse: (response?: any) => void) => {
    if (message.type === MessageTypes.AddUrl) {
        addUrl(sendResponse, (message as AddUrlMessage).url);
    } else if (message.type === MessageTypes.GetUrls) {
        getUrls(sendResponse);
    } else if (message.type === MessageTypes.RemoveUrl) {
        removeUrl(sendResponse, (message as RemoveUrlMessage).url);
    } else if (message.type === MessageTypes.ToggleDarkMode) {
        toggleDarkMode(sendResponse);
    } else if (message.type === MessageTypes.GetDarkMode) {
        getDarkMode(sendResponse);
    } else if (message.type === MessageTypes.GetQrSettings) {
        getQrSettings(sendResponse);
    }

    return true;
});
