# 🔴 HARDCODING AUDIT REPORT - AgriVerse AI
**Generated:** 2026-08-29  
**Status:** MULTIPLE CRITICAL ISSUES FOUND ✗

---

## Executive Summary

**Total Issues Found: 8 FILES WITH CRITICAL HARDCODING**

| Category | Count | Severity | Status |
|----------|-------|----------|--------|
| Absolute Windows File Paths | 8 files | 🔴 CRITICAL | UNFIXED |
| Hardcoded API URLs (localhost) | 12+ locations | 🟠 HIGH | UNFIXED |
| Personal Email Hardcoded | 1 file | 🟠 HIGH | UNFIXED |
| Profile Image Hardcoding | 1 file | 🟡 MEDIUM | UNFIXED |

---

## 🔴 CRITICAL ISSUES - MUST FIX

### Issue #1: Absolute Windows File Paths in Database Engines

**Files Affected (8):**
1. `server/main.py` (Line 524)
2. `server/crop_rotation_engine.py` (Line 9)
3. `server/crop_health_db.py` (Not shown, but same pattern)
4. `server/farm_map_engine.py` (Line 8)
5. `server/soil_health_engine.py` (Line 8)
6. `server/harvest_planner_engine.py` (Line 10)
7. `server/land_history_engine.py` (Line 9)
8. `server/model_manager.py` (Line 5)

**Current Code:**
```python
MODEL_BASE_DIR = r"D:\mini project learning\agriculture AI\agriculture model for AI crop doctor tab"
ROTATION_DB_PATH = r"D:\mini project learning\agriculture AI\agriculture model for AI crop doctor tab\cache\crop_rotation.db"
FARM_MAP_DB_PATH = r"D:\mini project learning\agriculture AI\agriculture model for AI crop doctor tab\cache\farm_map.db"
SOIL_DB_PATH = r"D:\mini project learning\agriculture AI\agriculture model for AI crop doctor tab\cache\soil_health.db"
HARVEST_DB_PATH = r"D:\mini project learning\agriculture AI\agriculture model for AI crop doctor tab\cache\harvest_planner.db"
LAND_HISTORY_DB_PATH = r"D:\mini project learning\agriculture AI\agriculture model for AI crop doctor tab\cache\land_history.db"
```

**Impact:**
- ❌ **BREAKING:** Code only works on ONE Windows machine
- ❌ **BREAKING:** Docker/Kubernetes containerization impossible
- ❌ **BREAKING:** Production deployment will FAIL
- ❌ **BREAKING:** Cross-platform support impossible (Linux, macOS)

**Fix Needed:** Convert to relative paths or environment variables

---

### Issue #2: Hardcoded Ollama Server URLs

**Locations (12+):**
- `server/main.py:525` - `OLLAMA_URL = "http://127.0.0.1:11434/api/generate"`
- `server/crop_rotation_engine.py:12` - `OLLAMA_URL = "http://127.0.0.1:11434/api/generate"`
- `server/crop_doctor_engine.py:14` - `OLLAMA_URL = "http://127.0.0.1:11434/api/generate"`
- `server/farm_map_engine.py:11` - `OLLAMA_URL = "http://127.0.0.1:11434/api/generate"`
- `server/soil_health_engine.py:11` - `OLLAMA_URL = "http://127.0.0.1:11434/api/generate"`
- `server/harvest_planner_engine.py:12` - `OLLAMA_URL = "http://127.0.0.1:11434/api/generate"`
- `server/land_history_engine.py:11` - `OLLAMA_URL = "http://127.0.0.1:11434/api/generate"`
- `server/calendar_engine.py:172` - `url = "http://127.0.0.1:11434/api/generate"`
- Plus 4+ more in other engine files

**Vite Proxy Hardcoding (`vite.config.js:15-28`):**
```javascript
proxy: {
  '/api/ollama': {
    target: 'http://localhost:11434',  // Hardcoded
    changeOrigin: true,
  },
  '/api/backend': {
    target: 'http://localhost:8000',   // Hardcoded
    changeOrigin: true,
  },
  '/api': {
    target: 'http://localhost:8000',   // Hardcoded
  }
}
```

