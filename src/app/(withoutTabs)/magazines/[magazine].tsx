import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Colors } from "@/shared/styles/tokens";

interface Card {
  id: string;
  title: string;
  description: string;
  image: string | undefined;
}

const Magazine = () => {
  const { magazine } = useLocalSearchParams();

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Card | null>(null);

  const getMovies = async () => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${magazine}`,
      );
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
      {isLoading || !data ? <ActivityIndicator /> : <View />}
    </View>
  );
};

export default Magazine;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
});
