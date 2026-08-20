export interface Artist {
  _id: string;
  name: string;
  photo: string | null;
  info: string | null;
}

export interface Album {
  _id: string;
  name: string;
  artist: Artist | string;
  year: number;
  photo: string | null;
}

export interface Track {
  _id: string;
  name: string;
  album: string;
  duration: string;
  number: number;
}
