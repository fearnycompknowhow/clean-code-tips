if(isObjectWithProperty(studentDates, 'payment') && studentDates.payment) {
	// Do something

	if(isObjectWithProperty(studentDates, 'studentContractSigned') && !studentDates.studentContractSigned) {
		// Do something
	}

	if(isObjectWithProperty(studentDates, 'parentGuardianContractSigned') && !studentDates.parentGuardianContractSigned && !studentIsAdult && studentCourse.parents.length) {
		// Do something
	}
}


// Better
if(studentDates.payment) {
// Do something

	if(!studentDates.studentContractSigned) {
		// Do something
	}

	if(!studentDates.parentGuardianContractSigned && !studentIsAdult && studentCourse.parents.length) {
		// Do something
	}
}


// Just be careful if you need to differentiate between unset and set to false