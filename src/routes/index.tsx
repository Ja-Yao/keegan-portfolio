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
    title: "Continuous Optimal Transport",
    href: "/publications/something",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "New algorithms to efficiently calculate the 'cost' of transforming one 2D histogram into another.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
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
                              <NavigationMenuListItem
                                href="/"
                                title="Histogram OT"
                              >
                                (1+ϵ)-approximation for transport between
                                axis-aligned histograms
                              </NavigationMenuListItem>
                              <NavigationMenuListItem
                                href="/"
                                title={`Scalable W${(<span className="align-sub text-xs">p</span>)} OT`}
                              >
                                A randomized algorithm extending high-efficiency
                                transport to the W
                                <span className="align-sub text-xs">∞</span>{" "}
                                case
                              </NavigationMenuListItem>
                              <NavigationMenuListItem
                                href="/"
                                title="Robust Semi-Discrete OT"
                              >
                                Fast algorithms for noise-resilient and partial
                                optimal transport
                              </NavigationMenuListItem>
                              <NavigationMenuListItem
                                href="/"
                                title="Wasserstein Barycenters"
                              >
                                Near-linear time approximation for computing the
                                "average" of multiple distributions.
                              </NavigationMenuListItem>
                            </ul>
                            <Button
                              variant="link"
                              onClick={() => navigate({ to: "/" })}
                              render={<Link to="/">View All</Link>}
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
          
        </main>
      </div>
    </div>
  );
}
