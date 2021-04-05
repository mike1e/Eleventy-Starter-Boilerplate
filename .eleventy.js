const htmlmin = require('html-minifier');
const dateFns = require('date-fns');
const lazyImagesPlugin = require('eleventy-plugin-lazyimages');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const slugify = require('slugify');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPassthroughCopy('src/assets/js');

  eleventyConfig.addPlugin(lazyImagesPlugin, {
    transformImgPath: (imgPath) => {
      if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
        // Handle remote file
        return imgPath;
      } else {
        return `./src/${imgPath}`;
      }
    },
  });

  eleventyConfig.setEjsOptions({
    rmWhitespace: true,
    context: {
      dateFns,
    },
  });

  eleventyConfig.setBrowserSyncConfig({
    files: ['./_site/assets/styles/main.css', './_site/assets/js/main.js'],
  });

  eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
    if (outputPath.endsWith('.html')) {
      const minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
      });
      return minified;
    }

    return content;
  });

  eleventyConfig.addFilter('slug', (input) => {
    const options = {
      replacement: '-',
      remove: /[&,+()$~%.'":*?<>{}]/g,
      lower: true,
    };
    return slugify(input, options);
  });

  eleventyConfig.addFilter('debugger', (...args) => {
    console.log(...args);
    debugger;
  });

  return {
    dir: { input: 'src', output: '_site', data: '_data' },
  };
};
