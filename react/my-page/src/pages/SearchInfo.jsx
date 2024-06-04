import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchInfo.css';

const SearchInfo = () => {
    return (
        <div className="search-info">
            <div className="search-row">
                <div className='search-area'>
                    <div className='serch-result'>
                        <span>인장강도</span>
                        <div className='search-figure'>
                        <span>13.2</span>
                        <span>MPa</span>
                        </div>
                    </div>
                    <div className='serch-result'>
                        <span>항복강도</span>
                        <div className='search-figure'>
                        <span>14.3</span>
                        <span>MPa</span>
                        </div>
                    </div>
                    <div className='serch-result'>
                        <span>경도</span>
                        <div className='search-figure'>
                        <span>123</span>
                        <span>Hv</span>
                        </div>
                    </div>
                    <div className='serch-result'>
                        <span>연신율</span>
                        <div className='search-figure'>
                        <span>456</span>
                        <span>%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchInfo;
