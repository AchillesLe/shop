import React,{Component} from 'react'
import {getTotal} from './../cart/RightCart'
import {withCartContext} from './../hoc/withCartContext'
import {Input} from './../common/Input'
import {validator} from './../common/Validator'
import isEmpty from 'lodash/isEmpty'
import {currencyParser} from './../../services'
class CheckoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors:{
        nameCustomer:'',
        address: "",
        phone: "",
        email: "",
        description:""
      },
      validInputs:['description'],
      total: 0,
      nameCustomer: "",
      address: "",
      phone: "",
      email: "",
      description:""
    };
  }
  handleChange = (e,validate) =>{
    var name = e.target.name
    var value = e.target.value
    var errors = validator(value,name,validate)
    var Inputs = this.state.validInputs
    if (isEmpty(errors) && !Inputs.includes(name)) {
      Inputs.push(name);
    } else if (!isEmpty(errors) && Inputs.includes(name)) {
      Inputs = Inputs.filter(input => input !== name);
    }
    this.setState((prevState)=>{
      return  {
        [name]: value,
        errors:{...prevState.errors,[name]:errors[name]||''},
        validInputs: Inputs
      }
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    const {nameCustomer,address,phone,email,description,total} =this.state
    var receipt = {
      nameCustomer,
      address,
      phone,
      email,
      description,
      total,
      detailReceipts:[...this.props.cartItems]
    }
    console.log(receipt)
  };
  componentDidMount(){
      this.setState({ total: getTotal(this.props.cartItems) })
  }
  componentWillReceiveProps(nextProp){
    this.setState({total:getTotal(nextProp.cartItems)})
  }
  renderBill = cartItems => {
    return cartItems.map(item => {
      return (
        <li key={item.id}>
          <ul className="d-flex justify-content-between w-100">
            <li style={{borderBottom: 0}} className="d-flex justify-content-start col-3"><span>{item.name}</span></li>
            <li style={{borderBottom: 0}} className="d-flex justify-content-end col-3"> <span>{item.quantity}</span></li>  
            <li style={{borderBottom: 0}} className="d-flex justify-content-end col-3"> <span>{currencyParser(item.price)} VNĐ</span> </li>
            <li style={{borderBottom: 0}} className="d-flex justify-content-end col-3"><span>{currencyParser(item.price * item.quantity)} VNĐ</span></li>
          </ul>
        </li>
      );
    });
  };
  render() {
    const {
      total,
      errors,
      validInputs,
      nameCustomer,
      address,
      phone,
      description,
      email
    } = this.state;
    return <div className="checkout_area section-padding-80">
        <div className="container">
          <div className="row">
          <form onSubmit={this.handleSubmit}>
            <div className="col-12 col-md-6">
              <div className="checkout_details_area mt-50 clearfix">
                <div className="cart-page-heading mb-30">
                  <h5>Điền thông tin</h5>
                </div>

               
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="first_name">
                        Họ tên <span>*</span>
                      </label>
                      <Input type="text" className="form-control" id="nameCustomer" name="nameCustomer" value={nameCustomer} handleChange={this.handleChange} validate={['required']}/>
                      <span className="text-danger">{errors.nameCustomer}</span>
                    </div>
                  
                    <div className="col-12 mb-3">
                      <label htmlFor="address">
                        Địa chỉ <span>*</span>
                      </label>
                      <Input type="text" className="form-control mb-3" id="address" name="address" handleChange={this.handleChange} value={address} validate={['required','address']}/>
                     <span className="text-danger">{errors.address}</span>
                    </div>

                    <div className="col-12 mb-3">
                      <label htmlFor="description">
                        Ghi chú
                      </label>
                      <Input type="text" className="form-control" id="description" name="description" handleChange={this.handleChange} value={description} validate={['']}/>
                      <span className="text-danger">{errors.description}</span>
                    </div>
                    
                    <div className="col-12 mb-3">
                      <label htmlFor="phone">
                        Số điện thoại <span>*</span>
                      </label>
                      <Input type="number" className="form-control" id="phone" name="phone" handleChange={this.handleChange} value={phone} validate={['required','number']}/>
                     <span className="text-danger">{errors.phone}</span>
                    </div>
                    <div className="col-12 mb-4">
                      <label htmlFor="email">
                        Email <span></span>
                      </label>
                      <Input type="email" className="form-control" id="email" name="email" handleChange={this.handleChange} value={email} validate={['email']}/>
                     <span className="text-danger">{errors.email}</span>
                    </div>
                  </div>
               
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-5 ml-lg-auto">
              <div className="order-details-confirmation">
                <div className="cart-page-heading">
                  <h5>Giỏ hàng</h5>
                  <p>Chi tiết sản phẩm</p>
                </div>

                <ul className="order-details-form mb-4">
                  <li>
                    <ul className="d-flex justify-content-between w-100">
                      <li style={{borderBottom: 0}} className="d-flex justify-content-start col-3"><span>Sản phẩm</span></li>
                      <li style={{borderBottom: 0}} className="d-flex justify-content-end col-3"><span>Số lượng</span></li> 
                      <li style={{borderBottom: 0}} className="d-flex justify-content-end col-3"><span>Đơn Giá</span></li>  
                      <li style={{borderBottom: 0}} className="d-flex justify-content-end col-3"><span>Thành Tiền</span></li>
                    </ul>
                  </li>
                  {this.renderBill(this.props.cartItems)}
                  <li>
                    <span>Phí giao hàng</span> <span>Free</span>
                  </li>
                  <li>
                    <span>Tổng cộng</span> <span>{currencyParser(total)} VNĐ</span>
                  </li>
                </ul>

                <button type="submit" disabled={total <= 0 || validInputs.length !== 5 ? true : false} className="btn essence-btn">
                  Đặt hàng
                </button>
              </div>
            </div>
            </form>
          </div>
        </div>
      </div>;
  }
}
export default withCartContext(CheckoutPage);