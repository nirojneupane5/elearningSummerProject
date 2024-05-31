import React from 'react';
import { Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title, Tooltip,Legend,} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const StudentBar=({studentDetails})=>{
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'EdTech solutions',
          },
        },
      };
    
      const labels = ['Students'];
      const data = {
        labels,
        datasets: [
          {
            label: 'Paid student',
            data: [studentDetails.paidStudent],
            backgroundColor: '#713ABE',
          },
          {
            label: 'Upaid Student',
            data: [studentDetails.unpaidStudent],
            backgroundColor: '#C70039',
          },
        ],
      };
      return(
        <Bar options={options} data={data} />
      )
  }
export default StudentBar;