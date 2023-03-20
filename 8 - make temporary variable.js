const hue = (subTotal < 0) ? 0 : (120 - ((120 / 10) * this.numberOfChanges));




/**
 * A green hue
 */
const HUE_MAX = 120;

/**
 * A red hue
 */
const HUE_MIN = 0;
const HUE_DIFFERENCE = HUE_MAX - HUE_MIN;

/**
 * The total number of changes it will take for the save button to change from
 * green to completely red
 */
const NUMBER_OF_HUE_SHIFTS = 10;

const hueShiftPerChange = HUE_DIFFERENCE / NUMBER_OF_HUE_SHIFTS;
const deltaFromMax = HUE_DIFFERENCE - (hueShiftPerChange * this.numberOfChanges);
const subTotal = deltaFromMax + HUE_MIN;
const hue = (subTotal < HUE_MIN) ? HUE_MIN : subTotal;