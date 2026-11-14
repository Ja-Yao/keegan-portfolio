import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

interface AuthorHoverCardProps {
  name: string;
  link?: string;
  position: string[];
  affiliation: string;
}

export function AuthorHoverCard({
  name,
  link,
  position,
  affiliation,
}: AuthorHoverCardProps) {
  return (
    <HoverCard>
      <HoverCardTrigger
        render={
          <a
            href={link}
            className="font-medium text-foreground underline decoration-primary/50 underline-offset-4 transition-colors hover:decoration-primary"
          >
            {name}
          </a>
        }
      />
      <HoverCardContent className="flex w-auto flex-col gap-0.5">
        <div className="grid grid-cols-[1fr_auto] gap-4">
          <Avatar>
            <AvatarFallback>PA</AvatarFallback>
          </Avatar>
          <div>
            <h6 className="text-lg font-semibold">{name}</h6>
            <div className="flex flex-col">
              {position.map((p, i) => (
                <span key={i}>{p}</span>
              ))}
            </div>
            <span className="mt-1 text-xs text-muted-foreground">
              {affiliation}
            </span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
