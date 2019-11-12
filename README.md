<p align="center">
  <a href="admin.adyoulike.com">
    <img src="/git_imgs/soc-story-logo.gif?raw=true" width="350"/>
  </a>
</p>

# Catalog de Stories


> A single page HTML site displaying social widget demos

[![npm badge](https://img.shields.io/static/v1.svg?label=npm&message=6.9.2&style=flat-square&color=#83cd29)](https://github.com/npm/cli) [![node.js badge](https://img.shields.io/static/v1.svg?label=nodejs&message=v10.16.0&style=flat-square&color=#CD040B)](https://nodejs.org/en/)

---

## Installation
- All the `code` required to get started
```shell
$ git clone git@github.com:Adyoulike/gen2.git
$ cd gen2
$ npm install
```

### Clone

- Clone this repo to your local machine using `https://github.com/AdYouLike/gen2`

---

### Front End Section
- All `html` and `scss` files can be found in the `src` directory

> Path to html files
```shell
$ cd src/copy/
```
> Path to scss files
```shell
$ cd src/sass/
```

---

## Deploy

> Build the project
```shell
$ npm run build
```
> browse to the directory
```shell
$ cd dist
```
> Deploy
```shell
rsync -av . support@www.nativestories.io:/var/www/www.nativestories.io/
```
