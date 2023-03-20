async function courseSwitch(data, context) {
	try {
		const {
			institution,
			studentCourseID,
			courseID,
			transferPayments,
			transferNotes,
			lastFetch,
		} = data;
		const returnObject = {
			transactions: [],
			user: null
		};

		const existingStudentCourseDocName = `studentCourse::${institution}::${studentCourseID}`;
		const existingStudentCourse = await couchbaseService.DataService.getPromise(existingStudentCourseDocName);
		const oStudent = await couchbaseService.DataService.getPromise(`user::${existingStudentCourse.userID}`);

		if (lastFetch) {
			if (isObjectWithProperty(existingStudentCourse, 'lastUpdate')) {
				if (lastFetch < existingStudentCourse.lastUpdate) {
					throw new Error(dataOutdatedMessage);
				}
			}
		}
		// check if course exists
		const newCourse = await getSingleCourse(institution, courseID, oStudent.school);

		// init new studentCourse
		const newStudentCourse = new StudentCourse({
			courseID,
			institution,
			fee: newCourse.fee,
			downPayment: newCourse.downPayment,
			userID: existingStudentCourse.userID
		});

		// handle auto transaction handling
		const { remainingTransactionsForTransfer, processedTransactions } = await paymentService.createAndTransferDefaultCourseSwitchTransaction(newStudentCourse, existingStudentCourse, newCourse, institution, context);
		returnObject.transactions.push(...processedTransactions);

		if (transferPayments) {
			const transferedTransactions = await paymentService.transferAndAddCourseTransactions(newStudentCourse, institution, remainingTransactionsForTransfer);
			returnObject.transactions.push(...transferedTransactions);
			const foundPayment = returnObject.transactions?.find(trans => utilityService.isPopulatedObject(trans.transactionMethodInfo));
			if (foundPayment) newStudentCourse.dates.payment = utilityService.setTimeByDate({formatArg: 'YYYY-MM-DD', dateArg: foundPayment.createdAt});
		}

		if (transferNotes) {
			newStudentCourse.notes = existingStudentCourse.notes;
		}

		// cancel existing studentCourse
		const savedExistingStudentCourse = await couchbaseService.cancelRegistrationUpdate(studentCourseID, institution);
		graphqlPubSub.publish('STUDENT_COURSE_UPDATED', savedExistingStudentCourse);

		// send cancellation email
		const oInstitution = await couchbaseService.DataService.getPromise(`institution::${institution}`);
		const oParent = oStudent.parents?.length ? await couchbaseService.DataService.getPromise(`user::${oStudent.parents[0]}`) : null;
		const previousCourse = await couchbaseService.DataService.getPromise(`course::${institution}::${existingStudentCourse.course}`);
		await emailService.sendCourseRegistrationCanceledEmail(oInstitution, oStudent, previousCourse);

		// save new student course
		const { docName, ...newStudentCourseData} = newStudentCourse;
		await couchbaseService.DataService.upsertPromise(docName, newStudentCourseData);
		graphqlPubSub.publish('STUDENT_COURSE_UPDATED', newStudentCourseData);

		// add the new course to the user doc
		oStudent.courses.push(docName);
		const updateResults = await couchbaseService.updateData([
			{key: 'courses', value: oStudent.courses},
			{key: 'lastUpdate', value: Date.now()}
		], 'user', `user::${oStudent.userID}`);
		const updatedStudent = updateResults[0];
		returnObject.user = updatedStudent;

		// send new Welcome Letter for new course
		await emailService.sendEmailConfirmation(oInstitution, newCourse, newStudentCourseData.studentCourseID, updatedStudent, oParent, false);

		return returnObject;
	} catch(e) {
		throw utilityService.processError(e, logger, {type: 'coursesService Error:', functionName: 'courseSwitch()'});
	}
}








