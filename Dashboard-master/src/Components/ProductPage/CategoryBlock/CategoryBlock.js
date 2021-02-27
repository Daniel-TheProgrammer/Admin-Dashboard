import React from 'react';

import './CategoryBlock.css';

class CategoryBlock extends React.Component {

    state = {
        categoryList : JSON.parse(localStorage[('myBackEndData')]).productsPage.categories,
        popUpIsVisible: false
    }

    popUp = React.createRef();
    overlay = React.createRef();
    categoryInput = React.createRef();

    showPopUp = () => {
        this.popUp.current.style.display = 'flex';
        this.overlay.current.style.display = 'block';
        this.setState({popUpIsVisible: true});
    }

    closePopUp = () => {
        this.popUp.current.style.display = 'none';
        this.overlay.current.style.display = 'none';
        this.setState({popUpIsVisible: false});
    }

    addNewCategory = () => {

        if ( this.categoryInput.current.value !== '') {

            let wholeStorage = JSON.parse(localStorage[('myBackEndData')]);
            const updatedCategoryList = wholeStorage.productsPage.categories;
    
            const newCategory = this.categoryInput.current.value;
            updatedCategoryList.push(newCategory);
            wholeStorage.productsPage.categories = updatedCategoryList;
    
            localStorage.setItem('myBackEndData', JSON.stringify(wholeStorage));
            this.setState({categoryList: wholeStorage.productsPage.categories})
            this.categoryInput.current.value = '';
            this.closePopUp();

        } else alert ('Enter the new category name');

    }

    removeCategory = (pos,e) => {
        
        e.preventDefault();

        const tempArr = this.state.categoryList;
        let wholeStorage = JSON.parse(localStorage[('myBackEndData')]);

        tempArr.splice(pos, 1);

        wholeStorage.productsPage.categories = tempArr;
        localStorage.setItem('myBackEndData', JSON.stringify(wholeStorage));
        this.setState({categoryList: tempArr});

    }

    componentDidMount() {
        document.addEventListener("keydown", (e)=>{
            if (e.keyCode === 27) {
                this.closePopUp();
              }
        }, false);

        document.addEventListener("keydown", (e)=>{
            if (e.keyCode === 13 && this.state.popUpIsVisible) {
                this.addNewCategory();
            }

        }, false);
    }

    render() {
        
        const data = JSON.parse(localStorage[('myBackEndData')]).productsPage.categories;
        
        const renderingData = data.map((item,pos) => {
            return (
                <tr key={pos+1}>
                    <td className="tm-product-name">{item}</td>
                    <td className="text-center">
                        <a onClick={(e)=>this.removeCategory(pos,e)} href="/" className="tm-product-delete-link">
                            <i className="far fa-trash-alt tm-product-delete-icon"></i>
                        </a>
                    </td>
              </tr>
            )
        });
        
        return (
            <div className="category-block">
                <div className="category-content">

                    <div onClick={this.closePopUp} ref={this.overlay} className="overlay"></div>

                    <div ref={this.popUp} className="add-category-popUp">

                        <label>Enter category name</label>
                        <input ref={this.categoryInput} className="form-control" type="text" />

                        <button onClick={this.addNewCategory} className="btn btn-primary btn-block text-uppercase mb-3">
                            Add
                        </button>

                        <i onClick={this.closePopUp} className="fas fa-times-circle"></i>

                    </div>

                    <h2 className="tm-block-title">Product Categories</h2>

                    <div className="category-table-container">
                        <table className="table tm-table-small category-table">
                            <tbody>
                                {renderingData}
                            </tbody>
                        </table>
                    </div>

                    <button onClick={this.showPopUp} className="btn btn-primary btn-block text-uppercase mb-3">
                        Add new category
                    </button>

                </div>

            </div>
        )
    }
}

export default CategoryBlock;