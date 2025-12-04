"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";

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
        "bg-primary dark:bg-primary dark:data-[state=unchecked]:bg-red-500 data-[state=unchecked]:bg-red-500",
        className
      )}
      {...props}
    >
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
