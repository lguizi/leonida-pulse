import type {
  Conversation,
  EventItem,
  MarketItem,
  Post,
  Vehicle,
} from "../types";

export const profiles = [
  "Jason Duval",
  "Lucia Caminos",
  "Cal Hampton",
  "Boobie Ike",
  "Dre’Quan Priest",
  "Real Dimez",
  "Raul Bautista",
  "Brian Heder",
  "Mia Velez",
  "Sofia Torres",
  "Theo Briggs",
  "Nina Mar",
  "Eli Cruz",
  "Kai Rivers",
  "Lola Vega",
];
export const officialProfiles = profiles.slice(0, 8);
const places = [
  "Vice City",
  "Leonida Keys",
  "Port Gellhorn",
  "Ambrosia",
  "Grassrivers",
  "Mount Kalaga National Park",
];
const storyBeats = [
  {
    author: "Jason Duval",
    place: "Leonida Keys",
    text: "Tentando deixar para trás uma adolescência problemática e a passagem pelo Exército. Nas Keys, a vida fácil nunca parece chegar.",
    tag: "#JasonDuval",
    basis:
      "Biografia oficial de Jason: Exército, Keys e trabalho para traficantes locais.",
  },
  {
    author: "Lucia Caminos",
    place: "Vice City",
    text: "Fora da Penitenciária de Leonida e decidida a virar as probabilidades a seu favor. Daqui em diante, só jogadas inteligentes.",
    tag: "#LuciaCaminos",
    basis:
      "Biografia oficial de Lucia: saída da prisão e busca por uma vida melhor.",
  },
  {
    author: "Jason Duval",
    place: "Vice City",
    text: "Um golpe que parecia fácil deu errado. Agora Jason e Lucia estão no lado mais sombrio do lugar mais ensolarado da América.",
    tag: "#JasonELucia",
    basis:
      "Sinopse oficial: o golpe fácil dá errado e leva os dois a uma conspiração em Leonida.",
  },
  {
    author: "Cal Hampton",
    place: "Leonida Keys",
    text: "De volta às comunicações da Guarda Costeira. Há pássaros demais voando em formação perfeita — alguém precisa fazer as perguntas.",
    tag: "#CalInvestiga",
    basis:
      "Biografia oficial de Cal: observa comunicações da Guarda Costeira e vive em paranoia casual.",
  },
  {
    author: "Boobie Ike",
    place: "Vice City",
    text: "Imóveis, clube e estúdio: o império continua de pé. Mas o projeto que importa agora é a Only Raw Records.",
    tag: "#OnlyRawRecords",
    basis:
      "Biografia oficial de Boobie: império local e parceria na Only Raw Records.",
  },
  {
    author: "Dre’Quan Priest",
    place: "Vice City",
    text: "Real Dimez está oficialmente com a Only Raw. Agora é transformar presença viral no próximo grande sucesso da cidade.",
    tag: "#RealDimez",
    basis:
      "Biografia oficial de Dre’Quan: assinou Real Dimez e mira a cena de Vice City.",
  },
  {
    author: "Real Dimez",
    place: "Vice City",
    text: "Bae-Luxe e Roxy voltaram ao estúdio. Depois de um primeiro hit e cinco anos de confusão, falta só um novo raio cair.",
    tag: "#ViralHooks",
    basis:
      "Biografia oficial de Real Dimez: dupla, primeiro hit com DWNPLY e contrato com Only Raw Records.",
  },
  {
    author: "Raul Bautista",
    place: "Port Gellhorn",
    text: "Experiência conta. Procurando gente com coragem para assumir riscos grandes — profissionais sabem se adaptar.",
    tag: "#RaulBautista",
    basis:
      "Biografia oficial de Raul: assaltante de bancos experiente em busca de novos talentos.",
  },
  {
    author: "Brian Heder",
    place: "Leonida Keys",
    text: "O estaleiro continua movimentado. Jason tem onde ficar, desde que ajude nos trabalhos locais e apareça para a sangria da Lori.",
    tag: "#BrianHeder",
    basis:
      "Biografia oficial de Brian: estaleiro, contrabando e acordo de moradia com Jason.",
  },
  {
    author: "Lucia Caminos",
    place: "Vice City",
    text: "A vida boa que minha mãe sonhou desde Liberty City não vai cair do céu. É hora de seguir o plano.",
    tag: "#VidaBoa",
    basis:
      "Biografia oficial de Lucia: sonho familiar de uma vida melhor desde Liberty City.",
  },
];
export const posts: Post[] = Array.from({ length: 30 }, (_, i) => {
  const beat = storyBeats[i % storyBeats.length],
    author = beat.author;
  return {
    id: i + 1,
    author,
    initials: author
      .split(" ")
      .map((x) => x[0])
      .join("")
      .slice(0, 2),
    place: beat.place,
    text: beat.text,
    tag: beat.tag,
    likes: 2847 - i * 37,
    comments: 48 + i * 3,
    kind: (["image", "text", "poll", "event"] as const)[i % 4],
    basis: beat.basis,
  };
});
export const stories = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: profiles[i],
  initials: profiles[i]
    .split(" ")
    .map((x) => x[0])
    .join("")
    .slice(0, 2),
  official: i < 8,
}));
const officialEvents = [
  [
    "O golpe fácil dá errado",
    "Vice City",
    "Linha narrativa",
    "Sinopse oficial de Jason e Lucia.",
  ],
  [
    "Lucia deixa a penitenciária",
    "Vice City",
    "Linha narrativa",
    "Biografia oficial de Lucia Caminos.",
  ],
  [
    "Jason trabalha nas Keys",
    "Leonida Keys",
    "Personagem",
    "Biografia oficial de Jason Duval.",
  ],
  [
    "Cal monitora comunicações",
    "Leonida Keys",
    "Personagem",
    "Biografia oficial de Cal Hampton.",
  ],
  [
    "Only Raw busca um sucesso",
    "Vice City",
    "Música",
    "Biografias oficiais de Boobie Ike e Dre’Quan Priest.",
  ],
  [
    "Real Dimez assina com a gravadora",
    "Vice City",
    "Música",
    "Biografia oficial de Real Dimez.",
  ],
  [
    "Raul procura novos talentos",
    "Port Gellhorn",
    "Linha narrativa",
    "Biografia oficial de Raul Bautista.",
  ],
  [
    "Brian mantém o estaleiro ativo",
    "Leonida Keys",
    "Personagem",
    "Biografia oficial de Brian Heder.",
  ],
  [
    "Conspiração atravessa Leonida",
    "Ambrosia",
    "Linha narrativa",
    "Sinopse oficial da história de Jason e Lucia.",
  ],
  [
    "Jason e Lucia dependem um do outro",
    "Vice City",
    "Linha narrativa",
    "Sinopse oficial: os dois são forçados a confiar mais um no outro.",
  ],
];
export const events: EventItem[] = officialEvents.map((x, i) => ({
  id: i + 1,
  title: x[0],
  place: x[1],
  date: "Momento da história",
  attendees: 680 + i * 121,
  category: x[2],
  basis: x[3],
}));
export const vehicles: Vehicle[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name:
    ["Vortex GT", "Solara", "Marlin XR", "Caiman 4x4", "Comet S"][i % 5] +
    ` ${i + 1}`,
  type: ["Esportivo", "Clássico", "Off-road"][i % 3],
  speed: 68 + i * 2,
  control: 62 + i * 3,
  color: ["#ff4f8b", "#38dbe8", "#ff9b54", "#8c63ff"][i % 4],
}));
export const market: MarketItem[] = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: [
    "Jaqueta Neon",
    "Capacete Pulse",
    "Kit Praia",
    "Pôster Skyline",
    "Luzes de Garagem",
  ][i % 5],
  category: ["Vestuário", "Acessórios", "Decoração"][i % 3],
  credits: 120 + i * 35,
}));
export const conversations: Conversation[] = Array.from(
  { length: 10 },
  (_, i) => ({
    id: i + 1,
    name: profiles[i],
    initials: profiles[i]
      .split(" ")
      .map((x) => x[0])
      .join("")
      .slice(0, 2),
    online: i % 3 !== 0,
    last: [
      "O plano mudou.",
      "Te mando a localização.",
      "A Only Raw está trabalhando.",
      "As Keys estão movimentadas.",
    ][i % 4],
    unread: i % 4,
  }),
);
export const notifications = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  text: `${profiles[i % 15]} ${["publicou uma atualização da história", "começou a seguir você", "comentou sobre Leonida", "compartilhou um perfil oficial"][i % 4]}`,
  read: i > 6,
}));
export const groups = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  name: [
    "Only Raw Records",
    "Keys Locals",
    "Kalaga Explorers",
    "Vice City Creators",
    "Grassrivers Watch",
    "Port Gellhorn Crew",
  ][i],
  members: 148 + i * 231,
}));
