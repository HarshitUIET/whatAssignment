
import { ArcElement, Chart } from 'chart.js';
Chart.register(ArcElement);

import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const HollowCircleChart = ({ score }) => {
  const maxScore = 15;
  const completedPercentage = (score / maxScore) * 100;
  const remainingPercentage = 100 - completedPercentage;

  const data = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        data: [completedPercentage, remainingPercentage],
        backgroundColor: ['#00aaff', '#f3f3f3'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="h-[140px] w-[140px] relative">
      <Doughnut data={data} options={{ cutout: '80%' }} />
      <div className='absolute bottom-8 left-14'>
        <img src="target.png" height={30} width={30} alt="Target" className="center-image" />
      </div>
    </div>
  );
};

export default HollowCircleChart;
