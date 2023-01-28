import { Mood } from "./mood";

export class Playlist {
  id: number;
  title: string;
  mood: Mood;
  uri: string;
  description: string;
  genre: string;

  constructor(
    id: number,
    title: string,
    mood: Mood,
    uri: string,
    description: string,
    genre: string
  ) {
    this.id = id;
    this.title = title;
    this.mood = mood;
    this.description = description;
    this.genre = genre;
    this.uri = "https://open.spotify.com/embed/" + uri;
  }
}
