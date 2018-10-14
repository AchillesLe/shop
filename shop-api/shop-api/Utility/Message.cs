using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace shop_api.Utility
{
    public class Message
    {
        public static string messageRequireInvalid = "Yêu cầu không hợp lệ";
        public static string messageDeleteSuccessfully = "Xóa thành công !";
        public static string messageDeleteYourSelf= "Bạn không thể xóa chính bạn !";
        public static string messageNoEnoughRole= "Bạn không đủ quyền !";
        public static string messageNotFound= "Không tìm thấy !";
        public static string messageNotValidRequest= "Request không hợp lệ !";
        public static string messageNotValidToken= "Token không hợp lệ !";
        public static string messageUserNameExist= "Username đã tồn tại !";
        public static string messageCMNDExist= "CMND đã tồn tại !";
        public static string messageUploadSuccessfully= "Upload file thành công !";
        public static string messageUploadSuccessfailed= "Upload file thất bại !";
        public static string messageNotAuthenticate= "Không thể xác thực !";
    }
}