import { StyleSheet, View } from "react-native";
import {
  HomeNavigationCard,
  homeNavigationCards,
} from "@/entities/home-content";

export const HomeNavigationCards = () => {
  return (
    <View style={styles.container}>
      {homeNavigationCards.map((cardTuple, cardTupleIndex) => (
        <View key={cardTupleIndex} style={styles.cardContainer}>
          {cardTuple.map((card, index) => (
            <HomeNavigationCard
              key={card.title}
              index={index}
              cardTupleIndex={cardTupleIndex}
              {...card}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    gap: 12,
  },
  cardContainer: {
    flexDirection: "row",
    width: "100%",
    gap: 22,
  },
});
