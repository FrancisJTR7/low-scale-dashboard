import fetchData from '../../../../utils/bigquery/bquery';

export async function GET(req, res) {
  try {
    console.log('Fetching data...'); // Add this line
    const data = await fetchData();
    console.log('Data fetched:', data); // Add this line
    res.status(200).json(data);
  } catch (error) {
    console.error('Error in GET request:', error); // Add this line
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}

export function POST(req, res) {
  res.status(405).json({ error: 'Method not allowed' });
}

export function PUT(req, res) {
  res.status(405).json({ error: 'Method not allowed' });
}

export function DELETE(req, res) {
  res.status(405).json({ error: 'Method not allowed' });
}
