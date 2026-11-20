/** Used to emphasize the site owner in author lists. Must match the strings in `authors`. */
export const OWNER_NAME = "Keegan Yao";
export const ADVISOR_NAME = "P. K. Agarwal";

export type Publication = {
  /** URL slug, used by /publications/$publicationId. Keep it stable. */
  id: string;
  title: string;
  /** Canonical link to the paper (publisher, proceedings, or arXiv). */
  href: string;
  authors: string[];
  venueType: "conference" | "journal";
  conference: string;
  year: number;
  /** Free-form string, e.g. "11240–11253" or "182 pp." */
  pages: string;
  /** One or two sentences. Shown on the list page and used for meta description. */
  description: string;
  abstract: string;
  bibtex?: string;
  /** Powers the topic filter on the list page. */
  tags: string[];
  /** Extra resources (code, slides, OpenReview, video...). Labels and icons are inferred from the URL. */
  links: string[];
};

export const venueClasses = {
  conference:
    "border-transparent bg-venue-conference-soft text-venue-conference-soft-foreground",
  journal:
    "border-transparent bg-venue-journal-soft text-venue-journal-soft-foreground",
} as const;

const raw: Publication[] = [
  {
    id: "fast-alg-cont-ot-histograms",
    title:
      "Fast Algorithms for Continuous Optimal Transport between Histograms",
    authors: [ADVISOR_NAME, "S. Raghvendra", OWNER_NAME],
    venueType: "conference",
    href: "https://proceedings.neurips.cc/paper_files/paper/2025/file/3e8f3ca5a82f5511370af7ed0efcad0f-Paper-Conference.pdf",
    conference: "ESA",
    year: 2026,
    pages: "pp. 123:1–123:23",
    description:
      "First nearly-quadratic upper and lower bounds for (1+\u03B5)-approximate optimal transport between axis-aligned histograms.",
    abstract:
      "We give the first (relative) (1+ε)-approximation algorithm for the continuous optimal transport (OT) problem between two axis-aligned histograms in the plane, each of which is represented as a piecewise-constant function over a rectangular subdivision. Our algorithm runs in nearly quadratic time in the complexity of the histograms in the worst case. In contrast to the discrete and semi-discrete optimal transport problems, which always admit linear-size OT plans, we demonstrate that there is a quadratic lower bound on the complexity of even a (1+ε)-approximate OT plan in the continuous setting in the worst case. This suggests that the runtime of our approximation algorithm nearly matches the worst-case lower-bound complexity of an explicit (1+ε)-approximate OT plan between two histograms. We additionally provide near-linear time algorithms with either weaker approximation guarantees or restrictions on the input histograms.",
    bibtex: "",
    tags: [],
    links: [
      "https://www.proceedings.com/085713-1469.html",
      "https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.ESA.2026.123",
    ],
    featuredOrder: 3
  },
  {
    id: "scalable-const-approx-alg-for-wp-ot",
    title:
      "A Scalable Constant-Factor Approximation Algorithm for Wp Optimal Transport",
    authors: [ADVISOR_NAME, "O. Chubet", "S. Raghvendra", OWNER_NAME],
    venueType: "conference",
    href: "https://proceedings.iclr.cc/paper_files/paper/2026/file/55a117a6df437f29b286ff8e8094e145-Paper-Conference.pdf",
    conference: "ICLR",
    year: 2026,
    pages: "pp. 52080–52100",
    description:
      "Metric embeddings for constant approximate optimal transport and bottleneck distance in finite metric spaces.",
    abstract:
      "Let (X,d) be a metric space and let μ, ν be discrete probability distributions supported on finite point sets A, B ⊆X. For any p ∈[1,∞], the Wp-distance between μ and ν, Wp(μ, ν), is defined as the p-th root of the minimum cost of transporting all the probability mass from μ to ν, where moving a probability mass of δ from a ∈A to b ∈B incurs a cost of δd(a, b)p. We give a (Las Vegas) randomized algorithm that computes a (4+ε)-approximate Wp optimal-transport (OT) plan in O(n2 + (n3/2ε-1 log(n) logΔ)1+o(1) logU) time with probability at least 1-1/n, for all p ∈[1,∞], where ε> 0 is an arbitrarily small constant and ∆is the ratio between the largest and smallest interpoint distances in A ∪B. The previous best result achieved an O(log(n))-approximation in O(pn2) time, for constant values of p. Our algorithm significantly improves the approximation factor and, importantly, is the first quadratic-time method that extends to the W∞-distance. In contrast, additive approximation methods such as Sinkhorn are efficient only for constant p and fail to handle p=∞. Our algorithm also extends to a query model where, for any integer k > 1, we give an algorithm that preprocesses X into clusters in O(n2+kn1+1/k log(n) log Δ) time, after which a O(k)-approximate Wp distance between any two distributions μ and ν with X as support can be computed in O(n1+1/k log(n) log Δ)1+o(1) time with probability at most 1-1/n. Finally, for p=∞, we show that obtaining a relative approximation factor better than 2 in O(n2) time would resolve the long-standing open problem of computing a perfect matching in an arbitrary bipartite graph in quadratic time.",
    tags: [],
    links: ["https://iclr.cc/virtual/2026/poster/10009496"],
  },
  {
    id: "eff-alg-robust-partial-semi-discrete-ot",
    title:
      "Efficient Algorithms for Robust and Partial Semi-Discrete Optimal Transport",
    authors: [ADVISOR_NAME, "S. Raghvendra", "P. Shirzadian", OWNER_NAME],
    venueType: "conference",
    href: "https://proceedings.neurips.cc/paper_files/paper/2025/file/3e8f3ca5a82f5511370af7ed0efcad0f-Paper-Conference.pdf",
    conference: "NeurIPS",
    year: 2025,
    pages: "pp. 44053–44108",
    description:
      "Fast algorithms for noise-resilient and partial optimal transport.",
    abstract:
      "The sensitivity of optimal transport (OT) to noise has motivated the study of robust variants. In this paper, we study two such formulations of semi-discrete OT in ℝd: (i) the α-optimal partial transport, which minimizes the cost of transporting a mass of α, and (ii) the λ-robust optimal transport, which regularizes the OT problem using the total variation (TV) distance. First, we provide a novel characterization of the optimal solutions in these settings, showing they can be represented as a restricted Laguerre diagram. Second, we exploit this characterization to establish a strong algorithmic connection between the two problems, showing that any solver for one can be adapted to solve the other with comparable precision. Third, we overcome key challenges posed in extending the cost-scaling paradigm to compute these variants of OT and present an algorithm that computes the exact solution up to log(1/ε) bits of precision in nO(d)log(1/ε) time, where n is the support size of the discrete distribution. Finally, we present an n1+o(1)ε-O(d) time approximation algorithm for the above variants of OT",
    tags: [],
    links: ["https://www.proceedings.com/085713-1469.html"],
    featuredOrder: 2
  },
  {
    id: "eff-approx-alg-wasserstein-barycenter-euclidean-metric",
    title:
      "Efficient Approximation Algorithm for Computing Wasserstein Barycenter under Euclidean Metric",
    authors: [ADVISOR_NAME, "S. Raghvendra", "P. Shirzadian", OWNER_NAME],
    venueType: "conference",
    href: "https://par.nsf.gov/servlets/purl/10594268",
    conference: "SODA",
    year: 2025,
    pages: "pp. 4809–4826",
    description:
      "First near-linear time (1+\u03B5)-approximation algorithm for the 'average' of multiple distributions.",
    abstract:
      "Given a set of probability distributions, the Wasserstein barycenter problem asks to compute a distribution that minimizes the average Wasserstein distance, or optimal transport cost, from all the input distributions. Wasserstein barycenters preserve common geometric features of the input distributions, making them useful in machine learning and data analytics tasks.\n\n We present a near-linear time algorithm that computes the Wasserstein barycenter within a relative (1+ε)-approximation in fixed dimensions. We are not aware of an efficient relative-approximation algorithm for this problem even in two dimensions. To obtain our results, we first present a near-linear-time dynamic-programming-based primal-dual algorithm to compute an optimal Wasserstein barycenter under a tree metric. We then combine our tree-based algorithms with the boosting framework to obtain a (1+ε)-approximation in near-linear time.",
    tags: [],
    links: ["https://epubs.siam.org/doi/10.1137/1.9781611978322.163"],
    featuredOrder: 1
  },
  {
    id: "comb-algo-semi-disc-ot",
    title:
      "A Combinatorial Algorithm for the Semi-Discrete Optimal Transport Problem",
    authors: [ADVISOR_NAME, "S. Raghvendra", "P. Shirzadian", OWNER_NAME],
    venueType: "conference",
    href: "https://proceedings.neurips.cc/paper_files/paper/2024/file/2d950a2cfd8a75124c178a89545b97fd-Paper-Conference.pdf",
    conference: "NeurIPS",
    year: 2024,
    pages: "pp. 25857–25887",
    description:
      "Improved approximation algorithm for semi-discrete optimal transport in the Euclidean plane.",
    abstract:
      "We give the first (relative) (1+ε)-approximation algorithm for the continuous optimal transport (OT) problem between two axis-aligned histograms in the plane, each of which is represented as a piecewise-constant function over a rectangular subdivision. Our algorithm runs in nearly quadratic time in the complexity of the histograms in the worst case. In contrast to the discrete and semi-discrete optimal transport problems, which always admit linear-size OT plans, we demonstrate that there is a quadratic lower bound on the complexity of even a (1+ε)-approximate OT plan in the continuous setting in the worst case. This suggests that the runtime of our approximation algorithm nearly matches the worst-case lower-bound complexity of an explicit (1+ε)-approximate OT plan between two histograms. We additionally provide near-linear time algorithms with either weaker approximation guarantees or restrictions on the input histograms.",
    bibtex: "",
    tags: [],
    links: ["https://www.proceedings.com/079017-0812.html"],
  },
  {
    id: "fast-acc-approx-ot-semi-disc-and-disc-set",
    title:
      "Fast and Accurate Approximations of the Optimal Transport in Semi-Discrete and Discrete Settings",
    authors: [ADVISOR_NAME, "S. Raghvendra", "P. Shirzadian", OWNER_NAME],
    venueType: "conference",
    href: "https://par.nsf.gov/servlets/purl/10513306",
    conference: "SODA",
    year: 2024,
    pages: "pp. 52080–52100",
    description:
      "First \u03B5-approximation algorithms for semi-discrete optimal transport achieving either log\u03B5 dependence, or near-linear dependence in n, plus an improved discrete OT algorithm.",
    abstract:
      "Let (X,d) be a metric space and let μ, ν be discrete probability distributions supported on finite point sets A, B ⊆X. For any p ∈[1,∞], the Wp-distance between μ and ν, Wp(μ, ν), is defined as the p-th root of the minimum cost of transporting all the probability mass from μ to ν, where moving a probability mass of δ from a ∈A to b ∈B incurs a cost of δd(a, b)p. We give a (Las Vegas) randomized algorithm that computes a (4+ε)-approximate Wp optimal-transport (OT) plan in O(n2 + (n3/2ε-1 log(n) logΔ)1+o(1) logU) time with probability at least 1-1/n, for all p ∈[1,∞], where ε> 0 is an arbitrarily small constant and ∆is the ratio between the largest and smallest interpoint distances in A ∪B. The previous best result achieved an O(log(n))-approximation in O(pn2) time, for constant values of p. Our algorithm significantly improves the approximation factor and, importantly, is the first quadratic-time method that extends to the W∞-distance. In contrast, additive approximation methods such as Sinkhorn are efficient only for constant p and fail to handle p=∞. Our algorithm also extends to a query model where, for any integer k > 1, we give an algorithm that preprocesses X into clusters in O(n2+kn1+1/k log(n) log Δ) time, after which a O(k)-approximate Wp distance between any two distributions μ and ν with X as support can be computed in O(n1+1/k log(n) log Δ)1+o(1) time with probability at most 1-1/n. Finally, for p=∞, we show that obtaining a relative approximation factor better than 2 in O(n2) time would resolve the long-standing open problem of computing a perfect matching in an arbitrary bipartite graph in quadratic time.",
    tags: [],
    links: ["https://epubs.siam.org/doi/10.1137/1.9781611977912.159"],
    featuredOrder: 4
  },
  {
    id: "quant-samp-fin-key-rates-hi-dim-quant-crypto",
    title:
      "Quantum Sampling for Finite Key Rates in High Dimensional Quantum Cryptography",
    authors: [OWNER_NAME, "W. O. Krawec", "J. Zhu"],
    venueType: "journal",
    href: "https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=9676613",
    conference: "IEEE Trans. Inf. Theory",
    year: 2022,
    pages: "pp. 44053–44108",
    description:
      "Strengthening entropic uncertainty relations via quantum sampling, with applications in quantum cryptography.",
    abstract:
      "The sensitivity of optimal transport (OT) to noise has motivated the study of robust variants. In this paper, we study two such formulations of semi-discrete OT in ℝd: (i) the α-optimal partial transport, which minimizes the cost of transporting a mass of α, and (ii) the λ-robust optimal transport, which regularizes the OT problem using the total variation (TV) distance. First, we provide a novel characterization of the optimal solutions in these settings, showing they can be represented as a restricted Laguerre diagram. Second, we exploit this characterization to establish a strong algorithmic connection between the two problems, showing that any solver for one can be adapted to solve the other with comparable precision. Third, we overcome key challenges posed in extending the cost-scaling paradigm to compute these variants of OT and present an algorithm that computes the exact solution up to log(1/ε) bits of precision in nO(d)log(1/ε) time, where n is the support size of the discrete distribution. Finally, we present an n1+o(1)ε-O(d) time approximation algorithm for the above variants of OT",
    tags: [],
    links: ["https://ieeexplore.ieee.org/document/9676613"],
  },
  {
    id: "optimal-compl-comp-incompl-phylogenetic-tree-under-robinson-foulds-distance",
    title:
      "Optimal Completion and Comparison of Incomplete Phylogenetic Trees under Robinson-Foulds Distance",
    authors: [OWNER_NAME, "M. S. Bansal"],
    venueType: "conference",
    href: "https://drops.dagstuhl.de/storage/00lipics/lipics-vol191-cpm2021/LIPIcs.CPM.2021.25/LIPIcs.CPM.2021.25.pdf",
    conference: "CPM",
    year: 2021,
    pages: "pp. 4809–4826",
    description:
      "Efficiently computing the completion of two trees with minimum Robinson-Foulds distance, and a near-linear time 2-approximation.",
    abstract:
      "Given a set of probability distributions, the Wasserstein barycenter problem asks to compute a distribution that minimizes the average Wasserstein distance, or optimal transport cost, from all the input distributions. Wasserstein barycenters preserve common geometric features of the input distributions, making them useful in machine learning and data analytics tasks.\n\n We present a near-linear time algorithm that computes the Wasserstein barycenter within a relative (1+ε)-approximation in fixed dimensions. We are not aware of an efficient relative-approximation algorithm for this problem even in two dimensions. To obtain our results, we first present a near-linear-time dynamic-programming-based primal-dual algorithm to compute an optimal Wasserstein barycenter under a tree metric. We then combine our tree-based algorithms with the boosting framework to obtain a (1+ε)-approximation in near-linear time.",
    tags: [],
    links: [
      "https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.CPM.2021.25",
    ],
  },
];

