import { useQuery } from '@tanstack/react-query';

const fetchBigQueryData = async (
  tableIdentifier,
  queryType,
  startDate,
  endDate,
  hdyhau
) => {
  const response = await fetch(
    `/api/bigquerydata?tableIdentifier=${tableIdentifier}&queryType=${queryType}&startDate=${startDate}&endDate=${endDate}&hdyhau=${hdyhau}`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const useBigQueryData = (
  tableIdentifier,
  queryType,
  startDate,
  endDate,
  hdyhau
) => {
  return useQuery({
    queryKey: [
      'bigQueryData',
      tableIdentifier,
      queryType,
      startDate,
      endDate,
      hdyhau,
    ],
    queryFn: () =>
      fetchBigQueryData(tableIdentifier, queryType, startDate, endDate, hdyhau),
    staleTime: 1000 * 60 * 1, // 1 minute
    cacheTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true, // Refetch data on window focus
  });
};

export default useBigQueryData;
