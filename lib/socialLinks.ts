export const socialLinks = {
  facebook: 'https://www.facebook.com/ChanelleTJ',
  instagram: 'https://www.instagram.com/chanelletjones',
} as const;

export type SocialPlatform = keyof typeof socialLinks;

