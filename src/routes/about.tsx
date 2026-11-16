import { AuthorHoverCard } from "@/components/author-hover-card";
import Particles from "@/components/Particles";
import { useTheme } from "@/components/theme-provider";
import { Badge } from "@/components/ui/badge";
import {
  BentoBody,
  BentoCard,
  BentoGrid,
  BentoHeadline,
  BentoLabel,
} from "@/components/ui/bento";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { socials } from "@/lib/socials";
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
  ["7", "courses assisted"],
  ["12", "public talks hosted"],
] as const;

const talks = [
  {
    title: "Fast Algorithms for Continuous Optimal Transport Between Histograms",
    venue: "ESA 2026",
  },
  {
    title: "Efficient Algorithms for Optimal Transport in Geometric Settings",
    venue: "Duke Algorithms Seminar 2026",
  },
  {
    title: "Partial Semi-Discrete Optimal Transport",
    venue: "Duke/UNC/NC St. Theory Fest 2025",
  },
  {
    title: "Wasserstein Barycenter in Near-Linear Time",
    venue: "Duke Algorithms Seminar 2024",
  },
  {
    title: "Fast and Accurate Approximations of the Optimal Transport in Discrete and Semi-Discrete Settings",
    venue: "SODA 2024",
  },
  {
    title: "Approximation Algorithms for Discrete and Semi-Discrete Optimal Transport",
    venue: "Duke Algorithms Seminar 2023",
  },
  {
    title: "Optimal Completion and Comparison of Incomplete Phylogenetic Trees under Robinson-Foulds Distance",
    venue: "CPM 2021",
  },
  {
    title: "Robinson-Foulds Distance over Partially Overlapping Phylogenetic Trees",
    venue: "UConn Bioinformatics 2021",
  },
] as const;

const posters = [
  {
    title: "Robust and Partial Semi-Discrete Optimal Transport",
    venue: "NeurIPS 2025",
  },
  {
    title: "A Combinatorial Algorithm for Semi-Discrete Optimal Transport",
    venue: "NeurIPS 2024",
  },
  {
    title: "Quantum Sampling for Finite Key Rates",
    venue: "MIT URTC 2020",
  },
] as const;

const teaching = [
  {
    institution: "Duke University",
    count: "4 courses",
    courses: [
      { name: "Grad Computational Geometry", term: "Fall 2025" },
      { name: "Grad Computational Geometry", term: "Spring 2024" },
      { name: "Advanced Grad Algorithms", term: "Fall 2022" },
      { name: "Discrete Mathematics", term: "Fall 2021" },
    ],
  },
  {
    institution: "University of Connecticut",
    count: "3 courses",
    courses: [
      { name: "Grad Geometry & Topology I", term: "Fall 2020" },
      { name: "Discrete Mathematics", term: "Fall 2018" },
      { name: "Discrete Mathematics", term: "Spring 2018" },
    ],
  },
] as const;

