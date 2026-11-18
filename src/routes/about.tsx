import { AuthorHoverCard } from "@/components/author-hover-card";
import Particles from "@/components/Particles";
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
import { posters, socials, talks, teaching } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, Download, FlaskConical, ImageIcon } from "lucide-react";
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
            className="size-full object-fill"
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
        <div className="typeset max-w-prose text-[1.125rem] text-muted-foreground [&_strong]:text-foreground">
          {children}
        </div>
      </div>
      <div className={cn(flip && "md:order-1")}>{figure}</div>
    </section>
  );
}

function AboutPage() {
  const termsOf = (t: string | readonly string[]) =>
    typeof t === "string" ? [t] : t;

  const termCount = teaching.reduce(
    (n, g) => n + g.courses.reduce((m, c) => m + termsOf(c.term).length, 0),
    0
  );

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
                className={buttonVariants({ variant: "default", size: "lg" })}
              >
                <Download aria-hidden /> Download CV
              </a>
              <a
                href="#phd"
                className={buttonVariants({ size: "lg", variant: "ghost" })}
              >
                Read my story <ArrowDown aria-hidden />
              </a>
            </div>
          </div>
        </section>
        <Separator />
        {/* ------------------------------ Bento Grid ------------------------------ */}
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
            {/* ── Dissertation (4 cols, 2 rows) + Education + Links stacked beside it ── */}
            <BentoCard
              title="Dissertation"
              icon={FlaskConical}
              colSpan={4}
              rowSpan={2}
              tone="pastel"
              className="relative overflow-hidden"
            >
              <BentoHeadline size="lg" className="z-10">
                Scalable optimal transport for geometric data
              </BentoHeadline>
              <div className="h-100 w-full mask-[linear-gradient(to_right,transparent,black_15%,black_85%,transparent),linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] mask-intersect">
                <Particles
                  particleColors={["#fff", "#fff", "#c86d2d"]}
                  particleCount={2660}
                  particleSpread={12}
                  speed={0.025}
                  particleBaseSize={100}
                  glow={0.4}
                  twinkle={0.2}
                  moveParticlesOnHover={false}
                  sizeRandomness={1.5}
                  shape="circle"
                  drift="none"
                  driftSpeed={1}
                  alphaParticles
                  cameraDistance={20}
                  disableRotation
                  variation={6}
                  opacity={1}
                  clickBurst={false}
                  intro
                />
              </div>
            </BentoCard>

            <BentoCard aria-label="Education" colSpan={2}>
              <BentoHeadline>Education</BentoHeadline>
              <ul className="mt-auto space-y-3">
                <li>
                  <p className="font-semibold">PhD, Computer Science</p>
                  <BentoBody>Duke University · 2026</BentoBody>
                </li>
                <li>
                  <p className="font-semibold">
                    BSc, Computer Science &amp; Mathematics
                  </p>
                  <BentoBody>
                    University of Connecticut · 2021, Summa Cum Laude
                  </BentoBody>
                </li>
              </ul>
            </BentoCard>

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
              <BentoBody>Based in Burlington, VT</BentoBody>
            </BentoCard>

            {/* ── Talks (2 cols, 3 rows) + Posters + Teaching + Topics ── */}
            <BentoCard
              aria-label="Talks"
              colSpan={2}
              rowSpan={3}
              tone="accent"
              className="@xl:row-span-2"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                <BentoHeadline>Talks</BentoHeadline>
                <span className="text-xs whitespace-nowrap opacity-75">
                  10 invited &amp; conference
                </span>
              </div>
              <ul className="mt-3 flex flex-1 flex-col justify-between gap-2.5">
                {talks.map((talk) => (
                  <li
                    key={`${talk.title}-${talk.venue}`}
                    className="border-b border-current/15 pb-2 last:border-none last:pb-0"
                  >
                    <p className="text-sm leading-snug">{talk.title}</p>
                    <span className="text-xs font-semibold">{talk.venue}</span>
                  </li>
                ))}
              </ul>
            </BentoCard>

            <BentoCard aria-label="Posters" colSpan={2} rowSpan={2}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                <BentoHeadline>Posters</BentoHeadline>
                <span className="text-xs whitespace-nowrap text-muted-foreground">
                  3 presented
                </span>
              </div>
              <ul className="mt-3 flex flex-col gap-3">
                {posters.map((poster) => (
                  <li
                    key={`${poster.title}-${poster.venue}`}
                    className="border-b border-border/60 pb-3 last:border-none last:pb-0"
                  >
                    <p className="text-sm font-medium text-pretty">
                      {poster.title}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {poster.venue}
                    </span>
                  </li>
                ))}
              </ul>
            </BentoCard>

            <BentoCard
              aria-label="Teaching Assistant"
              colSpan={2}
              rowSpan={2}
              tone="muted"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <BentoHeadline>Teaching Assistant</BentoHeadline>
                <Badge variant="outline" className="shrink-0">
                  {termCount} terms
                </Badge>
              </div>

              <div className="flex flex-1 flex-col justify-evenly gap-3">
                {teaching.map((group, _) => (
                  <div key={group.institution}>
                    <div className="flex items-baseline justify-between gap-2">
                      <BentoLabel className="opacity-100">
                        {group.institution}
                      </BentoLabel>
                      <span className="shrink-0 text-xs whitespace-nowrap text-muted-foreground">
                        {group.courses.length} courses
                      </span>
                    </div>
                    <ul className="mt-2 space-y-1.5 text-sm">
                      {group.courses.map((course) => (
                        <li
                          key={`${course.name}-${course.term}`}
                          className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5"
                        >
                          <span className="text-muted-foreground">
                            {course.name}
                          </span>
                          <span className="ml-auto shrink-0 text-xs text-muted-foreground/80 tabular-nums">
                            {termsOf(course.term).join(", ")}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </BentoCard>

            <BentoCard aria-label="Topics and Tools" colSpan={4}>
              <BentoHeadline>Topics &amp; Tools</BentoHeadline>
              <div className="mt-auto space-y-2.5">
                <div className="flex flex-col gap-2">
                  <BentoLabel>Topics</BentoLabel>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Optimal transport",
                      "Clustering",
                      "Computational geometry",
                      "Boosting",
                      "Approximation algorithms",
                    ].map((m) => (
                      <Badge key={m} variant="secondary">
                        {m}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <BentoLabel>Tools</BentoLabel>
                  <div className="flex flex-wrap gap-1.5">
                    {["Python", "PyTorch"].map((t) => (
                      <Badge key={t} variant="outline">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
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
              src="https://commons.wikimedia.org/wiki/Special:FilePath/Duke_Chapel,_West_Campus,_Duke_University,_Durham,_NC_(48960364438).jpg"
              alt="Photo of Duke University Campus"
              caption="Duke Chapel, West Campus, Duke University, Durham, NC. Photo by Warren LeMay via Wikimedia Commons (CC0 1.0)."
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
                "Professor of Mathematics",
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
              src="https://commons.wikimedia.org/wiki/Special:FilePath/Campus_view_-_University_of_Connecticut_-_DSC09948.JPG"
              alt="Photo from undergrad: campus, lab, or graduation"
              caption="Campus view of the University of Connecticut. Photo by Daderot via Wikimedia Commons (CC0 1.0)."
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
            Open to research collaborations or questions about Optimal
            Transport. Please reach out via email or connect below.
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
            <li key={socials.at(1)!.label}>
              <a
                href={socials.at(1)!.href}
                className={buttonVariants({
                  variant: "secondary",
                  size: "lg",
                })}
              >
                {socials.at(1)!.icon}
                {socials.at(1)!.label}
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
