function mapPatientToUsers(apiResponse) {
    const patient = apiResponse[0];

    const mainUser = {
        patientid: `${patient.patientId}`,
        name: patient.name?.trim(),
        image: patient.profile_image,
        type: "main",
    };

    const subUsers = (patient.patientmemberDetails || []).map((m) => ({
        patientid: `${m.PatientMemberId}`,
        name: m.name,
        image: m.patientMemberImage,
        type: "sub",
    }));

    return [...subUsers.reverse(), mainUser];
}
export default mapPatientToUsers;