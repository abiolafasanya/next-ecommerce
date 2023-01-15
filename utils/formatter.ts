
enum CURRENCY {
    NGN = 'NGN',
    USD = 'USD',
}   

const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: CURRENCY.USD, style: 'currency'
})

export function formatCurrency(number: number) {
    return CURRENCY_FORMATTER.format(number)
}