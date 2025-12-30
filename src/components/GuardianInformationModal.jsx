import { useState, useEffect } from "react";
import { loginUser } from "../services/endpointService";

export default function GuardianInformationModal({ isOpen, onClose }) {
  const [gender, setGender] = useState("male");
  const [brotherName, setBrotherName] = useState("");
  const [brothers, setBrothers] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [apiCalled, setApiCalled] = useState(false);
  const [patientData, setPatientData] = useState({
    patientId: "",
    name: "",
    email: "",
    cc_code: "",
    gender: "",
    age: "",
    phone_no: "",
    civil_id: "",
    language: "",
    fcm_token: "",
  });

  useEffect(() => {
    if (phoneNumber.length === 10 && !apiCalled) {
      setApiCalled(true);
      addMemberDetails(phoneNumber);
    }
  }, [phoneNumber]);

  if (!isOpen) return null;

  async function addMemberDetails(phoneNumber) {
    try {
      const response = await loginUser({ phoneno: phoneNumber });
      const patient = response?.data[0];

      if (patient) {
        setPatientData({
          patientId: patient.patient_id || "",
          name: patient.name || "",
          email: patient.email || "",
          cc_code: patient.cc_code || "",
          gender: patient.gender || "",
          age: patient.age || "",
          phone_no: patient.phone_no || "",
          civil_id: patient.civil_id || "",
          language: patient.language || "",
          fcm_token: patient.fcm_token || "",
        });

        setGender(patient.gender?.toLowerCase() || "male");
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  }


  const submitInfo = () => {
    if (!patientData.patientId) return; // Ensure valid
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
      <div className="w-full max-w-md h-[550px] bg-white rounded-t-3xl px-5 py-4 overflow-auto">

        <h2 className="text-[#510f30] font-semibold text-lg mb-4">Guardian Information</h2>

        <Input
          label="Phone Number"
          required
          value={phoneNumber}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            if (value.length <= 10) {
              setPhoneNumber(value);
              setApiCalled(false);
            }
          }}
        />

        <Input
          label="Guardian Name"
          value={patientData.name}
          onChange={(e) => setPatientData({ ...patientData, name: e.target.value })}
        />

        <Input
          label="Email"
          value={patientData.email}
          onChange={(e) => setPatientData({ ...patientData, email: e.target.value })}
        />

        <Input
          label="Civil ID"
          value={patientData.civil_id || ""}
          onChange={(e) => setPatientData({ ...patientData, civil_id: e.target.value })}
        />

        <div className="mb-4">
          <label className="text-sm font-semibold text-[#510f30] mb-2 block">Gender</label>
          <div className="flex gap-3">
            <GenderButton
              active={gender === "male"}
              onClick={() => setGender("male")}
              label="Male"
              icon="♂"
            />
            <GenderButton
              active={gender === "female"}
              onClick={() => setGender("female")}
              label="Female"
              icon="♀"
            />
          </div>
        </div>

        {patientData.patientId == '' &&
          <div>
            <label className="text-sm font-semibold text-[#510f30] mb-2 block">Add Brother (if required)</label>
            <div className="flex items-center gap-2 mb-3">
              <input
                value={brotherName}
                onChange={(e) => setBrotherName(e.target.value)}
                className="border rounded-xl px-4 py-3 text-sm border-[#DFDFDF] focus:ring-1 focus:ring-[#f7a07a] active:ring-1 outline-none flex-1"
                placeholder="Enter Name"
              />
              <button
                onClick={() => {
                  if (brotherName.trim()) {
                    setBrothers([...brothers, brotherName.trim()]);
                    setBrotherName("");
                  }
                }}
                className="w-10 h-10 pb-3 rounded-full bg-[#f7a07a] text-white text-2xl" >+</button>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {brothers.map((name) => (
                <span key={name} className="flex items-center gap-2 bg-[#510f30] text-white px-3 py-1 rounded-full text-sm">
                  {name}
                  <button onClick={() => setBrothers(brothers.filter((b) => b !== name))}><span className="text-pink-600 font-semibold">✕</span></button>
                </span>
              ))}
            </div>
          </div>
        }
        <div className="flex justify-center">
          <button onClick={submitInfo} className="w-[200px] bg-[#510f30] text-white py-2 rounded-full font-semibold">Submit</button>
        </div>
      </div>
    </div>
  );
}


const Input = ({ label, required, value, onChange }) => (
  <div className="mb-4">
    <label className="text-sm font-semibold text-[#510f30] mb-1 block">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input value={value} onChange={onChange}
      className="w-full border rounded-xl px-4 py-3 text-sm border-[#DFDFDF] focus:ring-1 focus:ring-[#f7a07a] active:ring-1 outline-none" />
  </div>
);

const GenderButton = ({ active, onClick, label, icon }) => (
  <button onClick={onClick}
    className={`flex-1 border rounded-full py-2 flex justify-center gap-2
      ${active ? "border-[#F49C7A] bg-[#F9E1D9] text-[#510f30] font-semibold" : "border-[#F49C7A] text-[#510f30] font-semibold"}`}>
    {label} <span className='text-[#510f30] font-bold'>{icon}</span>
  </button>
);
