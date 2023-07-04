import { CorrectLevel } from "../shared/correctLevel";
import { MessageTypes } from "../shared/messageTypes";
import { removeElementFromArray } from "../shared/misc";
import settings from "../shared/settings";
import { AddUrlMessage, AddUrlResponse, BasicMessage, GetQrSettingsAndDarkModeResponse, GetUrlsResponse, RemoveUrlMessage, RemoveUrlResponse, SetCorrectLevelMessage, SetCorrectLevelResponse, ToggleDarkModeResponse } from "../shared/types";

type SavedData = {
    urls: string[];
    urlVersion: number;
    isDark: boolean;
    correctLevel: CorrectLevel;
    colorDark: string;
    colorLight: string;
}

browser.runtime.onInstalled.addListener(() => {
    const data: SavedData = {
        urls: [],
        urlVersion: 0,
        isDark: false,
        correctLevel: settings.default.correctLevel,
        colorDark: settings.default.colorDark,
        colorLight: settings.default.colorLight
    };
    browser.storage.local.set(data);
});

async function addUrl(sendResponse: (response: AddUrlResponse) => void, url: string) {
    const data = (await browser.storage.local.get()) as SavedData;
    data.urls.push(url);
    data.urlVersion += 1;
    await browser.storage.local.set(data);
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
    await browser.storage.local.set(data);
    sendResponse(data);
}

async function toggleDarkMode(sendResponse: (response: ToggleDarkModeResponse) => void) {
    const data = (await browser.storage.local.get()) as SavedData;
    data.isDark = !data.isDark;
    await browser.storage.local.set(data);
    sendResponse( { isDark: data.isDark });
}

async function setCorrectLevel(sendResponse: (response: SetCorrectLevelResponse) => void, correctLevel: CorrectLevel) {
    const data = (await browser.storage.local.get()) as SavedData;
    data.correctLevel = correctLevel;
    await browser.storage.local.set(data);
    sendResponse({});
}

async function getQrSettingsAndDarkMode(sendResponse: (response: GetQrSettingsAndDarkModeResponse) => void) {
    const data = (await browser.storage.local.get()) as SavedData;
    await browser.storage.local.set(data);
    sendResponse({ isDark: data.isDark, colorDark: data.colorDark, colorLight: data.colorLight, correctLevel: data.correctLevel });
}

browser.runtime.onMessage.addListener((message: BasicMessage, sender: browser.runtime.MessageSender, sendResponse: (response?: any) => void) => {
    switch (message.type) {
        case MessageTypes.AddUrl:
            addUrl(sendResponse, (message as AddUrlMessage).url);
            break;

        case MessageTypes.GetUrls:
            getUrls(sendResponse);
            break;

        case MessageTypes.RemoveUrl:
            removeUrl(sendResponse, (message as RemoveUrlMessage).url);
            break;

        case MessageTypes.ToggleDarkMode:
            toggleDarkMode(sendResponse);
            break;

        case MessageTypes.SetCorrectLevel:
            setCorrectLevel(sendResponse, (message as SetCorrectLevelMessage).correctLevel);
            break;
        
        case MessageTypes.GetQrSettingsAndDarkMode:
            getQrSettingsAndDarkMode(sendResponse);
            break;
    }

    return true;
});
