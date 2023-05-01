export const getDayOfWeek = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
    return dayOfWeek;
};

export const formatDate = (timestamp: number): string => {
    const date: Date = new Date(timestamp * 1000);

    const monthNames: string[] = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dayOfWeek: string = date.toLocaleDateString("en-US", { weekday: "long" });
    const monthName: string = monthNames[date.getMonth()];

    const dayOfMonth: number = date.getDate();
    const suffix: string =
      ["st", "nd", "rd"][((((dayOfMonth + 90) % 100) - 10) % 10) - 1] || "th";
    const formattedDay: string = `${dayOfMonth}${suffix}`;

    const year: number = date.getFullYear();
    return `${dayOfWeek}, ${monthName} ${formattedDay} ${year}`;
  }