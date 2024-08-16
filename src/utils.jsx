
export const formatTime = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp * 1000); // assuming timestamp is in seconds

    const difference = Math.floor((now - messageTime) / 1000); // difference in seconds

    if (difference < 60) {
        return "just now";
    } else if (difference < 3600) {
        const minutes = Math.floor(difference / 60);
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (difference < 86400) {
        const hours = Math.floor(difference / 3600);
        return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
        const days = Math.floor(difference / 86400);
        return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
};
