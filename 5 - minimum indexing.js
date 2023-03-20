function sendEmails() {
	const mapped = recipientStudentUsers.reduce((result, curr) => {
		if (curr.parents) {
			curr.parents?.forEach(par => {
				mapUserIdToEmailAddress(par, result.emailAddressesMappedToUserIds, result.allEmailAddresses);
			});
		}

		mapUserIdToEmailAddress(user, result.emailAddressesMappedToUserIds, result.allEmailAddresses);

		return result;
	}, { allEmailAddresses: [], emailAddressesMappedToUserIds: {} });
}

function mapUserIdToEmailAddress(user, emailAddressesMappedToUserIds, allEmailAddresses) {
	const userIds = emailAddressesMappedToUserIds[user.email] || [];

	if (!userIds.contains(user.userID)) {
		userIds.push(user.userID);

		emailAddressesMappedToUserIds[user.email] = userIds;
	}

	if (!allEmailAddresses.contains(user.email)) {
		allEmailAddresses.push(user.email);
	}
}