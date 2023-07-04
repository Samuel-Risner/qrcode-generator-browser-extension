# qrcode-generator-browser-extension

A browser extension that lets you generate QRCodes on the fly.


# Build instructions

System requirements:

- Node v18.13.0
- npm 9.7.1

Install the required npm packages:

```shell
npm install
```

Run the build script to build everything:

```shell
npm run build
```

Or build single parts:

## extension/js/dist/content.js

The TypeScript source files are under ```src/content``` and ```src/shared``` and the config files are under ```config/content```.

Build script:

```shell
npm run build_wp_content
```

## extension/js/dist/popup.js

The TypeScript source files are under ```src/popup``` and ```src/shared``` and the config files are under ```config/popup```.

Build script:

```shell
npm run build_wp_popup
```

## extension/js/dist/background.js

The TypeScript source files are under ```src/background``` and ```src/shared``` and the config files are under ```config/background```.

Build script:

```shell
npm run build_wp_background
```

# License

This Repo is licensed under the MIT license.

This license does not include the file "qrcode.js" which is located in "extension/js/". The file is licensed under the MIT license by davidshimjs which can be found in his [repo](https://github.com/davidshimjs/qrcodejs) under the name "LICENSE" and in this repo under "qrcode.js LICENSE/LICENSE".

GitHub permalinks:

- [davidshimjs LICENSE file](https://github.com/davidshimjs/qrcodejs/blob/04f46c6a0708418cb7b96fc563eacae0fbf77674/LICENSE)
- [davidshimjs qrcode.js file](https://github.com/davidshimjs/qrcodejs/blob/04f46c6a0708418cb7b96fc563eacae0fbf77674/qrcode.js)
