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

import { upsertWebhook } from "@/http/mutation/upsert-Webhook";

const upsertWebhookSchema = z.object({
  webhookUrl: z.string().min(1, "A URL do webhook é obrigatória"),
});

type UpsertWebhook = z.infer<typeof upsertWebhookSchema>;

type UpsertWebHookDialogProps = {
  sessionId: string;
  children: React.ReactNode;
  webhookUrl: string | null;
};

export const UpsertWebHookDialog = ({
  sessionId,
  children,
  webhookUrl,
}: UpsertWebHookDialogProps) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const methods = useForm<UpsertWebhook>({
    resolver: zodResolver(upsertWebhookSchema),
    defaultValues: {
      webhookUrl: webhookUrl || "",
    },
  });

  const isEditing = !!webhookUrl;

  const { mutateAsync: upsertWebhookFn } = useMutation({
    mutationFn: upsertWebhook,
    onSuccess: () => {
      toast.success(
        isEditing
          ? "Webhook atualizado com sucesso!"
          : "Webhook configurado com sucesso!"
      );
      queryClient.invalidateQueries({ queryKey: ["get-sessions"] });
      setOpen(false);
    },
    onError: (error: ErrorResponse) => {
      error.map((err) => toast.error(err.message));
    },
  });

  const handleUpsertWebhook = async (data: UpsertWebhook) => {
    await upsertWebhookFn({
      sessionId,
      webhookUrl: data.webhookUrl,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Webhook" : "Configurar Webhook"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Atualize a URL do webhook para receber eventos da sessão"
              : "Configure a URL do webhook para receber eventos da sessão"}
          </DialogDescription>
        </DialogHeader>

        <Form {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleUpsertWebhook)}
            className="space-y-4"
          >
            <FormField
              control={methods.control}
              name="webhookUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL do Webhook</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://api.exemplo.com/webhook"
                      {...field}
                      disabled={methods.formState.isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button disabled={methods.formState.isSubmitting}>
                {methods.formState.isSubmitting
                  ? "Salvando..."
                  : isEditing
                  ? "Atualizar Webhook"
                  : "Salvar Webhook"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
