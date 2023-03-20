export async function getBehindTheWheelRequirementsMet(course, institution, student, studentCourse) {
	if(course.categories.includes('behind-the-wheel')){
		const requiredObserveHours = institution.schedulerSettings.requiredObserveHours;
		const requiredDriveHours = institution.schedulerSettings.requiredDriveHours;
		const completedObserveHours = studentCourse.observationHoursCompleted;
		const completedDriveHours = studentCourse.driveHoursCompleted;

		let metDriveRequirement = (completedDriveHours >= requiredDriveHours ? true : false);
		let metObserveRequirement = false;
		let convertedObserveHours = 0;
		let totalObserves = 0;

		if (student.permitIssuingState === 'WI') {
			convertedObserveHours = (completedDriveHours - requiredDriveHours) > 0 ? (completedDriveHours - requiredDriveHours) * 2 : 0;
		}

		totalObserves = completedObserveHours + convertedObserveHours;
		metObserveRequirement = (totalObserves >= requiredObserveHours ? true : false);

		return(metDriveRequirement && metObserveRequirement);
	}

	return true;
}


// Flatter
export async function getBehindTheWheelRequirementsMet(course, institution, student, studentCourse) {
	if(!course.categories.includes('behind-the-wheel')) return true;

	const requiredObserveHours = institution.schedulerSettings.requiredObserveHours;
	const requiredDriveHours = institution.schedulerSettings.requiredDriveHours;
	const completedObserveHours = studentCourse.observationHoursCompleted;
	const completedDriveHours = studentCourse.driveHoursCompleted;

	let metDriveRequirement = (completedDriveHours >= requiredDriveHours ? true : false);
	let metObserveRequirement = false;
	let convertedObserveHours = 0;
	let totalObserves = 0;

	if (student.permitIssuingState === 'WI') {
		convertedObserveHours = (completedDriveHours - requiredDriveHours) > 0 ? (completedDriveHours - requiredDriveHours) * 2 : 0;
	}

	totalObserves = completedObserveHours + convertedObserveHours;
	metObserveRequirement = (totalObserves >= requiredObserveHours ? true : false);

	return(metDriveRequirement && metObserveRequirement);
}

export async function getBehindTheWheelRequirementsMet(course, institution, student, studentCourse) {
	if (condition1) {
		if (condition2) {
			if (condition3) {
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pellentesque odio sed nibh malesuada, sit amet auctor metus vestibulum. Nunc iaculis pellentesque est feugiat tristique. Vestibulum eget velit luctus leo facilisis sagittis eu ac nisl. Cras rhoncus elit eget maximus bibendum. Mauris eget ultrices eros. Pellentesque id velit eget erat blandit laoreet efficitur in massa. Nulla vel eros quis nulla rutrum lacinia. Donec lobortis orci vitae lorem mattis volutpat. Proin maximus, lacus ornare commodo elementum, orci erat placerat nunc, sed vehicula mauris felis nec eros. Pellentesque at tellus in erat fermentum rutrum. Phasellus eu erat eget nisi pretium dapibus. Sed sodales eu lacus quis finibus. Mauris sed convallis quam, elementum facilisis turpis.

				Aenean laoreet metus condimentum enim porttitor rhoncus. Fusce ullamcorper auctor mi, id convallis velit cursus ut. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec blandit venenatis fermentum. Morbi porttitor egestas aliquet. Curabitur ut dolor sit amet sem aliquet mattis. Suspendisse malesuada eget nibh sit amet dictum. Cras eget lectus condimentum nisl consequat semper non nec quam. Suspendisse aliquam justo a quam porta, egestas tristique tortor eleifend. Praesent eu aliquam velit. Donec arcu nisl, placerat quis quam nec, tincidunt lacinia elit. Curabitur lacus ex, porttitor in posuere eu, sollicitudin sit amet magna. Mauris fringilla, lorem a pellentesque ultrices, massa purus tristique felis, et fermentum libero purus non nisi. Pellentesque purus erat, rutrum in lorem id, rutrum varius elit. Duis facilisis massa non sem cursus pretium.

				Curabitur suscipit tellus risus, non consectetur diam varius quis. Donec euismod lorem magna, sit amet consequat urna sollicitudin at. Praesent ut ligula ac felis porta suscipit. Aenean mollis pharetra nisl, sed congue leo laoreet sit amet. Donec dui felis, tristique ac bibendum sed, dapibus eu erat. Etiam posuere, massa et semper ullamcorper, mauris ex ultrices odio, non mattis lorem neque eget mi. Aliquam a quam dignissim, mollis nunc sed, iaculis justo. Phasellus venenatis elementum justo, vel placerat tortor dignissim vitae. Maecenas ac lorem feugiat, tempor sapien sit amet, viverra nisl.

				Nam dictum in nisl ac placerat. Aenean sed massa ut dui vehicula dignissim. Phasellus faucibus malesuada congue. Quisque dignissim elit nec metus dignissim, et pharetra purus sollicitudin. Nullam blandit cursus enim id efficitur. Nunc eleifend magna vel dui pellentesque ornare. Mauris vel egestas leo. Donec a nunc convallis, condimentum turpis et, tristique leo.


				Quisque posuere finibus quam, et vehicula mi auctor sed. Nullam pellentesque ipsum nec dui venenatis luctus. Morbi cursus augue dolor, sed luctus libero sodales non. Vestibulum ac lacus pulvinar, dapibus nibh a, tincidunt tellus. Proin porta eget mi nec rutrum. Pellentesque ultricies et ipsum ut congue. Vestibulum nec nibh ac erat fermentum mollis dictum vitae augue.

				Proin dignissim dapibus sodales. Sed pellentesque, est vitae faucibus aliquam, odio arcu congue magna, at tincidunt lectus mi eu arcu. Vestibulum malesuada mollis mauris, ac volutpat sem vehicula quis. Phasellus eget orci nec purus feugiat viverra. Fusce iaculis sit amet lacus vel tempor. Quisque eu rhoncus metus, ut interdum magna. Nulla quis volutpat nunc, at elementum massa. Donec sodales diam ex. Curabitur id ex condimentum, sagittis velit non, dapibus sapien. Donec sit amet lacinia urna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Aliquam sem massa, elementum vitae dui sed, pellentesque luctus purus. Ut eu sem luctus, fringilla felis sit amet, commodo tellus.
			}
		}
	}
}

