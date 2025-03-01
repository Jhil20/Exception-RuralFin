import razorpy from 'razorpay'

const instance = new razorpy({
    key_id: process.env.RAZORPAY_ID,
    key_secret:process.env.RAZORPAY_SECRET,
});

export default instance;
  