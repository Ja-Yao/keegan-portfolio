import type { LucideIcon } from "lucide-react";
import type { ComponentProps, CSSProperties } from "react";
import { useId } from "react";

import { cn } from "@/lib/utils";

/**
 * Bento grid.
 *
 * Requires Tailwind v4 (container query variants like `@xl:` and `@3xl:` are
 * built in). On v3, add the `@tailwindcss/container-queries` plugin; the
 * `@xl`/`@3xl` names then differ slightly.
 *
 * Sizing is driven by the grid's own width, not the viewport, so the grid
 * behaves the same in a full-width page, a sidebar layout, or a narrow column:
 *
 *   < 36rem   1 column, cards stack
 *   36-48rem  2 columns, wide cards (colSpan > 3) span both
 *   >= 48rem  6 columns, colSpan and rowSpan apply, rows are fluid
 *
 * Gap, padding, radius, row height and headline size all scale with the
 * grid's width using container query units (cqw).
 */

const COLUMNS = 6;

const tones = {
  /** Quiet surface, hairline ring. Use for most cards. */
  default: "bg-card text-card-foreground ring-1 ring-foreground/10",
  /** Filled, no ring. Alternate with default to create rhythm. */
  muted: "bg-muted text-foreground",
  /** Strong contrast. Use once, for the card that should be read first. */
  inverted: "bg-muted-foreground text-background",
  /** Brand color. */
  accent: "bg-accent text-accent-foreground",
  /** Pastel brand color */
  pastel:
    "bg-[color-mix(in_oklab,var(--primary)_10%,var(--card))] text-[color-mix(in_oklab,var(--primary)_30%,var(--foreground))]",
} as const;

type BentoTone = keyof typeof tones;

function BentoGrid({ className, children, ...props }: ComponentProps<"div">) {
  return (
    // The outer element is the query container; the inner grid is what gets
    // sized from it, so its own gap can use cqw units too.
    <div className="@container w-full">
      <div
        data-slot="bento-grid"
        className={cn(
          "grid grid-cols-1 gap-[clamp(0.5rem,1cqw,0.75rem)]",
          "@xl:grid-flow-dense @xl:grid-cols-2",
          "@3xl:auto-rows-[minmax(clamp(7rem,13cqw,12rem),auto)] @3xl:grid-cols-6",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}

type BentoCardProps = Omit<ComponentProps<"section">, "title"> & {
  /** Small label at the top of the card. Omit for a card with no header. */
  title?: string;
  icon?: LucideIcon;
  /** Columns spanned at full width, out of 6. */
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Rows spanned at full width. Rows are fluid, so 2 is about twice as tall. */
  rowSpan?: 1 | 2 | 3;
  tone?: BentoTone;
};

function BentoCard({
  title,
  icon: Icon,
  colSpan = 2,
  rowSpan = 1,
  tone = "default",
  className,
  children,
  style,
  ...props
}: BentoCardProps) {
  const titleId = useId();
  const midSpan = colSpan > COLUMNS / 2 ? 2 : 1;

  return (
    <section
      data-slot="bento-card"
      aria-labelledby={title ? titleId : undefined}
      style={
        {
          "--bento-col": colSpan,
          "--bento-row": rowSpan,
          "--bento-mid": midSpan,
          ...style,
        } as CSSProperties
      }
      className={cn(
        "flex min-w-0 flex-col overflow-hidden",
        "gap-[clamp(0.75rem,2cqw,1.25rem)] p-[clamp(1.25rem,2.6cqw,1.75rem)]",
        "rounded-[clamp(1.25rem,3cqw,1.75rem)]",
        "@xl:col-[span_var(--bento-mid)]",
        "@3xl:col-[span_var(--bento-col)] @3xl:row-[span_var(--bento-row)]",
        tones[tone],
        className
      )}
      {...props}
    >
      {title && (
        <header className="flex items-center gap-2 text-sm font-medium opacity-70">
          {Icon && <Icon className="size-4 shrink-0" aria-hidden />}
          <h3 id={titleId}>{title}</h3>
        </header>
      )}
      {/* Children can use `mt-auto` to sit at the bottom of a tall card. */}
      <div className="flex flex-1 flex-col gap-4">{children}</div>
    </section>
  );
}

const headlineSizes = {
  md: "text-[clamp(1.25rem,2.8cqw,2rem)]",
  lg: "text-[clamp(1.75rem,4cqw,3rem)]",
} as const;

/** The large statement text that Apple puts at the top of a tile. */
function BentoHeadline({
  size = "md",
  className,
  ...props
}: ComponentProps<"p"> & { size?: keyof typeof headlineSizes }) {
  return (
    <p
      data-slot="bento-headline"
      className={cn(
        "leading-[1.1] font-semibold tracking-tight text-balance",
        headlineSizes[size],
        className
      )}
      {...props}
    />
  );
}

/** Small caption for cards that have no icon header. */
function BentoLabel({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="bento-label"
      className={cn("text-sm font-medium opacity-70", className)}
      {...props}
    />
  );
}

/** Supporting copy. Inherits the card's color at reduced opacity, so it works on every tone. */
function BentoBody({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="bento-body"
      className={cn(
        "text-sm leading-relaxed text-pretty opacity-70",
        className
      )}
      {...props}
    />
  );
}

export { BentoBody, BentoCard, BentoGrid, BentoHeadline, BentoLabel };
export type { BentoCardProps, BentoTone };
