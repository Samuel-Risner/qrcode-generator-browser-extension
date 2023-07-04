import { CorrectLevel } from "../shared/correctLevel";
import settings from "../shared/settings";

interface OptionArgs {
    correctLevel?: CorrectLevel;
    colorDark?: string;
    colorLight?: string;
}

interface OptionArgsWithUrl extends OptionArgs {
    url?: string;
}

export default class Code {

    private subContainer: HTMLDivElement;
    private qr: any;
    private url: string;

    constructor(url: string | undefined, private container: HTMLDivElement, { correctLevel=settings.default.correctLevel, colorDark=settings.default.colorDark, colorLight=settings.default.colorLight }: OptionArgs) {
        this.subContainer = document.createElement("div");
        this.container.appendChild(this.subContainer);

        if (url === undefined) {
            this.url = "";
            // @ts-ignore
            this.qr = new QRCode(this.subContainer, { text: url, correctLevel: correctLevel, colorDark: colorDark, colorLight: colorLight, useSVG: true });
            this.qr.clear();
        } else {
            // @ts-ignore
            this.qr = new QRCode(this.subContainer, { text: url, correctLevel: correctLevel, colorDark: colorDark, colorLight: colorLight, useSVG: true });
            this.url = url;
        }

        console.log(this.container);
    }

    private resetQrCode() {
        this.qr.clear();
        this.subContainer.remove();
        this.subContainer = document.createElement("div");
        this.container.appendChild(this.subContainer);
    }

    setStuff({ correctLevel=settings.default.correctLevel, colorDark=settings.default.colorDark, colorLight=settings.default.colorLight }: OptionArgs) {
        this.resetQrCode();
        // @ts-ignore
        this.qr = new QRCode(this.subContainer, { text: this.url, correctLevel: correctLevel, colorDark: colorDark, colorLight: colorLight, useSVG: true });
    }

    createCode(url: string) {
        this.url = url;
        // @ts-ignore
        this.qr.clear();
        this.qr.makeCode(url);
    }

    setAndCreate({ url=this.url, correctLevel=settings.default.correctLevel, colorDark=settings.default.colorDark, colorLight=settings.default.colorLight }: OptionArgsWithUrl) {
        this.url = url;
        this.resetQrCode();
        // @ts-ignore
        this.qr = new QRCode(this.subContainer, { text: url, correctLevel: correctLevel, colorDark: colorDark, colorLight: colorLight, useSVG: true });
    }

}
