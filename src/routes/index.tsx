import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuListItem,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import useUserInfo from "@/hooks/useUserInfo";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import Autoplay from "embla-carousel-autoplay";
import { Mail } from "lucide-react";

export const Route = createFileRoute("/")({ component: App });

interface RecentWork {
  title: string;
  href: string;
  conference: string;
  pages?: string;
  description: string;
  abstract: string;
}

const components: RecentWork[] = [
  {
    title:
      "Fast Algorithms for Continuous Optimal Transport between Histograms",
    href: "/publications/something",
    conference: "ESA 2026",
    pages: "pp. 123:1\u2013123:23",
    description:
      "(1+\u03B5)-approximation for transport between axis-aligned histograms",
    abstract:
      "We give the first (relative) (1+ε)-approximation algorithm for the continuous optimal transport (OT) problem between two axis-aligned histograms in the plane, each of which is represented as a piecewise-constant function over a rectangular subdivision. Our algorithm runs in nearly quadratic time in the complexity of the histograms in the worst case. In contrast to the discrete and semi-discrete optimal transport problems, which always admit linear-size OT plans, we demonstrate that there is a quadratic lower bound on the complexity of even a (1+ε)-approximate OT plan in the continuous setting in the worst case. This suggests that the runtime of our approximation algorithm nearly matches the worst-case lower-bound complexity of an explicit (1+ε)-approximate OT plan between two histograms. We additionally provide near-linear time algorithms with either weaker approximation guarantees or restrictions on the input histograms.",
  },
  {
    title:
      "A Scalable Constant-Factor Approximation Algorithm for Wp Optimal Transport",
    href: "/publications/something-else",
    conference: "ICLR 2026",
    pages: "pp. 52080\u201352100",
    description:
      "Randomized algorithm extending high-efficiency transport to the W ͚ case",
    abstract:
      "Let (X,d) be a metric space and let μ, ν be discrete probability distributions supported on finite point sets A, B ⊆X. For any p ∈[1,∞], the Wp-distance between μ and ν, Wp(μ, ν), is defined as the p-th root of the minimum cost of transporting all the probability mass from μ to ν, where moving a probability mass of δ from a ∈A to b ∈B incurs a cost of δd(a, b)p. We give a (Las Vegas) randomized algorithm that",
  },
  {
    title:
      "Efficient Algorithms for Robust and Partial Semi-Discrete Optimal Transport",
    href: "/publications/something-else",
    conference: "NeurIPS 2025",
    pages: "pp. 44053\u201344108",
    description:
      "Fast algorithms for noise-resilient and partial optimal transport",
    abstract:
      "The sensitivity of optimal transport (OT) to noise has motivated the study of robust variants. In this paper, we study two such formulations of semi-discrete OT in ℝd: (i) the α-optimal partial transport, which minimizes the cost of transporting a mass of α, and (ii) the λ-robust optimal transport, which regularizes the OT problem using the total variation (TV) distance. First, we provide a novel characterization of the optimal solutions in these settings, showing they can be represented as a restricted Laguerre diagram",
  },
  {
    title:
      "Efficient Approximation Algorithm for Computing Wasserstein Barycenter under Euclidean Metric",
    href: "/publications/something-else",
    conference: "SODA 2025",
    pages: "pp. 4809\u20134826",
    description:
      "Near-linear time approximation for the 'average' of multiple distributions",
    abstract:
      "Given a set of probability distributions, the Wasserstein barycenter problem asks to compute a distribution that minimizes the average Wasserstein distance, or optimal transport cost, from all the input distributions. Wasserstein barycenters preserve common geometric features of the input distributions, making them useful in machine learning and data analytics tasks. We present a near-linear time algorithm",
  },
] as const;

