// module.exports = {
//   extends: ["react-app", "plugin:prettier/recommended"],
//   plugins: ["prettier"],
//   rules: {
//     "linebreak-style": "off",
//     "prettier/prettier": [
//       "error",
//       {
//         endOfLine: "auto",
//       },
//     ],
//   },
// };

module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["react", "prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "linebreak-style": "off",
  },
};
