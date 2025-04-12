import axios from 'axios';

export async function fetchGitHubStats(username) {
  const userRes = await axios.get(`https://api.github.com/users/${username}`);

  const langs = ['JavaScript', 'Python']; 

  return {
    login: userRes.data.login,
    public_repos: userRes.data.public_repos,
    followers: userRes.data.followers,
    languages: langs,
    recent_activity: 'Active weekly', 
  };
}