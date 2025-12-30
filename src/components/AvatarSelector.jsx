export default function AvatarSelector({
    users = [],
    selectedUsers = [],
    onChange,
    onAddNew,
}) {
    const isSelected = (user) =>
        selectedUsers.some((u) => u.patientid === user.patientid);

    return (
        <div className="flex gap-4 overflow-x-auto pb-2">
            {users.map((user) => {
                const active = isSelected(user);

                return (
                    <div
                        key={user.patientid}
                        onClick={() => onChange(user)}   // ✅ FIX
                        className="flex flex-col items-center cursor-pointer min-w-[70px]"
                    >
                        <div
                            className={`w-14 h-14 rounded-full overflow-hidden
              ${active ? "border-2 border-[#510f30]" : "border-2 border-transparent"}`}
                        >
                            <img
                                src={user.image}
                                alt={user.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <p className={`mt-1 text-xs ${active ? "text-[#510f30]" : "text-gray-500"}`}>
                            {user.name}
                        </p>
                    </div>
                );
            })}

            <div
                onClick={onAddNew}
                className="flex flex-col items-center cursor-pointer min-w-[70px]"
            >
                <div className="w-14 h-14 rounded-full border-2 border-dashed border-[#510f30] flex items-center justify-center">
                    <span className="text-2xl font-bold text-[#510f30]">+</span>
                </div>
                <p className="mt-1 text-xs text-[#510f30]">New</p>
            </div>
        </div>
    );
}
