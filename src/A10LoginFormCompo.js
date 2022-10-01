import React, { Component } from 'react';
import axios from 'axios';

export default class A10LoginFormCompo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            reload: '',
            fields: {},
            errors: {},
            response: {},
            showLoading: false,
            showConformation: true
        }
    }

    handleValidation = () => {
        var fields = this.state.fields;
        var errors = {};
        var formIsValid = true;

        // ======== Email validation ==================
        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "Email cannot be empty!!";
        }

        else if (typeof fields["email"] !== "undefined") {
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0
                && fields["email"].indexOf('@@')
                === -1 && lastDotPos > 2
                && (fields["email"].length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["email"] = "Email is not valid!! (Ex: myname@gmail.com)";
            }
        }

        //============ Password Validation =============
        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "Password cannot be empty!!";
        }

        if (typeof fields["password"] !== "undefined") {
            let pass = fields["password"];
            // This we ask hard password
            // must contain one uppercase, one lowercase, one number, one special char, length between 8 to 20
            let reg = new RegExp("(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,20})");
            var test = reg.test(pass);
            if (test !== true) {
                formIsValid = false;
                errors["password"] = "Password must be alphanumeric with lenght between 8-20. (Ex: 92@Devid#99)";
            }
        }

        this.setState({ errors: errors });
        console.log(formIsValid);
        return formIsValid;
    }


    printResponse = (contentShow) => {
        let res = {};
        var successRes = <div
            className="alert alert-danger"
            data-aos="fade-in"
            data-aos-delay="200"
            style={{ textAlign: "center" }}>
            {contentShow}
        </div>;
        res["submitResponse"] = successRes;
        this.setState({ response: res });
        delete res['submitResponse'];
    }


    contactSubmit = (e) => {
        e.preventDefault();
        console.log("Login initialized.." + this.handleValidation());

        if (this.handleValidation()) {
            let databundle = {
                username: this.state.fields['email'],
                password: this.state.fields['password']
            };
            let nextFun = () => {
                console.log('nextFun initailized..')
                this.setState({ showLoading: !this.state.showLoading });
                this.setState({ showConformation: !this.state.showConformation });
            }

            axios
                .post("http://localhost/login", databundle, nextFun())
                .then((response) => {
                    this.setState({ showLoading: !this.state.showLoading });
                    this.setState({ showConformation: !this.state.showConformation });

                    console.log('Databundel sent..');
                    console.log(response.data['msg']);
                    if (response.data['err'] !== undefined) {
                        this.printResponse(response.data['msg']);
                    } else {
                        console.log(response.data);
                        this.props.toggleFirstPage(response.data);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });

        }
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
        console.log(this.state.fields);
    }

    render() {
        return (
            <div className="container contact section"
                data-aos="fade-up"
                data-aos-delay="100"
                id="loginForm"
            >
                <div className="row">
                    <div className="ml-auto col-lg-5 col-md-6 col-12">

                        <h2
                            className="mb-4 pb-2"
                            data-aos="fade-up"
                            data-aos-delay="200">
                            Login
                        </h2>

                        <form
                            action=""
                            method="post"
                            className="contact-form webform"
                            data-aos="fade-up"
                            data-aos-delay="400"
                            onSubmit={this.contactSubmit.bind(this)}
                        >

                            <fieldset>

                                {/* ========= Email input filed========== */}
                                <input
                                    className="form-control"
                                    ref="email"
                                    type="text"
                                    size="30"
                                    placeholder="Email"
                                    onChange={this.handleChange.bind(this, "email")}
                                    value={this.state.fields["email"]}
                                />
                                <span style={{ color: "red" }}>{this.state.errors["email"]}</span>

                                {/* ============= Password Input field=========== */}
                                <input
                                    className="form-control"
                                    ref="password"
                                    type="password"
                                    size="30"
                                    placeholder="Password"
                                    onChange={this.handleChange.bind(this, "password")}
                                    value={this.state.fields["password"]}
                                />
                                <span style={{ color: "red" }}>{this.state.errors["password"]}</span>

                                {/* =============== Check box filed============== */}
                                <div className="alert alert-secondary">
                                    <div className="custom-control
                                             custom-checkbox 
                                             from-control ml-1">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="loginForm"
                                        />
                                        <label
                                            className="custom-control-label text-small text-muted"
                                            htmlFor="loginForm">
                                            <a href="#">
                                                Remember Me/
                                            </a>
                                            <a href="#">
                                                Forgot Password
                                            </a>
                                        </label>
                                    </div>
                                </div>


                                {/* Loading Section  */}

                                {this.state.showLoading ?
                                    <span className="form-control"
                                        style={{
                                            border: "none",
                                            textAlign: "center",
                                            verticalAlign: "center",
                                            // marginBottom: "10px"
                                        }}
                                    >
                                        <a href="#"
                                            className="fa fa-cog"
                                            id="rotateCOG"
                                            style={{ fontSize: "40px" }}></a>
                                    </span> :
                                    null}

                                {/* ==========Section for server response =========== */}

                                {this.state.showConformation ?
                                    <span
                                        style={{ marginTop: "7px", marginBottom: "5px" }}
                                    >
                                        {this.state.response["submitResponse"]}
                                    </span> :
                                    null}


                                <button
                                    type="submit"
                                    className="form-control"
                                    id="submit-button"
                                    name="submit">
                                    Login
                                </button>

                            </fieldset>
                        </form>
                    </div>

                </div>
            </div>
        )
    }
}
