// eslint-disable-next-line no-undef
module.exports = {
  presets: [
    [
      "@babel/env",
      {
        modules: false,
        targets: "defaults",
        useBuiltIns: "usage",
        corejs: "3.15",
      },
    ],
    ["@babel/preset-typescript"],
  ],
};
