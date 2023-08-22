import * as React from "react";

import { cn } from "../../../lib/utils";
import { View, ScrollView, Dimensions, Text } from "react-native";
import Button from "../../Button";
import { Picker } from "../../Picker";
import { Input } from "../../Input";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { BottomSheetModal } from "../../BottomSheet";
import KeyboardAvoidingView from "../../KeyboardAvoidingView";
import * as WebBrowser from "expo-web-browser";
import { WebView } from "react-native-webview";
import * as Linking from "expo-linking";

export interface PaymentModalProps {
  classNames?: string;
  firstRef: React.RefObject<BottomSheet>;
  amount?: number;
  onSuccess?: () => void;
  url?: string;
}

const PaymentModal = ({
  classNames,
  firstRef,
  amount = 0,
  onSuccess,
  url,
}: PaymentModalProps) => {
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const bottomSheetRef2 = React.useRef<BottomSheet>(null);
  const bottomSheetRef3 = React.useRef<BottomSheet>(null);

  const handleOpenBottomSheet2 = () => {
    if (firstRef.current) firstRef.current.close();
    if (bottomSheetRef2.current) bottomSheetRef2.current.expand();
  };
  const handleOpenBottomSheet3 = () => {
    if (bottomSheetRef2.current) bottomSheetRef2.current.close();
    if (bottomSheetRef3.current) bottomSheetRef3.current.collapse();
  };
  const handleFinalClose = () => {
    if (bottomSheetRef3.current) bottomSheetRef3.current.close();
    if (onSuccess) onSuccess();
  };

  const [result, setResult] = React.useState(null);

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync("https://expo.dev");
    setResult(result);
  };

  React.useEffect(() => {
    // if (result) {
    //   console.log(result);
    // } else {
    // _handlePressButtonAsync();
    // }
    console.log({ url });
    return () => {
      // cleanup
    };
  }, [url]);
  return (
    <>
      <BottomSheetModal innerRef={firstRef}>
        <ScrollView
          style={{
            width: "100%",
          }}
          contentContainerStyle={{
            flex: 1,
          }}
        >
          {/* <View className="flex gap-2 my-4"> */}
          {url?.length > 0 && (
            <WebView
              nestedScrollEnabled
              className="h-full p-1 overflow-scroll"
              // style={{
              //   height: Dimensions.get("window").height - 200,
              // }}
              // originWhitelist={["*"]}
              // source={{ html: "<h1><center>Hello world</center></h1>" }}
              source={{ uri: url ?? "" }}
            />
          )}
          {/* </View> */}

          {/* <Button
            classNames="w-full"
            onClick={handleOpenBottomSheet2}
            variant="default"
          >
            Continue
          </Button> */}
        </ScrollView>
      </BottomSheetModal>
      {/* Second Payment modal */}
      <BottomSheetModal innerRef={bottomSheetRef2}>
        <View className="flex-1 p-6 ">
          <View className="mb-2">
            <Text className="text-lg font-semibold">Credit Card payment</Text>
            <View className="my-4">
              <View>
                <Text className="mb-2">Card Number*</Text>
                <Input />
              </View>
              <View className="flex flex-row gap-2 my-4">
                <View className="flex-1">
                  <Text className="mb-2">Expiry Date*</Text>
                  <Input />
                </View>
                <View className="flex-1">
                  <Text className="mb-2">Cvv*</Text>
                  <Input />
                </View>
              </View>
            </View>
          </View>
          <KeyboardAvoidingView>
            <Button
              classNames="w-full "
              onClick={handleOpenBottomSheet3}
              variant="default"
            >
              Pay #{amount}
            </Button>
          </KeyboardAvoidingView>
        </View>
      </BottomSheetModal>

      <BottomSheetModal innerRef={bottomSheetRef3}>
        <View className="flex-1 p-6">
          <Text className="text-2xl font-semibold text-center">
            Payment Successful
          </Text>
          <Text className="my-4 text-sm text-center">
            Your payment was successful. You can now proceed to print your
            result.
          </Text>
          <Button
            classNames="w-full"
            onClick={handleFinalClose}
            variant="default"
          >
            Print Result
          </Button>
        </View>
      </BottomSheetModal>
    </>
  );
};

PaymentModal.displayName = "PaymentModal";

export { PaymentModal };
