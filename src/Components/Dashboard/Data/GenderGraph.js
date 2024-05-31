import React from 'react'
import {Chart as ChartJS,ArcElement,Tooltip,Legend} from 'chart.js'
import { Pie } from 'react-chartjs-2';
ChartJS.register(
    ArcElement,Tooltip,Legend
);
 const GenderGraph = ({genderCounts}) => {
    if (!genderCounts || typeof genderCounts !== 'object') {
        console.log('Gender counts data is not available.');
        return (
          <div>
            <p>No gender data available.</p>
          </div>
        );
      }
    const chartData = {
        labels: ['Male', 'Female', 'Others'],
        datasets: [
          {
            data: [genderCounts.male,genderCounts.female,genderCounts.others],
            backgroundColor: ['blue', 'pink', 'gray'],
          },
        ],
      };
  return (
    <>
     <div style={{padding:'20px'}}>
      <h3>All Student gender</h3>
     <Pie data={chartData} />
     </div>
    </>
  )
}
export default GenderGraph;
