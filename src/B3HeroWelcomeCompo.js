import React, { Component } from 'react'

export default class B3HeroWelcomeCompo extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <br /><br />
                <div className="container jumbotron"
                    style={{ height: "500px", width: "700px", textAlign: "center", marginTop: "20px" }}
                >
                    <h3>Hello</h3>
                    <h1>{this.props.userName}</h1>
                    <h3>Hope you are doing Great!!</h3>


                </div>
            </div>

        )
    }
}
