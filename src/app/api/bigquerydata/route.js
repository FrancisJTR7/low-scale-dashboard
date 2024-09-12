import fetchData from '../../../../utils/bigquery/bquery';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const tableIdentifier = searchParams.get('tableIdentifier');
    const queryType = searchParams.get('queryType');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const hdyhau = searchParams.get('hdyhau');

    if (!tableIdentifier || !queryType || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'Missing tableIdentifier, queryType, startDate, or endDate' },
        { status: 400 }
      );
    }

    const data = await fetchData(
      tableIdentifier,
      queryType,
      startDate,
      endDate,
      hdyhau
    );

    // Convert Big objects to string if needed
    const formattedData = data.map((item) => {
      Object.keys(item).forEach((key) => {
        if (
          item[key] &&
          item[key].constructor &&
          item[key].constructor.name === 'Big'
        ) {
          item[key] = item[key].toString(); // Convert Big to string
        }
      });
      return item;
    });

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error('Error in GET request:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
