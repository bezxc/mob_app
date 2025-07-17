import { useQueryClient } from "@tanstack/react-query";
import { useUnit } from "effector-react";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import ImagePicker, {
  launchImageLibraryAsync,
  PermissionStatus,
  useMediaLibraryPermissions,
} from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import { Alert, Linking, StyleSheet, Text, View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import Toast from "react-native-toast-message";
import { $auth } from "@/shared/api/auth.store";
import { Fonts } from "@/shared/styles/tokens";
import { LinearGradientButton } from "@/shared/ui";
import { deleteObjectFromBucket, uploadImageToBucket } from "@/shared/utils";

export const PersonalImageBottomSheet = () => {
  const { kanUid } = useUnit($auth);

  const queryClient = useQueryClient();

  const [_libraryPermissions, requestLibraryPermission] =
    useMediaLibraryPermissions();

  const handleDelete = async () => {
    try {
      await deleteObjectFromBucket({
        key: `${kanUid}.jpeg`,
        bucket: "avatars",
      }).finally(() => {
        queryClient.invalidateQueries({ queryKey: ["avatar", kanUid] });
        SheetManager.hide("profile-image");
      });
      console.log("Object deleted successfully");
    } catch (error) {
      console.error("Failed to delete object:", error);
    }
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
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
    };

    const isPermissionGranted = await verifyPermissions();
    if (!isPermissionGranted) {
      console.log('Недостаточно прав для доступа к "галерее" ');
      return;
    }

    const result = await launchImageLibraryAsync(options);

    if (!result.canceled) {
      const asset = await manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 800, height: 800 } }],
        { format: SaveFormat.JPEG, compress: 0.5 },
      );

      if (result.assets[0].fileSize && result.assets[0].fileSize > 5000000) {
        Toast.show({
          text1: "Слишком большой размер файла",
          text2: "Файл должен быть не больше 5МБ",
        });

        return;
      }

      const imagePath = asset.uri;
      const imageExt = asset.uri.split(".").pop();

      uploadImageToBucket({
        file: imagePath,
        kan_uid: kanUid,
        fileType: `image/${imageExt}`,
      }).finally(() => {
        queryClient.invalidateQueries({ queryKey: ["avatar", kanUid] });
        SheetManager.hide("profile-image");
      });
    }
  };

  return (
    <ActionSheet
      isModal={false}
      gestureEnabled
      containerStyle={styles.container}
      indicatorStyle={{
        display: "none",
      }}
    >
      <StatusBar style="light" backgroundColor="transparent" />
      <Text style={styles.title}>Фото профиля</Text>
      <View style={styles.buttonsWrapper}>
        <LinearGradientButton
          text="Изменить фотографию"
          onPress={() => selectImage()}
        />

        <LinearGradientButton
          colors={["#1D77ED", "#56A0FF", "#2572D6"]}
          text="Удалить фотографию"
          onPress={handleDelete}
          buttonStyle={{ height: 50 }}
        />
      </View>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 35,
  },
  title: {
    alignSelf: "flex-start",
    lineHeight: 20,
    fontSize: 20,
    fontFamily: Fonts.TBold,
  },
  buttonsWrapper: {
    marginVertical: 25,
    gap: 10,
    justifyContent: "space-between",
  },
});
