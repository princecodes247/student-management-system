import { AxiosResponse } from "axios";

export type ConditionalArgument<T, U> = U extends undefined ? undefined : T;

export enum UserType {
  STUDENT = "student",
}

export enum Semester {
  first = "first",
  second = "second",
}

export type Gender = "Male" | "Female";
export type StudentType = "indigene" | "non-indigene";
export type MaritalStatus = "single" | "married" | "divorced" | "widowed";
export type Religion = "christianity" | "islam" | "traditional" | "others";
export type Disabled = "Yes" | "No";

export type ChatOverviewType = {
  id: string;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadMessages: number;
  isGroup: boolean;
  isOnline?: boolean;
  isMuted?: boolean;
  isPinned?: boolean;
  isArchived?: boolean;
  profilePicture?: string;
  sender?: string;
};

export enum DeviceType {
  Android = "android",
  IPhone = "iphone",
}
export interface IFaculty {
  name: string;
}

export interface IDepartment {
  name: string;
  faculty: IFaculty;
}

export interface IUser {
  id: number;
  matno: string;
  firstname: string;
  surname: string;
  admission_level: number;
  admission_session: number;
  option_chosen: string;
  guardian_id: number;
  email: string;
  state: string;
  lga: string;
  gender: Gender;
  mobile: string;
  student_type: StudentType;
  disabled: Disabled;
  profile_image_path: string;
  created_at: string;
  updated_at: string;
}

export interface IEnrollment {
  student: string;
  session: string;
  semester: Semester;
  courses: string[];
}

export interface ICourse {
  _id: string;
  code: String;
  title: String;
  description: String;
  unit: number;
}

export enum UserRole {
  "Student" = "student",
  "Teacher" = "teacher",
  "Admin" = "admin",
}

export enum LoginType {
  FirstTimeUser = "first",
  UpdatedUser = "updated user",
}

export interface ILinkData {}

export interface IUpdateProfileData {
  phone?: string;
  mothersName: string;
  nationality: string;
  stateOfOrigin: string;
  lga: string;
  address: string;
}

export type IFileData =
  | { url: any; type: "cancel" }
  | {
      uri: string;
      mimeType?: string;
      name: string;
      size?: number;
      type: "success";
      url?: string;
      lastModified?: number;
      file?: File;
      output?: FileList;
    };
type s = {
  type: "success";
  name: string;
  size?: number;
  uri: string;
  mimeType?: string;
};

export type ApiFunction<ResultType, ArgType> = (
  arg?: ArgType
) => Promise<AxiosResponse<ResultType>>;

export interface UseMutateOptions<ResultType, ArgType> {
  onSuccessFunction?: (data: ResultType) => void;
  onErrorFunction?: (error: Error) => void;
  onLoadingFunction?: () => void;
  onMutateFunction?: (payload: ArgType) => void;
  successMessage?: string;
  loadingMessage?: string;
  errorMessage?: string;
  showToast?: boolean;
}
