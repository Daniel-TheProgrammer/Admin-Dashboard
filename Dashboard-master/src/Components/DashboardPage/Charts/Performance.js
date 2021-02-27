import React from 'react';
import '../../../Containers/DashboardPage/DashboardPage.css';

import { HorizontalBar } from 'react-chartjs-2';

class Perform extends React.Component {

  state = {
    performanceData: {},
    data: {
        labels: [],
        datasets: 
            [
                {
                    label: "# of Hits",
                    data: [],
                    borderWidth: 0,
                    backgroundColor: [],
                    barPercentage: 0.2

                }

            ]
      }
  }

  getChartData = () => {

    const getCharts = JSON.parse(localStorage[('myBackEndData')]).dasbhoardPage.performance;

    const dependentData = Object.values(getCharts);
    const mainLabels = Object.getOwnPropertyNames(getCharts);
    const tempData = this.state.data;

    tempData.labels = [...mainLabels];
    tempData.datasets[0].data = [...dependentData];
    tempData.datasets[0].backgroundColor = [
        '#4ed6b8', '#3889fc', '#a8d582', '#db9c3f', '#9665c5', '#e95f50', '#cbcd69'
    ];

    return tempData;
  }

  render() {

    return (
        <div className="performance">
            <div>
                <h2>Performance</h2>
                <HorizontalBar 
                    options={{
                        responsive: true,
                        legend: {
                            labels: {
                                fontColor: "white",
                            }
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    fontColor: "white",
                                    beginAtZero: false

                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Hits',
                                    fontColor: "white",
                                }

                            }],
                            xAxes: [{
                                ticks: {
                                    fontColor: "white",
                                    stepSize: 10,
                                    min: 20,
                                    max: 60
                            }
                        }]},
                        elements: {
                            point:{
                                radius: 0
                            }
                        }
                    }}
                    data={this.getChartData}
                />
            </div>
        </div>
    );
  }
}

export default Perform;
