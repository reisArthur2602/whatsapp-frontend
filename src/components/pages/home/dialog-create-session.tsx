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
import { createSession } from "../../../services/create-session";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const createSessionSchema = z.object({
  name: z.string().min(1, "O nome da sessão é obrigatório"),
});

type CreateSession = z.infer<typeof createSessionSchema>;

export const DialogCreateSession = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false);
  const methods = useForm<CreateSession>({
    resolver: zodResolver(createSessionSchema),
    defaultValues: {
      name: "",
    },
  });
  const queryClient = useQueryClient();

  const handleCreateSession = async (data: CreateSession) => {
    const { success } = await createSession({ name: data.name });
    if (!success) return toast.error("Erro ao criar sessão");

    toast.success("Sessão criada com sucesso!");
    queryClient.invalidateQueries({ queryKey: ["get-sessions"] });
    methods.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Nova Sessão</DialogTitle>
          <DialogDescription>
            Crie uma nova instância de sessão WhatsApp
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
