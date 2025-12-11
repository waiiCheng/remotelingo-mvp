# 🤖 Grok 爬虫任务提示词

## 📋 任务概述
爬取**带签证担保+机票+住宿**的多语言远程职位，用于 RemoteLingo 平台。

---

## 🎯 第一批：优先补充现有语言

### 任务 1A：中文职位（目标：30个）
```
搜索关键词：
- "Chinese speaking jobs visa sponsorship relocation"
- "Mandarin customer support relocation package"
- "Chinese content moderator visa flights"
- "Evolution Gaming Chinese"
- "Teleperformance Chinese Athens"

目标公司：
- Evolution Gaming
- Teleperformance
- Concentrix
- TikTok (Trust & Safety)
- ByteDance
- Alibaba (国际部门)
- Tencent (海外)
```

### 任务 1B：西班牙语职位（目标：20个）
```
搜索关键词：
- "Spanish speaking jobs visa sponsorship"
- "Customer service Spanish relocation Europe"
- "Spanish content moderator flights accommodation"
- "BPO Spanish Latin America"

目标公司：
- Teleperformance
- Concentrix
- Majorel
- Foundever
- Evolution Gaming
```

### 任务 1C：德语职位（目标：15个）
```
搜索关键词：
- "German speaking jobs relocation package"
- "Kundenservice Deutsch visa sponsorship"
- "German customer support flights accommodation"

目标公司：
- Teleperformance
- Concentrix
- Amazon (德国办公室)
- Microsoft (欧洲)
```

---

## 🎯 第二批：完全缺失的大语言

### 任务 2A：阿拉伯语（目标：15个）
```
关键词：
- "Arabic speaking jobs visa sponsorship"
- "Arabic customer support Dubai relocation"
- "Content moderator Arabic flights"
```

### 任务 2B：印地语（目标：15个）
```
关键词：
- "Hindi speaking jobs Europe visa"
- "Indian customer service relocation package"
- "Hindi content moderator visa sponsorship"
```

### 任务 2C：意大利语（目标：10个）
```
关键词：
- "Italian speaking jobs relocation"
- "Customer service Italian visa flights"
```

### 任务 2D：荷兰语（目标：10个）
```
关键词：
- "Dutch speaking jobs visa sponsorship"
- "Nederlands customer support relocation"
```

### 任务 2E：泰语（目标：10个）
```
关键词：
- "Thai speaking jobs visa Europe"
- "Thai customer service relocation package"
```

### 任务 2F：越南语（目标：10个）
```
关键词：
- "Vietnamese speaking jobs visa"
- "Vietnamese customer support relocation"
```

### 任务 2G：印尼语（目标：10个）
```
关键词：
- "Indonesian speaking jobs visa"
- "Bahasa Indonesia customer service relocation"
```

---

## ✅ 职位必须符合的条件

### 🔴 硬性要求（缺一不可）
1. ✅ **Visa Sponsorship**（签证担保）
2. ✅ **Relocation Package**（搬迁包）
3. ✅ **Flights Included**（包机票）或 **Accommodation**（包住宿）

### 🟢 职位类型（优先）
- 客服 (Customer Service)
- 内容审核 (Content Moderator)
- 游戏主持 (Game Presenter)
- 翻译 (Translator)
- 技术支持 (Tech Support)
- 销售 (Sales)
- BPO 相关

### 🟡 级别要求
- Entry Level（入门级）优先
- Mid Level（中级）可接受
- 无需编程技能的职位优先

---

## 📊 数据格式（JSON）

```json
{
  "id": 218,
  "title": "Chinese Speaking Customer Support Specialist",
  "company": "Teleperformance",
  "logoBg": "bg-blue-800",
  "initials": "TP",
  "languages": ["Chinese", "English"],
  "level": "Entry Level",
  "salary_min": 20000,
  "salary_max": 30000,
  "currency": "EUR",
  "location": "Athens, Greece (Relocation Provided with Visa & Flights)",
  "type": "Full-time",
  "tags": ["Customer Service", "BPO", "Visa Sponsorship", "Flights Included"],
  "posted_at": "Recent",
  "featured": true,
  "ai_verified": true,
  "source": "Teleperformance Careers",
  "match_score": 95,
  "summary": "Provide customer support in Chinese and English. Full relocation package includes visa sponsorship, flights, and accommodation. Entry-level role for Chinese speakers seeking to move to Europe.",
  "apply_url": "https://www.teleperformance.com/careers"
}
```

### 字段说明：
- **id**: 从 218 开始递增
- **title**: 职位标题（英文）
- **company**: 公司名称
- **logoBg**: 背景色类（参考下方颜色表）
- **initials**: 公司缩写（2-3个字母）
- **languages**: 语言数组（必须包含目标语言）
- **level**: Entry Level / Mid Level / Senior Level
- **salary_min/max**: 年薪范围
- **currency**: EUR / USD / GBP
- **location**: 包含"Relocation Provided"字样
- **type**: Full-time / Part-time
- **tags**: 4个标签，必须包含 "Visa Sponsorship"
- **posted_at**: "Recent" 或 "1 day ago"
- **featured**: true（重要职位）/ false
- **ai_verified**: true
- **source**: 数据来源网站
- **match_score**: 85-98（质量评分）
- **summary**: 3-4句话描述，突出签证+机票+住宿
- **apply_url**: 申请链接

