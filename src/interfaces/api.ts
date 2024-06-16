export interface IApiResponse {
  code: number;
  status: string;
  copyright: string;
  attibutionText: string;
  attibutionHTML: string;
  etag: string;
  data: IDataContainer;
}

export interface IDataContainer {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: ICharacter[];
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
}
