import { useQuery } from '@tanstack/react-query';

const fetchBigQueryData = async (
  tableIdentifier,
  queryType,
  startDate,
  endDate
) => {
  const response = await fetch(
    `/api/bigquerydata?tableIdentifier=${tableIdentifier}&queryType=${queryType}&startDate=${startDate}&endDate=${endDate}`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const useBigQueryData = (tableIdentifier, queryType, startDate, endDate) => {
  return useQuery({
    queryKey: ['bigQueryData', tableIdentifier, queryType, startDate, endDate],
    queryFn: () =>
      fetchBigQueryData(tableIdentifier, queryType, startDate, endDate),
    staleTime: 1000 * 60 * 1, // 1 minute
    cacheTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true, // Refetch data on window focus
  });
};

export default useBigQueryData;