function App() {
  const visitor = useUserInfo();
  const navigate = useNavigate();

  const { device } = { ...visitor };

  return (
    <div className="flex min-h-svh">
      <div className="flex min-h-0 flex-1 flex-col">
        <main className="flex flex-1 flex-col [--fd-layout-width:1400px]">
          <header
            id="nd-nav"
            className="sticky top-0 z-40 h-14"
            aria-label="Main"
          >
            <div className="bg-fd-background/80 border-b border-border backdrop-blur-lg transition-colors *:mx-auto *:max-w-(--fd-layout-width)">
              <div className="position: relative">
                <nav
                  data-orientation="horizontal"
                  className="flex h-14 w-full items-center justify-between px-4"
                >
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                          render={<Link to="/">Home</Link>}
                        />
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>
                          Publications
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div>
                            <ul className="grid w-100 gap-2 md:w-125 md:grid-cols-2 lg:w-150">
                              {components.map((item) => (
                                <NavigationMenuListItem
                                  href={item.href}
                                  title={item.title}
                                >
                                  {item.description}
                                </NavigationMenuListItem>
                              ))}
                            </ul>
                            <Button
                              variant="link"
                              onClick={() => navigate({ to: "/" })}
                              render={<Link to="/">View All</Link>}
                              className="text-muted-foreground hover:text-foreground"
                            />
                          </div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                          render={<Link to="/">About</Link>}
                        />
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                  <ModeToggle />
                </nav>
              </div>
            </div>
          </header>
          <main className="w-full">
            <section className="py-8 md:grid md:grid-cols-2 md:gap-4">
              <div
                className={`mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-6 text-center ${device && device.type === "mobile" ? "order-2" : ""}`}
              >
                <h1 className="max-w-4xl font-heading text-4xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
                  Keegan Yao
                </h1>
                <span className="max-w-2xl text-base text-balance text-muted-foreground sm:text-lg">
                  Computer Science Researcher
                </span>
                <p className="max-w-2xl text-base text-balance text-muted-foreground sm:text-lg">
                  I develop scalable algorithms for Optimal Transport (OT) by
                  leveraging the geometric and structural properties of its
                  solutions. My research combines continuous and combinatorial
                  optimization to advance machine learning and data science.
                </p>
                <div className="grid grid-cols-5 gap-3">
                  <Button size="icon-lg" variant="outline">
                    <a href="mailto:kyao8686@gmail.com">
                      <Mail />
                    </a>
                  </Button>
                  <Button size="icon-lg" variant="outline">
                    <svg
                      viewBox="0 0 24 24"
                      role="img"
                      className="h-6 w-6 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5z" />
                    </svg>
                  </Button>
                  <Button size="icon-lg" variant="outline">
                    <svg
                      viewBox="0 0 24 24"
                      role="img"
                      className="h-6 w-6 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>ORCID icon</title>
                      <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z" />
                    </svg>
                  </Button>

                  <Button size="icon-lg" variant="outline">
                    <svg
                      viewBox="0 0 24 24"
                      role="img"
                      className="h-6 w-6 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M28.401 19.438l-3.266-12.208c0 0-0.203-0.792-0.964-0.443l-7.464 3.469 1.146 4.266 1.453 5.438 0.010 0.083c0.068 0.625-0.547 1.052-0.547 1.052l-2.505 1.161 0.667 2.516 0.052 0.135c0.094 0.229 0.375 0.802 1.083 1.214l9.266 5.693c0 0 0.906 0.547 0.693-0.224l-2.641-9.87 2.479-1.146c0 0 0.75-0.344 0.536-1.135zM18.349 19.563l-0.016-0.083-1.505-5.625-1.776-6.589v-0.052c0 0-0.214-0.786-1.12-1.333l-9.266-5.693c0 0-0.906-0.547-0.693 0.224l2.651 9.896-2.49 1.161c0 0-0.75 0.344-0.536 1.13l3.266 12.214c0 0 0.214 0.786 0.964 0.443l9.958-4.641c0 0 0.693-0.323 0.563-1.052z" />
                    </svg>
                  </Button>

                  <Button size="icon-lg" variant="outline">
                    <svg
                      viewBox="0 0 24 24"
                      role="img"
                      className="h-6 w-6 scale-150 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M18.72 3.99997H5.37C5.19793 3.99191 5.02595 4.01786 4.86392 4.07635C4.70189 4.13484 4.55299 4.22471 4.42573 4.34081C4.29848 4.45692 4.19537 4.59699 4.12232 4.75299C4.04927 4.909 4.0077 5.07788 4 5.24997V18.63C4.01008 18.9901 4.15766 19.3328 4.41243 19.5875C4.6672 19.8423 5.00984 19.9899 5.37 20H18.72C19.0701 19.9844 19.4002 19.8322 19.6395 19.5761C19.8788 19.32 20.0082 18.9804 20 18.63V5.24997C20.0029 5.08247 19.9715 4.91616 19.9078 4.76122C19.8441 4.60629 19.7494 4.466 19.6295 4.34895C19.5097 4.23191 19.3672 4.14059 19.2108 4.08058C19.0544 4.02057 18.8874 3.99314 18.72 3.99997ZM9 17.34H6.67V10.21H9V17.34ZM7.89 9.12997C7.72741 9.13564 7.5654 9.10762 7.41416 9.04768C7.26291 8.98774 7.12569 8.89717 7.01113 8.78166C6.89656 8.66615 6.80711 8.5282 6.74841 8.37647C6.6897 8.22474 6.66301 8.06251 6.67 7.89997C6.66281 7.73567 6.69004 7.57169 6.74995 7.41854C6.80986 7.26538 6.90112 7.12644 7.01787 7.01063C7.13463 6.89481 7.2743 6.80468 7.42793 6.74602C7.58157 6.68735 7.74577 6.66145 7.91 6.66997C8.07259 6.66431 8.2346 6.69232 8.38584 6.75226C8.53709 6.8122 8.67431 6.90277 8.78887 7.01828C8.90344 7.13379 8.99289 7.27174 9.05159 7.42347C9.1103 7.5752 9.13699 7.73743 9.13 7.89997C9.13719 8.06427 9.10996 8.22825 9.05005 8.3814C8.99014 8.53456 8.89888 8.6735 8.78213 8.78931C8.66537 8.90513 8.5257 8.99526 8.37207 9.05392C8.21843 9.11259 8.05423 9.13849 7.89 9.12997ZM17.34 17.34H15V13.44C15 12.51 14.67 11.87 13.84 11.87C13.5822 11.8722 13.3313 11.9541 13.1219 12.1045C12.9124 12.2549 12.7546 12.4664 12.67 12.71C12.605 12.8926 12.5778 13.0865 12.59 13.28V17.34H10.29V10.21H12.59V11.21C12.7945 10.8343 13.0988 10.5225 13.4694 10.3089C13.84 10.0954 14.2624 9.98848 14.69 9.99997C16.2 9.99997 17.34 11 17.34 13.13V17.34Z" />
                    </svg>
                  </Button>
                </div>
              </div>
              <div>
                <img
                  src="src/assets/profile1.jpeg"
                  loading="lazy"
                  className={`w-auto rounded-4xl border border-border shadow-sm sm:max-h-96 md:max-h-200 ${device && device.type === "mobile" ? "order-1" : ""}`}
                />
              </div>
            </section>
            <div className="mx-auto flex w-full max-w-350 flex-col px-4 pb-24 sm:px-6">
              <h2 className="scroll-m-20 pb-4 text-3xl font-semibold tracking-tight first:mt-0">
                Recent Work
              </h2>
              <div className="flex min-h-1/3 w-full flex-1 justify-center">
                <Carousel
                  className="w-full sm:max-w-xs md:max-w-[75%] lg:max-w-full"
                  plugins={[Autoplay({ delay: 5000 })]}
                >
                  <CarouselContent className="items-center">
                    {components.map((item, index) => (
                      <CarouselItem className="h-full basis-1/2 px-6 py-4">
                        <Card key={index} className="max-w-xl">
                          <CardHeader>
                            <CardTitle className="line-clamp-2">
                              {item.title}
                            </CardTitle>
                            <CardDescription className="flex flex-row gap-2">
                              <Badge variant={"secondary"}>
                                {item.conference}
                              </Badge>
                              <Badge variant="outline">{item.pages}</Badge>
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="text-muted-foreground">
                            <p className="line-clamp-5">{item.abstract}</p>
                          </CardContent>
                          <CardFooter className="justify-end gap-2">
                            <CardAction>
                              <Button onClick={() => navigate({ to: "/" })}>
                                Learn More
                              </Button>
                            </CardAction>
                          </CardFooter>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
          </main>
        </main>
      </div>
    </div>
  );
}
