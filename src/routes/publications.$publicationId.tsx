import {
  createFileRoute,
  Link,
  notFound,
  useNavigate,
} from "@tanstack/react-router";
import { Check, ChevronLeft, ChevronRight, Copy, FileText } from "lucide-react";
import * as React from "react";

import { Authors, PublicationLinks } from "@/components/publication-parts";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button, buttonVariants } from "@/components/ui/button";
import type { Publication } from "@/lib/publications";
import {
  formatCitation,
  getAdjacent,
  getPublication,
} from "@/lib/publications";

export const Route = createFileRoute("/publications/$publicationId")({
  loader: ({ params }) => {
    const publication = getPublication(params.publicationId);
    if (!publication) throw notFound();
    return { publication, ...getAdjacent(params.publicationId) };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.publication.title ?? "Publication" },
      {
        name: "description",
        content: loaderData?.publication.description ?? "",
      },
    ],
  }),
  notFoundComponent: PublicationNotFound,
  component: PublicationPage,
});

const conferenceStyles =
  "bg-(--venue-conference-soft) text-(--venue-conference-soft-foreground) text-md" as const;
const journalStyles =
  "bg-(--venue-conference-soft) text-(--venue-conference-soft-foreground) text-md" as const;

function PublicationPage() {
  const { publication: p, newer, older } = Route.useLoaderData();
  const [copied, setCopied] = React.useState(false);

  async function copyCitation() {
    try {
      await navigator.clipboard.writeText(formatCitation(p));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be unavailable (insecure context); fail quietly.
    }
  }

  return (
    <article className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-14 lg:px-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              render={<Link to="/publications">Publications</Link>}
            />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="min-w-0">
            <BreadcrumbPage className="block max-w-56 truncate sm:max-w-md">
              {p.title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="mt-8 max-w-7xl">
        <Badge
          className={
            p.venueType === "conference" ? conferenceStyles : journalStyles
          }
        >
          {p.conference} {p.year}
        </Badge>
        <h1 className="mt-4 text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl md:text-7xl">
          {p.title}
        </h1>
        <p className="mt-4">
          <Authors authors={p.authors} />
        </p>
        <p className="mt-6 text-lg text-pretty text-muted-foreground">
          {p.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={p.href}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ variant: "default" })}
          >
            <FileText aria-hidden="true" />
            Read the paper
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <Button variant="outline" onClick={copyCitation}>
            {copied ? (
              <Check aria-hidden="true" />
            ) : (
              <Copy aria-hidden="true" />
            )}
            {copied ? "Copied" : p.bibtex ? "Copy BibTeX" : "Copy citation"}
          </Button>
          <span role="status" className="sr-only">
            {copied ? "Citation copied to clipboard" : ""}
          </span>
        </div>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
        <section aria-labelledby="abstract-heading">
          <h2 id="abstract-heading" className="text-lg font-semibold">
            Abstract
          </h2>
          <div className="mt-3 max-w-[65ch] space-y-4 text-lg leading-8">
            {p.abstract.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>

        <aside className="lg:sticky lg:top-8 lg:self-start">
          <DetailList p={p} />
          {p.links.length > 0 && (
            <div className="mt-8">
              <h2 className="mb-3 text-sm font-semibold">Resources</h2>
              <PublicationLinks links={p.links} stacked />
            </div>
          )}
        </aside>
      </div>

      <nav
        aria-label="More publications"
        className="mt-16 grid gap-3 border-t pt-8 sm:grid-cols-2"
      >
        {newer ? <AdjacentLink p={newer} direction="newer" /> : <span />}
        {older ? <AdjacentLink p={older} direction="older" /> : <span />}
      </nav>
    </article>
  );
}

function DetailList({ p }: { p: Publication }) {
  const rows = [
    ["Venue", p.conference],
    ["Year", String(p.year)],
    ["Pages", p.pages],
  ] as const;
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 border-t pt-4 text-sm">
      {rows.map(([label, value]) => (
        <React.Fragment key={label}>
          <dt className="text-md text-muted-foreground">{label}</dt>
          <dd className="tabular-nums">
            <Badge
              variant="ghost"
              className="text-md"
              // className={
              //   p.venueType === "conference" ? conferenceStyles : journalStyles
              // }
            >
              {value}
            </Badge>
          </dd>
        </React.Fragment>
      ))}
    </dl>
  );
}

function AdjacentLink({
  p,
  direction,
}: {
  p: Publication;
  direction: "newer" | "older";
}) {
  const isOlder = direction === "older";
  return (
    <Link
      to="/publications/$publicationId"
      params={{ publicationId: p.id }}
      className={`group flex flex-col gap-1 rounded-lg border p-4 transition-colors outline-none hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring ${
        isOlder ? "sm:items-end sm:text-right" : ""
      }`}
    >
      <span className="flex items-center gap-1 text-sm text-muted-foreground">
        {!isOlder && <ChevronLeft aria-hidden="true" className="size-4" />}
        {isOlder ? "Older" : "Newer"}
        {isOlder && <ChevronRight aria-hidden="true" className="size-4" />}
      </span>
      <span className="line-clamp-2 text-lg leading-snug">{p.title}</span>
    </Link>
  );
}

function PublicationNotFound() {
  const { publicationId } = Route.useParams();
  const navigate = useNavigate();
  return (
    <div className="mx-auto w-full max-w-xl px-4 py-24 text-center">
      <h1 className="text-3xl font-semibold">Publication not found</h1>
      <p className="mt-3 text-muted-foreground">
        There is no publication with the ID “{publicationId}”. It may have been
        renamed or removed.
      </p>
      <Button
        className="mt-8"
        onClick={() => navigate({ to: "/publications" })}
      >
        View all publications
      </Button>
    </div>
  );
}
