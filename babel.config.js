// Don't forget to specify your TAMAGUI_TARGET here or ideally in the command to run / .env files

process.env.TAMAGUI_TARGET = "native";
module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],

    plugins: [
      // NOTE: this is required to pass the right environment
      // NOTE: this is only necessary if you are using reanimated for animations
      [
        "module:react-native-dotenv",
        {
          envName: "APP_ENV",
          moduleName: "@env",
          path: ".env",
          blocklist: null,
          allowlist: null,
          safe: false,
          allowUndefined: true,
          verbose: false,
        },
      ],
      "react-native-reanimated/plugin",
      "nativewind/babel",
      "expo-router/babel",
    ],
  };
};
