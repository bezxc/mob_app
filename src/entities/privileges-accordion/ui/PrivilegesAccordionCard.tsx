import { Image } from "expo-image";
import { router } from "expo-router";
import { ThumbsUp } from "lucide-react-native";
import { FC } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PrivilegePartnerSchemaType } from "@/entities/privileges";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { useGetPresignUrl } from "@/shared/utils";

interface IPrivilegesAccordionCardProps {
  partner: PrivilegePartnerSchemaType;
}

export const PrivilegesAccordionCard: FC<IPrivilegesAccordionCardProps> = ({
  partner,
}) => {
  const { fileExists, presignUrl } = useGetPresignUrl({
    bucket: "privileges",
    url: partner.image_key,
    queryKey: ["privileges-partner", partner.id],
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        router.push(`/(withoutTabs)/privilegesPartners/${partner.id}`)
      }
    >
      <View style={styles.inner}>
        <View style={styles.imageContainer}>
          {fileExists ? (
            <Image
              style={[styles.image]}
              source={{ uri: presignUrl }}
              contentFit="contain"
            />
          ) : (
            <ActivityIndicator />
          )}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{partner.partner_name}</Text>
          {partner.description && (
            <Text style={styles.description}>{partner.description}</Text>
          )}
          {partner.bonus_description && (
            <View style={styles.bonusContainer}>
              <ThumbsUp color={Colors.redAccent} size={16} />
              <Text style={styles.bonusText}>{partner.bonus_description}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderColor: Colors.gray50,
  },
  inner: {
    flexDirection: "row",
    gap: 20,
    padding: 15,
  },
  image: {
    flexGrow: 1,
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: 65,
    height: 65,
  },
  title: {
    fontFamily: Fonts.SFSemiBold,
    fontSize: 15,
    flexShrink: 1,
    textTransform: "uppercase",
  },

  description: {
    fontFamily: Fonts.SFSemiBold,
    fontSize: 12,
    color: Colors.gray70,
    flexShrink: 1,
  },

  textContainer: {
    gap: 5,
    flexShrink: 1,
  },
  bonusContainer: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.redAccent,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    flexShrink: 1,
  },
  bonusText: {
    color: Colors.redAccent,
    fontSize: 12,
    fontFamily: Fonts.SFSemiBold,
    flexShrink: 1,
  },
});
