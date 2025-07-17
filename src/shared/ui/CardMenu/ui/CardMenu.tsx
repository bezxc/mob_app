import { EllipsisVertical } from "lucide-react-native";
import { FC, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import OutsidePressHandler from "react-native-outside-press";
import { Colors, Fonts } from "@/shared/styles/tokens";

interface ICardMenu {
  editFn: () => void;
  deleteFn: () => void;
}

export const CardMenu: FC<ICardMenu> = ({ editFn, deleteFn }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <>
      <TouchableOpacity onPress={() => setIsVisible((prev) => !prev)}>
        <EllipsisVertical color={Colors.redAccent} />
      </TouchableOpacity>

      {isVisible && (
        <OutsidePressHandler
          onOutsidePress={() => {
            setIsVisible(false);
          }}
          style={styles.menuContainer}
        >
          <TouchableOpacity onPress={editFn}>
            <Text style={styles.editText}>Редактировать</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={deleteFn}>
            <Text style={styles.deleteText}>Удалить</Text>
          </TouchableOpacity>
        </OutsidePressHandler>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    position: "absolute",
    backgroundColor: Colors.white,
    paddingVertical: 8,
    paddingHorizontal: 20,
    top: 10,
    borderRadius: 8,
    borderTopRightRadius: 0,
    right: 20,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowColor: Colors.black,
    elevation: 1,
    shadowOpacity: 0.6,
    shadowRadius: 5,
    gap: 10,
    zIndex: 1,
    minWidth: 130,
    minHeight: 50,
  },
  editText: {
    fontFamily: Fonts.TRegular,
    fontSize: 13,
    flex: 1,
  },
  deleteText: {
    fontFamily: Fonts.TRegular,
    fontSize: 13,
    color: Colors.redAccent,
    flex: 1,
  },
});