/** Newest first. Ties keep the order written above. */
export const publications: Publication[] = [...raw].sort(
  (a, b) => b.year - a.year
);

/** Newest first. Ties keep the order written in the data file. */
export const allPublications: Publication[] = [...publications].sort(
  (a, b) => b.year - a.year
);

export const venues: string[] = [
  ...new Set(allPublications.map((p) => p.conference)),
];

export function getPublication(id: string): Publication | undefined {
  return allPublications.find((p) => p.id === id);
}

export function getAdjacent(id: string) {
  const i = allPublications.findIndex((p) => p.id === id);
  return {
    newer: i > 0 ? allPublications[i - 1] : null,
    older:
      i >= 0 && i < allPublications.length - 1 ? allPublications[i + 1] : null,
  };
}

export function matchesQuery(p: Publication, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [
    p.title,
    p.description,
    p.abstract,
    p.conference,
    String(p.year),
    ...p.authors,
  ]
    .join(" ")
    .toLowerCase()
    .includes(q);
}

export function formatCitation(p: Publication): string {
  return `${p.authors.join(", ")}. ${p.title}. ${p.conference} ${p.year}, pp. ${p.pages}.`;
}

export type LinkKind = "code" | "pdf" | "external";

/** Turns a raw URL into a human label so the data file only needs URLs. */
export function describeLink(url: string): { label: string; kind: LinkKind } {
  let host = "";
  let path = "";
  try {
    const u = new URL(url);
    host = u.hostname.replace(/^www\./, "");
    path = u.pathname.toLowerCase();
  } catch {
    return { label: url, kind: "external" };
  }
  if (host === "github.com" || host === "gitlab.com")
    return { label: "Code", kind: "code" };
  if (path.endsWith(".pdf")) return { label: "PDF", kind: "pdf" };
  if (host === "arxiv.org") return { label: "arXiv", kind: "external" };
  if (host === "openreview.net")
    return { label: "OpenReview", kind: "external" };
  if (host.includes("youtube.com") || host === "youtu.be")
    return { label: "Video", kind: "external" };
  if (host.includes("speakerdeck.com") || host.includes("slides"))
    return { label: "Slides", kind: "external" };
  return { label: host, kind: "external" };
}
