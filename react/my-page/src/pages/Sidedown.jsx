import React, { useState, useEffect, useCallback } from 'react';
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

const Sidedown = ({ setSelectedItem, setStart, onResults}) => {
    const [data, setData] = useState([]);
    const [fixedList, setFixedList] = useState([]);
    const [cookies] = useCookies(['userId']);
    const userId = cookies.userId;

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
            setData(result);
            const initiallyFixed = result.filter(item => item.favorite === 'Y').map(item => item.outputIdx);
            setFixedList(initiallyFixed);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // 빈 배열은 컴포넌트가 처음 마운트될 때만 실행됨

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

    const handleCheckboxChange = (item) => {
        let checkList;
        let updatedItem = { ...item };
        if (fixedList.includes(item.outputIdx)) {
            checkList = fixedList.filter(i => i !== item.outputIdx);
            updatedItem.favorite = 'N';
        } else {
            checkList = [...fixedList, item.outputIdx];
            updatedItem.favorite = 'Y';
        }
        updatedItem.work = 'ChangeCheckBox';
        setFixedList(checkList);
        setData(data.map(d => (d.resultIdx === item.resultIdx ? updatedItem : d)));
        postData('http://localhost:8080/NomAlearn/sendListResult', updatedItem);
    };

    const handleClick = useCallback(async (item) => {
        const ClickData = {
            outputIdx: item.outputIdx,
            userId: userId,
        };

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
            setSelectedItem(clickData); // 선택된 항목 설정
            setStart(clickData);
            onResults(clickData);
            
        } catch (error) {
            console.error('Error fetching click list data:', error);
        }
    }, [userId, setSelectedItem, setStart, onResults]);

    const orderedData = [
        ...data.filter(item => fixedList.includes(item.outputIdx)),
        ...data.filter(item => !fixedList.includes(item.outputIdx))
    ];

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
