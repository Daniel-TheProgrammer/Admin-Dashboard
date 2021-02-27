import React from 'react';
import './LoginPage.css';

import axios from 'axios';

import { connect } from 'react-redux';

class LoginPage extends React.Component {

    state = {
        userName: '',
        userPassword: '',
        loginIsValid: false,
        passIsValid: false
    }

    gettingDataFromBackend = () => {
        axios.get('https://reactmusicplayer-ab9e4.firebaseio.com/project-data.json')
        .then(response => {
            localStorage.setItem('myBackEndData', JSON.stringify(response.data));
        }).then(()=>{
            this.props.history.push('/dashboard');
        });
    }

    toLocalStorage = () => {

        if (this.state.loginIsValid && this.state.passIsValid) {

            localStorage.setItem('userData', JSON.stringify({
                'userName': this.state.userName,
                'userPassword': this.state.userPassword,
            }));
    
            this.props.onUserLoggedIn();
    
            if (localStorage['myBackEndData'] && localStorage['myBackEndData']) {
                this.props.history.push('/dashboard');
            } else {
                this.gettingDataFromBackend();
            }
        } else alert('Login or password is invalid');

    }

    getUserName = (e) => {

        const userNamePattern = /^[a-zA-Z]{3,}([a-zA-Z0-9]{1,})?$/;

        if (e.target.value) {
            document.querySelector('.login-val').style.display = 'block';
        }

        if (e.target.value.match(/^[a-zA-Z]{3,}/gm)) document.querySelectorAll('.login-val li')[0].style.color = '#00b700';
        else document.querySelectorAll('.login-val li')[0].style.color = '#E15D44';

        if (e.target.value.match(userNamePattern)) {
            e.target.style.borderBottom = '4px solid #00b700';
            this.setState({userName: e.target.value});
            this.setState({loginIsValid: true});
        } else {
            e.target.style.borderBottom = '4px solid #E15D44';
            return false;
        }
    }

    getPassword = (e) => {

        const userPasswordPattern = /(?=^.{8,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*/;
        
        if (e.target.value) {
            document.querySelector('.pass-val').style.display = 'block';
        }

        if (e.target.value.match(/^.{8,}$/gm)) document.querySelectorAll('.pass-val li')[0].style.color = '#00b700';
        else document.querySelectorAll('.pass-val li')[0].style.color = '#E15D44';

        if (e.target.value.match(/[0-9]{1,}/gm)) document.querySelectorAll('.pass-val li')[1].style.color = '#00b700';
        else document.querySelectorAll('.pass-val li')[1].style.color = '#E15D44';

        if (e.target.value.match(/[A-Z]{1,}/gm)) document.querySelectorAll('.pass-val li')[2].style.color = '#00b700';
        else document.querySelectorAll('.pass-val li')[2].style.color = '#E15D44';

        if (e.target.value.match(/[a-z]{1,}/gm)) document.querySelectorAll('.pass-val li')[3].style.color = '#00b700';
        else document.querySelectorAll('.pass-val li')[3].style.color = '#E15D44';

        if (e.target.value.match(/[^A-Za-z0-9]{1,}/gm)) document.querySelectorAll('.pass-val li')[4].style.color = '#00b700';
        else document.querySelectorAll('.pass-val li')[4].style.color = '#E15D44';

        if (e.target.value.match(userPasswordPattern)) {
            e.target.style.borderBottom = '4px solid #00b700';
            this.setState({userPassword: e.target.value});
            this.setState({passIsValid: true});
        } else {
            e.target.style.borderBottom = '4px solid #E15D44';
            return false;
        }

    }

    componentDidMount() {
        if (!localStorage[('myBackEndData')]) {
            axios.get('https://reactmusicplayer-ab9e4.firebaseio.com/project-data.json')
            .then(response => {
                localStorage.setItem('myBackEndData', JSON.stringify(response.data));
            })
        }
    }

    render() {
        return (
            <div className="login-page">
                <form className='login-form' onSubmit={(e)=>e.preventDefault(e)}>
                    <h2>Welcome to Dashboard, Login</h2>
                    <div> 
                        <span>Username</span>
                        <input onChange={(e)=>{this.getUserName(e)}} type="text" name="username" className="username" required/>
                        <ul className="login-val">
                            <li>Starts with not less than 3 characters</li>
                            <li style={{color: 'darkorange'}}>Numeric characters are optional</li>
                        </ul>                        
                    </div>
                    <div> 
                        <span>Password</span>
                        <input onChange={(e)=>{this.getPassword(e)}} type="password" name="pass" required/>
                        <ul className="pass-val">
                            <li>Not less than 8 characters</li>
                            <li>Contains a digit</li>
                            <li>Contains an uppercase letter</li>
                            <li>Contains a lowercase letter</li>
                            <li>A character not being alphanumeric</li>
                        </ul>
                    </div>
                    <div>
                        <button onClick={this.toLocalStorage}>Login</button>
                    </div>
                </form>

            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        onUserLoggedIn: () => {dispatch({type: 'USER_LOGIN'})}
    }
}

export default connect(null, mapDispatchToProps)(LoginPage);