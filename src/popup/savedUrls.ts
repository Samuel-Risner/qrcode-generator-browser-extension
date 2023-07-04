import { MessageTypes } from "../shared/messageTypes";
import { RemoveUrlMessage, RemoveUrlResponse } from "../shared/types";

export default class SavedUrls {

    private subParent: HTMLDivElement;
    private version: number;

    constructor(private applyFunction: (url: string) => void, private parent: HTMLElement) {
        this.subParent = document.createElement("div");
        this.parent.appendChild(this.subParent);
        this.version = 0;
    }

    setUrls(urls: string[], version: number) {
        if (version === this.version) return;
        this.version = version;

        this.subParent.remove();
        this.subParent = document.createElement("div");
        this.parent.appendChild(this.subParent);

        this.subParent.className = "grid grid-cols-1 gap-2";

        for (const url of urls) {
            this.addUrl(url);
        }
    }

    private addUrl(url: string) {
        const container = document.createElement("div");
        const deleteButton = document.createElement("button");
        const applyButton = document.createElement("button");
        const urlDisplay = document.createElement("input");

        this.subParent.appendChild(container);
        container.appendChild(deleteButton);
        container.appendChild(urlDisplay);
        container.appendChild(applyButton);

        container.className = "flex flex-row bg-neutral-200 p-2 rounded-full dark:bg-slate-500 text-black dark:text-neutral-200";
        urlDisplay.value = url;
        urlDisplay.disabled = true;
        urlDisplay.className = "w-44 mx-auto bg-transparent text-center";
        deleteButton.className = "text-lg";
        deleteButton.textContent = "🗑";
        deleteButton.title = "Remove URL";
        applyButton.className = "text-lg";
        applyButton.textContent = "🔗";
        applyButton.title = "Use URL";

        deleteButton.onclick = () => {
            const msg: RemoveUrlMessage = { type: MessageTypes.RemoveUrl, url };
            browser.runtime.sendMessage(msg).then((res: RemoveUrlResponse) => {
                this.setUrls(res.urls, res.urlVersion);
            });
        }

        applyButton.onclick = () => {
            this.applyFunction(url);
        }
    }

}
