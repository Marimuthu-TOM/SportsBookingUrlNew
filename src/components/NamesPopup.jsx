import { useEffect, useRef, useState } from "react";

export default function NamesInlinePopup({
    names,
    onRemove,
    onClose,
    anchorRef,
}) {
    const popupRef = useRef(null);
    const [position, setPosition] = useState({ top: 0, left: 0 });

    // 📍 Position popup below Name row
    useEffect(() => {
        if (anchorRef?.current) {
            const rect = anchorRef.current.getBoundingClientRect();
            setPosition({
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
            {/* Overlay (no scroll) */}
            <div className="fixed inset-0 bg-black/40 z-40" />

            {/* Popup */}
            <div
                ref={popupRef}
                className="absolute z-50"
                style={{
                    top: position.top,
                    left: position.left,
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
                <div className="bg-white rounded-full shadow-xl px-4 py-2 flex gap-2">
                    {names.map((name) => (
                        <span
                            key={name.name}
                            className="flex items-center gap-2 bg-[#510f30] text-white px-3 py-1 rounded-full text-xs"
                        >
                            {name.name}
                            <button
                                onClick={() => onRemove(name)}
                                className="text-pink-300 font-bold"
                            >
                                ✕
                            </button>
                        </span>
                    ))}
                </div>
            </div>
        </>
    );
}
