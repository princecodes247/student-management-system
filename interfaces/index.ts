import { AxiosResponse } from "axios";

export type ConditionalArgument<T, U> = U extends undefined ? undefined : T;

export enum UserType {
  STUDENT = "student",
}

export enum Semester {
  first = "First",
  second = "Second",
}

export enum StudentFeesStatus {
  NotPaidFees = 0,
  PaidFees = 1,
}

type NumberAsString<T> = {
  [P in keyof T]: T[P] extends number ? string : T[P];
};

export type CourseStatus = "Compulsory" | "Elective";

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
  loginType: LoginType;
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

export interface OLD_ICourse {
  _id: string;
  code: String;
  title: String;
  description: String;
  unit: number;
}

export interface ICourse {
  title: string;
  code: string;
  units: number;
  status: CourseStatus;
  semester: Semester;
}

export interface ICourseMap {
  [id: ICourse["code"]]: {
    units: ICourse["units"];
    selected: boolean;
  };
}

export interface IFee {
  id: number;
  fee: string;
  // amount: NumberAsString<number>;
  amount: string;
}

export interface IFeesMap {
  [id: IFee["id"]]: {
    amount: string;
    selected: boolean;
  };
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

export interface IBaseProfile {
  surname: string;
  firstname: string;
  matno: string;
}

export interface IProfilePassword {
  password: string;
  confirm_password: string;
}

export interface IProfileGuardian {
  guardian_title: string;
  guardian_firstname: string;
  guardian_surname: string;
  guardian_email: string;
  guardian_mobile: string;
  guardian_alt_phone: string;
}

export interface IProfile
  extends IBaseProfile,
    IProfilePassword,
    IProfileGuardian {
  profilePhoto: string;
  email: string;
  phone: string;
  othernames: string;
  gender: Gender;
  state: string;
  lga: string;
  disabled: Disabled;
}

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

export type QueryApiFunction<ResultType, ArgType> =
  | ((arg?: ArgType) => Promise<ResultType>)
  | ((arg?: ArgType) => Promise<AxiosResponse<ResultType>>);

export type ApiFunction<ResultType, ArgType> = (
  arg?: ArgType
) => Promise<AxiosResponse<ResultType>>;

export interface UseMutateOptions<ResultType, ArgType, ErrorType> {
  onSuccessFunction?: (data: ResultType) => void;
  onErrorFunction?: (error: ErrorType) => void;
  onLoadingFunction?: () => void;
  onMutateFunction?: (payload: ArgType) => void;
  successMessage?: string;
  loadingMessage?: string;
  errorMessage?: string;
  showToast?: boolean;
  defaultData?: ResultType | null;
}

export interface UseQueryOptions<ResultType, ArgType, ErrorType>
  extends UseMutateOptions<ResultType, ArgType, ErrorType> {
  isDisabled?: boolean;
}
