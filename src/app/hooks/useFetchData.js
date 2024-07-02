import { useQuery } from '@tanstack/react-query';

const fetchBigQueryData = async () => {
  const response = await fetch('/api/bigquerydata');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const useBigQueryData = () => {
  return useQuery({
    queryKey: ['bigQueryData'],
    queryFn: fetchBigQueryData,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
  });
};
export default useBigQueryData;
