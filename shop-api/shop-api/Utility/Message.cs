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
        public static string messageInsertSuccessfully= "Insert thành công !";
        public static string messageInsertFailed= "Insert thất bại !";
        public static string messageUpdateFailed = "Update thất bại !";
        public static string messageUpdateSuccess = "Update thành công !";
        public static string messageDeleteFailed = "Delete thất bại !";
        public static string messageAddReceiptSuccess = "Thêm receipt thành công !";
        public static string messageAddReceiptfailed = "Thêm receipt thất bại !";
        public static string messageAddInvalidParamter = "Parameter không hợp lệ !";
        public static string messageDateInCorrectFormat = "Định dạng ngày không hợp lệ ! Ex hợp lệ: yyyy-MM-dd";
    }
}