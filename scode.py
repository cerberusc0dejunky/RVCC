#!/usr/bin/env python3
"""
compile_notebooklm.py / scode.py
Compiles River Valley Cleanup Crew codebase into structured NotebookLM documentation artifacts.
Outputs to:
  - .notebooklm/
  - .NotebookLM/
Generates:
  1. PROJECT_TREE.md (Visual project tree with metadata)
  2. FUNCTION_HIERARCHY.md (Hierarchical symbol, function, and call-flow directory)
  3. ALL_SCRIPTS.md (Complete printed copy of all project scripts and code)
  4. Categorized high-density modules (SOURCE_CODE_UI.md, SOURCE_CODE_CORE.md, SOURCE_JSON_DEFINITIONS.md, source_dump.md)
"""

from __future__ import annotations

import datetime as dt
import logging
import os
import re
import shutil
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent
logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')
log = logging.getLogger('notebooklm-compiler')

OUTPUT_DIRS = [
    PROJECT_ROOT / ".notebooklm",
    PROJECT_ROOT / ".NotebookLM"
]

IGNORE_DIRS = {
    '.git', '__pycache__', 'node_modules', '.venv', 'logs', 'build', 'dist', 
    '.notebooklm', '.NotebookLM', '.agent', '.developer', 'tmp', '_archive', 'scratch', 
    '$RECYCLE.BIN', '.next', 'out', '.vscode', '.idea', 'coverage'
}

IGNORE_FILES = {
    'package-lock.json', 'prebuilt_library.json', 'yarn.lock', 'pnpm-lock.yaml', 
    'bun.lockb', 'source_dump.md', 'repomix-output.md', 'repomix-output.xml',
    'repomix-output.json', 'tokenusage.md', 'favicon.ico', '.DS_Store'
}

IGNORE_EXTENSIONS = {
    'png', 'jpg', 'jpeg', 'gif', 'ico', 'svg', 'woff', 'woff2', 'ttf', 'eot',
    'mp3', 'mp4', 'webm', 'zip', 'tar', 'gz', 'pyc', 'exe', 'bin', 'map'
}

SOURCE_EXTENSIONS = {
    '.ts', '.tsx', '.js', '.jsx', '.mjs', '.py', '.css', '.html', '.md', '.mdx', '.xml'
}

DEFINITION_EXTENSIONS = {'.json', '.jsonl', '.csv', '.env.example', '.rules'}

LANGUAGE_BY_EXTENSION = {
    '.ts': 'typescript', '.tsx': 'typescript', '.js': 'javascript',
    '.jsx': 'javascript', '.mjs': 'javascript', '.py': 'python',
    '.css': 'css', '.html': 'html', '.md': 'markdown', '.mdx': 'markdown',
    '.xml': 'xml', '.json': 'json', '.jsonl': 'json', '.csv': 'csv',
    '.rules': 'text', '.env.example': 'bash',
}

CHAR_LIMIT = 500000


def is_ignored_file(path: Path) -> bool:
    return path.name in IGNORE_FILES or path.suffix.lower().lstrip('.') in IGNORE_EXTENSIONS


def iter_project_files(startpath: Path):
    for root, dirs, files in os.walk(startpath, topdown=True, followlinks=False):
        dirs[:] = sorted(
            d for d in dirs
            if d not in IGNORE_DIRS and not d.startswith('.')
        )
        for filename in sorted(files):
            path = Path(root) / filename
            if not is_ignored_file(path):
                yield path


def read_text(path: Path, *, errors: str = 'replace') -> str:
    return path.read_text(encoding='utf-8', errors=errors)


