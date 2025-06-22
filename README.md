# 🐙 GitHub Follower Check

Identify GitHub users who don't follow you back. Built with React for client-side identification only.

## ✨ Features

- Find users who don't follow you back
- Detect users who unfollowed you
- Simple web interface with real-time output
- Manual unfollow facilitation

## ⚠️ Security Warning

**NEVER SHARE YOUR PAT.** This is client-side only - no automated unfollowing for security. For write operations, use a server-side proxy.

## 🚀 Quick Start

1. Open `index.html` in your browser
2. Enter your GitHub username
3. Enter your Personal Access Token
4. Click "Identify Non-Followers"
5. Review the output and manually unfollow on GitHub

## 🔑 Getting Your PAT

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `user:follow` scope
3. Copy immediately (shown only once)

## 🛠️ Development

```bash
npm install
npm run dev
```

## 💡 Future Plans

- Server-side proxy for secure operations
- Automated unfollowing
- OAuth authentication
- Export functionality

---

**Developed by Isaac Udofia**
