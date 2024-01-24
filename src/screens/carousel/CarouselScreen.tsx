import React, { useEffect, useRef, useState } from 'react';
import { Image, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { Product } from '@/screens/home/HomeScreen';
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '@/theme/theme';

const CarouselScreen: React.FC = () => {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then(setData);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (carouselRef.current && activeIndex < data.length - 1) {
        (carouselRef.current as any).snapToNext();
      } else {
        (carouselRef.current as any).snapToItem(0);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [activeIndex]);

  const handleShare = async () => {
    const current = data[activeIndex];
    await Share.share({
      message: current.title,
      url: current.image,
    }).catch((err) => console.warn(err));
  };

  const renderItem: ({ item }: string) => React.JSX.Element = ({ item }: string) => (
    <TouchableOpacity onPress={handleShare}>
      {item && item.image && (
        <View>
          <Image source={{ uri: item.image }} style={styles.carouselImage} />
          <Text style={styles.carouselTitle}>{item.title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderPagination = () => (
    <Pagination
      dotsLength={data.length}
      activeDotIndex={activeIndex}
      containerStyle={styles.paginationContainer}
      dotStyle={styles.dotStyle}
      inactiveDotStyle={styles.inactiveDotStyle}
      inactiveDotOpacity={0.6}
      inactiveDotScale={0.8}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Carousel
          ref={carouselRef}
          data={data}
          renderItem={renderItem}
          sliderWidth={300}
          itemWidth={300}
          onSnapToItem={(index) => setActiveIndex(index)}
          loop
        />
        {renderPagination()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  carouselImage: {
    width: 300,
    height: 400,
    borderRadius: BORDERRADIUS.radius_4,
  },
  paginationContainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 400,
  },
  dotStyle: {
    width: SPACING.space_4,
    height: SPACING.space_4,
    borderRadius: SPACING.space_4,
    backgroundColor: COLORS.primaryYellowHex,
  },
  inactiveDotStyle: {
    width: SPACING.space_4,
    height: SPACING.space_4,
    backgroundColor: COLORS.primaryWhiteHex,
  },
  carouselTitle: {
    color: COLORS.primaryBlackHex,
    fontSize: FONTSIZE.size_18,
    position: 'absolute',
  },
});

export { CarouselScreen };