# =====================================================================
# 1. PROJECT TREE GENERATOR
# =====================================================================
def generate_tree_report() -> str:
    lines = [
        "# RIVER VALLEY CLEANUP CREW — PROJECT TREE & ARCHITECTURE",
        f"Generated: {dt.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}",
        "",
        "## 1. Directory & File Hierarchy",
        "```text",
    ]
    
    total_files = 0
    total_lines = 0
    file_records = []

    for root, dirs, files in os.walk(PROJECT_ROOT, topdown=True, followlinks=False):
        dirs[:] = sorted(d for d in dirs if d not in IGNORE_DIRS and not d.startswith('.'))
        root_path = Path(root)
        level = len(root_path.relative_to(PROJECT_ROOT).parts)
        if root_path != PROJECT_ROOT:
            lines.append(f"{'  ' * level}📁 {root_path.name}/")
        
        for filename in sorted(files):
            p = root_path / filename
            if not is_ignored_file(p):
                rel = p.relative_to(PROJECT_ROOT).as_posix()
                try:
                    num_lines = len(p.read_text(encoding='utf-8', errors='ignore').splitlines())
                except Exception:
                    num_lines = 0
                total_files += 1
                total_lines += num_lines
                file_records.append((rel, num_lines, p.stat().st_size))
                lines.append(f"{'  ' * (level + 1)}📄 {filename}  ({num_lines} lines)")

    lines.extend([
        "```",
        "",
        "## 2. Project Metrics Summary",
        f"- **Total Indexed Files**: {total_files}",
        f"- **Total Source Lines**: {total_lines:,} lines",
        f"- **Architecture Style**: Client-First React 19 + Tailwind CSS + Cloudflare Pages Edge Functions + Firebase Firestore/Auth + Optional Express Node.js Engine",
        "",
        "## 3. Structural Layers Breakdown",
        "- **Core Frontend (`/src`)**: Application UI, wizard slide state machine, dynamic volume & pricing calculators, booking modals, and client-side Firestore synchronization.",
        "- **Reusable Components (`/src/components`)**: Auth modal with Facebook Admin verification, Operator Dispatch Board, Customer Job Tracker, Quote Wizard, and Legal Disclosure Modals.",
        "- **Cloudflare Pages Edge Functions (`/functions/api`)**: Serverless edge endpoints for Gemini AI debris photo vision (`/api/analyze-junk`), Stripe checkout session initialization (`/api/create-checkout-session`), and Google Calendar event scheduling (`/api/add-to-calendar`).",
        "- **Full-Stack Node/Express Engine (`/server.ts`)**: Local development container server providing dual Vite middleware and API endpoints.",
        "- **Public Static Assets (`/public`)**: Standalone legal compliance pages (Terms, Privacy, Data Deletion) and Cloudflare `_redirects` SPA rewrite rules.",
        ""
    ])
    return "\n".join(lines)


# =====================================================================
# 2. FUNCTION HIERARCHY & CALL-FLOW GENERATOR
# =====================================================================
def extract_file_symbols(content: str, filename: str) -> dict:
    """Extracts symbols, functions, interfaces, hooks, and external calls."""
    symbols = {
        "classes": [],
        "interfaces": [],
        "types": [],
        "react_components": [],
        "functions": [],
        "api_endpoints": [],
        "calls_and_apis": [],
        "firebase_ops": [],
    }
    
    lines = content.splitlines()
    for line in lines:
        s = line.strip()
        
        # Interfaces & Types
        if s.startswith('export interface ') or s.startswith('interface '):
            name = s.split('{')[0].replace('export ', '').strip()
            symbols["interfaces"].append(name)
        elif s.startswith('export type ') or s.startswith('type '):
            name = s.split('=')[0].replace('export ', '').strip()
            symbols["types"].append(name)
            
        # React Components
        elif re.search(r'const\s+([A-Z][A-Za-z0-9_]+)\s*:\s*React\.FC', s):
            m = re.search(r'const\s+([A-Z][A-Za-z0-9_]+)\s*:\s*React\.FC', s)
            symbols["react_components"].append(m.group(1))
        elif re.search(r'export\s+(?:default\s+)?function\s+([A-Z][A-Za-z0-9_]+)', s):
            m = re.search(r'export\s+(?:default\s+)?function\s+([A-Z][A-Za-z0-9_]+)', s)
            symbols["react_components"].append(m.group(1))
            
        # Functions
        elif s.startswith('function ') or s.startswith('export function ') or s.startswith('async function ') or s.startswith('export async function '):
            clean = s.split('{')[0].strip()
            if not any(clean.startswith(f"function {c}") for c in symbols["react_components"]):
                symbols["functions"].append(clean)
        elif ('=' in s and '=>' in s) and (s.startswith('const ') or s.startswith('let ') or s.startswith('export const ')):
            clean_name = s.split('=')[0].replace('const ', '').replace('let ', '').replace('export ', '').strip()
            if not clean_name[0].isupper():  # Avoid components
                symbols["functions"].append(f"{clean_name} (Arrow Fn)")

        # API & Endpoint definitions
        if 'app.post(' in s or 'app.get(' in s:
            m = re.search(r'app\.(post|get)\(["\']([^"\']+)["\']', s)
            if m:
                symbols["api_endpoints"].append(f"{m.group(1).upper()} {m.group(2)}")
        elif 'export async function onRequestPost' in s or 'export async function onRequestGet' in s:
            symbols["api_endpoints"].append(f"Cloudflare Edge Handler: {filename}")

        # Outbound calls & Firebase
        if 'fetch(' in s:
            m = re.search(r'fetch\(["\']([^"\']+)["\']', s)
            if m:
                symbols["calls_and_apis"].append(f"fetch -> {m.group(1)}")
            elif 'fetch(' in s and '/api/' in s:
                symbols["calls_and_apis"].append("fetch -> /api/*")
        if 'collection(' in s or 'addDoc(' in s or 'setDoc(' in s or 'getDocs(' in s or 'onSnapshot(' in s:
            m = re.search(r'\b(collection|addDoc|setDoc|getDocs|onSnapshot|updateDoc|doc)\b', s)
            if m and m.group(1) not in symbols["firebase_ops"]:
                symbols["firebase_ops"].append(m.group(1))

    return symbols


