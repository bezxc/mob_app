import { useUnit } from "effector-react";
import { StatusBar } from "expo-status-bar";
import { FC, JSX } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { $modalVisible, toggleModalPicker } from "../model/modal-picker.store";

interface IModalPickerProps {
  name: string;
  title?: string;
  children: JSX.Element;
}

export const ModalPicker: FC<IModalPickerProps> = ({
  title,
  name,
  children,
}) => {
  const [modalState, toggleModalVisible] = useUnit([
    $modalVisible,
    toggleModalPicker,
  ]);

  return (
    <Modal
      animationType="slide"
      style={styles.modal}
      transparent={true}
      visible={modalState.modalName === name && modalState.modalVisible}
      onRequestClose={() => toggleModalVisible(name)}
    >
      <StatusBar style="light" backgroundColor="transparent" />
      <TouchableWithoutFeedback onPress={() => toggleModalVisible(name)}>
        <View style={styles.centeredView}>
          <Pressable style={styles.modalView}>
            {title && <Text style={styles.title}>{title}</Text>}
            {children}
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  title: {
    alignSelf: "flex-start",
    lineHeight: 20,
    fontSize: 20,
    fontFamily: Fonts.TBold,
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    borderWidth: 1,
    borderColor: Colors.grayStroke,
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    width: "100%",
    backgroundColor: Colors.white,
    paddingHorizontal: 25,
    paddingVertical: 35,
    gap: 10,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
  },
});
