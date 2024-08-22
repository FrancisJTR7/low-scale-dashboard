import { useQuery } from '@tanstack/react-query';

const fetchBigQueryData = async (tableIdentifier, queryType) => {
  const response = await fetch(
    `/api/bigquerydata?tableIdentifier=${tableIdentifier}&queryType=${queryType}`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const useBigQueryData = (tableIdentifier, queryType) => {
  return useQuery({
    queryKey: ['bigQueryData', tableIdentifier, queryType],
    queryFn: () => fetchBigQueryData(tableIdentifier, queryType),
    staleTime: 1000 * 60 * 1, // 1 minute
    cacheTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true, // Refetch data on window focus
  });
};

export default useBigQueryData;
