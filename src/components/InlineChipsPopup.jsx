import { useEffect, useRef, useState } from "react";
import moment from "moment";
export default function InlineChipsPopup({
    items = [],
    removable = false,
    onRemove,
    onClose,
    anchorRef,
}) {
    const popupRef = useRef(null);
    const [pos, setPos] = useState({ top: 0, left: 0 });

    // 📍 Position below anchor
    useEffect(() => {
        if (anchorRef?.current) {
            const rect = anchorRef.current.getBoundingClientRect();
            setPos({
                top: rect.bottom + window.scrollY + 8,
                left: rect.left + rect.width / 2,
            });
        }
    }, [anchorRef]);

    // ❌ Close on outside click
    useEffect(() => {
        const handler = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [onClose]);

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/40 z-40" />

            {/* Popup */}
            <div
                ref={popupRef}
                className="absolute z-50"
                style={{
                    top: pos.top,
                    left: pos.left,
                    transform: "translateX(-50%)",
                }}
            >
                {/* Arrow */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2
                        w-0 h-0 
                        border-l-8 border-r-8 border-b-8
                        border-l-transparent border-r-transparent
                        border-b-white" />

                {/* Content */}
                <div className="  bg-white shadow-xl
    px-4 py-3
    rounded-2xl
    flex flex-wrap gap-2
    max-w-[100vw]
    w-fit">
                    {items.map((item) => (
                        <span
                            key={item}
                            className="bg-[#510f30] text-white px-3 py-1 rounded-full text-xs flex items-center gap-2"
                        >
                            {moment(item).format("DD-MMM-YY")}
                            {removable && (
                                <button
                                    onClick={() => onRemove(item)}
                                    className="text-pink-300 font-bold"
                                >
                                    ✕
                                </button>
                            )}
                        </span>
                    ))}
                </div>
            </div>
        </>
    );
}
