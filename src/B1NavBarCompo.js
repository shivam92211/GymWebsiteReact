import React, { Component } from 'react'

export default class B1NavBarCompo extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg fixed-top">
                    <div className="container">

                        <a className="navbar-brand" href="index.html"><h3>VishwakarmaHome.Com</h3></a>

                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ml-lg-auto">
                                <li className="nav-item">
                                    <a href="#home" className="nav-link smoothScroll">Home</a>
                                </li>

                                <li className="nav-item">
                                    <a href="#about" className="nav-link smoothScroll">Dashboard</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#contact" className="nav-link smoothScroll">Profile</a>
                                </li>
                                <li className="nav-item">
                                    <a href="" className="nav-link smoothScroll"
                                    >Settings</a>
                                </li>
                                <li className="nav-item">
                                    <a href="" className="nav-link smoothScroll"
                                    >LogOut</a>
                                </li>
                            </ul>

                            <ul className="social-icon ml-lg-3">
                                <li><a href="https://fb.com/tooplate" className="fa fa-facebook"></a></li>
                                <li><a href="" className="fa fa-twitter"></a></li>
                                <li><a href="" className="fa fa-instagram"></a></li>
                            </ul>
                        </div>

                    </div>
                </nav>
            </div>
        )
    }
}
