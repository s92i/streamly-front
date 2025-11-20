"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import { Sun, Moon } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

function Switch({
  className,
  ...props
}: ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "relative cursor-pointer peer inline-flex h-6 w-12 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50",
        "bg-gray-300 dark:bg-gray-100",
        className
      )}
      {...props}
    >
      <span className="absolute left-1 pointer-events-none z-10 transition-opacity duration-200 opacity-100 data-[state=checked]:opacity-0">
        <Sun className="size-4 text-yellow-500" />
      </span>
      <span className="absolute right-1 pointer-events-none z-10 transition-opacity duration-200 opacity-0 data-[state=checked]:opacity-100">
        <Moon className="size-4 text-blue-400 dark:text-blue-300" />
      </span>
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 pointer-events-none block size-6 rounded-full shadow transition-transform duration-200",
          "data-[state=unchecked]:translate-x-0 data-[state=checked]:translate-x-6"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
