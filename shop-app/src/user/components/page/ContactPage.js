import React,{Component} from 'react'
class ContactPage extends Component{
    render(){
        return(
            <div className="contact-area d-flex align-items-center">

            <div className="google-map">
                <div style={{ height: '100vh', width: '100%' }}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6662795441675!2d106.67999431383568!3d10.760182262438011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1c81c64183%3A0xd3109d7a7a8f753c!2zMjczIEFuIETGsMahbmcgVsawxqFuZywgUGjGsOG7nW5nIDMsIFF14bqtbiA1LCBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2sus!4v1542175121775" width="100%" height="100%" frameborder="0" style={{border:0}} allowfullscreen></iframe>
                </div>
            </div>
    
            <div className="contact-info">
                <h2>Liên hệ chúng tôi</h2>

                <div className="contact-address mt-50">
                    <p><span>Địa chỉ:</span> 273 An Dương Vương, Phường 3, Quận 5, TPHCM VN</p>
                    <p><span>Hotlline:</span> +12 34 567 890</p>
                    <p> <i>(Thời gian hoạt động của tổng đài là 8h00 đến 17h00, từ thứ 2 đến thứ 7)</i></p>
                    <p><span>Email CSKH:</span>contact@toystore.com</p>
                </div>
            </div>
    
            </div>
        )
    }
}
export default ContactPage