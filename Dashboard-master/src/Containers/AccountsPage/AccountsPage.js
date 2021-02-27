import React from 'react';
import './AccountsPage.css';
import defaultAvatar from './img/default-avatar.png';

class AccountsPage extends React.Component {

    name = React.createRef();
    email = React.createRef();
    password = React.createRef();
    rePassword = React.createRef();
    phone = React.createRef();
    selectingRole = React.createRef();
    profilePic = React.createRef();
    uploadPic = React.createRef();
    popUp = React.createRef();
    overlay = React.createRef();

    state = {
        name: '',
        email: '',
        password: '',
        rePassword: '',
        phone: '',
        profilePic: '',
        currentRole: ''
    }

    defaultState = () => {
        this.setState({
            name: '',
            email: '',
            password: '',
            phone: '',
            profilePic: defaultAvatar
        });
    }

    onHandleElements = () => {

        this.setState({
            name: this.name.current.value,
            email: this.email.current.value,
            password: this.password.current.value,
            phone: this.phone.current.value
        });


    }

    onUploadFile = (e) => {

        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
              this.setState({
                profilePic: e.target.result
              });
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    onUpdateProfile = () => {

        let wholeStorage = JSON.parse(localStorage[('myBackEndData')]);
        const selectedOption = this.selectingRole.current.selectedOptions[0].label;
        let updatedAccount = wholeStorage.accountsPage;
        
        if (updatedAccount.hasOwnProperty(selectedOption)) {

            const obj = {
                email: this.state.email,
                name: this.state.name,
                password: this.state.password,
                phone: this.state.phone,
                profilePic: this.state.profilePic
            }

            updatedAccount[selectedOption] = obj;
            wholeStorage.accountsPage[selectedOption] = updatedAccount[selectedOption];

            localStorage.setItem('myBackEndData', JSON.stringify(wholeStorage));

            this.popUp.current.style.display = 'flex';
            this.overlay.current.style.display = 'block';

        } else {
            alert('Choose the account type');
            return false;
        }

    }

    onRenderDataBySelect = () => {
        const data = JSON.parse(localStorage[('myBackEndData')]).accountsPage;
        const selectedOption = this.selectingRole.current.selectedOptions[0].label;
        const selectedIndex = this.selectingRole.current.selectedIndex;

        if (data.hasOwnProperty(selectedOption)) {
            const selectedData = data[selectedOption];

            this.setState({
                name: selectedData.name,
                email: selectedData.email,
                password: selectedData.password,
                phone: selectedData.phone,
                profilePic: selectedData.profilePic
            });

            localStorage.setItem('selectedRole', JSON.stringify({
                'role': selectedOption,
                'index': selectedIndex
            }));


        } else {

            this.defaultState();
            return false;
        }
    }

    closePopUp = () => {
        this.popUp.current.style.display = 'none';
        this.overlay.current.style.display = 'none';
    }

    deletePic = (e) => {
        e.preventDefault();
        this.setState({
            profilePic: defaultAvatar
        })
    }

    componentDidMount() {

        let defaultRole;
        let roleName;
        let IndexOfSelectedRole;
        let myData;

        if (!localStorage[('selectedRole')]) {

            roleName = '';
            IndexOfSelectedRole = 0;
            myData = {};

            defaultRole = {
                'role': '',
                'index': 0
            }

            this.defaultState();
        }

        else {

            defaultRole = JSON.parse(localStorage[('selectedRole')]);
            roleName = defaultRole.role;
            IndexOfSelectedRole = defaultRole.index;
            myData = JSON.parse(localStorage[('myBackEndData')]).accountsPage[roleName];
            this.selectingRole.current.selectedIndex = IndexOfSelectedRole;


            this.setState({
                profilePic: myData.profilePic,
                name: myData.name,
                email: myData.email,
                password: myData.password,
                phone: myData.phone,
            });
        }

        document.addEventListener("keydown", (e)=>{
            if (e.keyCode === 27) {
                this.closePopUp();
              }
        }, false);
    }

    render() {

        return (
            <div className="accounts-page container">
                <div className="accounts-content">
                    <h2 className="tm-block-title">List of Accounts</h2>
                    <p>Accounts</p>
                    <select ref={this.selectingRole} onChange={this.onRenderDataBySelect} className="custom-select">
                        <option value="0">Select account</option>
                        <option value="1">Admin</option>
                        <option value="2">Customer</option>
                        <option value="3">Editor</option>
                        <option value="4">Merchant</option>
                    </select>
                </div>

                <div className="tm-content-row">
                    <div className="tm-col-avatar">
                        <div className="tm-bg-primary-dark tm-block tm-block-avatar">
                            <h2 className="tm-block-title">Change Avatar</h2>
                            <div className="tm-avatar-container">
                                <img src={this.state.profilePic} ref={this.profilePic} alt="Avatar" className="tm-avatar img-fluid mb-4" />
                                
                                {
                                    this.state.profilePic && this.state.profilePic !== defaultAvatar
                                    ?
                                    <a onClick={(e)=>this.deletePic(e)} href="/" className="tm-avatar-delete-link">
                                        <i className="far fa-trash-alt tm-product-delete-icon"></i>
                                    </a>

                                    : null

                                }

                            </div>
                            <button onClick={()=>this.uploadPic.click()} className="btn btn-primary btn-block text-uppercase">
                                Upload New Photo
                            </button>
                            <input onChange={(e)=>this.onUploadFile(e)} accept=".jpg, .png, .bmp, .svg, .webp" ref={input => this.uploadPic = input} className="fileInput" type="file" style={{display: 'none'}} />
                        </div>
                    </div>
                    <div className="tm-col-account-settings">
                        <div className="tm-bg-primary-dark tm-block tm-block-settings">
                        <h2 className="tm-block-title">Account Settings</h2>
                            <form onSubmit={(e)=>e.preventDefault()} action="" className="tm-signup-form">
                                <div className="form-group">
                                <label htmlFor="name">Account Name</label>
                                <input ref={this.name} onChange={this.onHandleElements} value={this.state.name} id="name" name="name" type="text" className="form-control validate" />
                                </div>
                                <div className="form-group">
                                <label htmlFor="email">Account Email</label>
                                <input ref={this.email} onChange={this.onHandleElements} value={this.state.email} id="email" name="email" type="email" className="form-control validate" />
                                </div>
                                <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input ref={this.password} onChange={this.onHandleElements} value={this.state.password} id="password" name="password" type="password" className="form-control validate" />
                                </div>
                                <div className="form-group">
                                <label htmlFor="password2">Re-enter Password</label>
                                <input ref={this.rePassword} onChange={this.onHandleElements} id="password2" name="password2" type="password" className="form-control validate" />
                                </div>
                                <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input ref={this.phone} onChange={this.onHandleElements} value={this.state.phone} id="phone" name="phone" type="tel" className="form-control validate" />
                                </div>
                                <div className="form-group">
                                <label className="tm-hide-sm">&nbsp;</label>
                                <button onClick={this.onUpdateProfile} type="submit" className="btn btn-primary btn-block text-uppercase">
                                    Update Your Profile
                                </button>
                                </div>
                                <div className="col-12 form-group">
                                <button type="submit" className="btn btn-primary btn-block text-uppercase">
                                    Delete Your Account
                                </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div onClick={this.closePopUp} ref={this.overlay} className="overlay"></div>

                <div ref={this.popUp} className="confirm-popUp">
                    <h2>Information Updated Successfully!</h2>
                    <button onClick={this.closePopUp}>Okay</button>
                </div>

            </div>
        )
    }
}

export default AccountsPage;