
# Prospect Finder AI 🤖

Prospect Finder AI is a modern web application that leverages the power of the Google Gemini API to act as an autonomous B2B Prospect Search Agent. It takes a user-defined Ideal Customer Profile (ICP) and generates a list of matching companies and key contacts, complete with a confidence score.

---

### 📸 Screenshots

**Main Interface**
*(Paste your screenshot link here for the main UI)*
<img width="1595" height="941" alt="Image" src="https://github.com/user-attachments/assets/186816b5-4cb2-4dfb-9eff-3657a55e07a3" />
*Shows the ICP input form on the left and the initial state of the results panel.*

**Prospect Results**
*(Paste your screenshot link here for the results view)*
![Results View](https://user-images.githubusercontent.com/12345/67890-example-image-2.png)
*Shows a grid of generated prospect cards with detailed company and contact information.*

---

## ⚙️ How It Works

This application is built as a self-contained frontend application using React and TypeScript. Instead of manually integrating with multiple external APIs (like Apollo, Crunchbase, etc.), it uses a sophisticated AI-first approach.

1.  **ICP Input**: The user provides an Ideal Customer Profile in a JSON format. This defines the criteria for the prospect search, such as industry, company size, revenue, and required technologies.

2.  **AI as the Agent**: The application sends the ICP to the **Google Gemini API** with a detailed set of instructions. This prompt transforms the AI into a specialized "Prospect Search Agent".

3.  **Simulated Workflow**: The AI executes a simulated workflow based on the instructions:
    *   **Query**: It simulates querying multiple data sources (like Apollo, Crunchbase, and SerpAPI) to gather firmographic data, contact information, and buying signals.
    *   **Merge & Deduplicate**: It combines the information from these virtual sources, removing duplicate companies and contacts to create an enriched profile.
    *   **Score**: It calculates a `confidence` score for each prospect using a specific heuristic formula (`score = 0.4*industry_match + 0.3*funding_signal + 0.2*hiring_signal + 0.1*tech_match`), ensuring the results are ranked by relevance.

4.  **Structured JSON Output**: To ensure reliability and prevent errors, the application instructs the Gemini API to return its findings in a strict JSON format using a predefined `responseSchema`.

5.  **Display Results**: The React frontend receives the clean JSON data, manages the loading and error states, and dynamically renders the list of prospects in a clean, user-friendly interface.

---

## ✨ Features

-   **AI-Powered Prospecting**: Leverages the Google Gemini API to perform complex data gathering and analysis.
-   **Dynamic ICP Input**: Users can define and modify their Ideal Customer Profile in a simple JSON format.
-   **Simulated Multi-Source Aggregation**: Intelligently simulates fetching and combining data from multiple B2B data providers.
-   **Heuristic Confidence Scoring**: Ranks prospects based on a weighted formula to highlight the best matches.
-   **Modern & Responsive UI**: A sleek, dark-themed interface built with Tailwind CSS that works seamlessly on all devices.
-   **Clear State Management**: Provides instant visual feedback for loading and error states.

---

## 🛠️ Tech Stack

-   **Frontend**: React, TypeScript, Tailwind CSS
-   **AI**: Google Gemini API (`gemini-2.5-flash`) via `@google/genai` SDK

---

## 🚀 How to Run

This project is designed to run in a web environment where a Google API key is available.

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/prospect-finder-ai.git
    cd prospect-finder-ai
    ```

2.  **API Key Configuration**:
    This application is configured to use an API key from the environment (`process.env.API_KEY`). Ensure this variable is available in your execution environment.

3.  **Serve the Files**:
    Since this project uses ESM via an `importmap` and doesn't require a build step, you can serve it with any simple local web server.
    If you have Python installed:
    ```bash
    python -m http.server
    ```
    Or using Node.js with `serve`:
    ```bash
    npx serve .
    ```

4.  **Open in Browser**:
    Navigate to `http://localhost:8000` (or the port specified by your server) in your web browser.

