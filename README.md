# OneMohrTi.me/

[![buddy pipeline](https://app.buddy.works/onemohrtime/onemohrtime/pipelines/pipeline/231049/badge.svg?token=87fbddf4764a79d8087606f27acba051a5f8777676ebcfd6ebb9563158502a61 "buddy pipeline")](https://app.buddy.works/onemohrtime/onemohrtime/pipelines/pipeline/231049)

This repo is the codebase for [https://onemohrti.me](https://onemohrti.me), written by [Derek Mohr](https://instagram.com/onemohrtimedesign).

## Requirements

>- Node 12.x
>- Gulp 3.x
>- PHP 7.2
>- MySQL 5.7

## Build Commands

### Dev Environment

>- Live reload browser with BrowserSync
>- Hotloading styles with CSS Injection
>- For changes in files to recompile
>- File types: `.css`, `.html`, `.php`, `.js`

```sh
npm start
# or
gulp watch
```

### Styles

>- Sass to CSS conversion
>- Merging media queries
>- Error handling
>- Auto-prefixing
>- Minification
>- Sourcemaps

```sh
# To minify css.
gulp styles
```

### Javascripts

>- Concatenation
>- Minification/uglification
>- Separate vendor and custom JS files handling

```sh
# To minify javascript.
gulp uglify
```

### Images

>- Minification/optimization of images
>- File types: `.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`

```sh
# To optimize images.
gulp images
```

### Translation

>- Generates `.pot` translation file for i18n and l10n

```sh
# To generate WP POT translation file.
gulp translate
```
