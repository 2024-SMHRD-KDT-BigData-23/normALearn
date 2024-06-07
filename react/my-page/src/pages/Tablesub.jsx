import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable';

const Tablesub = ({ setData }) => {
    // 데이터 가져오기 함수
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/NomAlearn/getListOutput'); // 백엔드 API 주소
            const result = await response.json();
            setData(result);
            console.log('시각화 리스트데이터:', result); // 콘솔에 데이터 출력
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // 컴포넌트가 마운트될 때 데이터 가져오기
    useEffect(() => {
        fetchData();
    }, []);

    return null; // 이 컴포넌트는 데이터를 가져오는 역할만 하므로 렌더링하지 않습니다.
};

export default Tablesub;
