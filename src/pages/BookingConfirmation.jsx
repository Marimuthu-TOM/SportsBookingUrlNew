import { useState, useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import ChoosePaymentMethodModal from "./ChoosePaymentMethodModal";
import useAppStore from "../store/useAppStore";
import NamesInlinePopup from "../components/NamesPopup";
import moment from "moment";
import InlineChipsPopup from "../components/InlineChipsPopup";
import leftArrow from "./../assets/leftArrow.png";
import promoCodeicon from "./../assets/promo_code_member_app.svg";
import { useNavigate } from "react-router-dom";
import { promoCodeValidation } from "../services/endpointService";

export default function BookingConfirmation() {
    const { vendorData, selectedPackage, selectedUser, selectedDate, dealValue, dealId, setPromoCodeDetails } = useAppStore();
    const navigate = useNavigate();
    const [paymentOption, setPaymentOption] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [feeAmt, setFeeAmt] = useState(null);
    const [billingAmt, setBillingAmt] = useState(null);
    const [activePopup, setActivePopup] = useState(null);
    const [selectingUsers, setSelectingUsers] = useState([]);
    const [promoCode, setPromoCode] = useState("");
    const [promoCodeAmt, setPromoCodeAmt] = useState("");
    const [isPromo, setIsPromo] = useState(true);
    const dateRef = useRef(null);
    const nameRowRef = useRef(null);
    const bookingPayload = {
        billingAmt,
        promoCode,
        promoCodeAmt,
        selectedUser,
        selectedDate,
        selectedPackage,
        vendorData,
        dealId
    };


    useEffect(() => {
        console.log("Deal Value:", dealValue);
        console.log("Deal ID:", dealId);
        feeAmtCalculate();
    }, []);


    const feeAmtCalculate = () => {
        const amt = selectedUser?.length * selectedPackage?.trcr_cost;
        if (dealId) {
            const discountedAmt = amt - dealValue;
            setBillingAmt(discountedAmt);
        } else {
            setBillingAmt(amt);
        }
        setFeeAmt(amt);
    };

    const removeName = (user) => {
        setSelectingUsers((prev) =>
            prev.filter((u) => u.patientid !== user.patientid)
        );
    };

    const toSendPaymentModal = () => {
        setPaymentOption(true);
    };

    const promoCodeValidate = async () => {
        const requestData = {
            "p_coupon_code": promoCode,
            "p_member_id": "1494",
            "p_module_id": 7,
            "p_vendor_id": "1333",
            "p_current_date": moment(new Date()).format("YYYY-MM-DD HH:MM:ss")
        }

        const response = await promoCodeValidation(requestData);
        const responseData = response.data[0];
        setPromoCodeDetails(responseData);
        if (responseData.status == 1) {
            if (responseData.discount_option === "Percentage") {
                const discountCost = (selectedPackage?.trcr_cost * responseData?.discount_value) / 100;
                setPromoCodeAmt(discountCost);
                setBillingAmt(billingAmt - discountCost);
                setIsPromo(false);
            } else {
                setPromoCodeAmt(responseData?.discount_value);
                setBillingAmt(billingAmt - responseData?.discount_value);
                setIsPromo(false);
            }
        } else {
            setBillingAmt(billingAmt);
        }
        console.log("Vendor Data:", response.data[0]);
    };


    return (
        <div className="min-h-screen bg-[#f9f5f6]">
            {/* Header */}
            <div className="flex items-center gap-2 mb-2 border-b border-gray-300 shadow-md p-2">
                <img src={leftArrow} alt="" className="w-2.5 h-4" onClick={() => navigate("/")} />
                <h1 className="text-[#510f30] font-semibold text-lg">
                    Booking Confirmation
                </h1>
            </div>
            <div className="p-4">

                {/* Pay to Confirm */}
                <div className="bg-[#F9E1D9] text-[#510f30] text-md text-center py-2 rounded-full mb-4 font-semibold">
                    Pay to Confirm your Registration
                </div>

                {/* Logo */}
                <div className="flex flex-col items-center mb-4">
                    <img
                        src={vendorData?.vendor_profile_path}
                        alt={vendorData?.vendor_name}
                        className="w-20 h-20 rounded-full mb-2"
                    />
                    <p className="font-semibold text-[#510f30] text-lg">{vendorData?.vendor_name}</p>
                </div>

                {/* Card */}
                <div className="bg-white border border-[#E5E8E5] rounded-xl shadow mb-4">
                    <div className="px-4 pt-4">
                        <InfoRow
                            refProp={nameRowRef}
                            label="Name"
                            value={
                                <div className="flex items-center gap-1">
                                    {selectedUser.slice(0, 1).map((name) => (
                                        <span
                                            key={name.name}
                                            className="bg-[#510f30] text-white px-3 py-1 rounded-full text-xs flex items-center gap-2"
                                        >
                                            {name.name}
                                        </span>
                                    ))}

                                    {selectedUser.length > 1 && (
                                        <span
                                            onClick={() => setShowPopup(true)}
                                            className="text-xs text-[#F49C7A] cursor-pointer"
                                        >
                                            ...view more
                                        </span>
                                    )}
                                </div>
                            }
                        />
                        <InfoRow label="Selected Package" value={selectedPackage?.trcr_package_name} />
                        <InfoRow label="Sessions" value={selectedPackage?.trcr_session} />
                        <InfoRow label="Duration" value={selectedPackage?.duration} />
                        <InfoRow
                            refProp={dateRef}
                            label="Date"
                            value={
                                <span className="text-sm text-gray-700">
                                    {moment(selectedDate?.slice(0, 1)?.join(", ")).format("DD-MMM-YY")}
                                    {selectedDate?.length > 1 && (
                                        <span
                                            onClick={() => setActivePopup(true)}
                                            className="ml-2 text-xs text-[#F49C7A] cursor-pointer"
                                        >
                                            ...view more
                                        </span>
                                    )}
                                </span>
                            }
                        />

                        {vendorData?.vendor_address && (
                            <InfoRow
                                label="Academy Address"
                                value={
                                    <span className="flex items-center gap-1">
                                        <MapPin size={14} className="text-pink-500" />
                                        {vendorData?.vendor_address}
                                    </span>
                                }
                            />
                        )}

                        {isPromo == true &&
                            <PromoCodeInput
                                value={promoCode}
                                onChange={setPromoCode}
                                onApply={promoCodeValidate}
                            />
                        }
                    </div>
                    <div className="shadow-sm border border-b-0 border-[#E5E8E5] rounded-xl mt-4 pt-4">
                        {/* Fee */}
                        <div className="flex justify-between py-2 px-4 text-sm">
                            <span className="text-[#510f30] font-semibold">Fee <span className="text-[8px] font-semibold">KWD</span></span>
                            <span className="text-pink-500 font-semibold">{feeAmt}</span>
                        </div>

                        {dealId &&
                            < div className="flex justify-between py-2 px-4 text-sm">
                                <span className="text-[#510f30] font-semibold">Deal</span>
                                <span className="text-pink-500 font-semibold">{dealValue}</span>
                            </div>
                        }

                        {isPromo == false &&
                            < div className="flex justify-between py-2 px-4 text-sm">
                                <span className="text-[#510f30] font-semibold flex">Promo Code <img src={promoCodeicon} alt="promoCodeicon" className="pl-2" /></span>
                                <span className="text-pink-500 font-semibold">{promoCodeAmt}</span>
                            </div>
                        }

                        {/* Billing */}
                        <div className="flex justify-between mt-2 bg-[#F9E1D9] p-3 rounded-xl text-sm font-semibold">
                            <span className="text-[#510f30] font-semibold">Billing Amount <span className="text-[8px] font-semibold">KWD</span></span>
                            <span className="text-pink-500">{billingAmt}</span>
                        </div>
                    </div>

                </div>

                {/* Terms */}
                <div className="flex items-center gap-2 text-xs text-gray-600 mb-4">
                    <input type="checkbox" />
                    <p>
                        Check here to confirm that you have read & agree to{" "}
                        <span className="text-[#510f30] font-semibold">
                            tom Terms & Conditions
                        </span>
                    </p>
                </div>

                {/* Pay Button */}
                <button onClick={() => toSendPaymentModal()} className="w-full bg-[#510f30] text-white py-3 rounded-full font-semibold">
                    Pay now
                </button>

                <ChoosePaymentMethodModal
                    isOpen={paymentOption}
                    onClose={() => setOpen(false)}
                    bookingData={bookingPayload}
                />

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

const PromoCodeInput = ({ value, onChange, onApply }) => {
    return (
        <div className="flex items-center gap-3 w-full max-w-xl">
            {/* Icon + Label */}
            <div className="flex items-center gap-2 w-[40%] text-[#510f30] font-semibold text-sm whitespace-nowrap">
                <span className="text-lg"></span>
                <img src={promoCodeicon} alt="promoCodeicon" />
                Promo Code
            </div>

            {/* Input + Button Wrapper */}
            <div className="flex items-center w-[60%] bg-white rounded-full shadow-md overflow-hidden">
                {/* Input */}
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-5 py-3 text-sm outline-none text-[#510f30] w-[50px]"
                />

                {/* Apply Button */}
                <div
                    onClick={onApply}
                    className="px-2 py-3 bg-[#510f30] text-white text-sm font-semibold hover:bg-[#3f0c25] transition-all w-[60px]"
                >
                    Apply
                </div>
            </div>
        </div>
    );
}

