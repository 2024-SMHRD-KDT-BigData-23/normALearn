import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './About.css';  // 추가한 CSS 파일을 임포트합니다.

const About = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <h1>시각화 페이지</h1>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">번호</th>
                                <th scope="col">인장강도</th>
                                <th scope="col">항복강도</th>
                                <th scope="col">경도</th>
                                <th scope="col">연신율</th>
                                <th scope="col">조성 확인</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: 20 }, (_, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>13.2</td>
                                    <td>14.3</td>
                                    <td>123</td>
                                    <td>123</td>
                                    <td><a href="">확인</a></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default About;