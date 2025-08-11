import { type PropsWithChildren, useState } from "react";

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
import { createSession } from "../../../http/mutation/create-session";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

const createSessionSchema = z.object({
  name: z.string().min(1, "O nome da sessão é obrigatório"),
});

type CreateSession = z.infer<typeof createSessionSchema>;

export const CreateSessionDialog = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const methods = useForm<CreateSession>({
    resolver: zodResolver(createSessionSchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutateAsync: createSessionFn } = useMutation({
    mutationFn: createSession,
    onSuccess: () => {
      methods.reset();
      queryClient.invalidateQueries({ queryKey: ["get-sessions"] });
      setOpen(false);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const message = error.response?.data?.message;
      toast.error(message);
    },
  });

  const handleCreateSession = async (data: CreateSession) => {
    await createSessionFn({ name: data.name });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova Sessão</DialogTitle>
          <DialogDescription>
            Crie uma nova sessão do WhatsApp
          </DialogDescription>
        </DialogHeader>

        <Form {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleCreateSession)}
            className="space-y-4"
          >
            <FormField
              control={methods.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Sessão</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Atendimento, Vendas, Suporte"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={methods.formState.isSubmitting}>
                {methods.formState.isSubmitting ? "Criando..." : "Criar Sessão"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
