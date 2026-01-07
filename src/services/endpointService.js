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

export const insertBooking = (payload) => {
    return apiPost('Patient/urlSportsPatientTrainingCenterBooking', payload)
}

export const paymentSuccessDetails = (payload) => {
    return apiPost('Patient/getTrcrPaymentSuccessDetails', payload)
}

export const getPackageQuestions = (payload) => {
    return apiPost('Patient/getSportsPackageQuestions', payload)
}

export const addWaitingListQuesAndAns = (payload) => {
    return apiPost('Patient/sportsAddWaitingList', payload)
}

export const waitingListSuccessDetails = (payload) => {
    return apiPost('Patient/getWaitingListScuuessDetail', payload)
}

export const viewWaitingListDetails = (payload) => {
    return apiPost('Patient/getWaitingListIndDetail', payload)
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

    insertBooking,

    paymentSuccessDetails,

    getPackageQuestions,

    addWaitingListQuesAndAns,

    waitingListSuccessDetails,
    
    viewWaitingListDetails
}
