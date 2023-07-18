import React, { ReactNode } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";
import { getThemeColor } from "../constants/theme";
import { Link } from "expo-router";

// import { getThemeColor, light } from "../constants/theme";
// const bug =""
const buttonVariants = cva(
  "inline-flex text-center items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: `bg-primary text-primary-foreground hover:bg-primary/90`,
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "rounded px-4 py-4",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  classNames: string;
  href?: string;
  //   asChild?: boolean
}

export default function Button({
  children,
  variant,
  size,
  classNames,
  href,
}: ButtonProps) {
  return (
    <ButtonLink href={href}>
      <TouchableOpacity
        style={styles.container}
        className={cn(buttonVariants({ variant, size, className: classNames }))}
      >
        {children}
      </TouchableOpacity>
    </ButtonLink>
  );
}

const ButtonLink = ({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) => {
  return href ? (
    <Link href={href} asChild>
      {children}
    </Link>
  ) : (
    <>{children}</>
  );
};
const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#000",
  },
});