import { useQuery } from "@tanstack/react-query";
import { useUnit } from "effector-react";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { getIssuesCategoryById, setSelectedCategory } from "@/entities/issues";
import { getDateRange, getPartnersOfferById } from "@/entities/privileges";
import { PrivilegesOfferLink } from "@/features/PrivilegesOfferLink";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { GradientButton } from "@/shared/ui";
import { useGetPresignUrl } from "@/shared/utils";

const IssueCenterButton = ({ categoryId }: { categoryId: number }) => {
  const { data: category, isLoading } = useQuery({
    queryKey: ["issues-category", categoryId],
    queryFn: () => getIssuesCategoryById(categoryId),
  });
  const setCategory = useUnit(setSelectedCategory);

  const handleClick = () => {
    if (category?.is_active) {
      setCategory({ selectedCategory: category });
      router.push(`/(withoutTabs)/issuesPage/sendIssue`);
    } else {
      router.push(`/(withoutTabs)/issuesPage/sendIssue`);
    }
  };
  return (
    <GradientButton
      gradientStyles={{ paddingVertical: 16 }}
      onPress={handleClick}
      disabled={isLoading}
    >
      Перейти в центр обращений
    </GradientButton>
  );
};

const PrivilegesOfferQR = ({
  imageKey,
  id,
}: {
  imageKey: string;
  id: number;
}) => {
  const { fileExists, presignUrl } = useGetPresignUrl({
    bucket: "privileges",
    url: imageKey,
    queryKey: ["privileges-partner-offer", id],
  });

  return (
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
  );
};
const PrivilegesOfferPage = () => {
  const { offer: offerId } = useLocalSearchParams();

  const { data: offer, isLoading } = useQuery({
    queryKey: ["privilegesPartnerOffer", { offerId }],
    queryFn: () => getPartnersOfferById(offerId as string),
  });

  if (isLoading || !offer) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{offer.title}</Text>
      <Text style={styles.description}>{offer.description}</Text>
      {offer.offer_discount && (
        <View>
          <Text style={styles.discountText}>Скидка/промокод: </Text>
          <Text style={styles.promoText}>{offer.offer_discount}</Text>
        </View>
      )}

      <View>
        {(offer.start_date || offer.end_date) && (
          <Text style={styles.date}>Период действия:</Text>
        )}
        <Text style={styles.date}>
          {getDateRange({
            startDate: offer.start_date,
            endDate: offer.end_date,
          })}
        </Text>
      </View>
      {offer.files.map((file) => (
        <PrivilegesOfferLink key={file.file_key} file={file} />
      ))}
      {offer.image_key && (
        <PrivilegesOfferQR id={offer.id} imageKey={offer.image_key} />
      )}

      {offer.issue_center_category_id ? (
        <IssueCenterButton categoryId={offer.issue_center_category_id} />
      ) : (
        <GradientButton
          gradientStyles={{ paddingVertical: 16 }}
          onPress={() => router.push(`/(withoutTabs)/issuesPage/sendIssue`)}
        >
          Перейти в центр обращений
        </GradientButton>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 18,
    paddingBottom: 16,
    gap: 12,
  },
  title: {
    fontFamily: Fonts.TBold,
    fontSize: 19,
  },

  description: {
    fontSize: 14,
  },

  date: {
    fontFamily: Fonts.TBold,
    fontSize: 14,
    color: Colors.gray70,
  },
  imageContainer: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 150,
    height: 150,
  },

  discountText: {
    color: Colors.gray70,
    fontSize: 14,
    fontFamily: Fonts.TBold,
  },

  promoText: {
    fontSize: 16,
    color: Colors.redAccent,
    fontFamily: Fonts.TBold,
    textTransform: "uppercase",
  },
});

export default PrivilegesOfferPage;