export async function getBehindTheWheelRequirementsMet(course, institution, student, studentCourse) {
	if (!condition1) return;
	if (!condition2) return;
	if (!condition3) return;

	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pellentesque odio sed nibh malesuada, sit amet auctor metus vestibulum. Nunc iaculis pellentesque est feugiat tristique. Vestibulum eget velit luctus leo facilisis sagittis eu ac nisl. Cras rhoncus elit eget maximus bibendum. Mauris eget ultrices eros. Pellentesque id velit eget erat blandit laoreet efficitur in massa. Nulla vel eros quis nulla rutrum lacinia. Donec lobortis orci vitae lorem mattis volutpat. Proin maximus, lacus ornare commodo elementum, orci erat placerat nunc, sed vehicula mauris felis nec eros. Pellentesque at tellus in erat fermentum rutrum. Phasellus eu erat eget nisi pretium dapibus. Sed sodales eu lacus quis finibus. Mauris sed convallis quam, elementum facilisis turpis.

	Aenean laoreet metus condimentum enim porttitor rhoncus. Fusce ullamcorper auctor mi, id convallis velit cursus ut. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec blandit venenatis fermentum. Morbi porttitor egestas aliquet. Curabitur ut dolor sit amet sem aliquet mattis. Suspendisse malesuada eget nibh sit amet dictum. Cras eget lectus condimentum nisl consequat semper non nec quam. Suspendisse aliquam justo a quam porta, egestas tristique tortor eleifend. Praesent eu aliquam velit. Donec arcu nisl, placerat quis quam nec, tincidunt lacinia elit. Curabitur lacus ex, porttitor in posuere eu, sollicitudin sit amet magna. Mauris fringilla, lorem a pellentesque ultrices, massa purus tristique felis, et fermentum libero purus non nisi. Pellentesque purus erat, rutrum in lorem id, rutrum varius elit. Duis facilisis massa non sem cursus pretium.

	Curabitur suscipit tellus risus, non consectetur diam varius quis. Donec euismod lorem magna, sit amet consequat urna sollicitudin at. Praesent ut ligula ac felis porta suscipit. Aenean mollis pharetra nisl, sed congue leo laoreet sit amet. Donec dui felis, tristique ac bibendum sed, dapibus eu erat. Etiam posuere, massa et semper ullamcorper, mauris ex ultrices odio, non mattis lorem neque eget mi. Aliquam a quam dignissim, mollis nunc sed, iaculis justo. Phasellus venenatis elementum justo, vel placerat tortor dignissim vitae. Maecenas ac lorem feugiat, tempor sapien sit amet, viverra nisl.

	Nam dictum in nisl ac placerat. Aenean sed massa ut dui vehicula dignissim. Phasellus faucibus malesuada congue. Quisque dignissim elit nec metus dignissim, et pharetra purus sollicitudin. Nullam blandit cursus enim id efficitur. Nunc eleifend magna vel dui pellentesque ornare. Mauris vel egestas leo. Donec a nunc convallis, condimentum turpis et, tristique leo.


	Quisque posuere finibus quam, et vehicula mi auctor sed. Nullam pellentesque ipsum nec dui venenatis luctus. Morbi cursus augue dolor, sed luctus libero sodales non. Vestibulum ac lacus pulvinar, dapibus nibh a, tincidunt tellus. Proin porta eget mi nec rutrum. Pellentesque ultricies et ipsum ut congue. Vestibulum nec nibh ac erat fermentum mollis dictum vitae augue.

	Proin dignissim dapibus sodales. Sed pellentesque, est vitae faucibus aliquam, odio arcu congue magna, at tincidunt lectus mi eu arcu. Vestibulum malesuada mollis mauris, ac volutpat sem vehicula quis. Phasellus eget orci nec purus feugiat viverra. Fusce iaculis sit amet lacus vel tempor. Quisque eu rhoncus metus, ut interdum magna. Nulla quis volutpat nunc, at elementum massa. Donec sodales diam ex. Curabitur id ex condimentum, sagittis velit non, dapibus sapien. Donec sit amet lacinia urna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Aliquam sem massa, elementum vitae dui sed, pellentesque luctus purus. Ut eu sem luctus, fringilla felis sit amet, commodo tellus.
}