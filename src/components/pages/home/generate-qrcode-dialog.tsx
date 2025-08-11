import { QrCode, RefreshCw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { generateQrCode } from "../../../http/query/generate-qrcode";
import { DialogTrigger } from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import { Skeleton } from "../../ui/skeleton";
import { useState } from "react";
import { refreshQrCode } from "@/http/mutation/refresh-qrcode";
import type { AxiosError } from "axios";
import { toast } from "sonner";

type DialogGenerateQrCodeProps = {
  sessionId: string;
  name: string;
  children: ReactNode;
};

export const GenerateQrCodeDialog = ({
  sessionId,
  name,
  children,
}: DialogGenerateQrCodeProps) => {
  const [open, setOpen] = useState(false);

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["qrcode", sessionId],
    queryFn: () => generateQrCode({ sessionId }),
  });

  const { mutateAsync: refreshQrCodeFn } = useMutation({
    mutationFn: refreshQrCode,
    onSuccess: () => refetch(),
    onError: (error: AxiosError<ErrorResponse>) => {
      const message = error.response?.data?.message;
      toast.error(message);
    },
  });

  const handleRefreshQrCode = async () => {
    await refreshQrCodeFn({ sessionId });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Sincronizar WhatsApp</DialogTitle>
          <DialogDescription>
            Escaneie o QR Code com seu WhatsApp para conectar a sessão "{name}"
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4">
          {isLoading || isFetching ? (
            <Skeleton className="w-52 h-52" />
          ) : data?.qr ? (
            <img src={data.qr} alt="QR Code da sessão" className="w-52 h-52" />
          ) : (
            <div className="text-center space-y-2 text-muted-foreground">
              <QrCode className="w-28 h-28 mx-auto" />
              <p>QR Code não disponível</p>
            </div>
          )}

          <ul className="text-center space-y-2 text-sm font-medium text-muted-foreground">
            <li>1. Abra o WhatsApp no seu celular</li>
            <li>2. Toque em Menu ou Configurações</li>
            <li>3. Toque em Aparelhos conectados</li>
            <li>4. Toque em Conectar um aparelho</li>
            <li>5. Aponte seu telefone para esta tela</li>
          </ul>
        </div>

        <DialogFooter className="flex justify-between">
          <Button onClick={handleRefreshQrCode} disabled={isFetching}>
            <RefreshCw />
            {isFetching ? "Gerando..." : "Gerar Novo "}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
