# RIVER VALLEY CLEANUP CREW — SOURCE DUMP (2026-09-06T02:33:52.589806)


### FULL SOURCE FOR: `metadata.json`
```json
{
  "name": "Fort Smith Scrap & Cleanup",
  "description": "Simple dispatch portal for scrap metal, appliance removals, and general landfill cleanup hauling with live cost pricing estimation, PDF slip printing, and email crew dispatch.",
  "requestFramePermissions": [],
  "majorCapabilities": ["MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API"]
}

```

### FULL SOURCE FOR: `package.json`
```json
{
  "name": "react-example",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "tsx server.ts",
    "build": "vite build && esbuild server.ts --bundle --platform=node --format=cjs --packages=external --sourcemap --outfile=dist/server.cjs && cp -r functions dist/functions",
    "start": "node dist/server.cjs",
    "preview": "vite preview",
    "clean": "rm -rf dist server.js",
    "lint": "tsc --noEmit"
  },
  "dependencies": {
    "@google/genai": "^2.4.0",
    "@tailwindcss/vite": "^4.1.14",
    "@vitejs/plugin-react": "^5.0.4",
    "dotenv": "^17.2.3",
    "express": "^4.21.2",
    "firebase": "^12.16.0",
    "lucide-react": "^0.546.0",
    "motion": "^12.23.24",
    "npm": "^11.18.0",
    "react": "^19.0.1",
    "react-dom": "^19.0.1",
    "scripts": "^0.1.0",
    "start": "^5.1.0",
    "stripe": "^22.3.0",
    "vite": "^6.2.3"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^22.14.0",
    "@types/react": "^19.2.17",
    "autoprefixer": "^10.4.21",
    "esbuild": "^0.25.0",
    "tailwindcss": "^4.1.14",
    "tsx": "^4.21.0",
    "typescript": "~5.8.2",
    "vite": "^6.2.3"
  },
  "allowScripts": {
    "@google/genai@2.10.0": true,
    "esbuild@0.25.12": true,
    "esbuild@0.28.1": true,
    "protobufjs@7.6.4": true
  }
}

```

### FULL SOURCE FOR: `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "module": "ESNext",
    "lib": [
      "ES2022",
      "DOM",
      "DOM.Iterable"
    ],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "isolatedModules": true,
    "moduleDetection": "force",
    "allowJs": true,
    "jsx": "react-jsx",
    "paths": {
      "@/*": [
        "./*"
      ]
    },
    "allowImportingTsExtensions": true,
    "noEmit": true
  }
}

```
