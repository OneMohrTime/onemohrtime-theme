/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

const mix = require('laravel-mix');
// const dotenv = require('dotenv');

mix.setPublicPath('assets') // generate manifest in this directory

  // JavaScript ES6
  .js('assets/scripts/app.js', 'assets/scripts/main.js')
  // .extract([
  //   'jquery',
  // ])

  // SCSS to CSS
  .sass('assets/styles/app.scss', 'assets/styles/main.css')
  // .sourceMaps();

  // Process images + media
  .copyDirectory('assets/media/src', 'assets/images')

  // Live reload browser
  .browserSync({
    watch: true,
    // proxy: process.env.SITE_URL,
    proxy: 'https://onemohrti.local',
    // files: [
    //   '{*,**/*}.css',
    //   '{*,**/*}.js',
    //   '{*,**/*}.twig'
    // ],
    files: [
      'assets/scripts/*.js',
      'assets/scripts/**/*.js',
      'assets/styles/*.css',
      'assets/styles/*.scss',
      'assets/styles/**/*.scss',
      'templates/*.twig',
      'templates/**/*.twig'
    ]
  })

  // Additional config
  // .minify() // create sibling *.min file
  // .disableSuccessNotifications()
  // .version()
  .options({
    // autoprefixer: {
    //   options: {
    //     grid: "autoplace"
    //   }
    // },
    // postCss: [
    //   require('autoprefixer')
    // ],
    processCssUrls: false,
  })
;

// Full API
// mix.js(src, output);
// mix.react(src, output); <-- Identical to mix.js(), but registers React Babel compilation.
// mix.preact(src, output); <-- Identical to mix.js(), but registers Preact compilation.
// mix.coffee(src, output); <-- Identical to mix.js(), but registers CoffeeScript compilation.
// mix.ts(src, output); <-- TypeScript support. Requires tsconfig.json to exist in the same folder as webpack.mix.js
// mix.extract(vendorLibs);
// mix.sass(src, output);
// mix.less(src, output);
// mix.stylus(src, output);
// mix.postCss(src, output, [require('postcss-some-plugin')()]);
// mix.browserSync('my-site.test');
// mix.combine(files, destination);
// mix.babel(files, destination); <-- Identical to mix.combine(), but also includes Babel compilation.
// mix.copy(from, to);
// mix.copyDirectory(fromDir, toDir);
// mix.minify(file);
// mix.sourceMaps(); // Enable sourcemaps
// mix.version(); // Enable versioning.
// mix.disableNotifications();
// mix.setPublicPath('path/to/public');
// mix.setResourceRoot('prefix/for/resource/locators');
// mix.autoload({}); <-- Will be passed to Webpack's ProvidePlugin.
// mix.webpackConfig({}); <-- Override webpack.config.js, without editing the file directly.
// mix.babelConfig({}); <-- Merge extra Babel configuration (plugins, etc.) with Mix's default.
// mix.then(function () {}) <-- Will be triggered each time Webpack finishes building.
// mix.dump(); <-- Dump the generated webpack config object t the console.
// mix.extend(name, handler) <-- Extend Mix's API with your own components.
// mix.options({
//   extractVueStyles: false, // Extract .vue component styling to file, rather than inline.
//   globalVueStyles: file, // Variables file to be imported in every component.
//   processCssUrls: true, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
//   purifyCss: false, // Remove unused CSS selectors.
//   terser: {}, // Terser-specific options. https://github.com/webpack-contrib/terser-webpack-plugin#options
//   postCss: [] // Post-CSS options: https://github.com/postcss/postcss/blob/master/docs/plugins.md
// });
