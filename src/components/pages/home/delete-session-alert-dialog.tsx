import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteSession } from "@/http/mutation/delete-session";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { ReactNode } from "react";
import { toast } from "sonner";

type DeleteSessionAlertDialogProps = {
  sessionId: string;
  children: ReactNode;
};
export const DeleteSessionAlertDialog = ({
  sessionId,
  children,
}: DeleteSessionAlertDialogProps) => {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync: deleteSessionFn } = useMutation({
    mutationFn: deleteSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-sessions"] });
    },
    onError: (error: ErrorResponse) => {
      error.map((err) => toast.error(err.message));
    },
  });

  const handleDeleteSession = async () => {
    await deleteSessionFn({ sessionId });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Você tem certeza que deseja deletar esta sessão?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação é irreversível e removerá permanentemente a sessão do
            WhatsApp, incluindo todas as suas credenciais.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteSession} disabled={isPending}>
            Deletar sessão
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
