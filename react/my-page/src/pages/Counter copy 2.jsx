import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Counter.css';
import '../fonts.css';

const Modelling = () => {
    const [view, setView] = useState('default');

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

    const renderContent = () => {
        if (view === 'techInput') {
            return (
                <form>
                    <div className="option-select">
                        <select id="techSelect" className="form-control" placeholder="공법설정">
                            <option>공법설정1</option>
                            <option>공법설정2</option>
                            <option>공법설정3</option>
                        </select>
                        <button type="submit" className="btn btn-primary">확인</button>
                    </div>

                    <div className="option-text">
                        <div className="table-wrapper">
                            <table className="table table-index">
                                <tbody>
                                    {keysToShow.map(({ key, name }, index) => (
                                        <tr key={index}>
                                            <td className="align-middle">
                                                <label htmlFor={key}>{name}</label>
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    id={key}
                                                    className="form-control"
                                                    placeholder={`${name} 입력`}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="table-wrapper">
                            <table className="table table-index">
                                <tbody>
                                    {keys.map(({ key, name }, index) => (
                                        <tr key={index + keysToShow.length}>
                                            <td className="align-middle">
                                                <label htmlFor={key}>{name}</label>
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    id={key}
                                                    className="form-control"
                                                    placeholder={`${name} 입력`}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
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
        } else if (view === 'timetable') {
            return (
                <div className="container">
                    <div className="timetable-img text-center">
                        <img src="img/content/timetable.png" alt="" />
                    </div>
                    <div className="table-responsive">
                    <table className="table table-bordered text-center">
    <tbody>
        <tr>
            <td>
                <span className="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">Dance</span>
                <div className="margin-10px-top font-size14">9:00-10:00</div>
                <div className="font-size13 text-light-gray">Ivana Wong</div>
            </td>
            <td>
                <span className="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">Yoga</span>
                <div className="margin-10px-top font-size14">9:00-10:00</div>
                <div className="font-size13 text-light-gray">Marta Healy</div>
            </td>
            <td>
                <span className="bg-yellow padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">Music</span>
                <div className="margin-10px-top font-size14">9:00-10:00</div>
                <div className="font-size13 text-light-gray">Ivana Wong</div>
            </td>
            <td>
                <span className="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">Dance</span>
                <div className="margin-10px-top font-size14">9:00-10:00</div>
                <div className="font-size13 text-light-gray">Ivana Wong</div>
            </td>
            <td>
                <span className="bg-purple padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">Art</span>
                <div className="margin-10px-top font-size14">9:00-10:00</div>
                <div className="font-size13 text-light-gray">Kate Alley</div>
            </td>
        </tr>
        <tr>
            <td>
                <span className="bg-yellow padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">Music</span>
                <div className="margin-10px-top font-size14">10:00-11:00</div>
                <div className="font-size13 text-light-gray">Ivana Wong</div>
            </td>
            <td className="bg-light-gray"></td>
            <td>
                <span className="bg-purple padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">Art</span>
                <div className="margin-10px-top font-size14">10:00-11:00</div>
                <div className="font-size13 text-light-gray">Kate Alley</div>
            </td>
            <td>
                <span className="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">Yoga</span>
                <div className="margin-10px-top font-size14">10:00-11:00</div>
                <div className="font-size13 text-light-gray">Marta Healy</div>
            </td>
            <td>
                <span className="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">English</span>
                <div className="margin-10px-top font-size14">10:00-11:00</div>
                <div className="font-size13 text-light-gray">James Smith</div>
            </td>
        </tr>
        <tr>
            <td>
                <span className="bg-lightred padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">Break</span>
                <div className="margin-10px-top font-size14">11:00-12:00</div>
            </td>
            <td>
                <span className="bg-lightred padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">Break</span>
                <div className="margin-10px-top font-size14">11:00-12:00</div>
            </td>
            <td>
                <span className="bg-lightred padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">Break</span>
                <div className="margin-10px-top font-size14">11:00-12:00</div>
            </td>
            <td>
                <span className="bg-lightred padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">Break</span>
                <div className="margin-10px-top font-size14">11:00-12:00</div>
            </td>
            <td>
                <span className="bg-lightred padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">Break</span>
                <div className="margin-10px-top font-size14">11:00-12:00</div>
            </td>
        </tr>
        <tr>
            <td className="bg-light-gray"></td>
            <td>
                <span className="bg-purple padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">Art</span>
                <div className="margin-10px-top font-size14">12:00-1:00</div>
                <div className="font-size13 text-light-gray">Kate Alley</div>
            </td>
            <td>
                <span className="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">Dance</span>
                <div className="margin-10px-top font-size14">12:00-1:00</div>
                <div className="font-size13 text-light-gray">Ivana Wong</div>
            </td>
            <td>
                <span className="bg-yellow padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">Music</span>
                <div className="margin-10px-top font-size14">12:00-1:00</div>
                <div className="font-size13 text-light-gray">Ivana Wong</div>
            </td>
            <td className="bg-light-gray"></td>
        </tr>
        <tr>
            <td className="align-middle">01:00pm</td>
            <td>
                <span className="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">English</span>
                <div className="margin-10px-top font-size14">1:00-2:00</div>
                <div className="font-size13 text-light-gray">James Smith</div>
            </td>
            <td>
                <span className="bg-yellow padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">Music</span>
                <div className="margin-10px-top font-size14">1:00-2:00</div>
                <div className="font-size13 text-light-gray">Ivana Wong</div>
            </td>
            <td className="bg-light-gray"></td>
            <td>
                <span className="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">English</span>
                <div className="margin-10px-top font-size14">1:00-2:00</div>
                <div className="font-size13 text-light-gray">James Smith</div>
            </td>
        </tr>
    </tbody>
</table>





                    </div>
                </div>
            );
        } else {
            return <div><h2>기본 화면</h2></div>;
        }
    };

    return (
        <div className="counter-wrap">
            <div className="counter-area">
                <h1>모델 설정 페이지</h1>
                <div className="counter-group">
                    <button onClick={() => setView('techInput')} className="btn btn-primary">공법 입력</button>
                    <button onClick={() => setView('modelBackup')} className="btn btn-secondary">모델 백업</button>
                    <button onClick={() => setView('timetable')} className="btn btn-secondary">시간표 보기</button>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

export default Modelling;