---

## 🎨 公司背景色参考表

```
Teleperformance:    bg-blue-800
Evolution Gaming:   bg-slate-900
Concentrix:         bg-green-800
Majorel:            bg-purple-800
TikTok:             bg-red-800
Amazon:             bg-orange-800
Microsoft:          bg-blue-600
Google:             bg-multicolor-900
Meta:               bg-blue-700
Netflix:            bg-red-900
Booking.com:        bg-blue-900
Agoda:              bg-orange-800
Ubisoft:            bg-red-800
```

如果是新公司，随机选择：
- bg-indigo-800
- bg-teal-800
- bg-cyan-800
- bg-lime-800
- bg-pink-800

---

## 🌐 推荐数据源（按优先级）

### 🥇 Tier 1（最可靠）
1. **https://careers.evolution.com/** - Evolution Gaming 官网
2. **https://www.europelanguagejobs.com/** - 欧洲语言职位专门网站
3. **https://relocate.me/** - 专注签证+搬迁职位
4. **https://www.teleperformance.com/careers** - Teleperformance 官网

### 🥈 Tier 2（质量好）
5. **https://jobs.concentrix.com/**
6. **https://www.majorel.com/careers/**
7. **https://careers.tiktok.com/**
8. **https://www.amazon.jobs/en**
9. **https://careers.microsoft.com/**

### 🥉 Tier 3（聚合网站）
10. **https://www.indeed.com/** - 搜索 "visa sponsorship + [language]"
11. **https://www.linkedin.com/jobs/**
12. **https://www.glassdoor.com/**

---

## 🚫 去重规则（重要！）

### 复合键规则
一个职位被视为**重复**，当且仅当以下三项**全部匹配**：

```
1. company（公司） 相同
2. title（职位名） 相同
3. languages（语言数组） 相同
```

### 示例：

✅ **这两个不是重复**（语言不同）：
```
A: TikTok - Customer Support - [Chinese, English]
B: TikTok - Customer Support - [Japanese, English]
```

❌ **这两个是重复**（三项都相同）：
```
A: Evolution - Game Presenter - [French, English] - Malta
B: Evolution - Game Presenter - [French, English] - Malta
```

### 当前已有数据（避免重复）：
- Evolution - Portuguese Speaking Game Presenter - [Portuguese, English]
- Teleperformance - Portuguese Speaking Customer Support - [Portuguese, English]
- Evolution - French Speaking Game Presenter - [French, English]
- 等等...（共115个职位）

**请确保你爬取的职位不与现有115个重复！**

---

## 📦 输出格式要求

### 方式1：JSON数组（推荐）
```json
[
  { "id": 218, "title": "...", ... },
  { "id": 219, "title": "...", ... },
  { "id": 220, "title": "...", ... }
]
```

### 方式2：逐个输出
```json
{
  "id": 218,
  "title": "Chinese Speaking Customer Support",
  ...
}
```

---

## ⚡ 执行建议

### 分批执行（避免超时）
```
第1次：中文职位 30个（任务1A）
第2次：西班牙语 20个（任务1B）
第3次：德语 15个（任务1C）
第4次：阿拉伯语+印地语 30个（任务2A+2B）
第5次：意大利语+荷兰语 20个（任务2C+2D）
第6次：泰语+越南语+印尼语 30个（任务2E+2F+2G）
```

### 质量检查清单
每批完成后检查：
- [ ] 所有职位都有 "Visa Sponsorship" 标签
- [ ] location 包含 "Relocation Provided"
- [ ] languages 包含目标语言
- [ ] apply_url 是有效链接
- [ ] 无重复职位（复合键检查）

---

## 🎯 第一批执行指令（复制给Grok）

```
请帮我爬取30个中文职位，要求：

✅ 语言：Chinese 或 Mandarin + English
✅ 必须包含：Visa Sponsorship + Relocation + Flights/Accommodation
✅ 优先公司：Evolution, Teleperformance, TikTok, Concentrix
✅ 职位类型：客服、内容审核、游戏主持等入门级
✅ 格式：严格按照上述JSON格式
✅ ID从218开始
✅ 避免与现有115个职位重复（复合键规则）

数据源推荐：
1. https://careers.evolution.com/
2. https://www.europelanguagejobs.com/jobs-for-Chinese-speakers
3. https://relocate.me/search?language=chinese
4. https://careers.tiktok.com/

请输出JSON数组。
```

---

## 📞 联系信息
如有疑问，请在粘贴结果时附上：
- 爬取的语言
- 数据源
- 发现的问题

RemoteLingo 项目路径：
`C:\Users\waiip\Desktop\RemoteLingo\frontend`
