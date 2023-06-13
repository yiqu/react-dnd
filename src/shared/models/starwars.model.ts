export interface HttpResponse<T> {
  message: string;
  total_records: number;
  total_pages: number;
  previous: string;
  count?: number;
  next: string;
  results: T[];
  //
  result?: ResultProperty<T>[];
}

export interface HttpResponse2<T> {
  message: string;
  result: ResultProperty<T>;
}

export interface HttpSearchResponse<T> {
  message: string;
  result: ResultProperty<T>;
}

export interface HttpSearchResponses<T> {
  message: string;
  result: ResultProperty<T>[];
}

export interface HttpResponse2List<T> {
  message: string;
  result: ResultProperty<T>[];
}

export interface ResultProperty<T> {
  properties: T;
  description: string;
  _id: string;
  uid: string;
  __v: string;
}