import profileImage from "@/assets/profile1.jpeg";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
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
import { publications } from "@/lib/publications";
import { socials } from "@/lib/socials";
import { createFileRoute, Link } from "@tanstack/react-router";
import { cn } from "cn";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <div className="flex flex-col [--fd-layout-width:1400px]">
      <main className="mx-auto w-full max-w-(--fd-layout-width) flex-1">
        {/* ───────── Hero ───────── */}
        <section className="grid items-center gap-8 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-2 lg:gap-12 lg:px-12 lg:py-16">
          {/* Image on top for phones/tablets, on the right for desktop */}
          <img
            src={profileImage}
            alt="Portrait of Name Here"
            width={640}
            height={640}
            loading="eager"
            className="order-first mx-auto aspect-square w-full max-w-60 rounded-4xl border border-border object-cover shadow-sm sm:max-w-xs md:max-w-sm lg:order-last lg:max-w-md"
          />

          <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-5 text-center sm:gap-6 lg:max-w-none">
            <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl xl:text-7xl">
              Keegan Yao
            </h1>
            <div className="space-y-2">
              <p className="text-base text-balance text-muted-foreground sm:text-lg">
                Computer Science Researcher
              </p>
              <p className="sm:text-md text-base text-balance text-muted-foreground">
                I develop scalable algorithms for Optimal Transport (OT) by
                leveraging the geometric and structural properties of its
                solutions. My research combines continuous and combinatorial
                optimization to advance machine learning and data science.
              </p>
            </div>
            <ul className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {socials.map((s, index) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className={cn(
                      buttonVariants({
                        variant: index == 0 ? "default" : "secondary",
                        size: "icon-lg",
                      }),
                      index > 0 ? "rounded-full border-border" : "rounded-full"
                    )}
                  >
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ───────── Relevant work ───────── */}
        <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-12 lg:pb-16">
          <h2 className="scroll-m-20 pb-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            Relevant Work
          </h2>
          {/* Horizontal padding leaves room for the arrows on tablet/desktop */}
          <div className="md:px-6 lg:px-10">
            <Carousel className="w-full" opts={{ align: "start", loop: true }}>
              <CarouselContent className="-ml-2 py-2 sm:-ml-4">
                {publications.map((item, index) => (
                  <CarouselItem
                    key={`${index}-${item.title}`}
                    className="basis-full pl-2 sm:pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle className="line-clamp-2">
                          {item.title}
                        </CardTitle>
                        <CardDescription className="flex flex-wrap gap-2">
                          <Badge variant="secondary">{item.conference}</Badge>
                          {item.pages && (
                            <Badge variant="outline">{item.pages}</Badge>
                          )}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1 text-muted-foreground">
                        <p className="line-clamp-4 lg:line-clamp-5">
                          {item.abstract}
                        </p>
                      </CardContent>
                      <CardFooter className="justify-end">
                        <CardAction>
                          <Link
                            to="/publications/$publicationId"
                            params={{ publicationId: item.id }}
                            className={buttonVariants({ variant: "default" })}
                          >
                            Learn More
                          </Link>
                        </CardAction>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {/* Arrows would overflow the screen on phones; swipe works there */}
              <CarouselPrevious className="hidden md:-left-4 md:inline-flex lg:-left-10" />
              <CarouselNext className="hidden md:-right-4 md:inline-flex lg:-right-10" />
            </Carousel>
          </div>
        </section>
      </main>
    </div>
  );
}
