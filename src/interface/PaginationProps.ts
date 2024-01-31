import { Animated } from 'react-native';

import { Product } from '@/interface/Product';

export interface PaginationProps {
  data: Product[];
  scrollX: Animated.Value;
  index: number;
}
