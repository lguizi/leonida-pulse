export type Post = {
  id: number;
  author: string;
  initials: string;
  place: string;
  text: string;
  tag: string;
  likes: number;
  comments: number;
  kind: "image" | "text" | "poll" | "event";
  basis: string;
  image: string;
};
export type EventItem = {
  id: number;
  title: string;
  place: string;
  date: string;
  attendees: number;
  category: string;
  basis: string;
};
export type Vehicle = {
  id: number;
  name: string;
  type: string;
  speed: number;
  control: number;
  color: string;
};
export type MarketItem = {
  id: number;
  name: string;
  category: string;
  credits: number;
};
export type Conversation = {
  id: number;
  name: string;
  initials: string;
  online: boolean;
  last: string;
  unread: number;
};
