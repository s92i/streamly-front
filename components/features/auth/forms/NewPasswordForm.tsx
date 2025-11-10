"use client";

import { useNewPasswordMutation } from "@/graphql/generated/output";
import {
  newPasswordSchema,
  type TypeNewPasswordSchema,
} from "@/schemas/auth/new-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AuthWrapper } from "../AuthWrapper";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/common/Form";
import { Button } from "@/components/ui/common/Button";
import { Input } from "@/components/ui/common/Input";
import { Eye, EyeOff } from "lucide-react";

export function NewPasswordForm() {
  const t = useTranslations("auth.newPassword");

  const router = useRouter();
  const params = useParams<{ token: string }>();

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const form = useForm<TypeNewPasswordSchema>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      passwordRepeat: "",
    },
  });

  const [newPassword, { loading: isLoadingNewPassword }] =
    useNewPasswordMutation({
      onCompleted() {
        toast.success(t("successMessage"));
        router.push("/dashboard/settings");
      },
      onError() {
        toast.error(t("errorMessage"));
      },
    });

  const { isValid } = form.formState;

  function onSubmit(data: TypeNewPasswordSchema) {
    newPassword({ variables: { data: { ...data, token: params.token } } });
  }

  return (
    <AuthWrapper
      heading={t("heading")}
      backButtonLabel={t("backButtonLabel")}
      backButtonHref="/account/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-3">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("passwordLabel")}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="********"
                      type={showPassword ? "text" : "password"}
                      {...field}
                      disabled={isLoadingNewPassword}
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 focus:outline-none"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      disabled={isLoadingNewPassword}
                    >
                      {showPassword ? (
                        <EyeOff className="size-5 text-muted-foreground" />
                      ) : (
                        <Eye className="size-5 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormDescription>{t("passwordDescription")}</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordRepeat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("passwordRepeatLabel")}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="********"
                      type={showRepeatPassword ? "text" : "password"}
                      {...field}
                      disabled={isLoadingNewPassword}
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowRepeatPassword((prev) => !prev)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 focus:outline-none"
                      aria-label={
                        showRepeatPassword ? "Hide password" : "Show password"
                      }
                      disabled={isLoadingNewPassword}
                    >
                      {showRepeatPassword ? (
                        <EyeOff className="size-5 text-muted-foreground" />
                      ) : (
                        <Eye className="size-5 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormDescription>
                  {t("passwordRepeatDescription")}
                </FormDescription>
              </FormItem>
            )}
          />
          <Button
            className="mt-2 w-full bg-secondary"
            disabled={!isValid || isLoadingNewPassword}
          >
            {t("submitButton")}
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
}
