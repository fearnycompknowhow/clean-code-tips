let studentDates = studentCourse.dates || {};
const studentSignDate = isObjectWithProperty(studentDates, 'studentContractSigned') && studentDates.studentContractSigned ? studentDates.studentContractSigned : null;
const parentGuardianSignDate = isObjectWithProperty(studentDates, 'parentGuardianContractSigned') && studentDates.parentGuardianContractSigned ? studentDates.parentGuardianContractSigned : null;
const instructorSignDate = isObjectWithProperty(studentDates, 'instructorContractSigned') && studentDates.instructorContractSigned ? studentDates.instructorContractSigned : null;

// Better
let studentDates = studentCourse.dates || {};
const studentSignDate = studentDates.studentContractSigned || null;
const parentGuardianSignDate = studentDates.parentGuardianContractSigned || null;
const instructorSignDate = studentDates.instructorContractSigned || null;



// Probably the best
let studentDates = studentCourse.dates || {};
const { studentSignDate = null, parentGuardianSignDate = null, instructorSignDate = null } = studentDates;