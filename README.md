# 🐙 GitHub Follower Check Application

This application helps you efficiently manage your GitHub following list. It identifies users who are **not following you back**, including those who may have unfollowed you. This streamlines the process, eliminating the need for tedious manual navigation on GitHub.

## 🌐 Live Demo

**[View Live Application](https://github-follower-check.netlify.app/)**

## ✨ Features

- **Identifies Non-Followers:** Quickly scans your following list and compares it against your follower list to pinpoint users not following you back.
- **Detects Unfollowers:** Helps you find users who previously followed you but have since unfollowed.
- **User-Friendly Interface:** A simple and intuitive web interface built using **React** with pure CSS.
- **Clear Output Log:** Provides real-time updates and lists identified usernames within the application.
- **Manual Unfollow Facilitation:** Generates a list of usernames, allowing you to manually unfollow them on GitHub at your convenience.

## ⚠️ Critical Security Warning

**Your GitHub Personal Access Token (PAT) is a highly sensitive credential.**

- **NEVER SHARE YOUR PAT:** Treat your PAT like a password. Do not share it or embed it in public-facing client-side code for sensitive operations.
- **CLIENT-SIDE LIMITATION:** This application is a **client-side demonstration** designed **for identification only**. It **DOES NOT** perform any unfollowing actions directly on GitHub to protect your PAT. Running write operations (like unfollowing) from client-side code where the PAT is directly visible is a significant security risk.
- **SECURE UNFOLLOWING:** For any automated or direct unfollowing actions, it is **highly recommended** to build a **SERVER-SIDE APPLICATION** (a proxy). This server would securely store your PAT and handle all interactions with the GitHub API.

## 🚀 How to Use the Application

1. **Access the Application:** Run the React development server locally or deploy the compiled application.
2. **Enter Your GitHub Username:** Type your exact GitHub username (e.g., `octocat`).
3. **Enter Your Personal Access Token (PAT):** Paste your PAT into the designated field. (See "How to Get Your Personal Access Token" below for instructions).
4. **Click 'Identify Non-Followers':** Start the scanning process.
5. **Review Output:** The "Bot Output" section will display the progress and a list of GitHub usernames that are not following you back.
6. **Manual Unfollow:** Use the provided list to manually navigate to those users' profiles on GitHub and unfollow them if desired.

## 🔑 How to Get Your Personal Access Token (PAT)

1. **Log in to GitHub:** Go to [github.com](https://github.com) and log into your account.
2. **Go to Settings:** Click your **profile picture** (top-right), then select **Settings**.
3. **Navigate to Developer Settings:** In the left sidebar, click **Developer settings**.
4. **Select Personal Access Tokens:** Under "Personal access tokens," click **Tokens (classic)**.
5. **Generate New Token:** Click the **Generate new token (classic)** button.
6. **Configure Token:**
   - **Note:** Give your token a clear name (e.g., "GitHubFollowerCheck").
   - **Expiration:** Set an expiration date (e.g., 7 or 30 days). **Avoid "No expiration"**.
   - **Select Scopes:** **Crucially**, select at least the `user:follow` scope under the "user" section. Only grant necessary permissions.
7. **Generate Token:** Click the **Generate token** button.
8. **COPY IMMEDIATELY:** GitHub displays the token **only once**. Copy it and save it securely.

## 🛠️ Local Development Setup

To run this **React** application locally:

1. **Clone the Repository:** (Assuming you have this code in a project).
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Run the Development Server:**
   ```bash
   npm run dev
   ```

This will typically start the application on `http://localhost:5173` (or another port).

## 📋 Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- A GitHub account with a Personal Access Token

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


## 👨‍💻 Author

Developed by **Isaac Udofia**.

## ⚠️ Disclaimer

This tool is for educational and personal use only. Please use responsibly and in accordance with GitHub's Terms of Service. The author is not responsible for any misuse of this application.
