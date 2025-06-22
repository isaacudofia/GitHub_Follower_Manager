🐙 GitHub Follower Check Application
This application helps you manage your GitHub following list by identifying users who are not following you back. This includes people you've followed who never followed you, as well as those who might have followed you back previously but have since unfollowed you. It streamlines the process of identifying such users, so you can decide to unfollow them without tedious manual navigation.

✨ Features
Identifies Non-Followers: Quickly scans your following list and compares it against your follower list to pinpoint users who are not following you back.

Detects Unfollowers: Specifically helps you find users who were once followers but have since unfollowed you.

User-Friendly Interface: A simple and intuitive web interface built with React and pure CSS.

Clear Output Log: Provides real-time updates and lists identified users directly in the application.

Manual Unfollow Facilitation: Presents a list of usernames that you can then choose to unfollow manually on GitHub, saving you time and effort.

⚠️ Critical Security Warning
Your GitHub Personal Access Token (PAT) is a highly sensitive credential.

NEVER SHARE YOUR PAT: Treat your PAT like a password. Do not share it with anyone, commit it to public repositories, or embed it directly in public-facing client-side code for sensitive operations.

CLIENT-SIDE LIMITATION: This application is a client-side demonstration designed for identification purposes only. It DOES NOT perform any unfollowing actions directly on GitHub to protect your PAT. Running write operations (like unfollowing) from client-side code where the PAT is directly visible (e.g., in your browser's developer tools) is a significant security risk.

SECURE UNFOLLOWING: For any automated or direct unfollowing actions, it is highly recommended to build a SERVER-SIDE APPLICATION (a proxy). This server would securely store your PAT and handle all interactions with the GitHub API, acting as a secure intermediary between your browser and GitHub.

🚀 How to Use the Application
Access the Application: Open the index.html file in your web browser (if you've built the React app, it will be served by your development server).

Enter Your GitHub Username: In the designated input field, type your exact GitHub username (e.g., octocat).

Enter Your Personal Access Token (PAT): Paste your GitHub Personal Access Token into the PAT field. (See "How to Get Your Personal Access Token" below).

Click 'Identify Non-Followers': Click the button to start the scanning process.

Review Output: The "Bot Output" section will display the progress and a list of GitHub usernames that are not following you back.

Manual Unfollow: Based on the list provided, you can then manually navigate to those users' profiles on GitHub to unfollow them if you choose.

🔑 How to Get Your Personal Access Token (PAT)
Log in to GitHub: Go to github.com and log into your account.

Go to Settings: Click on your profile picture in the upper-right corner, then select Settings.

Navigate to Developer Settings: In the left sidebar, click Developer settings.

Select Personal Access Tokens: Under "Personal access tokens," click Tokens (classic).

(While "Fine-grained tokens" are newer and more secure, "classic" tokens are simpler for this demonstration.)

Generate New Token: Click the Generate new token (classic) button.

Configure Token:

Note: Give your token a clear, descriptive name (e.g., "GitHubFollowerCheck").

Expiration: Set an expiration date (e.g., 7 days, 30 days). Avoid "No expiration".

Select Scopes: This is crucial. You must select at least the user:follow scope under the "user" section. You might also select read:user or user for broader read access. Always follow the principle of least privilege – only grant the permissions absolutely necessary.

Generate Token: Click the Generate token button at the bottom.

COPY IMMEDIATELY: GitHub will display the token only once. Copy it immediately and save it in a secure place. If you lose it, you'll need to generate a new one.

🛠️ Local Development Setup (for developers)
To run this application locally:

Clone the Repository: (Assuming you have this code in a project).

Install Dependencies:

npm install

Run the Development Server:

npm run dev

This will typically start the application on http://localhost:5173 (or another port).

💡 Future Improvements
Server-Side Proxy: Implement a small backend server (e.g., Node.js with Express, Python with Flask) to securely handle GitHub API requests, especially for unfollow actions, preventing PAT exposure on the client-side.

Automated Unfollow (via server): Once a secure backend is in place, add a feature to automatically unfollow selected users.

User Authentication: Implement proper GitHub OAuth authentication instead of relying solely on PATs for a more robust user experience.

Export List: Add functionality to export the list of non-followers to a file (e.g., CSV).

Developed by Isaac Udofia.