def generate_hierarchy_report() -> str:
    lines = [
        "# RIVER VALLEY CLEANUP CREW — FUNCTION HIERARCHY & CALL GRAPH",
        f"Generated: {dt.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}",
        "",
        "This document provides NotebookLM with a structural hierarchy of all symbols, functions,",
        "React state-machines, data contracts, and edge API call graphs in the project.",
        "",
        "---",
        "",
        "## 1. High-Level Architecture & Invocation Hierarchy",
        "```text",
        "User Browser / Customer Portal / Operator Dispatch",
        "  │",
        "  ├─► [Presentation Layer]",
        "  │     ├── App.tsx (Root State Machine, 6-Slide Quote Wizard, Debris Configurator)",
        "  │     ├── ServiceQuoteWizard.tsx (Step navigation, bed load vs. trailer selection)",
        "  │     ├── AuthModal.tsx (Google Auth, Facebook Admin Check & Secret Unlock)",
        "  │     ├── DispatchDashboard.tsx (Operator board, live routes, job status changes)",
        "  │     ├── CustomerJobTracker.tsx (Real-time customer status & ticket tracker)",
        "  │     └── LegalModal.tsx / WhatWeDoModal.tsx (Policies & service explainers)",
        "  │",
        "  ├─► [Client Persistence & Sync - src/lib/firebase.ts]",
        "  │     ├── saveBookingToDatabase() ──────► Firestore ('bookings' collection)",
        "  │     ├── subscribeToBookings() ────────► Real-time Firestore onSnapshot()",
        "  │     ├── updateBookingStatus() ────────► Firestore updateDoc()",
        "  │     ├── signInWithGoogleAuth() ───────► Firebase Auth (GoogleAuthProvider)",
        "  │     └── signInWithFacebookAuth() ─────► Firebase Auth (FacebookAuthProvider)",
        "  │",
        "  └─► [Edge Serverless APIs - /functions/api & /server.ts]",
        "        ├── POST /api/analyze-junk ──────► Google Gemini Vision AI Model (Edge fetch)",
        "        ├── POST /api/create-checkout-session ──► Stripe REST API (Hosted Checkout)",
        "        └── POST /api/add-to-calendar ───► Google Calendar v3 API (Primary Calendar)",
        "```",
        "",
        "---",
        "",
        "## 2. File-by-File Symbol & Function Directory",
        ""
    ]

    target_files = [
        "src/App.tsx",
        "src/types.ts",
        "src/lib/firebase.ts",
        "src/components/AuthModal.tsx",
        "src/components/DispatchDashboard.tsx",
        "src/components/CustomerJobTracker.tsx",
        "src/components/ServiceQuoteWizard.tsx",
        "src/components/LegalModal.tsx",
        "src/components/WhatWeDoModal.tsx",
        "server.ts",
        "functions/api/analyze-junk.js",
        "functions/api/create-checkout-session.js",
        "functions/api/add-to-calendar.js"
    ]

    for rel_path in target_files:
        p = PROJECT_ROOT / rel_path
        if not p.exists():
            continue
        content = read_text(p)
        sym = extract_file_symbols(content, p.name)
        
        lines.append(f"### 📂 `{rel_path}`")
        if sym["react_components"]:
            lines.append(f"- **⚛️ React Components**: {', '.join([f'`<{c}/>`' for c in sym['react_components']])}")
        if sym["interfaces"] or sym["types"]:
            all_types = [f"`{t}`" for t in (sym["interfaces"] + sym["types"])[:8]]
            lines.append(f"- **📐 Interfaces & Data Models**: {', '.join(all_types)}")
        if sym["api_endpoints"]:
            lines.append(f"- **🌐 Endpoints Defined**: {', '.join([f'`{e}`' for e in sym['api_endpoints']])}")
        if sym["functions"]:
            lines.append("- **⚡ Key Functions & Handlers**:")
            for f in sym["functions"][:12]:
                lines.append(f"  - `{f}`")
            if len(sym["functions"]) > 12:
                lines.append(f"  - *(+{len(sym['functions']) - 12} additional private helper functions)*")
        if sym["calls_and_apis"]:
            lines.append(f"- **🔗 Outbound Calls / API Triggers**: {', '.join(set(sym['calls_and_apis']))}")
        if sym["firebase_ops"]:
            lines.append(f"- **🔥 Firestore Operations**: {', '.join(sym['firebase_ops'])}")
        lines.append("")

    return "\n".join(lines)


