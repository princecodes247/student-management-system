import * as React from "react";

import { cn } from "../lib/utils";
import { TextInput } from "react-native";

export interface InputProps {
  classNames: string;
  placeholder: string;
}

const Input = ({ classNames, placeholder }: InputProps) => {
  return (
    <TextInput
      // type={type}
      className={cn(
        "w-full px-3 py-3 border border-input rounded-lg text-md bg-input ring-offset-background placeholder:text-muted-foreground focus:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        classNames
      )}
      placeholder={placeholder}
      // style={{ height: 40, backgroundColor: "#000", padding: 10 }}
    />
  );
};

Input.displayName = "Input";

export { Input };
