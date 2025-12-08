# 📊 RemoteLingo - 数据导入指南

## 🎯 目标：快速填充 50 条职位数据

---

## 方法 1: 使用 CSV 批量导入 (推荐 - 最快)

### Step 1: 准备 CSV 文件

我已经为你创建了一个示例文件: `sample_jobs.csv`

**CSV 格式要点**:
- 数组字段用双引号包裹，格式: `"{""item1"",""item2""}"`
- 示例: `"{""Chinese (Mandarin)"",""English""}"`
- 布尔值: `true` 或 `false`

### Step 2: 导入到 Supabase

1. 打开 Supabase Dashboard
2. 左侧点击 **Table Editor** > `jobs`
3. 点击右上角 **⋯** (三个点) > **Import data via spreadsheet**
4. 上传 `sample_jobs.csv`
5. 确保列映射正确
6. 点击 **Import**

**注意**: 如果导入失败，检查：
- 数组字段格式（双引号转义）
- CSV 编码（UTF-8）
- 列名是否完全匹配

---

## 方法 2: 手动在 Supabase Table Editor 填写

### 快速填写技巧

1. 点击 **Insert row**
2. 逐个字段填写（见下方字段说明）
3. 填完一条后，点击 **Duplicate** 快速复制
4. 修改关键字段（title, company, languages）

### 字段说明

| 字段 | 类型 | 示例值 | 说明 |
|------|------|--------|------|
| `title` | Text | Senior Full Stack Engineer | 职位名称 |
| `company` | Text | TechFlow EU | 公司名称 |
| `logo` | Text | TF | 公司首字母缩写 |
| `color` | Text | bg-blue-600 | Tailwind 颜色类 |
| `languages` | Array | `{"Chinese (Mandarin)", "English"}` | **注意格式**！ |
| `level` | Text | Native/Fluent | 语言水平要求 |
| `salary_min` | Integer | 75000 | 最低薪资（数字） |
| `salary_max` | Integer | 110000 | 最高薪资（数字） |
| `currency` | Text | EUR | USD, EUR, GBP |
| `location` | Text | Remote (EU Timezone) | 工作地点 |
| `type` | Text | Full-time | Full-time, Contract, Freelance |
| `tags` | Array | `{"React", "Node.js", "Fintech"}` | 技能标签 |
| `apply_url` | Text | https://example.com/apply | 申请链接（可选） |
| `featured` | Boolean | ✅ or ❌ | 是否推荐职位 |
| `ai_verified` | Boolean | ✅ or ❌ | AI 验证标记 |
| `source` | Text | Direct Career Page | 数据来源 |
| `match_score` | Integer | 98 | 匹配分数（0-100） |
| `summary` | Text | Requires native Mandarin... | AI 摘要 |

---

## 方法 3: 使用 Supabase SQL Editor (程序员方式)

### 批量插入 SQL 脚本

在 SQL Editor 运行:

```sql
INSERT INTO jobs (
  title, company, logo, color, languages, level,
  salary_min, salary_max, currency, location, type,
  tags, apply_url, featured, ai_verified, source,
  match_score, summary
) VALUES
(
  'Senior Full Stack Engineer',
  'TechFlow EU',
  'TF',
  'bg-blue-600',
  ARRAY['Chinese (Mandarin)', 'English'],
  'Native/Fluent',
  75000,
  110000,
  'EUR',
  'Remote (EU Timezone)',
  'Full-time',
  ARRAY['React', 'Node.js', 'Fintech'],
  'https://example.com/apply',
  true,
  true,
  'Direct Career Page',
  98,
  'Requires native Mandarin for APAC banking integration team.'
),
(
  'Customer Success Manager (APAC)',
  'CloudScale',
  'CS',
  'bg-purple-600',
  ARRAY['Korean', 'English'],
  'Native',
  55000,
  80000,
  'USD',
  'Remote (Global)',
  'Contract',
  ARRAY['SaaS', 'Support', 'B2B'],
  'https://example.com/apply',
  true,
  true,
  'LinkedIn Verified',
  95,
  'Handling enterprise clients in Seoul. B2B SaaS experience critical.'
);

-- 继续添加更多职位...
```

