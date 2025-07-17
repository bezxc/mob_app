import { View } from "react-native";
import Pdf from "react-native-pdf";

interface PdfViewerProps {
  uri: string;
  cache?: boolean;
}

export const PdfViewer = (pdfResource: PdfViewerProps) => {
  console.log("pdfResource :>>", pdfResource);
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Pdf
        source={pdfResource}
        style={{
          flex: 1,
        }}
        trustAllCerts={false}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
          console.log("filePath :>>", filePath);
        }}
        onLoadProgress={(progressData) => {
          console.log("progressData :>>", progressData);
        }}
        onError={(err) => console.log(err)}
      />
    </View>
  );
};
