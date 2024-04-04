import StyleDictionary from "style-dictionary";

import "./setup.mjs"

const sd = new StyleDictionary({
  source: ["tokens/**/*.json"],
  platforms: {
    css: {
      transformGroup: "fluent/ui",
      buildPath: "build/",
      files: [
        {
          destination: 'tokens.js',
          format: 'fluent/ts/format',
          filter: 'isAliasCollection'
        },
      ],
    },
  },
});
// sd.cleanAllPlatforms();
sd.buildAllPlatforms();
