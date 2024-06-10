import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchInfo.css';

const SearchInfo = ({ infoData }) => {
    // infoData 객체가 변경될 때마다 콘솔에 출력
    useEffect(() => {
        console.log('SearchInfo로 들어온 infoData:', infoData);
    }, [infoData]);

    // infoData 객체에서 필요한 데이터를 추출
    const data = infoData || {};

    return (
        <div className="search-info">
            <div className="search-row">
                <div className='search-area'>
                    <div className='search-result'>
                        <span>인장강도</span>
                        <div className='search-figure'>
                            <span>{data.tensileStrength || 'N/A'}</span>
                            <span>MPa</span>
                        </div>
                    </div>
                    <div className='search-result'>
                        <span>항복강도</span>
                        <div className='search-figure'>
                            <span>{data.yieldStrength || 'N/A'}</span>
                            <span>MPa</span>
                        </div>
                    </div>
                    <div className='search-result'>
                        <span>경도</span>
                        <div className='search-figure'>
                            <span>{data.hardness || 'N/A'}</span>
                            <span>Hv</span>
                        </div>
                    </div>
                    <div className='search-result'>
                        <span>연신율</span>
                        <div className='search-figure'>
                            <span>{data.elongation || 'N/A'}</span>
                            <span>%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchInfo;
