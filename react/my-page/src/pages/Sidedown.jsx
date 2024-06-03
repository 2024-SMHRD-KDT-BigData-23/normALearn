import { useState, useEffect } from 'react';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable';

// 리스트 아이템 컴포넌트
const ListItem = ({ item, fixedList, handleCheckboxChange }) => (
    <li className="darkerli" data-nickname={item.nickname}>
        <a href="#">
            <i className="fa fa-rocket fa-lg"></i>
            <span className="nav-text">
                <input
                    type="checkbox"
                    name="item"
                    value={item.nickname}
                    checked={fixedList.includes(item.nickname)}
                    onChange={() => handleCheckboxChange(item)}
                />
                {`${item.nickname}`} - {Object.values(item).map((value, i) => (i === 4 ? (fixedList.includes(item.nickname) ? "Y" : "N") : value)).filter((_, i) => i !== 3).join(' - ')}
            </span>
        </a>
    </li>
);

// 리스트 렌더링 컴포넌트
export const RenderList = ({ data, fixedList, handleCheckboxChange }) => (
    <ul id="checked-sortable">
        {data.map((item, index) => (
            <ListItem
                key={index}
                item={item}
                fixedList={fixedList}
                handleCheckboxChange={handleCheckboxChange}
            />
        ))}
    </ul>
);

// Sidedown 컴포넌트
const Sidedown = () => {
    const [data, setData] = useState([]);
    const [fixedList, setFixedList] = useState([]); // 선택된 항목 상태 변수

    // 데이터 가져오기 함수
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/NomAlearn/getListResult'); // 백엔드 API 주소
            const result = await response.json();
            setData(result); // 데이터를 상태 변수에 저장
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

    // jQuery UI sortable 기능 활성화 및 순서 변경 이벤트 핸들러
    useEffect(() => {
        $("#checked-sortable").sortable({
            items: "li:has(input:checked)", // 체크된 항목만 드래그 앤 드롭 가능
            update: function () {
                const newOrder = $("#checked-sortable").sortable('toArray', { attribute: 'data-nickname' });
                handleOrderChange(newOrder);
            }
        });
    }, [fixedList]);

    // 체크박스 선택 변경 핸들러
    const handleCheckboxChange = (item) => {
        let checkList;
        let action;
        let updatedItem = { ...item }; // 항목의 복사본 생성

        if (fixedList.includes(item.nickname)) {
            checkList = fixedList.filter(i => i !== item.nickname);
            action = 'checkout';
            updatedItem.favorite = 'N'; // favorite 필드를 N으로 변경
            updatedItem.work = 'null'
            console.log("체크아웃:", updatedItem); // 체크 해제된 항목 콘솔에 출력
            console.log(`체크아웃 항목: ${JSON.stringify(updatedItem)}, 상태: 체크 해제됨`); // 상세 내용 출력
        } else {
            checkList = [...fixedList, item.nickname];
            action = 'checkin';
            updatedItem.favorite = 'Y'; // favorite 필드를 Y으로 변경
            updatedItem.work = 'ChangeCheckBox'
            console.log("체크인:", updatedItem); // 체크된 항목 콘솔에 출력
            console.log(`체크인 항목: ${JSON.stringify(updatedItem)}, 상태: 체크됨`); // 상세 내용 출력
        }
        setFixedList(checkList);

        // 체크 상태를 서버로 전송
        postData(`http://localhost:8080/NomAlearn/sendListResult`, updatedItem);
    };

    // 순서 변경을 서버로 전송하는 함수
    const handleOrderChange = (newOrder) => {
        const orderedItems = newOrder.map(nickname => data.find(item => item.nickname === nickname));
        postData(`http://localhost:8080/NomAlearn/submitOrder`, orderedItems);
    };

    // 체크된 항목과 체크되지 않은 항목을 분리하여 고정된 항목이 상단에 나오도록 정렬
    const orderedData = [...data.filter(item => fixedList.includes(item.nickname)), ...data.filter(item => !fixedList.includes(item.nickname))];

    return {
        orderedData,
        fixedList,
        handleCheckboxChange
    };
};

export default Sidedown;
