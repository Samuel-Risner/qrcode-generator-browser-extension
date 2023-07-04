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

    private correctLevel: CorrectLevel;
    private colorDark: string;
    private colorLight: string;
    private useSvg: boolean;

    constructor(url: string | undefined, private container: HTMLDivElement, { correctLevel=settings.default.correctLevel, colorDark=settings.default.colorDark, colorLight=settings.default.colorLight }: OptionArgs) {
        this.subContainer = document.createElement("div");
        this.container.appendChild(this.subContainer);

        this.correctLevel = correctLevel;
        this.colorDark = colorDark;
        this.colorLight = colorLight;
        this.useSvg = settings.default.useSvg;

        if (url === undefined) {
            this.url = "";
            this.createQrCode();
            this.qr.clear();
        } else {
            this.url = url;
            this.createQrCode();
        }
    }

    private resetQrCode() {
        this.qr.clear();
        this.subContainer.remove();
        this.subContainer = document.createElement("div");
        this.container.appendChild(this.subContainer);
    }

    private createQrCode() {
        // @ts-ignore
        this.qr = new QRCode(this.subContainer, { text: this.url, correctLevel: this.correctLevel, colorDark: this.colorDark, colorLight: this.colorLight, useSVG: this.useSvg });
        this.qr.clear();
        this.qr.makeCode(this.url);
    }

    setStuff({ correctLevel=settings.default.correctLevel, colorDark=settings.default.colorDark, colorLight=settings.default.colorLight }: OptionArgs) {
        this.correctLevel = correctLevel;
        this.colorDark = colorDark;
        this.colorLight = colorLight;

        this.resetQrCode();
        this.createQrCode();
    }

    createCode(url: string) {
        this.url = url;
        this.qr.clear();
        this.qr.makeCode(url);
    }

    setAndCreate({ url=this.url, correctLevel=this.correctLevel, colorDark=this.colorDark, colorLight=this.colorLight }: OptionArgsWithUrl) {
        this.correctLevel = correctLevel;
        this.colorDark = colorDark;
        this.colorLight = colorLight;

        this.url = url;
        this.resetQrCode();
        this.createQrCode();
    }

}
