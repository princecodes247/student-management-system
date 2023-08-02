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

export interface ILinkData {}

export interface IUpdateProfileData {
  phone?: string;
  mothersName: string;
  nationality: string;
  stateOfOrigin: string;
  lga: string;
  address: string;
}
