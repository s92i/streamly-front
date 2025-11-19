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
import { Textarea } from "@/components/ui/common/TextArea";
import { FormWrapper } from "@/components/ui/elements/FormWrapper";
import { useChangeProfileInfoMutation } from "@/graphql/generated/output";
import { useCurrent } from "@/hooks/useCurrent";
import {
  changeInfoSchema,
  type TypeChangeInfoSchema,
} from "@/schemas/user/change-info.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function ChangeInfoForm() {
  const t = useTranslations("layout.dashboard.settings.profile.info");

  const { user, isLoadingProfile, refetch } = useCurrent();

  const form = useForm<TypeChangeInfoSchema>({
    resolver: zodResolver(changeInfoSchema),
    values: {
      username: user?.username ?? "",
      displayName: user?.displayName ?? "",
      bio: user?.bio ?? "",
    },
  });

  const [update, { loading: isLoadingUpdate }] = useChangeProfileInfoMutation({
    onCompleted() {
      refetch();
      toast.success(t("successMessage"));
    },
    onError() {
      toast.error(t("errorMessage"));
    },
  });

  const { isValid, isDirty } = form.formState;

  function onSubmit(data: TypeChangeInfoSchema) {
    update({ variables: { data } });
  }

  return isLoadingProfile ? (
    <ChangeInfoFormSkeleton />
  ) : (
    <FormWrapper heading={t("heading")}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-3">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="px-5">
                <FormLabel>{t("usernameLabel")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("usernamePlaceholder")}
                    {...field}
                    disabled={isLoadingUpdate}
                  />
                </FormControl>
                <FormDescription>{t("usernameDescription")}</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem className="px-5 pb-3">
                <FormLabel>{t("displayNameLabel")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("displayNamePlaceholder")}
                    {...field}
                    disabled={isLoadingUpdate}
                  />
                </FormControl>
                <FormDescription>{t("displayNameDescription")}</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="px-5 pb-3">
                <FormLabel>{t("bioLabel")}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t("bioPlaceholder")}
                    {...field}
                    disabled={isLoadingUpdate}
                  />
                </FormControl>
                <FormDescription>{t("bioDescription")}</FormDescription>
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

export function ChangeInfoFormSkeleton() {
  return <Skeleton className="h-96 w-full" />;
}
