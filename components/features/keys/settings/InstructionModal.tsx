import { Button } from "@/components/ui/common/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/common/Dialog";
import { useTranslations } from "next-intl";
import { InstructionModalStep1 } from "./steps/InstructionModalStep1";
import { InstructionModalStep2 } from "./steps/InstructionModalStep2";
import { InstructionModalStep3 } from "./steps/InstructionModalStep3";

export function InstructionModal() {
  const t = useTranslations("layout.dashboard.keys.instructionModal");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">{t("trigger")}</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-[800px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{t("heading")}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {t("description")}
          </DialogDescription>
        </DialogHeader>
        <InstructionModalStep1 />
        <InstructionModalStep2 />
        <InstructionModalStep3 />
        <p className="mt-4 text-sm text-muted-foreground">{t("congrats")}</p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">{t("close")}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
