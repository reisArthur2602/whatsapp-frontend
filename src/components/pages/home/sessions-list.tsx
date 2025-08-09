import { useQuery } from "@tanstack/react-query";
import { getSessions } from "../../../services/get-sessions";
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
import { Link2Icon,QrCode} from "lucide-react";
import { DialogGenerateQrCode } from "./dialog-generate-qrcode";
import { DialogUpsertWebHook } from "./dialog-upsert-webhook";

type Session = {
  sessionId: string;
  name: string;
  connected: boolean;
  webhookUrl: string | null;
};

export const SessionsList = () => {
  const { data: sessions } = useQuery<Session[] | []>({
    queryKey: ["get-sessions"],
    queryFn: getSessions,
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
              <TableRow key={session.sessionId}>
                <TableCell className="font-medium">{session.name}</TableCell>
                <TableCell>
                  {session.connected ? "Conectado" : "Desconectado"}
                </TableCell>

                <TableCell>
                  {session.webhookUrl ? (
                    <Badge variant="outline">Configurado</Badge>
                  ) : (
                    <Badge variant="secondary">Não configurado</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {session.connected && (
                      <DialogUpsertWebHook
                        webhookUrl={session.webhookUrl}
                        sessionId={session.sessionId}
                      >
                        <Button size="sm" variant="outline">
                          <Link2Icon className="w-4 h-4" />
                        </Button>
                      </DialogUpsertWebHook>
                    )}

                    {!session.connected && (
                      <DialogGenerateQrCode
                        name={session.name}
                        sessionId={session.sessionId}
                      >
                        <Button size="sm" variant="outline">
                          <QrCode className="w-4 h-4" />
                        </Button>
                      </DialogGenerateQrCode>
                    )}
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
