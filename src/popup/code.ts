export type CorrectLevel = 0 | 1 | 2 | 3;

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

    constructor(url: string | undefined, private container: HTMLDivElement, { correctLevel=0, colorDark="#000000", colorLight="#ffffff" }: Args2) {
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
    }

    setStuff({ correctLevel=0, colorDark="#000000", colorLight="#ffffff" }: Args2) {
        this.subContainer.remove();
        this.subContainer = document.createElement("div");
        this.container.appendChild(this.subContainer);

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

        this.subContainer.remove();
        this.subContainer = document.createElement("div");
        this.container.appendChild(this.subContainer);

        // @ts-ignore
        this.qr = new QRCode(this.subContainer, { text: url, correctLevel: correctLevel, colorDark: colorDark, colorLight: colorLight });
    }
    
}
