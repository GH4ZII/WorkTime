module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            // VIKTIG: Denne pluginen må legges til for reanimated
            "react-native-reanimated/plugin",
        ],
    };
};
