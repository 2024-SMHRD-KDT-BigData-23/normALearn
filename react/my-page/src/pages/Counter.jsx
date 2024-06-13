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
    const [stateValues, setStateValues] = useState({
        tensileStrengthResult: '',
        yieldStrengthResult: '',
        elongationResult: '',
        hardnessResult: '',
        firstTemperature: '',
        firstTime: '',
        cooling: '',
        secondTemperature: '',
        secondTime: '',
        agingTemperature: '',
        agingTime: '',
        al: '',
        si: '',
        cu: '',
        sc: '',
        fe: '',
        mn: '',
        mg: '',
        zr: '',
        sm: '',
        zn: '',
        ti: '',
        sr: '',
        ni: '',
        ce: ''
    });

    const keysToShow = [
        { key: 'tensileStrengthResult', name: '인장강도' },
        { key: 'yieldStrengthResult', name: '항복강도' },
        { key: 'elongationResult', name: '연신율' },
        { key: 'hardnessResult', name: '경도' },
        { key: 'firstTemperature', name: '1차 용체화온도' },
        { key: 'firstTime', name: '1차 용체화 시간' },
        { key: 'cooling', name: '냉각' },
        { key: 'secondTemperature', name: '2차 용체화온도' },
        { key: 'secondTime', name: '2차 용체화 시간' },
        { key: 'agingTemperature', name: '시효온도' },
        { key: 'agingTime', name: '시효시간' }
    ];

    const keys = [
        { key: 'al', name: 'Al' },
        { key: 'si', name: 'Si' },
        { key: 'cu', name: 'Cu' },
        { key: 'sc', name: 'Sc' },
        { key: 'fe', name: 'Fe' },
        { key: 'mn', name: 'Mn' },
        { key: 'mg', name: 'Mg' },
        { key: 'zr', name: 'Zr' },
        { key: 'sm', name: 'Sm' },
        { key: 'zn', name: 'Zn' },
        { key: 'ti', name: 'Ti' },
        { key: 'sr', name: 'Sr' },
        { key: 'ni', name: 'Ni' },
        { key: 'ce', name: 'Ce' }
    ];

    const handleModeling = async () => {
        console.log('전송할 데이터:', JSON.stringify(stateValues, null, 2));

        try {
            const response = await fetch('http://127.0.0.1:5002/upflask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(stateValues),
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
            setStateValues({ ...stateValues, ...newValues });
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
                    const { key, name } = keyItem;
                    cells.push(
                        <td key={index}>
                            <div className="align-middle">
                                <label htmlFor={key}>{name}</label>
                                <div className="table-value" value={selectedValues[key] || ''}>
                                    {selectedValues[key] || '-'}
                                </div>
                                <input
                                    type="text"
                                    name={key}
                                    className="table-text-group"
                                    placeholder={selectedValues[key]}
                                    value={stateValues[key] || ''}
                                    onChange={({ target: { value } }) => {
                                        setStateValues(prev => ({ ...prev, [key]: value }));
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
                        <button type="submit" className="btn btn-primary" onClick={handleModeling}>확인</button>
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
                return <div>모델 백업 기능 준비 중입니다.</div>;
            default:
                return <div>Invalid view</div>;
        }
    };

    return (
        <div className="counter-wrap">
            <div className="counter-area">
                <h1>모델 설정 페이지</h1>
                <div className="counter-group">
                    <button onClick={() => setView('techInput')} className="btn btn-primary">공법 입력</button>
                    <button onClick={() => setView('modelBackup')} className="btn btn-primary">모델 백업</button>
                </div>
                {renderContent()}
            </div>
        </div>
    );
};

export default Modelling;
