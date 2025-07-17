import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThumbsUpIcon } from "@/shared/assets/icons";
import { Colors } from "@/shared/styles/tokens";

interface PartnerListItemProps {
  title: string;
  description: string;
  salary: string;
  id: string;
  image: string;
}

export const PartnerListItem = ({ title, id, image }: PartnerListItemProps) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => router.push(`/(withoutTabs)/privileges/partners/${id}`)}
      >
        <Image style={styles.partnerLogo} source={{ uri: image }} />
        <View style={styles.privelegeDescription}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.partnerDescription}>{title}</Text>
          <View style={styles.discountContainer}>
            <ThumbsUpIcon
              style={{ width: 18, height: 18 }}
              stroke={Colors.redAccent}
            />
            <Text>Скидка 26% на курсы</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  title: {
    fontSize: 13,
    fontWeight: "700",
    color: "#000000",
    flexWrap: "wrap",
  },
  privelegeDescription: {
    gap: 10,
    flexShrink: 1,
  },
  partnerDescription: {
    fontSize: 12,
    color: Colors.grayText,
  },
  separator: {
    marginTop: 15,
    height: 1,
    backgroundColor: Colors.grayStroke,
    width: "100%",
  },
  discountContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    borderColor: Colors.redAccent,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: "flex-start",
  },
  partnerLogo: {
    width: 85,
    height: 85,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
});
