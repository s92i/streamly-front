"use client";

import { useLoginUserMutation } from "@/graphql/generated/output";
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

export function LoginForm() {
  const t = useTranslations("layout.auth.login");

  const { auth } = useAuth();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isShowTwoFactor, setIsShowTwoFactor] = useState(false);

  const form = useForm<TypeLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const [login, { loading: isLoadingLogin }] = useLoginUserMutation({
    onCompleted(data) {
      const message = data.loginUser?.message;

      if (message === "A code is required to complete authorization") {
        setIsShowTwoFactor(true);
      } else if (message === "Login successful") {
        auth();
        toast.success(t("successMessage"));
        router.push("/dashboard/settings");
      } else {
        toast.error("Unexpected login response");
      }
    },
    onError() {
      toast.error(t("errorMessage"));
    },
  });

  const { isValid } = form.formState;

  function onSubmit(data: TypeLoginSchema) {
    login({ variables: { data } });
  }

  return (
    <AuthWrapper
      heading={t("heading")}
      backButtonLabel={t("backButtonLabel")}
      backButtonHref="/account/create"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-3">
          {isShowTwoFactor ? (
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
                name="login"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("loginLabel")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="username"
                        {...field}
                        disabled={isLoadingLogin}
                      />
                    </FormControl>
                    <FormDescription>{t("loginDescription")}</FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>{t("passwordLabel")}</FormLabel>
                      <Link
                        href="/account/recovery"
                        className="ml-auto inline-block text-sm"
                      >
                        {t("forgotPassword")}
                      </Link>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="********"
                          type={showPassword ? "text" : "password"}
                          {...field}
                          disabled={isLoadingLogin}
                        />
                        <button
                          type="button"
                          tabIndex={-1}
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 focus:outline-none"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          disabled={isLoadingLogin}
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
            disabled={!isValid || isLoadingLogin}
          >
            {t("submitButton")}
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
}
