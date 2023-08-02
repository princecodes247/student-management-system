import { useRef } from "react";
import { AxiosResponse } from "axios";
import { useMutation } from "./useMutation";

type ApiFunction<ResultType, ArgType> = (
  arg: ArgType
) => Promise<AxiosResponse<ResultType>>;

export const useMutate = <ResultType, ArgType>(
  api: ApiFunction<ResultType, ArgType>,
  {
    onSuccessFunction = (data: any) => {},
    onErrorFunction = (error: Error) => {},
    onLoadingFunction = () => {},
    successMessage = "Successfully updated",
    loadingMessage = "Updating...",
    errorMessage = "Failed to update",
    showToast = true,
  }
) => {
  const toastId = useRef<string | undefined>(undefined);
  return useMutation(api, {
    onSuccess: (data) => {
      onSuccessFunction(data);
    },
    onError: (error: any) => {
      console.log(error);

      console.log(JSON.stringify(error));
      onErrorFunction(error);
    },

    onMutate: () => {
      onLoadingFunction();
    },
  });
};
