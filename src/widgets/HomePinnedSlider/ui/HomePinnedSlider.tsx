import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import { getActualPosts, PostListType } from "@/entities/posts";
import { HomePinnedCard } from "@/features/HomePinnedCard";
import { Colors } from "@/shared/styles/tokens";
import { Skeleton } from "@/shared/ui";

export const HomePinnedSlider = () => {
  const windowWidth = useWindowDimensions().width;
  const scrollOffsetValue = useSharedValue<number>(0);
  const progress = useSharedValue<number>(0);
  const ref = React.useRef<ICarouselInstance>(null);
  const { data: posts, isLoading } = useQuery<PostListType>({
    queryKey: ["home_pinned_posts"],
    queryFn: () =>
      getActualPosts({
        order_by: "-publication_date",
        is_pinned: true,
      }),
  });
  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <View>
      {isLoading ? (
        <Skeleton style={styles.skeletonContainer} isLoading={isLoading} />
      ) : (
        posts && (
          <>
            <Carousel
              width={windowWidth - 36}
              height={193}
              loop
              ref={ref}
              defaultScrollOffsetValue={scrollOffsetValue}
              style={styles.carouselContainer}
              autoPlay={true}
              autoPlayInterval={5000}
              data={posts.items}
              mode="parallax"
              modeConfig={{
                parallaxAdjacentItemScale: 0.7,
                parallaxScrollingScale: 1,
                parallaxScrollingOffset: 50,
              }}
              pagingEnabled={true}
              snapEnabled={true}
              onProgressChange={progress}
              renderItem={({ item }) => <HomePinnedCard {...item} />}
            />
            <Pagination.Basic
              progress={progress}
              data={posts.items}
              dotStyle={styles.carouselDot}
              activeDotStyle={styles.carouselActiveDot}
              containerStyle={styles.carouselDotContainer}
              onPress={onPressPagination}
            />
          </>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    width: "100%",
  },
  carouselDot: {
    backgroundColor: Colors.grayIndicator,
    borderRadius: 50,
  },
  carouselActiveDot: {
    backgroundColor: Colors.redAccent,
  },
  carouselDotContainer: {
    gap: 5,
    marginTop: 10,
  },
  skeletonContainer: {
    width: "100%",
    height: 193,
    borderRadius: 15,
  },
});
