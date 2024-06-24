const config = {
  extends: ['stylelint-config-standard'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen'],
      },
    ],
    'no-descending-specificity': null,
    'color-no-hex': true,
    'color-named': 'never',
    'color-function-notation': ['modern', { ignore: ['with-var-inside'] }],

    /**
     * Gist: https://gist.github.com/a-tokyo/ad6fd401f67ef669924b540b5c00f5d6
     *
     * selector class pattern must match [BEM CSS](https://en.bem.info/methodology/css) - [Regex](https://regexr.com/3apms)
     * */
    'selector-class-pattern': [
      '^[a-z]([-]?[a-z0-9]+)*(__[a-z0-9]([-]?[a-z0-9]+)*)?(--[a-z0-9]([-]?[a-z0-9]+)*)?$',
      {
        /** This option will resolve nested selectors with & interpolation. - https://stylelint.io/user-guide/rules/selector-class-pattern/#resolvenestedselectors-true--false-default-false */
        resolveNestedSelectors: true,
        /** Custom message */
        message: function expected(selectorValue) {
          return `Expected class selector "${selectorValue}" to match BEM CSS pattern https://en.bem.info/methodology/css. Selector validation tool: https://regexr.com/3apms`
        },
      },
    ],
  },
}

export default config
