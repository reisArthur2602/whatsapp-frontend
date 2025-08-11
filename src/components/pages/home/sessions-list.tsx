import { useQuery } from "@tanstack/react-query";
import { getSessions } from "../../../http/query/get-sessions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import {
  Copy,
  Link,
  LucideTabletSmartphone,
  LucideTrash2,
  QrCode,
} from "lucide-react";
import { UpsertWebHookDialog } from "./upsert-webhook-dialog";
import { GenerateQrCodeDialog } from "./generate-qrcode-dialog";
import { ViewSessionDialog } from "./dialog-view-session";
import { DeleteSessionAlertDialog } from "./delete-session-alert-dialog";
import { LogoutSessionAlertDialog } from "./logout-session-alert-dialog";

export const SessionsList = () => {
  const { data: sessions } = useQuery({
    queryKey: ["get-sessions"],
    queryFn: getSessions,
    refetchInterval: 20000,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sessões Ativas</CardTitle>
        <CardDescription>
          {sessions?.length} sessão(ões) encontrada(s)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Webhook</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions?.map((session) => (
              <TableRow key={session.id}>
                <TableCell className="font-medium">{session.name}</TableCell>
                <TableCell>
                  {session.connected ? "Conectado" : "Desconectado"}
                </TableCell>

                <TableCell>
                  {session.webhookUrl ? (
                    <Badge>Configurado</Badge>
                  ) : (
                    <Badge variant="outline">Não configurado</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {!session.connected ? (
                      <GenerateQrCodeDialog
                        name={session.name}
                        sessionId={session.id}
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          title="Gerar QRCode"
                        >
                          <QrCode className="w-4 h-4" />
                        </Button>
                      </GenerateQrCodeDialog>
                    ) : (
                      <>
                        <UpsertWebHookDialog
                          webhookUrl={session.webhookUrl}
                          sessionId={session.id}
                        >
                          <Button
                            size="sm"
                            variant="outline"
                            title="Configurar qr-Code"
                          >
                            <Link className="w-4 h-4" />
                          </Button>
                        </UpsertWebHookDialog>

                        <LogoutSessionAlertDialog sessionId={session.id}>
                          <Button
                            size="sm"
                            variant="outline"
                            title="Deslogar da sessão"
                          >
                            <LucideTabletSmartphone className="w-4 h-4" />
                          </Button>
                        </LogoutSessionAlertDialog>
                      </>
                    )}

                    {!session.connected && (
                      <DeleteSessionAlertDialog sessionId={session.id}>
                        <Button
                          size="sm"
                          variant="outline"
                          title="Deletar sessão"
                        >
                          <LucideTrash2 className="w-4 h-4" />
                        </Button>
                      </DeleteSessionAlertDialog>
                    )}

                    <ViewSessionDialog
                      name={session.name}
                      sessionId={session.id}
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        title="Ver Session ID"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </ViewSessionDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
