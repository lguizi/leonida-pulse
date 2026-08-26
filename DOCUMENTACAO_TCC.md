# Documentação técnica — Leonida Pulse

## 1. Problema e proposta

Redes sociais modernas concentram conteúdo, descoberta, mensagens e comunidades, mas frequentemente não deixam clara a origem de conteúdo ficcional. O Leonida Pulse propõe uma demonstração imersiva que separa referências públicas oficiais de narrativas criadas para fins acadêmicos.

## 2. Público-alvo

Estudantes de tecnologia e design, avaliadores acadêmicos e usuários interessados em experiências digitais narrativas. O produto não é um serviço comercial nem uma fonte oficial sobre GTA VI.

## 3. Identidade visual

A marca original combina gradientes coral, rosa, roxo e ciano, clima tropical noturno, vidro moderado e paisagens abstratas criadas em CSS. O logotipo, favicon e card social não reproduzem a identidade visual da Rockstar.

## 4. Arquitetura

O projeto é uma SPA em React e TypeScript. `src/App.tsx` organiza rotas e superfícies; `components` contém elementos reutilizáveis e tratamento de erros; `data` concentra os dados demonstrativos; `hooks` encapsula persistência; `services` isola a lógica da Leonida AI; `types` descreve os contratos.

## 5. React, Vite e componentes

Vite oferece servidor local rápido, HMR e build otimizado. React organiza a interface em componentes funcionais. React Router conecta URLs reais às páginas e o fallback do Vercel mantém o roteamento após atualização direta.

## 6. Hooks e eventos

`useState` controla formulários e seleção; `useEffect` sincroniza LocalStorage; `useMemo` filtra resultados; `useCallback` estabiliza a ação de restauração; o hook `useLocalStorage` abstrai persistência. A interface emprega `onClick`, `onChange`, `onSubmit` e `onKeyDown`. A composição aceita Enter como envio.

## 7. Persistência

Curtidas, salvos, posts criados, mensagens, confirmações, carrinho, grupos, notificações e preferências ficam no navegador. A área de configurações exporta JSON, limpa dados com confirmação e restaura a demonstração.

## 8. Leonida AI

O assistente funciona sem chave por meio de regras locais e palavras-chave. A função está isolada em `src/services/leonidaAI.ts`, permitindo substituição futura por endpoint serverless. Chaves nunca devem usar o prefixo `VITE_` nem ser incluídas no frontend.

## 9. Responsividade e acessibilidade

O layout adapta três colunas para navegação inferior móvel. Elementos nativos preservam teclado e foco; textos têm contraste alto; áreas interativas possuem rótulos contextuais; `prefers-reduced-motion` é respeitado. O Error Boundary oferece recuperação diante de falhas.

## 10. Segurança e direitos autorais

Não há autenticação real, pagamento, segredos ou chamadas externas. Mercado e créditos são simulações explícitas. Narrativas adicionais recebem aviso de ficção. Nenhum vazamento, mapa oficial ou imagem filtrada foi usado.

## 11. Demonstração funcional

A base inclui 15 perfis, 30 posts, 12 stories, 10 eventos, 10 conversas, 20 notificações, 12 veículos, 15 itens e 6 grupos. Os contadores reagem imediatamente e as ações relevantes fornecem feedback.

## 12. GitHub e Vercel

O repositório contém licença, changelog, guia de contribuição, fontes de ativos, variáveis de exemplo e configuração de rewrite. O fluxo esperado é GitHub → importação na Vercel → preset Vite → build `npm run build` → saída `dist`.

## 13. Limitações e evolução

A persistência é local ao dispositivo; vídeos e imagens são simulados; não há backend ou moderação real. Evoluções possíveis incluem autenticação, banco de dados, upload seguro, testes automatizados, internacionalização completa, função serverless de IA e moderação assistida.
