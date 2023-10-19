using AuthenticationAPI.Models;

namespace AuthenticationAPI.UtilityService
{
    public interface IEmailService
    {
        void SendEmail(EmailModel emailModel);
    }
}