async function courseSwitch(data, context) {
	try {
		const {
			institution,
			studentCourseID,
			courseID,
			transferPayments,
			transferNotes,
			lastFetch,
		} = data;
		const returnObject = {
			transactions: [],
			user: null
		};

		const existingStudentCourseDocName = `studentCourse::${institution}::${studentCourseID}`;
		const existingStudentCourse = await couchbaseService.DataService.getPromise(existingStudentCourseDocName);
		const oStudent = await couchbaseService.DataService.getPromise(`user::${existingStudentCourse.userID}`);

		throwIfOutdated();

		// check if course exists
		const newCourse = await getSingleCourse(institution, courseID, oStudent.school);

		// init new studentCourse
		const newStudentCourse = new StudentCourse({
			courseID,
			institution,
			fee: newCourse.fee,
			downPayment: newCourse.downPayment,
			userID: existingStudentCourse.userID
		});

		handleAutoTransaction();
		cancelExistingStudentCourse();
		sendCancellationEmail();
		saveNewStudentCourse();
		addNewCourseToUser();

		// send new Welcome Letter for new course
		await emailService.sendEmailConfirmation(oInstitution, newCourse, newStudentCourseData.studentCourseID, updatedStudent, oParent, false);

		return returnObject;
	} catch(e) {
		throw utilityService.processError(e, logger, {type: 'coursesService Error:', functionName: 'courseSwitch()'});
	}
}

function throwIfOutdated() {
	if (!lastFetch) return;
	if (!isObjectWithProperty(existingStudentCourse, 'lastUpdate')) return;
	if (lastFetch >= existingStudentCourse.lastUpdate) return;

	throw new Error(dataOutdatedMessage);
}

function handleAutoTransaction() {
	const { remainingTransactionsForTransfer, processedTransactions } = await paymentService.createAndTransferDefaultCourseSwitchTransaction(newStudentCourse, existingStudentCourse, newCourse, institution, context);
	returnObject.transactions.push(...processedTransactions);

	if (transferPayments) {
		const transferedTransactions = await paymentService.transferAndAddCourseTransactions(newStudentCourse, institution, remainingTransactionsForTransfer);
		returnObject.transactions.push(...transferedTransactions);
		const foundPayment = returnObject.transactions?.find(trans => utilityService.isPopulatedObject(trans.transactionMethodInfo));
		if (foundPayment) newStudentCourse.dates.payment = utilityService.setTimeByDate({formatArg: 'YYYY-MM-DD', dateArg: foundPayment.createdAt});
	}

	if (transferNotes) {
		newStudentCourse.notes = existingStudentCourse.notes;
	}
}

function cancelExistingStudentCourse() {
	const savedExistingStudentCourse = await couchbaseService.cancelRegistrationUpdate(studentCourseID, institution);
	graphqlPubSub.publish('STUDENT_COURSE_UPDATED', savedExistingStudentCourse);
}

function sendCancellationEmail() {
	const oInstitution = await couchbaseService.DataService.getPromise(`institution::${institution}`);
	const oParent = oStudent.parents?.length ? await couchbaseService.DataService.getPromise(`user::${oStudent.parents[0]}`) : null;
	const previousCourse = await couchbaseService.DataService.getPromise(`course::${institution}::${existingStudentCourse.course}`);
	await emailService.sendCourseRegistrationCanceledEmail(oInstitution, oStudent, previousCourse);
}

function saveNewStudentCourse() {
	const { docName, ...newStudentCourseData} = newStudentCourse;
	await couchbaseService.DataService.upsertPromise(docName, newStudentCourseData);
	graphqlPubSub.publish('STUDENT_COURSE_UPDATED', newStudentCourseData);
}

function addNewCourseToUser() {
	oStudent.courses.push(docName);
	const updateResults = await couchbaseService.updateData([
		{key: 'courses', value: oStudent.courses},
		{key: 'lastUpdate', value: Date.now()}
	], 'user', `user::${oStudent.userID}`);
	const updatedStudent = updateResults[0];
	returnObject.user = updatedStudent;
}