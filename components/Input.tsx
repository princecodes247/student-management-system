import * as React from "react";

import { cn } from "../lib/utils";
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
} from "react-native";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "w-full px-3 py-3 rounded text-base bg-input ring-offset-background placeholder:text-muted-foreground focus:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: `bg-gray-100 focus:border focus:border-primary`,
        disabled: `border-gray-200 bg-gray-100 text-gray-500 opacity-50`,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface InputProps extends VariantProps<typeof inputVariants> {
  classNames?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (text: string) => void;
  type?: "text" | "password";
}

const Input = ({
  classNames,
  placeholder = "",
  disabled = false,
  value,
  type = "text",
  onChange,
  variant = "default",
}: InputProps) => {
  return (
    <TextInput
      // type={type}
      className={cn(inputVariants({ variant, className: classNames }))}
      placeholder={placeholder}
      onChangeText={onChange}
      value={value}
      secureTextEntry={type === "password"}
      editable={!disabled}
      selectTextOnFocus={!disabled}
      // style={{ height: 40, backgroundColor: "#000", padding: 10 }}
    />
  );
};

Input.displayName = "Input";

export { Input };
