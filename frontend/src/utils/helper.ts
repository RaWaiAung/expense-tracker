import moment from 'moment';

export const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export const getInitials = (name: string) => {
    if (!name) return "";
    const words = name.split(" ");
    let initials = "";

    for (let i = 0; i < Math.min(words.length, 2); i++) {
        initials = words[i][0];
    }

    return initials.toUpperCase();
}

export const addThousandsSeperator = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const formatDate = (date: Date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
}

export const formatDateTime = (date: Date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export const formatTime = (date: Date) => {
    const d = new Date(date);
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

export const prepareExpenseDataForChart = (data: Array<{ category: string; amount: number; }>) => {
    return data.map(item => ({
        category: item.category,
        amount: item.amount,
    }));
}

export const prepareIncomeDataForChart = (data: any) => {
    // handle case where API returns { data: [...] }
    const arrayData = Array.isArray(data) ? data : data?.data || [];

    const sortedData = arrayData.sort(
        (a: { created: string | number | Date; }, b: { created: string | number | Date; }) => new Date(a.created).getTime() - new Date(b.created).getTime()
    );

    return sortedData.map((item: { source: any; amount: any; created: moment.MomentInput; }) => ({
        category: item.source,
        amount: item.amount,
        month: moment(item.created).format('DD, YY')
    }));
};

export const prepareExpenseDataForLineChart = (data: any) => {
    // handle case where API returns { data: [...] }
    const arrayData = Array.isArray(data) ? data : data?.data || [];

    const sortedData = arrayData.sort(
        (a: { created: string | number | Date; }, b: { created: string | number | Date; }) => new Date(a.created).getTime() - new Date(b.created).getTime()
    );

    return sortedData.map((item: { category: any; amount: any; created: moment.MomentInput; }) => ({
        category: item.category,
        amount: item.amount,
        month: moment(item.created).format('DD, MMM')
    }));
};

export const prepareDailyExpenseData = (data: Array<{ date: string; amount: number; }>) => {
    return data.map(item => ({
        date: item.date,
        amount: item.amount,
    }));
}

export const prepareDailyIncomeData = (data: Array<{ date: string; amount: number; }>) => {
    return data.map(item => ({
        date: item.date,
        amount: item.amount,
    }));
}