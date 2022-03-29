# APTSMAS-FrontEnd

This is the frontend code repository for *Ancient Poets Temporal and Spatial Mobility Analysis System*. You can find all needed code for the frontend.

## About this project

This project used:
* npm version 7.23.0
* node version 14.17.0

This project is inited with `@vue/cli@4.5.13`:
* use the Vue version 3
* use the TypeScript
* use the VueX and Vue Router
* use the Babel, ESLint and Prettier

Other things we used are:
* vue-i18n@next
* Echarts 5
* AMap JS Api v2
* Naive-UI and related vfonts, xicons
* Element-Plus for reactive layout

Detail dependencies can be see in [`package.json`](./package.json) and [`package-lock.json`](./package-lock.json).

The web page icons are from IconFonts: [Link1](https://www.iconfont.cn/collections/detail?spm=a313x.7781069.1998910419.dc64b3430&cid=38411) and [Link2](https://www.iconfont.cn/collections/detail?spm=a313x.7781069.1998910419.dc64b3430&cid=37945).

## Dev Utils

The recommend dev tool is the Visual Studio Code, and the following extensions are also needed:
* Code Spell Checker
* EditorConfig for VS Code
* ESLint
* GitLens -- Git supercharged
* npm
* Prettier - Code formatter
* Volar
* vscode-icons (or other icons extensions which help your project struct clearly)

## Vue Cli Related Command
### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

#### About deploy

* The history mode of Vue Router is used, so configure the Nginx properly, you can refer to the [docs](https://next.router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations) here.
* The `/api` route is for the backend api, so redirect it with Nignx configure.

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## LICENSE

***All the APTSMAS relevant software copyright has been obtained (Chinese Software Copyright 2022SR0393788).***

The ***Ancient Poets Temporal and Spatial Mobility Analysis System*** (*APTSMAS*) related things follow the **[GPL-3.0](../LICENSE) license**.

