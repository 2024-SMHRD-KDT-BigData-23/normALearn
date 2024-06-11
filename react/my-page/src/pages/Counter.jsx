import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Counter.css';
import '../fonts.css';

const Modelling = ({ moll }) => {
    // Set initial view to 'techInput'
    const [view, setView] = useState('techInput');
    const [localMoll, setLocalMoll] = useState([]); // 가져온 moll을 저장할 상태
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedValues, setSelectedValues] = useState({});

    useEffect(() => {
        console.log('전체데이터 모델설정페이지:', moll); // moll을 콘솔에 출력
        const filteredMoll = moll.filter(item => item.myPage === 'Y');
        setLocalMoll(filteredMoll); // 가져온 moll 중 myPage가 Y인 것들만 상태에 저장
    }, [moll]);

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
        { key: 'agingTime', name: '시효시간' },
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
        { key: 'ce', name: 'Ce' },
    ];

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
        const combinedKeys = [...keysToShow, ...keys];
        const rows = [];

        for (let i = 0; i < 5; i++) {
            const cells = [];
            for (let j = 0; j < 5; j++) {
                const index = i * 5 + j;
                if (index < combinedKeys.length) {
                    cells.push(
                        <td key={index}>
                            <div className="align-middle">
                                <label htmlFor={combinedKeys[index].key}>{combinedKeys[index].name}</label>
                                <div className="table-value" value={selectedValues[combinedKeys[index].key] || ''}>{selectedValues[combinedKeys[index].key] || 'N/A'}</div>
                                <input
                                    type="text"
                                    name={combinedKeys[index].key}
                                    className="form-control"
                                    placeholder={selectedValues[combinedKeys[index].key]}                                                                
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
                                <option key={item.outputIdx} value={item.outputIdx}>인장강도 : {item.tensileStrengthResult} 항복강도 : {item.yieldStrengthResult} 경도 : {item.hardnessResult}    연신율 : {item.elongationResult}</option>
                            ))}
                        </select>
                    </div>
                </form>
                {renderTable()}
            </>
        );
    };

    const renderModelBackup = () => {
        return (
            <form>
                <div className="form-group">
                    <label htmlFor="backupDate">초기화 기준 날짜 지정</label>
                    <input type="date" className="form-control" id="backupDate" />
                </div>
                <button type="submit" className="btn btn-primary">백업</button>
            </form>
        );
    };

    const renderContent = () => {
        switch (view) {
            case 'techInput':
                return renderTechInput();
            case 'modelBackup':
                return renderModelBackup();
            case 'default':
                return renderTable();
            default:
                return <div>Invalid view</div>;
        }
    };

    return (
        <div className="counter-wrap">
            <div className="counter-area">
                <h1>모델 설정 페이지</h1>
                <div className="counter-group">
                    <button onClick={() => setView('techInput')} className="btn btn-secondary">공법 입력</button>
                    <button onClick={() => setView('modelBackup')} className="btn btn-secondary">모델 백업</button>
                </div>
                {renderContent()}
                <button type="submit" className="btn btn-primary">확인</button>
            </div>
        </div>
    );
};

export default Modelling;

