// AI Analysis Service - Simulates monthly HR analytics insights
// In production, this would call an LLM API (e.g. OpenAI, Gemini)

export interface AnalysisInsight {
  id: string;
  type: 'positive' | 'warning' | 'critical' | 'suggestion';
  title: string;
  detail: string;
  metric?: string;
  metricLabel?: string;
}

export interface MonthlyAnalysis {
  month: number;
  year: number;
  summary: string;
  overallScore: number; // 0-100
  scoreLabel: string;
  insights: AnalysisInsight[];
  generatedAt: string;
}

// Simulated AI analysis results per month
const analysisDatabase: Record<string, MonthlyAnalysis> = {
  '2026-2': {
    month: 2,
    year: 2026,
    summary:
      'Tháng 2/2026 ghi nhận tỷ lệ chấm công đúng giờ đạt 87%, giảm nhẹ so với tháng trước (93%). Nguyên nhân chính đến từ kỳ nghỉ Tết Nguyên đán kéo dài và giai đoạn quay lại làm việc sau Tết. Số lượng đề xuất WFH tăng 25% cho thấy xu hướng làm việc linh hoạt đang gia tăng.',
    overallScore: 78,
    scoreLabel: 'Khá',
    insights: [
      {
        id: 'i1',
        type: 'warning',
        title: 'Tỷ lệ đi muộn tăng sau Tết',
        detail:
          'Trong tuần đầu tiên sau Tết (09/02 - 13/02), có 6/11 nhân viên đi muộn ít nhất 1 lần. Đây là hiện tượng phổ biến sau kỳ nghỉ dài. Đề xuất nhắc nhở nhẹ nhàng qua Slack và theo dõi trong 2 tuần tới.',
        metric: '54.5%',
        metricLabel: 'Tỷ lệ đi muộn tuần đầu sau Tết',
      },
      {
        id: 'i2',
        type: 'critical',
        title: 'Nguyễn Bảo Đức - Quên chấm công nhiều lần',
        detail:
          'Nhân viên Nguyễn Bảo Đức đã quên chấm công 4 lần trong tháng 2, vượt ngưỡng cảnh báo (>3 lần). Xu hướng này đã lặp lại 2 tháng liên tiếp. Đề xuất trao đổi trực tiếp để tìm hiểu nguyên nhân và hỗ trợ.',
        metric: '4 lần',
        metricLabel: 'Quên chấm công',
      },
      {
        id: 'i3',
        type: 'positive',
        title: 'Tỷ lệ sử dụng đề xuất online tăng',
        detail:
          '100% đề xuất nghỉ phép và WFH được gửi qua hệ thống iCheck, không còn trường hợp xin phép ngoài hệ thống. Điều này cho thấy đội ngũ đã quen với quy trình digital.',
        metric: '100%',
        metricLabel: 'Đề xuất qua hệ thống',
      },
      {
        id: 'i4',
        type: 'suggestion',
        title: 'Nên xem xét chính sách WFH linh hoạt hơn',
        detail:
          'Số lượng đề xuất WFH tháng 2 tăng 25% so với tháng 1. Đặc biệt, 80% đề xuất WFH tập trung vào ngày Thứ 6. Đề xuất mở rộng chính sách WFH lên 3 ngày/tuần cho phòng Engineering để tăng hiệu quả và giữ chân nhân viên.',
        metric: '+25%',
        metricLabel: 'Tăng trưởng WFH',
      },
      {
        id: 'i5',
        type: 'positive',
        title: 'Phòng Design duy trì kỷ luật tốt',
        detail:
          'Phòng Design (2 nhân viên) có tỷ lệ đúng giờ 100% trong tháng 2 và không có đề xuất quên chấm công nào. Đây là phòng ban có kỷ luật chấm công tốt nhất.',
        metric: '100%',
        metricLabel: 'Đúng giờ',
      },
      {
        id: 'i6',
        type: 'warning',
        title: 'Thứ 6 là ngày có tỷ lệ vắng cao nhất',
        detail:
          'Phân tích cho thấy 60% các đề xuất nghỉ phép và WFH tập trung vào ngày Thứ 6. Điều này có thể ảnh hưởng đến tiến độ công việc cuối tuần. Đề xuất quản lý sắp xếp các deadline quan trọng tránh ngày Thứ 6.',
        metric: '60%',
        metricLabel: 'Nghỉ/WFH vào Thứ 6',
      },
    ],
    generatedAt: new Date().toISOString(),
  },
  '2026-1': {
    month: 1,
    year: 2026,
    summary:
      'Tháng 1/2026 là tháng có kết quả chấm công tốt nhất trong quý 4/2025 - quý 1/2026 với tỷ lệ đúng giờ đạt 93%. Không có trường hợp bất thường nghiêm trọng. Tuy nhiên cần chú ý 2 nhân viên có dấu hiệu đi muộn lặp lại.',
    overallScore: 91,
    scoreLabel: 'Tốt',
    insights: [
      {
        id: 'j1',
        type: 'positive',
        title: 'Tỷ lệ đúng giờ cao nhất trong 6 tháng',
        detail:
          'Tháng 1/2026 đạt 93% đúng giờ - cao nhất kể từ tháng 9/2025. Cho thấy các biện pháp nhắc nhở cuối năm 2025 đã phát huy hiệu quả.',
        metric: '93%',
        metricLabel: 'Đúng giờ',
      },
      {
        id: 'j2',
        type: 'suggestion',
        title: 'Chuẩn bị nhân sự cho kỳ nghỉ Tết',
        detail:
          'Tết Nguyên đán 2026 rơi vào 17-21/02. Dự kiến sẽ có nhiều nhân viên xin phép trước và sau Tết. Đề xuất lên kế hoạch trực và phân công công việc từ cuối tháng 1.',
        metric: '5 ngày',
        metricLabel: 'Nghỉ Tết',
      },
      {
        id: 'j3',
        type: 'warning',
        title: 'Đào Hoàng Hiệp - xu hướng đi muộn',
        detail:
          'Nhân viên Đào Hoàng Hiệp đi muộn 3 lần trong tháng 1, đạt ngưỡng cảnh báo. Tất cả đều vào ngày Thứ 2 đầu tuần. Nên trao đổi nhẹ nhàng về nguyên nhân.',
        metric: '3 lần',
        metricLabel: 'Đi muộn',
      },
    ],
    generatedAt: new Date().toISOString(),
  },
  '2025-12': {
    month: 12,
    year: 2025,
    summary:
      'Tháng 12/2025 tỷ lệ đúng giờ đạt 90%. Cuối năm có số lượng đề xuất nghỉ phép tăng đáng kể do nhân viên sử dụng phép năm còn lại trước khi hết hạn. Cần chú ý cân bằng giữa nhu cầu nghỉ phép của nhân viên và tiến độ dự án.',
    overallScore: 84,
    scoreLabel: 'Khá',
    insights: [
      {
        id: 'k1',
        type: 'warning',
        title: 'Tăng đột biến nghỉ phép cuối năm',
        detail:
          'Số ngày nghỉ phép sử dụng trong tháng 12 tăng 150% so với tháng 11. 7/11 nhân viên sử dụng phép trong tháng này, chủ yếu ở 2 tuần cuối.',
        metric: '+150%',
        metricLabel: 'Tăng nghỉ phép',
      },
      {
        id: 'k2',
        type: 'suggestion',
        title: 'Xem xét chính sách chuyển phép năm',
        detail:
          'Việc dồn phép cuối năm gây thiếu hụt nhân sự. Đề xuất cho phép chuyển tối đa 3 ngày phép sang năm sau để giảm tình trạng này.',
        metric: '3 ngày',
        metricLabel: 'Đề xuất chuyển phép',
      },
    ],
    generatedAt: new Date().toISOString(),
  },
};

export const aiAnalysisService = {
  async getMonthlyAnalysis(year: number, month: number): Promise<MonthlyAnalysis | null> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 1200));

    const key = `${year}-${month}`;
    return analysisDatabase[key] || null;
  },

  async generateAnalysis(year: number, month: number): Promise<MonthlyAnalysis> {
    // Simulate AI generation delay
    await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 2000));

    const existing = analysisDatabase[`${year}-${month}`];
    if (existing) return existing;

    // Fallback generic analysis
    const generic: MonthlyAnalysis = {
      month,
      year,
      summary: `Chưa có đủ dữ liệu để phân tích chi tiết cho tháng ${month}/${year}. Hệ thống cần tối thiểu 10 ngày làm việc có dữ liệu chấm công để tạo báo cáo phân tích.`,
      overallScore: 0,
      scoreLabel: 'Chưa đủ dữ liệu',
      insights: [],
      generatedAt: new Date().toISOString(),
    };
    return generic;
  },
};
