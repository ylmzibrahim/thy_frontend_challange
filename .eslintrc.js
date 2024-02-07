module.exports = {
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  rules: {
    "react-hooks/exhaustive-deps": "warn",
    "react/react-in-jsx-scope": "off",
    "prettier/prettier": "warn",
    "no-unused-vars": "warn",
    "no-console": ["warn", { allow: ["info", "warn", "error"] }],
  },
};
