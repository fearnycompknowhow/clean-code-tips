// Use defaults that result in a no-op

if (isPopulatedArray(userData.parents)) {
	for (const el of userData.parents) {
		userData.parentObjects.push(await getPromise(`user::${el}`));
	}

	// loop parents and delete sensitive info
	for (const el of userData.parentObjects) {
		secureFields.forEach(e => delete el[e]);
	}
}


// Flatter
for (const el of userData.parents || []) {
	userData.parentObjects.push(await getPromise(`user::${el}`));
}

// loop parents and delete sensitive info
for (const el of userData.parentObjects) {
	secureFields.forEach(e => delete el[e]);
}