export const PREFIX = "http://10.22.7.39:3000";

export const FILE_API = {
  uploadImage: `${PREFIX}/upload`,
};

export interface UploadResponse {
  url: string;
}

export const upload = async (
  uri: string,
  name: string,
  saveAvatar?: (payload: string) => string,
  toggleModalVisible?: () => void
) => {
  if (toggleModalVisible) toggleModalVisible();
  const uploadedUrl = await uploadToServer(uri, name);
  if (!uploadedUrl) {
    console.log("Не удалось загрузить изображение");
    return;
  }
  if (saveAvatar) saveAvatar(uploadedUrl);
};

export const uploadToServer = async (uri: string, name: string) => {
  const formData = new FormData() as FormData & {
    append(name: string, value: unknown): void;
  };
  formData.append("image", {
    uri,
    name: name ? name : "photo.jpg",
    type: "image/jpeg",
  });
  try {
    const response = await fetch(FILE_API.uploadImage, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (!response.ok) {
      throw new Error("Непредвиденный ответ от сервера");
    }
    const data: UploadResponse = await response.json();
    return data.url;
  } catch (error) {
    console.error("Ошибка загрузки изображения:", error);
    return null;
  }
};
