export async function sendEMailAlerts() {
	try {
		const oInstitutions = await getInstitutions();

		for (const oInstitution of oInstitutions) {
			let courses = await getCoursesByInstitutionAndCategories(oInstitution.slug, ['e-learning', 'behind-the-wheel', 'single-instance']);

			courses = courses.filter(el => !el.studentCourse.categories.includes('failure-to-yield'));

			await sendEMailsByDate(courses, oInstitution);

			if (authService.institutionHasModuleAccess(oInstitution.moduleSettings, 'schedulerAccess')) {
				const currentTime = new Date();
				currentTime.setUTCHours(0, 0, 0, 0);
				const twoDaysFromNow = currentTime.getTime() + 48 * 60 * 60 * 1000;
				const twoDaysFromNowPlus24 = twoDaysFromNow + 24 * 60 * 60 * 1000;
				const timeSlotsForReminders = await getAppointmentsFor48HourReminderEmail(oInstitution, twoDaysFromNow, twoDaysFromNowPlus24);

				for (const timeSlot of timeSlotsForReminders) {
					const userSessionKeys = [];
					for (const session of timeSlot.instance.sessions) {
						// Was already here.  Good job!
						// if (!session.userID || userSessionKeys.find(id => id === session.userID)) continue;
						if (session.userID && userSessionKeys.find(id => id === session.userID)) {
							userSessionKeys.push(session.userID);
							// setup email content
							const oStudent = await getPromise(`user::${session.userID}`);
							const instanceStart = getDateFromLocalTimeAndDate(timeSlot.instance.date, timeSlot.startTime);
							const instanceEnd = getDateFromLocalTimeAndDate(timeSlot.instance.date, timeSlot.endTime);
							const cancelByTime = instanceStart.getTime() - oInstitution.schedulerSettings.minimumCancellationTime;
							const cancelByDateObject = new Date(cancelByTime);
							const sessionsOfUser = getSessionsOfUser(session.userID, timeSlot.instance.sessions);
							const emailAppointmentInfo = {
								startTime: instanceStart.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
								endTime: instanceEnd.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
								instanceDate: instanceStart.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
								instructor: await getPromise(`user::${timeSlot.instructor}`),
								location: await getLocation(null, {locationID: timeSlot.location, institution: oInstitution.slug}),
								cancellationTime: cancelByDateObject.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' }),
								sessions: sessionsOfUser
							};
							await sendEmailForUpcomingAppointment(oInstitution, oStudent, emailAppointmentInfo);
						}
					}
				}
			}
		}

	} catch(e) {
		processError(e, logger, {type: 'chronoEmailService Error:', functionName: 'sendEMailAlerts()'});
		return null;
	}
}

export async function sendEMailAlerts() {
	try {
		const oInstitutions = await getInstitutions();

		for (const oInstitution of oInstitutions) {
			let courses = await getCoursesByInstitutionAndCategories(oInstitution.slug, ['e-learning', 'behind-the-wheel', 'single-instance']);

			courses = courses.filter(el => !el.studentCourse.categories.includes('failure-to-yield'));

			await sendEMailsByDate(courses, oInstitution);

			// Changed this as well
			if (!authService.institutionHasModuleAccess(oInstitution.moduleSettings, 'schedulerAccess')) continue;

			const currentTime = new Date();
			currentTime.setUTCHours(0, 0, 0, 0);
			const twoDaysFromNow = currentTime.getTime() + 48 * 60 * 60 * 1000;
			const twoDaysFromNowPlus24 = twoDaysFromNow + 24 * 60 * 60 * 1000;
			const timeSlotsForReminders = await getAppointmentsFor48HourReminderEmail(oInstitution, twoDaysFromNow, twoDaysFromNowPlus24);

			for (const timeSlot of timeSlotsForReminders) {
				const userSessionKeys = [];
				for (const session of timeSlot.instance.sessions) {
					if (!session.userID || userSessionKeys.find(id => id === session.userID)) continue;
					userSessionKeys.push(session.userID);
					// setup email content
					const oStudent = await getPromise(`user::${session.userID}`);
					const instanceStart = getDateFromLocalTimeAndDate(timeSlot.instance.date, timeSlot.startTime);
					const instanceEnd = getDateFromLocalTimeAndDate(timeSlot.instance.date, timeSlot.endTime);
					const cancelByTime = instanceStart.getTime() - oInstitution.schedulerSettings.minimumCancellationTime;
					const cancelByDateObject = new Date(cancelByTime);
					const sessionsOfUser = getSessionsOfUser(session.userID, timeSlot.instance.sessions);
					const emailAppointmentInfo = {
						startTime: instanceStart.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
						endTime: instanceEnd.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
						instanceDate: instanceStart.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
						instructor: await getPromise(`user::${timeSlot.instructor}`),
						location: await getLocation(null, {locationID: timeSlot.location, institution: oInstitution.slug}),
						cancellationTime: cancelByDateObject.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' }),
						sessions: sessionsOfUser
					};
					await sendEmailForUpcomingAppointment(oInstitution, oStudent, emailAppointmentInfo);
				}
			}
		}

	} catch(e) {
		processError(e, logger, {type: 'chronoEmailService Error:', functionName: 'sendEMailAlerts()'});
		return null;
	}
}