import { useMemo, useState } from "react";
import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";
import {
  Bell,
  Bot,
  CalendarDays,
  Car,
  Check,
  Compass,
  Download,
  Heart,
  Home,
  Map,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  Settings,
  ShoppingBag,
  Sparkles,
  Users,
} from "lucide-react";
import { Avatar } from "./components/Avatar";
import {
  conversations,
  characterImages,
  events,
  groups,
  market,
  notifications,
  posts,
  placeImages,
  profiles,
  stories,
  vehicles,
} from "./data/demo";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { askLeonidaAI } from "./services/leonidaAI";
import "./index.css";
const nav = [
  [Home, "Início", "/"],
  [Compass, "Explorar", "/explorar"],
  [MessageCircle, "Mensagens", "/mensagens"],
  [Bell, "Notificações", "/notificacoes"],
  [Map, "Mapa", "/mapa"],
  [CalendarDays, "Eventos", "/eventos"],
  [Car, "Garagem", "/garagem"],
  [ShoppingBag, "Mercado", "/mercado"],
  [Users, "Crews", "/grupos"],
  [Bot, "Leonida AI", "/ai"],
  [Settings, "Configurações", "/configuracoes"],
] as const;
function AppShell() {
  const [notice, setNotice] = useState(""),
    [onboarded, setOnboarded] = useLocalStorage("lp-onboarded", false);
  const flash = (x: string) => {
    setNotice(x);
    setTimeout(() => setNotice(""), 2200);
  };
  return (
    <div className="app-shell">
      {notice && <div className="toast">{notice}</div>}
      {!onboarded && (
        <div className="onboarding">
          <div>
            <span className="brand-mark hero-mark">L</span>
            <p className="eyebrow">
              UNIVERSO DE GTA VI · DEMONSTRAÇÃO ACADÊMICA NÃO OFICIAL
            </p>
            <h1>
              Entre na história de <b>Leonida.</b>
            </h1>
            <p>
              Uma rede social fictícia construída sobre personagens, lugares e
              acontecimentos divulgados oficialmente para GTA VI.
            </p>
            <div className="character-picks">
              {[
                ["LC", "Lucia"],
                ["JD", "Jason"],
                ["LV", "Criar residente"],
              ].map(([i, n]) => (
                <button key={n} onClick={() => setOnboarded(true)}>
                  <Avatar initials={i} />
                  {n}
                </button>
              ))}
            </div>
            <button className="enter" onClick={() => setOnboarded(true)}>
              Entrar em Leonida　→
            </button>
            <small>
              Projeto não oficial, sem afiliação com Rockstar Games ou Take-Two
              Interactive.
            </small>
          </div>
        </div>
      )}
      <Sidebar />
      <Routes>
        <Route path="/" element={<Feed flash={flash} />} />
        <Route path="/explorar" element={<Explore />} />
        <Route path="/mensagens" element={<Messages flash={flash} />} />
        <Route path="/ai" element={<AI />} />
        <Route path="/perfil" element={<Profile />} />
        {[
          "notificacoes",
          "mapa",
          "eventos",
          "garagem",
          "mercado",
          "grupos",
          "configuracoes",
        ].map((x) => (
          <Route
            key={x}
            path={`/${x}`}
            element={<Module type={x} flash={flash} />}
          />
        ))}
        <Route
          path="*"
          element={
            <Page
              title="404 — Fora do mapa"
              subtitle="Essa rota não existe em nossa versão fictícia de Leonida."
            >
              <Link className="primary" to="/">
                Voltar ao feed
              </Link>
            </Page>
          }
        />
      </Routes>
      <Bottom />
    </div>
  );
}
function Sidebar() {
  return (
    <aside className="sidebar">
      <Link className="brand" to="/">
        <span className="brand-mark">L</span>
        <span>
          LEONIDA <b>PULSE</b>
        </span>
      </Link>
      <nav>
        {nav.map(([I, l, p], i) => (
          <NavLink
            key={p}
            to={p}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <I />
            <span>{l}</span>
            {(i === 2 || i === 3) && <em>{i === 2 ? 3 : 8}</em>}
          </NavLink>
        ))}
      </nav>
      <Link className="post-button" to="/">
        <Plus /> Criar publicação
      </Link>
      <Link className="user-card" to="/perfil">
        <Avatar initials="LV" />
        <span>
          <strong>Luiz V.</strong>
          <small>@luizvice</small>
        </span>
        <MoreHorizontal />
      </Link>
    </aside>
  );
}
function Page({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <main className="feature-page">
      <header className="page-title">
        <p className="eyebrow">LEONIDA PULSE</p>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </header>
      {children}
      <Disclaimer />
    </main>
  );
}
function Feed({ flash }: { flash: (x: string) => void }) {
  const [liked, setLiked] = useLocalStorage<number[]>("lp-likes", []),
    [saved, setSaved] = useLocalStorage<number[]>("lp-saved", []),
    [created, setCreated] = useLocalStorage<string[]>("lp-posts", []);
  const [tab, setTab] = useState("Para você"),
    [text, setText] = useState(""),
    [shown, setShown] = useState(6);
  const publish = () => {
    if (text.trim()) {
      setCreated([text, ...created]);
      setText("");
      flash("Publicação criada e salva!");
    }
  };
  return (
    <>
      <main className="feed">
        <Mobile />
        <div className="feed-head">
          <div>
            <p className="eyebrow">HISTÓRIA DE GTA VI · BASE OFICIAL</p>
            <h1>
              O que acontece em <span>Leonida?</span>
            </h1>
          </div>
          <Link className="icon-button" to="/explorar">
            <Search />
          </Link>
        </div>
        <div className="tabs">
          {["Para você", "Seguindo", "Em alta"].map((x) => (
            <button
              className={tab === x ? "selected" : ""}
              onClick={() => setTab(x)}
              key={x}
            >
              {x}
            </button>
          ))}
        </div>
        <section className="stories">
          {stories.map((s) => (
            <button
              onClick={() => flash(`Story de ${s.name} aberto`)}
              key={s.id}
            >
              <span className="story-ring">
                <Avatar initials={s.initials} />
                {s.id === 1 && <i>+</i>}
              </span>
              <small>{s.name.split(" ")[0]}</small>
            </button>
          ))}
        </section>
        <section className="composer card">
          <Avatar initials="LV" />
          <div>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && publish()}
              placeholder="Compartilhe o que está acontecendo..."
            />
            <div className="composer-tools">
              <span>▧ Foto</span>
              <span>⌖ Local</span>
              <span>☺ Sentimento</span>
              <button disabled={!text.trim()} onClick={publish}>
                Publicar
              </button>
            </div>
          </div>
        </section>
        {created.map((x, i) => (
          <Post
            key={`c${i}`}
            p={{
              ...posts[0],
              id: 100 + i,
              author: "Luiz V.",
              initials: "LV",
              text: x,
            }}
            {...{ liked, saved, setLiked, setSaved, flash }}
          />
        ))}
        {posts.slice(0, shown).map((p) => (
          <Post
            key={p.id}
            {...{ p, liked, saved, setLiked, setSaved, flash }}
          />
        ))}
        {shown < 30 && (
          <button className="load-more" onClick={() => setShown((x) => x + 6)}>
            Carregar mais publicações
          </button>
        )}
        <p className="fiction-note">
          Conteúdo fictício criado para esta demonstração.
        </p>
      </main>
      <Right />
    </>
  );
}
function Post({
  p,
  liked,
  saved,
  setLiked,
  setSaved,
  flash,
}: {
  p: (typeof posts)[number];
  liked: number[];
  saved: number[];
  setLiked: (x: number[]) => void;
  setSaved: (x: number[]) => void;
  flash: (x: string) => void;
}) {
  const on = liked.includes(p.id);
  return (
    <article className="post card">
      <header>
        <Avatar initials={p.initials} />
        <div>
          <strong>
            {p.author}
            <span className="verified">✓</span>
          </strong>
          <small>
            @{p.author.toLowerCase().replaceAll(" ", ".")} · {p.place}
          </small>
        </div>
        <button onClick={() => flash("Menu: ocultar ou denunciar")}>
          <MoreHorizontal />
        </button>
      </header>
      <p>
        {p.text} <a>{p.tag}</a>
      </p>
      <div className="official-basis">
        <span>BASE OFICIAL ROCKSTAR</span>
        <small>{p.basis}</small>
      </div>
      {p.kind === "poll" ? (
        <div className="poll">
          <button onClick={() => flash("Voto registrado")}>
            Jason e Lucia seguem o plano <b>62%</b>
          </button>
          <button onClick={() => flash("Voto registrado")}>
            A conspiração muda tudo <b>38%</b>
          </button>
        </div>
      ) : (
        <div className="post-visual official-photo">
          <img
            src={p.image}
            alt={`${p.author} em ${p.place} — screenshot oficial de GTA VI`}
            loading="lazy"
          />
          <div className="photo-shade" />
          <strong>{p.place.toUpperCase()} · AGORA</strong>
        </div>
      )}
      <footer>
        <button
          className={on ? "liked" : ""}
          onClick={() =>
            setLiked(on ? liked.filter((x) => x !== p.id) : [...liked, p.id])
          }
        >
          <Heart fill="currentColor" />
          {p.likes + (on ? 1 : 0)}
        </button>
        <button onClick={() => flash("Comentários abertos")}>
          <MessageCircle />
          {p.comments}
        </button>
        <button onClick={() => flash("Link copiado")}>
          <Send />
          Compartilhar
        </button>
        <button
          className="save"
          onClick={() => {
            setSaved(
              saved.includes(p.id)
                ? saved.filter((x) => x !== p.id)
                : [...saved, p.id],
            );
            flash("Itens salvos atualizados");
          }}
        >
          {saved.includes(p.id) ? "◆" : "◇"}
        </button>
      </footer>
    </article>
  );
}
function Right() {
  return (
    <aside className="rightbar">
      <label className="search">
        <Search />
        <input placeholder="Buscar em Leonida" />
      </label>
      <section className="weather">
        <div>
          <span>VICE CITY</span>
          <strong>29°</strong>
          <small>NOITE TROPICAL</small>
        </div>
        <div className="weather-sun">☼</div>
        <p>Clima fictício · Umidade 78%</p>
      </section>
      <section className="panel">
        <header>
          <h2>Assuntos em alta</h2>
          <Link to="/explorar">Ver todos</Link>
        </header>
        {["#JasonELucia", "#OnlyRawRecords", "#RealDimez", "#LeonidaKeys"].map(
          (x, i) => (
            <div className="trend" key={x}>
              <span>
                <small>{i + 1} · Em alta</small>
                <strong>{x}</strong>
                <small>{12 - i * 2},4 mil publicações</small>
              </span>
            </div>
          ),
        )}
      </section>
      <section className="panel">
        <h2>Quem seguir</h2>
        {profiles.slice(0, 3).map((n) => (
          <div className="follow" key={n}>
            <Avatar
              initials={n
                .split(" ")
                .map((x) => x[0])
                .join("")}
              small
            />
            <span>
              <strong>{n}</strong>
              <small>@{n.toLowerCase().split(" ")[0]}vc</small>
            </span>
            <button>Seguir</button>
          </div>
        ))}
      </section>
      <Disclaimer />
    </aside>
  );
}
function Explore() {
  const [q, setQ] = useState("");
  const data = useMemo(
    () => profiles.filter((x) => x.toLowerCase().includes(q.toLowerCase())),
    [q],
  );
  return (
    <Page
      title="Explorar"
      subtitle="Personagens, lugares e acontecimentos divulgados oficialmente para GTA VI."
    >
      <label className="big-search">
        <Search />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Busque pessoas, lugares ou hashtags"
        />
      </label>
      <div className="chips">
        {["Tudo", "Pessoas", "Lugares", "Hashtags", "Publicações"].map((x) => (
          <button key={x}>{x}</button>
        ))}
      </div>
      <div className="gallery">
        {(q ? data : profiles.slice(0, 12)).map((x, i) => (
          <div className={`gallery-card g${i % 5}`} key={x}>
            {characterImages[x] && (
              <img
                className="gallery-photo"
                src={characterImages[x]}
                alt={`${x} — personagem oficial de GTA VI`}
                loading="lazy"
              />
            )}
            <Avatar
              initials={x
                .split(" ")
                .map((y) => y[0])
                .join("")}
            />
            <strong>{x}</strong>
            {i < 8 && <span className="official-chip">PERFIL OFICIAL</span>}
            <small>
              {i < 8
                ? "Personagem divulgado pela Rockstar Games"
                : "Residente original da demonstração"}
            </small>
          </div>
        ))}
      </div>
    </Page>
  );
}
function Messages({ flash }: { flash: (x: string) => void }) {
  const [active, setActive] = useState(conversations[0]),
    [draft, setDraft] = useState(""),
    [sent, setSent] = useLocalStorage<string[]>("lp-messages", []);
  return (
    <Page title="Mensagens" subtitle="Conversas locais da demonstração.">
      <div className="messages">
        <div className="conversation-list">
          {conversations.map((c) => (
            <button
              className={active.id === c.id ? "current" : ""}
              onClick={() => setActive(c)}
              key={c.id}
            >
              <Avatar initials={c.initials} small />
              <span>
                <strong>
                  {c.name}
                  {c.online && <i />}
                </strong>
                <small>{c.last}</small>
              </span>
              {c.unread > 0 && <em>{c.unread}</em>}
            </button>
          ))}
        </div>
        <div className="chat">
          <header>
            <Avatar initials={active.initials} />
            <span>
              <strong>{active.name}</strong>
              <small>
                {active.online ? "Online agora" : "Visto recentemente"}
              </small>
            </span>
          </header>
          <div className="bubbles">
            <p className="received">Ei! {active.last}</p>
            <p className="sent">
              Sim, nos vemos por lá. <Check />
            </p>
            {sent.map((x, i) => (
              <p className="sent" key={i}>
                {x}
                <Check />
              </p>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (draft.trim()) {
                setSent([...sent, draft]);
                setDraft("");
                flash("Mensagem enviada");
              }
            }}
          >
            <button type="button">☺</button>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Escreva uma mensagem"
            />
            <button>
              <Send />
            </button>
          </form>
        </div>
      </div>
    </Page>
  );
}
function AI() {
  const [input, setInput] = useState(""),
    [msgs, setMsgs] = useState([
      "Olá! Sou a Leonida AI em modo demonstrativo. Como posso ajudar?",
    ]);
  const send = () => {
    if (input.trim()) {
      setMsgs([...msgs, input, askLeonidaAI(input)]);
      setInput("");
    }
  };
  return (
    <Page
      title="Leonida AI"
      subtitle="Assistente local inteligente — funciona sem chave de API."
    >
      <div className="ai-card">
        <div className="ai-orb">
          <Sparkles />
        </div>
        <div className="ai-messages">
          {msgs.map((x, i) => (
            <p className={i % 2 ? "user" : "assistant"} key={i}>
              {x}
            </p>
          ))}
        </div>
        <div className="quick">
          {[
            "Sugira uma legenda",
            "Gere hashtags",
            "O que é oficial?",
            "Indique um lugar",
          ].map((x) => (
            <button onClick={() => setInput(x)} key={x}>
              {x}
            </button>
          ))}
        </div>
        <div className="ai-input">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Pergunte à Leonida AI"
          />
          <button onClick={send}>
            <Send />
          </button>
        </div>
      </div>
    </Page>
  );
}
function Module({ type, flash }: { type: string; flash: (x: string) => void }) {
  if (type === "notificacoes") return <Notices />;
  if (type === "mapa") return <MapView />;
  if (type === "configuracoes") return <Prefs flash={flash} />;
  const config = {
    eventos: [
      "Acontecimentos de GTA VI",
      "Momentos e linhas narrativas baseados apenas na divulgação oficial.",
      events,
    ],
    garagem: [
      "Garagem",
      "Sua coleção virtual de veículos fictícios.",
      vehicles,
    ],
    mercado: ["Mercado Pulse", "Nenhuma compra real é processada.", market],
    grupos: [
      "Crews & grupos",
      "Comunidades fictícias com regras e membros.",
      groups,
    ],
  }[type] as [string, string, Array<Record<string, unknown>>];
  const [keys, setKeys] = useLocalStorage<number[]>(`lp-${type}`, []);
  return (
    <Page title={config[0]} subtitle={config[1]}>
      <div className="toolbar">
        <button
          className="primary"
          onClick={() => flash("Ação simulada concluída")}
        >
          <Plus /> Criar / adicionar
        </button>
        <button>Filtrar</button>
        <button>Pesquisar</button>
      </div>
      {type === "mercado" && (
        <div className="market-note">
          SIMULAÇÃO · Carrinho: {keys.length} itens · zero dinheiro real
        </div>
      )}
      <div className="tile-grid">
        {config[2].map((raw, i) => {
          const x = raw as { [k: string]: unknown };
          const id = Number(x.id);
          return (
            <article className={`tile g${i % 5}`} key={id}>
              <div className="product-art">
                {type === "garagem" ? "◆" : type === "eventos" ? "◫" : "✦"}
              </div>
              <p className="eyebrow">
                {String(x.category || x.type || x.place || "LEONIDA")}
              </p>
              <h2>{String(x.title || x.name)}</h2>
              <p>
                {type === "eventos"
                  ? `${x.date} · ${x.attendees} participantes`
                  : type === "mercado"
                    ? `${x.credits} créditos fictícios`
                    : type === "grupos"
                      ? `${x.members} membros`
                      : `Velocidade ${x.speed} · Controle ${x.control}`}
              </p>
              {type === "eventos" && (
                <small className="event-basis">
                  Base oficial: {String(x.basis)}
                </small>
              )}
              <button
                onClick={() =>
                  setKeys(
                    keys.includes(id)
                      ? keys.filter((n) => n !== id)
                      : [...keys, id],
                  )
                }
              >
                {keys.includes(id)
                  ? "Remover / sair"
                  : type === "eventos"
                    ? "Confirmar presença"
                    : type === "mercado"
                      ? "Adicionar ao carrinho"
                      : "Adicionar / entrar"}
              </button>
            </article>
          );
        })}
      </div>
    </Page>
  );
}
function Notices() {
  const [items, setItems] = useLocalStorage("lp-notifications", notifications);
  return (
    <Page
      title="Notificações"
      subtitle={`${items.filter((x) => !x.read).length} atualizações não lidas.`}
    >
      <div className="toolbar">
        <button
          onClick={() => setItems(items.map((x) => ({ ...x, read: true })))}
        >
          Marcar todas como lidas
        </button>
        <button onClick={() => setItems([])}>Limpar</button>
      </div>
      <div className="list-cards">
        {items.map((n) => (
          <button
            className={n.read ? "" : "unread"}
            key={n.id}
            onClick={() =>
              setItems(
                items.map((x) => (x.id === n.id ? { ...x, read: true } : x)),
              )
            }
          >
            <Heart />
            <span>
              {n.text}
              <small>há {n.id * 3} min</small>
            </span>
          </button>
        ))}
      </div>
    </Page>
  );
}
function MapView() {
  const [s, setS] = useState(0);
  const p = [
    "Vice City",
    "Leonida Keys",
    "Port Gellhorn",
    "Ambrosia",
    "Grassrivers",
    "Mount Kalaga National Park",
  ];
  return (
    <Page
      title="Mapa de Leonida"
      subtitle="Representação fictícia dos seis lugares divulgados oficialmente para GTA VI."
    >
      <div className="map-wrap">
        <div className="fake-map">
          {p.map((x, i) => (
            <button
              className={`pin p${i} ${s === i ? "selected" : ""}`}
              onClick={() => setS(i)}
              key={x}
            >
              <Map />
              <span>{x}</span>
            </button>
          ))}
        </div>
        <aside>
          <img
            className="location-preview"
            src={placeImages[p[s]]}
            alt={`${p[s]} — screenshot oficial de GTA VI`}
          />
          <p className="eyebrow">LOCAL SELECIONADO</p>
          <h2>{p[s]}</h2>
          <p>
            Local confirmado nos materiais oficiais de GTA VI. O desenho e a
            posição deste marcador são apenas uma representação da demonstração,
            não o mapa oficial do jogo.
          </p>
          <button>Ver acontecimentos relacionados</button>
        </aside>
      </div>
    </Page>
  );
}
function Prefs({ flash }: { flash: (x: string) => void }) {
  const [reduce, setReduce] = useLocalStorage("lp-reduce", false);
  const exportData = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(
      new Blob([JSON.stringify({ ...localStorage }, null, 2)]),
    );
    a.download = "leonida-pulse-dados.json";
    a.click();
  };
  return (
    <Page
      title="Configurações"
      subtitle="Controle sua experiência e seus dados locais."
    >
      <div className="settings-list">
        <Setting t="Tema" d="Modo escuro padrão">
          <button>Alternar</button>
        </Setting>
        <Setting t="Reduzir animações" d="Minimiza movimentos">
          <input
            type="checkbox"
            checked={reduce}
            onChange={(e) => setReduce(e.target.checked)}
          />
        </Setting>
        <Setting t="Exportar dados" d="Baixe uma cópia em JSON">
          <button onClick={exportData}>
            <Download /> Exportar
          </button>
        </Setting>
        <Setting t="Restaurar demonstração" d="Limpa os dados locais">
          <button
            className="danger"
            onClick={() => {
              if (confirm("Limpar todos os dados locais?")) {
                localStorage.clear();
                flash("Dados limpos");
                location.reload();
              }
            }}
          >
            Limpar dados
          </button>
        </Setting>
      </div>
    </Page>
  );
}
function Setting({
  t,
  d,
  children,
}: {
  t: string;
  d: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <span>
        <strong>{t}</strong>
        <small>{d}</small>
      </span>
      {children}
    </div>
  );
}
function Profile() {
  return (
    <Page title="Luiz V." subtitle="@luizvice · Residente original de Leonida">
      <div className="profile-hero">
        <div className="cover">
          <span>LEONIDA</span>
        </div>
        <Avatar initials="LV" />
        <button>Editar perfil</button>
        <h2>
          Luiz V. <span className="verified">✓</span>
        </h2>
        <p>
          Criador, explorador noturno e narrador das pequenas histórias de
          Leonida.
        </p>
        <div>
          <b>2.480</b> seguidores　<b>318</b> seguindo　<b>42</b> publicações
        </div>
      </div>
      <div className="profile-tabs">
        Publicações　 Galeria　 Eventos　 Veículos
      </div>
      <div className="gallery profile-gallery">
        {posts.slice(0, 9).map((p, i) => (
          <div className={`gallery-card g${i % 5}`} key={p.id}>
            <strong>{p.place}</strong>
            <small>{p.tag}</small>
          </div>
        ))}
      </div>
    </Page>
  );
}
function Mobile() {
  return (
    <header className="mobile-header">
      <Link className="brand" to="/">
        <span className="brand-mark">L</span>
        <span>
          LEONIDA <b>PULSE</b>
        </span>
      </Link>
      <Link to="/notificacoes">
        <Bell />
      </Link>
    </header>
  );
}
function Bottom() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/">
        <Home />
      </NavLink>
      <NavLink to="/explorar">
        <Compass />
      </NavLink>
      <NavLink to="/eventos" className="center">
        <Plus />
      </NavLink>
      <NavLink to="/mensagens">
        <MessageCircle />
      </NavLink>
      <NavLink to="/perfil">
        <span className="mini-avatar">LV</span>
      </NavLink>
    </nav>
  );
}
function Disclaimer() {
  return (
    <footer className="disclaimer">
      Projeto acadêmico não oficial e sem afiliação com Rockstar Games ou
      Take-Two Interactive. Grand Theft Auto e seus personagens são propriedades
      de seus respectivos titulares. Os fatos marcados como “base oficial” foram
      adaptados de materiais públicos da Rockstar; textos em formato de
      postagem, interações e números são dramatizações fictícias desta
      demonstração.
    </footer>
  );
}
export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
