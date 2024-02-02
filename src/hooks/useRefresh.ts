import { useState } from 'react';

interface RefreshState {
  isRefreshing: boolean;
  onRefresh: () => void;
}

const useRefresh = (onRefresh: () => void): RefreshState => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    onRefresh();
    setIsRefreshing(false);
  };

  return {
    isRefreshing,
    onRefresh: handleRefresh,
  };
};

export { useRefresh };
