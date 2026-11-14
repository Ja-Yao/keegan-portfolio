import Aurora from "@/components/Aurora";
import { useTheme } from "@/components/theme-provider";
import { TransportMotif } from "@/components/transport-motif";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  BentoBody,
  BentoCard,
  BentoGrid,
  BentoHeadline,
  BentoLabel,
} from "@/components/ui/bento";
import { buttonVariants } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { socials } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  Download,
  FlaskConical,
  ImageIcon,
  MapPin,
} from "lucide-react";
import type { ReactNode } from "react";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

/**
 * Image frame. Pass `src` to show a real photo; without it you get a
 * placeholder so the layout is easy to judge before you have images.
 */
function Figure({
  src,
  alt,
  caption,
  className,
}: {
  src?: string;
  alt: string;
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={cn("w-full", className)}>
      <div className="relative aspect-4/3 overflow-hidden rounded-2xl border bg-muted shadow-sm ring-1 ring-foreground/5">
        {src ? (
          <img
            src={src}
            alt={alt}
            className="size-full object-cover"
            loading="lazy"
          />
        ) : (
          <div
            role="img"
            aria-label={alt}
            className="flex size-full flex-col items-center justify-center gap-2 bg-linear-to-br from-primary/15 via-muted to-muted text-muted-foreground"
          >
            <ImageIcon className="size-8" aria-hidden />
            <span className="max-w-[16rem] text-center text-sm">{alt}</span>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * One alternating row. Write the copy as children (JSX, links, badges: whatever).
 * `flip` puts the image on the left on desktop. On mobile the image always
 * comes after the text.
 */
function Row({
  id,
  title,
  flip = false,
  figure,
  children,
}: {
  id: string;
  title: string;
  flip?: boolean;
  figure: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="mx-auto grid max-w-6xl scroll-mt-20 items-center gap-10 px-6 py-16 md:grid-cols-2 md:gap-16 md:py-24"
    >
      <div className={cn("space-y-5", flip && "md:order-2")}>
        <h2
          id={`${id}-title`}
          className="text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {title}
        </h2>
        <div className="max-w-prose space-y-4 text-lg leading-8 text-muted-foreground [&_strong]:font-semibold [&_strong]:text-foreground">
          {children}
        </div>
      </div>
      <div className={cn(flip && "md:order-1")}>{figure}</div>
    </section>
  );
}

const stats = [
  ["8", "papers published"],
  ["500", "students mentored"],
  ["12", "public talks hosted"],
] as const;

function AboutPage() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div id="top">
        {/* ------------------------------ Hero ------------------------------ */}
        <section className="relative isolate overflow-hidden">
          <div
            aria-hidden={true}
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full w-full"
          >
            <Aurora
              colorStops={["#167942", "#5fd085", "#c27b2b", "#167942"]}
              amplitude={1.4}
              blend={0.5}
              height={0.45}
              speed={1}
              glow={1.2}
              scale={1}
              brightness={1}
              layers={3}
              direction="top"
              opacity={1}
              mouseInteraction={false}
              intro
              lightMode={theme === "light"}
            />
          </div>
          <div className="mx-auto max-w-4xl px-6 pt-24 pb-20 text-center sm:pt-32">
            <h1 className="text-5xl font-bold tracking-tight text-balance sm:text-7xl">
              I study how points become distributions.
            </h1>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a href="/cv.pdf" className={cn(buttonVariants({ size: "lg" }))}>
                <Download aria-hidden /> Download CV
              </a>
              <a
                href="#phd"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "scroll smooth"
                )}
              >
                Read my story <ArrowDown aria-hidden />
              </a>
            </div>
          </div>
        </section>
        <Separator className="h-0.5!" />
        <section
          id="glance"
          aria-labelledby="glance-title"
          className="mx-auto max-w-384 scroll-mt-20 border-x-2 border-border px-6 py-12 md:py-16"
        >
          <h2
            id="glance-title"
            className="mb-8 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            The short version
          </h2>
          <BentoGrid>
            {/* Hero: the one visual centerpiece */}
            <BentoCard
              title="Dissertation"
              icon={FlaskConical}
              colSpan={4}
              rowSpan={3}
            >
              <BentoHeadline size="lg">
                Scalable, differentiable optimal transport for high-dimensional
                data
              </BentoHeadline>
              <div className="mt-auto">
                <TransportMotif seed={7} animate />
              </div>
            </BentoCard>

            {/* Impact: saturated, with numbers that fill the tile */}
            <BentoCard
              aria-label="Impact so far"
              colSpan={2}
              rowSpan={2}
              tone="accent"
            >
              <dl className="flex flex-1 flex-col justify-between gap-4">
                {stats.map(([n, label]) => (
                  <div key={label} className="flex items-baseline gap-3">
                    <dt className="order-2 min-w-0 text-lg leading-snug opacity-80">
                      {label}
                    </dt>
                    <dd className="order-1 text-[clamp(2.5rem,5cqw,4.5rem)] leading-none font-semibold tracking-tight tabular-nums">
                      {n}
                    </dd>
                  </div>
                ))}
              </dl>
            </BentoCard>

            {/* Availability */}
            <BentoCard
              aria-label="Location"
              icon={MapPin}
              colSpan={2}
              tone="muted"
            >
              <BentoLabel>Based in</BentoLabel>
              <div className="mt-auto space-y-1">
                <BentoHeadline size="lg">Burlington, VT</BentoHeadline>
              </div>
            </BentoCard>

            {/* Toolkit, split in two */}
            <BentoCard aria-label="Methods" colSpan={2} tone="muted">
              <BentoHeadline>Methods</BentoHeadline>
              <div className="mt-auto flex flex-wrap gap-2">
                {[
                  "Reinforcement learning",
                  "Bayesian modeling",
                  "Statistics",
                ].map((m) => (
                  <Badge key={m} variant="outline">
                    {m}
                  </Badge>
                ))}
              </div>
            </BentoCard>

            <BentoCard aria-label="Tools" colSpan={2}>
              <BentoHeadline>Tools</BentoHeadline>
              <div className="mt-auto flex flex-wrap gap-2">
                {["Python", "PyTorch"].map((t) => (
                  <Badge key={t} variant="secondary">
                    {t}
                  </Badge>
                ))}
              </div>
            </BentoCard>

            {/* Links: icon-only, labelled for assistive tech */}
            <BentoCard aria-label="Links" colSpan={2} tone="muted">
              <BentoHeadline>Find me elsewhere</BentoHeadline>
              <ul className="mt-auto flex flex-wrap gap-2">
                {socials.slice(1).map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      aria-label={social.label}
                      title={social.label}
                      className="grid size-11 place-items-center rounded-full bg-foreground/10 transition-colors hover:bg-foreground/20 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    >
                      {social.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </BentoCard>

            {/* Education: the PhD gets the weight, each BSc gets a small tile */}
            <BentoCard aria-label="PhD" colSpan={3} rowSpan={2} tone="inverted">
              <BentoLabel>Education</BentoLabel>
              <BentoHeadline size="lg">PhD, Computer Science</BentoHeadline>
              <BentoBody className="mt-auto">
                Duke University · 2021 to 2026
              </BentoBody>
            </BentoCard>

            <BentoCard
              aria-label="BSc, Computer Science"
              colSpan={3}
              tone="muted"
            >
              <BentoHeadline>BSc, Computer Science</BentoHeadline>
              <BentoBody className="mt-auto">
                University of Connecticut · 2017 to 2021, Summa Cum Laude
              </BentoBody>
            </BentoCard>

            <BentoCard aria-label="BSc, Mathematics" colSpan={3}>
              <BentoHeadline>BSc, Mathematics</BentoHeadline>
              <BentoBody className="mt-auto">
                University of Connecticut · 2017 to 2021, Summa Cum Laude
              </BentoBody>
            </BentoCard>
          </BentoGrid>
        </section>
        <Separator className="h-0.5!" />
        {/* ----------------------- Alternating sections ---------------------- */}
        <Row
          id="phd"
          title="Five years into a very long question"
          figure={
            <Figure
              alt="Photo of Duke University Campus"
              caption="Duke University, class of 2026"
            />
          }
        >
          <p>
            I completed my Ph.D. in Computer Science at Duke University, advised
            by{" "}
            <HoverCard>
              <HoverCardTrigger
                render={
                  <a
                    href={"https://users.cs.duke.edu/~pankaj/"}
                    className="font-medium text-foreground underline decoration-primary/50 underline-offset-4 transition-colors hover:decoration-primary"
                  >
                    Pankaj K. Agarwal
                  </a>
                }
              />
              <HoverCardContent className="flex w-auto flex-col gap-0.5">
                <div className="grid grid-cols-[1fr_auto] gap-4">
                  <Avatar>
                    <AvatarFallback>PA</AvatarFallback>
                  </Avatar>
                  <div>
                    <h6 className="text-lg font-semibold">Pankaj K. Agarwal</h6>
                    <div className="flex flex-col">
                      <span>RJR Nabisco Professor of Computer Science</span>
                      <span>Professor of Mathematics</span>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      Duke University
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            . My research focused on the geometry of optimal transport (OT): how
            do we efficiently move the structure of points into the realm of
            distributions? I developed scalable algorithms that bridged this gap
            for machine learning and data science.
          </p>
        </Row>

        <Row
          id="undergrad"
          title="Where it started"
          flip
          figure={
            <Figure
              alt="Photo from undergrad: campus, lab, or graduation"
              caption="University of Connecticut, class of 2021."
            />
          }
        >
          <p>
            I hold Bachelor's Degrees in Computer Science and Mathematics from the
            University of Connecticut. My undergraduate research was
            multifaceted: I wrote my honors thesis on the Ricci flow under
            negative curvature and collaborated on projects spanning geometric data
            analysis, phylogenetic tree comparison, and high-dimensional
            entropic uncertainty relations.
          </p>
        </Row>

        <Row
          id="beyond"
          title="Away from the whiteboard"
          figure={
            <Figure
              alt="Photo of a hobby: running, baking, hiking"
              caption="Mile 20 of a very optimistic training plan."
            />
          }
        >
          <p>
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur
            adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae
            pellentesque sem placerat in id. Placerat in id cursus mi pretium
            tellus duis. Pretium tellus duis convallis tempus leo eu aenean.
          </p>
        </Row>

        <Separator />

        {/* ------------------------------ Contact ----------------------------- */}
        <section
          id="contact"
          className="scroll-mt-20 px-6 pt-16 pb-24 text-center"
        >
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Let's talk
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            I'm happy to chat about anything from collaborations or a tricky
            bouldering beta.
          </p>
          <ul className="mt-8 flex flex-wrap justify-center gap-3">
            <li key={socials[0].label}>
              <a
                href={socials[0].href}
                className={buttonVariants({
                  variant: "default",
                  size: "lg",
                })}
              >
                {socials[0].icon}
                {socials[0].label}
              </a>
            </li>
            <li key={socials.at(-1)!.label}>
              <a
                href={socials.at(-1)!.href}
                className={buttonVariants({
                  variant: "secondary",
                  size: "lg",
                })}
              >
                {socials.at(-1)!.icon}
                {socials.at(-1)!.label}
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
