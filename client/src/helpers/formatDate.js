const formatWithZero = num =>  num > 9 ? num : `0${num}`;

export const formatDate = dateStr => {
    const date = new Date(dateStr);

    const unformattedHours = date.getHours();
    const unformattedMinutes= date.getMinutes();
    const unformattedDate = date.getDate();
    const unformattedMonth = date.getMonth() + 1;

    const formattedHours = formatWithZero(unformattedHours);
    const formattedMinutes = formatWithZero(unformattedMinutes);
    const formattedDate = formatWithZero(unformattedDate);
    const formattedMonth = formatWithZero(unformattedMonth);

    return `${formattedHours}:${formattedMinutes} ${formattedDate}.${formattedMonth}.${date.getFullYear()}`;
};
