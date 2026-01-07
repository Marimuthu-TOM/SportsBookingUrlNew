import { useState, useEffect, useRef } from "react";
import useAppStore from "../store/useAppStore";
import NamesInlinePopup from "../components/NamesPopup";
import InlineChipsPopup from "../components/InlineChipsPopup";
import { viewWaitingListDetails } from "../services/endpointService";

export default function BookingDetails() {
    const { vendorData, selectedPackage, selectedUser, selectedDate, dealValue, dealId, setPromoCodeDetails } = useAppStore();
    const [showPopup, setShowPopup] = useState(false);
    const [activePopup, setActivePopup] = useState(null);
    const [bookingDetail, setBookingDetail] = useState(null);
    const dateRef = useRef(null);
    const nameRowRef = useRef(null);
    const DAY_MAP = { 1: "Sunday", 2: "Monday", 3: "Tuesday", 4: "Wednesday", 5: "Thursday", 6: "Friday", 7: "Saturday", };



    useEffect(() => {
        getPaymentSuccessDetails();
    }, []);


    const getPaymentSuccessDetails = async () => {
        try {
            const payloadData = {
                "bookingId": localStorage.getItem("bookingId")
            }
            const response = await viewWaitingListDetails(payloadData);
            setBookingDetail(response.data[0]);
            console.log("Vendor Data:", response.data);
        } catch (error) {
            console.log("error:", error);
        }

    }

    const formatProgramDays = (programdays) => {
        if (!programdays) return "";

        return programdays
            .split(",")
            .map((d) => DAY_MAP[d.trim()])
            .filter(Boolean)
            .join(", ");
    };

    const formatBillingAmount = (amt, patientId) => {
        const data = patientId?.split(",")
        const amt1 = data?.length * amt;
        return amt1;
    };




    return (
        <div className="min-h-screen bg-[#f9f5f6]">
            {/* Header */}
            <div className="flex items-center gap-2 mb-2 border-b border-gray-300 shadow-md p-2">
                <h1 className="text-[#510f30] font-semibold text-lg">
                    Booking Details
                </h1>
            </div>
            <div className="p-4">

                {/* Logo */}
                <div className="flex flex-col items-center mb-4">
                    <img
                        src={bookingDetail?.vendor_profile_path}
                        alt={bookingDetail?.trainingCenterName}
                        className="w-20 h-20 rounded-full mb-2"
                    />
                    <p className="font-semibold text-[#510f30] text-lg">{bookingDetail?.trainingCenterName}</p>
                </div>

                {/* Card */}
                <div className="bg-white border border-[#E5E8E5] rounded-xl shadow mb-4">
                    <div className="px-4 pt-4">

                        <InfoRow label="Name" value={bookingDetail?.memberName} />
                        <InfoRow label="Selected Package" value={bookingDetail?.trcr_package_name} />
                        <InfoRow label="Package Days" value={formatProgramDays(bookingDetail?.programdays)} />
                        <InfoRow label="Address" value={bookingDetail?.vendorAddress} />
                        <InfoRow label="Sessions" value={bookingDetail?.sessions} />
                        <InfoRow label="Duration" value={bookingDetail?.duration} />
                    </div>
                    <div className="shadow-sm border border-b-0 border-[#E5E8E5] rounded-xl mt-4 pt-4">
                        {/* Fee */}
                        <div className="flex justify-between py-2 px-4 text-sm">
                            <span className="text-[#510f30] font-semibold">Fee <span className="text-[8px] font-semibold">KWD</span></span>
                            <span className="text-pink-500 font-semibold">{bookingDetail?.trcr_cost}</span>
                        </div>

                        {/* Billing */}
                        <div className="flex justify-between mt-2 bg-[#F9E1D9] p-3 rounded-xl text-sm font-semibold">
                            <span className="text-[#510f30] font-semibold">Billing Amount <span className="text-[8px] font-semibold">KWD</span></span>
                            <span className="text-pink-500">{formatBillingAmount(bookingDetail?.trcr_cost, bookingDetail?.patientId)}</span>
                        </div>
                    </div>

                </div>

                {/* Pay Button */}
                <div className="flex justify-center">
                    <button className="w-[90%] bg-[#F49C7A] text-[@510f30] py-2 rounded-full font-semibold">
                        Sanjay Academy will contact shortly
                    </button>
                </div>

                {showPopup && (
                    <NamesInlinePopup
                        anchorRef={nameRowRef}
                        names={selectedUser}
                        onRemove={removeName}
                        onClose={() => setShowPopup(false)}
                    />
                )}

                {/* DATE POPUP (READ ONLY ❌ remove) */}
                {activePopup && (
                    <InlineChipsPopup
                        anchorRef={dateRef}
                        items={selectedDate}
                        removable={false}
                        onClose={() => setActivePopup(null)}
                    />
                )}
            </div>

        </div >
    );
}

/* ---------- Small Component ---------- */

const InfoRow = ({ label, value, refProp }) => (
    <div ref={refProp} className="flex items-center gap-3 relative pb-3">

        <div className="w-full flex items-center">
            <div className="flex items-center justify-between w-[35%]">
                <p className="text-sm font-bold text-[#510f30]">{label}</p>
                <p>:</p>
            </div>

            <div className="w-[65%] text-sm pl-2">{value}</div>
        </div>
    </div>
);

