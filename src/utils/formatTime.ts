export const formatCountdown = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds/1000);
  const ms = Math.floor((milliseconds%1000) /10);
  return `${totalSeconds}.${ms.toString().padStart(2, '0')}`;
}

export const formatPreCountdown = (seconds: number): string => {
  return seconds.toString();
}
