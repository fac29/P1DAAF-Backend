<<<<<<< HEAD
import config from "eslint-config-standard";

export default [
  ...[].concat(config),
  {
    rules: {
      semi: ["error", "always"], // Enforce semicolons at the end of statements
    },
  },
];
=======
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";


export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
];
>>>>>>> origin/main
