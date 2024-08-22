'use client';
import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import useBigQueryData from '../../../../hooks/useFetchData';

const DailyRevenueD3 = () => {
  const ref = useRef();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const selectedTableIdentifier = useSelector(
    (state) => state.company.selectedTableIdentifier
  );

  const { data, isLoading, error } = useBigQueryData(
    selectedTableIdentifier,
    'dailyRevenue'
  );

  useEffect(() => {
    if (isLoading || error || !data) return;

    // Clear the previous chart
    d3.select(ref.current).selectAll('*').remove();

    // Set up metrics
    const metrics = {
      date: data.map((item) => new Date(item.date.value)),
      actual_spend: data.map((item) => parseFloat(item.actual_spend) || 0),
      actual_new_revenue: data.map(
        (item) => parseFloat(item.actual_new_revenue) || 0
      ),
      actual_total_revenue: data.map(
        (item) => parseFloat(item.actual_total_revenue) || 0
      ),
      target_spend: data.map((item) => parseFloat(item.target_spend) || 0),
      target_new_revenue: data.map(
        (item) => parseFloat(item.target_new_revenue) || 0
      ),
      target_total_revenue: data.map(
        (item) => parseFloat(item.target_total_revenue) || 0
      ),
      running_total_actual_spend: data.map(
        (item) => parseFloat(item.running_total_actual_spend) || 0
      ),
      running_total_actual_new_revenue: data.map(
        (item) => parseFloat(item.running_total_actual_new_revenue) || 0
      ),
      running_total_actual_total_revenue: data.map(
        (item) => parseFloat(item.running_total_actual_total_revenue) || 0
      ),
      running_total_target_total_revenue: data.map(
        (item) => parseFloat(item.running_total_target_total_revenue) || 0
      ),
      running_total_target_new_revenue: data.map(
        (item) => parseFloat(item.running_total_target_new_revenue) || 0
      ),
      delta_running_total_revenue_todate: data.map(
        (item) => parseFloat(item.delta_running_total_revenue_todate) || 0
      ),
    };

    const svg = d3
      .select(ref.current)
      .attr('width', '100%')
      .attr('height', '500')
      .append('g')
      .attr('transform', 'translate(50,50)');

    const width = 900;
    const height = 400;

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(metrics.date))
      .range([0, width]);

    const yScaleRevenue = d3
      .scaleLinear()
      .domain([0, d3.max(metrics.actual_total_revenue)])
      .range([height, 0]);

    const yScaleSpend = d3
      .scaleLinear()
      .domain([0, d3.max(metrics.running_total_actual_spend)])
      .range([height, 0]);

    // Axes
    const xAxis = d3.axisBottom(xScale).ticks(10);
    const yAxisRevenue = d3.axisLeft(yScaleRevenue).ticks(10);
    const yAxisSpend = d3.axisRight(yScaleSpend).ticks(10);

    svg.append('g').attr('transform', `translate(0,${height})`).call(xAxis);

    svg.append('g').call(yAxisRevenue);

    svg
      .append('g')
      .attr('transform', `translate(${width}, 0)`)
      .call(yAxisSpend);

    // Area for actual total revenue
    const area = d3
      .area()
      .x((d, i) => xScale(metrics.date[i]))
      .y0(height)
      .y1((d, i) => yScaleRevenue(metrics.actual_total_revenue[i]))
      .curve(d3.curveMonotoneX);

    svg
      .append('path')
      .datum(metrics.actual_total_revenue)
      .attr('fill', darkMode ? '#49C5B1' : '#49C5B1')
      .attr('fill-opacity', darkMode ? 0.8 : 1.0)
      .attr('d', area);

    // Line for delta running total revenue
    const line = d3
      .line()
      .x((d, i) => xScale(metrics.date[i]))
      .y((d, i) => yScaleRevenue(metrics.delta_running_total_revenue_todate[i]))
      .curve(d3.curveMonotoneX);

    svg
      .append('path')
      .datum(metrics.delta_running_total_revenue_todate)
      .attr('fill', 'none')
      .attr('stroke', darkMode ? '#FFBEF0' : '#FF5C39')
      .attr('stroke-width', 2)
      .attr('d', line);

    // Bars for actual spend
    svg
      .selectAll('.bar')
      .data(metrics.running_total_actual_spend)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => xScale(metrics.date[i]))
      .attr('y', (d, i) => yScaleSpend(metrics.running_total_actual_spend[i]))
      .attr('width', width / metrics.date.length - 2)
      .attr(
        'height',
        (d, i) => height - yScaleSpend(metrics.running_total_actual_spend[i])
      )
      .attr('fill', darkMode ? '#FA8CC8' : '#892951')
      .attr('fill-opacity', darkMode ? 0.55 : 0.55);

    // Add more chart elements here as needed, based on your original Highcharts setup
  }, [data, isLoading, error, darkMode]);

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Error loading data</div>;

  return <svg ref={ref} />;
};

export default DailyRevenueD3;
