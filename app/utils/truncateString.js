
/**
 * Truncates string and adds "..." to end of string
 * if string surpasses max length.
 * @param String str
 * @param Number maxLength
 * @return String trimmedChannelCaption
 */


function truncateString(str, maxLength) {
    return str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;
}

export default truncateString