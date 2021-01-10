// const tailwind = require('tailwindcss');
// console.log(tailwind);


module.exports = {
  plugins: [
    require('postcss-import'),
    // require('tailwindcss'),
    require('postcss-preset-env')({ stage: 1 }),
  ]
}
