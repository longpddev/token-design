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
          destination: 'vars.css',
          format: 'css/variables',
          filter: 'isAliasCollection'
        },
      ],
    },
  },
});
// sd.cleanAllPlatforms();
sd.buildAllPlatforms();
