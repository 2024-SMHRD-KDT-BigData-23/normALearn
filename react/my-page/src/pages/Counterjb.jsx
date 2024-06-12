import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Counter.css';
import '../fonts.css';

const Modelling = ({ moll }) => {
    const [view, setView] = useState('techInput');
    const [localMoll, setLocalMoll] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedValues, setSelectedValues] = useState({});

    useEffect(() => {
        const filteredMoll = moll.filter(item => item.myPage === 'Y');
        setLocalMoll(filteredMoll);
    }, [moll]);

// 상태 변수 선언
const [tensileStrengthResult, setTensileStrengthResult] = useState('');
const [yieldStrengthResult, setYieldStrengthResult] = useState('');
const [elongationResult, setElongationResult] = useState('');
const [hardnessResult, setHardnessResult] = useState('');
const [firstTemperature, setFirstTemperature] = useState('');
const [firstTime, setFirstTime] = useState('');
const [cooling, setCooling] = useState('');
const [secondTemperature, setSecondTemperature] = useState('');
const [secondTime, setSecondTime] = useState('');
const [agingTemperature, setAgingTemperature] = useState('');
const [agingTime, setAgingTime] = useState('');
const [al, setAl] = useState('');
const [si, setSi] = useState('');
const [cu, setCu] = useState('');
const [sc, setSc] = useState('');
const [fe, setFe] = useState('');
const [mn, setMn] = useState('');
const [mg, setMg] = useState('');
const [zr, setZr] = useState('');
const [sm, setSm] = useState('');
const [zn, setZn] = useState('');
const [ti, setTi] = useState('');
const [sr, setSr] = useState('');
const [ni, setNi] = useState('');
const [ce, setCe] = useState('');

const keysToShow = [
    { key: 'tensileStrengthResult', name: '인장강도', state: tensileStrengthResult, setState: setTensileStrengthResult },
    { key: 'yieldStrengthResult', name: '항복강도', state: yieldStrengthResult, setState: setYieldStrengthResult },
    { key: 'elongationResult', name: '연신율', state: elongationResult, setState: setElongationResult },
    { key: 'hardnessResult', name: '경도', state: hardnessResult, setState: setHardnessResult },
    { key: 'firstTemperature', name: '1차 용체화온도', state: firstTemperature, setState: setFirstTemperature },
    { key: 'firstTime', name: '1차 용체화 시간', state: firstTime, setState: setFirstTime },
    { key: 'cooling', name: '냉각', state: cooling, setState: setCooling },
    { key: 'secondTemperature', name: '2차 용체화온도', state: secondTemperature, setState: setSecondTemperature },
    { key: 'secondTime', name: '2차 용체화 시간', state: secondTime, setState: setSecondTime },
    { key: 'agingTemperature', name: '시효온도', state: agingTemperature, setState: setAgingTemperature },
    { key: 'agingTime', name: '시효시간', state: agingTime, setState: setAgingTime }
];

const keys = [
    { key: 'al', name: 'Al', state: al, setState: setAl },
    { key: 'si', name: 'Si', state: si, setState: setSi },
    { key: 'cu', name: 'Cu', state: cu, setState: setCu },
    { key: 'sc', name: 'Sc', state: sc, setState: setSc },
    { key: 'fe', name: 'Fe', state: fe, setState: setFe },
    { key: 'mn', name: 'Mn', state: mn, setState: setMn },
    { key: 'mg', name: 'Mg', state: mg, setState: setMg },
    { key: 'zr', name: 'Zr', state: zr, setState: setZr },
    { key: 'sm', name: 'Sm', state: sm, setState: setSm },
    { key: 'zn', name: 'Zn', state: zn, setState: setZn },
    { key: 'ti', name: 'Ti', state: ti, setState: setTi },
    { key: 'sr', name: 'Sr', state: sr, setState: setSr },
    { key: 'ni', name: 'Ni', state: ni, setState: setNi },
    { key: 'ce', name: 'Ce', state: ce, setState: setCe }
];

