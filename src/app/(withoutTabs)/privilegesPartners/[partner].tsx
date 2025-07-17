import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from "react-native";
import { getPartnerWithActualOffers } from "@/entities/privileges";
import { PrivilegesPartnerHeader } from "@/entities/privileges-partner-header";
import { PrivilegesPartnerOffers } from "@/features/PrivilegesPartnerOffers";

const PrivilegesPartner = () => {
  const { partner: partnerId } = useLocalSearchParams();

  const {
    data: partnerWithOffers,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["privilegesPartnerOffers", { partnerId }],
    queryFn: () => getPartnerWithActualOffers(partnerId as string),
  });

  if (isLoading || !partnerWithOffers) return <ActivityIndicator />;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
      contentContainerStyle={styles.container}
    >
      <PrivilegesPartnerHeader
        imageKey={partnerWithOffers.image_key}
        title={partnerWithOffers.partner_name}
        description={partnerWithOffers.description}
        id={partnerWithOffers.id}
      />

      <PrivilegesPartnerOffers offers={partnerWithOffers.partner_offers} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 18,
    paddingBottom: 16,
    gap: 20,
  },
});

export default PrivilegesPartner;
