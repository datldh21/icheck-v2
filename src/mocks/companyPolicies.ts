// Knowledge base: Quy định, nội quy công ty về ngày phép và chấm công
export interface PolicyEntry {
  id: string;
  keywords: string[];
  question: string;
  answer: string;
  category: 'leave' | 'attendance' | 'wfh' | 'general' | 'request';
}

export const companyPolicies: PolicyEntry[] = [
  // ===== NGHỈ PHÉP NĂM =====
  {
    id: 'p1',
    keywords: ['nghỉ phép', 'phép năm', 'ngày phép', 'annual leave', 'bao nhiêu ngày', 'số ngày phép'],
    question: 'Nhân viên được bao nhiêu ngày nghỉ phép năm?',
    answer:
      'Theo quy định công ty, nhân viên chính thức được hưởng **12 ngày phép năm** có lương. Số ngày phép được tính từ đầu năm và sẽ được reset vào ngày 01/01 hàng năm. Nhân viên mới sẽ được tính phép theo tỷ lệ số tháng làm việc trong năm đầu tiên.',
    category: 'leave',
  },
  {
    id: 'p2',
    keywords: ['cộng dồn', 'tích lũy', 'chuyển phép', 'dồn phép', 'năm sau', 'còn dư'],
    question: 'Ngày phép năm có được cộng dồn sang năm sau không?',
    answer:
      'Ngày phép năm **không được cộng dồn** sang năm sau. Số phép chưa sử dụng hết trong năm sẽ bị mất vào cuối năm (31/12). Vì vậy, bạn nên lên kế hoạch sử dụng phép hợp lý trong năm.',
    category: 'leave',
  },
  {
    id: 'p3',
    keywords: ['xin phép', 'thủ tục', 'quy trình', 'đăng ký', 'cách xin', 'làm sao', 'trước mấy ngày'],
    question: 'Quy trình xin nghỉ phép như thế nào?',
    answer:
      'Để xin nghỉ phép, bạn cần:\n1. Đăng nhập vào hệ thống iCheck\n2. Nhấn nút **"+ Xin nghỉ phép"** trên Dashboard\n3. Chọn loại nghỉ phép, ngày, thời lượng và nhập lý do\n4. Nhấn **"Gửi"** để gửi yêu cầu tới quản lý\n\n⚠️ Yêu cầu nghỉ phép nên gửi **trước ít nhất 3 ngày làm việc**. Trường hợp khẩn cấp có thể xin trước 1 ngày nhưng cần thông báo trực tiếp cho quản lý.',
    category: 'leave',
  },
  {
    id: 'p4',
    keywords: ['nghỉ không lương', 'unpaid', 'hết phép', 'không còn phép'],
    question: 'Nếu hết phép năm thì có thể xin nghỉ không lương không?',
    answer:
      'Khi đã sử dụng hết phép năm, bạn có thể xin **nghỉ không lương** nhưng cần được sự đồng ý của quản lý trực tiếp và phòng HR. Nghỉ không lương quá **5 ngày/tháng** sẽ ảnh hưởng đến đánh giá KPI. Trường hợp đặc biệt (ốm đau, tai nạn) sẽ được xem xét riêng.',
    category: 'leave',
  },

  // ===== NGHỈ THAI SẢN =====
  {
    id: 'p5',
    keywords: ['thai sản', 'maternity', 'sinh con', 'mang thai', 'nghỉ đẻ'],
    question: 'Chế độ nghỉ thai sản như thế nào?',
    answer:
      'Theo Luật Lao động Việt Nam và quy định công ty:\n- **Nữ**: Được nghỉ **6 tháng** thai sản hưởng chế độ BHXH\n- **Nam**: Được nghỉ **5-7 ngày** khi vợ sinh con (tùy trường hợp sinh thường/mổ/sinh đôi)\n- Nhân viên cần nộp giấy tờ bệnh viện cho phòng HR trước ngày dự sinh ít nhất **30 ngày**.',
    category: 'leave',
  },

  // ===== NGHỈ HIẾU =====
  {
    id: 'p6',
    keywords: ['nghỉ hiếu', 'tang', 'funeral', 'mất', 'qua đời', 'đám tang'],
    question: 'Chế độ nghỉ hiếu (tang) ra sao?',
    answer:
      'Nhân viên được nghỉ hiếu có lương trong các trường hợp:\n- **Cha/mẹ, vợ/chồng, con** mất: nghỉ **3 ngày**\n- **Ông/bà nội ngoại, anh/chị/em ruột** mất: nghỉ **1 ngày**\n\nCần cung cấp giấy báo tử hoặc xác nhận cho phòng HR trong vòng 5 ngày sau khi quay lại làm việc.',
    category: 'leave',
  },

  // ===== NGHỈ HỈ =====
  {
    id: 'p7',
    keywords: ['nghỉ hỉ', 'wedding', 'cưới', 'đám cưới', 'kết hôn'],
    question: 'Chế độ nghỉ hỉ (kết hôn) như thế nào?',
    answer:
      'Nhân viên được nghỉ hỉ có lương:\n- **Bản thân kết hôn**: nghỉ **3 ngày**\n- **Con kết hôn**: nghỉ **1 ngày**\n\nCần thông báo trước cho quản lý và phòng HR ít nhất **2 tuần** trước ngày cưới.',
    category: 'leave',
  },

  // ===== GIỜ LÀM VIỆC & CHẤM CÔNG =====
  {
    id: 'p8',
    keywords: ['giờ làm', 'giờ làm việc', 'mấy giờ', 'working hours', 'ca làm', 'bắt đầu', 'kết thúc'],
    question: 'Giờ làm việc của công ty là bao nhiêu?',
    answer:
      'Giờ làm việc chính thức:\n- **Bắt đầu**: 08:30 sáng\n- **Kết thúc**: 18:00 chiều\n- **Nghỉ trưa**: 12:00 - 13:30\n- **Ngày làm việc**: Thứ 2 đến Thứ 6 (Thứ 7 & Chủ nhật nghỉ)\n\nTổng thời gian làm việc: **8 tiếng/ngày**, **40 tiếng/tuần**.',
    category: 'attendance',
  },
  {
    id: 'p9',
    keywords: ['chấm công', 'check in', 'checkin', 'cách chấm', 'điểm danh'],
    question: 'Cách chấm công như thế nào?',
    answer:
      'Chấm công qua hệ thống iCheck:\n1. Đăng nhập vào iCheck (web hoặc app mobile)\n2. **Kết nối Wi-Fi công ty** (hệ thống kiểm tra IP)\n3. Nhấn nút **"CHẤM CÔNG"** trên Dashboard\n\n⚠️ Lưu ý quan trọng:\n- Chỉ cần chấm công **đầu ngày** (không cần check-out)\n- Phải kết nối **Wi-Fi công ty** (IP whitelist)\n- Chỉ lần chấm công **đầu tiên** trong ngày được ghi nhận',
    category: 'attendance',
  },
  {
    id: 'p10',
    keywords: ['đi muộn', 'trễ', 'late', 'muộn bao lâu', 'phạt muộn'],
    question: 'Quy định về đi muộn?',
    answer:
      'Quy định đi muộn:\n- Chấm công sau **08:30** được tính là **đi muộn**\n- Đi muộn cần tạo đề xuất **"Xin đi muộn"** kèm lý do\n- Đi muộn **>3 lần/tháng** mà không có đề xuất được duyệt sẽ bị trừ điểm KPI\n- Đi muộn **>30 phút** mà không có lý do chính đáng có thể bị tính nghỉ nửa ngày không lương',
    category: 'attendance',
  },
  {
    id: 'p11',
    keywords: ['quên chấm công', 'forgot', 'quên checkin', 'không chấm được'],
    question: 'Quên chấm công thì phải làm sao?',
    answer:
      'Nếu quên chấm công:\n1. Tạo đề xuất **"Quên chấm công"** trên iCheck\n2. Nhập ngày quên chấm công và lý do\n3. Gửi để quản lý duyệt\n\n⚠️ Khi đề xuất được duyệt, hệ thống sẽ **tự động cập nhật** bản ghi chấm công cho ngày đó.\n\n🔴 Lưu ý: Quên chấm công **>3 lần/tháng** sẽ bị hệ thống cảnh báo và hiển thị trong báo cáo bất thường của quản lý.',
    category: 'attendance',
  },

  // ===== WORK FROM HOME =====
  {
    id: 'p12',
    keywords: ['wfh', 'work from home', 'làm từ xa', 'remote', 'làm ở nhà', 'từ xa'],
    question: 'Quy định về Work from Home (WFH)?',
    answer:
      'Chính sách Work from Home:\n- Nhân viên được phép WFH tối đa **2 ngày/tuần** (tùy bộ phận)\n- Cần tạo đề xuất WFH trên iCheck và được **quản lý duyệt trước**\n- Trong ngày WFH, nhân viên vẫn phải:\n  • Có mặt online đúng giờ (08:30 - 18:00)\n  • Trả lời tin nhắn/email trong giờ làm việc\n  • Tham gia đầy đủ các cuộc họp online\n- WFH ngày thứ 6 cần đăng ký trước **Thứ 4** cùng tuần',
    category: 'wfh',
  },

  // ===== NGÀY LỄ =====
  {
    id: 'p13',
    keywords: ['ngày lễ', 'holiday', 'lễ tết', 'nghỉ lễ', 'tết', 'quốc khánh', '30/4', '1/5', '2/9'],
    question: 'Các ngày lễ nghỉ trong năm?',
    answer:
      'Các ngày lễ nghỉ có lương trong năm 2026:\n- **Tết Dương lịch**: 01/01\n- **Tết Nguyên đán**: 17/02 - 21/02 (5 ngày)\n- **Giỗ Tổ Hùng Vương**: 06/04\n- **Ngày Giải phóng miền Nam**: 30/04\n- **Ngày Quốc tế Lao động**: 01/05\n- **Ngày Quốc khánh**: 02/09 - 03/09\n\nNếu ngày lễ trùng vào cuối tuần, nhân viên sẽ được **nghỉ bù** vào ngày làm việc tiếp theo.',
    category: 'general',
  },

  // ===== QUY TRÌNH DUYỆT =====
  {
    id: 'p14',
    keywords: ['duyệt', 'approve', 'chờ duyệt', 'ai duyệt', 'bao lâu', 'thời gian duyệt'],
    question: 'Ai duyệt đề xuất và mất bao lâu?',
    answer:
      'Quy trình duyệt đề xuất:\n- Tất cả đề xuất sẽ được gửi tới **quản lý trực tiếp** của bạn\n- Quản lý sẽ nhận thông báo qua **Slack** và có thể duyệt ngay trên Slack hoặc iCheck\n- Thời gian duyệt thường: **trong vòng 24 giờ** (ngày làm việc)\n- Nếu quá 48 giờ chưa được duyệt, bạn nên nhắc trực tiếp quản lý\n\nTrạng thái đề xuất: 🟡 Đang chờ → 🟢 Đã duyệt / 🔴 Từ chối',
    category: 'request',
  },
  {
    id: 'p15',
    keywords: ['từ chối', 'reject', 'bị từ chối', 'không duyệt', 'khiếu nại'],
    question: 'Nếu đề xuất bị từ chối thì phải làm sao?',
    answer:
      'Khi đề xuất bị từ chối:\n1. Kiểm tra lý do từ chối (hiển thị trên iCheck)\n2. Bạn có thể **tạo lại đề xuất mới** với lý do cập nhật\n3. Nếu cần, hãy trao đổi trực tiếp với quản lý để hiểu rõ lý do\n4. Trong trường hợp không đồng ý, có thể liên hệ **phòng HR** để được hỗ trợ',
    category: 'request',
  },

  // ===== TỔNG QUAN =====
  {
    id: 'p16',
    keywords: ['xin chào', 'hello', 'hi', 'chào', 'hey', 'alo'],
    question: 'Lời chào',
    answer:
      'Xin chào! 👋 Tôi là **HR Assistant** của iCheck. Tôi có thể giúp bạn giải đáp các câu hỏi về:\n\n📋 **Nghỉ phép** — phép năm, thai sản, hiếu, hỉ\n⏰ **Chấm công** — giờ làm, đi muộn, quên chấm\n🏠 **WFH** — quy định làm từ xa\n📝 **Đề xuất** — quy trình xin phép, duyệt\n🎉 **Ngày lễ** — lịch nghỉ lễ trong năm\n\nHãy đặt câu hỏi, tôi sẵn sàng hỗ trợ bạn!',
    category: 'general',
  },
  {
    id: 'p17',
    keywords: ['cảm ơn', 'thanks', 'thank', 'ok', 'được rồi'],
    question: 'Cảm ơn',
    answer: 'Không có chi! 😊 Nếu bạn có thêm câu hỏi gì, đừng ngại hỏi tôi nhé. Chúc bạn một ngày làm việc vui vẻ! 🎉',
    category: 'general',
  },
  {
    id: 'p18',
    keywords: ['còn phép', 'phép còn lại', 'kiểm tra phép', 'xem phép'],
    question: 'Làm sao để kiểm tra số ngày phép còn lại?',
    answer:
      'Để kiểm tra số ngày phép còn lại:\n1. Đăng nhập vào **iCheck**\n2. Nhấn **"+ Xin nghỉ phép"** trên Dashboard\n3. Chọn loại **"Nghỉ phép năm"**\n4. Hệ thống sẽ hiển thị **số ngày phép còn lại** ngay bên dưới dropdown\n\nHoặc bạn có thể hỏi phòng HR để được thông tin chi tiết hơn.',
    category: 'leave',
  },
  {
    id: 'p19',
    keywords: ['nghỉ nửa ngày', 'nửa ngày', 'buổi sáng', 'buổi chiều', 'half day'],
    question: 'Có thể xin nghỉ nửa ngày không?',
    answer:
      'Có! Khi tạo đề xuất nghỉ phép, bạn có thể chọn:\n- **Cả ngày** — nghỉ nguyên ngày (trừ 1 ngày phép)\n- **Buổi sáng** — nghỉ sáng, đi làm chiều (trừ 0.5 ngày phép)\n- **Buổi chiều** — đi làm sáng, nghỉ chiều (trừ 0.5 ngày phép)\n- **Custom** — tùy chỉnh thời gian cụ thể\n\nChọn option phù hợp khi tạo đề xuất trên iCheck.',
    category: 'leave',
  },
];
