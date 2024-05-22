import config from "eslint-config-standard";

export default [
  ...[].concat(config),
  {
    rules: {
      semi: ["error", "always"], // Enforce semicolons at the end of statements
    },
  },
];
