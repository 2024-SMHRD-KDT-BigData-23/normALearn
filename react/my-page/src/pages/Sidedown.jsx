import { useState, useEffect } from 'react';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable';
import { useCookies } from 'react-cookie';
import './Sidedown.css';

// 리스트 아이템 컴포넌트
const ListItem = ({ item, handleCheckboxChange }) => (
    <ul className="darkerli" data-nickname={item.nickname}>
        <li className="search-change">
            <a href="#" className="list-item">
                <i className="fa fa-circle-o"></i>
                <span className="nav-text">
                    {
                        ['tensileStrengthResult', 'yieldStrengthResult', 'hardnessResult', 'elongationResult']
                            .map(key => item[key])
                            .join(' - ')
                    }
                </span>
                <input
                    type="checkbox"
                    name="item"
                    value={item.nickname}
                    checked={item.favorite === 'Y'}
                    onChange={() => handleCheckboxChange(item)}
                    className="checkbox"
                />
            </a>
        </li>
    </ul>
);

// 리스트 렌더링 컴포넌트
export const RenderList = ({ data, handleCheckboxChange }) => (
    <ul id="checked-sortable">
        {data.map((item, index) => (
            <ListItem
                key={index}
                item={item}
                handleCheckboxChange={handleCheckboxChange}
            />
        ))}
    </ul>
);

// Sidedown 컴포넌트
const Sidedown = () => {
    const [data, setData] = useState([]);
    const [fixedList, setFixedList] = useState([]); // 선택된 항목 상태 변수
    const [cookie] = useCookies(['userId']);
    const userId = cookie.userId;
    console.log('보내기전유저아이디',userId)
    // 데이터 가져오기 함수
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/NomAlearn/getListResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId
                    // 필요한 요청 데이터를 여기에 추가하세요.
                })
            });
            
            const result = await response.json();
            console.log('리절트리스트',result);
            setData(result); // 데이터를 상태 변수에 저장
            const initiallyFixed = result.filter(item => item.favorite === 'Y').map(item => item.outputIdx);
            setFixedList(initiallyFixed); // 초기 고정된 항목 설정
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // 공통으로 사용하는 fetch 요청 처리 함수
    const postData = async (url, data) => {
        try {
            const response = await fetch(url, {
                method: 'POST', // 데이터를 포함하여 전송하기 위해 POST 사용
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) // 데이터를 JSON 형태로 전송
            });
            if (!response.ok) {
                throw new Error(`Failed to submit data to ${url}`);
            }
            console.log(`Data submitted successfully to ${url}`);
        } catch (error) {
            console.error(`Error submitting data to ${url}:`, error);
        }
    };

    // 컴포넌트가 마운트될 때 데이터 가져오기
    useEffect(() => {
        fetchData();
    }, []);

    

    // 체크박스 선택 변경 핸들러
    const handleCheckboxChange = (item) => {
        let checkList;
        let action;
        let updatedItem = { ...item }; // 항목의 복사본 생성
        console.log('아이템 outputIdx',item.outputIdx)
        if (fixedList.includes(item.outputIdx)) {
            checkList = fixedList.filter(i => i !== item.outputIdx);
            action = 'checkout';
            updatedItem.favorite = 'N'; // favorite 필드를 N으로 변경
            updatedItem.work = 'ChangeCheckBox';
            console.log("체크아웃:", updatedItem); // 체크 해제된 항목 콘솔에 출력
            console.log(`체크아웃 항목: ${JSON.stringify(updatedItem)}, 상태: 체크 해제됨`); // 상세 내용 출력
        } else {
            checkList = [...fixedList, item.outputIdx];
            action = 'checkin';
            updatedItem.favorite = 'Y'; // favorite 필드를 Y으로 변경
            updatedItem.work = 'ChangeCheckBox';
            console.log("체크인:", updatedItem); // 체크된 항목 콘솔에 출력
            console.log(`체크인 항목: ${JSON.stringify(updatedItem)}, 상태: 체크됨`); // 상세 내용 출력
        }
        setFixedList(checkList);
 
        // 업데이트된 항목을 데이터 리스트에 반영
        setData(data.map(d => (d.resultIdx === item.resultIdx ? updatedItem : d)));
        updatedItem.outputIdx = item.outputIdx
        
        // 체크 상태를 서버로 전송
        postData(`http://localhost:8080/NomAlearn/sendListResult`, updatedItem);
    };

    // 체크된 항목과 체크되지 않은 항목을 분리하여 고정된 항목이 상단에 나오도록 정렬
    const orderedData = [...data.filter(item => fixedList.includes(item.outputIdx)), ...data.filter(item => !fixedList.includes(item.outputIdx))];

    return {
        orderedData,
        fixedList,
        handleCheckboxChange
    };
};

export default Sidedown;