import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchInfo.css';

const SearchInfo = ({ start }) => {
    // start 객체가 변경될 때마다 콘솔에 출력
    useEffect(() => {
        console.log('info로 들어온 start:', start);
    }, [start]);

    // start 객체에서 필요한 데이터를 추출합니다.
    // start 객체가 배열이라는 가정하에, 첫 번째 요소의 데이터를 표시
    const infoData = start.length > 0 ? start[0] : {};

    return (
        <div className="search-info">
            <div className="search-row">
                <div className='search-area'>
                    <div className='serch-result'>
                        <span>인장강도</span>
                        <div className='search-figure'>
                            <span>{infoData.tensileStrengthResult || 'N/A'}</span>
                            <span>MPa</span>
                        </div>
                    </div>
                    <div className='serch-result'>
                        <span>항복강도</span>
                        <div className='search-figure'>
                            <span>{infoData.yieldStrengthResult || 'N/A'}</span>
                            <span>MPa</span>
                        </div>
                    </div>
                    <div className='serch-result'>
                        <span>경도</span>
                        <div className='search-figure'>
                            <span>{infoData.hardnessResult || 'N/A'}</span>
                            <span>Hv</span>
                        </div>
                    </div>
                    <div className='serch-result'>
                        <span>연신율</span>
                        <div className='search-figure'>
                            <span>{infoData.elongationResult || 'N/A'}</span>
                            <span>%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchInfo;
