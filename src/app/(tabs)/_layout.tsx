import { useUnit } from "effector-react";
import { Href, Tabs } from "expo-router";
import { useRouteInfo, useSegments } from "expo-router/build/hooks";
import React from "react";
import { Platform } from "react-native";
import { TabBarAvatarImage } from "@/entities/avatar-image";
import { HomeHeader } from "@/entities/home-header";
import { $auth } from "@/shared/api/auth.store";
import {
  TabsColleaguesIcon,
  TabsHomeIcon,
  TabsPostsIcon,
} from "@/shared/assets/icons";
import { Colors } from "@/shared/styles/tokens";
import { HomeBottomSheet } from "@/widgets/HomeBottomSheet";

interface ITabBarIconProps {
  active: boolean;
  kan_uid: string;
  full_name: string;
}

interface ITabOption {
  name: string;
  title: string;
  pathName: Href | null;
  tabBarIcon: ({
    active,
    kan_uid,
    full_name,
  }: ITabBarIconProps) => React.JSX.Element;
  headerShown?: boolean;
  header?: (props: any) => React.JSX.Element;
  isHidden?: boolean;
}

const tabs: ITabOption[] = [
  {
    name: "index",
    title: "Главная",
    pathName: "/",
    tabBarIcon: ({ active = false }) => (
      <TabsHomeIcon stroke={active ? Colors.redAccent : Colors.grayText} />
    ),
    header: () => <HomeHeader />,
  },
  {
    name: "posts",
    title: "Новости",
    pathName: "/posts",
    tabBarIcon: ({ active = false }) => (
      <TabsPostsIcon stroke={active ? Colors.redAccent : Colors.grayText} />
    ),
    headerShown: false,
  },
  {
    name: "colleagues",
    title: "Коллеги",
    pathName: "/colleagues",
    tabBarIcon: ({ active = false }) => (
      <TabsColleaguesIcon
        stroke={active ? Colors.redAccent : Colors.grayText}
      />
    ),
    headerShown: false,
  },
  {
    name: "profile",
    title: "Профиль",
    pathName: "/profile",
    tabBarIcon: ({ full_name, kan_uid }) => (
      <TabBarAvatarImage full_name={full_name} kan_uid={kan_uid} />
    ),
    headerShown: false,
  },
];

const TabLayout = () => {
  const { pathname: activePathName } = useRouteInfo();
  const segments = useSegments();
  const { kanUid, fullName } = useUnit($auth);

  return (
    <>
      <Tabs
        screenOptions={() => {
          return {
            tabBarActiveTintColor: Colors.redAccent,
            tabBarIconStyle: { color: Colors.redAccent },
            tabBarStyle:
              Platform.OS === "android"
                ? {
                    height: 65,
                    paddingBottom: 8,
                  }
                : {
                    height: 80,
                    paddingBottom: 25,
                  },
          };
        }}
      >
        {tabs.map(
          ({
            name,
            title,
            pathName,
            tabBarIcon,
            header,
            headerShown,
            isHidden,
          }) =>
            !isHidden && (
              <Tabs.Screen
                key={title}
                name={name}
                options={{
                  title,
                  href: pathName,
                  tabBarIcon: () =>
                    tabBarIcon({
                      active:
                        activePathName === pathName ||
                        Boolean(segments.find((value) => value === name)),
                      full_name: fullName,
                      kan_uid: kanUid,
                    }),
                  tabBarItemStyle:
                    activePathName === pathName ||
                    segments.find((value) => value === name)
                      ? {
                          borderTopWidth: 2,
                          borderColor: Colors.redAccent,
                        }
                      : {},
                  header,
                  headerShown,
                }}
              />
            ),
        )}
      </Tabs>
      <HomeBottomSheet />
    </>
  );
};

export default TabLayout;
