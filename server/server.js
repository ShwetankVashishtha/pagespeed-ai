import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());

// 👇 Serve frontend files (client folder)
app.use(express.static(path.join(__dirname, "../client")));

const PORT = process.env.PORT || 4000;

// ✅ Backend route for scanning
app.post("/api/scan", async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) return res.status(400).json({ error: "URL is required" });

        const apiKey = process.env.PAGESPEED_API_KEY;

        if (!apiKey) {
            // Mock results (if no API key)
            return res.json({
                url,
                issues: [
                    { title: "Performance Check", status: "success", description: "Site loads fast" },
                    { title: "SEO Title", status: "warning", description: "Meta title too short" },
                    { title: "Accessibility", status: "error", description: "Low contrast text" },
                ],
            });
        }

        // 🔥 Real PageSpeed API call (if API key available)
        const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.error(data);
        if (!data.lighthouseResult) {
            return res.status(400).json({ error: "Invalid PageSpeed response" });
        }

        const lighthouse = data.lighthouseResult;
        const audits = lighthouse.audits;
        const categories = lighthouse.categories;

        const performanceScore = Math.round(categories.performance.score * 100);
        const fcp = audits["first-contentful-paint"].displayValue;
        const lcp = audits["largest-contentful-paint"].displayValue;
        const cls = audits["cumulative-layout-shift"].displayValue;
        const tbt = audits["total-blocking-time"].displayValue;

        const issues = [
            { title: "Performance Score", status: getStatus(performanceScore), description: `${performanceScore}/100` },
            { title: "First Contentful Paint", status: "success", description: fcp },
            { title: "Largest Contentful Paint", status: "success", description: lcp },
            { title: "Cumulative Layout Shift", status: "success", description: cls },
            { title: "Total Blocking Time", status: "success", description: tbt },
        ];

        res.json({ url, issues });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to scan website" });
    }
});

function getStatus(score) {
    if (score >= 90) return "success";
    if (score >= 50) return "warning";
    return "error";
}

// ✅ SPA fallback route
app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
