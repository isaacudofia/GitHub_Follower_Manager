import React, { useState, useCallback, useEffect, useRef } from "react";
import "./style.css"; // Import the CSS file

// --- Components ---

/**
 * SecurityWarning Component
 * Displays a critical security warning.
 */
const SecurityWarning = () => (
  <div className="user-guide" role="alert">
    <h3 className="guide-title">
      How to Use This Application & Important Notes:
    </h3>
    <ul className="guide-list">
      <li>
        <strong>1. Enter Your GitHub Username:</strong> Provide your exact
        GitHub username.
      </li>
      <li>
        <strong>2. Enter Your Personal Access Token (PAT):</strong> Obtain a PAT
        from your GitHub settings (
        <a
          href="https://github.com/settings/tokens"
          target="_blank"
          rel="noopener noreferrer"
        >
          Generate PAT here
        </a>
        ). Ensure it has at least the `user:follow` scope.
      </li>
      <li>
        <strong>3. Click 'Identify Non-Followers':</strong> The application will
        fetch your followers and those you follow, then list who isn't following
        you back.
      </li>
    </ul>
    <p className="guide-footer">
      This tool is for github follower management, created by Isaac Udofia.
    </p>
  </div>
);

/**
 * InputGroup Component
 * A reusable component for input fields with a label.
 * Props: label, id, type, placeholder, value, onChange, disabled
 */
const InputGroup = ({
  label,
  id,
  type,
  placeholder,
  value,
  onChange,
  disabled,
}) => (
  <div className="input-group">
    <label htmlFor={id}>{label}</label>
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  </div>
);

/**
 * ActionButton Component
 * A reusable component for the primary action button.
 * Props: text, onClick, disabled, isLoading
 */
const ActionButton = ({ text, onClick, disabled, isLoading }) => (
  <button className="action-button" onClick={onClick} disabled={disabled}>
    {isLoading ? "Processing... Please wait." : text}
  </button>
);

/**
 * OutputLog Component
 * Displays the bot's log messages.
 * Props: content
 */
const OutputLog = ({ content }) => {
  const logRef = useRef(null);

  // Effect to scroll to the bottom of the log when content changes
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [content]);

  return (
    <div className="output-section">
      <h2 className="output-title">Bot Output:</h2>
      <div ref={logRef} className="output-log-box">
        {content}
      </div>
    </div>
  );
};

// --- Main App Component ---

