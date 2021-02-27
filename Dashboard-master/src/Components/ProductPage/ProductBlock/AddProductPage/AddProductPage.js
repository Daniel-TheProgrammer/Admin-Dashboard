import React from 'react';
import './AddProductPage.css';

class AddProductPage extends React.Component {

    imageInput = React.createRef();
    productName = React.createRef();
    productCategory = React.createRef();
    expireDate = React.createRef();
    stockUnits = React.createRef();
    soldUnits = React.createRef();

    state = {
        productName: '',
        productCategory: '',
        expireDate: '',
        stockUnits: 0,
        soldUnits: 0
    }

    onHandleElements = () => {
        const DateOptions = {day: '2-digit', month: 'long', year: 'numeric'};
        const pickedDate = new Intl.DateTimeFormat('en-GB', DateOptions).format(this.expireDate.current.valueAsDate);

        this.setState({
            productName: this.productName.current.value,
            productCategory: this.productCategory.current.selectedOptions[0].label,
            expireDate: pickedDate,
            stockUnits: this.stockUnits.current.value,
            soldUnits: this.soldUnits.current.value
        })

    }

    onImageInput = () => {
        this.imageInput.click();
    }

    onUploadFile = (e) => {
        const fileSize = Math.round((e.target.files[0].size/1024));

        if (fileSize > 1024)  {
            alert('File size can\'t be more than 1 MB');
            return false;
        }

    }

    onAddNewProduct = () => {

        let wholeStorage = JSON.parse(localStorage[('myBackEndData')]);
        const updatedProductList = wholeStorage.productsPage.products;

        const obj = {
            category: this.state.productCategory,
            expireDate: this.state.expireDate,
            name: this.state.productName,
            stock: this.state.stockUnits,
            unitSold: this.state.soldUnits
        }

        let isFull = false;

        for (let key in obj) {
            if (  
                obj[key] !== null && 
                obj[key] !== '' && 
                obj[key] !== undefined && 
                obj[key] !== 0
            )  
                {isFull = true;}

            else {isFull = false; break;}
        }

        if (!isFull) {
            alert('Please fill in all the fields!');
            return false;
        } else {
            updatedProductList.push(obj);
            wholeStorage.productsPage.products = updatedProductList;
    
            localStorage.setItem('myBackEndData', JSON.stringify(wholeStorage));
            this.props.history.push('/products');
        }

    }

    render() {
        return (
            <div className="add-product-page">
                <h2 className="tm-block-title">Add Product</h2>
                
                <div className='add-product-blocks'>

                    <form action="" onSubmit={(e)=>{e.preventDefault();}} className="tm-edit-product-form">
                        <div className="form-group mb-3">
                            <label htmlFor="name">Product Name</label>
                            <input ref={this.productName} onChange={this.onHandleElements} name="name" type="text" className="form-control name" required />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="description">Description</label>
                            <textarea className="form-control" rows="3"></textarea>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="category">Category</label>
                            <select ref={this.productCategory} onChange={this.onHandleElements} className="custom-select" required>
                                <option defaultValue="">Select category</option>
                                <option defaultValue="1">New Arrival</option>
                                <option defaultValue="2">Most Popular</option>
                                <option defaultValue="3">Trending</option>
                                <option defaultValue="4">Christmas Special</option>
                                <option defaultValue="5">Latest Fashion</option>
                                <option defaultValue="6">New Year Special</option>
                            </select>
                        </div>
                        <div className="expire-stock">
                            <div className="form-group mb-3 col-xs-12 col-sm-6 expire">
                                <label htmlFor="expire_date">Expire Date
                                </label>
                                <input required ref={this.expireDate} onChange={this.onHandleElements} name="expire_date" type="date" className="expire_date form-control" />
                            </div>
                            <div className="form-group mb-3 col-xs-12 col-sm-6 stock">
                                <label htmlFor="stock">In Stock</label>
                                <input ref={this.stockUnits} onChange={this.onHandleElements} name="stock" type="text" className="form-control stock" required />
                            </div>
                            <div className="form-group mb-3 col-xs-12 col-sm-6 sold">
                                <label htmlFor="sold">Sold</label>
                                <input ref={this.soldUnits} onChange={this.onHandleElements} name="sold" type="text" className="form-control sold" required />
                            </div>
                        </div>

                    </form>

                    <div className="upload-image">
                        <div className="tm-product-img-dummy">
                            <i className="fas fa-cloud-upload-alt tm-upload-icon" onClick={this.onImageInput}></i>
                        </div>
                        <div className="custom-fil mb-3">
                            <input onChange={(e)=>{this.onUploadFile(e)}} accept=".jpg, .png, .bmp, .svg, .webp" ref={input => this.imageInput = input} className="fileInput" type="file" style={{display: 'none'}} />
                            <input type="button" className="btn btn-primary btn-block mx-auto" defaultValue="UPLOAD PRODUCT IMAGE" onClick={this.onImageInput} />
                        </div>
                    </div>

                    <button onClick={this.onAddNewProduct} type="submit" className="btn btn-primary btn-block text-uppercase">Add Product Now</button>

                </div>
            </div>
        )
    }
}

export default AddProductPage;