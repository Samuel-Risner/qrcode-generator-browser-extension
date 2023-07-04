import settings from "../shared/settings";
import { CorrectLevel } from "../shared/correctLevel";

type Args2 = {
    correctLevel?: CorrectLevel;
    colorDark?: string;
    colorLight?: string;
}

type Args =  {
    url: string;
    correctLevel?: CorrectLevel;
    colorDark?: string;
    colorLight?: string;
}

export default class Code {

    private subContainer: HTMLDivElement;
    private qr: any;

    private url: string;

    constructor(url: string | undefined, private container: HTMLDivElement, { correctLevel=settings.default.correctLevel, colorDark=settings.default.colorDark, colorLight=settings.default.colorLight }: Args2) {
        this.subContainer = document.createElement("div");
        this.container.appendChild(this.subContainer);

        if (url === undefined) {
            this.url = "";
            // @ts-ignore
            this.qr = new QRCode(this.subContainer, { text: url, correctLevel: correctLevel, colorDark: colorDark, colorLight: colorLight });
            this.qr.clear();
        } else {
            // @ts-ignore
            this.qr = new QRCode(this.subContainer, { text: url, correctLevel: correctLevel, colorDark: colorDark, colorLight: colorLight });
            this.url = url;
        }

        console.log(this.qr.correctLevel);
    }

    private resetQrCode() {
        this.qr.clear();
        this.subContainer.remove();
        this.subContainer = document.createElement("div");
        this.container.appendChild(this.subContainer);
    }

    setStuff({ correctLevel=settings.default.correctLevel, colorDark=settings.default.colorDark, colorLight=settings.default.colorLight }: Args2) {
        this.resetQrCode();

        // @ts-ignore
        this.qr = new QRCode(this.subContainer, { text: this.url, correctLevel: correctLevel, colorDark: colorDark, colorLight: colorLight });
    }

    createCode(url: string) {
        this.url = url;
        // @ts-ignore
        this.qr.clear();
        this.qr.makeCode(url);
    }

    setAndCreate({ url, correctLevel=0, colorDark="#000000", colorLight="#ffffff" }: Args) {
        this.url = url;

        this.resetQrCode();

        // @ts-ignore
        this.qr = new QRCode(this.subContainer, { text: url, correctLevel: correctLevel, colorDark: colorDark, colorLight: colorLight });
    }

    // getCorrectLevel(): CorrectLevel {
    //     return this.co
    // }
    
}
