export const verifyCodeTemplate: string = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
      body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
      }
      .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
      }
      .header {
          text-align: center;
          padding-bottom: 20px;
          border-bottom: 1px solid #dddddd;
      }
      .header img {
          max-width: 150px;
      }
      .content {
          padding: 20px;
          text-align: center;
      }
      .content h1 {
          color: #333333;
      }
      .content p {
          font-size: 16px;
          color: #666666;
          line-height: 1.5;
      }
      .verification-code {
          display: inline-block;
          font-size: 22px;
          color: #ffffff;
          background-color: #007BFF;
          padding: 10px 20px;
          border-radius: 8px;
          text-decoration: none;
          margin-top: 20px;
      }
      .footer {
          text-align: center;
          padding: 20px;
          font-size: 12px;
          color: #999999;
      }
  </style>
</head>
<body>
<div class="email-container">
  <div class="header">
    <img src="https://avatars.githubusercontent.com/u/69004745" alt="Company Logo">
  </div>
  <div class="content">
    <h1>이메일 인증</h1>
    <p>안녕하세요, {email}님</p>
    <p>회원가입을 계속 하시려면 아래 인증번호를 입력해 주세요:</p>
    <div class="verification-code">{verification_code}</div>
  </div>
  <div class="footer">
    &copy; 2024 Wink. All rights reserved.
  </div>
</div>
</body>
</html>
`;
