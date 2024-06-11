import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Modelling.css';
import '../fonts.css';

const Modelling = () => {
    const [view, setView] = useState('default');

    // keysToShow는 텍스트 박스 항목에 대한 배열입니다.
    const keysToShow = [
        { key: 'elongationResult', name: '연신율' },
        { key: 'hardnessResult', name: '경도' },
        { key: 'tensileStrengthResult', name: '인장강도' },
        { key: 'yieldStrengthResult', name: '항복강도' },
        { key: 'firstTemperature', name: '1차 용체화온도' },
        { key: 'firstTime', name: '1차 용체화 시간' },
        { key: 'secondTemperature', name: '2차 용체화온도' },
        { key: 'secondTime', name: '2차 용체화 시간' },
        { key: 'agingTemperature', name: '시효온도' },
        { key: 'agingTime', name: '시효시간' },
        { key: 'cooling', name: '냉각' }
    ];

    // keys는 추가적인 텍스트 박스 항목에 대한 배열입니다.
    const keys = [
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
        { key: 'al', name: 'Al' }
    ];

    const renderContent = () => {
        if (view === 'techInput') {
            return (
                <form>
                    <div className="option-select">
                        <label htmlFor="techSelect">공법설정 선택</label>
                        <select id="techSelect" className="form-control">
                            <option>공법설정1</option>
                            <option>공법설정2</option>
                            <option>공법설정3</option>
                        </select>
                        <button type="submit" className="btn btn-primary">확인</button>
                    </div>

                    <div className="option-text">
                        {keysToShow.map(({ key, name }, index) => (
                            <div className="form-group" key={index}>
                                <label htmlFor={key}>{name}</label>
                                <input
                                    type="text"
                                    id={key}
                                    className="form-control"
                                    placeholder={`${name} 입력`}
                                />
                            </div>
                        ))}
                        {keys.map(({ key, name }, index) => (
                            <div className="form-group" key={index + keysToShow.length}>
                                <label htmlFor={key}>{name}</label>
                                <input
                                    type="text"
                                    id={key}
                                    className="form-control"
                                    placeholder={`${name} 입력`}
                                />
                            </div>
                        ))}
                        <button type="submit" className="btn btn-primary">확인</button>
                    </div>
                </form>
            );
        } else if (view === 'modelBackup') {
            return (
                <form>
                    <div className="form-group">
                        <label htmlFor="backupDate">초기화 기준 날짜 지정</label>
                        <input type="date" className="form-control" id="backupDate" />
                    </div>
                    <button type="submit" className="btn btn-primary">백업</button>
                </form>
            );
        } else {
            return <div><h2>기본 화면</h2></div>;
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <h1>모델 설정 페이지</h1>
                <div className="table-container">
                    <button onClick={() => setView('techInput')} className="btn btn-primary">공법 입력</button>
                    <button onClick={() => setView('modelBackup')} className="btn btn-secondary">모델 백업</button>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

export default Modelling;
