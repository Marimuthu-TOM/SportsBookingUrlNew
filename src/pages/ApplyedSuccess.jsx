
import { useState, useEffect, useRef } from "react";
import { waitingListSuccessDetails } from "../services/endpointService";
import moment from "moment";
import promoCodeicon from "./../assets/promo_code_member_app.svg";
import MasterCardIcon from "./../assets/MasterCardNewIcon.svg";
import KnetIcom from "./../assets/KnetNewIcom.svg";
import tomIcon from "./../assets/Group 21152 (1).png";
import sucess from "./../assets/sucess.svg";
import tom_deal_icons from "../assets/tom_deal_icons.png";



export default function ApplyedSuccess() {
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    getPaymentSuccessDetails();
  }, []);


  const getPaymentSuccessDetails = async () => {
    try {
      const payloadData = {
        "bookingId": localStorage.getItem("bookingId")
      }
      const response = await waitingListSuccessDetails(payloadData);
      setPaymentDetails(response.data[0]);
      setName(response.data.map(item => item.memberName)?.join(", "));
      console.log("Vendor Data:", response.data);
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
        <h2 className="text-xl font-bold text-[#5b0f3c] mt-4">
          Applied Successful!
        </h2>
        <p className="text-sm font-medium text-[#5b0f3c] mt-3">
          A confirmation mail has been sent to
        </p>
        <p className="text-sm font-bold text-[#5b0f3c] mt-3">
          {paymentDetails?.email}
        </p>

        {/* ORDER DETAILS */}
        <div className="mt-12 bg-[#F8E0D8] rounded-2xl shadow-xl overflow-hidden">

          {/* HEADER */}
          <div className="flex justify-between items-center p-4">
            <div>
              <img src={tomIcon} className="w-[50%]" alt="" />
            </div>
          </div>

          {/* DETAILS */}
          <div className="bg-white text-sm">
            <div className="px-4 pt-4">
              {[
                ["Booking ID", paymentDetails?.waitingListBookId],
                ["Name", name],
                ["Date & Time", moment(paymentDetails?.created_on).format("DD-MMM-YY HH:mm")],
                ["No. of Sessions", paymentDetails?.sessions],
                ["Academy", paymentDetails?.trainingCenterName],
                ["Location", paymentDetails?.vendorAddress],
              ].map(([label, value]) => (
                ((value != "")) &&
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
              <div className="text-md">
                Your request sent successfully, Thank you for your patient our Sanjay Academy will respond to your request shortly!
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
