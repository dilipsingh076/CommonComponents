// Typography.tsx
import React from "react";

// Define typography variants and their default HTML tags
type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "small" | "caption";

// Default HTML element mapping for each variant
const defaultElementMap: Record<TypographyVariant, React.ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  p: "p",
  small: "small",
  caption: "span"
};

// Default Tailwind classes for each variant
const variantClasses: Record<TypographyVariant, string> = {
  h1: "text-h3 md:text-h2 lg:text-h1 leading-[120%]", // 44px, 120%
  h2: "text-h4 md:text-h3 lg:text-h2 leading-[120%]", // 30px, 120% 
  h3: "text-h5 md:text-h4 lg:text-h3 leading-[140%]", // 28px, 140%
  h4: "text-h6 md:text-h5 lg:text-h4 leading-[140%]", // 24px, 140%
  h5: "text-p md:text-h6 lg:text-h5 leading-[140%]", // 20px, 140%
  h6: "htext-h6 leading-[100%]", // 16px, 100%
  p: "text-p leading-[100%]", // 14px, 100%
  small: "text-small leading-[100%]", // 12px, 100%
  caption: "text-caption leading-[120%]" // 10px, 120%
};

// Font weight options
type FontWeight = "thin" | "extralight" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black";

// Color options - can be expanded with your design system"s color palette
type ColorOption = "default" | "primary" | "secondary" | "error" | "warning" | "info" | "success" | "Primary" | "none";

// Color mapping to Tailwind classes
const colorClasses: Record<ColorOption, string> = {
  default: "text-border",
  primary: "text-blue-600",
  secondary: "text-purple-600",
  error: "text-red-600",
  warning: "text-amber-500",
  info: "text-sky-500",
  success: "text-green-600",
  Primary: "text-textPrimary",
  none: "",
};

// Component props
interface TypographyProps {
  variant?: TypographyVariant;
  component?: React.ElementType; // Override the default HTML element
  color?: ColorOption;
  weight?: FontWeight;
  className?: string;
  align?: "left" | "center" | "right" | "justify";
  italic?: boolean;
  uppercase?: boolean;
  underline?: boolean;
  gutterBottom?: boolean;
  children: React.ReactNode;
  noWrap?: boolean;
  truncate?: boolean;
  [x: string]: any; // For rest props
}

const Typography: React.FC<TypographyProps> = ({
  variant = "p",
  component,
  color = "Primary",
  weight,
  className = "",
  align,
  italic = false,
  uppercase = false,
  underline = false,
  gutterBottom = false,
  children,
  noWrap = false,
  truncate = false,
  ...props
}) => {
  // Determine the component to render
  const Component = component || defaultElementMap[variant];

  // Build className based on props
  const classes = [
    variantClasses[variant],
    colorClasses[color],
    weight && `font-${weight}`,
    align && `text-${align}`,
    italic && "italic",
    uppercase && "uppercase",
    underline && "underline",
    gutterBottom && "mb-4",
    noWrap && "whitespace-nowrap",
    truncate && "truncate",
    className
  ].filter(Boolean).join(" ");

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

export default Typography;