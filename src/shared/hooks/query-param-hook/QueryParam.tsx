/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useLocation } from "react-router-dom";

function useQuery(): UrlQuery {
  const { search } = useLocation();

  const searchParams = React.useMemo(() => {
    return new URLSearchParams(search);
  }, [search]);
  
  const allParams: QueryObj[] = [];

  searchParams.forEach((val, key) => {
    allParams.push({
      key,
      value: val
    });
  });

  return {
    urlSearchParams: searchParams,
    allParams: allParams
  };
}

export default useQuery;

export interface QueryObj {
  key: string;
  value: string;
}

export interface UrlQuery {
  urlSearchParams: URLSearchParams;
  allParams: QueryObj[];
}
