import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";

import { Input } from "../../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../ui/button";
import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { upsertWebhook } from "@/http/mutation/upsert-webhook";
import { LucideLoader2 } from "lucide-react";

const upsertWebhookSchema = z.object({
  onReceive_webhookUrl: z.url("URL inválida").or(z.literal("")).optional(),
  onSend_webhookUrl: z.url("URL inválida").or(z.literal("")).optional(),
  onUpdateStatus_webhookUrl: z.url("URL inválida").or(z.literal("")).optional(),
});

type UpsertWebhook = z.infer<typeof upsertWebhookSchema>;

type UpsertWebHookDialogProps = {
  sessionId: string;
  children: React.ReactNode;
  onReceive_webhookUrl: string | null;
  onSend_webhookUrl: string | null;
  onUpdateStatus_webhookUrl: string | null;
};

export const UpsertWebHookDialog = ({
  sessionId,
  children,
  onReceive_webhookUrl,
  onSend_webhookUrl,
  onUpdateStatus_webhookUrl,
}: UpsertWebHookDialogProps) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const methods = useForm<UpsertWebhook>({
    resolver: zodResolver(upsertWebhookSchema),
    defaultValues: {
      onReceive_webhookUrl: onReceive_webhookUrl || "",
      onSend_webhookUrl: onSend_webhookUrl || "",
      onUpdateStatus_webhookUrl: onUpdateStatus_webhookUrl || "",
    },
  });

  const { mutateAsync: upsertWebhookFn } = useMutation({
    mutationFn: upsertWebhook,
    onSuccess: () => {
      toast.success("Webhook(s) atualizado(s) com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["get-sessions"] });
      setOpen(false);
    },
    onError: (error: ErrorResponse) => {
      error.map((err) => toast.error(err.message));
    },
  });

  const handleUpsertWebhook = async (data: UpsertWebhook) => {
    type Payload = {
      onReceive_webhookUrl?: string;
      onSend_webhookUrl?: string;
      onUpdateStatus_webhookUrl: string;
    };
    const payload = {} as Payload;

    if (data.onReceive_webhookUrl)
      payload.onReceive_webhookUrl = data.onReceive_webhookUrl;

    if (data.onSend_webhookUrl)
      payload.onSend_webhookUrl = data.onSend_webhookUrl;

    if (data.onUpdateStatus_webhookUrl)
      payload.onUpdateStatus_webhookUrl = data.onUpdateStatus_webhookUrl;

    await upsertWebhookFn({
      sessionId,
      ...payload,
    });
  };
  const isLoading = methods.formState.isSubmitting;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configurar Webhooks</DialogTitle>
          <DialogDescription>
            Configure as URLs dos webhooks para receber eventos da sessão
          </DialogDescription>
        </DialogHeader>

        <Form {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleUpsertWebhook)}
            className="space-y-4"
          >
            <FormField
              control={methods.control}
              name="onReceive_webhookUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ao receber</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://api.exemplo.com/on-receive"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={methods.control}
              name="onSend_webhookUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ao enviar</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://api.exemplo.com/on-send"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={methods.control}
              name="onUpdateStatus_webhookUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receber status da mensagem</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://api.exemplo.com/on-update-status"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button disabled={isLoading}>
                {isLoading && <LucideLoader2 className="animate-spin" />}

                {isLoading ? "Salvando..." : "Salvar Webhooks"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