function AboutPage() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div id="top">
        {/* ------------------------------ Hero ------------------------------ */}
        <section className="relative isolate overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 left-1/2 -z-10 h-112 w-4xl -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
          />
          <div className="mx-auto max-w-4xl px-6 pt-24 pb-20 text-center sm:pt-32">
            <h1 className="text-5xl font-bold tracking-tight text-balance sm:text-7xl">
              Lifting pointwise geometry to dataset geometry.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-balance text-muted-foreground sm:text-xl">
              I'm Keegan, a recent Ph.D. graduate in computer science from Duke
              University.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/cv.pdf"
                className={buttonVariants({ variant: "default" })}
              >
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
          className="mx-auto max-w-384 scroll-mt-20 border-x border-border px-6 py-12 md:py-16"
        >
          <h2
            id="glance-title"
            className="mb-8 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            The short version
          </h2>
          <BentoGrid>
            {/* ── Row 1: Dissertation (4 cols, 2 rows) + PhD (2 cols, 1 row) ── */}
            <BentoCard
              title="Dissertation"
              icon={FlaskConical}
              colSpan={4}
              rowSpan={2}
              className="relative overflow-hidden"
            >
              <BentoHeadline size="lg" className="z-10">
                Scalable optimal transport for geometric data
              </BentoHeadline>
              <div className="h-72 w-full rounded-full mask-[radial-gradient(ellipse_at_center,black_45%,transparent_75%)]">
                <Particles
                  particleColors={["#ffffff", "#ffffff", "#d98a2b"]}
                  particleCount={2660}
                  particleSpread={12}
                  speed={0.025}
                  particleBaseSize={100}
                  glow={0.4}
                  twinkle={0.2}
                  moveParticlesOnHover={false}
                  hoverEffect="repel"
                  sizeRandomness={1}
                  shape="circle"
                  connections={false}
                  particleHoverFactor={1}
                  hoverRadius={140}
                  drift="none"
                  driftSpeed={1}
                  alphaParticles
                  cameraDistance={20}
                  variation={6}
                  opacity={1}
                  clickBurst={false}
                  intro
                  lightMode={theme === "light"}
                />
              </div>
            </BentoCard>

            <BentoCard aria-label="PhD" colSpan={2} tone="inverted">
              <BentoHeadline>PhD, Computer Science</BentoHeadline>
              <BentoBody className="mt-auto">
                Duke University · 2021 to 2026
              </BentoBody>
            </BentoCard>

            {/* ── Row 2: BSc Computer Science (2 cols, 1 row) ── */}
            <BentoCard
              aria-label="BSc, Computer Science"
              colSpan={2}
              tone="muted"
            >
              <BentoHeadline>BSc, Computer Science</BentoHeadline>
              <BentoBody className="mt-auto">
                University of Connecticut · 2017 to 2021, Summa Cum Laude
              </BentoBody>
            </BentoCard>

            {/* ── Row 3: Talks (2 cols, 3 rows) + Posters (2 cols, 1 row) + BSc Math (2 cols, 1 row) ── */}
            <BentoCard
              aria-label="Talks"
              colSpan={2}
              rowSpan={3}
              tone="accent"
            >
              <div className="flex items-baseline justify-between gap-2">
                <BentoHeadline>Talks</BentoHeadline>
                <span className="text-xs opacity-75">
                  10 invited &amp; conference
                </span>
              </div>
              <ul className="mt-3 flex flex-1 flex-col justify-between gap-2.5">
                {talks.map((talk) => (
                  <li
                    key={`${talk.title}-${talk.venue}`}
                    className="border-b border-current/15 pb-2 last:border-none last:pb-0"
                  >
                    <p className="text-sm leading-snug font-medium">
                      {talk.title}
                    </p>
                    <span className="text-xs opacity-75">{talk.venue}</span>
                  </li>
                ))}
              </ul>
            </BentoCard>

            <BentoCard aria-label="Posters" colSpan={2}>
              <div className="flex items-baseline justify-between gap-2">
                <BentoHeadline>Posters</BentoHeadline>
                <span className="text-xs text-muted-foreground">
                  3 presented
                </span>
              </div>
              <ul className="mt-3 flex flex-1 flex-col justify-between gap-2">
                {posters.map((poster) => (
                  <li
                    key={`${poster.title}-${poster.venue}`}
                    className="border-b border-border/60 pb-1.5 last:border-none last:pb-0"
                  >
                    <p className="line-clamp-1 text-sm font-medium">
                      {poster.title}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {poster.venue}
                    </span>
                  </li>
                ))}
              </ul>
            </BentoCard>

            <BentoCard aria-label="BSc, Mathematics" colSpan={2}>
              <BentoHeadline>BSc, Mathematics</BentoHeadline>
              <BentoBody className="mt-auto">
                University of Connecticut · 2017 to 2021, Summa Cum Laude
              </BentoBody>
            </BentoCard>

            {/* ── Row 4: Teaching Assistant (2 cols, 2 rows) + Topics and Tools (2 cols, 1 row) ── */}
            <BentoCard
              aria-label="Teaching Assistant"
              colSpan={2}
              rowSpan={2}
              tone="muted"
            >
              <div className="flex items-center justify-between gap-2">
                <BentoHeadline>Teaching Assistant</BentoHeadline>
                <Badge variant="outline">7 courses</Badge>
              </div>

              <div className="mt-4 flex flex-1 flex-col justify-between gap-4 divide-y divide-border">
                {teaching.map((group, index) => (
                  <div
                    key={group.institution}
                    className={cn(index > 0 && "pt-4")}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="font-semibold text-foreground">
                        {group.institution}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {group.count}
                      </span>
                    </div>
                    <ul className="mt-2 space-y-1.5 text-sm">
                      {group.courses.map((course) => (
                        <li
                          key={`${course.name}-${course.term}`}
                          className="flex items-baseline justify-between gap-3"
                        >
                          <span className="text-muted-foreground">
                            {course.name}
                          </span>
                          <span className="shrink-0 text-xs text-muted-foreground/80 tabular-nums">
                            {course.term}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </BentoCard>

            <BentoCard aria-label="Topics and Tools" colSpan={2}>
              <BentoHeadline>Topics &amp; Tools</BentoHeadline>
              <div className="mt-auto space-y-2.5">
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Optimal transport",
                    "Clustering",
                    "Computational geometry",
                    "Boosting",
                    "Approximation algorithms",
                  ].map((m) => (
                    <Badge key={m} variant="outline">
                      {m}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {["Python", "PyTorch"].map((t) => (
                    <Badge key={t} variant="secondary">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            </BentoCard>

            {/* ── Row 5: Find me (2 cols, 1 row) ── */}
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
          </BentoGrid>
        </section>
        <Separator />
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
            <AuthorHoverCard
              name="Pankaj K. Agarwal"
              link="https://users.cs.duke.edu/~pankaj/"
              position={[
                "RJR Nabisco Professor of Computer Science",
                "Professor of Mathematics<",
              ]}
              affiliation="Duke University"
            />
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
            I hold Bachelor's Degrees in Computer Science and Mathematics from
            the University of Connecticut. My undergraduate research was
            multifaceted: I wrote my honors thesis on the Ricci flow under
            negative curvature and collaborated on projects spanning geometric
            data analysis, phylogenetic tree comparison, and high-dimensional
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
