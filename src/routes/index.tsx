import profileImage from "@/assets/profile1.jpeg";
import { Badge } from "@/components/ui/badge";
import {
  BentoBody,
  BentoCard,
  BentoGrid,
  BentoHeadline,
  BentoLabel,
} from "@/components/ui/bento";
import { publications } from "@/lib/publications";
import { socials } from "@/lib/constants";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Mail } from "lucide-react";

export const Route = createFileRoute("/")({ component: App });

function App() {
  const featured = publications.slice(0, 4);

  return (
    <main className="mx-auto h-fit w-full max-w-350 px-4 pt-4 pb-16 sm:px-6 sm:py-6 2xl:max-w-[1760px]">
      {/*
        Desktop (6 cols) relies on grid-flow-dense auto-placement, so the DOM
        order is: name, photo, contact, papers. That resolves to
          name    (4x2) | photo (2x2)
          contact (2x2) | papers (4x2)
      */}
      <BentoGrid className="@3xl:auto-rows-[minmax(clamp(7rem,max(14cqw,calc((100svh-10rem)/4)),22rem),auto)]">
        {/* Name */}
        <BentoCard colSpan={4} rowSpan={2} tone="pastel">
          {/* pb-[0.1em] keeps the "g" descender clear of the bio below */}
          <BentoHeadline
            role="heading"
            aria-level={1}
            size="lg"
            className="pb-[0.1em] text-[clamp(2.75rem,7.5cqw,9rem)] leading-[0.9] tracking-tighter"
          >
            Keegan Yao
          </BentoHeadline>
          <BentoBody className="max-w-[68ch] text-2xl">
            I develop scalable algorithms for Optimal Transport (OT) by
            leveraging the geometric and structural properties of its solutions.
            My research combines continuous and combinatorial optimization to
            advance machine learning and data science.
          </BentoBody>
          <BentoLabel className="mt-auto text-[clamp(1rem,1.6cqw,1.5rem)]">
            Computer Science Researcher
          </BentoLabel>
        </BentoCard>

        {/* Photo (full-bleed) */}
        <BentoCard
          colSpan={2}
          rowSpan={2}
          className="relative min-h-72 p-0 @3xl:min-h-0"
        >
          <img
            src={profileImage}
            alt="Portrait of Keegan Yao"
            width={640}
            height={640}
            loading="eager"
            className="absolute inset-0 size-full object-cover object-[50%_40%]"
          />
        </BentoCard>

        {/* Contact */}
        <BentoCard
          colSpan={2}
          rowSpan={2}
          tone="accent"
          title="Contact"
          icon={Mail}
        >
          <BentoBody className="text-2xl">
            Open to research collaborations or questions about Optimal
            Transport. Please reach out via email or connect below.
          </BentoBody>
          <ul className="mt-auto flex flex-col gap-1">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  className="inline-flex w-full items-center gap-3 text-[clamp(1rem,1.7cqw,1.5rem)] font-medium underline-offset-4 hover:underline"
                >
                  <span className="[&>svg]:size-[0.9em]" aria-hidden="true">
                    {s.icon}
                  </span>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </BentoCard>

        {/* Papers */}
        <BentoCard
          colSpan={4}
          rowSpan={2}
          title="Selected work"
          icon={BookOpen}
          className="order-1 @3xl:order-0"
        >
          <ul className="flex flex-1 flex-col divide-y divide-foreground/10">
            {featured.map((item) => (
              <li key={item.id} className="flex flex-1">
                <Link
                  to="/publications/$publicationId"
                  params={{ publicationId: item.id }}
                  className="flex w-full flex-col items-start justify-center gap-2 px-4 py-3 transition-colors hover:bg-muted"
                >
                  <div className="flex w-full flex-row justify-between align-middle">
                    <span className="line-clamp-3 leading-snug font-medium">
                      {item.title}
                    </span>
                    <Badge
                      className={
                        item.venueType === "conference"
                          ? "bg-(--venue-conference-soft) text-(--venue-conference-soft-foreground)"
                          : "bg-(--venue-journal-soft) text-(--venue-journal-soft-foreground)"
                      }
                    >
                      {item.conference}
                    </Badge>
                  </div>
                  <span className="line-clamp-3 text-sm leading-snug text-muted-foreground">
                    {item.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/publications"
            className="self-start text-sm underline-offset-4 opacity-70 hover:underline hover:opacity-100"
          >
            View all publications
          </Link>
        </BentoCard>
      </BentoGrid>
    </main>
  );
}
