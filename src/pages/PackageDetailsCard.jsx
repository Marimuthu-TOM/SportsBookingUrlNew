import { useState } from "react";

export default function PackageDetailsCard({
    sessions, workingDays, workingTime, packageDays, ageLimit, duration, description, }) {

    return (
        <div className="bg-white shadow-md border border-[#F49C7A] rounded-xl p-5 w-full">

            {/* Sessions */}
            {/* <p className="text-sm font-semibold text-[#510f30]">
                Sessions : <span className="text-[#510f30]">{sessions}</span>
            </p> */}

            {/* Working Hours */}
            <div className="">
                <h4 className="text-md font-semibold text-[#510f30]">Working Hours</h4>
                <p className="text-sm text-[#510f30]">{workingDays}</p>
                <p className="text-sm text-[#510f30]">{workingTime}</p>
            </div>

            {/* Package Details */}
            <div className="mt-4">
                <h4 className="text-md font-semibold text-[#510f30]">Package Details</h4>
                <p className="text-sm text-[#510f30] font-semibold">Package Days : <span className="font-normal">{packageDays}</span></p>
                <p className="text-sm text-[#510f30] font-semibold">Age Limit : <span className="font-normal">{ageLimit}</span></p>
                <p className="text-sm text-[#510f30] font-semibold">Duration : <span className="font-normal">{duration}</span></p>
                <p className="text-sm text-[#510f30] font-semibold">Description : <span className="font-normal">{description}</span></p>
            </div>
        </div>
    );
}
