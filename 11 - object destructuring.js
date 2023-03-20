const data = {
	level1: { // All of these fields are optional
		level2: {
			level3: {
				targetField: 'Actual value'
			}
		}
	}
};

if (data && data.level1 && data.level1.level2 && data.level1.level2.level3 && data.level1.level2.level3.targetField) {
	// Do something
}

// Best option
if (data?.level1?.level2?.level3?.targetField) {
	// Do something
}

// Runner-up
const {
	level1: {
		level2: {
			level3: { targetField = '' } = {}
		} = {}
	} = {}
} = data || {};

if (targetField) {
	// Do something
}