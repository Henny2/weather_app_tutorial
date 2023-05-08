export function getFormattedHour(timestamp) {
    const date = new Date(timestamp * 1000); // convert Unix timestamp to milliseconds
    let hour = date.getHours();
    const amPm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12; // convert to 12-hour format
    return `${hour} ${amPm}`;
}

export function getDayOfTimestamp(timestamp) {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', { weekday: 'long' })
}