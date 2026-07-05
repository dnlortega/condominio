# Recanto dos Pássaros

Portal do condomínio Residencial Recanto dos Pássaros (Bauru/SP): site institucional público, painel administrativo para a síndica e Portal do Morador para os residentes.

## Funcionalidades

- **Site público**: apresentação do residencial, plantas, localização, regimento interno, concessionárias/serviços e formulário de contato.
- **Painel administrativo** (`/admin`): moradores, avisos, áreas comuns e reservas, chamados de manutenção, portaria virtual, veículos, pets, encomendas, ocorrências, documentos, enquetes, mural social, concessionárias, animações de UI e tema sazonal.
- **Portal do Morador** (`/portal`): login próprio do morador com acesso a avisos, reservas, chamados, visitantes, veículos, pets, encomendas, ocorrências, documentos, enquetes e mural.
- **Tema sazonal**: a cor de destaque do site público muda automaticamente em datas comemorativas (Natal, Ano Novo, Carnaval, Páscoa, Festa Junina, Independência), com painel de controle no admin.
- **PWA**: instalável na tela inicial do Android/iOS, com fallback offline.

## Stack

Next.js (App Router) · TypeScript · Prisma + PostgreSQL · Tailwind CSS v4 · shadcn/ui · Framer Motion

## Rodando localmente

```bash
npm install
npx prisma db push
npm run dev
```

Variáveis de ambiente necessárias (`.env`):

```
DATABASE_URL=postgresql://...
ADMIN_PASSWORD=            # senha do painel /admin (padrão: admin123)
JWT_SECRET_KEY=            # segredo para assinatura das sessões
```
