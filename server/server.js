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
        if (!url) {
            return res.status(400).json({ error: "URL is required" });
        }

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

        res.json({ url, lighthouse: data.lighthouseResult?.categories });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to scan website" });
    }
});

// ✅ Serve static files from client folder
app.use(express.static(path.join(__dirname, "../client")));

// ✅ Catch-all route (for single-page app)
app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
