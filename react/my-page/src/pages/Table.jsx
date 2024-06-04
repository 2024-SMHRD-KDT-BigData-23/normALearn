import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Table.css';
import 'boxicons/css/boxicons.min.css'; // Corrected path for boxicons



const Table = () => {
    return (
        <div className="container">
            <div className="row align-items-center">
                <div className="col-md-6">
                    <div className="mb-3">
                        <h5 className="card-title">Contact List <span className="text-muted fw-normal ms-2">(834)</span></h5>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="d-flex flex-wrap align-items-center justify-content-end gap-2 mb-3">
                        <div>
                            <ul className="nav nav-pills">
                                <li className="nav-item">
                                    <a
                                        href="#"
                                        className="router-link-active router-link-exact-active nav-link active"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        title=""
                                        data-bs-original-title="List"
                                        aria-label="List"
                                    >
                                        <i className="bx bx-list-ul"></i>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Grid" aria-label="Grid"><i className="bx bx-grid-alt"></i></a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <a href="#" data-bs-toggle="modal" data-bs-target=".add-new" className="btn btn-primary"><i className="bx bx-plus me-1"></i> Add New</a>
                        </div>
                        <div className="dropdown">
                            <a className="btn btn-link text-muted py-1 font-size-16 shadow-none dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="bx bx-dots-horizontal-rounded"></i></a>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="">
                        <div className="table-responsive">
                            <table className="table project-list-table table-nowrap align-middle table-borderless">
                                <thead>
                                    <tr>
                                        <th scope="col" className="ps-4" style={{ width: "50px" }}>
                                            <div className="form-check font-size-16"><input type="checkbox" className="form-check-input" id="contacusercheck" /><label className="form-check-label" htmlFor="contacusercheck"></label></div>
                                        </th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Position</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Projects</th>
                                        <th scope="col" style={{ width: "200px" }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* 내용 생략 */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row g-0 align-items-center pb-4">
                <div className="col-sm-6">
                    <div><p className="mb-sm-0">Showing 1 to 10 of 57 entries</p></div>
                </div>
                <div className="col-sm-6">
                    <div className="float-sm-end">
                        <ul className="pagination mb-sm-0">
                            <li className="page-item disabled">
                                <a href="#" className="page-link"><i className="mdi mdi-chevron-left"></i></a>
                            </li>
                            <li className="page-item active"><a href="#" className="page-link">1</a></li>
                            <li className="page-item"><a href="#" className="page-link">2</a></li>
                            <li className="page-item"><a href="#" className="page-link">3</a></li>
                            <li className="page-item"><a href="#" className="page-link">4</a></li>
                            <li className="page-item"><a href="#" className="page-link">5</a></li>
                            <li className="page-item">
                                <a href="#" className="page-link"><i className="mdi mdi-chevron-right"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Table;
