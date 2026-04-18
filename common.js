// ============================================================
// 공통 유틸리티
// ============================================================

// Supabase 클라이언트 생성 (retirement 스키마 자동 지정)
function createSupabaseClient() {
  if (!SUPABASE_CONFIG.url || SUPABASE_CONFIG.url.includes("여기에")) {
    alert("⚠️ config.js 파일의 Supabase URL과 anon key를 먼저 입력해주세요.");
    return null;
  }
  return supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey, {
    db: { schema: SUPABASE_CONFIG.schema },
  });
}

// 날짜 포맷
function formatDate(d) {
  if (!d) return "-";
  const date = typeof d === "string" ? new Date(d) : d;
  if (isNaN(date.getTime())) return "-";
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

function formatDateTime(d) {
  if (!d) return "-";
  const date = typeof d === "string" ? new Date(d) : d;
  if (isNaN(date.getTime())) return "-";
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  return `${formatDate(date)} ${hh}:${mm}`;
}

function daysBetween(from, to) {
  const a = new Date(from);
  const b = new Date(to);
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

// HTML 이스케이프
function esc(str) {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
