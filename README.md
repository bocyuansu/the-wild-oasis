# The Wild Oasis

住宿業者的後台管理網站

# 技術說明

- 工具：使用 Vite 快速建立 React 專案
- 前端：React + Tailwind
- 後端：Supabase
- 路由：React Router
- 伺服器狀態管理：TanStack Query（前身 React Query）

# 功能說明

**login**

- 使用 Supabase 實作會員登入功能

**account**

- 變更會員名稱、大頭貼
- 變更密碼

**Dashboard**

- 統計一段期間內的營業資料，將資料以圖表的方式呈現，讓業者快速掌握近期的營業狀況
- 可以從 Dashboard 直接 Check in、Check out

**bookings**

- 將訂房資料以表格的方式呈現
- 可以排序（日期、總價）
- 可以自訂金額區間篩選（總價）
- 針對自訂金額篩選的部分，利用 debounce 做效能優化
- 實作分頁功能（效能優化：使用 TanStack Query 實作分頁提前載入）
- 實作選單功能（查看訂單詳細資料、入住、退房、刪除訂單資料）

**checkin**

- 確認客人是否付款
- 如果客人訂房時沒有加購早餐，此時可以再次選擇是否要加購早餐

**cabins**

- 以表格方式呈現業者提供給客人預訂的房間
- 實作新增房間功能，可以上傳圖片
- 實作編輯房間功能，可以更新房間資料

**users**

- 實作註冊帳號功能，提供新員工使用
- 設定密碼規則，增加安全性

**settings**

- 設定每筆訂單的入住天數上限、入住天數下限、入住客人上限
- 設定早餐價格

**主題**

- 實作 dark-mode、light-mode

# Demo

https://the-wild-oasis-two-ochre.vercel.app
