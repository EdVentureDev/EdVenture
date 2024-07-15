import nodemailer from 'nodemailer';
import otpGenerator from 'otp-generator';
import dotenv from 'dotenv';

dotenv.config();

let transporter = nodemailer.createTransport({
  host: "smtp.naver.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const otpMap = new Map(); // Map to store OTPs associated with user sessions

function generateOTP() {
    const otp = otpGenerator.generate(6, { digits: true, lowerCaseAlphabets:false, upperCaseAlphabets: false, specialChars: false});
    return otp; // Example OTP, replace with your actual OTP generation logic
}

export function sendOTP(userIdentifier: string,method:string) {
    const otp = generateOTP();
    const arr = otp.split("");
    otpMap.set(userIdentifier, otp);
    let setString1,setString2;
    if(method == "reset")   {
        setString1 = "Reset Your Password"
        setString2 = "Use this code to reset your password. This code will expire after 10 minutes"
    }
    else if(method == "signup")    {
        setString1 = "Verify Your Email"
        setString2 = "Use this code to sign up to EdVenture. This code will expire after 10 minutes"

    }

    const mailOptions = {
        from: 'ed-venture@naver.com',
        to: userIdentifier,
        subject: 'Your OTP',
        html: `<div style="display: flex;background-color:black; justify-content: center; align-items: center; height: 1000px; width: 1000px; color: grey; margin: 0 auto; flex-direction: column; font-family: 'Roboto', Arial, sans-serif; padding: 55px; overflow: auto;">
        <div style="border: 0.5px solid hsl(0, 0%, 30%); padding: 10px 15px; border-radius: 2px;">
          <svg width="155" height="21" viewBox="0 0 155 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M38.0352 11.5234H31.0273V16.3398H39.2188V19H27.7227V1.9375H39.1836V4.62109H31.0273V8.92188H38.0352V11.5234Z"
              fill="white" />
            <path
              d="M41.7266 12.5664C41.7266 11.6055 41.8359 10.7266 42.0547 9.92969C42.2812 9.13281 42.6094 8.44922 43.0391 7.87891C43.4688 7.30859 43.9883 6.86719 44.5977 6.55469C45.2148 6.24219 45.918 6.08594 46.707 6.08594C47.3711 6.08594 47.9531 6.20703 48.4531 6.44922C48.9609 6.68359 49.4102 7.01953 49.8008 7.45703V1H53.0703V19H50.1289L49.9648 17.6758C49.5664 18.168 49.0977 18.5508 48.5586 18.8242C48.0195 19.0977 47.3945 19.2344 46.6836 19.2344C45.9102 19.2344 45.2148 19.0742 44.5977 18.7539C43.9883 18.4258 43.4727 17.9766 43.0508 17.4062C42.6211 16.8359 42.293 16.1602 42.0664 15.3789C41.8398 14.5898 41.7266 13.7344 41.7266 12.8125V12.5664ZM44.9844 12.8125C44.9844 13.3438 45.0273 13.8398 45.1133 14.3008C45.207 14.7539 45.3555 15.1484 45.5586 15.4844C45.7617 15.8281 46.0234 16.0977 46.3438 16.293C46.6641 16.4883 47.0547 16.5859 47.5156 16.5859C48.0781 16.5859 48.543 16.4648 48.9102 16.2227C49.2852 15.9805 49.582 15.6484 49.8008 15.2266V10.0938C49.582 9.66406 49.2891 9.33203 48.9219 9.09766C48.5547 8.85547 48.0938 8.73438 47.5391 8.73438C47.0781 8.73438 46.6836 8.83594 46.3555 9.03906C46.0352 9.23438 45.7734 9.50391 45.5703 9.84766C45.3672 10.1992 45.2188 10.6094 45.125 11.0781C45.0312 11.5391 44.9844 12.0352 44.9844 12.5664V12.8125Z"
              fill="white" />
            <path
              d="M60.3477 19L55.1914 1.9375H58.8242L61.7188 13.082L62.0117 14.2305L62.3281 13.0703L65.2344 1.9375H68.8672L63.6992 19H60.3477Z"
              fill="white" />
            <path
              d="M77.0469 19.2344C76.0703 19.2344 75.1836 19.0742 74.3867 18.7539C73.5898 18.4336 72.9062 17.9961 72.3359 17.4414C71.7656 16.8945 71.3242 16.25 71.0117 15.5078C70.707 14.7578 70.5547 13.957 70.5547 13.1055V12.6367C70.5547 11.668 70.707 10.7852 71.0117 9.98828C71.3164 9.18359 71.7422 8.49219 72.2891 7.91406C72.8359 7.33594 73.4844 6.88672 74.2344 6.56641C74.9844 6.24609 75.8008 6.08594 76.6836 6.08594C77.5977 6.08594 78.4102 6.23828 79.1211 6.54297C79.8398 6.83984 80.4492 7.26172 80.9492 7.80859C81.4414 8.35547 81.8164 9.01562 82.0742 9.78906C82.332 10.5547 82.4609 11.4023 82.4609 12.332V13.7148H73.8594V13.75C73.9688 14.2578 74.1094 14.668 74.2812 14.9805C74.4531 15.2852 74.6836 15.5625 74.9727 15.8125C75.2695 16.0703 75.6094 16.2695 75.9922 16.4102C76.375 16.5508 76.793 16.6211 77.2461 16.6211C77.8867 16.6211 78.5078 16.5 79.1094 16.2578C79.7109 16.0156 80.1992 15.6523 80.5742 15.168L82.2031 16.9258C81.7891 17.5117 81.1328 18.043 80.2344 18.5195C79.3359 18.9961 78.2734 19.2344 77.0469 19.2344ZM76.6602 8.72266C76.293 8.72266 75.957 8.78906 75.6523 8.92188C75.3477 9.04688 75.082 9.23047 74.8555 9.47266C74.6211 9.71484 74.4258 10.0039 74.2695 10.3398C74.1133 10.6758 73.9961 11.0508 73.918 11.4648H79.2617V11.207C79.2617 10.8633 79.1992 10.5391 79.0742 10.2344C78.9492 9.92969 78.7773 9.66406 78.5586 9.4375C78.3398 9.21875 78.0703 9.04688 77.75 8.92188C77.4375 8.78906 77.0742 8.72266 76.6602 8.72266Z"
              fill="white" />
            <path
              d="M85.3086 19V6.32031H88.2617L88.4609 8.07812C88.625 7.84375 88.8047 7.62891 89 7.43359C89.1953 7.23828 89.4023 7.0625 89.6211 6.90625C89.9961 6.64062 90.4062 6.4375 90.8516 6.29688C91.2969 6.15625 91.7695 6.08594 92.2695 6.08594C92.9102 6.08594 93.4961 6.17969 94.0273 6.36719C94.5586 6.55469 95.0195 6.85156 95.4102 7.25781C95.793 7.67188 96.0898 8.20312 96.3008 8.85156C96.5195 9.49219 96.6289 10.2734 96.6289 11.1953V19H93.3711V11.2422C93.3711 10.7422 93.3125 10.332 93.1953 10.0117C93.0859 9.68359 92.9258 9.42578 92.7148 9.23828C92.5039 9.05078 92.25 8.92188 91.9531 8.85156C91.6562 8.77344 91.3203 8.73438 90.9453 8.73438C90.6328 8.73438 90.3438 8.76953 90.0781 8.83984C89.8203 8.91016 89.5898 9.01562 89.3867 9.15625C89.2227 9.25781 89.0742 9.37891 88.9414 9.51953C88.8086 9.66016 88.6875 9.81641 88.5781 9.98828V19H85.3086Z"
              fill="white" />
            <path
              d="M105.699 3.21484V6.32031H110.434V8.72266H105.699V14.1719C105.699 14.6328 105.75 15.0195 105.852 15.332C105.961 15.6367 106.113 15.8789 106.309 16.0586C106.504 16.2461 106.738 16.3789 107.012 16.457C107.293 16.5352 107.605 16.5742 107.949 16.5742C108.199 16.5742 108.453 16.5625 108.711 16.5391C108.977 16.5156 109.23 16.4844 109.473 16.4453C109.707 16.4141 109.926 16.3789 110.129 16.3398C110.34 16.3008 110.52 16.2617 110.668 16.2227L110.984 18.4609C110.758 18.5938 110.492 18.7109 110.188 18.8125C109.883 18.9062 109.559 18.9844 109.215 19.0469C108.871 19.1094 108.512 19.1562 108.137 19.1875C107.77 19.2266 107.406 19.2461 107.047 19.2461C106.352 19.2461 105.719 19.1562 105.148 18.9766C104.586 18.7891 104.105 18.5 103.707 18.1094C103.301 17.7266 102.988 17.2383 102.77 16.6445C102.551 16.043 102.441 15.3242 102.441 14.4883V8.72266H99.5469V6.32031H102.441V3.21484H105.699Z"
              fill="white" />
            <path
              d="M122.41 19L122.223 17.2188C121.793 17.8516 121.273 18.3477 120.664 18.707C120.062 19.0664 119.402 19.2461 118.684 19.2461C118.027 19.2461 117.426 19.1445 116.879 18.9414C116.332 18.7383 115.863 18.4141 115.473 17.9688C115.082 17.5312 114.777 16.9727 114.559 16.293C114.348 15.6055 114.242 14.7812 114.242 13.8203V6.32031H117.5V13.8438C117.5 14.3594 117.535 14.793 117.605 15.1445C117.684 15.4961 117.805 15.7773 117.969 15.9883C118.133 16.207 118.348 16.3633 118.613 16.457C118.879 16.5508 119.203 16.5977 119.586 16.5977C119.93 16.5977 120.238 16.5625 120.512 16.4922C120.793 16.4219 121.039 16.3203 121.25 16.1875C121.43 16.0703 121.59 15.9297 121.73 15.7656C121.871 15.6016 121.992 15.418 122.094 15.2148V6.32031H125.363V19H122.41Z"
              fill="white" />
            <path
              d="M137.656 6.08594C138.148 6.08594 138.602 6.12109 139.016 6.19141C139.438 6.25391 139.777 6.32422 140.035 6.40234L139.555 9.64844C139.125 9.54688 138.684 9.47266 138.23 9.42578C137.785 9.37109 137.359 9.34375 136.953 9.34375C136.531 9.34375 136.148 9.38281 135.805 9.46094C135.469 9.53125 135.168 9.64062 134.902 9.78906C134.582 9.96094 134.309 10.1797 134.082 10.4453C133.855 10.7109 133.668 11.0234 133.52 11.3828V19H130.262V6.32031H133.297L133.426 8.11328L133.449 8.39453C133.965 7.67578 134.582 7.11328 135.301 6.70703C136.02 6.29297 136.805 6.08594 137.656 6.08594Z"
              fill="white" />
            <path
              d="M149.117 19.2344C148.141 19.2344 147.254 19.0742 146.457 18.7539C145.66 18.4336 144.977 17.9961 144.406 17.4414C143.836 16.8945 143.395 16.25 143.082 15.5078C142.777 14.7578 142.625 13.957 142.625 13.1055V12.6367C142.625 11.668 142.777 10.7852 143.082 9.98828C143.387 9.18359 143.812 8.49219 144.359 7.91406C144.906 7.33594 145.555 6.88672 146.305 6.56641C147.055 6.24609 147.871 6.08594 148.754 6.08594C149.668 6.08594 150.48 6.23828 151.191 6.54297C151.91 6.83984 152.52 7.26172 153.02 7.80859C153.512 8.35547 153.887 9.01562 154.145 9.78906C154.402 10.5547 154.531 11.4023 154.531 12.332V13.7148H145.93V13.75C146.039 14.2578 146.18 14.668 146.352 14.9805C146.523 15.2852 146.754 15.5625 147.043 15.8125C147.34 16.0703 147.68 16.2695 148.062 16.4102C148.445 16.5508 148.863 16.6211 149.316 16.6211C149.957 16.6211 150.578 16.5 151.18 16.2578C151.781 16.0156 152.27 15.6523 152.645 15.168L154.273 16.9258C153.859 17.5117 153.203 18.043 152.305 18.5195C151.406 18.9961 150.344 19.2344 149.117 19.2344ZM148.73 8.72266C148.363 8.72266 148.027 8.78906 147.723 8.92188C147.418 9.04688 147.152 9.23047 146.926 9.47266C146.691 9.71484 146.496 10.0039 146.34 10.3398C146.184 10.6758 146.066 11.0508 145.988 11.4648H151.332V11.207C151.332 10.8633 151.27 10.5391 151.145 10.2344C151.02 9.92969 150.848 9.66406 150.629 9.4375C150.41 9.21875 150.141 9.04688 149.82 8.92188C149.508 8.78906 149.145 8.72266 148.73 8.72266Z"
              fill="white" />
            <path
              d="M0 2C0 0.89543 0.895431 0 2 0H21C22.1046 0 23 0.895431 23 2V19C23 20.1046 22.1046 21 21 21H2C0.89543 21 0 20.1046 0 19V2Z"
              fill="black" />
            <path
              d="M17.6033 4.75C16.8842 4.4875 16.0939 4.375 15.3361 4.375C14.0729 4.375 12.7126 4.675 11.7733 5.5C10.834 4.675 9.4737 4.375 8.21055 4.375C6.94739 4.375 5.58706 4.675 4.64779 5.5V16.4875C4.64779 16.675 4.80974 16.8625 4.97168 16.8625C5.03646 16.8625 5.06885 16.825 5.13362 16.825C6.00812 16.3375 7.27127 16 8.21055 16C9.4737 16 10.834 16.3 11.7733 17.125C12.6478 16.4875 14.2348 16 15.3361 16C16.4049 16 17.5061 16.225 18.413 16.7875C18.4778 16.825 18.5101 16.825 18.5749 16.825C18.7369 16.825 18.8988 16.6375 18.8988 16.45V5.5C18.5101 5.1625 18.0891 4.9375 17.6033 4.75ZM17.6033 14.875C16.8907 14.6125 16.1134 14.5 15.3361 14.5C14.2348 14.5 12.6478 14.9875 11.7733 15.625V7C12.6478 6.3625 14.2348 5.875 15.3361 5.875C16.1134 5.875 16.8907 5.9875 17.6033 6.25V14.875Z"
              fill="white" />
            <path
              d="M15.3361 8.87503C15.9061 8.87503 16.4567 8.94253 16.9555 9.07003V7.93003C16.4437 7.81753 15.8931 7.75003 15.3361 7.75003C14.2348 7.75003 13.2373 7.96753 12.4211 8.37253V9.61753C13.1531 9.13753 14.1701 8.87503 15.3361 8.87503Z"
              fill="black" />
            <path
              d="M12.4211 10.3675V11.6125C13.1531 11.1325 14.1701 10.87 15.3361 10.87C15.9061 10.87 16.4567 10.9375 16.9555 11.065V9.92501C16.4437 9.81251 15.8931 9.74501 15.3361 9.74501C14.2348 9.74501 13.2373 9.97001 12.4211 10.3675Z"
              fill="black" />
            <path
              d="M15.3361 11.7475C14.2348 11.7475 13.2373 11.965 12.4211 12.37V13.615C13.1531 13.135 14.1701 12.8725 15.3361 12.8725C15.9061 12.8725 16.4567 12.94 16.9555 13.0675V11.9275C16.4437 11.8075 15.8931 11.7475 15.3361 11.7475Z"
              fill="black" />
          </svg>
        </div>
        <p style="font-size: 36px; color: hsl(0, 0%, 90%); letter-spacing: 1px; margin-bottom: 0;">${setString1}</p>
        <p style="color: grey; font-size: 16px; letter-spacing: 1px; margin-top: 20px;">${setString2}</p>
        <div style="border: 1px solid grey; border-radius: 5px; padding: 10px 50px; margin: 20px; height: auto; box-sizing: border-box; display: flex; align-items: center; justify-content: center; flex-direction: column;">
          <p style="color: grey;  font-size: 13px; letter-spacing: 3px; margin: 5px;">YOUR OTP IS: </p>
          <p style="color: white; font-size: 32px; margin: 5px; display: flex;">
            <span style="margin-right: 60px;">${arr[0]}</span>
            <span style="margin-right: 60px;">${arr[1]}</span>
            <span style="margin-right: 60px;">${arr[2]}</span>
            <span style="margin-right: 60px;">${arr[3]}</span>
            <span style="margin-right: 60px;">${arr[4]}</span>
            <span>${arr[5]}</span>
          </p>
        </div>
        <p style="color: grey; font-size: 13px; letter-spacing: 3px; margin-top: 5px;"> Please do not share this OTP with anyone.</p>
      </div>`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error occurred:', error);
        }
        console.log('Message sent:', info.response);
    });

    console.log(`OTP ${otp} sent to user ${userIdentifier}`); // Example, replace with your actual OTP sending logic
    return otp;
}

export function getGeneratedOTP(userIdentifier: string) {
    return otpMap.get(userIdentifier);
}


