import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Text, View } from "react-native";
import { cn } from "../lib/utils";

const alertVariants = cva(
  "relative flex-row justify-between w-full rounded border p-4 [&:has(svg)]:pl-11 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border-primary/50",
        warning: "bg-yellow-200/50 text-foreground border-yellow-500/50",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface AlertProps extends VariantProps<typeof alertVariants> {
  className?: string;
  href?: string;
  children?: React.ReactNode;
  //   asChild?: boolean
}

export interface AlertTitleProps {
  className?: string;
  content?: string;
}

export interface AlertDescriptionProps {
  className?: string;
  content?: string;
}

const Alert = ({ className, variant = "default", children }: AlertProps) => (
  <View
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    // {...props}
  >
    <View>{children}</View>
  </View>
);
Alert.displayName = "Alert";

const AlertTitle = ({ className, content, ...props }: AlertTitleProps) => (
  <Text
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  >
    {content}
  </Text>
);

const AlertDescription = ({
  className,
  content,
  ...props
}: AlertDescriptionProps) => (
  <Text className={cn("text-sm [&_p]:leading-relaxed", className)} {...props}>
    {content}
  </Text>
);
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
