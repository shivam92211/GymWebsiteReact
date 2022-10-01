import React, { Component } from 'react';

// =========== Part one Befor login ===============
import NavBarCompo from './A1NavBarCompo'
import HeroCompo from './A2HeroSectionCompo'
import FeaturesCompo from './A3FeaturesSectionCompo'
import AboutCompo from './A4AboutSectionCompo'
import ClassCompo from './A5ClassSectioCompo'
import ContactCompo from './A6ContactSectionCompo'
import FooterCompo from './A7FooterSectionCompo'
import ModelsCompo from './A8ModelsSectionCompo'
import SignupCompo from './A9SignupFormCompo'
import LoginCompo from './A10LoginFormCompo'

// =============== Part two after login ==================
import B1NavBarcompo from './B1NavBarCompo'
import HeroWelcomeCompo from './B3HeroWelcomeCompo'
import B3HeroWelcomeCompo from './B3HeroWelcomeCompo';

export default class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            signinPage: false,
            loginPage: false,
            firstPage: true,
            secondPage: false,
            userName: "",
            userEmail: ""
        }
    }

    toggleSignin = () => {
        this.setState({ signinPage: !this.state.signinPage });
        if (this.state.loginPage) this.setState({ loginPage: !this.state.loginPage });
    }
    toggleLogin = () => {
        this.setState({ loginPage: !this.state.loginPage });
        if (this.state.signinPage) this.setState({ signinPage: !this.state.signinPage });
    }
    toggleFirstPage = (dataObject) => {
        console.log(dataObject);
        this.setState({ userName: dataObject['user'], userEmail: dataObject['email'] })
        this.setState({ loginPage: !this.state.loginPage });
        this.setState({ firstPage: !this.state.firstPage });
        this.setState({ secondPage: !this.state.secondPage })
    }


    render() {
        return (
            <div>
                <NavBarCompo
                    toggleLogin={this.toggleLogin.bind(this)}
                    toggleSignin={this.toggleSignin.bind(this)}
                />
                {this.state.signinPage ?
                    <SignupCompo toggleLogin={this.toggleLogin.bind(this)} /> :
                    null
                }
                {this.state.loginPage ?
                    <LoginCompo toggleFirstPage={this.toggleFirstPage.bind(this)} /> :
                    null
                }

                {this.state.firstPage ?
                    <div>
                        <HeroCompo />
                        <FeaturesCompo />
                        <AboutCompo />
                        <ClassCompo />
                        <ContactCompo />
                        <ModelsCompo />
                    </div>
                    : null
                }

                {
                    this.state.secondPage ?
                        <div>
                            <B1NavBarcompo />
                            <br/>
                            <B3HeroWelcomeCompo userName={this.state.userName} />
                        </div>
                        : null
                }

                <FooterCompo />
            </div>
        )
    }
}
