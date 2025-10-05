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
```


## 🚀 Running the Project Locally

Follow these steps to set up and run the backend server on your local machine:

---

### 🧭 Step 1: Navigate to the Server Folder
```bash
cd server
```

## ⚙️ Local Setup & Server Run Guide

Follow these steps to run the backend server locally:

---

### 🧩 Step 2: Install Dependencies
```bash
npm install
```

### 🔐 Step 3: Create Environment File

In the **project root directory**, create a file named `.env` and add the following variables:

```env
PAGESPEED_API_KEY=<YOUR_PAGESPEED_API_KEY>
PORT=4000
```

### ▶️ Step 4: Start the Local Server
Run the following command to start your backend:

```bash
npm start
```

### 🌐 Step 5: Access the Server

Once the server is up and running, open your browser and navigate to:

🔗 **http://localhost:4000**

---

✅ **Tip:**  
If the server doesn’t start automatically, ensure no other process is using port 4000 or update the `PORT` value in your `.env` file.


