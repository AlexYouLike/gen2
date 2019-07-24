<p align="center">
  <a href="admin.adyoulike.com">
    <img src="/git_imgs/soc-story-logo.gif?raw=true" width="350"/>
  </a>
</p>

# Catalog de Stories


> A single page HTML site displaying social widget demos

[![npm badge](https://img.shields.io/static/v1.svg?label=npm&message=6.9.2&style=flat-square&color=#83cd29)](https://github.com/npm/cli) [![node.js badge](https://img.shields.io/static/v1.svg?label=nodejs&message=v10.16.0&style=flat-square&color=#CD040B)](https://nodejs.org/en/)


---

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Team](#team)
- [FAQ](#faq)

---

## Installation
- All the `code` required to get started
```shell
$ git clone git@github.com:Adyoulike/gen2.git
$ cd gen2
$ npm install
```

<p align="center"><img src="/git_imgs/git-npm-install.gif?raw=true"/></p>

### Clone

- Clone this repo to your local machine using `https://github.com/AdYouLike/gen2`

---

## Features
- What are the `features` in your repo ?
- Edit this section ! ! !

### Front End Section
- All `html` and `scss` files can be found in the `src` directory

> Path to html files
```shell
$ cd src/view
```
> Path to scss files
```shell
$ cd src/styles
```

- The main  `scss` file is `appStyles.scss`

You can either create new scss files in the styles directory, and then import them to the `appStyles` file via
```scss
@import 'path of your scss file'
```
or you can just code directly in the `appStyles.scss` file.

---

## Team

| <a href="https://github.com/AlexYouLike" target="_blank">**Alexandra Castillo**</a> | <a href="http://github.com/david-ayl" target="_blank">**David Tessier**</a> | <a href="http://github.com/Fred-ayl" target="_blank">**Fred Pires**</a> | <a href="http://github.com/JC-Adyoulike" target="_blank">**Julien Cadeau**</a> |
| :---: |:---:| :---:| :---:|
| [![Alexandra Castillo](https://avatars1.githubusercontent.com/u/38208246?v=4&s=200)](http://github.com/AlexYouLike)    | [![David Tessier](https://avatars1.githubusercontent.com/u/11030033?s=200&v=4)](http://github.com/david-ayl) | [![Fred Pires](https://avatars2.githubusercontent.com/u/25509785?s=200&v=4)](http://github.com/Fred-ayl)  | [![Julien Cadeau](https://avatars2.githubusercontent.com/u/25458695?s=200&v=4)](http://github.com/JC-Adyoulike)  |
| <a href="http://github.com/AlexYouLike" target="_blank">`github.com/AlexYouLike`</a> | <a href="http://github.com/david-ayl" target="_blank">`github.com/david-ayl`</a> | <a href="http://github.com/Fred-Ayl" target="_blank">`github.com/Fred-Ayl`</a> | <a href="http://github.com/JC-Adyoulike" target="_blank">`github.com/JC-Adyoulike`</a> |

---

## FAQ

- **I have a question. Who should I ask ?**
    - Send an email to either manager -- David Tessier or Julien Cadeau

- **Is it normal to have both a proxy and a port for the BrowserSyncPlugin in webpack.config.js ?**
    - Yes. In order to use awesome features of both [Webpack Dev Server](https://github.com/webpack/webpack-dev-server) and [BrowserSync](https://www.npmjs.com/package/browser-sync-webpack-plugin), we exploit BrowserSync's [proxy option](http://www.browsersync.io/docs/options/#option-proxy). We basically proxy the output from the Webpack Dev Server through BrowserSync to get the best out of both.


## LOGO
https://drive.google.com/drive/folders/1x9LbjsKUtIqPofOuxTTtYkXxU8qHei3U
