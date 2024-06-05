import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Chart.css';
import DoughnutChart from './Chartsup';

const Chart = () => {
    return (
        <div className="chart-wrap">
            <div className="chart-row">
                <div className='chart-area'>
                    <div className='chart-result'>
                        <DoughnutChart />
                    </div>
                    <div className='chart-result'>
                        차트박스2
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chart;