**Impact:**
- ⚠️ Cannot change ports without modifying code
- ⚠️ Production URLs cannot be configured
- ⚠️ Multiple instances on same machine impossible
- ⚠️ Docker networking will break

---

### Issue #3: Personal Email Hardcoded in Auth Context

**File:** `src/context/AuthContext.jsx` (Lines 12-15, 95)

**Current Code:**
```javascript
if (parsed.email === 'sathya.seelan@gmail.com') {
  parsed.email = 'sathyaseelan6381@gmail.com';
}

const emailToUse = customGmail && customGmail.includes('@') 
  ? customGmail 
  : 'sathyaseelan6381@gmail.com';  // Hardcoded default email
```

**Additional Exposures:**
- Profile image path: `/sathyaseelan_profile.jpg` (Line 103-104)
- Farm location: `'Vellore, Tamil Nadu'` (Line 117)
- Farm size: `'12.45 Acres'` (Line 118)

**Impact:**
- 🔴 **SECURITY:** Personal email exposed in public repo
- 🔴 **SECURITY:** Auto-login with hardcoded email = credential bypass
- 🔴 **PRIVACY:** Developer's name/location exposed
- 🔴 **PRODUCTION:** Demo data not swappable for production users

---

## 🟠 HIGH PRIORITY ISSUES

### Issue #4: Hardcoded Frontend Server Port

**File:** `vite.config.js` (Line 12)
```javascript
server: {
  port: 3000,  // Fixed port - cannot change
  host: true,
  ...
}
```

**Impact:**
- ⚠️ Cannot run multiple instances
- ⚠️ Port conflicts will block development
- ⚠️ Cloud deployments need port flexibility

---

## 📊 Summary by File

| File | Issues | Type | Lines |
|------|--------|------|-------|
| `server/main.py` | 2 | Path + URL | 524-525 |
| `server/crop_rotation_engine.py` | 2 | Path + URL | 9, 12 |
| `server/crop_doctor_engine.py` | 2 | Path + URL | 13-14 |
| `server/farm_map_engine.py` | 2 | Path + URL | 8, 11 |
| `server/soil_health_engine.py` | 2 | Path + URL | 8, 11 |
| `server/harvest_planner_engine.py` | 2 | Path + URL | 10, 12 |
| `server/land_history_engine.py` | 2 | Path + URL | 9, 11 |
| `server/model_manager.py` | 1 | Path | 5 |
| `server/hf_model_manager.py` | 1 | Path | 5 |
| `server/download_models.py` | 1 | Path | 3 |
| `server/setup_crop_doctor_store.py` | 1 | Path | 4 |
| `src/context/AuthContext.jsx` | 3 | Email + Profile | 12-15, 95 |
| `vite.config.js` | 3 | URLs + Port | 12, 15-28 |

**Total Files: 13  
Total Issues: 26+ hardcoded values**

---

## ✅ Verification Checklist

- [x] Created `.env.example` template
- [ ] Fix all Windows file paths
- [ ] Fix all localhost URLs
- [ ] Remove hardcoded email/credentials
- [ ] Remove hardcoded ports
- [ ] Create `server/config.py` for centralized config
- [ ] Update all engine files to use environment variables
- [ ] Update `AuthContext.jsx` to use .env variables
- [ ] Update `vite.config.js` to use environment variables
- [ ] Create `.gitignore` to exclude `.env*` files
- [ ] Create setup documentation

---

## Recommended Action Plan

**Phase 1 (IMMEDIATE - P0):**
1. Fix all absolute Windows paths → relative paths
2. Fix all localhost URLs → environment variables
3. Fix hardcoded email → environment variable
4. Create centralized config file

**Phase 2 (URGENT - P1):**
1. Update all database engine files
2. Update Vite configuration
3. Update AuthContext with dynamic values

**Phase 3 (IMPORTANT - P2):**
1. Add comprehensive `.gitignore`
2. Create migration guide for developers
3. Update README with setup instructions

---

## Status: 🔴 REQUIRES IMMEDIATE ATTENTION

All 13 files need updates before production deployment or open-source release.
