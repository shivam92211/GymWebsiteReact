import React, { Component } from 'react';
import axios from 'axios';


export default class A9SignupFormCompo extends Component {

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

    //======================== Form validation handling =============================
    handleValidation = () => {
        var fields = this.state.fields;
        var errors = {};
        var formIsValid = true;

        // Name
        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "Name cannot be empty!!";
        }

        if (typeof fields["name"] !== "undefined") {
            if (!fields["name"].match(/^[a-zA-Z ]{2,30}$/)) {
                formIsValid = false;
                errors["name"] = "Only letters are allowed and length must be more than 2!! (Ex: David Simon)";
            }
        }

        // Email
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

        // Password
        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "Password cannot be empty!!";
        }

        if (typeof fields["password"] !== "undefined") {
            let pass = fields["password"];
            console.log(pass);
            // This we ask hard password
            // must contain one uppercase, one lowercase, one number, one special char, length between 8 to 20
            let reg = new RegExp("(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,20})");
            var test = reg.test(pass);
            console.log(test);
            if (test === true) {

                if (fields['password'] !== fields['checkPassword']) {
                    formIsValid = false;
                    errors["checkPassword"] = "Password does not match!!";
                    console.log('say hi')
                }

            } else {

                formIsValid = false;
                errors["password"] = "Password must be alphanumeric with lenght between 8-20. (Ex: 92@Devid#99)";

            }
        }

        // Device ID 
        if (typeof fields['deviceid'] === "undefined") {
            formIsValid = false;
            errors["deviceid"] = "Device ID cannot be empty!!";
        } else if (typeof fields['deviceid'] !== "undefined") {
            // device id length must be 10 
            let device = new RegExp("(((?=.*[A-Z])(?=.*[0-9])))(?=.{10})"); //Ex: GAHT883746
            let checkDev = device.test(fields['deviceid']);
            console.log(checkDev);
            if (checkDev === false) {
                formIsValid = false;
                errors["deviceid"] = "Device ID must be of length 10 and AlphaNumeric!! (Ex: GBVC123456)";
            }
        }

        this.setState({ errors: errors });
        return formIsValid;
    }
    // ==========================Ending form validation ==================================


    // ================Showing popup box and putting values received for server===========
    printResponse = (contentShow, thisColor) => {
        let res = {};
        if (thisColor === "0") {
            var successRes = <div
                className="alert alert-success"
                data-aos="fade-in"
                data-aos-delay="200"
                style={{ textAlign: "center" }}>
                {contentShow}
            </div>;
            res["submitResponse"] = successRes;
            this.setState({ response: res });
            delete res['submitResponse'];
        }
        else if (thisColor === "1") {
            var successRes1 = <div
                className="alert alert-danger"
                data-aos="fade-in"
                data-aos-delay="200"
                style={{ textAlign: "center" }}>
                {contentShow}
            </div>;
            res["submitResponse"] = successRes1;
            this.setState({ response: res });
            delete res['submitResponse'];

        }
        else if (thisColor === "2") {
            var successRes2 = <div
                className="alert alert-warning"
                data-aos="fade-in"
                data-aos-delay="200"
                style={{ textAlign: "center" }}>
                {contentShow}
            </div>;
            res["submitResponse"] = successRes2;
            this.setState({ response: res });
            delete res['submitResponse'];

        }



    }
    // =====================Ending print response on screen function============================



    // =================Responding on form subimition button submit===========================
    contactSubmit = (e) => {
        e.preventDefault();

        if (this.handleValidation()) {
            console.log('hello from handler');

            var databundle = {
                name: this.state.fields['name'],
                email: this.state.fields['email'],
                password: this.state.fields['password'],
                deviceID: this.state.fields['deviceid'],
            };
            console.log(databundle);

            var nextFun = () => {
                this.setState({ showLoading: !this.state.showLoading });
                this.setState({ showConformation: !this.state.showConformation });
            }

            axios
                .post("http://localhost/sign_up", databundle, nextFun())
                .then((response) => {
                    this.setState({ showLoading: !this.state.showLoading });
                    this.setState({ showConformation: !this.state.showConformation });

                    console.log('Databundel sent..');
                    console.log(response.data['msg']);
                    if (response.data['err'] === "0") {
                        this.printResponse(response.data['msg'], "0");
                        setTimeout(() => {
                            this.props.toggleLogin();
                        }, 2000)
                    }
                    else if (response.data['err'] === "1") {
                        this.printResponse(response.data['msg'], "1");

                    }
                    else if (response.data['err'] === "2") {
                        this.printResponse(response.data['msg'], "2");

                    }

                })
                .catch((error) => {
                    console.error(error);
                });

        }
    }
    // ==========================Ending form submition response===========================


    // ==========================Putting all changed values in the state=================
    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }
    // ==========================Ending the changing value============================


    // ==============================Page to be sent to the client=======================
    render() {
        return (
            <div className="container contact section"
                data-aos="fade-up"
                data-aos-delay="100"
                id="signupform"
            >

                <div className="row">
                    <div className="ml-auto col-lg-5 col-md-6 col-12">
                        <h2
                            className="mb-4 pb-2"
                            data-aos="fade-up"
                            data-aos-delay="200">
                            Sign Up Now..
                                </h2>

                        <form
                            action="#"
                            method="post"
                            className="contact-form webform"
                            data-aos="fade-up"
                            data-aos-delay="400"
                            onSubmit={this.contactSubmit.bind(this)}
                        >

                            <fieldset>

                                {/* Name goes here  */}
                                <input
                                    className="form-control"
                                    ref="name"
                                    name="name"
                                    type="text"
                                    size="30"
                                    placeholder="Name*"
                                    onChange={this.handleChange.bind(this, "name")}
                                    value={this.state.fields["name"]}
                                />
                                <span style={{ color: "red" }}>{this.state.errors["name"]}</span>

                                {/* Email goes here  */}
                                <input
                                    className="form-control"
                                    ref="email"
                                    name="email"
                                    type="text"
                                    size="30"
                                    placeholder="Email*"
                                    onChange={this.handleChange.bind(this, "email")}
                                    value={this.state.fields["email"]}
                                />
                                <span style={{ color: "red" }}>{this.state.errors["email"]}</span>

                                {/* Password goes here  */}
                                <input
                                    className="form-control"
                                    ref="password"
                                    name="password"
                                    type="password"
                                    size="30"
                                    placeholder="Password*"
                                    onChange={this.handleChange.bind(this, "password")}
                                    value={this.state.fields["password"]}
                                />
                                <span style={{ color: "red" }}>{this.state.errors["password"]}</span>


                                {/* Check password here  */}
                                <input
                                    className="form-control"
                                    ref="checkPassword"
                                    name="checkPassword"
                                    type="password"
                                    size="30"
                                    placeholder="Check Password*"
                                    onChange={this.handleChange.bind(this, "checkPassword")}
                                    value={this.state.fields["checkPassword"]}
                                />
                                <span style={{ color: "red" }}>{this.state.errors["checkPassword"]}</span>


                                {/* Device id goes here  */}
                                <input
                                    className="form-control"
                                    ref="deviceid"
                                    name="deviceid"
                                    type="text"
                                    size="30"
                                    placeholder="DeviceID*"
                                    onChange={this.handleChange.bind(this, "deviceid")}
                                    value={this.state.fields["deviceid"]}
                                />
                                <span style={{ color: "red" }}>{this.state.errors["deviceid"]}</span>


                                {/* CheckBox  */}

                                <div className="alert alert-secondary from-control">
                                    <div className="custom-control custom-checkbox ">
                                        <input type="checkbox"
                                            className="custom-control-input"
                                            id="signup-form"
                                        />
                                        <label className="custom-control-label text-small text-muted"
                                            htmlFor="signup-form">
                                            I agree to the
                                                        <a href="#"> Terms &amp;Conditions</a>
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

                                {/* Section for server response  */}

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
                                    SignUp
                                </button>



                            </fieldset>
                        </form>
                    </div>

                </div>
            </div>
        )
    }
    // ==================================Ending the html page=========================


    // ===========================Now rendering the page===============================

}
