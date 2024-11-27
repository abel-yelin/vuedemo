export default {
  extends: ['stylelint-config-recommended-scss', 'stylelint-config-recommended-vue', 'stylelint-config-recess-order'],
  rules: {
    'at-rule-no-unknown': null,
    'function-no-unknown': null,
    'media-query-no-invalid': null,
    'no-descending-specificity': null,
    'property-no-unknown': null,
    'scss/no-global-function-names': null,
    'selector-class-pattern': null,
    'selector-pseudo-class-no-unknown': null,
  },
  ignoreFiles: ['dist/**/*', 'index.html'],
}
