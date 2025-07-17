import * as React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { SceneMap, TabBar, TabBarItem, TabView } from "react-native-tab-view";
import { EdoTab } from "@/entities/edo";
import { Colors, Fonts } from "@/shared/styles/tokens";

const renderScene = SceneMap({
  all: () => <EdoTab />,
  execution: () => <EdoTab is_executed={true} />,
  familiarization: () => <EdoTab is_acquainted={true} />,
  control: () => <EdoTab is_controlled={true} />,
});

const routes = [
  { key: "all", title: "Все" },
  { key: "execution", title: "Исполнение" },
  { key: "familiarization", title: "Ознакомление" },
  { key: "control", title: "Контроль" },
];

export default function Edo() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  return (
    <TabView
      style={styles.tabBarWrapper}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          gap={16}
          activeColor={Colors.redAccent}
          inactiveColor={Colors.grayText}
          indicatorStyle={styles.indicator}
          tabStyle={styles.tabBarInner}
          contentContainerStyle={{ backgroundColor: Colors.white }}
          renderTabBarItem={(props) => {
            const { route } = props;
            return (
              <TabBarItem
                {...props}
                key={route.key}
                labelStyle={styles.tab}
                style={{
                  backgroundColor: Colors.white,
                  width: "auto",
                  padding: 0,
                }}
              />
            );
          }}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    color: Colors.black,
    fontFamily: Fonts.TBold,
    marginBottom: 12,
  },
  tabBarWrapper: {
    backgroundColor: Colors.white,
    marginHorizontal: 18,
  },
  tabBarInner: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayText,
    backgroundColor: Colors.white,
  },
  tab: {
    fontSize: 13,
    textTransform: "none",
  },
  tabText: {
    color: Colors.grayText,
  },
  tabTextActive: {
    color: Colors.redAccent,
  },
  indicator: {
    backgroundColor: Colors.redAccent,
    height: 1,
    bottom: -1,
    display: "none",
  },
});
