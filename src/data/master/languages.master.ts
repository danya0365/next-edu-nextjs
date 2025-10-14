export interface Language {
  code: string; // 'th', 'en'
  name: string; // 'ไทย', 'English'
  nativeName: string;
  flag: string; // emoji or icon
}

export const languages: Language[] = [
  {
    code: 'th',
    name: 'ภาษาไทย',
    nativeName: 'ไทย',
    flag: '🇹🇭',
  },
  {
    code: 'en',
    name: 'ภาษาอังกฤษ',
    nativeName: 'English',
    flag: '🇬🇧',
  },
];
