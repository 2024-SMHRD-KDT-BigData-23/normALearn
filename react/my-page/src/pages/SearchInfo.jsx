import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchInfo.css';

const SearchInfo = ({ start }) => {
    // 체크박스 상태를 관리하기 위한 useState 훅
    const [isChecked, setIsChecked] = useState(false);

    // start 객체가 변경될 때마다 콘솔에 데이터를 출력하는 useEffect 훅
    useEffect(() => {
        console.log('info로 들어온 start:', start);
    }, [start]);

    // 체크박스를 클릭했을 때 서버로 데이터를 전송하는 함수
    const sendDataToServer = async () => {
        // 체크박스의 새로운 상태 설정
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);

        // 새로운 체크박스 상태가 true일 때 서버로 데이터 전송
        if (newCheckedState) {
            // start 배열에서 첫 번째 데이터를 가져옴
            const infoData = start.length > 0 ? start[0] : {};

            try {
                // fetch를 사용하여 서버로 POST 요청을 보냄
                const response = await fetch('http://localhost:8080/NomAlearn/sendSearchData', {
                    method: 'POST', // HTTP 메서드 POST 사용
                    headers: {
                        'Content-Type': 'application/json' // 요청의 Content-Type을 JSON으로 설정
                    },
                    body: JSON.stringify(infoData) // infoData 객체를 JSON 문자열로 변환하여 전송
                });

                // 요청이 성공하지 않으면 에러를 발생시킴
                if (!response.ok) {
                    throw new Error(`Failed to send data: ${response.statusText}`);
                }

                // 서버 응답을 JSON으로 파싱하여 결과를 콘솔에 출력
                const result = await response.json();
                console.log('서버 응답:', result);
            } catch (error) {
                // 요청 중 오류가 발생하면 콘솔에 오류 메시지 출력
                console.error('서버로 데이터 전송 중 오류 발생:', error);
            }
        }
    };

    // start 배열에서 첫 번째 데이터를 가져옴
    const infoData = start.length > 0 ? start[0] : {};

    return (
        <div className="search-info">
            <div className="search-row">
                <div className='search-area'>
                    {/* 인장강도 정보를 표시 */}
                    <div className='serch-result'>
                        <span>인장강도</span>
                        <div className='search-figure'>
                            <span>{infoData.tensileStrengthResult || 'N/A'}</span>
                            <span>MPa</span>
                        </div>
                    </div>
                    {/* 항복강도 정보를 표시 */}
                    <div className='serch-result'>
                        <span>항복강도</span>
                        <div className='search-figure'>
                            <span>{infoData.yieldStrengthResult || 'N/A'}</span>
                            <span>MPa</span>
                        </div>
                    </div>
                    {/* 경도 정보를 표시 */}
                    <div className='serch-result'>
                        <span>경도</span>
                        <div className='search-figure'>
                            <span>{infoData.hardnessResult || 'N/A'}</span>
                            <span>Hv</span>
                        </div>
                    </div>
                    {/* 연신율 정보를 표시 */}
                    <div className='serch-result'>
                        <span>연신율</span>
                        <div className='search-figure'>
                            <span>{infoData.elongationResult || 'N/A'}</span>
                            <span>%</span>
                        </div>
                    </div>
                    {/* 체크박스를 사용하여 서버로 데이터를 전송 */}
                    <div className='search-checkbox'>
                        <label>
                            <input
                                type="checkbox"
                                checked={isChecked} // 체크박스의 현재 상태를 반영
                                onChange={sendDataToServer} // 체크박스 상태 변경 시 sendDataToServer 호출
                            />
                            북마크 (서버로 데이터 전송)
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchInfo;
