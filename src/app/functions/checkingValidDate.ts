export function checkingValidDate(due_date: string) {
    const date = new Date(due_date);
    if (isNaN(date.getTime())) {
        // Date is invalid, return current date as string
        return new Date().toISOString();
    }
    // Date is valid, return the original date string
    return due_date;
}
