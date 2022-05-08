module.exports = {
  style: {
    postcssOptions: {
      plugins: [
        require("tailwindcss"),
        require("autoprefixer"),
        require("postcss-100vh-fix"),
      ],
    },
  },
};
