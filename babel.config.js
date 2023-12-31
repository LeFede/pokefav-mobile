module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: [
          '.ios.js',
          '.android.js',
          '.ios.jsx',
          '.android.jsx',
          '.js',
          '.jsx',
          '.json',
          '.ts',
          '.tsx',
        ],
        root: ['.'],
        alias: {
          '@': './src',
          // '@api': './src/api',
          // '@assets': './src/assets',
          // '@components': './src/components',
          // '@scenes': './src/scenes',
          // '@theme': './src/theme',
          // '@utils': './src/utils',
        },
      },
    ],
  ],
};
