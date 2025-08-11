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
import { logoutSession } from "@/http/mutation/logout-session";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { toast } from "sonner";

type LogoutSessionAlertDialogProps = {
  sessionId: string;
  children: ReactNode;
};

export const LogoutSessionAlertDialog = ({
  sessionId,
  children,
}: LogoutSessionAlertDialogProps) => {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync: logoutSessionFn } = useMutation({
    mutationFn: logoutSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-sessions"] });
      toast.success(
        "Sessão desconectada com sucesso. Escaneie o novo QR Code para reconectar."
      );
    },
    onError: (error: ErrorResponse) => {
      toast.error(error.message);
    },
  });

  const handleLogoutSession = async () => {
    await logoutSessionFn({ sessionId });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar desconexão da sessão</AlertDialogTitle>
          <AlertDialogDescription>
            Você está prestes a desconectar esta sessão do WhatsApp. Isso vai
            liberar o uso em outro celular. Após confirmar, será gerado um novo
            QR Code para reconexão.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogoutSession} disabled={isPending}>
            Desconectar sessão
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
