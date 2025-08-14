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
    refetchInterval: 10000,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sessões Ativas</CardTitle>
        <CardDescription>
          {sessions?.length ?? 0} sessão(ões) encontrada(s)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Webhook</TableHead>
              <TableHead>Última Atualização</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions?.map((session) => {
              const isConnected = session.connected;
              return (
                <TableRow key={session.id}>
                  <TableCell className="font-medium">{session.name}</TableCell>
                  <TableCell>
                    {isConnected ? (
                      <span className="text-green-600 font-semibold">
                        Online
                      </span>
                    ) : (
                      <span className="text-red-600 font-semibold">
                        Offline
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {session.onReceive_webhookUrl ||
                    session.onSend_webhookUrl ||
                    session.onUpdateStatus_webhookUrl ? (
                      <Badge variant="secondary">Conectado</Badge>
                    ) : (
                      <Badge variant="outline">Desconectado</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(session.updated_at).toLocaleString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 flex-wrap">
                      {!isConnected ? (
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
                            onReceive_webhookUrl={session.onReceive_webhookUrl}
                            onSend_webhookUrl={session.onSend_webhookUrl}
                            onUpdateStatus_webhookUrl={
                              session.onUpdateStatus_webhookUrl
                            }
                            sessionId={session.id}
                          >
                            <Button
                              size="sm"
                              variant="outline"
                              title="Configurar Webhook"
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

                      {!isConnected && (
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
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
