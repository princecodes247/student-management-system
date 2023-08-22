import React, { ReactNode } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";
import { getThemeColor } from "../constants/theme";
import { Link } from "expo-router";
import { ConditionalArgument } from "../interfaces";

// import { getThemeColor, light } from "../constants/theme";
// const bug =""
const buttonVariants = cva(
  "inline-flex text-center items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: `bg-primary text-primary-foreground hover:bg-primary/90`,
        destructive: "bg-red-500 text-base hover:bg-destructive/90",
        outline:
          "border-2 border-primary bg-transparent hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary bg-gray-200 text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "rounded px-4 py-4",
        sm: "h-9 rounded px-3",
        lg: "h-11 rounded px-8",
        icon: "h-10 w-10",
      },
      disabled: {
        true: "bg-gray-200 text-gray-500 border-gray-300 grayscale-100",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      disabled: false,
    },
  }
);

const buttonTextVariants: typeof buttonVariants = cva(
  "font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: `text-primary-foreground text-center hover:text-primary/90`,
        destructive: "text-center text-red-100 hover:text-red-400/90",
        outline: "text-primary text-center hover:text-accent",
        secondary:
          "text-secondary-foreground text-center hover:text-secondary/80",
        ghost:
          "text-accent bg-transparent hover:text-accent-foreground text-center",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "text-base",
        sm: "text-sm",
        lg: "text-lg",
        icon: "",
      },
      disabled: {
        true: "text-gray-400 grayscale-100",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      disabled: false,
    },
  }
);

export interface ButtonProps<U>
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  classNames?: string;
  textClassNames?: string;
  href?: U extends string ? U : undefined;
  replace?: U extends string ? boolean : never;
  onClick?: U extends string ? never : () => void;
  isDisabled?: boolean;
  loading?: boolean;
  //   asChild?: boolean
}

export default function Button<T>({
  children,
  variant = "default",
  size,
  classNames = "",
  textClassNames = "",
  href,
  replace,
  onClick,
  loading,
  disabled,
}: ButtonProps<T>) {
  return (
    <ButtonLink
      replace={replace}
      href={href}
      loading={loading}
      disabled={disabled || loading}
    >
      <TouchableOpacity
        onPress={onClick}
        style={styles.container}
        disabled={disabled || loading}
        className={cn(
          buttonVariants({ variant, size, disabled, className: classNames })
        )}
      >
        <Text
          className={cn(
            buttonTextVariants({
              variant,
              size,
              disabled,
              className: textClassNames,
            })
          )}
        >
          {loading ? "Loading..." : children}
        </Text>
      </TouchableOpacity>
    </ButtonLink>
  );
}

const ButtonLink = ({
  children,
  href,
  replace,
  loading,
  disabled,
}: {
  children: ReactNode;
  href: string;
  replace?: boolean;
  loading?: boolean;
  disabled?: boolean;
}) => {
  return href ? (
    <Link replace={replace} disabled={disabled} href={href} asChild>
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
