import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useAppStore = create(
    devtools((set, get) => ({
        selectedDate: null,
        availableDates: [],
        packages: [],
        vendorData: null,
        selectedUser: [],
        selectedPackage: null,
        formData: {
            title: "",
            price: "",
            days: [],
            description: "",
            status: true,
        },
        loading: false,
        error: null,

        setSelectedDate: (date) =>
            set({ selectedDate: date }, false, "setSelectedDate"),

        setAvailableDates: (dates) =>
            set({ availableDates: dates }, false, "setAvailableDates"),

        setVendorData: (dates) =>
            set({ vendorData: dates }, false, "setAvailableDates"),

        setPackages: (list) =>
            set({ packages: list }, false, "setPackages"),

        setSelectedUser: (list) =>
            set({ selectedUser: list }, false, "setSelectedUser"),

        selectPackage: (pkg) =>
            set({ selectedPackage: pkg }, false, "selectPackage"),



        updateForm: (key, value) =>
            set(
                (state) => ({
                    formData: { ...state.formData, [key]: value },
                }),
                false,
                "updateForm"
            ),

        resetForm: () =>
            set(
                {
                    formData: {
                        title: "",
                        price: "",
                        days: [],
                        description: "",
                        status: true,
                    },
                },
                false,
                "resetForm"
            ),

        setLoading: (value) => set({ loading: value }),
        setError: (err) => set({ error: err }),
    }))
);

export default useAppStore;
