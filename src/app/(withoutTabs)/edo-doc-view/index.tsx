import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUnit } from "effector-react";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Dimensions, StyleSheet, View, Text } from "react-native";
import Pdf, { Source } from "react-native-pdf";
import Toast from "react-native-toast-message";
import { edoAcknowledgeDocument } from "@/entities/edo";
import { $auth } from "@/shared/api/auth.store";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { RadioButton } from "@/shared/ui";
import { formatDateWithTime, useGetPresignUrl } from "@/shared/utils";
import dayjs from "dayjs";
import { router } from "expo-router";

export const EdoDocView = () => {
  const { doc_key, was_read, updated_at } = useLocalSearchParams<{
    doc_key: string;
    was_read: string;
    updated_at: string;
  }>();
  const { kanUid } = useUnit($auth);

  const queryClient = useQueryClient();

  const [isAgree, setIsAgree] = useState(was_read === "true");
  const { presignUrl } = useGetPresignUrl({
    bucket: "edo_documents",
    url: doc_key as string,
    pdf: true,
  });

  const { mutate: edoAcknowledgeMutation } = useMutation({
    mutationFn: () =>
      edoAcknowledgeDocument({
        doc_key: doc_key as string,
        was_read: true,
        kan_uid: kanUid,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["edo-docs"] });
      setIsAgree(true);
      router.setParams({ updated_at: dayjs().toString() });
    },

    onError: (e) => {
      Toast.show({
        type: "error",
        text1: "Возникла ошибка, пожалуйста, попробуйте позже",
      });
      console.log(e);
    },
  });

  const source: Source = {
    uri: presignUrl,
    cache: true,
  };

  const handleAgree = () => {
    edoAcknowledgeMutation();
  };

  return (
    <View style={styles.container}>
      <Pdf trustAllCerts={false} source={source} style={styles.pdf} />
      <View style={styles.bottomContainer}>
        <RadioButton
          selected={isAgree}
          radioButtonLabelStyle={{ color: Colors.redAccent }}
          label="Подтверждаю ознакомление с приказом"
          onPress={() => handleAgree()}
          withIcon={false}
          withLabelBorder={false}
        />
        {was_read && dayjs(updated_at).isAfter("2001-01-01") ? (
          <Text style={styles.dateOfView}>
            Дата ознакомления с приказом:{" "}
            {formatDateWithTime(updated_at, "dayWithMonthAndYearAndHourMinute")}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

export default EdoDocView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  dateOfView: {
    fontSize: 14,
    fontFamily: Fonts.TRegular,
  },
  bottomContainer: {
    height: "15%",
    gap: 15,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
});
