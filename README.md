# OneMohrTi.me/

[![W3C Validation](https://img.shields.io/w3c-validation/html?targetUrl=https%3A%2F%2Fonemohrti.me)](https://validator.w3.org/)
[![buddy pipeline](https://app.buddy.works/onemohrtime/onemohrtime/pipelines/pipeline/231049/badge.svg?token=87fbddf4764a79d8087606f27acba051a5f8777676ebcfd6ebb9563158502a61 "buddy pipeline")](https://buddy.works/)
[![GitHub issues](https://img.shields.io/github/issues/onemohrtime/onemohrtime-theme)](https://github.com/OneMohrTime/onemohrtime-theme/issues)
![Reddit User Karma](https://img.shields.io/reddit/user-karma/combined/onemohrtime?label=karma)
[![Twitter](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2Fonemohrtime)](https://twitter.com/intent/tweet?text=Check+out+these+interactions:&url=https%3A%2F%2Fgithub.com%2FOneMohrTime%2Fonemohrtime-theme)

This repo is the codebase for [https://onemohrti.me](https://onemohrti.me), written by [Derek Mohr](https://instagram.com/onemohrtimedesign).

## Build Tools

<table>
	<thead>
		<tr>
			<th colspan="4">Server</th>
			<th>Sass</th>
			<th colspan="3">JS Libs</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>`Node 12.x`</td>
			<td>`NPM 6.x`</td>
			<td>`PHP 7.4`</td>
			<td>`MySQL 5.7`</td>
			<td>`1.27.x`</td>
			<td>`gsap@3`</td>
			<td>`Isotope v3`</td>
			<td>`jQuery 3`</td>
		</tr>
	</tbody>
</table>

## Build Commands

This project uses **Laravel Mix** to compile most assets. Unfortunately, `Fancybox 3` doesn't compile as a module, among other issues in the [backlog](./issues),

```zsh
# compile expanded assets
npm run dev

# compile compressed assets
npm run prod

# watch and reload components
npm run watch
```

### Ubuntu upgrades

Shortcut to the common upgrade commands

```apache2
sudo apt-get update
sudo apt-get upgrade
sudo apt-get dist-upgrade
sudo systemctl reboot
```
