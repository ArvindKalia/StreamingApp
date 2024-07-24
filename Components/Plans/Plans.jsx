import { Card, Button } from "../../Tailwind";
import axios from "axios";
import useRazorpay from "react-razorpay";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWR from "swr";

const Plans = ({ plans }) => {
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session);
  const [Razorpay] = useRazorpay();

  const getData = async (url) => {
    try {
      const response = await axios({
        method: "get",
        url,
      });
      return response.data.data;
    } catch (error) {
      return null;
    }
  };
  const { data: userPlan, error: userError } = useSWR(
    session ? `/api/purchase/${session.user.email}` : null,
    session ? getData : null,
    { refreshInterval: 5000 }
  );

  const colors = [
    {
      backgroundColor: "#FF3CAC",
      backgroundImage:
        "linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)",
      color: "white",
    },
    {
      backgroundColor: "##F4D03F",
      backgroundImage: "linear-gradient(132deg, #F4D03F 0%, #16A085 100%)",
      color: "white",
    },
    {
      backgroundColor: "#FFFFFF",
      backgroundImage:
        "linear-gradient(180deg, #FFFFFF 0%, #6284FF 50%, #FF0000 100%)",
      color: "white",
    },
    {
      backgroundColor: "##F4D03F",
      backgroundImage: "linear-gradient(132deg, #F4D03F 0%, #16A085 100%)",
      color: "white",
    },
  ];
  const purchaseEntry = async (data) => {
    try {
      const response = await axios({
        method: "post",
        url: "/api/purchase",
        data,
      });
    } catch (error) {
    //   console.log(error.response.data);
    }
  };
  const purchase = async (item) => {
    if (!session) {
      return router.push("/login");
    }
    if(session.user.role === "ADMIN")
    {
      return router.push("/");

    }
    const order = await axios({
      method: "post",
      url: "/api/razorpay/order",
      data: {
        amount: item.amount,
      },
    });
    const { id } = order.data.data;
    const options = {
      key: process.env.NEXT_PUBLIC_RAZOR_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: item.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Streaming App",
      description: item.title.toUpperCase() + "PLAN",
      image: "/a.jpg",
      order_id: id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
      handler: function (response) {
        purchaseEntry({
          email: session.user.email,
          planId: item._id,
          emi: item.emi,
          paymentID: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature,
        });
      },
      prefill: {
        name: session.user.name,
        email: session.user.email,
      },
      theme: {
        color: "#3399cc",
      },
    };
    const razor = new Razorpay(options);
    razor.open();
  };
  const AllPlans = ({ item, index }) => {
    const plan = (
      <>
        <Card className="relative text-center shadow-lg rounded-lg border p-4">
          <h1 className="mt-16 text-6xl font-bold">
            <i className="fa fa-rupee"></i>
            {item.amount}
          </h1>
          <p className="capitalize text-gray-400 text-xl">{item.emi}</p>
          <div
            className="my-5"
            style={{ borderBottom: "1px dashed #ccc" }}
          ></div>
          <pre
            style={{
              fontFamily: "verdana",
              lineHeight: "40px",
              color: "#444",
            }}
          >
            {item.desc}
          </pre>
          {(userPlan && userPlan.plan.planId) === item._id ? 
          (userPlan.diff) >=0
          ?
          <h1 className="text-3xl font-bold mt-3 text-teal-500">{`${userPlan.diff} Days Remaining`}</h1>
           : 
           <Button
              style={{
                background: "red",
                color: "white",
                ...colors[index],
              }}
              className="rounded-lg my-5"
              theme="secondary"
            >
              <div
                className="text-2xl font-bold uppercase"
                style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translate(-50%,0)",
                  borderBottomLeftRadius: "20px",
                  borderBottomRightRadius: "20px",
                  padding: "10px 40px",
                  background: "red",
                  color: "white",
                  ...colors[index],
                }}
                onClick={() => purchase(item)}
              >
                {item.title}
              </div>
              BUY NOW
            </Button>
           :
           (
            <Button
              style={{
                background: "red",
                color: "white",
                ...colors[index],
              }}
              className="rounded-lg my-5"
              theme="secondary"
            >
              <div
                className="text-2xl font-bold uppercase"
                style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translate(-50%,0)",
                  borderBottomLeftRadius: "20px",
                  borderBottomRightRadius: "20px",
                  padding: "10px 40px",
                  background: "red",
                  color: "white",
                  ...colors[index],
                }}
                onClick={() => purchase(item)}
              >
                {item.title}
              </div>
              BUY NOW
            </Button>
          )}
        </Card>
      </>
    );
    return plan;
  };
  const design = (
    <>
      <div className="grid sm:grid-cols-3 gap-8 sm:gap-12 p-8 sm:p-16">
        {plans &&
          plans.map((item, index) => {
            return <AllPlans key={index} item={item} index={index} />;
          })}
      </div>
    </>
  );
  return design;
};
export default Plans;
