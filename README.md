# OneMohrTi.me/

[![GitHub issues](https://img.shields.io/github/issues/onemohrtime/onemohrtime-theme)](https://github.com/OneMohrTime/onemohrtime-theme/issues)
[![buddy pipeline](https://app.buddy.works/onemohrtime/onemohrtime/pipelines/pipeline/231049/badge.svg?token=87fbddf4764a79d8087606f27acba051a5f8777676ebcfd6ebb9563158502a61 "buddy pipeline")](https://buddy.works/)
[![W3C Validation](https://img.shields.io/w3c-validation/html?targetUrl=https%3A%2F%2Fonemohrti.me)](https://validator.w3.org/)
[![Twitter](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2Fonemohrtime)](https://twitter.com/intent/tweet?text=Check+out+these+interactions:&url=https%3A%2F%2Fgithub.com%2FOneMohrTime%2Fonemohrtime-theme)

This repo is the codebase for [https://onemohrti.me](https://onemohrti.me), written by [Derek Mohr](https://instagram.com/onemohrtimedesign).

## Build Tools

| Server | - | - | - | Sass | JS Libraries | - | - |
| - | - | - | - | - | - | - | - |
| `Node 12.x` | `NPM 6.x` | `PHP 7.4` | `MySQL 5.7` | `1.27.x` | `gsap@3` | `Isotope v3` | `jQuery 3` |

## Build Commands

This project uses **Laravel Mix** to compile most assets. Unfortunately, `Fancybox 3` doesn't compile as a module, and parallax images (_along with almost all scroll events_) must be completely re-written.

- [x] Convert WP Gulp to Laravel Mix
- [ ] Restore and add to `GSAP` animations
- [ ] Slim down files with more ES6 options

```zsh
# compile expanded assets
npm run dev

# compile compressed assets
npm run prod

# watch and reload components
npm run watch
```
