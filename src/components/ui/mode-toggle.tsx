import { Computer, Moon, Sun } from "lucide-react";

import { type Theme, useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { Tooltip, TooltipTrigger } from "./tooltip";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenuTrigger>
      <TooltipTrigger>
        <Button variant="outline" size="icon-lg">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        </Button>
        <Tooltip placement="bottom">Change theme</Tooltip>
      </TooltipTrigger>
      <DropdownMenu>
        <DropdownMenuGroup
          selectionMode="single"
          disallowEmptySelection
          selectedKeys={[theme]}
          onSelectionChange={(keys) => setTheme([...keys][0] as Theme)}
        >
          <DropdownMenuItem id="light">
            <Sun />
            Light
          </DropdownMenuItem>
          <DropdownMenuItem id="dark">
            <Moon />
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem id="system">
            <Computer />
            System
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenu>
    </DropdownMenuTrigger>
  );
}
