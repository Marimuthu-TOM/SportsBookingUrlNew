import { useState } from "react";
import {
    User,
    Package,
    Calendar,
    Clock,
    Layers,
    MapPin,
} from "lucide-react";
import moment from "moment";

export default function BookingDetailsCard({
    names = [],
    packageName = "",
    dates = [],
    duration = "",
    sessionCount = 0,
    location = "",
    onRemoveName,
    onViewMore,
    nameRowRef,
    dateRef,
    onViewMoreDate
}) {

    return (
        <div className="bg-white rounded-xl border-b border-[#F49C7A] p-4 space-y-4 shadow-md">
            <DetailRow
                refProp={nameRowRef}
                icon={<User size={16} />}
                label="Name"
                value={
                    <div className="flex items-center gap-1">
                        {names.slice(0, 1).map((name) => (
                            <span
                                key={name.name}
                                className="bg-[#510f30] text-white px-3 py-1 rounded-full text-xs flex items-center gap-2"
                            >
                                {name.name}
                            </span>
                        ))}

                        {names.length > 1 && (
                            <span
                                onClick={onViewMore}
                                className="text-xs text-[#F49C7A] cursor-pointer"
                            >
                                ...view more
                            </span>
                        )}
                    </div>
                }
            />
            {/* PACKAGE */}
            <DetailRow
                icon={<Package size={16} />}
                label="Package Name"
                value={packageName}
            />

            {/* DATE */}
            <DetailRow
                refProp={dateRef}
                icon={<Calendar size={16} />}
                label="Date"
                value={
                    <span className="text-sm text-gray-700">
                        {moment(dates.slice(0, 1).join(", ")).format("DD-MMM-YY")}
                        {dates.length > 1 && (
                            <span
                                onClick={onViewMoreDate}
                                className="ml-2 text-xs text-[#F49C7A] cursor-pointer"
                            >
                                ...view more
                            </span>
                        )}
                    </span>
                }
            />

            {/* DURATION */}
            <DetailRow
                icon={<Clock size={16} />}
                label="Duration"
                value={duration}
            />

            {/* SESSION */}
            <DetailRow
                icon={<Layers size={16} />}
                label="Session"
                value={sessionCount}
            />

            {/* LOCATION */}
            {location &&
                <DetailRow
                    icon={<MapPin size={16} />}
                    label="Location"
                    value={location}
                />}
        </div>
    );
}

/* ---------- ROW COMPONENT ---------- */

const DetailRow = ({ icon, label, value, refProp }) => (
    <div ref={refProp} className="flex items-center gap-3 relative">
        <div className="text-[#510f30]">{icon}</div>

        <div className="w-full flex items-center">
            <div className="flex items-center justify-between w-[35%]">
                <p className="text-sm font-medium text-[#510f30]">{label}</p>
                <p>:</p>
            </div>

            <div className="w-[65%] text-xs pl-2">{value}</div>
        </div>
    </div>
);
