import React, { useEffect, useState } from 'react';
import { Octokit } from 'octokit';

const AIReviewModal = ({ repoUrl, onClose }) => {
    const [loading, setLoading] = useState(true);
    const [reviewData, setReviewData] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const analyzeRepo = async () => {
            setLoading(true);
            setError(null);
            try {
                const octokit = new Octokit();
                const { owner, repo } = extractRepoInfo(repoUrl);

                // Fetch repository contents and languages
                const [contents, languages] = await Promise.all([
                    octokit.request('GET /repos/{owner}/{repo}/contents', {
                        owner,
                        repo,
                    }),
                    octokit.request('GET /repos/{owner}/{repo}/languages', {
                        owner,
                        repo,
                    }),
                ]);

                // Analyze repository metrics
                const metrics = {
                    totalFiles: contents.data.length,
                    languages: Object.keys(languages.data),
                    hasReadme: contents.data.some((file) => file.name.toLowerCase() === 'readme.md'),
                    hasTests: contents.data.some((file) =>
                        file.name.toLowerCase().includes('test')
                    ),
                    hasCI: contents.data.some((file) =>
                        file.name.toLowerCase().includes('.github') ||
                        file.name.toLowerCase().includes('.gitlab-ci.yml') ||
                        file.name.toLowerCase().includes('.travis.yml')
                    ),
                };

                // Generate review details and feedback
                const review = {
                    overallScore: calculateOverallScore(metrics),
                    details: generateReviewDetails(metrics),
                };

                const feedback = generateFeedback(metrics);

                setReviewData(review);
                setFeedback(feedback);
            } catch (err) {
                setError('Failed to analyze repository. Please check the URL and try again.');
            } finally {
                setLoading(false);
            }
        };

        const extractRepoInfo = (url) => {
            const urlObj = new URL(url);
            const [, owner, repo] = urlObj.pathname.split('/');
            return { owner, repo };
        };

        const calculateOverallScore = (metrics) => {
            let score = 0;
            if (metrics.hasReadme) score += 20;
            if (metrics.hasTests) score += 30;
            if (metrics.hasCI) score += 20;
            if (metrics.languages.length > 1) score += 30;
            return score;
        };

        const generateReviewDetails = (metrics) => {
            const details = [];
            details.push(
                metrics.hasReadme
                    ? '✓ Repository includes a README file.'
                    : '⨯ Missing a README file.'
            );
            details.push(
                metrics.hasTests
                    ? '✓ Repository includes test files.'
                    : '⨯ No test files found.'
            );
            details.push(
                metrics.hasCI
                    ? '✓ Repository includes CI/CD configuration.'
                    : '⨯ No CI/CD configuration found.'
            );
            details.push(
                metrics.languages.length > 1
                    ? `✓ Repository uses multiple languages: ${metrics.languages.join(', ')}.`
                    : '⨯ Repository uses only one language.'
            );
            return details;
        };

        const generateFeedback = (metrics) => {
            const feedback = [];
            if (!metrics.hasReadme) {
                feedback.push('Consider adding a README file to provide an overview of your project.');
            }
            if (!metrics.hasTests) {
                feedback.push('Add test files to ensure code quality and reliability.');
            }
            if (!metrics.hasCI) {
                feedback.push('Set up CI/CD pipelines to automate testing and deployment.');
            }
            if (metrics.languages.length <= 1) {
                feedback.push('Consider using multiple languages or frameworks to enhance functionality.');
            }
            return feedback;
        };

        analyzeRepo();
    }, [repoUrl]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#161b22] p-6 rounded-lg shadow-lg w-full max-w-3xl">
                <h2 className="text-xl font-bold text-white mb-4">AI Review for Repository</h2>
                <p className="text-gray-300 mb-4">Analyzing repository: {repoUrl}</p>
                {loading ? (
                    <p className="text-gray-400">Loading review...</p>
                ) : error ? (
                    <p className="text-red-400">{error}</p>
                ) : (
                    <div>
                        <p className="text-green-400 text-lg font-bold mb-4">
                            Overall Score: {reviewData.overallScore}%
                        </p>
                        <ul className="text-gray-300 list-disc pl-5 space-y-2">
                            {reviewData.details.map((detail, index) => (
                                <li key={index}>{detail}</li>
                            ))}
                        </ul>
                        <h3 className="text-lg font-bold text-white mt-6">Feedback</h3>
                        <ul className="text-gray-300 list-disc pl-5 space-y-2">
                            {feedback.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <button
                    onClick={onClose}
                    className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default AIReviewModal;