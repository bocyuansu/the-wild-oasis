import { differenceInDays, formatDistance, parseISO } from 'date-fns';
import { zhTW } from 'date-fns/locale/zh-TW';

// 我們希望這個函式能同時適用於 Date 物件和來自 Supabase 的字串
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    locale: zhTW,
    addSuffix: true,
  })
    .replace('about ', '')
    .replace('in', 'In');

// Supabase 需要一個 ISO 日期字串。然而，這個字串在每次渲染時都會不同，因為毫秒或秒數會發生變化
// 這並不好。因此，我們使用這個技巧來移除時間部分。
export const getToday = function (options = {}) {
  const today = new Date();

  // 這是必要的，因為我們需要與 Supabase 的 created_at 進行比較，而它的時間並不是 00:00:00.000
  // 因此，在與較早的日期進行比較時，我們需要將日期設為當天的結束時間。
  if (options?.end) {
    // 設置為當天的最後一秒 23:59:59
    today.setUTCHours(23, 59, 59, 999);
  } else {
    today.setUTCHours(0, 0, 0, 0);
  }

  return today.toISOString();
};

// Intl.NumberFormat 第一個參數：使用者所在國家、第二個參數：表示的貨幣單位
export const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'TWD',
    maximumFractionDigits: 0,
  }).format(value);
