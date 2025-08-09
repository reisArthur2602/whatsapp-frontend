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
import { setWebhook } from "../../../services/set-webhook";
import { useQueryClient } from "@tanstack/react-query";

const upsertWebhookSchema = z.object({
  webhookUrl: z.string().min(1, "A URL do webhook é obrigatória"),
});

type UpsertWebhook = z.infer<typeof upsertWebhookSchema>;

type DialogUpsertWebHookProps = {
  sessionId: string;
  children: React.ReactNode;
  webhookUrl: string | null;
};

export const DialogUpsertWebHook = ({
  sessionId,
  children,
  webhookUrl,
}: DialogUpsertWebHookProps) => {
  const [open, setOpen] = useState(false);
  const methods = useForm<UpsertWebhook>({
    resolver: zodResolver(upsertWebhookSchema),
    defaultValues: {
      webhookUrl: webhookUrl || "",
    },
  });
  const queryClient = useQueryClient();
  const isEditing = !!webhookUrl;

  const handleUpsertWebhook = async (data: UpsertWebhook) => {
    const { success } = await setWebhook({
      sessionId,
      webhookUrl: data.webhookUrl,
    });
    if (!success) {
      return toast.error(
        isEditing ? "Erro ao atualizar webhook" : "Erro ao configurar webhook"
      );
    }

    toast.success(
      isEditing
        ? "Webhook atualizado com sucesso!"
        : "Webhook configurado com sucesso!"
    );
    queryClient.invalidateQueries({ queryKey: ["get-sessions"] });
    methods.reset();
    setOpen(false);
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
