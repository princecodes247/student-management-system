import { Tabs } from "expo-router/tabs";
import { getHeaderTitle } from "@react-navigation/elements";
import { Header } from "../../components/Header";
import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";

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
          tabBarIcon: ({
            size,
            color,
          }: {
            focused: boolean;
            color: string;
            size: number;
          }) => <MaterialIcons name="home" size={size} color={color} />,
          // This tab will no longer show up in the tab bar.
          // href: null,
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="timetable"
        options={{
          tabBarLabel: "Lectures",
          tabBarIcon: ({
            size,
            color,
          }: {
            focused: boolean;
            color: string;
            size: number;
          }) => (
            <MaterialIcons name="calendar-today" size={size} color={color} />
          ),
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
          tabBarIcon: ({
            size,
            color,
          }: {
            focused: boolean;
            color: string;
            size: number;
          }) => <MaterialIcons name="chat" size={size} color={color} />,
          header: getHeader,
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="chats/single"
        options={{
          headerTitle: "Chat Room",
          // headerShown: false,
          tabBarLabel: "Chats",

          header: getHeader,

          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="results"
        options={{
          headerTitle: "Results",
          // headerShown: false,
          tabBarLabel: "Results",
          tabBarIcon: ({
            size,
            color,
          }: {
            focused: boolean;
            color: string;
            size: number;
          }) => <MaterialIcons name="list" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="profile"
        options={{
          headerTitle: "Profile",
          // headerShown: false,
          tabBarLabel: "Profile",
          tabBarIcon: ({
            size,
            color,
          }: {
            focused: boolean;
            color: string;
            size: number;
          }) => <MaterialIcons name="person" size={size} color={color} />,
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
        name="courses"
        options={{
          headerTitle: "Courses",
          // headerShown: false,

          header: getHeader,

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
      <Tabs.Screen
        // Name of the route to hide.
        name="school-fees-successful"
        options={{
          headerTitle: "School Fees",
          // headerShown: false,

          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
    </Tabs>
  );
}
