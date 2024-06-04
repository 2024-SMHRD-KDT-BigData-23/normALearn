import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ChartArea.css';

const ChartArea = () => {
    return (
        <div className="Chart">
            <div className="row">
                <div className='Chart-area'>
                    <div className='Serch-result'>
                        <span>인장강도</span>
                        <div className='figure'>
                        <span>13.2</span>
                        <span>MPa</span>
                        </div>


                        
                    </div>
                    <div className='Serch-result'>
                        <span>항복강도</span>
                        <div className='figure'>
                        <span>14.3</span>
                        <span>MPa</span>
                        </div>
                    </div>
                    <div className='Serch-result'>
                        <span>경도</span>
                        <div className='figure'>
                        <span>123</span>
                        <span>Hv</span>
                        </div>
                    </div>
                    <div className='Serch-result'>
                        <span>연신율</span>
                        <div className='figure'>
                        <span>456</span>
                        <span>%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChartArea;
