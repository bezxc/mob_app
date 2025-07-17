import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { FC } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { MixedStyleDeclaration, RenderHTML } from "react-native-render-html";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { useGetPresignUrl } from "@/shared/utils";

interface IPostDetailMainContentProps {
  title: string;
  description: string;
  image: string;
  tag: string;
}

export const PostDetailMainContent: FC<IPostDetailMainContentProps> = ({
  description,
  image,
  title,
  tag,
}) => {
  const source = {
    html: description,
  };

  const { presignUrl } = useGetPresignUrl({
    bucket: "news",
    url: image,
  });

  const slateClasses: Record<string, MixedStyleDeclaration> = {
    "slate-mention": {
      paddingVertical: 3,
      paddingHorizontal: 2,
      flexGrow: 1,
      borderRadius: 4,
      backgroundColor: "rgb(238, 238, 238)",
      fontWeight: "bold",
    },
    "slate-p": {
      minHeight: "8px",
    },
  };

  const styledTags: Record<string, MixedStyleDeclaration> = {
    blockquote: {
      borderLeftWidth: 2,
      borderColor: "#dddddd",
      marginLeft: 0,
      marginRight: 0,
      paddingLeft: 10,
      fontStyle: "italic",
    },
  };

  console.log(description);

  return (
    <>
      <ImageBackground
        source={{
          uri: presignUrl,
        }}
        style={styles.image}
        imageStyle={{ resizeMode: "cover" }}
        cachePolicy="none"
      >
        <LinearGradient
          colors={["rgba(217, 217, 217, 0)", "#FFFFFF"]}
          start={{ x: 0, y: 0.8 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradient}
        />
      </ImageBackground>

      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.tag}>#{tag}</Text>
        <View style={styles.divider} />
        <RenderHTML
          classesStyles={slateClasses}
          enableCSSInlineProcessing={true}
          source={source}
          tagsStyles={styledTags}
          contentWidth={Dimensions.get("screen").width}
        />
        <View style={styles.divider} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 220,
  },
  gradient: {
    height: 220,
  },
  container: {
    paddingHorizontal: 18,
  },
  title: {
    fontFamily: Fonts.TBold,
    fontSize: 20,
    marginBottom: 5,
    textAlign: "center",
  },
  tag: {
    fontFamily: Fonts.TRegular,
    fontSize: 11,
    color: Colors.grayText,
    textAlign: "center",
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: Colors.gray30,
    marginHorizontal: 32,
    marginVertical: 16,
  },
  description: {
    fontFamily: Fonts.TRegular,
    fontSize: 16,
    color: Colors.grayTextDark,
    marginBottom: 25,
  },
});
