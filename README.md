# OneMohrTi.me/

[![buddy pipeline](https://app.buddy.works/onemohrtime/onemohrtime/pipelines/pipeline/231049/badge.svg?token=76d8ae679388747988b5bea1c7d43012e43e19944a3e68ad7940c13fa949116d "buddy pipeline")](https://app.buddy.works/onemohrtime/onemohrtime/pipelines/pipeline/231049)

This repo is the codebase for [https://onemohrti.me](https://onemohrti.me), written by [Derek Mohr](https://twitter.com/onemohrtime).

## Requirements

>- Node 12.x
>- PHP 7.3
>- MySQL 5.7

## Build Commands

### Dev Environment

>- _Live reload browser with BrowserSync_
>- _Hotloading styles with CSS Injection_

### Styles

>- _Sass to CSS conversion_
>- _Merging media queries_
>- _Error handling_
>- _Auto-prefixing_
>- _Minification_
>- _Sourcemaps_

### Javascripts

>- _Concatenation_
>- _Minification/uglification_
>- _Separate vendor and custom JS files handling_

### Images

>- _Minification/optimization of images_
>- _File types: `.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`_

### Translation

>- _Generates `.pot` translation file for i18n and l10n_

### Watching

>- _For changes in files to recompile_
>- _File types: `.css`, `.html`, `.php`, `.js`_

## More Scripts/Tasks

To optimize images and generate WP POT translation file, or generate a RTL stylesheet you can run the following commands

```sh
# To optimize images.
gulp images

# To generate WP POT translation file.
gulp translate

# To generate RTL stylesheets and Sourcemap.
gulp stylesRTL
```
