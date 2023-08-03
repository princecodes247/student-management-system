export type ConditionalArgument<T, U> = U extends undefined ? undefined : T;

export enum UserType {
  STUDENT = "student",
}

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

export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  role: UserRole;
  matriculation_number?: string;
}

export enum UserRole {
  "Student" = "student",
  "Teacher" = "teacher",
  "Admin" = "admin",
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
