module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    env: {
      development: {
        plugins: ["@babel/transform-react-jsx-source"],
      },
    },
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@state": "./src/state",
            "@interfaces": "./src/interfaces",
          },
        },
      ],
    ],
  };
};