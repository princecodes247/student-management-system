export const light = {
  background: "0 0% 100%",
  foreground: "222.2 47.4% 11.2%",

  muted: "210 40% 96.1%",
  mutedForeground: "215.4 16.3% 46.9%",

  popover: "0 0% 100%",
  popoverForeground: "222.2 47.4% 11.2%",

  border: "214.3 31.8% 91.4%",
  input: "214.3 31.8% 91.4%",

  card: "0 0% 100%",
  cardForeground: "222.2 47.4% 11.2%",

  primary: "#0867f4",
  primaryForeground: "#FFFFFF",

  secondary: "210 40% 96.1%",
  secondaryForeground: "222.2 47.4% 11.2%",

  accent: "210 40% 96.1%",
  accentForeground: "222.2 47.4% 11.2%",

  destructive: "0 100% 50%",
  destructiveForeground: "210 40% 98%",

  ring: "215 20.2% 65.1%",

  radius: "0.5rem",
};

export const dark = {
  background: "224 71% 4%",
  foreground: "213 31% 91%",

  muted: "223 47% 11%",
  mutedForeground: "215.4 16.3% 56.9%",

  accent: "216 34% 17%",
  accentForeground: "210 40% 98%",

  popover: "224 71% 4%",
  popoverForeground: "215 20.2% 65.1%",

  border: "216 34% 17%",
  input: "216 34% 17%",

  card: "224 71% 4%",
  cardForeground: "213 31% 91%",

  primary: "210 40% 98%",
  primaryForeground: "222.2 47.4% 1.2%",

  secondary: "222.2 47.4% 11.2%",
  secondaryForeground: "210 40% 98%",

  destructive: "0 63% 31%",
  destructiveForeground: "210 40% 98%",

  ring: "216 34% 17%",

  radius: "0.5rem",
};

// @layer base {
// * {
// @apply border-border,
// }
// body {
// @apply bg-background textForeground,
// fontFeature-settings: "rlig" 1, "calt" 1,
// }
// }

export type Theme = "light" | "dark";

export const getThemeColor = (
  color: keyof typeof light,
  theme: Theme = "light"
) => {
  const themeColors = theme === "light" ? light : dark;
  console.log(`hsl(${themeColors[color].replaceAll(" ", ", ")})`);
  return `${themeColors[color]}`;
};
