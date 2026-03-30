export const ConvertDateTime = (data:any) =>{
    if(data!=''){
        const userDate = new Date(data);
        
        // Mengonversi tanggal ke format string ISO
        // const ISODate =  userDate.toISOString();
    
        const day = userDate.getDate();
        const month = userDate.getMonth() + 1;
        const year = userDate.getFullYear();
        const hour = userDate.getHours()
        const minute = userDate.getMinutes()
        
        const formattedDay = (day < 10) ? `0${day}` : day;
        const formattedMonth = (month < 10) ? `0${month}` : month;
        const formattedHour = (hour < 10) ? `0${hour}` : hour;
        const formattedMinute = (minute < 10) ? `0${minute}` : minute;
     
        const value  = {
            date: `${formattedDay}-${formattedMonth}-${year}`,
            time : `${formattedHour}:${formattedMinute}`
        };
    
        return value
    }
    else{
        return data
    }
}
