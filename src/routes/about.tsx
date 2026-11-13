import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  ArrowUpRight,
  Award,
  Download,
  FlaskConical,
  GraduationCap,
  ImageIcon,
  MapPin,
  Wrench,
  type LucideIcon,
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

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*  Bento grid                                                                */
/* -------------------------------------------------------------------------- */

/** Accent that stays legible in both themes (your dark --primary is quite dim). */
const accent = "text-primary dark:text-chart-2";

function BentoCard({
  title,
  icon: Icon,
  className,
  children,
}: {
  title: string;
  icon: LucideIcon;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Icon className="size-4" aria-hidden />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        {children}
      </CardContent>
    </Card>
  );
}

/* Discrete optimal transport between two point clouds. With equal-size,
   uniform point sets the optimal plan is an assignment, so we solve it exactly
   (8! permutations with pruning is instant). Squared distance is the cost, the
   same one behind the Wasserstein-2 metric. Swap the points for your own data. */
type Pt = [number, number];

const source: Pt[] = [
  [62, 72],
  [100, 52],
  [138, 78],
  [58, 112],
  [98, 106],
  [136, 124],
  [78, 152],
  [120, 164],
];
const target: Pt[] = Array.from({ length: 8 }, (_, i) => {
  const t = ((-70 + i * 20) * Math.PI) / 180;
  return [330 + 90 * Math.cos(t), 105 + 66 * Math.sin(t)] as Pt;
});

function solveAssignment(a: Pt[], b: Pt[]): number[] {
  const n = a.length;
  const cost = (i: number, j: number) =>
    (a[i][0] - b[j][0]) ** 2 + (a[i][1] - b[j][1]) ** 2;
  const used = Array<boolean>(n).fill(false);
  const perm: number[] = [];
  let best = Infinity;
  let bestPerm: number[] = [];
  const go = (i: number, acc: number) => {
    if (acc >= best) return;
    if (i === n) {
      best = acc;
      bestPerm = [...perm];
      return;
    }
    for (let j = 0; j < n; j++) {
      if (used[j]) continue;
      used[j] = true;
      perm[i] = j;
      go(i + 1, acc + cost(i, j));
      used[j] = false;
    }
  };
  go(0, 0);
  return bestPerm;
}

const plan = solveAssignment(source, target);

