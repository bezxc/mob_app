import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { NotificationCard } from "@/entities/notification-card";
import { Colors } from "@/shared/styles/tokens";

interface Card {
  id: string;
  title: string;
  description: string;
  image: string;
}

export default function NotificationsPage() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Card[]>([]);

  const getNotifications = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);
  return (
    <View style={styles.container}>
      {isLoading && data.length > 0 ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          contentContainerStyle={styles.flatListContainer}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={getNotifications}
            />
          }
          showsVerticalScrollIndicator={false}
          keyExtractor={({ id }) => id}
          renderItem={() => (
            <NotificationCard
              title="Не забудьте добавить фото после завршения вашего занятия"
              date="22 марта • 9:47"
              iconProps={{ stroke: "red", fill: Colors.white }}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
  },
  flatListContainer: {
    gap: 10,
    paddingBottom: 32,
  },
});
