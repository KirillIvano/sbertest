const formatWithZero = num =>  num > 9 ? num : `0${num}`;

export const formatDate = dateStr => {
    const date = new Date(dateStr);

    const unformattedDate = date.getDate();
    const unformattedMonth = date.getMonth() + 1;

    const formattedDate = formatWithZero(unformattedDate);
    const formattedMonth = formatWithZero(unformattedMonth);

    return `${date.getHours()}:${date.getMinutes()} ${formattedDate}.${formattedMonth}.${date.getFullYear()}`;
};
