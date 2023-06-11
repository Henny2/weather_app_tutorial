export const ICON_MAP = new Map()

// creating helper function that sets these values for us
// ICON_MAP.set(0, "sun.svg")
// ICON_MAP.set(1, "sun.svg")

addMapping([0, 1], "sun")
addMapping([2], "cloud-sun")
addMapping([3], "cloud")
addMapping([48, 45], "smog")
addMapping([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82], "cloud-showers-heavy")
addMapping([71, 73, 75, 77, 85, 86], "snowflake")
addMapping([95, 96, 99], "cloud-bolt")

function addMapping(values, icon) {
    values.forEach(val => {
        ICON_MAP.set(val, icon)
    });
}