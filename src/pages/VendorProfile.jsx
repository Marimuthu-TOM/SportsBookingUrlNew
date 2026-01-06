import { useState, useEffect, useRef } from "react";
import GuardianInformationModal from "../components/GuardianInformationModal";
import BookingDetailsCard from "./BookingDetailsCard";
import PackageCard from "./PackageCard";
import PackageDetailsCard from "./PackageDetailsCard";
import mapPatientToUsers from "../services/mapPatientToUsers";
import { getVendorWorkingHoursAndPackageDetails, getVendorDetails, getPatientDetails } from "../services/endpointService";
import moment from "moment/moment";
import CustomCalendar from "../components/CustomCalendar";
import NamesPopup from "../components/NamesPopup";
import Check from "../assets/check.png";
import dealicon from "../assets/dealicon.svg";
import tom_deal_icons from "../assets/tom_deal_icons.png";
import InlineChipsPopup from "../components/InlineChipsPopup";
import AvatarSelector from "../components/AvatarSelector";
import useAppStore from "../store/useAppStore";
import { useNavigate } from "react-router-dom";


export default function VendorProfilePage() {
    const { selectPackage, selectedPackage, selectedUser, setSelectedUser, setVendorData, setSelectedDate, setWorkingHoursDetails, setDealValue, setDealId } = useAppStore();
    const navigate = useNavigate();
    const [guardianInfo, setGuardianInfo] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [isPackageSelected, setIsPackageSelected] = useState(false);
    const [packageList, setPackageList] = useState([]);
    const [sportsDetails, setSportsDetais] = useState([]);
    const [workingHours, setWorkingHours] = useState([]);
    const [selectingDates, setSelectingDates] = useState([]);
    const [vendorDetails, setVendorDetails] = useState([]);
    const [selectingUsers, setSelectingUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectingPackage, setSelectingPackage] = useState(null);
    const [activePopup, setActivePopup] = useState(null);
    const dateRef = useRef(null);
    const nameRowRef = useRef(null);
    const DAY_MAP = { 1: "Sun", 2: "Mon", 3: "Tue", 4: "Wed", 5: "Thu", 6: "Fri", 7: "Sat", };

    useEffect(() => {
        getSportsAcademyData();
        getSportsAcademyVendorDetails();
        getPatientDetailsFun();
    }, []);

    useEffect(() => {
        document.body.style.overflow = showPopup ? "hidden" : "auto";
        return () => (document.body.style.overflow = "auto");
    }, [showPopup]);

    useEffect(() => {
        setSelectedUser(selectingUsers);
        console.log("✅ Selected Users:", selectingUsers);
    }, [selectingUsers]);

    const getSportsAcademyData = async () => {
        try {
            const payloadData = {
                "trainingCenterId": "495",
                "trainingId": "2",
                "currentDate": moment(new Date()).format("YYYY-MM-DD"),
                "patientId": "118",
                "lattitude": 13.0940928,
                "longititude": 80.1964032
            }
            const response = await getVendorWorkingHoursAndPackageDetails(payloadData);
            console.log("Vendor Data:", response.data[0]);
            setSportsDetais(response.data[0]);
            setPackageList(response.data[0]?.programList || []);
            setWorkingHoursDetails(response.data[0]?.trainingCenterWorkinghours || []);
            setWorkingHours(response.data[0]?.trainingCenterWorkinghours || []);
        } catch (error) {
            console.log("error:", error);
        }

    }

    const getSportsAcademyVendorDetails = async () => {
        try {
            const payloadData = {
                "vendor_id": "1333"
            }
            const response = await getVendorDetails(payloadData);
            console.log("Vendor Details:", response.data[0]);
            setVendorDetails(response.data[0]);
            setVendorData(response.data[0]);
        } catch (error) {
            console.log("error:", error);
        }

    }

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

    const formatProgramDays = (programdays) => {
        if (!programdays) return "";

        return programdays
            .split(",")
            .map((d) => DAY_MAP[d.trim()])
            .filter(Boolean)
            .join(", ");
    };

    const selectedPackageWlFun = (pkg) => {
        setSelectingPackage(pkg);
        selectPackage(pkg);
        setDealId(pkg.dealId);
        navigate("/questionnarie");
    };

    const selectedPackageFun = (pkg) => {
        setSelectingPackage(pkg);
        selectPackage(pkg);
        setDealId(pkg.dealId);
        if (pkg.dealOption == "Percentage") {
            const discountCost = (pkg.trcr_cost * pkg.dealValue) / 100;
            setDealValue(discountCost);
        } else {
            setDealValue(pkg.dealValue);
        }
        setIsPackageSelected(true);
    };

    const removeName = (user) => {
        setSelectingUsers((prev) =>
            prev.filter((u) => u.patientid !== user.patientid)
        );
    };


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
        // open modal / navigate / add user logic here
    };

    const onProcced = () => {
        navigate("/booking-confirmation");
    };

    return (
        <div className="min-h-screen bg-gray-100 p-3 sm:p-4 md:p-6 w-full">

            <div className="flex items-center bg-white rounded-lg shadow-md p-1 px-3 mb-2 text-[#510f30]">
                <h1 className="text-lg md:text-xl font-semibold ">{vendorDetails?.vendor_name || ""}</h1>
            </div>
            <div className="w-full bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">

                {/* Vendor Info Section */}
                <div className="flex justify-between w-full items-start">
                    <div className=" w-[30%] mr-2">
                        <img
                            src={vendorDetails?.vendor_profile_path || ""}
                            alt="Vendor Logo"
                            className="rounded-full h-[100px] shadow"
                        />
                    </div>
                    <div className="flex justify-between flex-wrap gap-3 w-[70%]">
                        {/* Left Info */}
                        <div>
                            <h2 className="text-lg md:text-xl font-bold text-[#510f30]">{vendorDetails?.vendor_name || ""}</h2>
                            <p className="text-[13px] font-semibold text-[#510f30]">{vendorDetails?.vendor_address || ""}</p>
                            <div className="flex items-center mt-1 space-x-1">
                                <p className="flex text-[13px] font-semibold text-[#510f30]">Sports Academy Registration Verified</p>
                                <img src={Check} alt="" className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Image Slider */}
                <div className="my-5">
                    <div className="flex overflow-x-scroll space-x-4 scrollbar-hide">
                        <img
                            src="/sample1.png"
                            className="w-32 h-24 sm:w-40 sm:h-28 md:w-48 md:h-32 rounded-lg object-cover shadow"
                        />
                        <img
                            src="/sample2.png"
                            className="w-32 h-24 sm:w-40 sm:h-28 md:w-48 md:h-32 rounded-lg object-cover shadow"
                        />
                    </div>
                </div>
                <div className="border border-[#510f30]"></div>

                {/* Reusable Package Cards */}
                <div className="mt-7 space-y-6">
                    {!isPackageSelected &&
                        packageList?.map((pkg) => (
                            <PackageCard
                                logo={pkg.filepath}
                                title={pkg.trcr_package_name}
                                description={pkg.trcr_package_details}
                                sessions={pkg.trcr_session}
                                price={pkg.trcr_cost}
                                onSelect={() => selectedPackageFun(pkg)}
                                deal_active={pkg.deal_active}
                                deal_icon={pkg.tom_or_sp == 2 || (pkg.deal_active == 1 && pkg.tom_or_sp == 0) ? dealicon : tom_deal_icons}
                                dealOption={pkg.dealOption}
                                dealValue={pkg.dealValue}
                                dealId={pkg.dealId}
                                isWitingList={sportsDetails?.waiting_list}
                                applyWaitingList={() => selectedPackageWlFun(pkg)}
                            />
                        ))}

                    {isPackageSelected &&
                        <div>
                            <div className="mb-4">
                                <PackageDetailsCard
                                    sessions={selectingPackage?.trcr_session || ""}
                                    workingDays="Wed, Sat, Sun"
                                    workingTime="08:30 pm - 10:30 pm"
                                    packageDays={formatProgramDays(selectingPackage?.programdays)}
                                    ageLimit={selectingPackage.trcr_is_all_age == 'true' ? 'All ages' : `${selectingPackage?.trcr_age_from} - ${selectingPackage?.trcr_age_to}`}
                                    duration={`${selectingPackage?.duration} Hours`}
                                    description={selectingPackage?.trcr_package_details}
                                />
                            </div>
                            <div className="mb-4">
                                <CustomCalendar
                                    workingHours={workingHours}
                                    packageDays={selectingPackage?.programdays}
                                    trcr_session={selectingPackage?.trcr_session}
                                    onSelectDates={(dates) => { setSelectingDates(dates), setSelectedDate(dates) }}
                                />
                            </div>
                            <div className="bg-white shadow-md border border-[#F49C7A] rounded-xl">
                                <div className="mb-1 px-2 bg-white rounded-xl border-b border-[#F49C7A] pt-2 space-y-4 shadow-md">
                                    <AvatarSelector
                                        users={users}
                                        selectedUsers={selectingUsers}
                                        onChange={handleAvatarChange}
                                        onAddNew={handleAddNew}
                                    />
                                </div>
                                <div>
                                    <BookingDetailsCard
                                        names={selectedUser}
                                        onRemoveName={removeName}
                                        nameRowRef={nameRowRef}
                                        dateRef={dateRef}
                                        packageName={selectedPackage?.trcr_package_name || ""}
                                        dates={selectingDates}
                                        duration={`${selectingPackage?.duration} Hours`}
                                        sessionCount={selectingPackage?.trcr_session || ""}
                                        location={vendorDetails?.vendor_address || ""}
                                        onViewMore={() => setShowPopup(true)}
                                        onViewMoreDate={() => setActivePopup("date")}
                                    />
                                </div>
                                <div className="flex justify-center">
                                    <button
                                        onClick={onProcced}
                                        className="my-4 w-[40%] bg-[#F49C7A] hover:bg-[#F49C7A] text-[#510f30] font-bold py-2 rounded-xl text-sm md:text-base"
                                    >
                                        Procced
                                    </button>
                                </div>

                                {showPopup && (
                                    <NamesPopup
                                        anchorRef={nameRowRef}
                                        names={selectedUser}
                                        onRemove={removeName}
                                        onClose={() => setShowPopup(false)}
                                    />
                                )}

                                {/* DATE POPUP (READ ONLY ❌ remove) */}
                                {activePopup === "date" && (
                                    <InlineChipsPopup
                                        anchorRef={dateRef}
                                        items={selectingDates}
                                        removable={false}
                                        onClose={() => setActivePopup(null)}
                                    />
                                )}
                            </div>
                        </div>
                    }
                </div>
            </div>
            <GuardianInformationModal
                isOpen={guardianInfo}
                onClose={() => { setGuardianInfo(false); getSportsAcademyData(); }}
            />

        </div>
    );
}
