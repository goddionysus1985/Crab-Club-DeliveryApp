/**
 * Work Hours & Restaurant Open/Closed Status Utility (Kyiv Timezone)
 * Crab Club Work Schedule:
 * - Monday – Saturday: 10:00 – 22:00
 * - Sunday: 11:00 – 22:00
 */

export interface RestaurantScheduleStatus {
  isOpen: boolean;
  isClosingSoon: boolean;
  minutesUntilClose: number;
  statusText: string;
  badgeType: 'open' | 'closing_soon' | 'closed';
  workHoursText: string;
  nextOpenTimeText: string;
}

export function getRestaurantScheduleStatus(): RestaurantScheduleStatus {
  const now = new Date();
  
  // Kyiv timezone day, hours, and minutes
  const kyivTimeString = now.toLocaleTimeString('en-US', { timeZone: 'Europe/Kyiv', hour12: false });
  const kyivDay = new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Kyiv', weekday: 'short' }).format(now);
  
  const [hourStr, minStr] = kyivTimeString.split(':');
  const currentHour = parseInt(hourStr, 10);
  const currentMin = parseInt(minStr, 10);
  const totalMinutesNow = currentHour * 60 + currentMin;

  const isTodaySunday = kyivDay === 'Sun';
  const openHour = isTodaySunday ? 11 : 10;
  const openMinutes = openHour * 60; // 11:00 on Sun (660 min), 10:00 Mon-Sat (600 min)
  const closeMinutes = 22 * 60; // 22:00 (1320 min)
  const closingSoonMinutes = 21 * 60 + 30; // 21:30 (1290 min)

  const isOpen = totalMinutesNow >= openMinutes && totalMinutesNow < closeMinutes;
  const isClosingSoon = isOpen && totalMinutesNow >= closingSoonMinutes;
  const minutesUntilClose = isOpen ? closeMinutes - totalMinutesNow : 0;
  const workHoursText = isTodaySunday ? '11:00 – 22:00 (Нд)' : '10:00 – 22:00';

  if (isClosingSoon) {
    return {
      isOpen: true,
      isClosingSoon: true,
      minutesUntilClose,
      statusText: `Кухня зачиняється через ${minutesUntilClose} хв`,
      badgeType: 'closing_soon',
      workHoursText,
      nextOpenTimeText: 'Сьогодні до 22:00'
    };
  }

  if (isOpen) {
    return {
      isOpen: true,
      isClosingSoon: false,
      minutesUntilClose,
      statusText: 'Онлайн замовлення відкриті',
      badgeType: 'open',
      workHoursText,
      nextOpenTimeText: 'Сьогодні до 22:00'
    };
  }

  // Closed (before opening or after 22:00)
  const isBeforeOpen = totalMinutesNow < openMinutes;
  let nextOpenTimeText = '';
  
  if (isBeforeOpen) {
    nextOpenTimeText = `Сьогодні з ${openHour}:00`;
  } else {
    // After 22:00 -> next day
    const isTomorrowSunday = kyivDay === 'Sat';
    const tomorrowOpenHour = isTomorrowSunday ? 11 : 10;
    nextOpenTimeText = `Завтра з ${tomorrowOpenHour}:00`;
  }

  return {
    isOpen: false,
    isClosingSoon: false,
    minutesUntilClose: 0,
    statusText: `Заклад закрито • Приймаємо передзамовлення на ${nextOpenTimeText.toLowerCase()}`,
    badgeType: 'closed',
    workHoursText,
    nextOpenTimeText
  };
}
