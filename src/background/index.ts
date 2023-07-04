import { CorrectLevel } from "../shared/correctLevel";
import { MessageTypes } from "../shared/messageTypes";
import { removeElementFromArray } from "../shared/misc";
import settings from "../shared/settings";
import { AddUrlMessage, AddUrlResponse, BasicMessage, GetQrSettingsAndDarkModeResponse, GetUrlsResponse, RemoveUrlMessage, RemoveUrlResponse, SetCorrectLevelMessage, SetCorrectLevelResponse, SetDarkAndLightColorMessage, SetDarkAndLightColorResponse, SetDarkColorMessage, SetDarkColorResponse, SetLightColorMessage, SetLightColorResponse, ToggleDarkModeResponse } from "../shared/types";

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
        isDark: settings.default.isDark,
        correctLevel: settings.default.correctLevel,
        colorDark: settings.default.colorDark,
        colorLight: settings.default.colorLight
    };
    browser.storage.local.set(data);
});

async function addUrl(sendResponse: (response: AddUrlResponse) => void, message: AddUrlMessage) {
    const data = (await browser.storage.local.get()) as SavedData;
    data.urls.push(message.url);
    data.urlVersion += 1;
    await browser.storage.local.set(data);
    sendResponse({ urls: data.urls, urlVersion: data.urlVersion });
}

async function getUrls(sendResponse: (response: GetUrlsResponse) => void) {
    const data = (await browser.storage.local.get()) as SavedData;
    sendResponse({ urls: data.urls, urlVersion: data.urlVersion });
}

async function removeUrl(sendResponse: (response: RemoveUrlResponse) => void, message: RemoveUrlMessage) {
    const data = (await browser.storage.local.get()) as SavedData;
    removeElementFromArray(data.urls, message.url);
    data.urlVersion += 1;
    await browser.storage.local.set(data);
    sendResponse({ urls: data.urls, urlVersion: data.urlVersion });
}

async function toggleDarkMode(sendResponse: (response: ToggleDarkModeResponse) => void) {
    const data = (await browser.storage.local.get()) as SavedData;
    data.isDark = !data.isDark;
    await browser.storage.local.set(data);
    sendResponse( { isDark: data.isDark });
}

async function setCorrectLevel(sendResponse: (response: SetCorrectLevelResponse) => void, message: SetCorrectLevelMessage) {
    const data = (await browser.storage.local.get()) as SavedData;
    data.correctLevel = message.correctLevel;
    await browser.storage.local.set(data);
    sendResponse({});
}

async function getQrSettingsAndDarkMode(sendResponse: (response: GetQrSettingsAndDarkModeResponse) => void) {
    const data = (await browser.storage.local.get()) as SavedData;
    sendResponse({ isDark: data.isDark, colorDark: data.colorDark, colorLight: data.colorLight, correctLevel: data.correctLevel });
}

async function setDarkColor(sendResponse: (response: SetDarkColorResponse) => void, message: SetDarkColorMessage) {
    const data = (await browser.storage.local.get()) as SavedData;
    data.colorDark = message.color;
    await browser.storage.local.set(data);
    sendResponse({});
}

async function setLightColor(sendResponse: (response: SetLightColorResponse) => void, message: SetLightColorMessage) {
    const data = (await browser.storage.local.get()) as SavedData;
    data.colorLight = message.color;
    await browser.storage.local.set(data);
    sendResponse({});
}

async function setDarkAndLightColor(sendResponse: (response: SetDarkAndLightColorResponse) => void, message: SetDarkAndLightColorMessage) {
    const data = (await browser.storage.local.get()) as SavedData;
    data.colorDark = message.colorDark;
    data.colorLight = message.colorLight;
    await browser.storage.local.set(data);
    sendResponse({});
}

browser.runtime.onMessage.addListener((message: BasicMessage, sender: browser.runtime.MessageSender, sendResponse: (response?: any) => void) => {
    switch (message.type) {
        case MessageTypes.AddUrl:
            addUrl(sendResponse, message as AddUrlMessage);
            break;

        case MessageTypes.GetUrls:
            getUrls(sendResponse);
            break;

        case MessageTypes.RemoveUrl:
            removeUrl(sendResponse, message as RemoveUrlMessage);
            break;

        case MessageTypes.ToggleDarkMode:
            toggleDarkMode(sendResponse);
            break;

        case MessageTypes.SetCorrectLevel:
            setCorrectLevel(sendResponse, message as SetCorrectLevelMessage);
            break;
        
        case MessageTypes.GetQrSettingsAndDarkMode:
            getQrSettingsAndDarkMode(sendResponse);
            break;
        
        case MessageTypes.SetDarkColor:
            setDarkColor(sendResponse, message as SetDarkColorMessage);
            break;

        case MessageTypes.SetLightColor:
            setLightColor(sendResponse, message as SetLightColorMessage);
            break;
        
        case MessageTypes.SetDarkAndLightColor:
            setDarkAndLightColor(sendResponse, message as SetDarkAndLightColorMessage);
            break;
    }

    return true;
});
