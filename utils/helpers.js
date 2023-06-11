// expects Unix timestamp in milliseconds
export function getFormattedHour(timestamp) {
    const date = new Date(timestamp);
    let hour = date.getHours();
    const amPm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12; // convert to 12-hour format
    return `${hour} ${amPm}`;
}

// expects Unix timestamp in milliseconds
export function getDayOfTimestamp(timestamp) {
    return new Date(timestamp).toLocaleDateString('en-US', { weekday: 'long' })
}