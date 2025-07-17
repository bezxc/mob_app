import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { MagazineCard } from "@/features/MagazineCard";

interface Card {
  id: string;
  title: string;
  description: string;
  image: string | undefined;
}

export default function Tab() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Card[]>([]);

  const getMovies = async () => {
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
    getMovies();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        {isLoading && data.length > 0 ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            key={Math.random()}
            data={data}
            numColumns={2}
            keyExtractor={({ id }) => id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              gap: 20,
            }}
            columnWrapperStyle={{
              gap: 20,
            }}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={getMovies} />
            }
            renderItem={({ item }) => <MagazineCard {...item} />}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: "#ffffff",
    paddingVertical: 15,
  },
});
