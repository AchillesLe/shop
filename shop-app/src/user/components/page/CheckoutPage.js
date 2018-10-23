import React,{Component} from 'react'
import { CartConsumer } from '../context/CartContext';
import {getTotal} from './../cart/RightCart'
import {withCartContext} from './../hoc/withCartContext'
class CheckoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invalid: true,
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
  handleChange = e =>{

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
        <li>
          <span>{item.name}</span> <span>{item.quantity}</span>
          <span>{item.price} VNĐ</span>
        </li>
      );
    });
  };
  render() {
    const {
      invalid,
      total,
      first_name,
      last_name,
      address,
      city,
      state,
      phone,
      email
    } = this.state;
    return (
      <div className="checkout_area section-padding-80">
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
                      <input
                        type="text"
                        className="form-control"
                        id="first_name"
                        name="first_name"
                        value={first_name}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="last_name">
                        Tên <span>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="last_name"
                        name="last_name"
                        value={last_name}
                        onChange={this.handleChange}
                        required
                      />
                    </div>

                    <div className="col-12 mb-3">
                      <label htmlFor="address">
                        Địa chỉ <span>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control mb-3"
                        id="address"
                        name="address"
                        onChange={this.handleChange}
                        value={address}
                      />
                    </div>

                    <div className="col-12 mb-3">
                      <label htmlFor="city">
                        Tỉnh/Thành phố <span>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        name="city"
                        onChange={this.handleChange}
                        value={city}
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <label htmlFor="state">
                        Quận <span>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="state"
                        name="state"
                        onChange={this.handleChange}
                        value={state}
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <label htmlFor="phone">
                        Số điện thoại <span>*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="phone"
                        name="phone"
                        min="0"
                        onChange={this.handleChange}
                        value={phone}
                      />
                    </div>
                    <div className="col-12 mb-4">
                      <label htmlFor="email">
                        Email <span>*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        onChange={this.handleChange}
                        value={email}
                      />
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

                <button
                  disabled={total > 0 || invalid ? true : false}
                  className="btn essence-btn"
                >
                  Đặt hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withCartContext(CheckoutPage);