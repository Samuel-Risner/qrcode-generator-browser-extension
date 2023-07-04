import { CorrectLevel } from "./correctLevel";
import { MessageTypes } from "./messageTypes";

export interface BasicMessage {
    type: MessageTypes;
}

interface UrlResponse {
    urls: string[];
    urlVersion: number;
}

export interface GetUrlsMessage extends BasicMessage {
    type: MessageTypes.GetUrls;
}

export interface GetUrlsResponse extends UrlResponse {}

export interface AddUrlMessage extends BasicMessage {
    type: MessageTypes.AddUrl;
    url: string;
}

export interface AddUrlResponse extends UrlResponse {}

export interface RemoveUrlMessage extends BasicMessage {
    type: MessageTypes.RemoveUrl;
    url: string;
}

export interface RemoveUrlResponse extends UrlResponse {}

export interface ToggleDarkModeMessage extends BasicMessage {
    type: MessageTypes.ToggleDarkMode;
}

export interface ToggleDarkModeResponse {
    isDark: boolean;
}

export interface GetDarkModeMessage extends BasicMessage {
    type: MessageTypes.GetDarkMode;
}

export interface GetDarkModeResponse {
    isDark: boolean;
}

export interface GetQrSettingsMessage extends BasicMessage {
    type: MessageTypes.GetQrSettings;
}

export interface GetQrSettingsResponse {
    correctLevel: CorrectLevel;
    colorDark: string;
    colorLight: string;
}
