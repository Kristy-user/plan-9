export interface Book {
  id: number;
  title: string;
  formats: any;
  authors: Array<Author>;
  download_count: number;
  languages: Array<string>;
}
export interface Author {
  birth_year: number;
  death_year: number;
  name: string;
}
