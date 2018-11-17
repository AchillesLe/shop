using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;

namespace shop_api.Utility
{
    public class SendMail
    {
        SmtpClient client = new SmtpClient();
        string EmailHost = "smtp.gmail.com";
        int Port = 587;
        string MailFrom = "yuriboykasgu@gmail.com";
        string Pass = "haithanhf";
        public SendMail()
        {
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.EnableSsl = true;
            client.Host = EmailHost;
            client.Port = Port;
            System.Net.NetworkCredential credentials =
                new System.Net.NetworkCredential(MailFrom, Pass);
            client.UseDefaultCredentials = false;
            client.Credentials = credentials;
        }
        public void sendMail(string mailFrom,string mailTo,string subject,string body,bool isHTML = true)
        {
            try
            {
                string emailFrom = mailFrom != "" ? mailFrom : MailFrom;
                MailMessage msg = new MailMessage();
                msg.From = new MailAddress(emailFrom);
                msg.To.Add(new MailAddress(mailTo));
                msg.Subject = subject;
                msg.IsBodyHtml = isHTML;
                msg.Body = string.Format(body);
                client.Send(msg);
            }
            catch (Exception ex)
            {
                return;
            }
           
        }
    }
}