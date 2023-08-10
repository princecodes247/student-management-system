import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Text, View } from "react-native";
import { cn } from "../lib/utils";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router/src/link/Link";
const alertVariants = cva(
  "relative flex-row items-center w-full rounded border p-4 [&:has(svg)]:pl-11 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border-primary/50",
        warning: "bg-yellow-100/30 text-foreground border-yellow-500/50",
        destructive:
          "border-red-600 bg-red-50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const alertIconVariants = cva("", {
  variants: {
    variant: {
      default: "text-primary/50",
      warning: "text-yellow-500",
      destructive: "text-red-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface AlertProps extends VariantProps<typeof alertVariants> {
  classNames?: string;
  href?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
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

const Alert = ({
  classNames,
  icon,
  variant = "default",
  children,
  href = "",
}: AlertProps) => (
  <Link href={href}>
    <View
      role="alert"
      className={cn(alertVariants({ variant }), classNames)}
      // {...props}
    >
      <Text className={cn(alertIconVariants({ variant }))}>{icon}</Text>
      <View className="flex-1 ml-2">{children}</View>
      <Text className={cn(alertIconVariants({ variant }))}>
        <MaterialIcons name="chevron-right" size={24} />
      </Text>
    </View>
  </Link>
);
Alert.displayName = "Alert";

const AlertTitle = ({ className, content, ...props }: AlertTitleProps) => (
  <Text
    className={cn("font-medium leading-none tracking-tight", className)}
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
  <Text
    className={cn("text-sm mt-1 [&_p]:leading-relaxed", className)}
    {...props}
  >
    {content}
  </Text>
);
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