const App = () => {
  // State variables for inputs and output
  const [githubUsername, setGithubUsername] = useState("");
  const [personalAccessToken, setPersonalAccessToken] = useState("");
  const [outputLogContent, setOutputLogContent] = useState(
    "Awaiting your command... Enter your GitHub username and Personal Access Token, then click 'Identify Non-Followers'."
  );
  const [isLoading, setIsLoading] = useState(false);

  // Base URL for GitHub API
  const GITHUB_API_BASE_URL = "https://api.github.com";

  /**
   * Appends a message to the output log.
   * @param {string} message - The message to log.
   * @param {boolean} [clear=false] - Whether to clear the log before appending.
   */
  const log = useCallback((message, clear = false) => {
    setOutputLogContent((prevLog) => {
      const newLog = clear ? message : prevLog + "\n" + message;
      return newLog;
    });
  }, []);

  /**
   * Pauses execution for a given number of milliseconds.
   * Useful for respecting API rate limits.
   * @param {number} ms - The number of milliseconds to sleep.
   */
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  /**
   * Fetches all items (followers/following) from a paginated GitHub API endpoint.
   * @param {string} url - The initial API URL (e.g., `/user/followers`).
   * @param {string} token - The GitHub Personal Access Token.
   * @returns {Promise<Array<Object>>} - A promise that resolves to an array of all items.
   */
  const fetchAllPaginated = useCallback(
    async (url, token) => {
      let allItems = [];
      let page = 1;
      let hasMore = true;

      log(`Fetching from: ${url}`);

      while (hasMore) {
        const response = await fetch(`${url}?page=${page}&per_page=100`, {
          headers: {
            Authorization: `token ${token}`,
            Accept: "application/vnd.github.v3+json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `GitHub API error (${response.status}): ${errorData.message}`
          );
        }

        const items = await response.json();
        allItems = allItems.concat(items);

        const linkHeader = response.headers.get("Link");
        if (linkHeader && linkHeader.includes('rel="next"')) {
          page++;
          await sleep(500); // Small delay to prevent rate limiting
        } else {
          hasMore = false;
        }
      }
      return allItems;
    },
    [log]
  );

  /**
   * Main function to run the bot.
   */
  const handleIdentifyNonFollowers = useCallback(async () => {
    log("", true); // Clear previous log

    if (!githubUsername || !personalAccessToken) {
      log("Please enter both your GitHub username and Personal Access Token.");
      return;
    }

    setIsLoading(true);

    try {
      log(`Starting identification for user: ${githubUsername}`);
      log("Fetching your followers...");
      const followers = await fetchAllPaginated(
        `${GITHUB_API_BASE_URL}/user/followers`,
        personalAccessToken
      );
      log(`Found ${followers.length} followers.`);
      const followerUsernames = new Set(
        followers.map((f) => f.login.toLowerCase())
      );

      log("Fetching users you are following...");
      const following = await fetchAllPaginated(
        `${GITHUB_API_BASE_URL}/user/following`,
        personalAccessToken
      );
      log(`You are following ${following.length} users.`);

      const nonFollowers = [];
      for (const user of following) {
        if (!followerUsernames.has(user.login.toLowerCase())) {
          nonFollowers.push(user.login);
        }
      }

      if (nonFollowers.length === 0) {
        log(
          "Great news! All users you are following are also following you back."
        );
        log("No unfollow actions needed.");
        return;
      }

      log(
        `\nIdentified ${nonFollowers.length} users who are NOT following you back:`
      );
      nonFollowers.forEach((nf) => log(`- ${nf}`));

      log(`\n------------------------------------------------------------`);
      log(`SECURITY ADVICE: Unfollowing these users via GitHub API`);
      log(`REQUIRES a DELETE request with your Personal Access Token.`);
      log(`\nFor **TRUE SECURITY**, this action should be performed by`);
      log(`a **SERVER-SIDE APPLICATION** (proxy). Your browser would`);
      log(`send a request to your server, and your server would then`);
      log(`securely send the DELETE request to GitHub using your stored PAT.`);
      log(`\nThis client-side application CANNOT perform the unfollow action`);
      log(`securely. The 'unfollowUser' function is not included or called`);
      log(`in this version to prevent PAT exposure.`);
      log(`------------------------------------------------------------`);
    } catch (error) {
      log(`An error occurred: ${error.message}`);
      console.error("Detailed error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [githubUsername, personalAccessToken, fetchAllPaginated, log]);

  return (
    <div className="app-container">
      <div className="main-content-box">
        <h1 className="app-title">
          <span role="img" aria-label="GitHub Octocat" className="octocat-icon">
            🐙
          </span>
          GitHub Follower Check
        </h1>

        <SecurityWarning />

        <InputGroup
          label="Your GitHub Username:"
          id="githubUsername"
          type="text"
          placeholder="e.g., octocat"
          value={githubUsername}
          onChange={(e) => setGithubUsername(e.target.value)}
          disabled={isLoading}
        />

        <InputGroup
          label="Your GitHub Personal Access Token (PAT):"
          id="personalAccessToken"
          type="password"
          placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
          value={personalAccessToken}
          onChange={(e) => setPersonalAccessToken(e.target.value)}
          disabled={isLoading}
        />

        <ActionButton
          text="Identify Non-Followers"
          onClick={handleIdentifyNonFollowers}
          disabled={isLoading}
          isLoading={isLoading}
        />

        <OutputLog content={outputLogContent} />
      </div>
    </div>
  );
};

export default App;
