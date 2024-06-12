import { padNumber } from '@/shared/helpers/padNumber';

const dateFormatter = (date: number): string => {
  if (date !== 0) {
    const timestampInMilliseconds = date * 1000;
    const convertedDate = new Date(timestampInMilliseconds);
    return `${padNumber(convertedDate.getDate())}.${padNumber(convertedDate.getMonth() + 1)}.${padNumber(convertedDate.getFullYear())}, ${padNumber(convertedDate.getHours())}:${padNumber(convertedDate.getMinutes())}`;
  }
  return '--.--.----, --:--';
};

export default dateFormatter;
