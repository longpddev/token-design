import { registerTransforms } from "@tokens-studio/sd-transforms";
import StyleDictionary from "style-dictionary";
import camelCase from 'lodash/camelCase.js'
registerTransforms(StyleDictionary);
const { fileHeader, formattedVariables } = StyleDictionary.formatHelpers;
const kebabTransform = StyleDictionary.transform["name/camel"];

const transforms = [
  'ts/descriptionToComment',
  'ts/size/px',
  'ts/opacity',
  'ts/size/lineheight',
  'ts/typography/fontWeight',
  'ts/resolveMath',
  'ts/size/css/letterspacing',
  'ts/typography/css/fontFamily',
  'ts/typography/css/shorthand',
  'ts/border/css/shorthand',
  'ts/shadow/css/shorthand',
  'ts/color/css/hexrgba',
  'ts/color/modifiers',
];

StyleDictionary.registerFilter({
  name: 'isGlobalCollection', 
  matcher: function (tokens) {
    const parentPath = tokens.parent;
    return parentPath.toLowerCase().startsWith('global')
  }
})

StyleDictionary.registerFilter({
	name: "isAliasCollection",
	matcher: token =>
	{
		const parentPath = token.parent;
		return parentPath && !parentPath.toLowerCase().startsWith('global')
	},
})

const variableNameMatcher = [{
  exp: /^(corner)/i,
  to: 'border'
}]

StyleDictionary.registerTransform({
  name: 'fluent/name',
  type: 'name',
  matcher: kebabTransform.matcher,
  transformer: function (token, options) {
    let [collection] = (token.parent ?? "").split('/');
    const path = Array.from(token.path)
    const lastPath = path[path.length - 1];
    if(lastPath.toLowerCase() === 'rest') path.pop();
    variableNameMatcher.forEach(({exp, to}) => {
      if(exp.test(collection)) {
        collection = collection.replace(exp, to)
      }
    })
    
    const result = camelCase([options.prefix].concat([collection], path).join(' '));

    return result;
  }
})

StyleDictionary.registerTransformGroup({
  name: 'fluent/ui',
  // add a default name transform, since this is almost always needed
  // it's easy to override by users, adding their own "transforms"
  transforms: [...transforms, 'fluent/name'],
});