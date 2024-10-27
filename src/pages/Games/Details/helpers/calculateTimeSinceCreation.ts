import { IUserData } from '@/shared/models/interfaces/user';

export function calculateTimeSinceCreation(user: IUserData): number {
  const currentTime = Math.floor(Date.now() / 1000);
  return currentTime - user.created_at;
}
