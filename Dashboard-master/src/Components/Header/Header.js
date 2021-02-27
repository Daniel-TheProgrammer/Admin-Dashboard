import React from 'react';
import './Header.css';

import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';

class Header extends React.Component {

    state = {
        showHiddenMenu : false
    }

    toDashBoard = React.createRef();
    toProducts = React.createRef();
    toAccounts = React.createRef();
    hiddenMenu = React.createRef();

    onHandleRedirect = (e) => {
        if (!this.props.userLoggedInStatus) {
            e.preventDefault();
        } else this.setState({showHiddenMenu: false});
    }
    
    onToggle = () => {
        this.setState({showHiddenMenu: !this.state.showHiddenMenu});
    }

    componentDidUpdate() {
        document.querySelectorAll('.hidden-menu a').onClick = () => {
            this.setState({showHiddenMenu: false});
        }
    }

    render() {
        return (
            <header>
                <div className="header-content container">
                    <NavLink to="/"><h1>Product Admin</h1></NavLink>
                    <nav className="top-menu">
                        <NavLink activeClassName='is-active' ref={this.toDashBoard} onClick={(e)=>this.onHandleRedirect(e)} className="nav-link" to="/dashboard">
                            <div>
                                <i className="fas fa-tachometer-alt"></i>
                                <p>Dashboard</p> 
                            </div>
                        </NavLink>
    
                        <NavLink activeClassName='is-active' ref={this.toProducts} onClick={(e)=>this.onHandleRedirect(e)} className="nav-link" to="/products">
                            <div>
                                <i className="fas fa-shopping-cart"></i>
                                <p>Products</p>
                            </div>
                        </NavLink>
    
                        <NavLink activeClassName='is-active' ref={this.toAccounts} onClick={(e)=>this.onHandleRedirect(e)} className="nav-link" to="/accounts">
                            <div>
                                <i className="far fa-user"></i>
                                <p>Accounts</p> 
                            </div>
                        </NavLink>
    
                    </nav>
    
                    {
                        this.props.userLoggedInStatus ?
                        
                        <NavLink onClick={this.props.onUserLoggedOut} className="nav-link logout" to="/login">
                            <div>
                                { JSON.parse(localStorage[('userData')]).userName }, <span>Logout</span>
                            </div>
                        </NavLink>
    
                        : null
                    }

                    <button onClick={this.onToggle} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
                        <i className="fas fa-bars tm-nav-icon"></i>
                    </button>

                    <nav ref={this.hiddenMenu} className={this.state.showHiddenMenu ? 'hidden-menu show' : 'hidden-menu hide'}>

                        <NavLink activeClassName='is-active' ref={this.toDashBoard} onClick={(e)=>this.onHandleRedirect(e)} className="nav-link" to="/dashboard">
                            <div>
                                <i className="fas fa-tachometer-alt"></i>
                                <p>Dashboard</p> 
                            </div>
                        </NavLink>
    
                        <NavLink activeClassName='is-active' ref={this.toProducts} onClick={(e)=>this.onHandleRedirect(e)} className="nav-link" to="/products">
                            <div>
                                <i className="fas fa-shopping-cart"></i>
                                <p>Products</p> 
                            </div>
                        </NavLink>
    
                        <NavLink activeClassName='is-active' ref={this.toAccounts} onClick={(e)=>this.onHandleRedirect(e)} className="nav-link" to="/accounts">
                            <div>
                                <i className="far fa-user"></i>
                                <p>Accounts</p> 
                            </div>
                        </NavLink>

                        {
                            this.props.userLoggedInStatus ?
                            
                            <NavLink onClick={()=>{this.props.onUserLoggedOut(); this.onHandleRedirect();}} className="nav-link" to="/">
                                <div>
                                    { JSON.parse(localStorage[('userData')]).userName } <span>, Logout</span>
                                </div>
                            </NavLink>
        
                            : null
                         }

                    </nav>
    
                </div>
            </header>
        )
    }
}

const mapGlobalStateToProps = (globalState) => {
    return {
        userLoggedInStatus: globalState.loggedInStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUserLoggedOut: () => {dispatch({type: 'USER_LOGOUT'});}
    }
}

export default connect(mapGlobalStateToProps, mapDispatchToProps)(Header);
