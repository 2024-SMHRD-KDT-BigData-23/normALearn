import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


const About = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <h1>북마크 페이지</h1>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">선택일자</th>
                                <th scope="col">인장강도</th>
                                <th scope="col">항복강도</th>
                                <th scope="col">경도</th>
                                <th scope="col">연신율</th>
                                <th scope="col">조성</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: 20 }, (_, index) => (
                                <tr key={index}>
                                    <td>2024.05.18</td>
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