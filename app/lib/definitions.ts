export type Album = {
    name: string,
    artist: string,
    smallImage: string,
    mediumimage: string,
    largeimage: string,
    extralargeimage: string,
    megaimage: string,
    lastFmUrl: string,
    listeners: number,
    genre: string,
    summary: string
  };

  export type User = {
    email: string;
    password: string
  };