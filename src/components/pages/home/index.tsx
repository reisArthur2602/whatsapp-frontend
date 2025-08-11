import { Plus } from "lucide-react";

import { Button } from "../../ui/button";
import { SessionsList } from "./sessions-list";
import { CreateSessionDialog } from "./create-session-dialog";

const Home = () => {
  return (
    <main className="container mx-auto p-6 sm:p-10 space-y-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2">Gerenciador WhatsApp</h1>
          <p>Controle facilmente suas sessões e conexões do WhatsApp</p>
        </div>

        <div className="flex gap-2">
          <CreateSessionDialog>
            <Button size="lg">
              <Plus />
              Criar Nova Sessão
            </Button>
          </CreateSessionDialog>
        </div>
      </div>

      <SessionsList />
    </main>
  );
};

export default Home;
