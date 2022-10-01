import React, { Component } from 'react'

export default class A6ContactSectionCompo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fields: {},
            errors: {}
        }
    }

    handleValidation = () => {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        // Name
        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "Cannot be empty";
        }

        if (typeof fields["name"] !== "undefined") {
            if (!fields["name"].match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["name"] = "Only letters";
            }
        }

        // Email
        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "Cannot be empty";
        }

        if (typeof fields["email"] !== "undefined") {
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0
                && fields["email"].indexOf('@@')
                === -1 && lastDotPos > 2
                && (fields["email"].length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["email"] = "Email is not valid";
            }
        }

        this.setState({ errors: errors });
        return formIsValid;
    }


    contactSubmit = (e) => {
        e.preventDefault();

        if (this.handleValidation()) {
            // alert("Form submitted");
        } else {
            // alert("Form has errors.")
        }

    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }

    render() {
        return (
            <div>
                {/* <!-- CONTACT --> */}
                <section className="contact section" id="contact">
                    <div className="container">
                        <div className="row">

                            <div className="ml-auto col-lg-5 col-md-6 col-12">
                                <h2
                                    className="mb-4 pb-2"
                                    data-aos="fade-up"
                                    data-aos-delay="200">
                                    Feel free to ask anything
                                </h2>

                                <form
                                    action="#"
                                    method="post"
                                    className="contact-form webform"
                                    data-aos="fade-up"
                                    data-aos-delay="400"
                                    onSubmit={this.contactSubmit.bind(this)}>

                                    <fieldset>
                                        <input
                                            className="form-control"
                                            ref="name"
                                            type="text"
                                            size="30"
                                            placeholder="Name"
                                            onChange={this.handleChange.bind(this, "name")}
                                            value={this.state.fields["name"]} />
                                        <span style={{ color: "red" }}>{this.state.errors["name"]}</span>

                                        <input
                                            className="form-control"
                                            ref="email"
                                            type="text"
                                            size="30"
                                            placeholder="Email"
                                            onChange={this.handleChange.bind(this, "email")}
                                            value={this.state.fields["email"]} />
                                        <span style={{ color: "red" }}>{this.state.errors["email"]}</span>

                                        <textarea
                                            className="form-control"
                                            rows="5"
                                            name="message"
                                            placeholder="Message">
                                        </textarea>

                                        <button
                                            type="submit"
                                            className="form-control"
                                            id="submit-button"
                                            name="submit">Send
                                            Message
                                        </button>
                                    </fieldset>
                                </form>
                            </div>

                            <div className="mx-auto mt-4 mt-lg-0 mt-md-0 col-lg-5 col-md-6 col-12">
                                <h2 className="mb-4" data-aos="fade-up" data-aos-delay="600">Where you can <span>find us</span></h2>

                                <p data-aos="fade-up" data-aos-delay="800"><i className="fa fa-map-marker mr-1"></i> 120-240 Rio de
                                Janeiro - State of Rio de Janeiro, Brazil</p>
                                {/* <!-- How to change your own map point */}
                                {/* 1. Go to Google Maps */}
                                {/* 2. Click on your location point */}
                                {/* 3. Click "Share" and choose "Embed map" tab */}
                                {/* 4. Copy only URL and paste it within the src="" field below */}
                                {/* --> */}
                                <div className="google-map" data-aos="fade-up" data-aos-delay="900">
                                    <iframe
                                        title="This is the location of my office"
                                        src="https://maps.google.com/maps?q=Av.+Lúcio+Costa,+Rio+de+Janeiro+-+RJ,+Brazil&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                        width="1920"
                                        height="250"
                                        frameBorder="0"
                                        style={{ border: 0 }}
                                        allowFullScreen="">

                                    </iframe>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

            </div>
        )
    }
}
