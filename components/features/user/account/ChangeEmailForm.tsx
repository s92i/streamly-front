"use client";

import { Button } from "@/components/ui/common/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/common/Form";
import { Input } from "@/components/ui/common/Input";
import { Skeleton } from "@/components/ui/common/Skeleton";
import { FormWrapper } from "@/components/ui/elements/FormWrapper";
import { useChangeEmailMutation } from "@/graphql/generated/output";
import { useCurrent } from "@/hooks/useCurrent";
import {
  changeEmailSchema,
  type TypeChangeEmailSchema,
} from "@/schemas/user/change-email.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function ChangeEmailForm() {
  const t = useTranslations("layout.dashboard.settings.account.email");

  const { user, isLoadingProfile, refetch } = useCurrent();

  const form = useForm<TypeChangeEmailSchema>({
    resolver: zodResolver(changeEmailSchema),
    values: {
      email: user?.email ?? "",
    },
  });

  const [update, { loading: isLoadingUpdate }] = useChangeEmailMutation({
    onCompleted() {
      refetch();
      toast.success(t("successMessage"));
    },
    onError() {
      toast.error(t("errorMessage"));
    },
  });

  const { isValid, isDirty } = form.formState;

  function onSubmit(data: TypeChangeEmailSchema) {
    update({ variables: { data } });
  }

  return isLoadingProfile ? (
    <ChangeEmailFormSkeleton />
  ) : (
    <FormWrapper heading={t("heading")}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="px-5">
                <FormLabel>{t("emailLabel")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder="test@example.com"
                    {...field}
                    disabled={isLoadingUpdate}
                  />
                </FormControl>
                <FormDescription>{t("emailDescription")}</FormDescription>
              </FormItem>
            )}
          />
          <div className="flex justify-end p-5">
            <Button
              className="cursor-pointer bg-secondary"
              disabled={!isValid || !isDirty || isLoadingUpdate}
            >
              {t("submitButton")}
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
}

export function ChangeEmailFormSkeleton() {
  return <Skeleton className="h-64 w-full" />;
}
