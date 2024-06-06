'use client';

import { ResponsiveLine } from '@nivo/line';

const MyLineChart = () => {
  const data = [
    {
      id: 'japan',
      color: 'hsl(104, 70%, 50%)',
      data: [
        { x: 'plane', y: 270 },
        { x: 'helicopter', y: 300 },
        { x: 'boat', y: 200 },
        { x: 'train', y: 280 },
        { x: 'subway', y: 350 },
        { x: 'bus', y: 310 },
        { x: 'car', y: 200 },
        { x: 'moto', y: 100 },
        { x: 'bicycle', y: 50 },
        { x: 'horse', y: 40 },
        { x: 'skateboard', y: 20 },
        { x: 'others', y: 10 },
      ],
    },
    {
      id: 'france',
      color: 'hsl(162, 70%, 50%)',
      data: [
        { x: 'plane', y: 30 },
        { x: 'helicopter', y: 50 },
        { x: 'boat', y: 60 },
        { x: 'train', y: 70 },
        { x: 'subway', y: 90 },
        { x: 'bus', y: 100 },
        { x: 'car', y: 120 },
        { x: 'moto', y: 170 },
        { x: 'bicycle', y: 150 },
        { x: 'horse', y: 100 },
        { x: 'skateboard', y: 80 },
        { x: 'others', y: 60 },
      ],
    },
  ];

  return (
    <div className='h-[450px] w-full bg-[#F3F1EE]'>
      <div>.</div>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'transportation',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'count',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        colors={{ scheme: 'nivo' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default MyLineChart;
