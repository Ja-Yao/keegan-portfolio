import { createFileRoute, Link } from "@tanstack/react-router";
import { ListFilter, Search, X } from "lucide-react";

import Particles from "@/components/Particles";
import { PublicationLinks } from "@/components/publication-parts";
import { useTheme } from "@/components/theme-provider";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
DropdownMenu,
DropdownMenuCheckboxItem,
DropdownMenuContent,
DropdownMenuGroup,
DropdownMenuItem,
DropdownMenuLabel,
DropdownMenuSeparator,
DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { allPublications, matchesQuery, venues } from "@/lib/publications";
import { cn } from "cn";
import { useState } from "react";

type PublicationsSearch = {
q?: string;
venue?: string[];
};

export const Route = createFileRoute("/publications/")({
// Filters live in the URL so a filtered view can be shared or bookmarked.
validateSearch: (search: Record<string, unknown>): PublicationsSearch => {
const raw = Array.isArray(search.venue)
? search.venue
: typeof search.venue === "string"
? [search.venue]
: [];
const valid = raw.filter(
(v): v is string => typeof v === "string" && venues.includes(v)
);
return {
q: typeof search.q === "string" && search.q ? search.q : undefined,
venue: valid.length ? valid : undefined,
};
},
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
const { theme } = useTheme();
const { q, venue: selected = [] } = Route.useSearch();
const navigate = Route.useNavigate();
const [query, setQuery] = useState(q ?? "");

const results = allPublications.filter(
(p) =>
(selected.length === 0 || selected.includes(p.conference)) &&
matchesQuery(p, query)
);

const byYear = (() => {
const groups = new Map<number, typeof results>();
for (const p of results) {
groups.set(p.year, [...(groups.get(p.year) ?? []), p]);
}
return [...groups.entries()];
})();

const hasFilters = Boolean(query || selected.length);

function updateQuery(value: string) {
setQuery(value);
navigate({
search: (prev) => ({ ...prev, q: value || undefined }),
replace: true,
});
}

function updateVenues(next: string[]) {
navigate({
search: (prev) => ({ ...prev, venue: next.length ? next : undefined }),
replace: true,
});
}

function toggleVenue(v: string, checked: boolean) {
updateVenues(checked ? [...selected, v] : selected.filter((x) => x !== v));
}

function clearFilters() {
setQuery("");
navigate({ search: {}, replace: true });
}

return (
<div className="mx-auto w-full max-w-384 px-4 py-10 sm:px-6 md:py-16 lg:px-8">
<div className="relative isolate h-100 overflow-hidden">
<div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full w-full mask-[linear-gradient(to_right,transparent,black_15%,black_85%,transparent),linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] mask-intersect">
<Particles
particleColors={["#fff", "#839156", "#c86d2d"]}
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
lightMode={theme === "light"}
/>
</div>
<div className="relative max-w-2xl rounded-[min(var(--radius-4xl),24px)] border border-border p-6 backdrop-blur-md">
<h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
Publications
</h1>
<p className="mt-4 text-lg text-pretty text-muted-foreground">
Research on optimal transport: how to move one distribution onto
another at the lowest cost, and what that makes possible in machine
learning.
</p>
</div>
</div>
<div className="mt-10 flex flex-col gap-4 border-b pb-6">
<div className="flex items-center gap-3">
<div className="relative min-w-0 flex-1 lg:max-w-xl">
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
className="h-11 w-full pl-9 text-base md:text-sm"
/>
</div>

<DropdownMenu>
<DropdownMenuTrigger
className={cn(
buttonVariants({
variant: selected.length ? "default" : "outline",
size: "lg",
}),
"h-11 shrink-0 rounded-full"
)}
>
<ListFilter aria-hidden="true" />
Filters
{selected.length > 0 && (
<span className="tabular-nums">({selected.length})</span>
)}
</DropdownMenuTrigger>
<DropdownMenuContent align="end" className="w-56">
<DropdownMenuGroup>
<DropdownMenuLabel>Venue</DropdownMenuLabel>
{venues.map((v) => (
<DropdownMenuCheckboxItem
key={v}
checked={selected.includes(v)}
onCheckedChange={(checked) => toggleVenue(v, checked)}
>
{v}
</DropdownMenuCheckboxItem>
))}
</DropdownMenuGroup>
<DropdownMenuSeparator />
<DropdownMenuItem
disabled={selected.length === 0}
onClick={() => updateVenues([])}
>
Clear venues
</DropdownMenuItem>
</DropdownMenuContent>
</DropdownMenu>
</div>

<div className="flex min-h-8 items-center justify-between text-sm text-muted-foreground">
<div className="flex flex-wrap items-center gap-2">
<p role="status" aria-live="polite" className="mr-1">
{results.length}{" "}
{results.length === 1 ? "publication" : "publications"}
</p>
{selected.map((v) => (
<Button
key={v}
variant="secondary"
size="sm"
aria-label={`Remove ${v} filter`}
onClick={() => toggleVenue(v, false)}
className="rounded-full"
>
{v}
<X aria-hidden="true" />
</Button>
))}
</div>
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
                      {p.authors?.length > 0 && (
                        <p className="mt-1 text-sm text-muted-foreground">
                          {p.authors.map((author, index) => (
                            <span key={author}>
                              {index > 0 && ", "}
                              <span
                                className={
                                  author === "Keegan Yao" ? "font-medium text-foreground" : undefined
                                }
                              >
                                {author}
                              </span>
                            </span>
                          ))}
                        </p>
                      )}
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
