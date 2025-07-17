import { LinearGradient } from "expo-linear-gradient";
import React, { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, Fonts } from "@/shared/styles/tokens";

interface RatingProps {
  maxRating: number;
  minRating: number;
  rating: number | null;
  onRate: (rating: number) => void;
}

export const Rating: FC<RatingProps> = ({
  maxRating,
  minRating,
  rating,
  onRate,
}) => {
  const ratingArray = Array.from(
    { length: maxRating - minRating + 1 },
    (_, i) => i + minRating,
  );

  return (
    <View style={styles.ratingContainer}>
      {ratingArray.map((rate) => (
        <TouchableOpacity
          key={rate}
          onPress={() => onRate(rate)}
          style={[
            styles.ratingWrapper,
            rating && rate <= rating ? styles.ratingSelected : {},
          ]}
        >
          {rating !== null && rate <= rating ? (
            <LinearGradient
              colors={["#1F1919", "#594F50", "#4D4040"]}
              style={styles.ratingLinearGradient}
              start={{ x: 0.12, y: 0.25 }}
              end={{ x: 0.98, y: 0.83 }}
            >
              <Text
                style={[
                  styles.ratingText,
                  rating !== null && rate <= rating
                    ? styles.ratingTextSelected
                    : {},
                ]}
              >
                {rate}
              </Text>
            </LinearGradient>
          ) : (
            <Text
              style={[
                styles.ratingText,
                rating && rate <= rating ? styles.ratingTextSelected : {},
              ]}
            >
              {rate}
            </Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  ratingContainer: {
    width: "100%",
    maxWidth: 500,
    marginVertical: 0,
    marginHorizontal: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 3,
  },
  ratingTextSelected: {
    color: Colors.white,
  },
  ratingText: {
    fontFamily: Fonts.TBold,
    fontSize: 13,
    color: Colors.black,
  },
  ratingWrapper: {
    flex: 1,
    minWidth: 26,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.grayStroke,
  },
  ratingSelected: {
    borderColor: "transparent",
  },
  ratingLinearGradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
