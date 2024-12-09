import { Alegreya_Sans_SC, Source_Sans_3 } from "next/font/google";

const FontHeading = Alegreya_Sans_SC({
  weight: ["900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",

});

const FontParagraph = Source_Sans_3({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-paragraph",
});

export const fontParagraph = FontParagraph.variable


export const fontHeading = FontHeading.variable