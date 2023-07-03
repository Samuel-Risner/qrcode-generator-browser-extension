(()=>{"use strict";var e;!function(e){e[e.AddUrl=0]="AddUrl",e[e.GetUrls=1]="GetUrls",e[e.RemoveUrl=2]="RemoveUrl",e[e.ToggleDarkMode=3]="ToggleDarkMode",e[e.GetDarkMode=4]="GetDarkMode"}(e||(e={}));class t{applyFunction;parent;subParent;version;constructor(e,t){this.applyFunction=e,this.parent=t,this.subParent=document.createElement("div"),this.parent.appendChild(this.subParent),this.version=0}setUrls(e,t){if(t!==this.version){this.version=t,this.subParent.remove(),this.subParent=document.createElement("div"),this.parent.appendChild(this.subParent),this.subParent.className="grid grid-cols-1 gap-2";for(const t of e)this.addUrl(t)}}addUrl(t){const n=document.createElement("div"),o=document.createElement("button"),a=document.createElement("button"),r=document.createElement("input");this.subParent.appendChild(n),n.appendChild(o),n.appendChild(r),n.appendChild(a),n.className="flex flex-row bg-neutral-200 p-2 rounded-full dark:bg-slate-500 text-black dark:text-neutral-200",r.value=t,r.disabled=!0,r.className="w-44 mx-auto bg-transparent text-center",o.className="text-lg",o.textContent="🗑",o.title="Remove URL",a.className="text-lg",a.textContent="🔗",a.title="Use URL",o.onclick=()=>{const n={type:e.RemoveUrl,url:t};browser.runtime.sendMessage(n).then((e=>{this.setUrls(e.urls,e.urlVersion)}))},a.onclick=()=>{this.applyFunction(t)}}}function n(e){e.className="py-1 px-2 rounded-full bg-neutral-100 dark:bg-slate-500"}function o(e){e.className="py-1 px-2 rounded-full bg-transparent"}function a(e,t){t?(e.app.classList.add("dark"),e.darkModeButton.textContent="🌕",e.darkModeButton.title="Switch to light mode"):(e.app.classList.remove("dark"),e.darkModeButton.textContent="🌑",e.darkModeButton.title="Switch to dark mode")}!async function(){let r=browser.tabs.query({currentWindow:!0,active:!0});const s={app:document.getElementById("app"),appContents:document.createElement("div"),topBar:document.createElement("div"),popupButton:document.createElement("button"),popupImage:document.createElement("img"),savedUrlsButton:document.createElement("button"),darkModeButton:document.createElement("button"),savedUrlsMenu:document.createElement("div"),qrCode:document.createElement("div"),urlOptionsContainer:document.createElement("div"),buttonContainer:document.createElement("div"),thisPageButton:document.createElement("button"),customPageButton:document.createElement("button"),saveUrlButton:document.createElement("button"),input:document.createElement("input"),qrCodeCorrectLevel:document.createElement("input"),qrCodeCorrectLevelDataList:document.createElement("datalist"),licensingText:document.createElement("a")};var l;(l=s).app.appendChild(l.appContents),l.appContents.appendChild(l.topBar),l.topBar.appendChild(l.popupButton),l.popupButton.appendChild(l.popupImage),l.topBar.appendChild(l.savedUrlsButton),l.topBar.appendChild(l.darkModeButton),l.appContents.appendChild(l.savedUrlsMenu),l.appContents.appendChild(l.qrCode),l.appContents.append(l.urlOptionsContainer),l.urlOptionsContainer.appendChild(l.buttonContainer),l.buttonContainer.appendChild(l.thisPageButton),l.buttonContainer.appendChild(l.customPageButton),l.urlOptionsContainer.appendChild(l.saveUrlButton),l.appContents.appendChild(l.input),l.appContents.appendChild(l.qrCodeCorrectLevel),l.appContents.appendChild(l.qrCodeCorrectLevelDataList),l.appContents.appendChild(l.licensingText);let d=(await r)[0].url;!function(e,t){e.appContents.className="bg-gray-100 dark:bg-zinc-800 grid grid-cols-1 gap-2 break-words w-80 text-center p-4",e.topBar.className="flex flex-row h-8",e.popupButton.className="w-7",e.popupImage.className="invert-0 dark:invert active:w-6 m-auto",e.savedUrlsButton.className="grow bg-zinc-300 rounded-full mx-4 dark:bg-slate-600 text-black dark:text-neutral-200",e.darkModeButton.className="text-2xl",e.savedUrlsMenu.hidden=!0,e.qrCode.className="m-auto",e.urlOptionsContainer.className="flex flex-row",e.buttonContainer.className="p-1 rounded-full bg-neutral-300 w-fit dark:bg-slate-600 text-black dark:text-neutral-200",e.saveUrlButton.className="mx-auto text-2xl",e.input.className="text-center rounded-full p-2 bg-neutral-200 dark:bg-slate-600 text-black dark:text-neutral-200  disabled:text-neutral-400 dark:disabled:text-gray-500 dark:disabled:bg-slate-700",e.input.disabled=!0,e.qrCodeCorrectLevelDataList.className="flex flex-row justify-between text-sm ml-2 mr-1 text-black dark:text-neutral-200",e.licensingText.className="text-sky-600 dark:text-sky-700 text-sm underline decoration-dashed",void 0===t?(n(e.customPageButton),o(e.thisPageButton),e.thisPageButton.disabled=!0):(n(e.thisPageButton),o(e.customPageButton))}(s,d),function(e,t){e.popupButton.title="Pop out to a new window",e.popupImage.src="assets/popup.svg",e.savedUrlsButton.textContent="Saved URLs",e.savedUrlsButton.title="Show saved URLs",e.thisPageButton.textContent="This Page",e.customPageButton.textContent="Custom Page",e.saveUrlButton.textContent="📂",e.saveUrlButton.title="Save URL",void 0!==t&&(e.input.value=t),e.qrCodeCorrectLevel.type="range",e.qrCodeCorrectLevel.min=String(0),e.qrCodeCorrectLevel.max=String(3),e.qrCodeCorrectLevel.value="0",e.qrCodeCorrectLevel.setAttribute("list","setQrCodeCorrectLevelDatalistEntriesId"),e.qrCodeCorrectLevelDataList.id="setQrCodeCorrectLevelDatalistEntriesId",function(e){let t=document.createElement("option");t.value="0",t.label="L",e.appendChild(t),t=document.createElement("option"),t.value="1",t.label="M",e.appendChild(t),t=document.createElement("option"),t.value="2",t.label="Q",e.appendChild(t),t=document.createElement("option"),t.value="3",t.label="H",e.appendChild(t)}(e.qrCodeCorrectLevelDataList),e.licensingText.textContent="About license",e.licensingText.href="https://github.com/Samuel-Risner/qrcode-generator-browser-extension#readme",e.licensingText.title="This Repo is licensed under the MIT license. This does not include the file 'qrcode.js' which is located in 'extension/js/'. The file is licensed under the MIT license by davidshimjs. For more information see this extensions GitHub repo: https://github.com/Samuel-Risner/qrcode-generator-browser-extension#readme"}(s,d);const i=function(e,t){if(void 0===t){const t=new QRCode(e.qrCode,{text:"",correctLevel:QRCode.CorrectLevel.H});return t.clear(),t}return new QRCode(e.qrCode,{text:t,correctLevel:QRCode.CorrectLevel.H})}(s,d),u=new t((e=>{!function(e,t,n){t.input.value=e,n.clear(),n.makeCode(e)}(e,s,i)}),s.savedUrlsMenu);!function(t,r,s,l){t.input.oninput=()=>{r.clear(),r.makeCode(t.input.value)},void 0!==s&&(t.thisPageButton.onclick=()=>{n(t.thisPageButton),o(t.customPageButton),t.input.disabled=!0,t.input.value=s,r.clear(),r.makeCode(s)},t.customPageButton.onclick=()=>{n(t.customPageButton),o(t.thisPageButton),t.input.disabled=!1}),t.popupButton.onclick=()=>{browser.windows.create({url:"popup.html",type:"popup",width:window.innerWidth,height:window.innerHeight+1})},t.saveUrlButton.onclick=()=>{const n={type:e.AddUrl,url:t.input.value};browser.runtime.sendMessage(n).then((e=>{l.setUrls(e.urls,e.urlVersion)}))},t.savedUrlsButton.onclick=()=>{const n={type:e.GetUrls};browser.runtime.sendMessage(n).then((e=>{l.setUrls(e.urls,e.urlVersion)})),t.savedUrlsMenu.hidden=!t.savedUrlsMenu.hidden},t.darkModeButton.onclick=async()=>{const n={type:e.ToggleDarkMode};browser.runtime.sendMessage(n).then((e=>{a(t,e.isDark)}))},t.qrCodeCorrectLevel.oninput=()=>{t.qrCodeCorrectLevel.title=String(t.qrCodeCorrectLevel.value)}}(s,i,d,u);const c={type:e.GetDarkMode};browser.runtime.sendMessage(c).then((e=>{a(s,e.isDark)})),s.app.hidden=!1}()})();