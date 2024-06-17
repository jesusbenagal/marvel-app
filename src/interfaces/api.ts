export interface IApiResponse<T> {
  code: number;
  status: string;
  copyright: string;
  attibutionText: string;
  attibutionHTML: string;
  etag: string;
  data: IDataContainer<T>;
}
export interface IDataContainer<T> {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: T[];
}

interface IThumbnail {
  extension: string;
  path: string;
}

interface IComics {
  available: number;
  collectionURI: string;
  items: IComicItem[];
  returned: number;
}

interface IComicItem {
  resourceURI: string;
  name: string;
}

export interface ICharacter {
  id: number;
  name: string;
  description: string;
  thumbnail: IThumbnail;
  comics: IComics;
  isFavourite?: boolean;
}

export interface IComicDate {
  type: string;
  date: string;
}

export interface IComic {
  id: number;
  title: string;
  description: string;
  dates: IComicDate[];
  thumbnail: IThumbnail;
}
