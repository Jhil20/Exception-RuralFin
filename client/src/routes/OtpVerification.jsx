

const OtpVerification = ({ fullPhone,auth }) => {

  // useEffect(() => {
  //   toast.success("OTP sent successfully to " + phoneNumber);
  // }, [phoneNumber]);
  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: (response) => {
          console.log("reCAPTCHA solved:", response);
        },
        "expired-callback": () => {
          console.warn("reCAPTCHA expired. Please try again.");
        },
      });

      window.recaptchaVerifier.render().then((widgetId) => {
        window.recaptchaWidgetId = widgetId;
      });
    }
  }, []);



  
  

  
};

export default OtpVerification;
