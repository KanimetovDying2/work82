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
  youtubeUrl?: string | null;
}

export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface ValidationError {
  message?: string;
  error?: string;
  errors?: {
    [key: string]: { message: string };
  };
}

export interface TrackHistoryItem {
  _id: string;
  user: string;
  track: Track;
  artist: Artist;
  datetime: string;
}
