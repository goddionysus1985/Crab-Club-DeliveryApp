/**
 * Work Hours & Restaurant Open/Closed Status Utility (Kyiv Timezone)
 * Crab Club Work Schedule: Every day 10:00 - 22:00
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
  
  // Kyiv timezone hours and minutes
  const kyivTimeString = now.toLocaleTimeString('en-US', { timeZone: 'Europe/Kyiv', hour12: false });
  const [hourStr, minStr] = kyivTimeString.split(':');
  const currentHour = parseInt(hourStr, 10);
  const currentMin = parseInt(minStr, 10);
  const totalMinutesNow = currentHour * 60 + currentMin;

  const openMinutes = 10 * 60; // 10:00 AM -> 600 min
  const closeMinutes = 22 * 60; // 22:00 PM -> 1320 min
  const closingSoonMinutes = 21 * 60 + 30; // 21:30 PM -> 1290 min

  const isOpen = totalMinutesNow >= openMinutes && totalMinutesNow < closeMinutes;
  const isClosingSoon = isOpen && totalMinutesNow >= closingSoonMinutes;
  const minutesUntilClose = isOpen ? closeMinutes - totalMinutesNow : 0;

  if (isClosingSoon) {
    return {
      isOpen: true,
      isClosingSoon: true,
      minutesUntilClose,
      statusText: `Кухня зачиняється через ${minutesUntilClose} хв`,
      badgeType: 'closing_soon',
      workHoursText: '10:00 – 22:00',
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
      workHoursText: '10:00 – 22:00',
      nextOpenTimeText: 'Сьогодні до 22:00'
    };
  }

  // Closed (before 10:00 or after 22:00)
  const isBeforeOpen = totalMinutesNow < openMinutes;
  const nextOpenTimeText = isBeforeOpen ? 'Сьогодні з 10:00' : 'Завтра з 10:00';

  return {
    isOpen: false,
    isClosingSoon: false,
    minutesUntilClose: 0,
    statusText: `Заклад закрито • Приймаємо передзамовлення на ${nextOpenTimeText.toLowerCase()}`,
    badgeType: 'closed',
    workHoursText: '10:00 – 22:00',
    nextOpenTimeText
  };
}
