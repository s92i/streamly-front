"use client";

import {
  useDeactivateAccountMutation,
  useLoginUserMutation,
} from "@/graphql/generated/output";
import { loginSchema, type TypeLoginSchema } from "@/schemas/auth/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
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
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/common/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/common/InputOTP";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import {
  deactivateSchema,
  type TypeDeactivateSchema,
} from "@/schemas/auth/deactivate.schema";

export function DeactivateForm() {
  const t = useTranslations("layout.auth.deactivate");

  const { exit } = useAuth();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);

  const form = useForm<TypeDeactivateSchema>({
    resolver: zodResolver(deactivateSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [deactivate, { loading: isLoadingDeactivate }] =
    useDeactivateAccountMutation({
      onCompleted(data) {
        if (data.deactivateAccount.message) {
          setIsShowConfirm(true);
        } else {
          exit();
          toast.success(t("successMessage"));
          router.push("/");
        }
      },
      onError() {
        toast.error(t("errorMessage"));
      },
    });

  const { isValid } = form.formState;

  function onSubmit(data: TypeDeactivateSchema) {
    deactivate({ variables: { data } });
  }

  return (
    <AuthWrapper
      heading={t("heading")}
      backButtonLabel={t("backButtonLabel")}
      backButtonHref="/dashboard/settings"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-3">
          {isShowConfirm ? (
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("pinLabel")}</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>{t("pinDescription")}</FormDescription>
                </FormItem>
              )}
            />
          ) : (
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("emailLabel")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="test@test.com"
                        {...field}
                        disabled={isLoadingDeactivate}
                      />
                    </FormControl>
                    <FormDescription>{t("emailDescription")}</FormDescription>
                  </FormItem>
                )}
              />
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
                          disabled={isLoadingDeactivate}
                        />
                        <button
                          type="button"
                          tabIndex={-1}
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 focus:outline-none"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          disabled={isLoadingDeactivate}
                        >
                          {showPassword ? (
                            <EyeOff className="size-5 text-muted-foreground" />
                          ) : (
                            <Eye className="size-5 text-muted-foreground" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormDescription>
                      {t("passwordDescription")}
                    </FormDescription>
                  </FormItem>
                )}
              />
            </>
          )}
          <Button
            className="mt-2 w-full bg-secondary"
            disabled={!isValid || isLoadingDeactivate}
          >
            {t("submitButton")}
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
}
