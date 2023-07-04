import { CorrectLevel } from "./correctLevel";

const settings =  {
    default: {
        correctLevel: CorrectLevel.L,
        colorDark: "#000000",
        colorLight: "#ffffff",
        useSvg: true, // Changing this here is not supported
        isDark: false // Changing this here is not supported
    },
    popupHtml: "/html/popup.html"
}

export default settings;
