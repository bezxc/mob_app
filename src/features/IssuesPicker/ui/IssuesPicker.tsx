import { useActionSheet } from "@expo/react-native-action-sheet";
import {
  ImagePickerOptions,
  launchImageLibraryAsync,
  PermissionStatus,
  useMediaLibraryPermissions,
} from "expo-image-picker";
import { useController } from "react-hook-form";
import { Alert, Linking, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import { pickDocument } from "@/entities/document-uploader";
import { IIssueStandartFormSchemaInitialType } from "@/entities/issues";
import { Colors } from "@/shared/styles/tokens";
import { actionSheetStyles, Select } from "@/shared/ui";

export const IssuesPicker = () => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [_libraryPermissions, requestLibraryPermission] =
    useMediaLibraryPermissions();

  const {
    field: { value: files = [], onChange },
  } = useController<IIssueStandartFormSchemaInitialType, "files">({
    name: "files",
  });
  const onOpenActionSheet = () => {
    const selectOptions = ["Документы", "Фото/Видео"];
    selectOptions.push("Закрыть");

    const cancelButtonIndex = selectOptions.length - 1;

    showActionSheetWithOptions(
      {
        options: selectOptions,
        cancelButtonIndex,
        cancelButtonTintColor: Colors.redAccent,
        containerStyle: styles.actionSheetContainerStyle,
        showSeparators: true,
        separatorStyle: styles.actionSheetSeparatorStyle,
        textStyle: styles.actionSheetTextStyle,
      },
      (buttonIndex) => {
        if (
          typeof buttonIndex === "number" &&
          buttonIndex !== cancelButtonIndex
        ) {
          if (buttonIndex === 0) {
            handlePickDocument();
          } else {
            selectImage();
          }
        }
      },
    );
  };

  const verifyPermissions = async () => {
    const { status } = await requestLibraryPermission();

    if (status !== PermissionStatus.GRANTED) {
      Alert.alert(
        "Разрешение необходимо",
        `Перейдите в настройки и предоставьте доступ`,
        [
          { text: "Отмена", style: "cancel" },
          { text: "OK", onPress: () => Linking.openSettings() },
        ],
      );
      return false;
    }
    return true;
  };

  const selectImage = async () => {
    const options: ImagePickerOptions = {
      mediaTypes: ["images", "videos"],
      allowsEditing: false,
      orderedSelection: true,
      allowsMultipleSelection: true,
      base64: true,
      selectionLimit: 3 - files.length,
      aspect: [1, 1],
      quality: 0.5,
    };

    const isPermissionGranted = await verifyPermissions();
    if (!isPermissionGranted) {
      Toast.show({
        type: "error",
        text1: "Произошла ошибка",
        text2: "Недостаточно прав для доступа к галерее",
      });
      return;
    }

    const result = await launchImageLibraryAsync(options);

    if (!result.canceled) {
      const preparedMedia = result.assets.map((file) => {
        return {
          uri: file.uri,
          name: file.fileName,
          type: file.mimeType,
          size: file.fileSize,
        };
      });

      const preparedFiles = [...files, ...preparedMedia];

      onChange(preparedFiles);
    }
  };

  const handlePickDocument = async () => {
    const result = await pickDocument();
    if (result) {
      const preparedFiles = [...files, ...result];

      onChange(preparedFiles);
    }
  };

  const onClearPicker = () => {
    onChange([]);
  };

  return (
    <Select
      label="Прикрепить файл"
      value={files.map((item) => item.name).join(", ") || "Выбрать"}
      onPress={onOpenActionSheet}
      style={styles.select}
      withClear={files.length > 0}
      clearFn={onClearPicker}
    />
  );
};

const styles = StyleSheet.create({
  select: {
    paddingRight: 55,
  },
  ...actionSheetStyles,
});
