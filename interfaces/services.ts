// import { ISettings } from "../interfaces";
import { HttpStatusCode } from "axios";

export interface IResponseLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

export interface IResponseMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: [
    {
      url: string | null;
      label: string | null;
      active: boolean | null;
    }
  ];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface ResponseBody<T> {
  status: HttpStatusCode;
  message: string;
  data: T;
}

// export interface IGetSettings extends ResponseBody<ISettings> {}
