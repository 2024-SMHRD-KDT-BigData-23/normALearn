import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchInfo.css';

const SearchInfo = ({ infoData }) => {
    // infoData 객체가 변경될 때마다 콘솔에 출력
    useEffect(() => {
        console.log('info로 들어온 infoData:', infoData);
    }, [infoData]);

    // infoData 객체에서 필요한 데이터를 추출합니다.
    // infoData 객체가 존재할 경우 해당 데이터를 사용하고, 그렇지 않을 경우 기본값을 표시
    return (
        <div className="search-info">
            <div className="search-row">
                <div className='search-area'>
                    <div className='serch-result'>
                        <span>인장강도</span>
                        <div className='search-figure'>
                            <span>{infoData?.tensileStrength || 'N/A'}</span>
                            <span>MPa</span>
                        </div>
                    </div>
                    <div className='serch-result'>
                        <span>항복강도</span>
                        <div className='search-figure'>
                            <span>{infoData?.yieldStrength || 'N/A'}</span>
                            <span>MPa</span>
                        </div>
                    </div>
                    <div className='serch-result'>
                        <span>경도</span>
                        <div className='search-figure'>
                            <span>{infoData?.hardness || 'N/A'}</span>
                            <span>Hv</span>
                        </div>
                    </div>
                    <div className='serch-result'>
                        <span>연신율</span>
                        <div className='search-figure'>
                            <span>{infoData?.elongation || 'N/A'}</span>
                            <span>%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchInfo;
