"use client";

import { useState } from "react";
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
import { useChangePasswordMutation } from "@/graphql/generated/output";
import { useCurrent } from "@/hooks/useCurrent";
import {
  changePasswordSchema,
  type TypeChangePasswordSchema,
} from "@/schemas/user/change-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

export function ChangePasswordForm() {
  const t = useTranslations("layout.dashboard.settings.account.password");

  const { isLoadingProfile, refetch } = useCurrent();

  const form = useForm<TypeChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    values: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const [update, { loading: isLoadingUpdate }] = useChangePasswordMutation({
    onCompleted() {
      refetch();
      form.reset();
      toast.success(t("successMessage"));
    },
    onError() {
      toast.error(t("errorMessage"));
    },
  });

  const { isValid } = form.formState;

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  function onSubmit(data: TypeChangePasswordSchema) {
    update({ variables: { data } });
  }

  return isLoadingProfile ? (
    <ChangePasswordFormSkeleton />
  ) : (
    <FormWrapper heading={t("heading")}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-3">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem className="px-5">
                <FormLabel>{t("oldPasswordLabel")}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showOldPassword ? "text" : "password"}
                      placeholder="********"
                      {...field}
                      disabled={isLoadingUpdate}
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowOldPassword((prev) => !prev)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 focus:outline-none"
                      aria-label={
                        showOldPassword ? "Hide password" : "Show password"
                      }
                      disabled={isLoadingUpdate}
                    >
                      {showOldPassword ? (
                        <EyeOff className="size-5 text-muted-foreground cursor-pointer" />
                      ) : (
                        <Eye className="size-5 text-muted-foreground cursor-pointer" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormDescription>{t("oldPasswordDescription")}</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem className="px-5">
                <FormLabel>{t("newPasswordLabel")}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="********"
                      {...field}
                      disabled={isLoadingUpdate}
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowNewPassword((prev) => !prev)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 focus:outline-none"
                      aria-label={
                        showNewPassword ? "Hide password" : "Show password"
                      }
                      disabled={isLoadingUpdate}
                    >
                      {showNewPassword ? (
                        <EyeOff className="size-5 text-muted-foreground cursor-pointer" />
                      ) : (
                        <Eye className="size-5 text-muted-foreground cursor-pointer" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormDescription>{t("newPasswordDescription")}</FormDescription>
              </FormItem>
            )}
          />
          <div className="flex justify-end p-5">
            <Button
              className="cursor-pointer bg-secondary"
              disabled={!isValid || isLoadingUpdate}
            >
              {t("submitButton")}
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
}

export function ChangePasswordFormSkeleton() {
  return <Skeleton className="h-96 w-full" />;
}
