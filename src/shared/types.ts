import { CorrectLevel } from "./correctLevel";
import { MessageTypes } from "./messageTypes";

export interface BasicMessage {
    type: MessageTypes;
}

interface UrlResponse {
    urls: string[];
    urlVersion: number;
}

// ----- get urls ----- //

export interface GetUrlsMessage extends BasicMessage {
    type: MessageTypes.GetUrls;
}

export interface GetUrlsResponse extends UrlResponse {}

// ----- add url ----- //

export interface AddUrlMessage extends BasicMessage {
    type: MessageTypes.AddUrl;
    url: string;
}

export interface AddUrlResponse extends UrlResponse {}

// ----- remove url ----- //

export interface RemoveUrlMessage extends BasicMessage {
    type: MessageTypes.RemoveUrl;
    url: string;
}

export interface RemoveUrlResponse extends UrlResponse {}

// ----- toggle dark mode ----- //

export interface ToggleDarkModeMessage extends BasicMessage {
    type: MessageTypes.ToggleDarkMode;
}

export interface ToggleDarkModeResponse {
    isDark: boolean;
}

// ----- set correct level ----- //

export interface SetCorrectLevelMessage extends BasicMessage {
    type: MessageTypes.SetCorrectLevel;
    correctLevel: CorrectLevel;
}

export interface SetCorrectLevelResponse {}

// ----- get qr-code settings ----- //

export interface GetQrSettingsAndDarkModeMessage extends BasicMessage {
    type: MessageTypes.GetQrSettingsAndDarkMode;
}

export interface GetQrSettingsAndDarkModeResponse {
    isDark: boolean;
    correctLevel: CorrectLevel;
    colorDark: string;
    colorLight: string;
}

// ----- set dark color ----- //

export interface SetDarkColorMessage extends BasicMessage {
    type: MessageTypes.SetDarkColor;
    color: string;
}

export interface SetDarkColorResponse {}

// -----  set light color----- //

export interface SetLightColorMessage extends BasicMessage {
    type: MessageTypes.SetLightColor;
    color: string;
}

export interface SetLightColorResponse {}

// ----- set dark and light color ----- //

export interface SetDarkAndLightColorMessage extends BasicMessage {
    type: MessageTypes.SetDarkAndLightColor;
    colorDark: string;
    colorLight: string;
}

export interface SetDarkAndLightColorResponse {}
