export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface Statistic {
  label: string;
  value: string;
  icon: string;
}

export interface AboutViewModel {
  mission: string;
  vision: string;
  values: string[];
  statistics: Statistic[];
  team: TeamMember[];
}

export class AboutPresenter {
  static async getViewModel(): Promise<AboutViewModel> {
    return {
      mission:
        'สร้างแพลตฟอร์มการเรียนรู้ออนไลน์ที่สนุก เข้าใจง่าย และเหมาะสมสำหรับเด็กทุกคน เพื่อพัฒนาทักษะและความรู้ที่จำเป็นสำหรับอนาคต',
      vision:
        'เป็นแพลตฟอร์มการศึกษาออนไลน์อันดับ 1 ในประเทศไทยที่ทำให้การเรียนรู้เป็นเรื่องสนุกและทุกคนเข้าถึงได้',
      values: [
        'การเรียนรู้ที่สนุกและมีส่วนร่วม',
        'คุณภาพเนื้อหาที่ได้มาตรฐาน',
        'ราคาที่เข้าถึงได้สำหรับทุกคน',
        'การสนับสนุนและติดตามความก้าวหน้า',
      ],
      statistics: [
        { label: 'นักเรียนทั้งหมด', value: '10,000+', icon: '👥' },
        { label: 'คอร์สเรียน', value: '100+', icon: '📚' },
        { label: 'ครูผู้สอน', value: '50+', icon: '👨‍🏫' },
        { label: 'ความพึงพอใจ', value: '98%', icon: '⭐' },
      ],
      team: [
        {
          id: 'team-001',
          name: 'คุณสมชาย ใจดี',
          role: 'ผู้ก่อตั้งและ CEO',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Somchai',
          bio: 'มีประสบการณ์ด้านการศึกษามากกว่า 15 ปี',
        },
        {
          id: 'team-002',
          name: 'คุณสมหญิง รักเรียน',
          role: 'หัวหน้าฝ่ายเนื้อหา',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Somying',
          bio: 'ผู้เชี่ยวชาญด้านการพัฒนาหลักสูตรสำหรับเด็ก',
        },
        {
          id: 'team-003',
          name: 'คุณสมศักดิ์ เทคโนโลยี',
          role: 'หัวหน้าฝ่ายเทคนิค',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Somsak',
          bio: 'นักพัฒนาซอฟต์แวร์ที่มีประสบการณ์มากกว่า 10 ปี',
        },
        {
          id: 'team-004',
          name: 'คุณสมฤดี ออกแบบ',
          role: 'หัวหน้าฝ่ายออกแบบ',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Somrudee',
          bio: 'ผู้เชี่ยวชาญด้าน UX/UI Design สำหรับเด็ก',
        },
      ],
    };
  }
}

// Server-side factory
export class ServerAboutPresenterFactory {
  static async create(): Promise<AboutViewModel> {
    return AboutPresenter.getViewModel();
  }
}

// Client-side factory
export class ClientAboutPresenterFactory {
  static async create(): Promise<AboutViewModel> {
    return AboutPresenter.getViewModel();
  }
}