# =====================================================================
# 3. PRINTED COPY OF ALL SCRIPTS
# =====================================================================
def generate_all_scripts_report() -> list[tuple[str, str]]:
    """Generates complete source code compilation partitioned safely for NotebookLM."""
    files_to_print = []
    
    # Priority order
    order_prefix = ["src/types", "src/App", "src/lib", "src/components", "functions", "server", "package.json", "vite.config"]
    
    all_files = list(iter_project_files(PROJECT_ROOT))
    
    def sort_key(p: Path):
        rel = p.relative_to(PROJECT_ROOT).as_posix()
        for idx, pref in enumerate(order_prefix):
            if rel.startswith(pref):
                return (idx, rel)
        return (len(order_prefix), rel)
        
    all_files.sort(key=sort_key)
    
    chunks = []
    current_chunk = [
        f"# RIVER VALLEY CLEANUP CREW — ALL SCRIPTS & COMPLETE SOURCE CODE\n",
        f"Generated: {dt.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n",
        f"This file contains the complete, unabridged source code for all application components,\n",
        f"engine scripts, Cloudflare edge functions, and configuration files.\n\n"
    ]
    current_len = sum(len(c) for c in current_chunk)
    part_num = 1
    
    for p in all_files:
        ext = p.suffix.lower()
        if ext not in SOURCE_EXTENSIONS and ext not in DEFINITION_EXTENSIONS:
            continue
        rel = p.relative_to(PROJECT_ROOT).as_posix()
        
        try:
            body = read_text(p)
            lang = LANGUAGE_BY_EXTENSION.get(ext, 'text')
            doc_section = f"\n---\n\n## FILE: `{rel}`\n```{lang}\n{body}\n```\n"
            
            if current_len + len(doc_section) > CHAR_LIMIT:
                chunks.append((f"ALL_SCRIPTS_PART_{part_num}.md" if part_num > 1 else "ALL_SCRIPTS.md", "".join(current_chunk)))
                part_num += 1
                current_chunk = [
                    f"# RIVER VALLEY CLEANUP CREW — ALL SCRIPTS (PART {part_num})\n\n"
                ]
                current_len = sum(len(c) for c in current_chunk)
                
            current_chunk.append(doc_section)
            current_len += len(doc_section)
        except Exception as e:
            log.warning("Could not read %s: %s", rel, e)

    if current_chunk:
        filename = f"ALL_SCRIPTS_PART_{part_num}.md" if part_num > 1 else "ALL_SCRIPTS.md"
        chunks.append((filename, "".join(current_chunk)))
        
    return chunks


