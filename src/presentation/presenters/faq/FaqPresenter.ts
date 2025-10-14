export interface FaqCategory {
  id: string;
  name: string;
  icon: string;
}

export interface FaqItem {
  id: string;
  categoryId: string;
  question: string;
  answer: string;
}

export interface FaqViewModel {
  categories: FaqCategory[];
  faqs: FaqItem[];
}

export class FaqPresenter {
  static async getViewModel(): Promise<FaqViewModel> {
    const categories: FaqCategory[] = [
      { id: 'general', name: 'ทั่วไป', icon: '❓' },
      { id: 'courses', name: 'คอร์สเรียน', icon: '📚' },
      { id: 'payment', name: 'การชำระเงิน', icon: '💳' },
      { id: 'technical', name: 'ปัญหาทางเทคนิค', icon: '🔧' },
      { id: 'account', name: 'บัญชีผู้ใช้', icon: '👤' },
    ];

    const faqs: FaqItem[] = [
      // General
      {
        id: 'faq-001',
        categoryId: 'general',
        question: 'Next Edu คืออะไร?',
        answer:
          'Next Edu เป็นแพลตฟอร์มการเรียนรู้ออนไลน์ที่ออกแบบมาเพื่อเด็กและผู้เริ่มต้น มีคอร์สเรียนหลากหลายสาขา ทั้งวิทยาศาสตร์ คณิตศาสตร์ โปรแกรมมิ่ง ศิลปะ และอื่นๆ อีกมากมาย',
      },
      {
        id: 'faq-002',
        categoryId: 'general',
        question: 'เหมาะสำหรับเด็กอายุเท่าไหร่?',
        answer:
          'แพลตฟอร์มของเราออกแบบมาสำหรับเด็กอายุ 6-18 ปี แต่ละคอร์สจะระบุช่วงอายุที่เหมาะสมไว้อย่างชัดเจน และผู้ใหญ่ที่สนใจก็สามารถเรียนได้เช่นกัน',
      },
      {
        id: 'faq-003',
        categoryId: 'general',
        question: 'ต้องมีอุปกรณ์อะไรบ้าง?',
        answer:
          'คุณต้องการอุปกรณ์ดังนี้: 1) คอมพิวเตอร์ แท็บเล็ต หรือสมาร์ทโฟน 2) การเชื่อมต่ออินเทอร์เน็ตที่เสถียร 3) เว็บเบราว์เซอร์ที่ทันสมัย (Chrome, Safari, Firefox, Edge)',
      },

      // Courses
      {
        id: 'faq-004',
        categoryId: 'courses',
        question: 'มีคอร์สอะไรบ้าง?',
        answer:
          'เรามีคอร์สหลากหลายสาขา ได้แก่ การเขียนโปรแกรม (Python, Scratch), วิทยาศาสตร์, คณิตศาสตร์, ภาษาอังกฤษ, ศิลปะ, ดนตรี และอื่นๆ อีกมากมาย คุณสามารถดูคอร์สทั้งหมดได้ที่หน้า "คอร์สทั้งหมด"',
      },
      {
        id: 'faq-005',
        categoryId: 'courses',
        question: 'คอร์สเรียนใช้เวลานานแค่ไหน?',
        answer:
          'ระยะเวลาของแต่ละคอร์สแตกต่างกัน ตั้งแต่ 5-50 ชั่วโมง ขึ้นอยู่กับความยากและเนื้อหา คุณสามารถเรียนตามจังหวะของตัวเองได้ ไม่มีกำหนดเวลาให้เรียนจบ',
      },
      {
        id: 'faq-006',
        categoryId: 'courses',
        question: 'เรียนจบแล้วได้ใบประกาศนียบัตรหรือไม่?',
        answer:
          'ได้ครับ! เมื่อคุณเรียนจบคอร์สและทำแบบทดสอบผ่านเกณฑ์แล้ว คุณจะได้รับใบประกาศนียบัตรอิเล็กทรอนิกส์ที่สามารถดาวน์โหลดและแชร์ได้',
      },
      {
        id: 'faq-007',
        categoryId: 'courses',
        question: 'สามารถเข้าถึงคอร์สได้นานแค่ไหน?',
        answer:
          'หลังจากซื้อคอร์สแล้ว คุณสามารถเข้าถึงเนื้อหาได้ตลอดชีพ ไม่มีวันหมดอายุ และจะได้รับอัพเดทเนื้อหาใหม่ๆ ฟรีด้วย',
      },

      // Payment
      {
        id: 'faq-008',
        categoryId: 'payment',
        question: 'มีวิธีการชำระเงินอะไรบ้าง?',
        answer:
          'เรารับชำระเงินผ่านบัตรเครดิต/เดบิต, Mobile Banking, QR Code พร้อมเพย์, และ True Money Wallet สามารถเลือกวิธีที่สะดวกได้ตอนชำระเงิน',
      },
      {
        id: 'faq-009',
        categoryId: 'payment',
        question: 'มีการคืนเงินหรือไม่?',
        answer:
          'เรามีนโยบายคืนเงิน 100% ภายใน 30 วัน หากคุณไม่พอใจกับคอร์ส โดยไม่ต้องให้เหตุผล สามารถติดต่อขอคืนเงินได้ที่ support@nextedu.com',
      },
      {
        id: 'faq-010',
        categoryId: 'payment',
        question: 'มีส่วนลดหรือโปรโมชั่นหรือไม่?',
        answer:
          'เรามีโปรโมชั่นและส่วนลดเป็นประจำ รวมถึงราคาพิเศษสำหรับการซื้อหลายคอร์ส ติดตามข่าวสารได้ทาง Facebook, Line หรือสมัครรับอีเมล',
      },

      // Technical
      {
        id: 'faq-011',
        categoryId: 'technical',
        question: 'วิดีโอไม่เล่น ต้องทำอย่างไร?',
        answer:
          'ลองทำดังนี้: 1) รีเฟรชหน้าเว็บ 2) ตรวจสอบการเชื่อมต่ออินเทอร์เน็ต 3) ลองเปลี่ยนเบราว์เซอร์ 4) ล้าง cache และ cookies 5) ลดความละเอียดของวิดีโอ หากยังไม่ได้ กรุณาติดต่อทีมสนับสนุน',
      },
      {
        id: 'faq-012',
        categoryId: 'technical',
        question: 'ลืมรหัสผ่าน ทำอย่างไร?',
        answer:
          'คลิกที่ "ลืมรหัสผ่าน" ในหน้าเข้าสู่ระบบ แล้วกรอกอีเมลของคุณ เราจะส่งลิงก์รีเซ็ตรหัสผ่านไปให้ทางอีเมล',
      },
      {
        id: 'faq-013',
        categoryId: 'technical',
        question: 'สามารถใช้งานบนมือถือได้หรือไม่?',
        answer:
          'ได้ครับ! เว็บไซต์ของเราออกแบบให้ใช้งานได้ดีทั้งบนคอมพิวเตอร์ แท็บเล็ต และสมาร์ทโฟน รองรับทุก screen size',
      },

      // Account
      {
        id: 'faq-014',
        categoryId: 'account',
        question: 'สมัครสมาชิกอย่างไร?',
        answer:
          'คลิกปุ่ม "สมัครสมาชิก" มุมขวาบน กรอกข้อมูล (ชื่อ, อีเมล, รหัสผ่าน) ยืนยันอีเมล แล้วก็เริ่มเรียนได้เลย! ใช้เวลาไม่เกิน 2 นาที',
      },
      {
        id: 'faq-015',
        categoryId: 'account',
        question: 'สามารถแก้ไขข้อมูลโปรไฟล์ได้หรือไม่?',
        answer:
          'ได้ครับ! เข้าไปที่เมนู "โปรไฟล์" แล้วคลิก "แก้ไขโปรไฟล์" คุณสามารถเปลี่ยนชื่อ รูปโปรไฟล์ และข้อมูลอื่นๆ ได้ตลอดเวลา',
      },
      {
        id: 'faq-016',
        categoryId: 'account',
        question: 'สามารถใช้บัญชีเดียวกันในหลายอุปกรณ์ได้หรือไม่?',
        answer:
          'ได้ครับ! คุณสามารถล็อกอินด้วยบัญชีเดียวกันในหลายอุปกรณ์ได้ แต่ไม่สามารถใช้งานพร้อมกันได้เกิน 3 อุปกรณ์',
      },
    ];

    return {
      categories,
      faqs,
    };
  }
}

// Server-side factory
export class ServerFaqPresenterFactory {
  static async create(): Promise<FaqViewModel> {
    return FaqPresenter.getViewModel();
  }
}

// Client-side factory
export class ClientFaqPresenterFactory {
  static async create(): Promise<FaqViewModel> {
    return FaqPresenter.getViewModel();
  }
}
