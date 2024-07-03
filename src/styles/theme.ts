import { createTheme, defaultTheme } from "@fast-styles/react";
import { globalStyles } from "@src/styles/globalStyles";

export const theme = createTheme({
  //There are no predefined categories, so you can add any structure you prefer.
  //Some common categories are as follows:
  //colors: {},
  //fonts: {},
  //borderRadiuses: {},
  //fontWeights: {},
  //fontSizes: {},
  //spacings: {},
  //styles: {},
  //tokens: {},
  ...defaultTheme,
  colors: {
    ...globalStyles.colors,
  },
});
