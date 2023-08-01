export const getParseDate = (str: string) => str.match(/\d{1,2}([\/.-])\d{1,2}\1\d{4}\b/g);

export const getDateFormat = (date: string, format: string) => {
    const newDate = new Date(date);

    const map: { [key: string]: string } = {
      mm: (newDate.getMonth() + 1).toString().padStart(2, '0'),
      dd: newDate.getDate().toString().padStart(2, '0'),
      yy: newDate.getFullYear().toString().slice(-2),
      yyyy: newDate.getFullYear().toString(),
  };
    
    return format.replace(/mm|dd|yyyy|yy/gi, (matched) => map[matched])
  }
  
export const getLocaleDateFormat = (date: number, format: any ) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString('en-US', format);
}
