function format(amount:any, currency?: string){
  return new Intl.NumberFormat("id-ID",
    {
      style:"currency",
      currency:currency || 'IDR',
      currencyDisplay:"narrowSymbol",
      currencySign:"accounting",
      minimumFractionDigits:2
    }
  ).format(amount)
}

export default format
