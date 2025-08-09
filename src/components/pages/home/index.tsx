import { Bot, Plus } from "lucide-react";
import { DialogCreateSession } from "./dialog-create-session";
import { Button } from "../../ui/button";
import { SessionsList } from "./sessions-list";

const Home = () => {
  return (
    <main className="container mx-auto p-6 sm:p-10 space-y-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Bot className="size-8" />
            Gerenciador WhatsApp
          </h1>
          <p className="text-muted-foreground">
            Gerencie suas sessões e integrações do WhatsApp
          </p>
        </div>

        <div className="flex gap-2">
          <DialogCreateSession>
            <Button>
              <Plus />
              Nova Sessão
            </Button>
          </DialogCreateSession>
        </div>
      </div>

      <SessionsList />
    </main>
  );
};

export default Home;
