export interface ContactInfo {
  label: string;
  value: string;
  icon: string;
  link?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface ContactViewModel {
  contactInfo: ContactInfo[];
  socialLinks: SocialLink[];
  officeHours: string;
  address: string;
}

export class ContactPresenter {
  static async getViewModel(): Promise<ContactViewModel> {
    return {
      contactInfo: [
        {
          label: 'อีเมล',
          value: 'support@nextedu.com',
          icon: '📧',
          link: 'mailto:support@nextedu.com',
        },
        {
          label: 'โทรศัพท์',
          value: '02-XXX-XXXX',
          icon: '📞',
          link: 'tel:02XXXXXXX',
        },
        {
          label: 'Line Official',
          value: '@nextedu',
          icon: '💬',
          link: 'https://line.me/R/ti/p/@nextedu',
        },
      ],
      socialLinks: [
        { name: 'Facebook', url: 'https://facebook.com/nextedu', icon: '👍' },
        { name: 'Instagram', url: 'https://instagram.com/nextedu', icon: '📷' },
        { name: 'Twitter', url: 'https://twitter.com/nextedu', icon: '🐦' },
        { name: 'YouTube', url: 'https://youtube.com/nextedu', icon: '📺' },
      ],
      officeHours: 'จันทร์ - ศุกร์: 9:00 - 18:00 น.\nเสาร์ - อาทิตย์: 10:00 - 16:00 น.',
      address: '123 ถนนการศึกษา แขวงวิทยา เขตการเรียนรู้ กรุงเทพฯ 10400',
    };
  }
}

// Server-side factory
export class ServerContactPresenterFactory {
  static async create(): Promise<ContactViewModel> {
    return ContactPresenter.getViewModel();
  }
}

// Client-side factory
export class ClientContactPresenterFactory {
  static async create(): Promise<ContactViewModel> {
    return ContactPresenter.getViewModel();
  }
}
