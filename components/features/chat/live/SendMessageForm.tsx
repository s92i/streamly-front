import { Button } from "@/components/ui/common/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/common/Form";
import { Textarea } from "@/components/ui/common/TextArea";
import { EmojiPicker } from "@/components/ui/elements/EmojiPicker";
import {
  useSendChatMessageMutation,
  type FindChannelByUsernameQuery,
} from "@/graphql/generated/output";
import {
  sendMessageSchema,
  type TypeSendMessageSchema,
} from "@/schemas/chat/send-message.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizonal } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface SendMessageFormProps {
  channel: FindChannelByUsernameQuery["findChannelByUsername"];
  isDisabled: boolean;
}

export function SendMessageForm({ channel, isDisabled }: SendMessageFormProps) {
  const t = useTranslations("layout.stream.chat.sendMessage");

  const form = useForm<TypeSendMessageSchema>({
    resolver: zodResolver(sendMessageSchema),
    defaultValues: { text: "" },
  });

  const [send, { loading: isLoadingSend }] = useSendChatMessageMutation({
    onError() {
      toast.error(t("errorMessage"));
    },
  });

  const { isValid } = form.formState;

  function onSubmit(data: TypeSendMessageSchema) {
    send({
      variables: {
        data: {
          text: data.text,
          streamId: channel.stream?.id!,
        },
      },
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-3 flex items-center"
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <div className="relative w-full">
                  <div className="flex items-end gap-2">
                    <Textarea
                      {...field}
                      rows={1}
                      disabled={isDisabled}
                      placeholder={t("placeholder")}
                      className="
                        min-h-[42px] max-h-[200px] resize-none overflow-hidden flex-1
                        pl-10 pr-12
                      "
                      onInput={(e) => {
                        e.currentTarget.style.height = "auto";
                        e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          form.handleSubmit(onSubmit)();
                        }
                      }}
                    />
                    <Button
                      size="lgIcon"
                      type="submit"
                      disabled={isDisabled || !isValid}
                      className="mb-0.5"
                    >
                      <SendHorizonal className="size-4" />
                    </Button>
                  </div>
                  <div className="absolute left-2 top-2 cursor-pointer">
                    <EmojiPicker
                      onChange={(emoji: string) =>
                        field.onChange(`${field.value} ${emoji}`)
                      }
                      isDisabled={isDisabled}
                    />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
