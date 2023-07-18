export const light = {
  accent: "hsl(210, 40%, 96.1%)",
  accentForeground: "hsl(222.2, 47.4%, 11.2%)",

  background: "hsl(0, 0%, 100%)",
  border: "hsl(214.3, 31.8%, 91.4%)",
  card: "hsl(0, 0%, 100%)",
  cardForeground: "hsl(222.2, 47.4%, 11.2%)",

  destructive: "hsl(0, 100%, 50%)",
  destructiveForeground: "hsl(210, 40%, 98%)",

  foreground: "hsl(222.2, 47.4%, 11.2%)",

  input: "hsl(214.3, 31.8%, 91.4%)",

  muted: "hsl(210, 40%, 96.1%)",
  mutedForeground: "hsl(215.4, 16.3%, 46.9%)",

  popover: "hsl(0, 0%, 100%)",
  popoverForeground: "hsl(222.2, 47.4%, 11.2%)",

  primary: "hsl(216, 93%, 50%)",
  primaryForeground: "#FFFFFF",

  radius: "hsl(0.5rem)",
  ring: "hsl(215, 20.2%, 65.1%)",

  secondary: "hsl(210, 40%, 96.1%)",
  secondaryForeground: "hsl(222.2, 47.4%, 11.2%)",
};

export const dark = {
  accent: "hsl(216, 34%, 17%)",
  accentForeground: "hsl(210, 40%, 98%)",

  background: "hsl(224, 71%, 4%)",
  border: "hsl(216, 34%, 17%)",

  card: "hsl(224, 71%, 4%)",
  cardForeground: "hsl(213, 31%, 91%)",

  destructive: "hsl(0, 63%, 31%)",
  destructiveForeground: "hsl(210, 40%, 98%)",

  foreground: "hsl(213, 31%, 91%)",

  input: "hsl(216, 34%, 17%)",

  muted: "hsl(223, 47%, 11%)",
  mutedForeground: "hsl(215.4, 16.3%, 56.9%)",

  popover: "hsl(224, 71%, 4%)",
  popoverForeground: "hsl(215, 20.2%, 65.1%)",

  primary: "hsl(210, 40%, 98%)",
  primaryForeground: "hsl(222.2, 47.4%, 1.2%)",

  radius: "hsl(0.5rem)",
  ring: "hsl(216, 34%, 17%)",

  secondary: "hsl(222.2, 47.4%, 11.2%)",
  secondaryForeground: "hsl(210, 40%, 98%)",
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

  return `${themeColors[color]}`;
};
