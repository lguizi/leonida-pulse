# Leonida Pulse

Rede social fictícia, imersiva e não oficial ambientada em Leonida, criada como projeto acadêmico. A aplicação demonstra arquitetura frontend moderna, experiência responsiva e interações persistidas no navegador.

![Preview do Leonida Pulse](public/og.png)

## Funcionalidades

- Entrada cinematográfica com escolha de identidade.
- Feed com 30 publicações, 12 stories, reações, itens salvos e rolagem incremental.
- Criação de publicação e persistência com LocalStorage.
- Explorar com busca dinâmica; perfis e galeria.
- 10 conversas, mensagens locais e indicadores de presença.
- Mapa fictício interativo, 10 eventos e confirmações de presença.
- 12 veículos na garagem, 15 itens de mercado fictício e 6 crews.
- 20 notificações com leitura e limpeza.
- Leonida AI local baseada em palavras-chave, sem chave de API.
- Preferências, exportação JSON, restauração, PWA, 404 e Error Boundary.

## Tecnologias

React 19, Vite, TypeScript, React Router, Lucide React, Zustand, React Hook Form, Zod, Framer Motion, date-fns e Recharts. A demonstração usa CSS responsivo próprio e LocalStorage.

## Instalação

```bash
npm install
npm run dev
```

Validação de produção:

```bash
npm run lint
npm run build
npm run preview
```

## Vercel

Importe o repositório, selecione o preset **Vite**, use `npm run build` e diretório `dist`. O `vercel.json` inclui o fallback necessário para rotas do React Router. Nenhuma variável é obrigatória; consulte `.env.example` para integrações futuras.

## Apresentação acadêmica

Comece pela entrada, publique algo no feed, demonstre persistência, abra Mensagens, Mapa, Eventos, Garagem, Mercado, Leonida AI e finalize exportando os dados. Consulte `ROTEIRO_APRESENTACAO.md`.

## Aviso

Projeto acadêmico não oficial e sem afiliação com Rockstar Games ou Take-Two Interactive. Grand Theft Auto e seus personagens são propriedades de seus respectivos titulares. Veja `DISCLAIMER.md` e `ASSET_SOURCES.md`.
