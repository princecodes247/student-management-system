import { AppStateStatus, Platform } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
} from "@tanstack/react-query";
import { useOnlineManager } from "../hooks/useOnlineManager";
import { useAppState } from "../hooks/useAppState";

function onAppStateChange(status: AppStateStatus) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // useOnlineManager();

  // useAppState(onAppStateChange);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
