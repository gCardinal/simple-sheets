/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
  branches: ["main"],
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "semantic-release-replace-plugin",
      {
        replacements: [
          {
            files: ["dist/assets/*.js"],
            from: '"__VERSION__"',
            to: '"${nextRelease.version}"',
          },
        ],
      },
    ],
    [
      "@semantic-release/exec",
      {
        publishCmd: "yarn netlify deploy --prod --dir=dist",
      },
    ],
    "@semantic-release/github",
  ],
};
