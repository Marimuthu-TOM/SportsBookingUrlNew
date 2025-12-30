import { useState } from "react";

export default function AnswerQuestionnaire() {
    const [selectedChild, setSelectedChild] = useState("Saud");
    const [accident, setAccident] = useState("no");
    const [healthIssue, setHealthIssue] = useState("yes");

    const children = ["Saud", "Nasser", "Dalal"];

    return (
        <div className="min-h-screen bg-[#f9f5f6] p-4">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
                <span className="text-xl text-[#510f30] cursor-pointer">←</span>
                <h1 className="text-[#510f30] font-semibold text-lg">
                    Answer Questionnaire
                </h1>
            </div>

            {/* Chips */}
            <div className="flex gap-2 mb-4 flex-wrap">
                {children.map((name) => (
                    <span
                        key={name}
                        className="flex items-center gap-2 bg-[#fde9e1] text-[#510f30] px-3 py-1 rounded-full text-sm"
                    >
                        {name}
                        <button className="text-pink-500 font-bold">×</button>
                    </span>
                ))}
            </div>

            {/* Form */}
            <div className="bg-white rounded-xl shadow p-4 space-y-4">
                <Input label="Name" value="Saud Al Ajlan" />
                <Input label="Age" value="12" />
                <Input label="Mobile Number" value="1234567890" />

                {/* Accident */}
                <RadioSection
                    label="Did your son ever had an accident"
                    required
                    value={accident}
                    onChange={setAccident}
                />

                <textarea
                    placeholder="Describe..."
                    className="w-full border rounded-xl px-4 py-3 text-sm outline-none"
                />

                {/* Health */}
                <RadioSection
                    label="Does he face any health issues"
                    required
                    value={healthIssue}
                    onChange={setHealthIssue}
                />

                <textarea
                    placeholder="Describe..."
                    className="w-full border rounded-xl px-4 py-3 text-sm outline-none"
                />

                {/* Sports */}
                <div>
                    <label className="text-sm font-medium text-[#510f30]">
                        What sports did your son play before. <span className="text-red-500">*</span>
                    </label>
                    <input
                        defaultValue="Foot ball, Swimming"
                        className="mt-1 w-full border rounded-xl px-4 py-3 text-sm outline-none"
                    />
                </div>
            </div>

            {/* Submit */}
            <button className="mt-6 mx-auto block bg-[#f7a07a] text-white px-10 py-2 rounded-lg font-semibold shadow">
                Submit
            </button>
        </div>
    );
}

/* ---------- Reusable Components ---------- */

const Input = ({ label, value }) => (
    <div>
        <label className="text-sm font-medium text-[#510f30]">{label}</label>
        <input
            defaultValue={value}
            className="mt-1 w-full border rounded-xl px-4 py-3 text-sm outline-none"
        />
    </div>
);

const RadioSection = ({ label, required, value, onChange }) => (
    <div>
        <label className="text-sm font-medium text-[#510f30]">
            {label} {required && <span className="text-red-500">*</span>}
        </label>

        <div className="flex gap-4 mt-2">
            <RadioCard
                label="Yes"
                selected={value === "yes"}
                onClick={() => onChange("yes")}
            />
            <RadioCard
                label="No"
                selected={value === "no"}
                onClick={() => onChange("no")}
            />
        </div>
    </div>
);

const RadioCard = ({ label, selected, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center justify-between gap-3 px-4 py-3 border rounded-xl w-24
      ${selected
                ? "border-[#f7a07a]"
                : "border-gray-300"
            }`}
    >
        <span className="text-sm text-[#510f30]">{label}</span>
        <span
            className={`w-4 h-4 rounded-full border flex items-center justify-center
        ${selected
                    ? "border-[#f7a07a]"
                    : "border-gray-300"
                }`}
        >
            {selected && (
                <span className="w-2.5 h-2.5 bg-[#f7a07a] rounded-full" />
            )}
        </span>
    </button>
);
