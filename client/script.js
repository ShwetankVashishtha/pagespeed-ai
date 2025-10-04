document.addEventListener("DOMContentLoaded", () => {
    const scanBtn = document.getElementById("scanBtn");
    const urlInput = document.getElementById("urlInput");
    const resultsContainer = document.getElementById("results");
    const errorBox = document.getElementById("error");
    const loader = document.getElementById("loader");

    // When user clicks "Scan"
    scanBtn.addEventListener("click", async () => {
        const url = urlInput.value.trim();
        if (!url) {
            showError("⚠️ Please enter a website URL");
            return;
        }

        clearUI();
        showLoading(true);

        try {
            const response = await fetch("/api/scan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url }),
            });

            if (!response.ok) throw new Error("Failed to connect to backend");

            const data = await response.json();
            showLoading(false);

            if (!data || !data.issues) {
                showError("❌ Invalid response format from server.");
                return;
            }

            renderResults(data);
        } catch (err) {
            console.error("Fetch Error:", err);
            showLoading(false);
            showError("❌ Something went wrong while scanning. Try again later.");
        }
    });

    // --------------------------
    // Helper Functions
    // --------------------------

    function renderResults(data) {
        // Header
        const header = document.createElement("div");
        header.className = "results-header animate-fade";
        header.innerHTML = `
      <h3>Website Scan Results for: 
        <span>${data.url}</span>
      </h3>
    `;
        resultsContainer.appendChild(header);

        // Issues List
        const list = document.createElement("div");
        list.className = "issues-list";

        data.issues.forEach((issue, index) => {
            const item = document.createElement("div");
            item.className = `issue-card ${issue.status} animate-slide`;
            item.style.animationDelay = `${index * 0.1}s`;

            item.innerHTML = `
        <div class="issue-icon">${getStatusIcon(issue.status)}</div>
        <div class="issue-details">
          <h4>${issue.title}</h4>
          <p>${issue.description}</p>
        </div>
      `;
            list.appendChild(item);
        });

        resultsContainer.appendChild(list);

        // Report Button
        const reportBtn = document.createElement("button");
        reportBtn.textContent = "📄 View Full Report";
        reportBtn.className = "report-btn animate-fade";
        reportBtn.addEventListener("click", () => {
            alert("Detailed PDF report feature coming soon!");
        });
        resultsContainer.appendChild(reportBtn);
    }

    function showError(msg) {
        errorBox.textContent = msg;
        errorBox.style.display = "block";
    }

    function clearUI() {
        resultsContainer.innerHTML = "";
        errorBox.style.display = "none";
    }

    function showLoading(show) {
        loader.style.display = show ? "block" : "none";
    }

    function getStatusIcon(status) {
        switch (status) {
            case "success":
                return "✅";
            case "warning":
                return "⚠️";
            case "error":
                return "❌";
            default:
                return "•";
        }
    }
});
