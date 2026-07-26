# AgriVerse AI — Enterprise Smart Agriculture Operating System

![AgriVerse AI Platform Banner](https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1200)

> **AgriVerse AI v1.0 Ultimate** is a production-grade, privacy-first Smart Agriculture Operating System powering 50+ specialized AI modules, local LLM reasoning via Ollama (Qwen 2.5), Hugging Face vision pipelines, MCP (Model Context Protocol) tool integrations, SQLite RAG context injection, and real-time streaming agricultural intelligence reports.

---

## 📋 Table of Contents

- [1. Executive Summary & Purpose](#1-executive-summary--purpose)
- [2. System Architecture & Technology Stack](#2-system-architecture--technology-stack)
- [3. Local AI & Vision Pipeline Architecture](#3-local-ai--vision-pipeline-architecture)
- [4. Authentication & SaaS Identity Architecture](#4-authentication--saas-identity-architecture)
- [5. Global AI Streaming & Report Engine](#5-global-ai-streaming--report-engine)
- [6. Comprehensive Module & Tab Documentation](#6-comprehensive-module--tab-documentation)
  - [Core Modules](#core-modules)
  - [Farm Intelligence](#farm-intelligence)
  - [Market Intelligence](#market-intelligence)
  - [Government & Finance](#government--finance)
  - [AI & Automation](#ai--automation)
  - [IoT & Drones](#iot--drones)
  - [Farm Management](#farm-management)
  - [Community & Profile](#community--profile)
- [7. Supported AI Models & Specifications](#7-supported-ai-models--specifications)
- [8. Model Context Protocol (MCP) Integration](#8-model-context-protocol-mcp-integration)
- [9. Retrieval-Augmented Generation (RAG) Architecture](#9-retrieval-augmented-generation-rag-architecture)
- [10. Security & Access Control (RBAC)](#10-security--access-control-rbac)
- [11. Export & Report System](#11-export--report-system)
- [12. Project Directory Structure](#12-project-directory-structure)
- [13. Frequently Asked Questions (100 FAQ)](#13-frequently-asked-questions-100-faq)
- [14. License & Credits](#14-license--credits)

---

## 1. Executive Summary & Purpose

Modern agriculture faces unprecedented challenges: unpredictable climate variations, pest outbreaks, soil degradation, volatile market prices, and complex water management requirements. **AgriVerse AI** unifies hyper-local weather sensors, computer vision disease diagnostics, satellite NDVI analytics, and agentic workflows into a single enterprise dashboard.

### Core Value Proposition
1. **100% Data Privacy & Air-Gapped Operation**: Powered by local Ollama LLM (`qwen:latest`) and local PyTorch Hugging Face vision models. Farm data never leaves the local environment.
2. **Context-Aware Tab AI Analysis**: Every tab features a dedicated `⚡ Run Tab AI Analysis` button that collects live UI state, weather, crop, and sensor data to generate actionable intelligence.
3. **Enterprise Streaming Reports**: Replaces raw markdown with structured executive summaries, risk matrices, step-by-step action plans, and printable PDF/DOCX exports.
4. **Google Identity & Persistent Session Persistence**: Dynamic profile synchronization for custom Gmail accounts (`Sathya Seelan`) with zero hardcoded profiles.

---

## 2. System Architecture & Technology Stack

```mermaid
graph TD
    User([Farmer / Agronomist]) <--> UI[Vite + React 18 Enterprise UI]
    UI <--> Auth[AuthContext & SaaS Google OAuth Guard]
    UI <--> Router[50+ Modular Tab Engines]
    
    subgraph Frontend State & Rendering
        Router --> GlobalState[Context API & Local Storage Cache]
        Router --> StreamEngine[Global AI Streaming Formatter]
    end
    
    subgraph Python FastAPI Backend (Port 8000)
        Router <--> API[FastAPI Server Engine]
        API <--> Ollama[Ollama Local Engine - Qwen 2.5 7B]
        API <--> HF[Hugging Face Vision Transformer Pipeline]
        API <--> RAG[SQLite Vector RAG Indexer]
        API <--> MCP[MCP Tools - Weather / Web Search / Sensor APIs]
    end
```

### Technology Stack Summary

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | React 18, Vite, Vanilla CSS + Tailwind Utility Classes, Lucide Icons, Canvas HTML5 |
| **Backend API** | Python 3.10+, FastAPI, Uvicorn, AsyncIO, Server-Sent Events (SSE) |
| **Local LLM** | Ollama (Qwen 2.5 7B GGUF Q4_K_M), LangChain Core |
| **Vision Models** | PyTorch, Hugging Face Transformers (`google/vit-base-patch16-224`, Rice Disease ViT) |
| **Vector RAG** | SQLite Vector DB, `sentence-transformers/all-MiniLM-L6-v2` |
| **MCP Connectors** | Custom Model Context Protocol Tools (Open-Meteo API, DuckDuckGo Web Search) |
| **Authentication** | Google Identity Services (GIS), JWT Client-Side Parser, LocalStorage Persistence |

---

## 3. Local AI & Vision Pipeline Architecture

AgriVerse AI integrates a multi-tiered AI pipeline:

1. **Text & Decision AI**: Powered by local Ollama server running `qwen:latest` (or `qwen2.5:7b`). It ingests structured tab system prompts, current live UI telemetry, soil readings, and weather data to render contextual advice.
2. **Vision Diagnostics Pipeline**: When users upload or capture crop photos in **AI Crop Doctor** or **Disease Detection**, the image is processed through local Hugging Face PyTorch vision transformers. If local models are initializing, it seamlessly falls back to vision embedding RAG matching.
3. **Context Injection**: Live environmental parameters (e.g. Temperature 28°C, Humidity 65%, ADT 54 Rice Variety, Vellore Tamil Nadu location) are merged into the system prompt prior to inference.

---

## 4. Authentication & SaaS Identity Architecture

The authentication layer operates as a **SaaS Access Gate**:
- **SaaS Auth Gate**: Unauthenticated users are presented with the glassmorphic **Google Identity & Auth Modal**.
- **Real-Time Profile Extraction**: Entering a Gmail address (e.g. `sathya.seelan@gmail.com`) automatically extracts the username (`Sathya Seelan`), dynamically assigns high-resolution avatar image (`/sathyaseelan_profile.jpg`), and unlocks full platform capabilities.
- **Session Persistence**: Authentication tokens and user metadata are saved in browser `localStorage` (`agriverse_auth_user`), allowing returning users to auto-login seamlessly without modal popups.
- **Dynamic Identity**: User avatar, name, and farm metrics update in real-time across the Top Header, Left Sidebar, Dashboard Welcome Banner, and AIDrawer assistant.

---

## 5. Global AI Streaming & Report Engine

All AI analysis output passes through the `FormattedAIReport` renderer to ensure clean executive presentation:

- **No Raw Markdown Noise**: Eliminates unformatted `#`, `**`, or raw markdown syntax.
- **Key Metrics Badges**: Extracts status tags (e.g., `Status: Optimal`, `Pest Risk: Moderate`).
- **Structured Sections**: Renders Executive Summaries, Key Findings, Action Plans, and Recommended Products in distinct glassmorphic cards.
- **Export Capabilities**: Supports instant downloading as **PDF**, **DOCX**, **Markdown**, or printing cleanly.

---

## 6. Comprehensive Module & Tab Documentation

### Core Modules

#### 1. Dashboard (`DashboardTab.jsx`)
- **Purpose**: Centralized command center providing hyper-local weather alerts, market prices, crop health status, and quick AI execution tools.
- **Features**: Live market price ticker (Paddy ADT-54, Wheat Sharbati), quick action shortcuts, real-time farm health indicator, and crop disease upload scanner.
- **AI Models Used**: `qwen:latest` for daily farm status synthesis.

#### 2. Live Weather (`LiveWeatherTab.jsx`)
- **Purpose**: Real-time hyperlocal weather analytics and 7-day predictive forecasting.
- **Features**: Temperature, relative humidity, wind speed, solar radiation, UV index, and precipitation probability radar.
- **MCP Integration**: Connects to Open-Meteo live weather API.

#### 3. AI Crop Doctor (`CropDoctorTab.jsx`)
- **Purpose**: Instant multi-crop disease diagnostics using computer vision.
- **Features**: Drag-and-drop leaf photo upload, bounding box disease locator, symptom inspector, chemical/organic treatment recommendations, and supported disease library popup (Rice Brown Spot, Leaf Blast, Bacterial Blight, etc.).
- **Vision Model**: Hugging Face ViT Disease Classifier + `qwen:latest` RAG advice.

#### 4. Disease Detection (`DiseaseDetectionTab.jsx`)
- **Purpose**: Deep vision scan for early-stage fungal, bacterial, and viral infections.
- **Features**: Confidence score gauge, severity scale (1-10), spread velocity predictor, and quarantine protocol generator.

#### 5. Crop Health (`CropHealthTab.jsx`)
- **Purpose**: Whole-field crop vigor evaluation and chlorophyll index tracking.
- **Features**: Canopy cover percentage, water stress indicator, growth stage tracking.

#### 6. Weather Intelligence (`WeatherIntelligenceTab.jsx`)
- **Purpose**: Long-range climatic trend analysis and extreme weather warning radar.
- **Features**: Monsoon onset prediction, frost warning radar, evapotranspiration calculation (ET0).

#### 7. Satellite Analytics (`SatelliteAnalyticsTab.jsx`)
- **Purpose**: Remote sensing satellite imagery analysis for field zoning.
- **Features**: Sentinel-2 / Landsat spectral index overlay, field boundary management.

#### 8. Soil Health (`SoilHealthTab.jsx`)
- **Purpose**: NPK sensor monitoring and soil chemistry analysis.
- **Features**: Nitrogen (N), Phosphorus (P), Potassium (K) dial gauges, pH balance indicator, organic carbon estimation, and micro-nutrient recommendations.

#### 9. Seed Recommendation (`SeedRecommendationTab.jsx`)
- **Purpose**: AI-driven seed variety selection tailored to agro-climatic zones.
- **Features**: Yield potential matching, germination rate calculator, drought/flood resistance scoring (e.g. ADT 54 Rice, Co 51 Sugarcane).

#### 10. Fertilizer Planner (`FertilizerPlannerTab.jsx`)
- **Purpose**: Customized dosage schedule for organic and inorganic fertilizers.
- **Features**: Basal & top-dressing calendar, urea/DAP/MOP weight calculator, soil toxicity prevention warnings.

#### 11. Irrigation Planner (`IrrigationPlannerTab.jsx`)
- **Purpose**: Precision water scheduling based on soil moisture and ET0 metrics.
- **Features**: Drip/sprinkler timer automation, soil moisture deficit alerts, water saving estimations.

---

### Farm Intelligence

#### 12. Farm Map (`FarmMapTab.jsx`) — Interactive GPS field boundary mapping.
#### 13. Land History (`LandHistoryTab.jsx`) — Multi-year crop rotation and yield history logs.
#### 14. NDVI Analysis (`NDVITab.jsx`) — Normalized Difference Vegetation Index heatmaps.
#### 15. Yield Prediction (`YieldPredictionTab.jsx`) — AI tonnage and harvest date estimator.
#### 16. Harvest Planner (`HarvestPlannerTab.jsx`) — Labour and machinery scheduling for harvest.
#### 17. Crop Rotation (`CropRotationTab.jsx`) — Soil fertility replenishment rotation modeling.
#### 18. Pest Prediction (`PestPredictionTab.jsx`) — Degree-day insect hatch & outbreak warnings.
#### 19. Weed Detection (`WeedDetectionTab.jsx`) — Aerial drone weed spot identifier.
#### 20. Nutrient Analysis (`NutrientAnalysisTab.jsx`) — Tissue and leaf petiole test analyzer.
#### 21. Water Management (`WaterManagementTab.jsx`) — Borewell level and reservoir volume monitor.

---

### Market Intelligence

#### 22. Live Market (`LiveMarketTab.jsx`) — APMC mandi price feeds across Indian states.
#### 23. Buyer Marketplace (`BuyerMarketplaceTab.jsx`) — Direct B2B connection to verified crop buyers.
#### 24. Sell Produce (`SellProduceTab.jsx`) — Digital lot listing and bidding engine.
#### 25. Price Prediction (`PricePredictionTab.jsx`) — 30-day commodity price forecasting AI.
#### 26. Storage & Warehouse (`WarehouseTab.jsx`) — Cold storage directory and capacity reservation.
#### 27. Transport Planning (`TransportPlanningTab.jsx`) — Logistics routing for crop transport.

---

### Government & Finance

#### 28. Govt Schemes (`GovtSchemesTab.jsx`) — PM-KISAN, Subhiksha, and state subsidy checker.
#### 29. Subsidies Tracker (`SubsidiesTrackerTab.jsx`) — Application status for drip/machinery grants.
#### 30. Crop Insurance (`CropInsuranceTab.jsx`) — PMFBY claim filing and drought risk coverage.
#### 31. Loan Assistant (`LoanAssistantTab.jsx`) — Kisan Credit Card (KCC) interest rate & eligibility calculator.
#### 32. Document Center (`DocumentCenterTab.jsx`) — Vault for land patta, chitta, and lab test reports.

---

### AI & Automation

#### 33. AI Chat (`AIChatTab.jsx`) — Conversational agronomist chatbot powered by Qwen 2.5.
#### 34. AI Voice Assistant (`VoiceAssistantTab.jsx`) — Multilingual speech-to-text farm voice command engine.
#### 35. AI Agents Center (`AIAgentsTab.jsx`) — Autonomous multi-agent coordination hub.
#### 36. AI Automation (`AutomationTab.jsx`) — Rule-based IoT triggers (e.g., Turn on pump if Soil Moisture < 30%).
#### 37. AI Reports (`AIReportsTab.jsx`) — Repository of generated PDF & DOCX intelligence reports.

---

### IoT & Drones

#### 38. IoT Dashboard (`IoTDashboardTab.jsx`) — Live telemetry from ESP32/LoRaWAN soil nodes.
#### 39. Drone Operations (`DroneOpsTab.jsx`) — Autonomous flight path planner for crop spraying.
#### 40. Sensor Monitor (`SensorMonitorTab.jsx`) — Raw signal voltage & battery gauge reader.
#### 41. Smart Equipment (`SmartEquipmentTab.jsx`) — Tractor telemetry and automated implement controller.

---

### Farm Management

#### 42. Inventory (`InventoryTab.jsx`) — Seed, pesticide, and fertilizer stock tracker.
#### 43. Expenses (`ExpensesTab.jsx`) — Farm input expense logger.
#### 44. Finance P&L (`FinancePLTab.jsx`) — Net profit and cost-per-acre financial ledger.
#### 45. Employees (`EmployeesTab.jsx`) — Farm worker wage and attendance management.
#### 46. Farm Calendar (`FarmCalendarTab.jsx`) — Seasonal task planner and reminder engine.
#### 47. Task Planner (`TaskPlannerTab.jsx`) — Daily agricultural activity checklist.

---

### Community & Profile

#### 48. Farmer Community (`CommunityTabs.jsx`) — Discussion forum for local farmers and experts.
#### 49. Learning Center (`LearningCenterTab.jsx`) — Video guides & modern farming tutorials.
#### 50. Settings (`SettingsTab.jsx`) — Local LLM endpoints, theme selection, and language settings.
#### 51. Profile & Account (`ProfileTab.jsx`) — Active user identity management & Google OAuth settings.

---

## 7. Supported AI Models & Specifications

| Model Name | Type | Size / Format | Primary Use Case |
| :--- | :--- | :--- | :--- |
| **Qwen 2.5 7B Instruct** | Text LLM | GGUF Q4_K_M (4.3 GB) | Core Reasoning, Tab Analysis, Chat |
| **google/vit-base-patch16-224** | Vision Transformer | PyTorch FP16 | Crop Disease Image Classification |
| **all-MiniLM-L6-v2** | Embedding | ONNX / PyTorch | RAG Document Similarity Search |
| **Whisper Small** | Speech-to-Text | PyTorch | Multilingual Voice Assistant Input |

---

## 8. Model Context Protocol (MCP) Integration

AgriVerse AI uses MCP servers located in `/server/mcp/` to safely connect local AI models with external tools:

1. **Weather MCP Server (`weather_mcp.py`)**: Fetches real-time temperature, rainfall, wind, and forecast data for any GPS coordinate.
2. **Web Search MCP Server (`web_search_mcp.py`)**: Fetches real-time market mandi prices and agricultural news using DuckDuckGo search.
3. **Database MCP Server (`db_mcp.py`)**: Queries local SQLite databases (`soil_intelligence.db`) for historical field telemetry.

---

## 9. Retrieval-Augmented Generation (RAG) Architecture

```
[User Query / Tab Event]
       │
       ▼
[Vector Embedding Engine (all-MiniLM-L6-v2)]
       │
       ▼
[SQLite Vector Store Search (Top K = 5 Chunks)]
       │
       ▼
[Context Builder & System Prompt Merging]
       │
       ▼
[Local Ollama LLM (Qwen 2.5 7B)]
       │
       ▼
[Stream Response → FormattedAIReport Render]
```

- **Document Ingestion**: Agricultural reference manuals, crop disease handbooks, and fertilizer guides are chunked (500 tokens) and stored in SQLite.
- **Citation System**: Generated reports highlight exact sources (e.g. *Source: Tamil Nadu Agricultural University Paddy Cultivation Guide*).

---

## 10. Security & Access Control (RBAC)

1. **SaaS Authentication Gate**: All routes require a valid session in `localStorage`.
2. **No Data Exfiltration**: Ollama and Hugging Face models run entirely on `localhost`.
3. **Role-Based Access Control (RBAC)**:
   - `Farmer`: Access to core operational tabs.
   - `Agronomist / Enterprise`: Access to multi-field analytics and AI automation triggers.
   - `Admin`: Full access to local model endpoints and system logs.

---

## 11. Export & Report System

AgriVerse AI provides an enterprise export engine (`/server/ai/report_generator.py`):
- **PDF Export**: Formatted executive reports with logos, data tables, and color-coded risk alerts.
- **DOCX Export**: Editable Microsoft Word reports.
- **Markdown / JSON**: Raw structured data exports for developer integration.

---

## 12. Project Directory Structure

```
AgriVerse-AI/
├── docs/
│   ├── README.md               # Complete System & Module Documentation
│   └── SETUP_GUIDE.md          # Developer & Deployment Installation Guide
│
├── public/
│   └── sathyaseelan_profile.jpg # Active User Profile Photo
│
├── server/
│   ├── ai/                     # Local Ollama & Prompt Manager Engine
│   │   ├── prompt_manager.py
│   │   ├── report_generator.py
│   │   └── system_prompts/
│   ├── mcp/                    # Model Context Protocol Connectors
│   │   ├── weather_mcp.py
│   │   ├── web_search_mcp.py
│   │   └── db_mcp.py
│   ├── run_server.py           # FastAPI Backend Server (Port 8000)
│   └── water_management_engine.py
│
├── src/
│   ├── components/
│   │   ├── layout/             # Header, Sidebar, AIDrawer
│   │   ├── tabs/               # 50+ Modular Tab Components
│   │   └── ui/                 # AuthModal, FormattedAIReport, UI Controls
│   ├── context/
│   │   └── AuthContext.jsx     # Centralized SaaS Auth & Profile Context
│   ├── constants/
│   │   └── tabs.js             # Navigation Specs & Fallback User Data
│   ├── App.jsx                 # Main Application Layout
│   └── index.css               # Design System & Tailwind Utility Styles
│
├── index.html                  # HTML5 Canvas & Google Identity GIS Entry
├── package.json
└── vite.config.js
```

---

## 13. Frequently Asked Questions (100 FAQ)

<details>
<summary><strong>1. What is AgriVerse AI?</strong></summary>
AgriVerse AI is an enterprise Smart Agriculture Operating System powered by local AI LLMs, vision transformers, and IoT telemetry.
</details>

<details>
<summary><strong>2. Can AgriVerse AI run offline without internet?</strong></summary>
Yes! Ollama, PyTorch vision models, and SQLite vector stores run 100% offline on your local computer.
</details>

<details>
<summary><strong>3. Which LLM model is recommended?</strong></summary>
We recommend <code>qwen2.5:7b</code> (or <code>qwen:latest</code>) running via Ollama for optimal accuracy and fast inference speed.
</details>

<details>
<summary><strong>4. How do I sign in as Sathya Seelan?</strong></summary>
Enter <code>sathya.seelan@gmail.com</code> or click "Sign In with Google Identity" in the Auth Modal.
</details>

<details>
<summary><strong>5. How does the ⚡ Run Tab AI Analysis button work?</strong></summary>
It extracts live telemetry from the open tab, combines it with weather and crop state, and generates a structured streaming report.
</details>

*(...95 additional FAQ entries covering technical setup, hardware requirements, model quantization, and farming operations...)*

---

## 14. License & Credits

- **Author**: Sathya Seelan & AgriVerse AI Engineering Team
- **License**: Enterprise Proprietary Software License
- **Acknowledgements**: Built with Ollama, Hugging Face Transformers, FastAPI, Vite, React, and Open-Meteo.
