// To further illustrate the point that readability matters, the purpose of syntax highlighting is to make code easier to read

// Your eyes cannot grab onto anything in the following code

formatCollectionChanges (change) {
	try {
		if (change[Object.keys(change)[0]].changeType === 'Edited') {
			if ((typeof change[Object.keys(change)[0]].oldValue === 'object' && 'value' in change[Object.keys(change)[0]].oldValue) && (typeof change[Object.keys(change)[0]].newValue === 'object' && 'value' in change[Object.keys(change)[0]].newValue) && (change[Object.keys(change)[0]].oldValue.value !== change[Object.keys(change)[0]].newValue.value) && ('sourceSystem' in change[Object.keys(change)[0]].oldValue && 'sourceSystem' in change[Object.keys(change)[0]].newValue) && change[Object.keys(change)[0]].oldValue.sourceSystem === change[Object.keys(change)[0]].newValue.sourceSystem) {
				return 'The <b>value</b> of <i><b>' + Object.keys(change)[0] + '</b></i> was changed from <b>' + change[Object.keys(change)[0]].oldValue.value + '</b> to <b>' + JSON.stringify(change[Object.keys(change)[0]].newValue.value) + '</b>';
			} else if ((typeof change[Object.keys(change)[0]].oldValue === 'object' && 'sourceSystem' in change[Object.keys(change)[0]].oldValue) && (typeof change[Object.keys(change)[0]].newValue === 'object' && 'sourceSystem' in change[Object.keys(change)[0]].newValue) && change[Object.keys(change)[0]].oldValue.sourceSystem !== change[Object.keys(change)[0]].newValue.sourceSystem) {
				return 'The <b>sourceSystem</b> of <i><b>' + Object.keys(change)[0] + '</b></i> was changed from <b>' + change[Object.keys(change)[0]].oldValue.sourceSystem + '</b> to <b>' + change[Object.keys(change)[0]].newValue.sourceSystem + '</b>';
			} else if ((typeof change[Object.keys(change)[0]].oldValue === 'object' && 'value' in change[Object.keys(change)[0]].oldValue) && (typeof change[Object.keys(change)[0]].newValue === 'object' && 'value' in change[Object.keys(change)[0]].newValue) && (change[Object.keys(change)[0]].oldValue.value === change[Object.keys(change)[0]].newValue.value) && ('sourceSystem' in change[Object.keys(change)[0]].oldValue && 'sourceSystem' in change[Object.keys(change)[0]].newValue) && change[Object.keys(change)[0]].oldValue.sourceSystem === change[Object.keys(change)[0]].newValue.sourceSystem && Object.keys(change[Object.keys(change)[0]].oldValue).length === 3 && Object.keys(change[Object.keys(change)[0]].newValue).length === 3) {
				return 'The <b>' + Object.keys(change[Object.keys(change)[0]].oldValue)[2] + '</b> of <i><b>' + Object.keys(change)[0] + '</b></i> was changed from <b>' + JSON.stringify(change[Object.keys(change)[0]].oldValue[Object.keys(change[Object.keys(change)[0]].oldValue)[2]]) + '</b> to <b>' + JSON.stringify(change[Object.keys(change)[0]].newValue[Object.keys(change[Object.keys(change)[0]].newValue)[2]]) + '</b>';
			} else {
				return '<i><b>' + Object.keys(change)[0] + '</b></i> was changed from <b>' + JSON.stringify(change[Object.keys(change)[0]].oldValue) + '</b> to <b>' + JSON.stringify(change[Object.keys(change)[0]].newValue) + '</b>';
			}
		} else if (change[Object.keys(change)[0]].changeType === 'Added') {
			return '<i><b>' + Object.keys(change)[0] + '</b></i> was added with a value of <b>' + JSON.stringify(change[Object.keys(change)[0]].newValue) + '</b>';
		} else if (change[Object.keys(change)[0]].changeType === 'Deleted') {
			return '<i><b>' + Object.keys(change)[0] + '</b></i> was deleted with the previous value of <b>' + JSON.stringify(change[Object.keys(change)[0]].oldValue) + '</b>';
		}
	} catch (e) {
		return change;
	}
}