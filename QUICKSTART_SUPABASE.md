# 🚀 RemoteLingo - Supabase 版本快速启动

## ⚡ 5 步骤快速上手

### 第 1 步：准备 Supabase (30分钟)

1. 访问 https://supabase.com 并注册
2. 创建新项目 "RemoteLingo"
3. 按照 `SUPABASE_SETUP.md` 执行 SQL 建表
4. 获取 API 凭据

### 第 2 步：配置环境变量 (2分钟)

编辑 `frontend/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://你的项目ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的anon_key
```

### 第 3 步：添加测试数据 (10分钟)

在 Supabase Table Editor 中至少添加 1 条职位数据。

详见: `DATA_IMPORT_GUIDE.md`

### 第 4 步：安装依赖 (3分钟)

```bash
cd frontend
npm install
```

### 第 5 步：启动应用

**Windows**:
```bash
start.bat
```

**Mac/Linux**:
```bash
chmod +x start.sh
./start.sh
```

**或者手动**:
```bash
cd frontend
npm run dev
```

---

## 🌐 访问应用

浏览器打开: **http://localhost:3000**

---

## ✅ 验证成功

你应该看到：
- ✅ 职位列表显示你在 Supabase 添加的数据
- ✅ 语言筛选功能正常
- ✅ 职位类型筛选正常
- ✅ 没有连接错误

---

## 🐛 故障排查

### 问题：看到 "Connection Error"
**解决**:
1. 检查 `.env.local` 文件是否存在
2. 确认 Supabase URL 和 Key 正确
3. 检查浏览器控制台 (F12) 错误信息

### 问题：没有职位显示
**解决**:
1. 在 Supabase Table Editor 确认有数据
2. 检查浏览器 Network 标签，看 API 调用
3. 确认 Row Level Security 策略已设置

### 问题：npm install 失败
**解决**:
1. 确保 Node.js 版本 >= 18
2. 删除 `node_modules` 和 `package-lock.json`
3. 重新运行 `npm install`

---

## 📁 项目结构（简化版）

```
RemoteLingo/
├── frontend/              # Next.js 应用
│   ├── app/              # 页面
│   ├── components/       # React 组件
│   ├── lib/              # Supabase 客户端
│   └── .env.local        # 环境变量（你需要创建）
│
├── SUPABASE_SETUP.md     # Supabase 设置指南
├── DATA_IMPORT_GUIDE.md  # 数据导入指南
└── start.bat / start.sh  # 启动脚本
```

**注意**: 不再需要后端服务器！Next.js 直接连接 Supabase。

---

## 🎯 下一步

1. ✅ 确保应用正常运行
2. 📊 手动填充 50 条职位数据
3. 🎨 测试所有筛选功能
4. 🚀 部署到 Vercel (可选)

---

## 📚 完整文档

- **Supabase 设置**: `SUPABASE_SETUP.md`
- **数据导入**: `DATA_IMPORT_GUIDE.md`
- **完整 README**: `README.md`

---

**估计总时间**: 45 分钟
**难度**: ⭐⭐☆☆☆

准备好了吗？开始吧！🚀
