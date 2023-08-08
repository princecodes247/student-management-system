import { useRef, useState } from "react";
import { AxiosResponse } from "axios";
import { ApiFunction } from "../interfaces";

export const useQuery = <ResultType, ArgType>(
  api: ApiFunction<ResultType, ArgType>,
  {
    onSuccessFunction = (data: any) => {},
    onErrorFunction = (error: Error) => {},
    successMessage = "Successfully updated",
    loadingMessage = "Updating...",
    errorMessage = "Failed to update",
    showToast = true,
  }
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<ResultType | null>(null);
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

  api()
    .then((res) => {
      setData(res.data);
      setIsLoading(false);
      onSuccessFunction(res.data);
    })
    .catch((err) => {
      setError(err);
      setIsLoading(false);
      setIsError(true);
      onErrorFunction(err);
    });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
