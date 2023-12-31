import { useRef, useState, useCallback } from "react";
import { AxiosResponse } from "axios";
import { QueryApiFunction, UseQueryOptions } from "../interfaces";
import { useFocusEffect } from "expo-router";

export const useQuery = <ResultType, ArgType>(
  api: QueryApiFunction<ResultType, ArgType>,
  {
    queryKey = [],
    onSuccessFunction = (data: ResultType) => {},
    onErrorFunction = (error: Error) => {},
    successMessage = "Successfully updated",
    loadingMessage = "Updating...",
    errorMessage = "Failed to update",
    showToast = true,
    defaultData = null,
    isDisabled = false,
  }: Omit<
    UseQueryOptions<ResultType, ArgType, any>,
    "onMutateFunction" | "onLoadingFunction"
  >
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<ResultType | null>(defaultData);
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

  useFocusEffect(
    useCallback(() => {
      console.log({ omohhhhhs: "res.data" });
      setIsLoading(true);
      if (isDisabled) return;
      api()
        .then((res) => {
          console.log({ resyy: res });
          setData(res);
          setIsError(false);
          setIsLoading(false);
          onSuccessFunction(res);
        })
        .catch((err) => {
          console.log({ erroromh: err });

          setError(err);
          setIsLoading(false);
          setIsError(true);
          onErrorFunction(err);
        });
    }, [isDisabled, ...queryKey])
  );

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
