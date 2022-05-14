
//i can maybe format numbers in the back so i wont need to call this function over and over on each number

export const formatNumber = (num) => {
    const options = {
        minimumFractionDigits: 0,
        maximumFractionDigits: 6
    };
    return num.toLocaleString('en', options)
}
