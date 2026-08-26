import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Braces,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  FolderTree,
  MousePointerClick,
  Presentation,
  Sparkles,
} from "lucide-react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const requirements = [
  ["React + Vite", "Aplicação SPA rápida, dividida em rotas e componentes."],
  ["Inteligência artificial", "Leonida AI responde localmente e demonstra o fluxo de um assistente."],
  ["App e main", "main.tsx inicia a árvore React; App.tsx organiza rotas e módulos."],
  ["Componentes", "Avatar, ErrorBoundary e ProjectPage são reutilizáveis."],
  ["Hooks", "useState, useEffect, useMemo e useLocalStorage controlam estado e efeitos."],
  ["Eventos", "onClick, onChange, onSubmit e onKeyDown tornam a interface interativa."],
] as const;

const tour = [
  {
    kicker: "01 · PROBLEMA",
    title: "Uma rede social ambientada em Leonida",
    text: "O projeto transforma o universo divulgado de GTA VI em uma experiência social fictícia, com feed, perfis, mensagens, mapa, eventos e IA.",
  },
  {
    kicker: "02 · ARQUITETURA",
    title: "React organiza a experiência em camadas",
    text: "O ponto de entrada monta o App, as rotas escolhem cada tela, os componentes cuidam da interface e hooks e serviços concentram comportamentos reutilizáveis.",
  },
  {
    kicker: "03 · INTERAÇÃO",
    title: "Eventos atualizam a interface em tempo real",
    text: "Curtidas, buscas, filtros, mensagens, publicações e navegação respondem às ações do usuário sem recarregar a página.",
  },
  {
    kicker: "04 · IA",
    title: "Leonida AI fecha o ciclo da demonstração",
    text: "O assistente sugere legendas, hashtags e lugares. A versão acadêmica funciona localmente, sem expor chaves de API no navegador.",
  },
] as const;

const chartData = [
  { name: "Telas", value: 11, color: "#ff72bc" },
  { name: "Interações", value: 18, color: "#8d7cff" },
  { name: "Persistências", value: 7, color: "#55c9ff" },
];

export function ProjectPage() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState("App.tsx");
  const current = tour[step];

  useEffect(() => {
    document.title = "Sobre o projeto | Leonida Pulse";
    return () => {
      document.title = "Leonida Pulse";
    };
  }, []);

  const progress = useMemo(() => ((step + 1) / tour.length) * 100, [step]);

  return (
    <main className="feature-page project-page">
      <header className="project-hero">
        <div>
          <p className="eyebrow">APRESENTAÇÃO DO PROJETO · REACT + IA</p>
          <h1>Por dentro do <span>Leonida Pulse</span></h1>
          <p>
            Uma visão guiada da ideia, da arquitetura e dos recursos exigidos
            na atividade acadêmica.
          </p>
        </div>
        <div className="project-score" aria-label="requisitos atendidos">
          <strong>6/6</strong>
          <span>requisitos atendidos</span>
        </div>
      </header>

      <section className="guided-tour" aria-live="polite">
        <div className="tour-progress"><i style={{ width: `${progress}%` }} /></div>
        <motion.div
          key={current.title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
        >
          <p className="eyebrow">{current.kicker}</p>
          <h2>{current.title}</h2>
          <p>{current.text}</p>
        </motion.div>
        <footer>
          <button onClick={() => setStep((step - 1 + tour.length) % tour.length)}>
            <ChevronLeft /> Anterior
          </button>
          <span>{step + 1} de {tour.length}</span>
          <button onClick={() => setStep((step + 1) % tour.length)}>
            Próximo <ChevronRight />
          </button>
        </footer>
      </section>

      <section className="project-section">
        <div className="section-heading">
          <div><p className="eyebrow">CHECKLIST DO PROFESSOR</p><h2>Cada requisito aparece no produto</h2></div>
          <CheckCircle2 />
        </div>
        <div className="requirement-grid">
          {requirements.map(([title, text], index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
            >
              <span>0{index + 1}</span><CheckCircle2 />
              <h3>{title}</h3><p>{text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="project-section architecture-section">
        <div>
          <p className="eyebrow">FLUXO DA APLICAÇÃO</p>
          <h2>Do navegador até o componente</h2>
          <div className="architecture-flow">
            {["index.html", "main.tsx", "App.tsx", "Rotas", "Componentes"].map((item, index) => (
              <button className={selected === item ? "selected" : ""} onClick={() => setSelected(item)} key={item}>
                {index === 0 ? <Code2 /> : index < 3 ? <Braces /> : <FolderTree />}
                {item}
              </button>
            ))}
          </div>
          <p className="architecture-caption">
            <strong>{selected}</strong> — {selected === "main.tsx"
              ? "cria a raiz React e ativa o ErrorBoundary."
              : selected === "App.tsx"
                ? "centraliza navegação, rotas e composição das páginas."
                : selected === "Componentes"
                  ? "encapsulam interface e comportamento reutilizáveis."
                  : selected === "Rotas"
                    ? "ligam cada URL a uma experiência do produto."
                    : "carrega o ponto de entrada do aplicativo."}
          </p>
        </div>
        <div className="project-chart">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={chartData} dataKey="value" innerRadius={62} outerRadius={94} paddingAngle={4}>
                {chartData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "#261f52", border: "1px solid #8879bc", borderRadius: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <strong>36</strong><span>recursos demonstráveis</span>
        </div>
      </section>

      <section className="project-section code-section">
        <div className="section-heading"><div><p className="eyebrow">EXEMPLOS REAIS</p><h2>Hooks e eventos usados no código</h2></div><MousePointerClick /></div>
        <div className="code-pair">
          <pre><code><b>// Hook</b>{`\nconst [liked, setLiked] = useLocalStorage(\n  "lp-likes", []\n);\n\nconst filtered = useMemo(\n  () => profiles.filter(...), [query]\n);`}</code></pre>
          <pre><code><b>// Evento React</b>{`\n<button onClick={() => setLiked(...)}>\n  Curtir\n</button>\n\n<form onSubmit={sendMessage}>...</form>`}</code></pre>
        </div>
      </section>

      <section className="ai-explainer">
        <div className="ai-explainer-icon"><Bot /><Sparkles /></div>
        <div><p className="eyebrow">INTELIGÊNCIA ARTIFICIAL</p><h2>IA segura para uma demonstração acadêmica</h2><p>A Leonida AI interpreta intenções e gera respostas temáticas por meio de um serviço isolado. Em uma evolução futura, o mesmo componente pode consumir ChatGPT, Claude ou Gemini por um backend protegido.</p></div>
        <a href="/ai"><Presentation /> Testar IA</a>
      </section>

      <footer className="disclaimer">
        Projeto acadêmico não oficial. Grand Theft Auto e seus materiais são
        propriedades de seus respectivos titulares.
      </footer>
    </main>
  );
}