function TransportPlot() {
  return (
    <figure>
      <svg
        viewBox="0 0 480 210"
        role="img"
        aria-label="Two point clouds: a round blob on the left and a crescent on the right, joined by lines showing the optimal way to move each source point to a target point without crossings."
        className={cn("w-full", accent)}
      >
        {/* transport plan */}
        {plan.map((j, i) => {
          const [x1, y1] = source[i];
          const [x2, y2] = target[j];
          return (
            <g key={i}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeWidth="1.5"
                opacity="0.4"
              />
              {/* halfway point of the displacement interpolation */}
              <circle
                cx={(x1 + x2) / 2}
                cy={(y1 + y2) / 2}
                r="2.5"
                fill="currentColor"
                opacity="0.6"
              />
            </g>
          );
        })}

        {/* source: hollow, target: filled */}
        {source.map(([x, y], i) => (
          <circle
            key={`s${i}`}
            cx={x}
            cy={y}
            r="6"
            className="fill-card"
            stroke="currentColor"
            strokeWidth="2"
          />
        ))}
        {target.map(([x, y], i) => (
          <circle key={`t${i}`} cx={x} cy={y} r="6" fill="currentColor" />
        ))}

        <text
          x="100"
          y="198"
          textAnchor="middle"
          className="fill-muted-foreground text-[11px]"
        >
          source distribution
        </text>
        <text
          x="370"
          y="198"
          textAnchor="middle"
          className="fill-muted-foreground text-[11px]"
        >
          target distribution
        </text>
      </svg>
      <figcaption className="sr-only">
        The cheapest way to reshape one distribution into another, solved
        exactly for eight points.
      </figcaption>
    </figure>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div id="top">
        {/* ------------------------------ Hero ------------------------------ */}
        <section className="relative isolate overflow-hidden">
          {/* soft glow, purely decorative */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 left-1/2 -z-10 h-112 w-4xl -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
          />
          <div className="mx-auto max-w-4xl px-6 pt-24 pb-20 text-center sm:pt-32">
            <Badge variant="outline" className="mb-6">
              Open to postdoc and industry research roles
            </Badge>
            <h1 className="text-5xl font-bold tracking-tight text-balance sm:text-7xl">
              I study how points{" "}
              <span className="bg-linear-to-r from-primary to-chart-3 bg-clip-text text-transparent dark:from-chart-2 dark:to-chart-1">
                become distributions.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-balance text-muted-foreground sm:text-xl">
              I'm Keegan, a recent Ph.D. graduate in computer science from Duke
              University.
            </p>

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
        <Separator />
        <section
          id="glance"
          aria-labelledby="glance-title"
          className="mx-auto max-w-7xl scroll-mt-20 border-x px-6 py-16 md:py-24"
        >
          <h2
            id="glance-title"
            className="mb-8 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            The short version
          </h2>

          <div className="grid gap-4 md:grid-cols-6">
            {/* Dissertation: the one visual centerpiece */}
            <BentoCard
              title="Dissertation"
              icon={FlaskConical}
              className="md:col-span-4 md:row-span-2"
            >
              <p className="max-w-xl text-xl leading-snug font-semibold tracking-tight">
                Scalable, differentiable optimal transport for high-dimensional
                data
              </p>
              <TransportPlot />
            </BentoCard>

            {/* Impact */}
            <BentoCard title="So far" icon={Award} className="md:col-span-2">
              <dl className="grid grid-cols-3 gap-2">
                {[
                  ["8", "papers published"],
                  ["500", "students mentored"],
                  ["12", "public talks hosted"],
                ].map(([n, label]) => (
                  <div key={label}>
                    <dt className="sr-only">{label}</dt>
                    <dd className="text-3xl font-semibold tracking-tight tabular-nums">
                      {n}
                    </dd>
                    <dd
                      className="mt-1 text-xs leading-4 text-muted-foreground"
                      aria-hidden
                    >
                      {label}
                    </dd>
                  </div>
                ))}
              </dl>
            </BentoCard>

            {/* Availability */}
            <BentoCard title="Based in" icon={MapPin} className="md:col-span-2">
              <p className="text-xl font-semibold tracking-tight">
                Burlington, VT
              </p>
              <p className="flex items-start gap-2 text-sm text-muted-foreground">
                <span
                  className={cn(
                    "mt-1.5 size-2 shrink-0 rounded-full bg-current",
                    accent
                  )}
                  aria-hidden
                />
                Open to postdoc and industry research roles
              </p>
            </BentoCard>

            {/* Toolkit */}
            <BentoCard title="Toolkit" icon={Wrench} className="md:col-span-4">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Methods</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Reinforcement learning",
                      "Bayesian modeling",
                      "Statistics",
                    ].map((m) => (
                      <Badge key={m} variant="secondary">
                        {m}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Tools</p>
                  <div className="flex flex-wrap gap-2">
                    {["Python", "PyTorch"].map((t) => (
                      <Badge key={t} variant="outline">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* Links */}
            <BentoCard
              title="Find me elsewhere"
              icon={ArrowUpRight}
              className="md:col-span-2"
            >
              <ul className="-mx-2 space-y-0.5">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      className="flex items-center gap-3 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted focus-visible:bg-muted"
                    >
                      {social.icon}
                      <span className="flex-1">{social.label}</span>
                      <ArrowUpRight
                        className="size-4 text-muted-foreground"
                        aria-hidden
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </BentoCard>

            {/* Education */}
            <BentoCard
              title="Education"
              icon={GraduationCap}
              className="md:col-span-6"
            >
              <ul className="grid grid-rows-2 gap-4 sm:gap-8">
                <li className="border-l-2 border-primary pl-4 dark:border-chart-2">
                  <p className="font-medium">PhD, Computer Science</p>
                  <p className="text-sm text-muted-foreground">
                    Duke University · 2021 to 2026
                  </p>
                </li>
                <ul className="grid grid-cols-2">
                  <li className="border-l-2 border-border pl-4">
                    <p className="font-medium">BSc, Computer Science</p>
                    <p className="text-sm text-muted-foreground">
                      University of Connecticut · 2017 to 2021, Summa Cum Laude
                    </p>
                  </li>
                  <li className="border-l-2 border-border pl-4">
                    <p className="font-medium">BSc, Mathenatics</p>
                    <p className="text-sm text-muted-foreground">
                      University of Connecticut · 2017 to 2021, Summa Cum Laude
                    </p>
                  </li>
                </ul>
              </ul>
            </BentoCard>
          </div>
        </section>
        <Separator />
        {/* ----------------------- Alternating sections ---------------------- */}
        <Row
          id="phd"
          title="Five years into a very long question"
          figure={
            <Figure
              alt="Photo of Duke University Campus"
              caption="Duke University"
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
          <p>
            My dissertation combined reinforcement learning theory with
            two-photon imaging from mouse cortex.
          </p>
        </Row>

        <Row
          id="research"
          flip
          title="Proudest Work"
          figure={
            <Figure
              alt="A figure from your paper"
              caption="Some caption, am I right?"
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

        <Row
          id="undergrad"
          title="Where it started"
          figure={
            <Figure
              alt="Photo from undergrad: campus, lab, or graduation"
              caption="University of Connecticut, class of 2021."
            />
          }
        >
          <p>
            I hold a degree in Mathematics and Computer Science from the
            University of Connecticut. My undergraduate research was
            multifaceted: I wrote my honors thesis on the Ricci flow under
            negative curvature and conducted projects spanning geometric data
            analysis, phylogenetic tree comparison, and high-dimensional
            entropic uncertainty relations.
          </p>
        </Row>

        <Row
          id="beyond"
          title="Away from the whiteboard"
          flip
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
            I'm happy to chat about collaborations, postdoc positions, or a
            tricky beta.
          </p>
          <ul className="mt-8 flex flex-wrap justify-center gap-3">
            {socials.map((s, index) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  className={cn(
                    buttonVariants({
                      variant: index == 0 ? "default" : "outline",
                      size: "lg",
                    }),
                    index > 0 ? "border-border" : ""
                  )}
                >
                  {s.icon}
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
