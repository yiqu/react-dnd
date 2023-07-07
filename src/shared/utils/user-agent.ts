export const shortenUserAgentHash = (hashString: string): string => {
  const first4 = hashString.substring(0, 4);
  const last4 = hashString.substring(hashString.length - 4);
  return `${first4}${last4}`;
};