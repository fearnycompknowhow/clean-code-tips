function sendEmails() {
	const mapped = recipientStudentUsers.reduce((result, curr) => {
		if (curr.parents) {
			curr.parents?.forEach(par => {
				if (!result.emailMappings[par.email]) {
					result.emailMappings[par.email] = [];
				}
				if(result.emailMappings[par.email] && !result.emailMappings[par.email].includes(par.userID)) {
					result.emailMappings[par.email].push(par.userID);
				}
				if (!result.allEmails.includes(par.email)) {
					result.allEmails.push(par.email);
				}
			});
		}
		if (!result.emailMappings[curr.email]) {
			result.emailMappings[curr.email] = [];
		}
		if(result.emailMappings[curr.email] && !result.emailMappings[curr.email].includes(curr.userID)) {
			result.emailMappings[curr.email].push(curr.userID);
		}
		if (!result.allEmails.includes(curr.email)) {
			result.allEmails.push(curr.email);
		}
		return result;
	}, { allEmails: [], emailMappings: {} });
}

// Broken down
function sendEmails() {
	const mapped = recipientStudentUsers.reduce((result, curr) => {
		if (curr.parents) {
			curr.parents?.forEach(par => {
				mapUserIdToEmailAddress(par, result.emailMappings, result.allEmails);
			});
		}

		mapUserIdToEmailAddress(user, result.emailMappings, result.allEmails);

		return result;
	}, { allEmails: [], emailMappings: {} });
}

function mapUserIdToEmailAddress(user, emailMappings, allEmails) {
	if (!emailMappings[curr.email]) {
		emailMappings[curr.email] = [];
	}
	if(emailMappings[curr.email] && !emailMappings[curr.email].includes(curr.userID)) {
		emailMappings[curr.email].push(curr.userID);
	}
	if (!allEmails.includes(curr.email)) {
		allEmails.push(curr.email);
	}
}