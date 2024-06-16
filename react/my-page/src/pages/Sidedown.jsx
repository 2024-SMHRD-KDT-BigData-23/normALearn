import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable';
import { useCookies } from 'react-cookie';
import './Sidedown.css';

const ListItem = ({ item, handleCheckboxChange, handleClick }) => (
    <ul className="darkerli" data-nickname={item.nickname}>
        <li className="search-change">
            <a href="#" className="list-item" onClick={() => handleClick(item)}>
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

const RenderList = ({ data, handleCheckboxChange, handleClick }) => (
    <ul id="checked-sortable">
        {data.map((item, index) => (
            <ListItem
                key={index}
                item={item}
                handleCheckboxChange={handleCheckboxChange}
                handleClick={handleClick}
            />
        ))}
    </ul>
);

const Sidedown = ({ setSelectedItem, setStart, onResults }) => {
    const [data, setData] = useState([]);
    const [fixedList, setFixedList] = useState([]);
    const [cookies] = useCookies(['userId']);
    const userId = cookies.userId;
    console.log('보내기전유저아이디', userId);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/NomAlearn/getListResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId })
            });

            const result = await response.json();
            console.log('리절트리스트', result);
            setData(result);
            const initiallyFixed = result.filter(item => item.favorite === 'Y').map(item => item.outputIdx);
            setFixedList(initiallyFixed);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const postData = async (url, data) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error(`Failed to submit data to ${url}`);
            }
            console.log(`Data submitted successfully to ${url}`);
        } catch (error) {
            console.error(`Error submitting data to ${url}:`, error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCheckboxChange = (item) => {
        let checkList;
        let action;
        let updatedItem = { ...item };
        console.log('아이템 outputIdx', item.outputIdx);
        if (fixedList.includes(item.outputIdx)) {
            checkList = fixedList.filter(i => i !== item.outputIdx);
            action = 'checkout';
            updatedItem.favorite = 'N';
            updatedItem.work = 'ChangeCheckBox';
            console.log("체크아웃:", updatedItem);
            console.log(`체크아웃 항목: ${JSON.stringify(updatedItem)}, 상태: 체크 해제됨`);
        } else {
            checkList = [...fixedList, item.outputIdx];
            action = 'checkin';
            updatedItem.favorite = 'Y';
            updatedItem.work = 'ChangeCheckBox';
            console.log("체크인:", updatedItem);
            console.log(`체크인 항목: ${JSON.stringify(updatedItem)}, 상태: 체크됨`);
        }
        setFixedList(checkList);
        setData(data.map(d => (d.resultIdx === item.resultIdx ? updatedItem : d)));
        updatedItem.outputIdx = item.outputIdx;
        postData(`http://localhost:8080/NomAlearn/sendListResult`, updatedItem);
    };

    const handleClick = async (item) => {
        const ClickData = {
            outputIdx: item.outputIdx,
            userId: userId,
        };
        console.log('Clicked item data:', ClickData);

        try {
            const response = await fetch('http://localhost:8080/NomAlearn/clickListData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ClickData)
            });
            if (!response.ok) {
                throw new Error('클릭했는데 아무것도 못가져옴');
            }
            const clickData = await response.json();
            console.log('클릭해서 받아온 데이터:', clickData);
            setSelectedItem(clickData); // 선택된 항목 설정
            setStart(clickData); // 테이블에 데이터를 전달
            onResults(clickData); // 검색 결과를 전달
        } catch (error) {
            console.error('Error fetching click list data:', error);
        }
    };

    const orderedData = [...data.filter(item => fixedList.includes(item.outputIdx)), ...data.filter(item => !fixedList.includes(item.outputIdx))];

    return (
        <div>
            <RenderList
                data={orderedData}
                handleCheckboxChange={handleCheckboxChange}
                handleClick={handleClick}
            />
        </div>
    );
};

export default Sidedown;
export { RenderList };
