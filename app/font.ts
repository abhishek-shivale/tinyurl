import { Alegreya_Sans_SC, Source_Sans_3 } from "next/font/google";

const FontHeading = Alegreya_Sans_SC({
  weight: ["900"],
  subsets: ["latin"],
  display: "swap",

});

const FontParagraph = Source_Sans_3({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

export const fontParagraph = FontParagraph.className


export const fontHeading = FontHeading.className