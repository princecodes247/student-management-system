export type ConditionalArgument<T, U> = U extends undefined ? undefined : T;

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
