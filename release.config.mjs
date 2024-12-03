/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
  branches: ["main"],
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/github",
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
    "@eclass/semantic-release-netlify",
  ],
};
