import { Button } from "@/components/ui/button";
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

export const Route = createFileRoute("/")({ component: App });

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Histogram OT",
    href: "/publications/something",
    description:
      "(1+\u03B5)-approximation for transport between axis-aligned histograms",
  },
  {
    title: "Scalable Wₚ OT",
    href: "/publications/something-else",
    description:
      "A randomized algorithm extending high-efficiency transport to the W ͚ case",
  },
  {
    title: "Robust Semi-Discrete OT",
    href: "/publications/something-else",
    description:
      "Fast algorithms for noise-resilient and partial optimal transport",
  },
  {
    title: "Wasserstein Barycenters",
    href: "/publications/something-else",
    description:
      "Near-linear time approximation for the 'average' of multiple distributions",
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
            <section className="bg-linear-to-b from-(--color-background) to-(--color-card) py-8 md:grid md:grid-cols-2 md:gap-4">
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
              </div>
              <img
                src="src/assets/profile1.jpeg"
                className={`w-auto rounded-4xl border border-border sm:max-h-96 md:max-h-224 ${device && device.type === "mobile" ? "order-1" : ""}`}
              />
            </section>
            <div className="mx-auto flex h-svh w-full flex-col bg-card px-4 pb-24 sm:px-6">
              height
            </div>
          </main>
        </main>
      </div>
    </div>
  );
}
