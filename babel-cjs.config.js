// eslint-disable-next-line no-undef
module.exports = {
  presets: [
    [
      "@babel/env",
      {
        modules: "cjs",
        targets: "defaults",
        useBuiltIns: "usage",
        corejs: "3.15",
      },
    ],
    ["@babel/preset-typescript"],
  ],
};
