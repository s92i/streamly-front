import { LogoImage } from "@/components/images/LogoImage";
import { Button } from "@/components/ui/common/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/common/Card";
import Link from "next/link";
import { PropsWithChildren, ReactNode } from "react";

interface AuthWrapperProps {
  heading: string;
  description?: string;
  backButtonLabel?: string;
  backButtonHref?: string;
  logoUrl?: string;
  children?: ReactNode;
}

export function AuthWrapper({
  children,
  heading,
  description,
  backButtonLabel,
  backButtonHref,
}: PropsWithChildren<AuthWrapperProps>) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-background via-muted/50 to-primary/10">
      <Card className="relative w-full max-w-md p-2 shadow-xl border border-muted-foreground/10 bg-white/10 backdrop-blur-[2px]">
        <CardHeader className="flex flex-col items-center mt-2 mb-2 gap-1">
          <div className="flex flex-row items-center justify-center w-full gap-2 mb-3">
            <LogoImage />
            <CardTitle className="text-center text-2xl font-bold text-primary drop-shadow-sm mb-0">
              {heading}
            </CardTitle>
          </div>
          {description && (
            <CardDescription className="mb-2 text-center text-base text-muted-foreground w-full">
              {description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="flex flex-col gap-4">{children}</CardContent>
        {backButtonLabel && backButtonHref && (
          <CardFooter className="mt-1 flex flex-col items-center">
            <Link href={backButtonHref} className="w-full" tabIndex={-1}>
              <Button
                variant="secondary"
                className="w-full border border-border bg-[hsl(var(--muted)/80%)] hover:bg-secondary text-primary transition-colors duration-200 text-center"
                tabIndex={0}
                type="button"
              >
                {backButtonLabel}
              </Button>
            </Link>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
