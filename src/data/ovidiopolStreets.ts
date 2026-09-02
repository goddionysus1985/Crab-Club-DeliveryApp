// Directory of streets and lanes in Ovidiopol (смт. Овідіополь) for fast smart autocomplete

export const OVIDIOPOL_STREETS: string[] = [
  'вул. Миру',
  'вул. Вертелецького',
  'вул. Шевченка',
  'вул. Одеська',
  'вул. Портова',
  'вул. Соборна',
  'вул. Суворова',
  'вул. Пушкіна',
  'вул. Івана Франка',
  'вул. Виноградна',
  'вул. Набережна',
  'вул. Молодіжна',
  'вул. Гагаріна',
  'вул. Садова',
  'вул. Залізнична',
  'вул. Калинова',
  'вул. Козацька',
  'вул. Травнева',
  'вул. Дружби',
  'вул. Лісна',
  'вул. Степова',
  'вул. Південна',
  'вул. Центральна',
  'вул. Перемоги',
  'вул. Сонячна',
  'вул. Квіткова',
  'вул. Тиха',
  'вул. Вишнева',
  'вул. Зарічна',
  'вул. Лугова',
  'вул. Космонавтів',
  'вул. Берегова',
  'вул. Лиманська',
  'вул. Шкільна',
  'вул. Лікарняна',
  'пров. Тихий',
  'пров. Морський',
  'пров. Портовий',
  'пров. Шкільний',
  'пров. Лікарняний',
  'пров. Залізничний'
];

/**
 * Filter street recommendations based on user input
 */
export function searchOvidiopolStreets(query: string, maxResults = 5): string[] {
  if (!query || query.trim().length < 1) return [];

  const cleanQuery = query.toLowerCase().replace(/^(вул\.?|пров\.?)\s*/i, '').trim();
  if (!cleanQuery) return [];

  return OVIDIOPOL_STREETS.filter(street => {
    const cleanStreet = street.toLowerCase().replace(/^(вул\.?|пров\.?)\s*/i, '').trim();
    return cleanStreet.includes(cleanQuery) || street.toLowerCase().includes(cleanQuery);
  }).slice(0, maxResults);
}
