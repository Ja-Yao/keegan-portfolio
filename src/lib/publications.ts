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
      `We give the first (relative) $(1+\\varepsilon)$-approximation algorithm for the continuous optimal transport (OT) problem between two axis-aligned histograms in the plane, each of which is represented as a piecewise-constant function over a rectangular subdivision.
      
      Our algorithm runs in nearly quadratic time in the complexity of the histograms in the worst case.
      
      In contrast to the discrete and semi-discrete optimal transport problems, which always admit linear-size OT plans, we demonstrate that there is a quadratic lower bound on the complexity of even a $(1+\\varepsilon)$-approximate OT plan in the continuous setting in the worst case.
      
      This suggests that the runtime of our approximation algorithm nearly matches the worst-case lower-bound complexity of an explicit $(1+\\varepsilon)$-approximate OT plan between two histograms.
      
      We additionally provide near-linear time algorithms with either weaker approximation guarantees or restrictions on the input histograms.
      `,
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
      `Let $(X,d)$ be a metric space and let $\\mu, \\nu$ be discrete probability distributions supported on finite point sets $A, B \\subseteq X$. For any $p \\in [1,\\infty]$, the $W_p$-distance between $\\mu$ and $\\nu$, $W_p(\\mu, \\nu)$, is defined as the $p$-th root of the minimum cost of transporting all the probability mass from $\\mu$ to $\\nu$, where moving a probability mass of $\\delta$ from $a \\in A$ to $b \\in B$ incurs a cost of $\\delta d(a, b)^p$.
      
      We give a (Las Vegas) randomized algorithm that computes a $(4+\\varepsilon)$-approximate $W_p$ optimal-transport (OT) plan in $O(n^2 + (n^{3/2}\\varepsilon^{-1}\\log(n)\\log\\Delta)^{1+o(1)}\\log U)$ time with probability at least $1-1/n$, for all $p \\in [1,\\infty]$, where $\\varepsilon > 0$ is an arbitrarily small constant and $\\Delta$ is the ratio between the largest and smallest interpoint distances in $A \\cup B$.
      
      The previous best result achieved an $O(\\log(n))$-approximation in $O(pn^2)$ time, for constant values of $p$. Our algorithm significantly improves the approximation factor and, importantly, is the first quadratic-time method that extends to the $W_{\\infty}$-distance. In contrast, additive approximation methods such as Sinkhorn are efficient only for constant $p$ and fail to handle $p = \\infty$.
      
      Our algorithm also extends to a query model where, for any integer $k > 1$, we give an algorithm that preprocesses $X$ into clusters in $O(n^2+kn^{1+1/k}\\log(n)\\log\\Delta)$ time, after which a $O(k)$-approximate $W_p$ distance between any two distributions $\\mu$ and $\\nu$ with $X$ as support can be computed in $O((n^{1+1/k}\\log(n)\\log\\Delta)^{1+o(1)})$ time with probability at least $1-1/n$.
      
      Finally, for $p = \\infty$, we show that obtaining a relative approximation factor better than 2 in $O(n^2)$ time would resolve the long-standing open problem of computing a perfect matching in an arbitrary bipartite graph in quadratic time.
      `,
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
      `The sensitivity of optimal transport (OT) to noise has motivated the study of robust variants. In this paper, we study two such formulations of semi-discrete OT in $\\mathbb{R}^d$: (i) the $\\alpha$-optimal partial transport, which minimizes the cost of transporting a mass of $\\alpha$, and (ii) the $\\lambda$-robust optimal transport, which regularizes the OT problem using the total variation (TV) distance.
      
      First, we provide a novel characterization of the optimal solutions in these settings, showing they can be represented as a restricted Laguerre diagram.
      
      Second, we exploit this characterization to establish a strong algorithmic connection between the two problems, showing that any solver for one can be adapted to solve the other with comparable precision.
      
      Third, we overcome key challenges posed in extending the cost-scaling paradigm to compute these variants of OT and present an algorithm that computes the exact solution up to $\\log(1/\\varepsilon)$ bits of precision in $n^{O(d)} \\log(1/\\varepsilon)$ time, where $n$ is the support size of the discrete distribution.
      
      Finally, we present an $n^{1+o(1)}\\varepsilon^{-O(d)}$-time approximation algorithm for the above variants of OT.
      `,
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
      `Given a set of probability distributions, the Wasserstein barycenter problem asks to compute a distribution that minimizes the average Wasserstein distance, or optimal transport cost, from all the input distributions. Wasserstein barycenters preserve common geometric features of the input distributions, making them useful in machine learning and data analytics tasks.
      
      We present a near-linear time algorithm that computes the Wasserstein barycenter within a relative $(1+\\varepsilon)$-approximation in fixed dimensions. We are not aware of an efficient relative-approximation algorithm for this problem even in two dimensions.
      
      To obtain our results, we first present a near-linear-time dynamic-programming-based primal-dual algorithm to compute an optimal Wasserstein barycenter under a tree metric. We then combine our tree-based algorithms with the boosting framework to obtain a $(1+\\varepsilon)$-approximation in near-linear time.
      `,
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
        `Optimal Transport (OT, also known as the Wasserstein distance) is a popular metric for comparing probability distributions and has been successfully used in many machine-learning applications.
        
        In the semi-discrete $2$-Wasserstein problem, we wish to compute the cheapest way to transport all the mass from a continuous distribution $\\mu$ to a discrete distribution $\\nu$ in $\\mathbb{R}^d$ for $d \\geq 1$, where the cost of transporting unit mass between points $a$ and $b$ is $d(a,b) = \\|a-b\\|^2$.
        
        When both distributions are discrete, a simple combinatorial framework has been used to find the exact solution (see e.g. [Orlin, STOC 1988]). In this paper, we propose a combinatorial framework for the semi-discrete OT, which can be viewed as an extension of the combinatorial framework for the discrete OT but requires several new ideas.
        
        We present a new algorithm that, given $\\mu$ and $\\nu$ in $\\mathbb{R}^2$ and a parameter $\\varepsilon > 0$, computes an $\\varepsilon$-additive approximate semi-discrete transport plan in $O(n^4 \\log n \\log \\frac{1}{\\varepsilon})$ time (in the worst case), where $n$ is the support size of the discrete distribution $\\nu$ and we assume that the mass of $\\mu$ inside a triangle can be computed in $O(1)$ time.
        
        Our algorithm is significantly faster than the known algorithms, and unlike many numerical algorithms, it does not make any assumptions on the smoothness of $\\mu$.
        
        As an application of our algorithm, we describe a data structure to store a large discrete distribution $\\mu$ (with support size $N$) using $O(N)$ space so that, given a query discrete distribution $\\nu$ (with support size $k$), an $\\varepsilon$-additive approximate transport plan can be computed in $O(k^3 \\sqrt{N} \\log \\frac{1}{\\varepsilon})$ time in $2$ dimensions.
        
        Our algorithm and data structure extend to higher dimensions as well as to the $p$-Wasserstein problem for any $p \\geq 1$.
        `,
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
    abstract: `
      Given a $d$-dimensional continuous (resp. discrete) probability distribution $\\mu$ and a discrete distribution $\\nu$, the semi-discrete (resp. discrete) optimal transport (OT) problem asks for computing a minimum-cost plan to transport mass from $\\mu$ to $\\nu$. We assume $n$ to be the number of points in the support of the discrete distributions. In this paper, we present three approximation algorithms for the OT problem with strong provable guarantees.
      
      **(i) Additive approximation for semi-discrete OT:** For any parameter $\\varepsilon > 0$, we present an algorithm that computes a semi-discrete transport plan $\\tilde{\\tau}$ with cost
      
      $$
      \\text{\\textcent}(\\tilde{\\tau}) \\leq \\text{\\textcent}(\\tau^*) + \\varepsilon
      $$
      
      in $n^{O(d)} \\log \\frac{\\mathrm{D}}{\\varepsilon}$ time. Here, $\\tau^*$ is the optimal transport plan, $\\mathrm{D}$ is the diameter of the supports of $\\mu$ and $\\nu$, and we assume we have access to an oracle that outputs the mass of $\\mu$ inside a constant-complexity region in $O(1)$ time. Our algorithm works for several ground distances, including the $L_p$-norm and the squared-Euclidean distance.
      
      **(ii) Relative approximation for semi-discrete OT:** For any parameter $\\varepsilon > 0$, we present an algorithm that computes a semi-discrete transport plan $\\tilde{\\tau}$ with cost
      
      $$
      \\text{\\textcent}(\\tilde{\\tau}) \\leq (1+\\varepsilon)\\text{\\textcent}(\\tau^*)
      $$
      
      in $n\\log(n)\\cdot(\\varepsilon^{-1}\\log\\log n)^{O(d)}$ expected time. Here, $\\tau^*$ is the optimal transport plan, and we assume we have access to an oracle that outputs the mass of $\\mu$ inside an orthogonal box in $O(1)$ time. The ground distance is any $L_p$-norm.
      
      **(iii) Relative approximation for discrete OT:** For any parameter $\\varepsilon > 0$, we present a Monte Carlo algorithm that computes a transport plan $\\tilde{\\tau}$ with expected cost
      
      $$
      \\text{\\textcent}(\\tilde{\\tau}) \\leq (1+\\varepsilon)\\text{\\textcent}(\\tau^*)
      $$
      
      under any $L_p$-norm in $n\\log(n)\\cdot(\\varepsilon^{-1}\\log\\log n)^{O(d)}$ time. Here, $\\tau^*$ is an optimal transport plan, and we assume that the spread of the supports of $\\mu$ and $\\nu$ is polynomially bounded.
      `,
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
      `It has been shown recently that the framework of quantum sampling, as introduced by Bouman and Fehr, can lead to new entropic uncertainty relations highly applicable to finite-key cryptographic analyses. Here we revisit these so-called sampling-based entropic uncertainty relations, deriving newer, more powerful, relations and applying them to source-independent quantum random number generators and high-dimensional quantum key distribution protocols.  Along the way, we prove several interesting results in the asymptotic case for our entropic uncertainty relations. These sampling-based approaches to entropic uncertainty, and their application to quantum cryptography, hold great potential for deriving proofs of security for quantum cryptographic systems, and the approaches we use here may be applicable to an even wider range of scenarios.`,
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
      `The comparison of phylogenetic trees is a fundamental task in phylogenetics and evolutionary biology. In many cases, these comparisons involve trees inferred on the same set of leaves, and many distance measures exist to facilitate such comparisons. However, several applications in phylogenetics require the comparison of trees that have non-identical leaf sets.
      
      The traditional approach for handling such comparisons is to first restrict the two trees being compared to just their common leaf set. An alternative, conceptually superior approach that has shown promise is to first **complete** the trees by adding missing leaves so that the completed trees have identical leaf sets.
      
      This alternative approach requires the computation of optimal completions of the two trees that minimize the distance between them. However, no polynomial-time algorithms currently exist for this optimal completion problem under any standard phylogenetic distance measure.
      
      In this work, we provide the first polynomial-time algorithms for the above problem under the widely used Robinson-Foulds (RF) distance measure. This hitherto unsolved problem is referred to as the **RF(+) problem**.
      
      We (i) show that a recently proposed linear-time algorithm for a restricted version of the RF(+) problem is a 2-approximation for the RF(+) problem, and (ii) provide an exact $O(nk^2)$-time algorithm for the RF(+) problem, where $n$ is the total number of distinct leaf labels in the two trees being compared and $k$, bounded above by $n$, depends on the topologies and leaf set overlap of the two trees.
      
      Our results hold for both rooted and unrooted binary trees.
      `,
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
