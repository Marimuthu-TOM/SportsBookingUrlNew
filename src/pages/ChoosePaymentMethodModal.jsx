import { useEffect, useState } from "react";
import MasterCardIcon from "./../assets/MasterCardNewIcon.svg";
import KnetIcom from "./../assets/KnetNewIcom.svg";
import moment from "moment";
import useAppStore from "../store/useAppStore";
import { insertBooking } from "../services/endpointService";

export default function ChoosePaymentMethodModal({ isOpen, onClose, bookingData }) {
    const { vendorData, selectedPackage, selectedUser, selectedDate, workingHoursDetails, promoCodeDetails } = useAppStore();
    const [method, setMethod] = useState("card");

    if (!isOpen) return null;

    const submitInsertBooking = async () => {
        const patientIds = selectedUser.map(item => item.patientid);
        const names = selectedUser.map(item => item.name);
        const fromDate = selectedDate[0];
        const toDate = selectedDate[selectedDate.length - 1];

        console.log("bookingData Dates:", bookingData);
        const bookingPayload = {
            "patientId": "118",
            "trainingCenterId": vendorData?.id || "",
            "packageId": selectedPackage?.packageId || "",
            "fromDate": fromDate,
            "toDate": toDate,
            "bookedDate": moment(new Date()).format("YYYY-MM-DD HH:MM:ss"),
            "amount": bookingData?.billingAmt || "",
            "paymentStatus": "1",
            "paymentType": "2",
            "isMember": 2,
            "tempMemberName": names?.join(','),
            "dealid": selectedPackage?.dealId || "",
            "dealoption": selectedPackage?.dealOption || "",
            "dealvalue": selectedPackage?.dealValue || "",
            "paymentGatewayName": method === "knet" ? "KNET" : "MASTERCARD",
            "membersInvolved": patientIds?.join(','),
            "Selected_dates": selectedDate?.join(','),
            "Selected_time": JSON.stringify(workingHoursDetails),
            "waitingListId": 0,
            "p_family_promo_id": promoCodeDetails?.is_family_promo ? promoCodeDetails?.id : '',
            "p_general_promo_id": promoCodeDetails?.is_general_promo ? promoCodeDetails?.id : '',
            "p_celebrity_promo_id": promoCodeDetails?.is_celebrity_promo ? promoCodeDetails?.id : '',
            "paymentid": "100600520000001424",
            "referenceid": "600520000157329",
            "order_id": "tomwwkczh18ypf"
        }

        console.log(bookingPayload);

        const response = await insertBooking(bookingPayload);
        console.log("Insert Booking Response:", response.data[0]);

    };

    return (
        <div className="fixed inset-0 z-50 flex items-end bg-black/40">
            {/* Bottom Sheet */}
            <div className="w-full bg-white rounded-t-3xl px-5 pt-3 pb-6">
                {/* Handle */}
                <div className="w-12 h-1.5 bg-orange-300 rounded-full mx-auto mb-4" />

                {/* Title */}
                <h2 className="text-lg font-semibold text-[#510f30] mb-5">
                    Choose Payment Method
                </h2>

                {/* Payment Options */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {/* Credit Card */}
                    <PaymentOption
                        selected={method === "card"}
                        onClick={() => setMethod("card")}
                        label="Credit Card"
                        icon={MasterCardIcon}
                    />

                    {/* KNET */}
                    <PaymentOption
                        selected={method === "knet"}
                        onClick={() => setMethod("knet")}
                        label="KNET"
                        icon={KnetIcom}
                    />
                </div>

                {/* Continue Button */}
                <button onClick={() => submitInsertBooking()} className="w-full bg-[#510f30] text-white py-3 rounded-full font-semibold">
                    Continue to Pay
                </button>
            </div>
        </div>
    );
}

/* ---------- Small Component ---------- */

const PaymentOption = ({ selected, onClick, label, icon }) => (
    <button
        onClick={onClick}
        className={`border rounded-2xl p-4 flex flex-col items-center gap-3
      ${selected ? "border-[#f7a07a]" : "border-gray-300"}`}>
        <div className="w-full">
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center
        ${selected ? "border-[#510f30]" : "border-gray-300"}`}>
                {selected && (
                    <div className="w-3 h-3 bg-[#510f30] rounded-full" />
                )}
            </div>
        </div>

        <div className="text-3xl"><img src={icon} alt="" /></div>

        <span className="text-sm font-medium text-[#510f30]">
            {label}
        </span>
    </button>
);
