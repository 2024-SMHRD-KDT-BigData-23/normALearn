import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Chart.css';
import DoughnutChart from './DoughnutChart';
import BarChart from './BarChart';

const Chart = ({ vsData }) => {
  // 데이터를 수신하고 콘솔에 출력
  console.log('chart.jsx확인:', vsData);

  return (
    <div className="chart-wrap">
      <div className="chart-row">
        <div className='chart-area'>
          <div className='chart-result'>
            <DoughnutChart data={vsData} /> {/* 데이터 전달 */}
          </div>
          <div className='chart-result'>
            <BarChart data={vsData}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart;
