import * as React from "react";

import { cn } from "../../lib/utils";
import { View, Text, FlatList, VirtualizedList } from "react-native";
import Button from "../Button";
import { Picker } from "../Picker";
import { Input } from "../Input";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { BottomSheetModal } from "../BottomSheet";
import KeyboardAvoidingView from "../KeyboardAvoidingView";
import { PaymentModal } from "../modals/payment";
import { PersonalChatList } from "../../constants/mock/chats";
import { ChatOverview } from "../ChatOverview";
import { ChatOverviewType } from "../../interfaces";

export interface GroupChatsProps {
  classNames?: string;
  navigation: any;
}

const GroupChats = ({ classNames, navigation }: GroupChatsProps) => {
  return (
    <View className="flex-1 p-6 bg-white">
      <FlatList
        data={PersonalChatList}
        renderItem={({ item }) => <ChatOverview item={item} />}
        keyExtractor={(item) => item.id}
        // extraData={selectedId}
      />
    </View>
  );
};

GroupChats.displayName = "GroupChats";

export { GroupChats };
