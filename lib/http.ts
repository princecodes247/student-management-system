type ApiCallInfo<U> = {
  data: U;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
};

type UpdateApiCallInfoFunction<U> = (info: Partial<ApiCallInfo<U>>) => void;

export default class HttpClient {
  private path: string;

  constructor(path: string) {
    this.path = path;
  }

  private async http<T>(
    path: string,
    config: RequestInit,
    callKey: string,
    updateApiCallInfo
  ): Promise<T> {
    updateApiCallInfo(callKey, {
      isLoading: true,
      isError: false,
      error: null,
    });
    console.log({ path: this.path + path });

    const request = new Request(this.path + path, config);
    const response = await fetch(request);

    if (!response.ok) {
      const error = new Error(response.statusText);
      updateApiCallInfo(callKey, {
        isLoading: false,
        isError: true,
        error,
      });
      throw error;
    }

    // May error if there is no body, return empty object
    const responseData = await response.json().catch(() => ({}));
    updateApiCallInfo(callKey, {
      isLoading: false,
      isError: false,
      error: null,
    });
    return responseData;
  }

  public get<T>(
    path: string,
    config?: RequestInit,
    callKey: string = "get"
  ): ApiCallInstance<T, null> {
    return this.createApiCall<T, null>(
      (updateApiCallInfo) =>
        this.http<T>(
          path,
          { method: "get", ...config },
          callKey,
          updateApiCallInfo
        ),
      callKey
    );
  }

  public post<RequestBody, ResponseBody>(
    path: string,
    config?: RequestInit,
    callKey: string = "post"
  ): ApiCallInstance<ResponseBody, RequestBody> {
    return this.createApiCall<ResponseBody, RequestBody>(
      (
        payload: RequestBody,
        updateApiCallInfo: UpdateApiCallInfoFunction<ResponseBody>
      ) =>
        this.http<ResponseBody>(
          path,
          { method: "post", body: JSON.stringify(payload), ...config },
          callKey,
          updateApiCallInfo
        ),
      callKey
    );
  }

  public put<RequestBody, ResponseBody>(
    path: string,

    config?: RequestInit,
    callKey: string = "put"
  ): ApiCallInstance<ResponseBody, RequestBody> {
    return this.createApiCall<ResponseBody, RequestBody>(
      (
        payload: RequestBody,
        updateApiCallInfo: UpdateApiCallInfoFunction<ResponseBody>
      ) =>
        this.http<ResponseBody>(
          path,
          { method: "put", body: JSON.stringify(payload), ...config },
          callKey,
          updateApiCallInfo
        ),
      callKey
    );
  }
  public createApiCall<U, T>(
    requestFunction: (
      data,
      updateApiCallInfo: UpdateApiCallInfoFunction<U>
    ) => Promise<U>,
    callKey: string
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
    this.apiCallInfo = {
      ...this.apiCallInfo,
      ...info,
    };
  }
  private getApiCallInfo(key: keyof ApiCallInfo<U>): any {
    return this.apiCallInfo[key];
  }

  public async mutate<U>(data: U): Promise<U> {
    try {
      console.log("mutate", data, this.api);
      this.updateApiCallInfo({
        isLoading: true,
        isError: false,
        error: null,
      });
      const response = await this.api(data, this.updateApiCallInfo);
      this.updateApiCallInfo({
        isLoading: false,
        isError: false,
        error: null,
      });
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