# =====================================================================
# 4. HIGH DENSITY CATEGORIZED EXPORTS (Matching scode.py schema)
# =====================================================================
def generate_categorized_dumps():
    categorized = {
        "SOURCE_CODE_APP.md": [],
        "SOURCE_CODE_UI.md": [],
        "SOURCE_CODE_CORE.md": [],
        "SOURCE_JSON_DEFINITIONS.md": [],
    }
    
    header = f"# RIVER VALLEY CLEANUP CREW — SOURCE DUMP ({dt.datetime.now().isoformat()})\n\n"
    for k in categorized:
        categorized[k].append(header)

    for p in iter_project_files(PROJECT_ROOT):
        ext = p.suffix.lower()
        rel = p.relative_to(PROJECT_ROOT).as_posix()
        
        try:
            body = read_text(p)
            lang = LANGUAGE_BY_EXTENSION.get(ext, 'text')
            block = f"\n### FULL SOURCE FOR: `{rel}`\n```{lang}\n{body}\n```\n"
            
            if rel.startswith("src/components/"):
                categorized["SOURCE_CODE_UI.md"].append(block)
            elif rel == "src/App.tsx" or rel.startswith("functions/"):
                categorized["SOURCE_CODE_APP.md"].append(block)
            elif ext in DEFINITION_EXTENSIONS or rel == "metadata.json":
                categorized["SOURCE_JSON_DEFINITIONS.md"].append(block)
            else:
                categorized["SOURCE_CODE_CORE.md"].append(block)
        except Exception as e:
            log.warning("Skipping %s: %s", rel, e)

    return {k: "".join(v) for k, v in categorized.items()}


# =====================================================================
# MAIN RUNNER
# =====================================================================
def main():
    print("\n[NOTEBOOKLM-COMPILER] Starting source compilation for NotebookLM...")
    
    tree_md = generate_tree_report()
    hierarchy_md = generate_hierarchy_report()
    all_scripts_parts = generate_all_scripts_report()
    categorized_files = generate_categorized_dumps()
    
    for out_dir in OUTPUT_DIRS:
        out_dir.mkdir(parents=True, exist_ok=True)
        
        # 1. Project Tree
        (out_dir / "01_PROJECT_TREE.md").write_text(tree_md, encoding="utf-8")
        (out_dir / "PROJECT_TREE.md").write_text(tree_md, encoding="utf-8")
        
        # 2. Function Hierarchy
        (out_dir / "02_FUNCTION_HIERARCHY.md").write_text(hierarchy_md, encoding="utf-8")
        (out_dir / "FUNCTION_HIERARCHY.md").write_text(hierarchy_md, encoding="utf-8")
        
        # 3. Printed All Scripts
        for fname, content in all_scripts_parts:
            (out_dir / fname).write_text(content, encoding="utf-8")
            if fname == "ALL_SCRIPTS.md":
                (out_dir / "03_ALL_SCRIPTS.md").write_text(content, encoding="utf-8")
                
        # 4. High-Density Categorized Reports
        for fname, content in categorized_files.items():
            (out_dir / fname).write_text(content, encoding="utf-8")

        # Also create a master index
        index_md = f"""# RIVER VALLEY CLEANUP CREW — NOTEBOOKLM SOURCE COMPILATION
Compiled: {dt.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

This folder contains the complete, structured source compilation for ingestion into **NotebookLM**:

1. **`01_PROJECT_TREE.md` / `PROJECT_TREE.md`**
   - Full directory layout, indexed source metrics, and file count analysis.

2. **`02_FUNCTION_HIERARCHY.md` / `FUNCTION_HIERARCHY.md`**
   - Architectural calling hierarchy, state transitions, React component map, Firestore operations, and edge API call-graphs.

3. **`03_ALL_SCRIPTS.md` / `ALL_SCRIPTS.md`**
   - Complete verbatim copy of every script, component, serverless edge function, and config file.

4. **Specialized High-Density Modules**
   - `SOURCE_CODE_APP.md`: Root state-machine, quote calculations, and Cloudflare edge handlers.
   - `SOURCE_CODE_UI.md`: Modals, Customer Job Tracker, and Operator Dispatch Board.
   - `SOURCE_CODE_CORE.md`: Entry points, styling, and Firebase SDK abstractions.
   - `SOURCE_JSON_DEFINITIONS.md`: Package manifests and metadata definitions.
"""
        (out_dir / "README.md").write_text(index_md, encoding="utf-8")

    # Also keep scode.py at the project root for standalone execution
    if Path(__file__).resolve() != (PROJECT_ROOT / "scode.py").resolve():
        shutil.copyfile(Path(__file__), PROJECT_ROOT / "scode.py")
    
    print(f"[NOTEBOOKLM-COMPILER] Successfully compiled source artifacts into:")
    for out_dir in OUTPUT_DIRS:
        print(f"  -> {out_dir.relative_to(PROJECT_ROOT)}")


if __name__ == "__main__":
    main()
