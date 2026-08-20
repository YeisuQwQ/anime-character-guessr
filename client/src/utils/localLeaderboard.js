// 本地战绩榜：记录本机玩家的猜中次数（localStorage，无服务器依赖）

const STORAGE_KEY = 'guessrLocalLeaderboard';
const MAX_ENTRIES = 10;

export function getLocalLeaderboard() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(list)) return [];
    return list
      .filter(e => e && typeof e.attemptsUsed === 'number')
      .sort((a, b) => a.attemptsUsed - b.attemptsUsed || new Date(a.date) - new Date(b.date))
      .slice(0, MAX_ENTRIES);
  } catch {
    return [];
  }
}

/**
 * 添加一条成绩。
 * @returns {{ entries: Array, rank: number }} rank 为 -1 表示未进入前十
 */
export function addLocalLeaderboardEntry(name, attemptsUsed) {
  const entries = getLocalLeaderboard();
  const entry = {
    name: String(name || '玩家').slice(0, 12),
    attemptsUsed,
    date: new Date().toISOString(),
  };
  const next = [...entries, entry]
    .sort((a, b) => a.attemptsUsed - b.attemptsUsed || new Date(a.date) - new Date(b.date))
    .slice(0, MAX_ENTRIES);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* 隐私模式等场景忽略 */
  }
  const rank = next.findIndex(e => e === entry);
  return { entries: next, rank };
}
