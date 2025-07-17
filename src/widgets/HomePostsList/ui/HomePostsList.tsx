import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { HomePostCard } from "@/entities/home-post-card";
import { getActualPosts, PostListType } from "@/entities/posts";
import { ShowAllPostsIcon } from "@/shared/assets/icons";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { Skeleton } from "@/shared/ui";
import { skeletonData } from "../model/skeletonData";

export const HomePostsList = () => {
  const { data: posts, isLoading } = useQuery<PostListType>({
    queryKey: ["home_posts"],
    queryFn: () =>
      getActualPosts({
        order_by: "-publication_date",
        size: 10,
        is_pinned: false,
      }),
  });

  return (
    <View>
      <Text style={styles.title}>НОВОСТИ</Text>
      {posts?.items ? (
        <FlatList
          data={posts.items}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEnabled
          contentContainerStyle={styles.contentContainer}
          keyExtractor={({ id }) => String(id)}
          ListFooterComponent={() => (
            <TouchableOpacity
              onPress={() => {
                router.replace("/(tabs)/posts");
              }}
              style={styles.listFooterContainer}
            >
              <ShowAllPostsIcon width={24} height={24} />
            </TouchableOpacity>
          )}
          renderItem={({ item, index }) => {
            return (
              <HomePostCard
                style={[index === 0 && { marginLeft: 18 }]}
                image_key={item.image_key}
                title={item.title}
                id={String(item.id)}
                created_at={item.created_at}
                thumbnail_key={item.thumbnail_key}
              />
            );
          }}
        />
      ) : (
        <FlatList
          data={skeletonData}
          horizontal={true}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          keyExtractor={({ id }) => id}
          renderItem={() => (
            <Skeleton style={styles.skeletonContainer} isLoading={isLoading}>
              <View style={styles.skeletonElementWrapper}>
                <View style={styles.skeletonElement} />
              </View>
            </Skeleton>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    gap: 16,
  },
  title: {
    fontSize: 15,
    fontFamily: Fonts.TRegular,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 12,
  },
  skeletonContainer: {
    width: 91,
    height: 91,
    justifyContent: "flex-end",
    padding: 15,
    borderRadius: 16,
  },
  skeletonElement: {
    borderRadius: 16,
    height: 10,
    backgroundColor: Colors.gray,
  },
  skeletonElementWrapper: {
    backgroundColor: "transparent",
    gap: 10,
  },
  listFooterContainer: {
    width: 50,
    height: 110,
    borderRadius: 15,
    backgroundColor: Colors.white,
    marginRight: 18,
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
});
