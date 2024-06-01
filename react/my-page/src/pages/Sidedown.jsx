import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable';

const Sidedown = () => {
    const [data, setData] = useState([]);
    const [fixedList, setFixedList] = useState([]); // 선택된 항목 상태 변수

    // 데이터 가져오기 함수
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/NomAlearn/getResult'); // 백엔드 API 주소
            const result = await response.json();
            setData(result); // 데이터를 상태 변수에 저장
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // 컴포넌트가 마운트될 때 데이터 가져오기
    useEffect(() => {
        fetchData();
    }, []);

    // jQuery UI sortable 기능 활성화
    useEffect(() => {
        $("#checked-sortable").sortable();
    }, [fixedList]);

    // 체크박스 선택 변경 핸들러
    const handleCheckboxChange = (item) => {
        let checkList;
        if (fixedList.includes(item)) {
            checkList = fixedList.filter(i => i !== item);
            console.log("체크아웃:", item); // 체크 해제된 항목 콘솔에 출력
        } else {
            checkList = [...fixedList, item];
            console.log("체크인:", item); // 체크된 항목 콘솔에 출력
        }
        setFixedList(checkList);
    };

    // 체크된 항목과 체크되지 않은 항목을 분리
    const checkedData = data.filter(item => fixedList.includes(item));
    const uncheckedData = data.filter(item => !fixedList.includes(item));

    return {
        data,
        fixedList,
        checkedData,
        uncheckedData,
        handleCheckboxChange
    };
};

export default Sidedown;