const handleModeling = async () => {
    const modelingData = {
        tensileStrengthResult,
        yieldStrengthResult,
        elongationResult,
        hardnessResult,
        firstTemperature,
        firstTime,
        cooling,
        secondTemperature,
        secondTime,
        agingTemperature,
        agingTime,
        al,
        si,
        cu,
        sc,
        fe,
        mn,
        mg,
        zr,
        sm,
        zn,
        ti,
        sr,
        ni,
        ce
    };

    console.log('전송할 데이터:', JSON.stringify(modelingData, null, 2));


    try {
        const response = await fetch('http://127.0.0.1:5002/upflask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(modelingData),
        });

        const results = await response.json();
        console.log('spring에서 보낸:ModelingResult데이터', results);

    } catch (error) {
        console.error('Error fetching modeling results:', error);
    }
};

    const handleOptionChange = (e) => {
        const selectedIdx = parseInt(e.target.value);
        const selectedItem = localMoll.find(item => item.outputIdx === selectedIdx);

        if (selectedItem) {
            const newValues = {};
            [...keysToShow, ...keys].forEach(({ key }) => {
                newValues[key] = selectedItem[key];
            });
            setSelectedValues(newValues);
        }
        setSelectedOption(selectedIdx);
    };
    const renderTable = () => {
        const rows = [];
    
        for (let i = 0; i < 5; i++) {
            const cells = [];
            for (let j = 0; j < 5; j++) {
                const index = i * 5 + j;
                let keyItem;
                if (index < keysToShow.length) {
                    keyItem = keysToShow[index];
                } else if (index - keysToShow.length < keys.length) {
                    keyItem = keys[index - keysToShow.length];
                }
                if (keyItem) {
                    const { key, name, state } = keyItem;
                    cells.push(
                        <td key={index}>
                            <div className="align-middle">
                                <label htmlFor={key}>{name}</label>
                                <div className="table-value" value={selectedValues[key] || ''}>{selectedValues[key] || 'N/A'}</div>
                                <input
                                    type="text"
                                    name={key}
                                    className="table-text-group"
                                    placeholder={selectedValues[key]}
                                    value={state} // 이 부분을 수정하여 해당 state를 입력 값으로 설정합니다.
                                    onChange={(e) => {
                                        const newValue = e.target.value;
                                        setSelectedValues(prevValues => ({
                                            ...prevValues,
                                            [key]: newValue
                                        }));
                                        // 해당 state를 업데이트합니다.
                                        const setStateFunc = keysToShow.find(item => item.key === key)?.setState || keys.find(item => item.key === key)?.setState;
                                        if (setStateFunc) setStateFunc(newValue);
                                    }}
                                />
                            </div>
                        </td>
                    );
                } else {
                    cells.push(<td key={index}></td>);
                }
            }
            rows.push(<tr key={i}>{cells}</tr>);
        }
    
        return (
            <div className="container">
                <div className="table-responsive">
                    <table className="table table-bordered text-center">
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                    <div className="table-btn-container">
                        <button type="submit" className="btn btn-select" onClick={handleModeling}>확인</button>
                    </div>
                </div>
            </div>
        );
    };
    
    const renderTechInput = () => {
        return (
            <>
                <form>
                    <div className="option-select">
                        <select id="techSelect" className="form-control" onChange={handleOptionChange} value={selectedOption}>
                            <option value="">공법설정 선택</option>
                            {localMoll.map(item => (
                                <option key={item.outputIdx} value={item.outputIdx}>인장강도 : {item.tensileStrengthResult} 항복강도 : {item.yieldStrengthResult} 경도 : {item.hardnessResult} 연신율 : {item.elongationResult}</option>
                            ))}
                        </select>
                    </div>
                </form>
                {renderTable()}
            </>
        );
    };

    const renderContent = () => {
        switch (view) {
            case 'techInput':
                return renderTechInput();
            case 'modelBackup':
                return <div>모델 백업 기능 준비 중입니다.</div>; // 간단한 내용으로 대체
            default:
                return <div>Invalid view</div>;
        }
    };

    return (
        <div className="counter-wrap">
            <div className="counter-area">
                <h1>모델 설정 페이지</h1>
                <div className="counter-group">
                    <button onClick={() => setView('techInput')} className="btn btn-select">공법 입력</button>
                    <button onClick={() => setView('modelBackup')} className="btn btn-select">모델 백업</button>
                </div>
                {renderContent()}
            </div>
        </div>
    );
};
export default Modelling;
