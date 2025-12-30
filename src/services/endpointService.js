// Import base HTTP methods from apiService
import { apiGet, apiPost, apiPut, apiDelete, } from './apiService'

// ============ Authentication Endpoints ============

export const loginUser = (payload) => {
    return apiPost('Patient/memberDetailsBookingUrl', payload)
}

export const getVendorWorkingHoursAndPackageDetails = (payload) => {
    return apiPost('Patient/getParticularTrainingCenterDetails', payload)
}

export const getVendorDetails = (payload) => {
    return apiPost('Patient/getSportsVendorDetails', payload)
}

export const getPatientDetails = (payload) => {
    return apiPost('Patient/getPatientProfile', payload)
}

export const promoCodeValidation = (payload) => {
    return apiPost('admin/validateGeneralCouponCode', payload)
}

// ============ Export all endpoints ============

export default {
    // Auth
    loginUser,

    // Add other endpoints here as needed
    getVendorWorkingHoursAndPackageDetails,

    getVendorDetails,

    getPatientDetails,

    promoCodeValidation,
}
