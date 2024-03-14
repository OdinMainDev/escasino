export const getRandomElements = <T>(arr: T[], count: number): T[] => {
  // Создаем копию массива для перемешивания
  const shuffled = arr.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // ЭС6 деструктуризация для обмена элементов
  }
  // Возвращаем первые 'count' элементов
  return shuffled.slice(0, count);
};
