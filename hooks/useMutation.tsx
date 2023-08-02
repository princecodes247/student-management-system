import { useRef, useCallback } from "react";
import { AxiosResponse } from "axios";

type ApiFunction<ResultType, ArgType> = (
  arg: ArgType
) => Promise<AxiosResponse<ResultType>>;

export const useMutation = <ResultType, ArgType>(
  api: ApiFunction<ResultType, ArgType>,
  {
    onSuccess = (data: any) => {},
    onError = (error: Error) => {},
    onLoading = () => {},
    onMutate = () => {},
  }
) => {
  const isLoadingRef = useRef<boolean>(false);
  const isErrorRef = useRef<boolean>(false);
  const errorRef = useRef<any>(null);

  const mutate = useCallback(
    async (arg: ArgType) => {
      onMutate();
      isLoadingRef.current = true;
      isErrorRef.current = false;
      errorRef.current = null;

      try {
        const response = await api(arg);
        isLoadingRef.current = false;
        onSuccess(response.data);
        return response.data;
      } catch (error) {
        isLoadingRef.current = false;
        isErrorRef.current = true;
        errorRef.current = error;
        onError(error);
      }
    },
    [api, onSuccess, onError]
  );

  return {
    mutate,
    isLoading: isLoadingRef.current,
    isError: isErrorRef.current,
    error: errorRef.current,
  };
};
