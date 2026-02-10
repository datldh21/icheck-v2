import { companyPolicies, type PolicyEntry } from '../mocks/companyPolicies';

export interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
  relatedPolicies?: PolicyEntry[];
}

// Simple Vietnamese text normalization
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics for matching
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s]/g, '')
    .trim();
}

function scoreMatch(query: string, policy: PolicyEntry): number {
  const normalizedQuery = normalize(query);
  const queryWords = normalizedQuery.split(/\s+/).filter((w) => w.length > 1);
  let score = 0;

  // Check keywords (highest priority)
  for (const keyword of policy.keywords) {
    const normalizedKeyword = normalize(keyword);

    // Exact phrase match in query
    if (normalizedQuery.includes(normalizedKeyword)) {
      score += 10;
    }

    // Keyword words appear in query
    const kwWords = normalizedKeyword.split(/\s+/);
    for (const kwWord of kwWords) {
      if (queryWords.some((qw) => qw.includes(kwWord) || kwWord.includes(qw))) {
        score += 3;
      }
    }
  }

  // Check question text
  const normalizedQuestion = normalize(policy.question);
  const qWords = normalizedQuestion.split(/\s+/).filter((w) => w.length > 1);
  for (const qWord of qWords) {
    if (queryWords.some((qw) => qw.includes(qWord) || qWord.includes(qw))) {
      score += 1;
    }
  }

  return score;
}

function findBestMatches(query: string, maxResults = 2): PolicyEntry[] {
  const scored = companyPolicies
    .map((policy) => ({ policy, score: scoreMatch(query, policy) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) return [];

  // Return top matches with significant scores
  const threshold = scored[0].score * 0.4;
  return scored
    .filter((item) => item.score >= threshold)
    .slice(0, maxResults)
    .map((item) => item.policy);
}

const FALLBACK_RESPONSE =
  'Xin lỗi, tôi chưa tìm thấy thông tin phù hợp với câu hỏi của bạn. 😅\n\nBạn có thể thử hỏi về:\n- **Nghỉ phép** (phép năm, thai sản, hiếu, hỉ)\n- **Chấm công** (giờ làm, đi muộn, quên chấm)\n- **Work from Home**\n- **Ngày lễ**\n- **Quy trình duyệt đề xuất**\n\nHoặc liên hệ **phòng HR** để được hỗ trợ chi tiết hơn.';

const SUGGESTED_QUESTIONS = [
  'Tôi được bao nhiêu ngày phép năm?',
  'Giờ làm việc của công ty?',
  'Quy trình xin nghỉ phép?',
  'Quy định Work from Home?',
  'Các ngày lễ trong năm?',
  'Quên chấm công thì phải làm sao?',
];

export const chatbotService = {
  getWelcomeMessage(): ChatMessage {
    const greeting = companyPolicies.find((p) => p.id === 'p16');
    return {
      id: `msg-welcome`,
      role: 'bot',
      content: greeting?.answer || 'Xin chào! Tôi là HR Assistant. Hãy đặt câu hỏi về quy định công ty.',
      timestamp: new Date(),
    };
  },

  getSuggestedQuestions(): string[] {
    return SUGGESTED_QUESTIONS;
  },

  async getResponse(query: string): Promise<ChatMessage> {
    // Simulate a slight delay like a real API
    await new Promise((resolve) => setTimeout(resolve, 400 + Math.random() * 600));

    const matches = findBestMatches(query);

    let content: string;
    if (matches.length === 0) {
      content = FALLBACK_RESPONSE;
    } else if (matches.length === 1) {
      content = matches[0].answer;
    } else {
      // Multiple relevant topics
      content = matches.map((m) => m.answer).join('\n\n---\n\n');
    }

    return {
      id: `msg-${Date.now()}`,
      role: 'bot',
      content,
      timestamp: new Date(),
      relatedPolicies: matches,
    };
  },
};
