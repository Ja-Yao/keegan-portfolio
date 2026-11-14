import { Code2, ExternalLink, FileText } from "lucide-react";

import { OWNER_NAME } from "@/lib/publications";
import { describeLink, type LinkKind } from "@/lib/publications";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

const icons: Record<LinkKind, typeof Code2> = {
  code: Code2,
  pdf: FileText,
  external: ExternalLink,
};

export function Authors({
  authors,
  className,
}: {
  authors: string[];
  className?: string;
}) {
  return (
    <span className={cn("text-muted-foreground", className)}>
      {authors.map((name, i) => (
        <span key={name}>
          {name === OWNER_NAME ? (
            <span className="font-medium text-foreground">{name}</span>
          ) : (
            name
          )}
          {i < authors.length - 1 ? ", " : ""}
        </span>
      ))}
    </span>
  );
}

type PublicationLinksProps = {
  links: string[];
  /** Full-width, left-aligned buttons in a column (detail sidebar). */
  stacked?: boolean;
  className?: string;
};

export function PublicationLinks({
  links,
  stacked,
  className,
}: PublicationLinksProps) {
  if (links.length === 0) return null;
  return (
    <ul
      className={cn(
        "flex gap-2",
        stacked ? "flex-col" : "flex-wrap",
        className
      )}
    >
      {links.map((url) => {
        const { label, kind } = describeLink(url);
        const Icon = icons[kind];
        return (
          <li key={url}>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "outline" }),
                stacked ? "w-full justify-start" : "h-7 gap-1.5 px-2.5"
              )}
            >
              <Icon aria-hidden="true" />
              {label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
