import { router } from "expo-router";
import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  getDateRange,
  PartnerOfferSchemaType,
  PrivilegePartnerOffersSchemaType,
} from "@/entities/privileges";
import { Colors, Fonts } from "@/shared/styles/tokens";

interface IPrivilegesPartnerOffersProps {
  offers: PrivilegePartnerOffersSchemaType;
}

interface IPartnerOfferCard {
  offer: PartnerOfferSchemaType;
}

const PartnerOfferCard: FC<IPartnerOfferCard> = ({ offer }) => {
  const { id, privilege_partner, offer_discount, title, start_date, end_date } =
    offer;
  return (
    <TouchableOpacity
      style={styles.offerContainer}
      onPress={() =>
        router.push({
          pathname: `/(withoutTabs)/privilegesPartners/offer/[offer]`,
          params: {
            offer: id,
            title: privilege_partner.partner_name,
          },
        })
      }
    >
      <Text style={styles.title}>
        <Text style={styles.promoText}>{offer_discount}</Text> {title}
      </Text>

      <View>
        {(start_date || end_date) && (
          <Text style={styles.date}>Период действия:</Text>
        )}
        <Text style={styles.date}>
          {getDateRange({
            startDate: start_date,
            endDate: end_date,
          })}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const PrivilegesPartnerOffers: FC<IPrivilegesPartnerOffersProps> = ({
  offers,
}) => {
  return (
    <View style={styles.container}>
      {offers.map((offer) => (
        <PartnerOfferCard key={offer.id} offer={offer} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: 12 },
  offerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.gray50,
    borderRadius: 21,
    gap: 8,
  },
  title: {
    fontFamily: Fonts.SFSemiBold,
    fontSize: 16,
  },

  date: {
    fontFamily: Fonts.SFSemiBold,
    fontSize: 12,
    color: Colors.gray70,
  },

  promoText: {
    color: Colors.redAccent,
  },
});
