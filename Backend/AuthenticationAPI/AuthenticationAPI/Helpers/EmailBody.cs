namespace AuthenticationAPI.Helpers
{
    public class EmailBody
    {
        public static string EmailStringBody(string email, string emailToken)
        {
            return $@"
<!DOCTYPE html>
<html>
<head>
</head>
<body style=""margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;"">
    <div style=""height: auto; background: linear-gradient(to top, #c9c9ff 50%, #6e6ef6 90%) no-repeat; width: 400px; padding: 30px; margin: 0 auto;"">
        <div style=""text-align: center;"">
            <h1 style=""color: #0d6efc;"">Şifrenizi Sıfırlayın</h1>
            <hr>
            <p>Şifre sıfırlama talebiniz için bu e-postayı aldınız.</p>
            <p>Lütfen yeni bir şifre seçmek için aşağıdaki düğmeye tıklayın.</p>
            <a href=""http://localhost:4200/reset?email={email}&code={emailToken}"" style=""background: #0d6efc; padding: 10px 20px; border: none; color: white; border-radius: 4px; text-decoration: none;"">
                Şifreyi Sıfırla
            </a>
            <p>İyi Günler Dilerim</p>
            <p>Yasin Karaçam</p>
        </div>
    </div>
</body>
</html>
";
        }
    }
}
