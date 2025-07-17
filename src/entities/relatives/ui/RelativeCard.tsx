import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useUnit } from "effector-react";
import React, { FC, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { RelativeSchemaType, removeRelative } from "@/entities/profile";
import { $auth } from "@/shared/api/auth.store";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { CardMenu } from "@/shared/ui";
import { RelativeForm } from "./RelativeForm";

export const RelativeCard: FC<
  Omit<RelativeSchemaType, "created_at" | "user_kan_uid"> & {
    disableCardMenu?: boolean;
  }
> = ({ birthday, degree, full_name, id, disableCardMenu }) => {
  const { kanUid } = useUnit($auth);
  const [edit, setEdit] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const relatives = {
    Son: "Сын",
    Daughter: "Дочь",
    Mother: "Мать",
    Father: "Отец",
    Husband: "Муж",
    Wife: "Жена",
  };

  const { mutate } = useMutation<RelativeSchemaType>({
    mutationFn: () => removeRelative(id),
    onSuccess: () => {
      Toast.show({
        text1: "Запись удалена",
      });
      queryClient.invalidateQueries({ queryKey: ["relatives", { kanUid }] });
    },
  });

  return (
    <View>
      {!edit ? (
        <View style={styles.cardContainer}>
          <View style={styles.cardHeader}>
            <Text style={styles.relativeDegree}>{relatives[degree]}</Text>
          </View>
          <View style={styles.cardBody}>
            <Text style={[styles.name]}>{full_name}</Text>
            {!disableCardMenu && (
              <CardMenu
                editFn={() => setEdit((prev) => !prev)}
                deleteFn={mutate}
              />
            )}
          </View>
          <Text style={styles.birthdayDate}>
            День рождения: {dayjs(birthday).format("DD.MM.YYYY")}
          </Text>
        </View>
      ) : (
        <RelativeForm
          edit
          setEdit={setEdit}
          degree={degree}
          birthDay={new Date(birthday)}
          fullName={full_name}
          id={id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: Colors.grayLight,
    borderRadius: 20,
    gap: 5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 7,
  },
  cardBody: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  relativeDegree: {
    fontSize: 12,
    fontFamily: Fonts.SFSemiBold,
    color: Colors.redAccent,
  },
  name: {
    fontSize: 14,
    fontFamily: Fonts.TBold,
    flexBasis: "90%",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    borderRadius: 30,
  },
  birthdayDate: {
    fontFamily: Fonts.SFSemiBold,
    fontSize: 12,
    color: Colors.gray70,
  },
});
