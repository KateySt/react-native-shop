import React, { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native';

import { Pagination } from '@/components/Pagination';
import { SlideItem } from '@/components/SlideItem';
import { Product } from '@/interface/Product';

const Slider: React.FC<{ data: Product[] }> = ({ data }) => {
  const [index, setIndex] = useState<number>(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (flatListRef.current && index < data.length - 1) {
        flatListRef.current.scrollToIndex({ index: index + 1 });
        setIndex(index + 1);
      } else {
        flatListRef.current?.scrollToIndex({ index: 0 });
        setIndex(0);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [index, data]);

  const handleOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any }) => {
    if (viewableItems && viewableItems.length > 0) {
      setIndex(viewableItems[0].index);
    } else {
      setIndex(0);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View>
      <FlatList
        ref={(ref) => (flatListRef.current = ref)}
        data={data}
        renderItem={({ item }: { item: Product }) => <SlideItem item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Pagination data={data} scrollX={scrollX} index={index} />
    </View>
  );
};

export { Slider };
