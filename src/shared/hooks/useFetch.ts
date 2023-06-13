import { useState } from "react";
import axios, { AxiosResponse } from 'axios';
// import urlcat from "urlcat";
import { useDeepCompareEffect } from "react-use";

export enum AXIOS_ERROR_CODE {
  ERR_CANCELED = "ERR_CANCELED"
}

export interface HttpParams {
  [key: string]: any;
}

export interface UseFetchProps {
  url: string;
  params?: HttpParams;
}

export default function useFetch<T>({ url, params={} }: UseFetchProps) {

  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ payload, setPayload ] = useState<T>();
  const [ error, setError ] = useState<any>(undefined);

  useDeepCompareEffect(() => {
    const abortController = new AbortController();
    const restUrl = url;

    setIsLoading(true);
    axios.get(restUrl, {signal: abortController.signal})
      .then((response: AxiosResponse<T>) => {
        setPayload(response.data);
      })
      .catch((err) => {
        if (error && error.code !== AXIOS_ERROR_CODE.ERR_CANCELED) {
          setError(err);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    return (() => {
      setError(undefined);
      abortController.abort();
    });

  }, [url, params]);

  return {
    payload,
    loading: isLoading,
    error
  };
}

