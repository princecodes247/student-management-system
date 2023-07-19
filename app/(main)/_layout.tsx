import { Tabs } from "expo-router/tabs";
export default function AppLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        // Name of the route to hide.
        name="home"
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          // This tab will no longer show up in the tab bar.
          // href: null,
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="timetable"
        options={{
          headerShown: false,
          tabBarLabel: "Timetable",
          // This tab will no longer show up in the tab bar.
          // href: null,
        }}
      />
    </Tabs>
  );
}
