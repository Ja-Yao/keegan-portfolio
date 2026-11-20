import { publications } from "@/lib/publications";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/mode-toggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuListItem,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Publications", to: "/publications/" },
  { label: "About", to: "/about" },
] as const;

const featuredPublications = publications
  .filter((item) => item.featuredOrder !== undefined)
  .sort((a, b) => a.featuredOrder! - b.featuredOrder!);

export function Header() {
  const navigate = useNavigate();

  return (
    <header id="nd-nav" className="sticky top-0 z-20 h-14" aria-label="Main">
      <div className="h-full border-b border-border bg-background/80 backdrop-blur-sm">
        <nav className="mx-auto flex h-full w-full max-w-(--fd-layout-width) items-center justify-between px-4 sm:px-6 lg:px-12">
          {/* Mobile menu: CSS-driven, so it works at any width and has no flash on load */}
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open menu"
                >
                  <Menu />
                </Button>
              }
            />
            <SheetContent side="left" className="w-72 max-w-[85vw]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Site navigation
                </SheetDescription>
              </SheetHeader>
              <ul className="flex flex-col gap-1 px-4">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.to}
                      className="block rounded-md px-3 py-3 text-base font-medium hover:bg-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>

          {/* Tablet + desktop navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-2">
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  render={<Link to="/">Home</Link>}
                />
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Publications</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div>
                    <ul className="grid w-72 gap-2 md:w-md md:grid-cols-2 lg:w-150">
                      {featuredPublications.map((item) => (
                        <NavigationMenuListItem
                          key={item.id}
                          href={`/publications/${item.id}`}
                          title={item.title}
                        >
                          {item.description}
                        </NavigationMenuListItem>
                      ))}
                    </ul>
                    <Button
                      variant="link"
                      className="text-muted-foreground hover:text-foreground"
                      onClick={() => navigate({ to: "/publications" })}
                    >
                      View All
                    </Button>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  render={<Link to="/about">About</Link>}
                />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Always visible, including on mobile */}
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
