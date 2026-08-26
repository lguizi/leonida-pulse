export function askLeonidaAI(input: string) {
  const q = input.toLowerCase();
  if (q.includes("acontece") || q.includes("história"))
    return "Oficialmente, Jason e Lucia acabam envolvidos em uma conspiração que atravessa Leonida depois que um golpe fácil dá errado. Eles precisam depender mais um do outro para sobreviver.";
  if (q.includes("oficial"))
    return "Base oficial: personagens, regiões, o golpe que dá errado, a conspiração, a saída de Lucia da prisão e as biografias divulgadas pela Rockstar. Formato de posts, comentários, números e reações são dramatizações da demonstração.";
  if (q.includes("hashtag"))
    return "#JasonELucia #OnlyRawRecords #RealDimez #LeonidaKeys";
  if (q.includes("legenda"))
    return "Um golpe fácil deu errado. Agora, no lado mais sombrio do lugar mais ensolarado da América, confiança é tudo.";
  if (q.includes("lugar"))
    return "Os locais oficialmente divulgados são Vice City, Leonida Keys, Port Gellhorn, Ambrosia, Grassrivers e Mount Kalaga National Park.";
  return "Posso resumir a história oficialmente divulgada, explicar personagens e lugares ou separar fatos oficiais das dramatizações da rede.";
}
