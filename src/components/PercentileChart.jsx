import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';

// Register the annotation plugin
Chart.register(annotationPlugin);

const LineChart = ({ percentile }) => {
    const xValue = percentile < 0 ? 0 : percentile > 100 ? 100 : percentile;

    const data = {
        labels: [0, 25, 50, 75, 100],
        datasets: [
            {
                label: 'Percentile Trend',
                data: [10, 30, 20, 40, 30], 
                borderColor: 'blue',
                backgroundColor: 'transparent',
                borderWidth: 2,
                pointRadius: 0,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            },
            annotation: {
                annotations: {
                    verticalLine: {
                        type: 'line',
                        xMin: xValue,
                        xMax: xValue,
                        borderColor: 'red',
                        borderWidth: 2,
                        label: {
                            content: 'Percentile',
                            enabled: true,
                            position: 'top'
                        }
                    },
                    circlePoint: {
                        type: 'point',
                        xValue: xValue,
                        radius: 5, 
                        backgroundColor: 'green',
                        borderColor: 'black',
                        borderWidth: 2
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false 
                },
                ticks: {
                    stepSize: 25
                }
            },
            y: {
                display: false 
            }
        }
    };

    return (
        <div>
            <Line data={data} options={options} />
        </div>
    );
};

export default LineChart;
