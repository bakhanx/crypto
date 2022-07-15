import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
    themeColor:string;
    chartColor:string;
    darkModeColor:string;
    listBgColor:string;
  }
}