**优点**: 精确控制，可批量插入
**缺点**: 需要手写 SQL（但可以复制粘贴）

---

## 🎨 Logo 颜色参考

```
bg-blue-600    (蓝色 - 科技公司)
bg-purple-600  (紫色 - SaaS)
bg-red-500     (红色 - 游戏/娱乐)
bg-emerald-600 (绿色 - 营销/增长)
bg-indigo-500  (靛蓝 - 金融/支付)
bg-yellow-500  (黄色 - 教育)
bg-pink-500    (粉色 - 设计/创意)
bg-orange-500  (橙色 - 电商)
bg-teal-500    (青色 - 医疗健康)
bg-cyan-600    (青蓝 - 数据分析)
```

---

## 📋 50 条数据的来源建议

### 真实职位网站（手动复制粘贴）

1. **LinkedIn Jobs** - 搜索 "Chinese language remote"
2. **Indeed** - 搜索 "Korean speaker remote"
3. **RemoteOK** - 筛选语言相关职位
4. **We Work Remotely** - 国际职位板
5. **AngelList** - 创业公司职位

### 目标公司官网直接找

**需要中文**:
- Huawei Careers
- Alibaba Cloud Careers
- ByteDance (TikTok) Careers
- Tencent Careers
- JD.com Careers

**需要韩语**:
- Samsung Careers
- LG Careers
- Kakao Careers
- Naver Careers

**需要日语**:
- Sony Careers
- Nintendo Careers
- Rakuten Careers
- Mercari Careers

---

## ⏱️ 时间估算

| 方法 | 50 条数据耗时 |
|------|--------------|
| **CSV 批量导入** | 2-3 小时（准备数据） |
| **手动 Table Editor** | 4-5 小时 |
| **SQL 批量插入** | 2-3 小时 |

---

## ✅ 验证数据

导入完成后，在 SQL Editor 运行:

```sql
-- 检查总数
SELECT COUNT(*) FROM jobs;

-- 查看最新 10 条
SELECT title, company, languages FROM jobs
ORDER BY created_at DESC
LIMIT 10;

-- 按语言统计
SELECT
  unnest(languages) as language,
  COUNT(*) as count
FROM jobs
GROUP BY language
ORDER BY count DESC;
```

---

## 🚨 常见问题

### Q: 数组字段格式错误？
A: Supabase Table Editor 格式: `{"item1", "item2"}`（大括号 + 引号）

### Q: CSV 导入报错？
A:
1. 确保 UTF-8 编码
2. 数组字段用双引号转义: `"{""Chinese"",""English""}"`
3. 检查列名是否完全匹配

### Q: 如何快速填满 50 条？
A:
1. 先填 10 条高质量数据
2. 使用 **Duplicate** 功能复制
3. 批量修改 title 和 company

---

## 🎯 最佳实践

### 数据质量 > 数量

- ✅ 50 条真实、高质量职位
- ❌ 100 条随便凑的垃圾数据

### 优先填写热门语言

1. 中文（Mandarin）- 30 条
2. 韩语 - 10 条
3. 日语 - 10 条

### 保持多样性

- 不同职位类型（工程师、营销、客服）
- 不同薪资范围（$40k - $150k）
- 不同地区（欧洲、美国、全球）

---

## 📊 示例数据分布（建议）

| 语言 | 职位数 | 薪资范围 |
|------|--------|----------|
| 中文 | 30 | $50k - $150k |
| 韩语 | 10 | $45k - $120k |
| 日语 | 10 | $40k - $100k |

| 职位类型 | 数量 |
|----------|------|
| Full-time | 35 |
| Contract | 10 |
| Freelance | 5 |

---

**估计总耗时**: 2-4 小时
**难度**: ⭐⭐⭐☆☆

完成后，前端就能显示真实数据了！🎉
