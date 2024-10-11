export const getIdHash = (target: string, hashlength: number = 4): string => {
  let hash = 0;
  for (let i = 0; i < target.length; i++) {
    hash = (hash + (target.charCodeAt(i) * 19)) % Math.pow(36, hashlength);
  }

  return hash.toString(36).padStart(hashlength, '0');
};

export const getRandomId = (length: number = 4): string => {
  const rand = Math.trunc((Math.random() * 5000000)) % Math.pow(36, length);
  return rand.toString(36).padStart(length, '0');
};