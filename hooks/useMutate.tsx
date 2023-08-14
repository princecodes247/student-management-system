import { useRef, useState } from "react";
import { AxiosResponse, AxiosError } from "axios";
import { ApiFunction, UseMutateOptions } from "../interfaces";

export function useMutate<ResultType, ArgType, ErrorType>(
  api: ApiFunction<ResultType, ArgType>,
  {
    onSuccessFunction = (data: ResultType) => {},
    onErrorFunction = (error: ErrorType) => {},
    onLoadingFunction = () => {},
    onMutateFunction = (payload: ArgType) => {},
    successMessage = "Successfully updated",
    loadingMessage = "Updating...",
    errorMessage = "Failed to update",
    showToast = true,
  }: UseMutateOptions<ResultType, ArgType, ErrorType>
) {
  const toastId = useRef<string | undefined>(undefined);
  // return useMutation(api, {
  //   onSuccess: (data) => {
  //     onSuccessFunction(data);
  //   },
  //   onError: (error: any) => {
  //     console.log(error);

  //     console.log(JSON.stringify(error));
  //     onErrorFunction(error);
  //   },

  //   onMutate: () => {
  //     onLoadingFunction();
  //   },
  // });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType | null>(null);
  const [data, setData] = useState<ResultType | null>(null);

  const mutate = async (arg: ArgType) => {
    setIsLoading(true);
    onMutateFunction(arg);
    try {
      console.log({ arg });
      const res = await api(arg);
      setData(res.data);
      setIsLoading(false);
      onSuccessFunction(res.data);
    } catch (err) {
      setError(err);
      setIsLoading(false);
      setIsError(true);
      onErrorFunction(err);
    }
  };

  return {
    mutate,
    isLoading,
    isError,
    error,
    data,
  };
}
