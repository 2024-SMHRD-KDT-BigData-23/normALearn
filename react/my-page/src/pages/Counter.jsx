import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const About = () => {
    const [view, setView] = useState('default');

    const renderContent = () => {
        if (view === 'techInput') {
            return (
                <form>
                    <div className="form-group">
                        <label htmlFor='onein'>설정1</label>
                        <input type="text" className="form-control" id='onein' placeholder="조성을 입력하세요" />
                    </div>
                    <div className="form-group">
                        <label htmlFor='twoin'>설정2</label>
                        <input type="text" className="form-control" id='twoin' placeholder="공법을 입력하세요" />
                    </div>
                    <div className="form-group">
                        <label className="form-check-label d-block">설정3</label>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" />
                            <label >인장강도</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" />
                            <label>항복강도</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" />
                            <label>경도</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" />
                            <label >연신율</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-check-label d-block">설정4</label>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" />
                            <label >설치 장비1</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" />
                            <label>설치 장비2</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" />
                            <label>설치 장비3</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" />
                            <label >설치 장비4</label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">확인</button>
                </form>
            );
        } else if (view === 'modelBackup') {
            return (
                <form>
                    <div className="form-group">
                        <label htmlFor="backupDate">초기화 기준 날짜 지정</label>
                        <input type="date" className="form-control" id="backupDate"/>
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

export default About;