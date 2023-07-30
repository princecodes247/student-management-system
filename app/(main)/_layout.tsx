import { Tabs } from "expo-router/tabs";
import { getHeaderTitle } from "@react-navigation/elements";
import { Header } from "../../components/Header";
export default function AppLayout() {
  const getHeader = ({ navigation, route, options }) => {
    const title = getHeaderTitle(options, route.name);

    return <Header title={title} style={options.headerStyle} />;
  };
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
          tabBarLabel: "Lectures",
          header: getHeader,
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="chats/index"
        options={{
          headerTitle: "Chat Room",
          // headerShown: false,
          tabBarLabel: "Chats",
          header: getHeader,

          // This tab will no longer show up in the tab bar.
          // href: null,
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="chats/index"
        options={{
          headerTitle: "Chat Room",
          // headerShown: false,
          tabBarLabel: "Chats",
          header: getHeader,

          // This tab will no longer show up in the tab bar.
          // href: null,
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="results"
        options={{
          headerTitle: "Results",
          // headerShown: false,
          tabBarLabel: "Results",

          // header: getHeader,

          // This tab will no longer show up in the tab bar.
          // href: null,
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="profile"
        options={{
          headerTitle: "Profile",
          // headerShown: false,
          tabBarLabel: "Profile",
          // header: getHeader,

          // This tab will no longer show up in the tab bar.
          // href: null,
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="course-enrollment"
        options={{
          headerTitle: "Course Enrollment",
          // headerShown: false,
          tabBarLabel: "Course Enrollment",
          // header: getHeader,

          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="school-fees"
        options={{
          headerTitle: "School Fees",
          // headerShown: false,
          tabBarLabel: "School Fees",
          // header: getHeader,

          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
    </Tabs>
  );
}
