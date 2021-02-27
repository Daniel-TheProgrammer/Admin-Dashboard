import React from 'react';

import { Link } from 'react-router-dom';

class ProductBlock extends React.Component {

    state = {
        productData: JSON.parse(localStorage[('myBackEndData')]).productsPage.products,
        checkedItems: []
    }

    uncheckAllItems = () => {
        
        [...document.querySelectorAll('input[type=checkbox]')].map(item=> {
            if (item.checked) {
                item.checked = false;
                item.style.backgroundColor = '#394e64';
             }
         });

    }

    removeProduct = (pos,e) => {
        e.preventDefault();

        const tempArr = this.state.productData;
        let wholeStorage = JSON.parse(localStorage[('myBackEndData')]);

        tempArr.splice(pos, 1);

        wholeStorage.productsPage.products = tempArr;
        localStorage.setItem('myBackEndData', JSON.stringify(wholeStorage));
        this.setState({productData: tempArr});

        this.uncheckAllItems();
    }

    onChecked = (pos,e) => {
        const tempData = this.state.checkedItems;

        if (e.target.checked) {
            tempData.push(pos);
            e.target.style.backgroundColor = '#f5a623';
        }
        else {
            e.target.style.backgroundColor = '#394e64';
            const index = tempData.indexOf(pos);
            if (index !== -1) tempData.splice(index, 1);
        }

        this.setState({checkedItems: tempData});

    }

    removeMultipleElements = () => {

        let wholeStorage = JSON.parse(localStorage[('myBackEndData')]);
        const tempArr = this.state.productData;

        const indexSet = new Set(this.state.checkedItems);        
        const arrayWithValuesRemoved = tempArr.filter((item, i) => !indexSet.has(i));
        
        wholeStorage.productsPage.products = arrayWithValuesRemoved;
        localStorage.setItem('myBackEndData', JSON.stringify(wholeStorage));

        this.setState({productData: arrayWithValuesRemoved, checkedItems: []});
        
        this.uncheckAllItems();
    }

    render() {

        const renderingData = this.state.productData.map((item,pos) => {
            return (
                <tr className="mainRow" key={pos+1}>
                    <td className="inputCheck">
                        <label htmlFor={`product-${pos+1}`}>
                            <input onChange={(e)=>{this.onChecked(pos,e)}} type="checkbox" id={`product-${pos+1}`}/>
                        </label>
                    </td>
                    <td className="tm-product-name">{item.name}</td>
                    <td className="tm-product-category">{item.category}</td>
                    <td className="tm-product-sold">{item.unitSold}</td>
                    <td className="tm-product-stock">{item.stock}</td>
                    <td className="tm-product-expire">{item.expireDate}</td>
                    <td className="deleteIcon">
                        <a href='/' onClick={(e)=>this.removeProduct(pos,e)} className="tm-product-delete-link">
                            <i className="far fa-trash-alt tm-product-delete-icon"></i>
                        </a>
                    </td>
                </tr>
            )
        });
        
        return (

            <div className="product-block">
                <div className="product-table-container">
                    <div className="product-table-wrapper">
                        <div style={{padding: '0 1px'}}>
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th style={{width: '50px'}}>&nbsp;</th>
                                        <th>PRODUCT NAME</th>
                                        <th>CATEGORY</th>
                                        <th>UNIT SOLD</th>
                                        <th>IN STOCK</th>
                                        <th>EXPIRE DATE</th>
                                        <th style={{width: '50px'}}>&nbsp;</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    
                        <table className="table data-table">
                            <tbody>        
                                {renderingData}
                            </tbody>
                        </table>

                    </div>

                </div>

                <Link to="/products/add" className="btn btn-primary btn-block text-uppercase mb-3">Add new product</Link>
                <button onClick={this.removeMultipleElements} className="btn btn-primary btn-block text-uppercase">
                    Delete selected products
                </button>
            </div>
        )
    }
}

export default ProductBlock;