# Website Performance Analyzer  
AI-powered Website Performance Analyzer that combines Google PageSpeed Insights with intelligent recommendations. Get instant site audits, prioritized fixes, and downloadable reports.

---

## Input & Button Layout  

- **Input Field:**  
  - Placeholder text: `Enter your website URL (e.g., https://example.com)`  

- **Button:**  
  - Text: `Scan My Website`  
  - **Action:** Calls backend serverless function → Google PageSpeed Insights API → returns simplified report.  

---

## Results Display  

After scanning, results will appear in a **card/table layout**:  

**Website Scan Results for: example.com**  

- ✅ HTTPS Enabled  
- ⚠️ 3 Images missing alt text  
- ❌ 1 Broken link found (Contact Us → `/contactt`)  
- ⚠️ Page load time: 4.2s _(Consider optimizing images/scripts)_  
- ✅ Mobile layout adjusts correctly  

**Legend:**  
- ✅ Pass  
- ⚠️ Warning  
- ❌ Error  

**Optional:** Add an expandable **“See Full Report”** link →  
- Downloads detailed QA PDF  
- OR redirects to **Calendly consultation link**  

---

## Technical Notes (For Developer)  

### Frontend (HTML + CSS)
- Input field + Scan button + Results card  

### Backend (Serverless function / Node.js / Python)  
- Receives URL input  
- Calls **Google PageSpeed Insights API**  

```http
GET https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url={URL}&key={API_KEY}
