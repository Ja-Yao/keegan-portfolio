import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";

import Particles from "@/components/Particles";
import { PublicationLinks } from "@/components/publication-parts";
import { useTheme } from "@/components/theme-provider";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { allPublications, matchesQuery, venues } from "@/lib/publications";
import { useState } from "react";

type PublicationsSearch = {
  q?: string;
  venue?: string;
};

export const Route = createFileRoute("/publications/")({
  // Filters live in the URL so a filtered view can be shared or bookmarked.
  validateSearch: (search: Record<string, unknown>): PublicationsSearch => ({
    q: typeof search.q === "string" && search.q ? search.q : undefined,
    venue:
      typeof search.venue === "string" && venues.includes(search.venue)
        ? search.venue
        : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Publications" },
      {
        name: "description",
        content:
          "Papers on optimal transport and its applications in machine learning.",
      },
    ],
  }),
  component: PublicationsPage,
});

const conferenceStyles =
  "bg-(--venue-conference-soft) text-(--venue-conference-soft-foreground) text-md" as const;
const journalStyles = buttonVariants({ variant: "destructive" });

function PublicationsPage() {
  const { q, venue } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [query, setQuery] = useState(q ?? "");
  const { theme } = useTheme();

  const results = allPublications.filter(
    (p) => (!venue || p.conference === venue) && matchesQuery(p, query)
  );

  const byYear = (() => {
    const groups = new Map<number, typeof results>();
    for (const p of results) {
      groups.set(p.year, [...(groups.get(p.year) ?? []), p]);
    }
    return [...groups.entries()];
  })();

  const hasFilters = Boolean(query || venue);

  function updateQuery(value: string) {
    setQuery(value);
    navigate({
      search: (prev) => ({ ...prev, q: value || undefined }),
      replace: true,
    });
  }

  function updateVenue(next: string | undefined) {
    navigate({ search: (prev) => ({ ...prev, venue: next }), replace: true });
  }

  function clearFilters() {
    setQuery("");
    navigate({ search: {}, replace: true });
  }

  return (
    <div className="mx-auto w-full max-w-384 px-4 py-10 sm:px-6 md:py-16 lg:px-8">
      <div className="flex flex-row justify-between align-middle">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Publications
          </h1>
          <p className="mt-4 text-lg text-pretty text-muted-foreground">
            Research on optimal transport: how to move one distribution onto
            another at the lowest cost, and what that makes possible in machine
            learning.
          </p>
        </div>
        <div className="hidden h-100 w-full rounded-full mask-[radial-gradient(ellipse_at_center,black_45%,transparent_80%)] md:block">
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
            connections
            connectionDistance={110}
            particleHoverFactor={1}
            hoverRadius={140}
            drift="none"
            driftSpeed={1}
            alphaParticles
            cameraDistance={20}
            variation={6}
            opacity={1}
            clickBurst={false}
            intro={false}
            lightMode={theme === "light"}
          />
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-4 border-b pb-6 md:mt-14">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <div className="relative lg:w-80 lg:shrink-0">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="search"
              value={query}
              onChange={(e) => updateQuery(e.target.value)}
              placeholder="Search titles, authors, and abstracts"
              aria-label="Search publications"
              className="h-11 pl-9 text-base md:w-lg md:text-sm"
            />
          </div>

          <div
            role="group"
            aria-label="Filter by venue"
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0 lg:justify-end"
          >
            <Button
              size="lg"
              variant={!venue ? "default" : "outline"}
              aria-pressed={!venue}
              onClick={() => updateVenue(undefined)}
              className="shrink-0 rounded-full"
            >
              All venues
            </Button>
            {venues.map((v) => (
              <Button
                key={v}
                size="lg"
                variant={venue === v ? "default" : "outline"}
                aria-pressed={venue === v}
                onClick={() => updateVenue(venue === v ? undefined : v)}
                className="shrink-0 rounded-full"
              >
                {v}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex min-h-8 items-center justify-between text-sm text-muted-foreground">
          <p role="status" aria-live="polite">
            {results.length}{" "}
            {results.length === 1 ? "publication" : "publications"}
          </p>
          {hasFilters && (
            <Button variant="ghost" size="lg" onClick={clearFilters}>
              Clear filters
            </Button>
          )}
        </div>
      </div>

      {results.length === 0 ? (
        <div className="py-20 text-center">
          <h2 className="text-2xl">No publications found</h2>
          <p className="mx-auto mt-2 max-w-sm text-muted-foreground">
            Try a different search term or remove the venue filter.
          </p>
          <Button variant="outline" className="mt-6" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="divide-y">
          {byYear.map(([year, items]) => (
            <section
              key={year}
              aria-labelledby={`year-${year}`}
              className="grid gap-2 py-8 md:grid-cols-[7rem_minmax(0,1fr)] md:gap-8"
            >
              <h2
                id={`year-${year}`}
                className="text-2xl text-muted-foreground tabular-nums md:sticky md:top-6 md:self-start"
              >
                {year}
              </h2>
              <ul className="flex flex-col gap-1">
                {items.map((p) => (
                  <li
                    key={p.id}
                    className="relative -mx-3 grid gap-3 rounded-lg px-3 py-4 transition-colors hover:bg-muted/60 lg:grid-cols-[minmax(0,1fr)_13rem] lg:gap-10"
                  >
                    <div>
                      <h3 className="text-xl leading-snug font-medium text-balance">
                        <Link
                          to="/publications/$publicationId"
                          params={{ publicationId: p.id }}
                          className="rounded-lg outline-none after:absolute after:inset-0 after:rounded-lg focus-visible:after:ring-2 focus-visible:after:ring-ring"
                        >
                          {p.title}
                        </Link>
                      </h3>
                      <p className="mt-2 line-clamp-2 max-w-[68ch] text-muted-foreground">
                        {p.description}
                      </p>
                    </div>
                    <div className="flex flex-col gap-3 lg:items-start lg:pt-1">
                      <p className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <Badge
                          className={
                            p.venueType === "conference"
                              ? conferenceStyles
                              : journalStyles
                          }
                        >
                          {p.conference}
                        </Badge>
                        <Badge variant="outline" className="text-md">
                          {p.pages}
                        </Badge>
                      </p>
                      {/* relative + z-10 lifts external links above the row's stretched link */}
                      <PublicationLinks
                        links={p.links}
                        className="relative z-10"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
