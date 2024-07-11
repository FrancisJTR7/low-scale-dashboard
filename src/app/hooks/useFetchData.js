import { useQuery } from '@tanstack/react-query';

const fetchBigQueryData = async (tableIdentifier) => {
  const response = await fetch(
    `/api/bigquerydata?tableIdentifier=${tableIdentifier}`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const useBigQueryData = (tableIdentifier) => {
  return useQuery({
    queryKey: ['bigQueryData', tableIdentifier],
    queryFn: () => fetchBigQueryData(tableIdentifier),
    staleTime: 1000 * 60 * 1, // 1 minute
    cacheTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true, // Refetch data on window focus
  });
};

export default useBigQueryData;
