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
import { generateQrCode } from "../../../services/generate-qrcode";
import { DialogTrigger } from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import { Skeleton } from "../../ui/skeleton";
import { useState } from "react";
import { refreshqrCode } from "../../../services/refresh-qrcode";

type DialogGenerateQrCodeProps = {
  sessionId: string;
  name: string;
  children: ReactNode;
};

export const DialogGenerateQrCode = ({
  sessionId,
  name,
  children,
}: DialogGenerateQrCodeProps) => {
  const [open, setOpen] = useState(false);

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["qr-code", sessionId],
    queryFn: () => generateQrCode({ sessionId }),
    enabled: open,
    refetchOnWindowFocus: false,
  });

  const refreshMutation = useMutation({
  mutationFn: () => refreshqrCode({ sessionId }),
  onSuccess: () => {
    // Após o refresh bem-sucedido, refaz a query do QR code
    refetch();
  },
});

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
            <Skeleton className="w-48 h-48" />
          ) : data?.qr ? (
            <img src={data.qr} alt="QR Code" className="w-48 h-48" />
          ) : (
            <div className="text-center">
              <QrCode className="w-16 h-16 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                QR Code não disponível
              </p>
            </div>
          )}

          <div className="text-center space-y-1">
            <p className="text-sm text-muted-foreground">
              1. Abra o WhatsApp no seu celular
            </p>
            <p className="text-sm text-muted-foreground">
              2. Toque em Menu ou Configurações
            </p>
            <p className="text-sm text-muted-foreground">
              3. Toque em Aparelhos conectados
            </p>
            <p className="text-sm text-muted-foreground">
              4. Toque em Conectar um aparelho
            </p>
            <p className="text-sm text-muted-foreground">
              5. Aponte seu telefone para esta tela
            </p>
          </div>
        </div>
        <DialogFooter className="flex justify-between">
          <Button
             onClick={() => refreshMutation.mutate()}
            disabled={isFetching}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            {isFetching ? "Gerando..." : "Gerar Novo QR"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
