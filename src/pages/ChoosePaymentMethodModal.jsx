import { useState } from "react";

export default function ChoosePaymentMethodModal({ isOpen, onClose }) {
    const [method, setMethod] = useState("card");

    if (!isOpen) return null;

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
                        icon="💳"
                    />

                    {/* KNET */}
                    <PaymentOption
                        selected={method === "knet"}
                        onClick={() => setMethod("knet")}
                        label="KNET"
                        icon="🏦"
                    />
                </div>

                {/* Continue Button */}
                <button className="w-full bg-[#510f30] text-white py-3 rounded-full font-semibold">
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
      ${selected
                ? "border-[#f7a07a]"
                : "border-gray-300"
            }`}
    >
        <div
            className={`w-5 h-5 rounded-full border flex items-center justify-center
        ${selected
                    ? "border-[#510f30]"
                    : "border-gray-300"
                }`}
        >
            {selected && (
                <div className="w-3 h-3 bg-[#510f30] rounded-full" />
            )}
        </div>

        <div className="text-3xl">{icon}</div>

        <span className="text-sm font-medium text-[#510f30]">
            {label}
        </span>
    </button>
);
