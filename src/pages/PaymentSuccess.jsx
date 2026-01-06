
import { useState, useEffect, useRef } from "react";
import { paymentSuccessDetails } from "../services/endpointService";
import moment from "moment";
import promoCodeicon from "./../assets/promo_code_member_app.svg";
import MasterCardIcon from "./../assets/MasterCardNewIcon.svg";
import KnetIcom from "./../assets/KnetNewIcom.svg";
import tomIcon from "./../assets/Group 21152 (1).png";
import sucess from "./../assets/sucess.svg";
import tom_deal_icons from "../assets/tom_deal_icons.png";



export default function PaymentSuccess() {
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [totalAmt, setTotalAmt] = useState(null);

  useEffect(() => {
    getPaymentSuccessDetails();
  }, []);


  const getPaymentSuccessDetails = async () => {
    try {
      const payloadData = {
        "bookingId": "875"
      }
      const response = await paymentSuccessDetails(payloadData);
      setPaymentDetails(response.data[0]);
      const de = response.data[0].members_involved.split(',');
      const dss = de.length * response.data[0].package_cost;
      setTotalAmt(dss);

      console.log("Vendor Data:", response.data[0]);
    } catch (error) {
      console.log("error:", error);
    }

  }

  return (
    <div className="min-h-screen bg-white flex justify-center p-4">
      <div className="w-full text-center">

        {/* LOGO */}
        <div className="flex justify-center my-6">
          <img src={tomIcon} alt="" />
        </div>

        {/* CHECK ICON */}
        <div className="my-6 flex justify-center">
          <img src={sucess} />
        </div>

        {/* TEXT */}
        <h2 className="text-xl font-semibold text-[#5b0f3c] mt-4">
          Payment Successful!
        </h2>
        <p className="text-sm font-medium text-[#5b0f3c] mt-3">
          A confirmation mail has been sent to
        </p>
        <p className="text-sm font-medium text-[#5b0f3c] mt-3">
          {paymentDetails?.email}
        </p>

        {/* ORDER DETAILS */}
        <div className="mt-12 bg-[#F8E0D8] rounded-2xl shadow-xl overflow-hidden">

          {/* HEADER */}
          <div className="flex justify-between items-center p-4">
            <div>
              <img src={tomIcon} className="w-[50%]" alt="" />
            </div>
            <div className="flex gap-2">
              {(paymentDetails?.tom_or_sp == 1) &&
                <button className="w-12 h-10 flex justify-center bg-white rounded-xl shadow items-center">
                  <img className="bg-white w-[70%] h-[70%]" src={tom_deal_icons} alt="" />
                </button>
              }
              {((paymentDetails?.general_promo_discount) || (paymentDetails?.family_promo_discount) || (paymentDetails?.celebrity_discount)) &&
                <button className="w-10 h-10 flex justify-center bg-white rounded-xl shadow items-center">
                  <img className="bg-white w-[60%] h-[60%]" src={promoCodeicon} alt="" />
                </button>
              }
              <button className="w-12 h-10 flex justify-center bg-white rounded-xl shadow items-center">
                {paymentDetails?.payment_gateway == 1 ?
                  <img className="bg-white w-[70%] h-[70%]" src={MasterCardIcon} alt="" /> :
                  <img className="bg-white w-[60%] h-[60%]" src={KnetIcom} alt="" />
                }
              </button>
            </div>
          </div>

          {/* DETAILS */}
          <div className="bg-white text-sm">
            <div className="px-4 pt-4">
              {[
                ["Order ID", paymentDetails?.order_id],
                ["Name", paymentDetails?.memberName],
                ["Date & Time", moment(new Date()).format("DD-MMM-YY HH:MM")],
                ["No. of Sessions", paymentDetails?.sessions],
                ["Location", paymentDetails?.vendorAddress],
              ].map(([label, value]) => (
                <div className="flex justify-between text-sm mb-3">
                  <div className="flex justify-between w-[40%]">
                    <span className="font-bold text-[#510f30]">{label}</span>
                    <span className="font-bold text-[#510f30]">:</span>
                  </div>
                  <div className="w-[60%] text-left pl-2">
                    <span className="font-semibold text-[#510f30]">{value}</span>
                  </div>
                </div>
              ))}
            </div>

            <hr className="my-3" />
            <div className="px-4 pb-4">
              <div className="text-md mb-3">
                <div className="flex justify-between">
                  <span className="font-bold text-[#510f30]">Total Billing Amount</span>
                </div>
                <div className="text-left">
                  {paymentDetails?.deal_amount == null &&
                    <span className="font-semibold text-[#FF0068] text-2xl">{paymentDetails?.amount?.toFixed(2)} <span className="text-[9px]">KWD</span></span>
                  }
                  {paymentDetails?.deal_amount != null &&
                    <span className="font-semibold text-[#FF0068]">
                      <span className="pl-1 text-lg"><s>{totalAmt?.toFixed(2)}</s></span>
                      <span className="pl-1 text-2xl">{paymentDetails?.amount?.toFixed(2)} </span>
                      <span className="text-[9px]"> KWD</span>
                    </span>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
