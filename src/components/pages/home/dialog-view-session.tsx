import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

type DialogViewSessionProps = {
  sessionId: string;
  children: ReactNode;
  name: string;
};

export const ViewSessionDialog = ({
  children,
  sessionId,
  name,
}: DialogViewSessionProps) => {
  const copySessionId = async (sessionId: string) => {
    try {
      await navigator.clipboard.writeText(`SESSION_ID=${sessionId}`);
      toast.success("Copiado!", {
        description: "ID da sessão copiado para a área de transferência",
      });
    } catch (error) {
      console.log("Falha ao copiar ID da sessão", error);
      toast.error("Erro", {
        description: "Falha ao copiar ID da sessão",
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Session ID</DialogTitle>
          <DialogDescription>
            <DialogDescription>ID da sessão "{name}"</DialogDescription>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input value={sessionId} readOnly />
            <Button onClick={() => copySessionId(sessionId)} variant="outline">
              <Copy />
            </Button>
          </div>
          <p>
            Use este ID para identificar a sessão em suas integrações e chamadas
            de API.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
