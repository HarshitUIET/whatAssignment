import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; 
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(annotationPlugin);

const LineChart = ({ percentile }) => {

  const labels = [0, 25, 50, 75, 100];
  const dataPoints = [10, 30, 20, 40, 30];

  
  const xValue = percentile < 0 ? 0 : percentile > 100 ? 100 : percentile;

  
  const mappedXValue = (xValue / 100) * (labels.length - 1);

  const interpolateYValue = (xValue) => {
    const index = labels.findIndex(label => label >= xValue);
    if (index === 0) return dataPoints[0];
    if (index === -1) return dataPoints[dataPoints.length - 1];

    const x0 = labels[index - 1];
    const x1 = labels[index];
    const y0 = dataPoints[index - 1];
    const y1 = dataPoints[index];

    const slope = (y1 - y0) / (x1 - x0);
    const yValue = y0 + slope * (xValue - x0);

    return yValue;
  };

  const yValue = interpolateYValue(xValue);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Percentile Trend',
        data: dataPoints,
        borderColor: 'blue',
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 0,
        tension : 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      annotation: {
        annotations: {
          verticalLine: {
            type: 'line',
            xMin: mappedXValue,
            xMax: mappedXValue,
            yMin: 0, 
            yMax: yValue + 20, 
            borderColor: 'red',
            borderWidth: 2,
            label: {
              content: 'Percentile',
              enabled: true,
              position: 'top',
            },
          },
          percentilePoint: {
            type: 'point',
            xValue: mappedXValue,
            yValue: yValue, 
            radius: 5,
            backgroundColor: 'green',
            borderColor: 'black',
            borderWidth: 2,
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, 
        },
        ticks: {
          stepSize: 25,
        },
      },
      y: {
        display: false, 
      },
    },
  };
  

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
