import React, { Component } from 'react'

export default class A7FooterSectionCompo extends Component {
    render() {
        return (
            <div>
                {/* <!-- FOOTER --> */}

                <footer className="site-footer">
                    <div className="container">
                        <div className="row">

                            <div className="ml-auto col-lg-4 col-md-5">

                                <p className="copyright-text">
                                    Copyright &copy; 2020 VishwakarmaHome.Com
                                    <br />Design:
                                    <a href="#">Tooplate</a>
                                </p>

                                <div className="d-flex justify-content-center mx-auto col-lg-5 col-md-7 col-12">
                                    <p className="mr-4">
                                        <i className="fa fa-envelope-o mr-1"></i>
                                        <a href="#">hello@company.co</a>
                                    </p>

                                    <p><i className="fa fa-phone mr-1"></i>+91 7977951858</p>
                                </div>

                            </div>

                        </div>
                    </div>
                </footer>

            </div>
        )
    }
}
