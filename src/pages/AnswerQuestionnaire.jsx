import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import leftArrow from "./../assets/leftArrow.png";
import { getPackageQuestions, getPatientDetails, addWaitingListQuesAndAns } from "../services/endpointService";
import AvatarSelector from "../components/AvatarSelector";
import useAppStore from "../store/useAppStore";
import mapPatientToUsers from "../services/mapPatientToUsers";

export default function AnswerQuestionnaire() {
    const { selectPackage, selectedPackage, selectedUser, setSelectedUser, vendorData, setSelectedDate, setWorkingHoursDetails, setDealValue, setDealId } = useAppStore();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [selectingUsers, setSelectingUsers] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [activeUser, setActiveUser] = useState(null);
    const [answers, setAnswers] = useState({});


    useEffect(() => {
        if (selectedUser.length > 0 && !activeUser) {
            setActiveUser(selectedUser[0]);
        }
    }, [selectedUser]);


    useEffect(() => {
        getPatientDetailsFun();
        getQuestionsForPackage();
    }, []);

    useEffect(() => {
        setSelectedUser(selectingUsers);
        console.log("✅ Selected Users:", selectingUsers);
    }, [selectingUsers]);

    const getPatientDetailsFun = async () => {
        try {
            const payloadData = {
                "patientId": "118",
                "currentDate": "2025-12-24",
                "currentTime": "18:47:20"
            }
            const response = await getPatientDetails(payloadData);
            console.log("User Details:", response.data[0]);
            const userData = mapPatientToUsers(response.data);
            setUsers(userData);
            console.log("userData Details:", userData);
        } catch (error) {
            console.log("error:", error);
        }

    }

    const getQuestionsForPackage = async () => {
        const requestData = {
            "packageID": selectedPackage?.packageId
        }
        const response = await getPackageQuestions(requestData);
        setQuestions(response.data)
        console.log("responseData", response.data)
    }

    const handleAvatarChange = (user) => {
        setSelectingUsers((prev) => {
            const exists = prev.some((u) => u.patientid === user.patientid);
            return exists
                ? prev.filter((u) => u.patientid !== user.patientid)
                : [...prev, user];
        });
    };

    const handleAddNew = () => {
        console.log("Add new avatar clicked");
    };

    const getAnswer = (questionId) => {
        return answers?.[activeUser?.patientid]?.[questionId] || {
            YorN: "",
            describeAns: ""
        };
    };

    const handleSubmit = async () => {
        if (selectedUser != "") {
            const payload = {
                memberdetails: selectedUser.map(user => ({
                    patient_id: user.patientid,
                    submember_id: user.type === "sub" ? user.patientid : 0,
                    vendor_id: vendorData.id,
                    package_id: selectedPackage.packageId,
                    package_name: selectedPackage.trcr_package_name,
                    mobile_number: user.phone_no,
                    name: user.name,
                    vendor_name: vendorData.vendor_name,
                    profileImg: user.image || "",
                    MemberQuestionAndAnswer: Object.entries(
                        answers?.[user.patientid] || {}
                    ).map(([questionID, ans]) => ({
                        questionID: Number(questionID),
                        describeAns: ans.describeAns || "",
                        YorN: ans.YorN || "0"
                    })),
                    DealId: selectedPackage.dealId,
                    appointmentType: "3"
                }))
            }
            console.log("FINAL PAYLOAD 🔥", payload);
            const response = await addWaitingListQuesAndAns(payload);
            localStorage.setItem("bookingId", response.data.map(item => item.lastInsertId)?.join(","));
            if (response.status == 1) {
                navigate("/apply-success")
            }
            console.log("addWaitingListQuesAndAns", response.data);
        };

    };



    return (
        <div className="min-h-screen bg-[#f9f5f6] p-4">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
                <img src={leftArrow} alt="" className="w-2.5 h-4" onClick={() => navigate("/")} />
                <h1 className="text-[#510f30] font-semibold text-lg">
                    Answer Questionnaire
                </h1>
            </div>


            {/* Form */}
            <div className="bg-white rounded-xl shadow p-4 space-y-4">
                <div className="mb-1 px-2 bg-white rounded-xl border-b border-[#F49C7A] pt-2 space-y-4 shadow-md">
                    <AvatarSelector
                        users={users}
                        selectedUsers={selectingUsers}
                        onChange={handleAvatarChange}
                        onAddNew={handleAddNew}
                    />
                </div>

                {/* Chips */}
                <div className="flex gap-2 my-4 flex-wrap">
                    {selectedUser.map((user) => (
                        <span
                            key={user.patientid}
                            onClick={() => setActiveUser(user)}
                            className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm cursor-pointer
                ${activeUser?.patientid === user.patientid ? "bg-[#f7a07a] text-white" : "bg-[#fde9e1] text-[#510f30]"}`}>
                            {user.name}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();

                                    setSelectingUsers(prev =>
                                        prev.filter(u => u.patientid !== user.patientid)
                                    );

                                    setAnswers(prev => {
                                        const updated = { ...prev };
                                        delete updated[user.patientid];
                                        return updated;
                                    });

                                    if (activeUser?.patientid === user.patientid) {
                                        const remainingUsers = selectedUser.filter(
                                            u => u.patientid !== user.patientid
                                        );
                                        setActiveUser(remainingUsers[0] || null);
                                    }
                                }}
                                className="font-bold ml-1"
                            >
                                ×
                            </button>

                        </span>
                    ))}
                </div>

                <Input
                    label="Name"
                    value={activeUser?.name || ""}
                />

                <Input
                    label="Age"
                    value={activeUser?.age || ""}
                />

                <Input
                    label="Mobile Number"
                    value={activeUser?.phone_no || ""}
                />

                {questions.map((question, index) => (
                    question.isActive === 1 && (
                        <div key={index} className="mb-4">

                            {/* Question */}
                            <div className="text-sm font-medium text-[#510f30] mb-2">
                                {question.question_en}
                                <span className="text-red-500"> *</span>
                            </div>

                            {/* YES / NO Radio */}
                            {question.isSelectYN === 1 && (
                                <RadioSection
                                    value={getAnswer(question.question_id)?.YorN === "1" ? "yes" : "no"}
                                    onChange={(val) =>
                                        setAnswers(prev => ({
                                            ...prev,
                                            [activeUser?.patientid]: {
                                                ...prev[activeUser?.patientid],
                                                [question.question_id]: {
                                                    ...prev?.[activeUser.patientid]?.[question.question_id],
                                                    YorN: val === "yes" ? "1" : "0"
                                                }
                                            }
                                        }))
                                    }
                                />
                            )}


                            {/* Description textarea */}
                            {question.isSelectYN === 1 && (
                                <div>
                                    <textarea
                                        placeholder="Describe..."
                                        value={getAnswer(question.question_id)?.describeAns}
                                        onChange={(e) =>
                                            setAnswers(prev => ({
                                                ...prev,
                                                [activeUser.patientid]: {
                                                    ...prev[activeUser.patientid],
                                                    [question.question_id]: {
                                                        ...prev?.[activeUser.patientid]?.[question.question_id],
                                                        describeAns: e.target.value
                                                    }
                                                }
                                            }))
                                        }
                                        className="w-full border rounded-xl px-4 py-3 text-sm outline-none"
                                    />

                                </div>
                            )}
                        </div>
                    )
                ))}

            </div>

            {/* Submit */}
            <button className="mt-6 mx-auto block bg-[#f7a07a] text-white px-10 py-2 rounded-lg font-semibold shadow" onClick={handleSubmit}>
                Submit
            </button>
        </div >
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

const RadioSection = ({ value, onChange }) => (
    <div>
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
