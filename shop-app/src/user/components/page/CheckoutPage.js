import React,{Component} from 'react'
import {getTotal} from './../cart/RightCart'
import {withCartContext} from './../hoc/withCartContext'
import {Input} from './../common/Input'
import {validator} from './../common/Validator'
import isEmpty from 'lodash/isEmpty'
class CheckoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validInputs: [],
      errors:{
        first_name:'',
        last_name: "",
        address: "",
        city: "",
        state: "",
        phone: "",
        email: ""
      },
      total: 0,
      first_name: "",
      last_name: "",
      address: "",
      city: "",
      state: "",
      phone: "",
      email: ""
    };
  }
  handleChange = (e,validate) =>{
    var name = e.target.name
    var value = e.target.value
    var errors = validator(value,name,validate)
    console.log(errors)
    var Inputs = this.state.validInputs
    if (isEmpty(errors) && !Inputs.includes(name)) {
      Inputs.push(name);
      console.log(Inputs)
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
          <span>{item.name}</span> <span>{item.quantity}</span>
          <span>{item.price} VNĐ</span>
        </li>
      );
    });
  };
  render() {
    const {
      total,
      errors,
      validInputs,
      first_name,
      last_name,
      address,
      city,
      state,
      phone,
      email
    } = this.state;
    console.log(validInputs)
    return <div className="checkout_area section-padding-80">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="checkout_details_area mt-50 clearfix">
                <div className="cart-page-heading mb-30">
                  <h5>Điền thông tin</h5>
                </div>

                <form onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="first_name">
                        Họ <span>*</span>
                      </label>
                      <Input type="text" className="form-control" id="first_name" name="first_name" value={first_name} handleChange={this.handleChange} validate={['required']}/>
                      <span className="text-danger">{errors.first_name}</span>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="last_name">
                        Tên <span>*</span>
                      </label>
                      <Input type="text" className="form-control" id="last_name" name="last_name" value={last_name} handleChange={this.handleChange} validate={['required']}/>
                      <span className="text-danger">{errors.last_name}</span>
                    </div>

                    <div className="col-12 mb-3">
                      <label htmlFor="address">
                        Địa chỉ <span>*</span>
                      </label>
                      <Input type="text" className="form-control mb-3" id="address" name="address" handleChange={this.handleChange} value={address} validate={['required','address']}/>
                     <span className="text-danger">{errors.address}</span>
                    </div>

                    <div className="col-12 mb-3">
                      <label htmlFor="city">
                        Tỉnh/Thành phố <span>*</span>
                      </label>
                      <Input type="text" className="form-control" id="city" name="city" handleChange={this.handleChange} value={city} validate={['required']}/>
                     <span className="text-danger">{errors.city}</span>
                    </div>
                    <div className="col-12 mb-3">
                      <label htmlFor="state">
                        Quận <span>*</span>
                      </label>
                      <Input type="text" className="form-control" id="state" name="state" handleChange={this.handleChange} value={state} validate={['required']}/>
                     <span className="text-danger">{errors.state}</span>
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
                        Email <span>*</span>
                      </label>
                      <Input type="email" className="form-control" id="email" name="email" handleChange={this.handleChange} value={email} validate={['required','email']}/>
                     <span className="text-danger">{errors.email}</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-5 ml-lg-auto">
              <div className="order-details-confirmation">
                <div className="cart-page-heading">
                  <h5>Hóa đơn đã đặt</h5>
                  <p>Chi tiết sản phẩm</p>
                </div>

                <ul className="order-details-form mb-4">
                  <li>
                    <span>Sản phẩm</span>
                    <span>Số lượng</span> <span>Giá</span>
                  </li>
                  {this.renderBill(this.props.cartItems)}
                  <li>
                    <span>Phí giao hàng</span> <span>Free</span>
                  </li>
                  <li>
                    <span>Tổng cộng</span> <span>{total}</span>
                  </li>
                </ul>

                <button disabled={total <= 0 || validInputs.length !== 7 ? true : false} className="btn essence-btn">
                  Đặt hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>;
  }
}
export default withCartContext(CheckoutPage);