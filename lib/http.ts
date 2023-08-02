type ApiCallInfo<U> = {
  data: U;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
};

type ApiBaseConfig = {
  path: string;
  config?: RequestInit;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  onMutate?: (data: any) => void;
};

type UpdateApiCallInfoFunction<U> = (info: Partial<ApiCallInfo<U>>) => void;

export default class HttpClient {
  private path: string;

  constructor(path: string) {
    this.path = path;
  }

  private async http<T>({
    path,
    config,
    updateApiCallInfo,
    onSuccess,
    onError,
    onMutate,
  }: ApiBaseConfig & {
    updateApiCallInfo: UpdateApiCallInfoFunction<T>;
  }): Promise<T> {
    updateApiCallInfo({
      isLoading: true,
      isError: false,
      error: null,
    });

    const request = new Request(this.path + path, config);
    const response = await fetch(request);

    if (!response.ok) {
      const error = new Error(response.statusText);
      updateApiCallInfo({
        isLoading: false,
        isError: true,
        error,
      });
      onError(error);
      throw error;
    }

    // May error if there is no body, return empty object
    const responseData = await response.json().catch(() => ({}));
    updateApiCallInfo({
      isLoading: false,
      isError: false,
      error: null,
      data: responseData,
    });
    return responseData;
  }

  public get<T>({
    path,
    config,
    onSuccess,
    onError,
    onMutate,
  }: ApiBaseConfig): ApiCallInstance<T, null> {
    return this.createApiCall<T, null>((updateApiCallInfo) =>
      this.http<T>({
        path,
        config: { method: "get", ...config },
        updateApiCallInfo,
      })
    );
  }

  public post<RequestBody, ResponseBody>({
    path,
    config,
    onSuccess,
    onError,
    onMutate,
  }: ApiBaseConfig): ApiCallInstance<ResponseBody, RequestBody> {
    return this.createApiCall<ResponseBody, RequestBody>(
      (
        payload: RequestBody,
        updateApiCallInfo: UpdateApiCallInfoFunction<ResponseBody>
      ) =>
        this.http<ResponseBody>({
          path,
          config: { method: "post", ...config },
          updateApiCallInfo,
        })
    );
  }

  public put<RequestBody, ResponseBody>({
    path,
    config,
  }: ApiBaseConfig): ApiCallInstance<ResponseBody, RequestBody> {
    return this.createApiCall<ResponseBody, RequestBody>(
      (
        payload: RequestBody,
        updateApiCallInfo: UpdateApiCallInfoFunction<ResponseBody>
      ) =>
        this.http<ResponseBody>({
          path,
          config: { method: "put", ...config },
          updateApiCallInfo,
        })
    );
  }
  public createApiCall<U, T>(
    requestFunction: (
      data,
      updateApiCallInfo: UpdateApiCallInfoFunction<U>
    ) => Promise<U>
  ): ApiCallInstance<U, T> {
    return new ApiCallInstance<U, T>(requestFunction);
  }
}

class ApiCallInstance<U, T> {
  private api: (
    payload,
    updateApiCallInfo: UpdateApiCallInfoFunction<U>
  ) => Promise<U>;
  private apiCallInfo = {
    isLoading: false,
    isError: false,
    error: null,
    data: null,
  };
  constructor(
    api: (
      payload: T | null,
      updateApiCallInfo: UpdateApiCallInfoFunction<U>
    ) => Promise<U>
  ) {
    this.api = api;
  }

  private updateApiCallInfo(info: Partial<ApiCallInfo<U>>) {
    console.log({
      info: this.apiCallInfo,
    });
    this.apiCallInfo = {
      ...this.apiCallInfo,
      ...info,
    };
    console.log({
      info: this.apiCallInfo,
    });
  }
  private getApiCallInfo(key: keyof ApiCallInfo<U>): any {
    return this.apiCallInfo[key];
  }

  public async mutate<U>(data: U): Promise<U> {
    try {
      this.updateApiCallInfo({
        isLoading: true,
        isError: false,
        error: null,
      });
      const response = await this.api(data, this.updateApiCallInfo);
      // this.updateApiCallInfo({
      //   isLoading: false,
      //   isError: false,
      //   error: null,
      // });
      return response as U;
    } catch (error) {
      this.updateApiCallInfo({
        isLoading: false,
        isError: true,
        error,
      });
      throw error;
    }
  }

  public get isLoading(): boolean {
    return this.getApiCallInfo("isLoading");
  }

  public get isError(): boolean {
    return this.getApiCallInfo("isError");
  }

  public get error(): Error | null {
    return this.getApiCallInfo("isError");
  }
  public get data(): Error | null {
    return this.getApiCallInfo("data");
  }
}
