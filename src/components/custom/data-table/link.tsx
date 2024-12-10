import React from "react";
import { cn } from "@/lib/utils";

export interface LinkProps extends React.ComponentProps<"a"> {
  className?: string;
  children?: React.ReactNode;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, href, ...props }, ref) => {
    const isInternal =
      href?.toString().startsWith("/") || href?.toString().startsWith("#");
    const externalLinkProps = !isInternal
      ? { target: "_blank", rel: "noreferrer" }
      : undefined;

    return (
      <a
        className={cn(
          "text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground",
          "ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md",
          className
        )}
        ref={ref}
        href={href}
        {...externalLinkProps}
        {...props}
      />
    );
  }
);

Link.displayName = "Link";

export { Link };
