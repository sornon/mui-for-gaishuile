'use strict';

var Color = require('./colors');
var Spacing = require('./spacing');
var ColorManipulator = require('../utils/color-manipulator');
var Extend = require('../utils/extend');

var Types = {
  LIGHT: require('./themes/light-theme'),
  DARK: require('./themes/dark-theme'),
  PRETTY: require('./themes/pretty-theme')
};

var ThemeManager = function ThemeManager() {
  return {
    types: Types,
    template: Types.LIGHT,

    spacing: Spacing,
    contentFontFamily: Types.PRETTY.contentFontFamily,

    palette: Types.LIGHT.getPalette(),
    component: Types.LIGHT.getComponentThemes(Types.LIGHT.getPalette()),

    getCurrentTheme: function getCurrentTheme() {
      return this;
    },

    // Component gets updated to reflect palette changes.
    setTheme: function setTheme(newTheme) {
      this.setPalette(newTheme.getPalette());
      this.setComponentThemes(newTheme.getComponentThemes(newTheme.getPalette()));
    },

    setPalette: function setPalette(newPalette) {
      this.palette = Extend(this.palette, newPalette);
      this.component = Extend(this.component, this.template.getComponentThemes(this.palette));
    },

    setComponentThemes: function setComponentThemes(overrides) {
      this.component = Extend(this.component, overrides);
    }
  };
};

module.exports = ThemeManager;