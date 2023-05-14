const dateFormater = (value: string): string => {
  const monthsID: Array<string> = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const date = new Date(value);
  const month = monthsID[date.getMonth()];
  const day = date.getDay();
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

export default dateFormater;
