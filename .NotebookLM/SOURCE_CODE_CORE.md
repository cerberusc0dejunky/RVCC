# RIVER VALLEY CLEANUP CREW — SOURCE DUMP (2026-09-06T02:33:52.589806)


### FULL SOURCE FOR: `.env.example`
```text
# Server-side API keys
GEMINI_API_KEY=
STRIPE_SECRET_KEY=

# Client-side Firebase configuration
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

```

### FULL SOURCE FOR: `.gitignore`
```text
node_modules/
build/
dist/
coverage/
.DS_Store
*.log
.env*
!.env.example
*.zip

```

### FULL SOURCE FOR: `README.md`
```markdown
<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/e3a6570c-382b-47fd-88e9-4c85b1ccf6e1

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

```

### FULL SOURCE FOR: `bun.lock`
```text
{
  "lockfileVersion": 2,
  "configVersion": 1,
  "workspaces": {
    "": {
      "name": "react-example",
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
        "vite": "^6.2.3",
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
        "vite": "^6.2.3",
      },
    },
  },
  "packages": {
    "@babel/code-frame": ["@babel/code-frame@7.29.7", "", { "dependencies": { "@babel/helper-validator-identifier": "^7.29.7", "js-tokens": "^4.0.0", "picocolors": "^1.1.1" } }, "sha512-Aup7aUOfpbAUg2ROOJN6Iw5f9DMBlzu0mIkm/malLQFN/YQgO48wCj0Kxa3sEHJvPVFg7siR+qRInwXd2qhQKw=="],

    "@babel/compat-data": ["@babel/compat-data@7.29.7", "", {}, "sha512-locTkQyKvwIEgBzVrn8693ebc97F2U8ZHjbXwDXJ5Fn2TCpNwTlKcaKLkdHop5c/icOFE7qt7Q9JC5hnKNa6Gg=="],

    "@babel/core": ["@babel/core@7.29.7", "", { "dependencies": { "@babel/code-frame": "^7.29.7", "@babel/generator": "^7.29.7", "@babel/helper-compilation-targets": "^7.29.7", "@babel/helper-module-transforms": "^7.29.7", "@babel/helpers": "^7.29.7", "@babel/parser": "^7.29.7", "@babel/template": "^7.29.7", "@babel/traverse": "^7.29.7", "@babel/types": "^7.29.7", "@jridgewell/remapping": "^2.3.5", "convert-source-map": "^2.0.0", "debug": "^4.1.0", "gensync": "^1.0.0-beta.2", "json5": "^2.2.3", "semver": "^6.3.1" } }, "sha512-RgHBCvtjbOK2gXSNBNIkNoEc9qoVEtau3hj8gEqKQuL3HZAibKarWFEI3Lfm6EYKkLalOh8eSrj9b+ch9H/VBA=="],

    "@babel/generator": ["@babel/generator@7.29.8", "", { "dependencies": { "@babel/parser": "^7.29.8", "@babel/types": "^7.29.8", "@jridgewell/gen-mapping": "^0.3.12", "@jridgewell/trace-mapping": "^0.3.28", "jsesc": "^3.0.2" } }, "sha512-gZbepsdh3WDtgZKWL+vTPh71LSBrm/Y4/QDZBVCcYfmeTEEuoOYwlSy+G1StfJg+/Zy550u/3TATbm7qDbbMtg=="],

    "@babel/helper-compilation-targets": ["@babel/helper-compilation-targets@7.29.7", "", { "dependencies": { "@babel/compat-data": "^7.29.7", "@babel/helper-validator-option": "^7.29.7", "browserslist": "^4.24.0", "lru-cache": "^5.1.1", "semver": "^6.3.1" } }, "sha512-wem6WaBj4NaVYVdNhLPPVacES6ZJ+KBBfSkTMD3YZxbP3rm3Di85tJU5ljaUNhaOynt+Aj0xruhYuzQBt8n71g=="],

    "@babel/helper-globals": ["@babel/helper-globals@7.29.7", "", {}, "sha512-3nQVUAtvkKH9zahfWgw96Jc/uFOmjACE1kQz82E2lqWmHBgjzbNlsC22nuQTfahmWeQtTq5nQ/4Nnd2A1wj4zA=="],

    "@babel/helper-module-imports": ["@babel/helper-module-imports@7.29.7", "", { "dependencies": { "@babel/traverse": "^7.29.7", "@babel/types": "^7.29.7" } }, "sha512-ejHwrQQYcm9xnTivShn2IDOlIzInN34AXskvq9QicvCtEzq1Vzclu/tKF8Jq1Cg8JG2GL6/EmjgsCT7lXepE3g=="],

    "@babel/helper-module-transforms": ["@babel/helper-module-transforms@7.29.7", "", { "dependencies": { "@babel/helper-module-imports": "^7.29.7", "@babel/helper-validator-identifier": "^7.29.7", "@babel/traverse": "^7.29.7" }, "peerDependencies": { "@babel/core": "^7.0.0" } }, "sha512-UPUVSyXbOh627KiCIGQSgwWzGeBKLkaJ9PJEdrngIwMSzxLR4jS4+f1f1jb7VzBbg8nFLaYotvVPFCTqdrmTAg=="],

    "@babel/helper-plugin-utils": ["@babel/helper-plugin-utils@7.29.7", "", {}, "sha512-G7sHYigPY17oO5SYWnfD/0MTBwVR781S/JI643e/JhUYgVgWE/61SoW3NH9KWUKyKq5LVh3npif99Wkt6j86Jw=="],

    "@babel/helper-string-parser": ["@babel/helper-string-parser@7.29.7", "", {}, "sha512-Pb5ijPrZ89GDH8223L4UP8i6QApWxs04RbPQJTeWDV0/keR2E36MeKnyr6LYmUUvqRRI+Iv87SuF1W6ErINzYw=="],

    "@babel/helper-validator-identifier": ["@babel/helper-validator-identifier@7.29.7", "", {}, "sha512-qehxGkRj55h/ff8EMaJ+cYhyaKlHIxqYDn682wQD7RNp9UujOQsHog2uS0r2vzr4pW+sXf90NeeayjcNaX3fFg=="],

    "@babel/helper-validator-option": ["@babel/helper-validator-option@7.29.7", "", {}, "sha512-N9ZErrD+yW5geCDtBqnOoxmR8+tNKiGuxKlDpuJxfsqpa2dFcexaziGAE/qoHLiDDreVNMupxGmSoNlyvsA3gw=="],

    "@babel/helpers": ["@babel/helpers@7.29.7", "", { "dependencies": { "@babel/template": "^7.29.7", "@babel/types": "^7.29.7" } }, "sha512-1k2lAGRMfHTcwuNYcCNUmaUffmQv8KWMfh2iJUUeRlwlwH4FdNG7mfPI10NPfLHJFThE4Tyr4mv7kTNZOiPuBg=="],

    "@babel/parser": ["@babel/parser@7.29.8", "", { "dependencies": { "@babel/types": "^7.29.8" }, "bin": "./bin/babel-parser.js" }, "sha512-E8lTAYNB1KW+FH+VGJuZM1ioAx2E6oVlvQFRrf5P8ZZmsiJXYAD9vTFV7yyEURNzgh1dFqMZuO6tUwcARbqFCA=="],

    "@babel/plugin-transform-react-jsx-self": ["@babel/plugin-transform-react-jsx-self@7.29.7", "", { "dependencies": { "@babel/helper-plugin-utils": "^7.29.7" }, "peerDependencies": { "@babel/core": "^7.0.0-0" } }, "sha512-TL0hMc9xzy86VD31nUiwzd5otRAcyEPcsegCxolO0PvcXuH1v0kECe/UIznYFihpkvU5wg/jk4v0TTEFfm53fw=="],

    "@babel/plugin-transform-react-jsx-source": ["@babel/plugin-transform-react-jsx-source@7.29.7", "", { "dependencies": { "@babel/helper-plugin-utils": "^7.29.7" }, "peerDependencies": { "@babel/core": "^7.0.0-0" } }, "sha512-06IyK09H3wi4cGbhDBwp5gUGo0IKtnYa8tyTiephirPCK6fbobVGiXMMI5zLQ4aKEYP3wZ3ArU44o+8KMrSG/Q=="],

    "@babel/template": ["@babel/template@7.29.7", "", { "dependencies": { "@babel/code-frame": "^7.29.7", "@babel/parser": "^7.29.7", "@babel/types": "^7.29.7" } }, "sha512-puq+Gf35oI24FeN11LkoUQFqv9uwNeWpxXZi/Ji3rRIoKAzKnxRaZ+Gkj0vKS9ZCiTESfng1N9LyOyXvo+m+Gg=="],

    "@babel/traverse": ["@babel/traverse@7.29.8", "", { "dependencies": { "@babel/code-frame": "^7.29.7", "@babel/generator": "^7.29.8", "@babel/helper-globals": "^7.29.7", "@babel/parser": "^7.29.8", "@babel/template": "^7.29.7", "@babel/types": "^7.29.8", "debug": "^4.3.1" } }, "sha512-I5z7H3bf/41ktsNVLtpN0wAa336HkqIHQ5BuPLEhTkt1jVSyZpeNKIzTgEWmlxjdg81R0IgUCcaE+Ok3NvrfZg=="],

    "@babel/types": ["@babel/types@7.29.8", "", { "dependencies": { "@babel/helper-string-parser": "^7.29.7", "@babel/helper-validator-identifier": "^7.29.7" } }, "sha512-Vj1jF3cPfxg7OAfoI7QnVKLoILlm2JF9pnVHrX8qx7AHMiYWT+NDAA7jChlNgRS4WTLc/fD1lXLmPixluj+3Gg=="],

    "@esbuild/aix-ppc64": ["@esbuild/aix-ppc64@0.25.12", "", { "os": "aix", "cpu": "ppc64" }, "sha512-Hhmwd6CInZ3dwpuGTF8fJG6yoWmsToE+vYgD4nytZVxcu1ulHpUQRAB1UJ8+N1Am3Mz4+xOByoQoSZf4D+CpkA=="],

    "@esbuild/android-arm": ["@esbuild/android-arm@0.25.12", "", { "os": "android", "cpu": "arm" }, "sha512-VJ+sKvNA/GE7Ccacc9Cha7bpS8nyzVv0jdVgwNDaR4gDMC/2TTRc33Ip8qrNYUcpkOHUT5OZ0bUcNNVZQ9RLlg=="],

    "@esbuild/android-arm64": ["@esbuild/android-arm64@0.25.12", "", { "os": "android", "cpu": "arm64" }, "sha512-6AAmLG7zwD1Z159jCKPvAxZd4y/VTO0VkprYy+3N2FtJ8+BQWFXU+OxARIwA46c5tdD9SsKGZ/1ocqBS/gAKHg=="],

    "@esbuild/android-x64": ["@esbuild/android-x64@0.25.12", "", { "os": "android", "cpu": "x64" }, "sha512-5jbb+2hhDHx5phYR2By8GTWEzn6I9UqR11Kwf22iKbNpYrsmRB18aX/9ivc5cabcUiAT/wM+YIZ6SG9QO6a8kg=="],

    "@esbuild/darwin-arm64": ["@esbuild/darwin-arm64@0.25.12", "", { "os": "darwin", "cpu": "arm64" }, "sha512-N3zl+lxHCifgIlcMUP5016ESkeQjLj/959RxxNYIthIg+CQHInujFuXeWbWMgnTo4cp5XVHqFPmpyu9J65C1Yg=="],

    "@esbuild/darwin-x64": ["@esbuild/darwin-x64@0.25.12", "", { "os": "darwin", "cpu": "x64" }, "sha512-HQ9ka4Kx21qHXwtlTUVbKJOAnmG1ipXhdWTmNXiPzPfWKpXqASVcWdnf2bnL73wgjNrFXAa3yYvBSd9pzfEIpA=="],

    "@esbuild/freebsd-arm64": ["@esbuild/freebsd-arm64@0.25.12", "", { "os": "freebsd", "cpu": "arm64" }, "sha512-gA0Bx759+7Jve03K1S0vkOu5Lg/85dou3EseOGUes8flVOGxbhDDh/iZaoek11Y8mtyKPGF3vP8XhnkDEAmzeg=="],

    "@esbuild/freebsd-x64": ["@esbuild/freebsd-x64@0.25.12", "", { "os": "freebsd", "cpu": "x64" }, "sha512-TGbO26Yw2xsHzxtbVFGEXBFH0FRAP7gtcPE7P5yP7wGy7cXK2oO7RyOhL5NLiqTlBh47XhmIUXuGciXEqYFfBQ=="],

    "@esbuild/linux-arm": ["@esbuild/linux-arm@0.25.12", "", { "os": "linux", "cpu": "arm" }, "sha512-lPDGyC1JPDou8kGcywY0YILzWlhhnRjdof3UlcoqYmS9El818LLfJJc3PXXgZHrHCAKs/Z2SeZtDJr5MrkxtOw=="],

    "@esbuild/linux-arm64": ["@esbuild/linux-arm64@0.25.12", "", { "os": "linux", "cpu": "arm64" }, "sha512-8bwX7a8FghIgrupcxb4aUmYDLp8pX06rGh5HqDT7bB+8Rdells6mHvrFHHW2JAOPZUbnjUpKTLg6ECyzvas2AQ=="],

    "@esbuild/linux-ia32": ["@esbuild/linux-ia32@0.25.12", "", { "os": "linux", "cpu": "ia32" }, "sha512-0y9KrdVnbMM2/vG8KfU0byhUN+EFCny9+8g202gYqSSVMonbsCfLjUO+rCci7pM0WBEtz+oK/PIwHkzxkyharA=="],

    "@esbuild/linux-loong64": ["@esbuild/linux-loong64@0.25.12", "", { "os": "linux", "cpu": "none" }, "sha512-h///Lr5a9rib/v1GGqXVGzjL4TMvVTv+s1DPoxQdz7l/AYv6LDSxdIwzxkrPW438oUXiDtwM10o9PmwS/6Z0Ng=="],

    "@esbuild/linux-mips64el": ["@esbuild/linux-mips64el@0.25.12", "", { "os": "linux", "cpu": "none" }, "sha512-iyRrM1Pzy9GFMDLsXn1iHUm18nhKnNMWscjmp4+hpafcZjrr2WbT//d20xaGljXDBYHqRcl8HnxbX6uaA/eGVw=="],

    "@esbuild/linux-ppc64": ["@esbuild/linux-ppc64@0.25.12", "", { "os": "linux", "cpu": "ppc64" }, "sha512-9meM/lRXxMi5PSUqEXRCtVjEZBGwB7P/D4yT8UG/mwIdze2aV4Vo6U5gD3+RsoHXKkHCfSxZKzmDssVlRj1QQA=="],

    "@esbuild/linux-riscv64": ["@esbuild/linux-riscv64@0.25.12", "", { "os": "linux", "cpu": "none" }, "sha512-Zr7KR4hgKUpWAwb1f3o5ygT04MzqVrGEGXGLnj15YQDJErYu/BGg+wmFlIDOdJp0PmB0lLvxFIOXZgFRrdjR0w=="],

    "@esbuild/linux-s390x": ["@esbuild/linux-s390x@0.25.12", "", { "os": "linux", "cpu": "s390x" }, "sha512-MsKncOcgTNvdtiISc/jZs/Zf8d0cl/t3gYWX8J9ubBnVOwlk65UIEEvgBORTiljloIWnBzLs4qhzPkJcitIzIg=="],

    "@esbuild/linux-x64": ["@esbuild/linux-x64@0.25.12", "", { "os": "linux", "cpu": "x64" }, "sha512-uqZMTLr/zR/ed4jIGnwSLkaHmPjOjJvnm6TVVitAa08SLS9Z0VM8wIRx7gWbJB5/J54YuIMInDquWyYvQLZkgw=="],

    "@esbuild/netbsd-arm64": ["@esbuild/netbsd-arm64@0.25.12", "", { "os": "none", "cpu": "arm64" }, "sha512-xXwcTq4GhRM7J9A8Gv5boanHhRa/Q9KLVmcyXHCTaM4wKfIpWkdXiMog/KsnxzJ0A1+nD+zoecuzqPmCRyBGjg=="],

    "@esbuild/netbsd-x64": ["@esbuild/netbsd-x64@0.25.12", "", { "os": "none", "cpu": "x64" }, "sha512-Ld5pTlzPy3YwGec4OuHh1aCVCRvOXdH8DgRjfDy/oumVovmuSzWfnSJg+VtakB9Cm0gxNO9BzWkj6mtO1FMXkQ=="],

    "@esbuild/openbsd-arm64": ["@esbuild/openbsd-arm64@0.25.12", "", { "os": "openbsd", "cpu": "arm64" }, "sha512-fF96T6KsBo/pkQI950FARU9apGNTSlZGsv1jZBAlcLL1MLjLNIWPBkj5NlSz8aAzYKg+eNqknrUJ24QBybeR5A=="],

    "@esbuild/openbsd-x64": ["@esbuild/openbsd-x64@0.25.12", "", { "os": "openbsd", "cpu": "x64" }, "sha512-MZyXUkZHjQxUvzK7rN8DJ3SRmrVrke8ZyRusHlP+kuwqTcfWLyqMOE3sScPPyeIXN/mDJIfGXvcMqCgYKekoQw=="],

    "@esbuild/openharmony-arm64": ["@esbuild/openharmony-arm64@0.25.12", "", { "os": "none", "cpu": "arm64" }, "sha512-rm0YWsqUSRrjncSXGA7Zv78Nbnw4XL6/dzr20cyrQf7ZmRcsovpcRBdhD43Nuk3y7XIoW2OxMVvwuRvk9XdASg=="],

    "@esbuild/sunos-x64": ["@esbuild/sunos-x64@0.25.12", "", { "os": "sunos", "cpu": "x64" }, "sha512-3wGSCDyuTHQUzt0nV7bocDy72r2lI33QL3gkDNGkod22EsYl04sMf0qLb8luNKTOmgF/eDEDP5BFNwoBKH441w=="],

    "@esbuild/win32-arm64": ["@esbuild/win32-arm64@0.25.12", "", { "os": "win32", "cpu": "arm64" }, "sha512-rMmLrur64A7+DKlnSuwqUdRKyd3UE7oPJZmnljqEptesKM8wx9J8gx5u0+9Pq0fQQW8vqeKebwNXdfOyP+8Bsg=="],

    "@esbuild/win32-ia32": ["@esbuild/win32-ia32@0.25.12", "", { "os": "win32", "cpu": "ia32" }, "sha512-HkqnmmBoCbCwxUKKNPBixiWDGCpQGVsrQfJoVGYLPT41XWF8lHuE5N6WhVia2n4o5QK5M4tYr21827fNhi4byQ=="],

    "@esbuild/win32-x64": ["@esbuild/win32-x64@0.25.12", "", { "os": "win32", "cpu": "x64" }, "sha512-alJC0uCZpTFrSL0CCDjcgleBXPnCrEAhTBILpeAp7M/OFgoqtAetfBzX0xM00MUsVVPpVjlPuMbREqnZCXaTnA=="],

    "@firebase/ai": ["@firebase/ai@2.15.0", "", { "dependencies": { "@firebase/app-check-interop-types": "0.3.5", "@firebase/component": "0.7.5", "@firebase/logger": "0.5.2", "@firebase/util": "1.15.3", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app": "0.x", "@firebase/app-types": "0.x" } }, "sha512-Aj7TbFdAIWZdkX8JfdDStERpR35g6WNs+7XhNPtFLFOizUotj6k4N/D8HJkR45165HhnMJBe4hjOeeaxnnn56Q=="],

    "@firebase/analytics": ["@firebase/analytics@0.10.24", "", { "dependencies": { "@firebase/component": "0.7.5", "@firebase/installations": "0.6.24", "@firebase/logger": "0.5.2", "@firebase/util": "1.15.3", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app": "0.x" } }, "sha512-OfIAcIIwoqXjBzS+DnUQpOZ7i3ePaNFg83KPpDWjBZUKJmqMwzzAtLJqmKZOkQnW8im6vFR6f2I3M/9hxVd+QA=="],

    "@firebase/analytics-compat": ["@firebase/analytics-compat@0.2.30", "", { "dependencies": { "@firebase/analytics": "0.10.24", "@firebase/analytics-types": "0.8.5", "@firebase/component": "0.7.5", "@firebase/util": "1.15.3", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app": "0.x", "@firebase/app-compat": "0.x" } }, "sha512-uVZEKlLaW4AHAhv8zoN9cTmveX6v86AVqcJ4LCaRCMTChTH8/NsjbisTq1lpBfWCLWS1spqwSHB4vol/YSCdMA=="],

    "@firebase/analytics-types": ["@firebase/analytics-types@0.8.5", "", {}, "sha512-kdnooE7Bis2jEnsqcerRwn/UQpH5D3uvHpku7OdUM9TJN3omlu6iYtbyAQ6XkAJRgJtO0aNf9OOkW8J6D59oCA=="],

    "@firebase/app": ["@firebase/app@0.16.1", "", { "dependencies": { "@firebase/component": "0.7.5", "@firebase/logger": "0.5.2", "@firebase/util": "1.15.3", "idb": "7.1.1", "tslib": "^2.1.0" } }, "sha512-tjUEorFyKrurH7PbLWv9zDHRuU4mLefgD/yY38D584ziorIRlQz/PVjx4c/SCGyCuUlmyzt72mK+Lh+COAywNQ=="],

    "@firebase/app-check": ["@firebase/app-check@0.13.1", "", { "dependencies": { "@firebase/component": "0.7.5", "@firebase/logger": "0.5.2", "@firebase/util": "1.15.3", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app": "0.x" } }, "sha512-l8y3dmnhodXks/APAwx4tWqRl3tk8b9874KF1FJyKg1DIU+kMD0l52iz7S9/MW+eK8k6cjJg0G0iJ5KQAsQpow=="],

    "@firebase/app-check-compat": ["@firebase/app-check-compat@0.4.7", "", { "dependencies": { "@firebase/app-check": "0.13.1", "@firebase/app-check-types": "0.5.5", "@firebase/component": "0.7.5", "@firebase/logger": "0.5.2", "@firebase/util": "1.15.3", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app": "0.x", "@firebase/app-compat": "0.x" } }, "sha512-fBb/xSMyIKv1nDmccfzz3IAGBzx/cQOxmZai66rJzifb1hMMkztf824Xx7LhpTUe7HNUbXwY90IvJ66fi8q6yg=="],

    "@firebase/app-check-interop-types": ["@firebase/app-check-interop-types@0.3.5", "", {}, "sha512-qId34pVZ2CXTmtu4ofW5leiI93DvnOvIcr/5GT7MZPw5WXAi6nZoU+g9cNRgl7K90UJSbK0cXxten4meYMPyZg=="],

    "@firebase/app-check-types": ["@firebase/app-check-types@0.5.5", "", {}, "sha512-+DF4gzFrlwGFyky38o4T/YN/r51l70yCtJ2HTkwmRj8FCMwPjm4hLH4fQbj6BUvzkiFqliBkitFsRpf1/YZkWA=="],

    "@firebase/app-compat": ["@firebase/app-compat@0.5.17", "", { "dependencies": { "@firebase/app": "0.16.1", "@firebase/component": "0.7.5", "@firebase/logger": "0.5.2", "@firebase/util": "1.15.3", "tslib": "^2.1.0" } }, "sha512-5GdJWobqs6jbNYOnaQiSa4Ng8gnFerhqr7nY+v5jlnT7o9QbEeIZRLPQpnLe0TxYSWfRV2lAMbyR0kbXeIos9Q=="],

    "@firebase/app-types": ["@firebase/app-types@0.9.6", "", { "dependencies": { "@firebase/logger": "0.5.2" } }, "sha512-yPLahy7Esfu2w/yme3msVK4xTkDXQqq6szfQn8yVOQpCKiT5GVFjqNpLbuz6NkX0WuTwUidkmPewW3r4xkvpeg=="],

    "@firebase/auth": ["@firebase/auth@1.13.5", "", { "dependencies": { "@firebase/component": "0.7.5", "@firebase/logger": "0.5.2", "@firebase/util": "1.15.3", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app": "0.x", "@react-native-async-storage/async-storage": "^2.2.0 || ^3.0.0" }, "optionalPeers": ["@react-native-async-storage/async-storage"] }, "sha512-1AXoBJqBVD8WL8FZYo3S2GmJF9YUoom6Y6ngMxOSkzzhW5sT83pLchb6TGFgxes91dfXx8s/VYc5VrLDNqpLog=="],

    "@firebase/auth-compat": ["@firebase/auth-compat@0.6.10", "", { "dependencies": { "@firebase/auth": "1.13.5", "@firebase/auth-types": "0.13.2", "@firebase/component": "0.7.5", "@firebase/util": "1.15.3", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app": "0.x", "@firebase/app-compat": "0.x" } }, "sha512-Bvklg2nL7BrBFCAqdsleW8fse9Jh0fARqJPlJmA40uermfWx1bJiO7dnKyZN3J39d2TFVd4VJXtg3i6Wg92/YQ=="],

    "@firebase/auth-interop-types": ["@firebase/auth-interop-types@0.2.6", "", {}, "sha512-FgwZqDrBqgK0BHI70QTv1v/5wmuDF9f8fsJFvKSxoRlK2PPfSQtZAk2jhXu4pe9BZzFi/e4UYusU/bEQHdf6Qg=="],

    "@firebase/auth-types": ["@firebase/auth-types@0.13.2", "", { "peerDependencies": { "@firebase/app-types": "0.x", "@firebase/util": "1.x" } }, "sha512-OU+miuoSxIWYN7GT291d2ylVJBL3k/OePo7/JDSoQtkFQoEiGBc4AHuMjj/seqFIsHrqnjrAfRCk4pfufoJolQ=="],

    "@firebase/component": ["@firebase/component@0.7.5", "", { "dependencies": { "@firebase/util": "1.15.3", "tslib": "^2.1.0" } }, "sha512-vuFDcL91Q+2ZuBJkyOh86T4q0B4ffNTDjc/A38tybO56odQABxRTFLTIowCWqAKeIcgo37GowWMVgFF73gD8Qw=="],

    "@firebase/data-connect": ["@firebase/data-connect@0.7.4", "", { "dependencies": { "@firebase/auth-interop-types": "0.2.6", "@firebase/component": "0.7.5", "@firebase/logger": "0.5.2", "@firebase/util": "1.15.3", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app": "0.x" } }, "sha512-su1aGWlzhxb+xtggCUSsufJn1FDa06SBDK71y+fpQ+g2zMhMExik6FUv/odkKzOF/xfWVjabCbWBcjJY3MceDA=="],

    "@firebase/database": ["@firebase/database@1.1.5", "", { "dependencies": { "@firebase/app-check-interop-types": "0.3.5", "@firebase/auth-interop-types": "0.2.6", "@firebase/component": "0.7.5", "@firebase/logger": "0.5.2", "@firebase/util": "1.15.3", "faye-websocket": "0.11.4", "tslib": "^2.1.0" } }, "sha512-/JGpvszLoNXNgzilRXocigGfFF4hbcPA9wN1i1kjJx6oKkXgkHteZYl3lQs1lJX3ETDf6bv7zI15lPMVUp4sAQ=="],

    "@firebase/database-compat": ["@firebase/database-compat@2.1.7", "", { "dependencies": { "@firebase/component": "0.7.5", "@firebase/database": "1.1.5", "@firebase/database-types": "1.0.22", "@firebase/logger": "0.5.2", "@firebase/util": "1.15.3", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app": "0.x", "@firebase/app-compat": "0.x" }, "optionalPeers": ["@firebase/app", "@firebase/app-compat"] }, "sha512-lBq9sJm8MnJINKJnkAKSOj2MbC66xGoSVCcGkPtstl+lkoKEBtD46qHLbuDgW/WbLPoKVm17RIN8BxHj+Z2F2w=="],

    "@firebase/database-types": ["@firebase/database-types@1.0.22", "", { "dependencies": { "@firebase/app-types": "0.9.6", "@firebase/util": "1.15.3" } }, "sha512-YAZNXsjY9EQQ+pKw/3ax8n5FgolHC7Qew7EY5RceYdl0R2ZP+kCv1O0DkKlcceue8uQCOreHCNN7PWVFpY1Nug=="],

    "@firebase/firestore": ["@firebase/firestore@4.17.1", "", { "dependencies": { "@firebase/component": "0.7.5", "@firebase/logger": "0.5.2", "@firebase/util": "1.15.3", "@firebase/webchannel-wrapper": "1.0.7", "@grpc/grpc-js": "~1.9.0", "@grpc/proto-loader": "^0.7.8", "re2js": "^2.8.3", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app": "0.x" } }, "sha512-8lqPNf2w10CtYG+tayVjZO1pSyQpnhztQRudeD109VtXDzNbASTaYdO43sj5PMsDcWq0aOYY3RmJOUlXu9++jw=="],

    "@firebase/firestore-compat": ["@firebase/firestore-compat@0.4.13", "", { "dependencies": { "@firebase/component": "0.7.5", "@firebase/firestore": "4.17.1", "@firebase/firestore-types": "3.0.5", "@firebase/util": "1.15.3", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app": "0.x", "@firebase/app-compat": "0.x" } }, "sha512-l9dCewxMzzLOIhcwTjERCKxrWOn1kZ9JvwOQq9zZNq4I/Nbvb/B9njT230V61uvQ9qZ3/qpUG758D8DDTEFXnw=="],

    "@firebase/firestore-types": ["@firebase/firestore-types@3.0.5", "", { "peerDependencies": { "@firebase/app-types": "0.x", "@firebase/util": "1.x" } }, "sha512-dbdMAQkMd5dwWc48eupz/Y6/E9ruat3+gY5lhVKscvvT/HnDBEEMzJW38zdKhgdnglZHGk2vUsJMOHAphMHGMA=="],

    "@firebase/functions": ["@firebase/functions@0.14.0", "", { "dependencies": { "@firebase/app-check-interop-types": "0.3.5", "@firebase/auth-interop-types": "0.2.6", "@firebase/component": "0.7.5", "@firebase/messaging-interop-types": "0.2.6", "@firebase/util": "1.15.3", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app": "0.x" } }, "sha512-DhuYFr0eMhp+s/PNEk6SiMsYkc00+XVOUeKbrl8MOzQNZI3SKQpqoDR1d+keNDAutwmHRWTUAdXBoVPD+xxVUw=="],

    "@firebase/functions-compat": ["@firebase/functions-compat@0.5.0", "", { "dependencies": { "@firebase/component": "0.7.5", "@firebase/functions": "0.14.0", "@firebase/functions-types": "0.6.5", "@firebase/util": "1.15.3", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app": "0.x", "@firebase/app-compat": "0.x" } }, "sha512-T3BDIToESZUHt7438wyKYMkRjKg3m1xAIux5fVpNvTRQlDOFLukWniQWBDhJ2znpU9kxMTR6+e31TVo8P15PZw=="],

    "@firebase/functions-types": ["@firebase/functions-types@0.6.5", "", {}, "sha512-Zc0pURjthHXzSj54ZivCkzKDSV1r/wIpnmHdhq82q2yFFPVoncG/ZJjnVMiANvQfeww/QnElhzODpfwUucVwdA=="],

    "@firebase/installations": ["@firebase/installations@0.6.24", "", { "dependencies": { "@firebase/component": "0.7.5", "@firebase/util": "1.15.3", "idb": "7.1.1", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app": "0.x" } }, "sha512-Ui52ey8wHoWqkBbXRKJEKYWylI0JZogZmoLS+o8Anh1bxWtK27ZYjLla1UJAAdC5DCKLJ2qAp0VpJOjg8VOX1g=="],

    "@firebase/installations-compat": ["@firebase/installations-compat@0.2.24", "", { "dependencies": { "@firebase/component": "0.7.5", "@firebase/installations": "0.6.24", "@firebase/installations-types": "0.5.5", "@firebase/util": "1.15.3", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app": "0.x", "@firebase/app-compat": "0.x" } }, "sha512-8M5nlcWwYt881x83COP2odq5vgf+NgwJh+RMd4LRSv8JI1pxwDfgrDJOERrjTgfC9J5Z0vnQX4b1pdN914e0Zw=="],

    "@firebase/installations-types": ["@firebase/installations-types@0.5.5", "", { "peerDependencies": { "@firebase/app-types": "0.x" } }, "sha512-e9UYcju3puDl1vdrcKIi5dExzHLameOT/Tc61Q48PYwxtsM1NzZh/ikGbdBQTsbRgg0EMZqdPr0/m5ODUBobrg=="],

    "@firebase/logger": ["@firebase/logger@0.5.2", "", { "dependencies": { "tslib": "^2.1.0" } }, "sha512-J2VO4NFTc0xQFrxV1B/lm5balicm9cwuX2acR9Yn41fN8KgUeQFo+VJV222IqW2FPSXKDu9uo5WdQFWf9TPbYg=="],

    "@firebase/messaging": ["@firebase/messaging@0.13.2", "", { "dependencies": { "@firebase/component": "0.7.5", "@firebase/installations": "0.6.24", "@firebase/messaging-interop-types": "0.2.6", "@firebase/util": "1.15.3", "idb": "7.1.1", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app": "0.x" } }, "sha512-KcZoqUu2ih4sLH91dW9tmyHjCR0IQyNzSLZunX5uq7cLeImXb4uO2I0wq5FACduO2I+FoTeWa2BtUv7Jpowqdw=="],

    "@firebase/messaging-compat": ["@firebase/messaging-compat@0.2.29", "", { "dependencies": { "@firebase/component": "0.7.5", "@firebase/messaging": "0.13.2", "@firebase/util": "1.15.3", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app": "0.x", "@firebase/app-compat": "0.x" } }, "sha512-8Twe4CeYvAx8AzjBxyyQFKzinaMGGt13hPQBqaARQ2QZjagrEaqSVBe+Zy6F4L/vT8DV168yRgRu7W/RK7p+4w=="],

    "@firebase/messaging-interop-types": ["@firebase/messaging-interop-types@0.2.6", "", {}, "sha512-MVzvkKe2V4H2dHu5oOxRfeKQcfTwWmCgnzsC4V1q3ixun5iiL8riCZ2qI35rDhCL4glPGiu0jHxDbpVNuTKfow=="],

    "@firebase/performance": ["@firebase/performance@0.7.14", "", { "dependencies": { "@firebase/component": "0.7.5", "@firebase/installations": "0.6.24", "@firebase/logger": "0.5.2", "@firebase/util": "1.15.3", "tslib": "^2.1.0", "web-vitals": "^4.2.4" }, "peerDependencies": { "@firebase/app": "0.x" } }, "sha512-9PH1XEZVHErxGdbXluvGz4Uyjw4W955H8v7Mv9rHIybRrg5F2Ac2tvf5+mSf5EtnxWNmxrD2WLnvMFaZP4sMrQ=="],

    "@firebase/performance-compat": ["@firebase/performance-compat@0.2.27", "", { "dependencies": { "@firebase/component": "0.7.5", "@firebase/logger": "0.5.2", "@firebase/performance": "0.7.14", "@firebase/performance-types": "0.2.5", "@firebase/util": "1.15.3", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app": "0.x", "@firebase/app-compat": "0.x" } }, "sha512-O/ozTf/EbChN94Pk7bd1eUC0PAC36726AwsaiJyC0bZzSBWfLGSWASGPH5pebUWXQPJtGxIJYRkkbX5l0Qa+Hw=="],

    "@firebase/performance-types": ["@firebase/performance-types@0.2.5", "", {}, "sha512-PRzOgB+/M+6AKlEkY8a9xy5Ff5SfZPIh4iShXhn2WAcL/euSbK7bdLqWysHduunNJhGFsXa22Ag3ixqL6rQtYg=="],

    "@firebase/remote-config": ["@firebase/remote-config@0.9.2", "", { "dependencies": { "@firebase/component": "0.7.5", "@firebase/installations": "0.6.24", "@firebase/logger": "0.5.2", "@firebase/util": "1.15.3", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app": "0.x" } }, "sha512-Rii93DkXjM+RE/ytHdYa7EIiQLJbdBr+W8EEiqd/vbLCOC+1FdkDuRiumJBp6t3yewHGbdqbpjB3fk3z0cZ+8g=="],

    "@firebase/remote-config-compat": ["@firebase/remote-config-compat@0.2.29", "", { "dependencies": { "@firebase/component": "0.7.5", "@firebase/logger": "0.5.2", "@firebase/remote-config": "0.9.2", "@firebase/remote-config-types": "0.5.2", "@firebase/util": "1.15.3", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app": "0.x", "@firebase/app-compat": "0.x" } }, "sha512-mY7JtTISK6F4g4T0x3kVepr5cp0NXL7f5yjIUXXGaTrg4qUlFBWRbENaHaqZ78dwmNcLm24h/yPsOVRlDXEXhA=="],

    "@firebase/remote-config-types": ["@firebase/remote-config-types@0.5.2", "", {}, "sha512-i8k1omVfoAnaT1ZPv2FFjxMZrATYsO/GnFgHEj5+7fAJLzi8wLnGGv1WK06oEAD6ltrWXSO1HzeNyajn/NjMWw=="],

    "@firebase/storage": ["@firebase/storage@0.14.5", "", { "dependencies": { "@firebase/component": "0.7.5", "@firebase/util": "1.15.3", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app": "0.x" } }, "sha512-r2tozN/BlEewLi70tJNUQPzWwbex9GM7NgXZsamHKQrjKEfcR0i4jGgHBKAKA4hbwiPE9eNMb3hcxWnDpeJZwg=="],

    "@firebase/storage-compat": ["@firebase/storage-compat@0.4.5", "", { "dependencies": { "@firebase/component": "0.7.5", "@firebase/storage": "0.14.5", "@firebase/storage-types": "0.8.5", "@firebase/util": "1.15.3", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app": "0.x", "@firebase/app-compat": "0.x" } }, "sha512-vO0tFPxXbKDKdlTu8tYT08S9t9ezUTJYEdLCULpWxWq2aq6zojwN1QmAB+1a50AI/g47GlWUJn1XPncm/PDZsw=="],

    "@firebase/storage-types": ["@firebase/storage-types@0.8.5", "", { "peerDependencies": { "@firebase/app-types": "0.x", "@firebase/util": "1.x" } }, "sha512-GEDs5P+rNUfNcS+wxIdOLAHficife2YXtvTJnyi3ssrX11AAtBg+nDUdbYh8vuBzWehVQZPmztGUUnud4L+4yg=="],

    "@firebase/util": ["@firebase/util@1.15.3", "", { "dependencies": { "tslib": "^2.1.0" } }, "sha512-c/z/gaIlaaLZEuGbE6sLUuJ61tskg1JghvhcNQzW948ASBinbVBBRnZTC4b4yt4LaEtJQkYlyzqLHcutFwEIvA=="],

    "@firebase/webchannel-wrapper": ["@firebase/webchannel-wrapper@1.0.7", "", {}, "sha512-phBFwieDLvkZGYN9CE9ZFNEIoBVksprzsnCzQejCmCHtgwCXReeuRpoEGN9C4EbhONztv8NRV1tau6Rb9pONwQ=="],

    "@google/genai": ["@google/genai@2.21.0", "", { "dependencies": { "google-auth-library": "^10.3.0", "p-retry": "^4.6.2", "protobufjs": "^7.5.4", "ws": "^8.18.0" }, "peerDependencies": { "@modelcontextprotocol/sdk": "^1.25.2" }, "optionalPeers": ["@modelcontextprotocol/sdk"] }, "sha512-+PDtco2/Z0ONdzCGekCoCT+O1VJS9xJQNN4XzQpXG/t3El/SWWMkCWlFRO1KmivOHPa4Q0VjUYu1HBKCZ/v33Q=="],

    "@grpc/grpc-js": ["@grpc/grpc-js@1.9.16", "", { "dependencies": { "@grpc/proto-loader": "^0.7.8", "@types/node": ">=12.12.47" } }, "sha512-wE4Ut/olIzfKqp631XrG+wbF0v1vWFN4YL9FyXC2LJiG33DsV7PLzURjrCvY/6je2ntdRkeLpPDluzSRGaVltQ=="],

    "@grpc/proto-loader": ["@grpc/proto-loader@0.7.15", "", { "dependencies": { "lodash.camelcase": "^4.3.0", "long": "^5.0.0", "protobufjs": "^7.2.5", "yargs": "^17.7.2" }, "bin": { "proto-loader-gen-types": "build/bin/proto-loader-gen-types.js" } }, "sha512-tMXdRCfYVixjuFK+Hk0Q1s38gV9zDiDJfWL3h1rv4Qc39oILCu1TRTDt7+fGUI8K4G1Fj125Hx/ru3azECWTyQ=="],

    "@jridgewell/gen-mapping": ["@jridgewell/gen-mapping@0.3.13", "", { "dependencies": { "@jridgewell/sourcemap-codec": "^1.5.0", "@jridgewell/trace-mapping": "^0.3.24" } }, "sha512-2kkt/7niJ6MgEPxF0bYdQ6etZaA+fQvDcLKckhy1yIQOzaoKjBBjSj63/aLVjYE3qhRt5dvM+uUyfCg6UKCBbA=="],

    "@jridgewell/remapping": ["@jridgewell/remapping@2.3.5", "", { "dependencies": { "@jridgewell/gen-mapping": "^0.3.5", "@jridgewell/trace-mapping": "^0.3.24" } }, "sha512-LI9u/+laYG4Ds1TDKSJW2YPrIlcVYOwi2fUC6xB43lueCjgxV4lffOCZCtYFiH6TNOX+tQKXx97T4IKHbhyHEQ=="],

    "@jridgewell/resolve-uri": ["@jridgewell/resolve-uri@3.1.2", "", {}, "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw=="],

    "@jridgewell/sourcemap-codec": ["@jridgewell/sourcemap-codec@1.6.0", "", {}, "sha512-T7jf+5zgsZHwNJ4lvQ7/aezbyk0nNX+zJVWpmHA7VYsEx7a7qr5Rg5IbtJFqkgze5Y2sruq1RUY8Q837Od7iFw=="],

    "@jridgewell/trace-mapping": ["@jridgewell/trace-mapping@0.3.31", "", { "dependencies": { "@jridgewell/resolve-uri": "^3.1.0", "@jridgewell/sourcemap-codec": "^1.4.14" } }, "sha512-zzNR+SdQSDJzc8joaeP8QQoCQr8NuYx2dIIytl1QeBEZHJ9uW6hebsrYgbz8hJwUQao3TWCMtmfV8Nu1twOLAw=="],

    "@napi-rs/lzma-linux-x64-gnu": ["@napi-rs/lzma-linux-x64-gnu@1.5.1", "", { "os": "linux", "cpu": "x64" }, "sha512-oTXEIha4SsuXdTA4Iyskj0kpdx2yVXdhd75c2v3xGrHFfVMsbhTPZU/nMPL4sWKo4pBHm3aucLaqGlF696dTyQ=="],

    "@protobufjs/aspromise": ["@protobufjs/aspromise@1.1.2", "", {}, "sha512-j+gKExEuLmKwvz3OgROXtrJ2UG2x8Ch2YZUxahh+s1F2HZ+wAceUNLkvy6zKCPVRkU++ZWQrdxsUeQXmcg4uoQ=="],

    "@protobufjs/base64": ["@protobufjs/base64@1.1.2", "", {}, "sha512-AZkcAA5vnN/v4PDqKyMR5lx7hZttPDgClv83E//FMNhR2TMcLUhfRUBHCmSl0oi9zMgDDqRUJkSxO3wm85+XLg=="],

    "@protobufjs/codegen": ["@protobufjs/codegen@2.0.5", "", {}, "sha512-zgXFLzW3Ap33e6d0Wlj4MGIm6Ce8O89n/apUaGNB/jx+hw+ruWEp7EwGUshdLKVRCxZW12fp9r40E1mQrf/34g=="],

    "@protobufjs/eventemitter": ["@protobufjs/eventemitter@1.1.1", "", {}, "sha512-vW1GmwMZNnL+gMRaovlh9yZX74kc+TTU3FObkkurpMaRtBfLP3ldjS9KQWlwZgraRE0+dheEEoAxdzcJQ8eXZg=="],

    "@protobufjs/fetch": ["@protobufjs/fetch@1.1.1", "", { "dependencies": { "@protobufjs/aspromise": "^1.1.1" } }, "sha512-GpptLrs57adMSuHi3VNj0mAF8dwh36LMaYF6XyJ6JMWlVsc+t42tm1HSEDmOs3A8fC9yyeisgLhsTVQokOZ0zw=="],

    "@protobufjs/float": ["@protobufjs/float@1.0.2", "", {}, "sha512-Ddb+kVXlXst9d+R9PfTIxh1EdNkgoRe5tOX6t01f1lYWOvJnSPDBlG241QLzcyPdoNTsblLUdujGSE4RzrTZGQ=="],

    "@protobufjs/path": ["@protobufjs/path@1.1.2", "", {}, "sha512-6JOcJ5Tm08dOHAbdR3GrvP+yUUfkjG5ePsHYczMFLq3ZmMkAD98cDgcT2iA1lJ9NVwFd4tH/iSSoe44YWkltEA=="],

    "@protobufjs/pool": ["@protobufjs/pool@1.1.0", "", {}, "sha512-0kELaGSIDBKvcgS4zkjz1PeddatrjYcmMWOlAuAPwAeccUrPHdUqo/J6LiymHHEiJT5NrF1UVwxY14f+fy4WQw=="],

    "@protobufjs/utf8": ["@protobufjs/utf8@1.1.2", "", {}, "sha512-b1UQwcEZ4yCnMCD8DAL1VlbvBJE9/IX4FTIp7BG1xYpf29SLazLSrqUkj4w7Y5y7cCVP6E5tcqqcI0xemPkHug=="],

    "@rolldown/pluginutils": ["@rolldown/pluginutils@1.0.0-rc.3", "", {}, "sha512-eybk3TjzzzV97Dlj5c+XrBFW57eTNhzod66y9HrBlzJ6NsCrWCp/2kaPS3K9wJmurBC0Tdw4yPjXKZqlznim3Q=="],

    "@rollup/rollup-android-arm-eabi": ["@rollup/rollup-android-arm-eabi@4.63.1", "", { "os": "android", "cpu": "arm" }, "sha512-UZ8sUxPTiHWYX9QNdJedb1kDZSpS1t/VPWBWGSgqHNi9w3Cu6IXvu2mzbhiTiPvtrqgTQJ+zqiAq2iPIPilpaQ=="],

    "@rollup/rollup-android-arm64": ["@rollup/rollup-android-arm64@4.63.1", "", { "os": "android", "cpu": "arm64" }, "sha512-cQ4nFQABN5cDvDpbvJ7bMStCpnaVxynZrRMfUJYgxcIk9Sh54FIO1vtfkg0B69REjER77ioZ/ov+eAApx/KmLQ=="],

    "@rollup/rollup-darwin-arm64": ["@rollup/rollup-darwin-arm64@4.63.1", "", { "os": "darwin", "cpu": "arm64" }, "sha512-FQNqd1lRy/0QhDk3xeRIkSBiCpXCiDnZO3YLVdcDKN1UBiKToNftCzcXYNLshmPDUMlu2TdeS8tGcsU6f3YF1Q=="],

    "@rollup/rollup-darwin-x64": ["@rollup/rollup-darwin-x64@4.63.1", "", { "os": "darwin", "cpu": "x64" }, "sha512-pvD16V939D3CloK0+qikpGaxiPrDUXTe7Y5cWOMkMSy7m1cawa8EGy/kXYi/G/cKAC4HDAbSnzCIk1WmsoOKXg=="],

    "@rollup/rollup-freebsd-arm64": ["@rollup/rollup-freebsd-arm64@4.63.1", "", { "os": "freebsd", "cpu": "arm64" }, "sha512-pcFGeL2345VwdTnJhA6zLbew+YgWB0qBG2+dMtXjCicf6+rm6kO6cOoh5VnTe0ZMrMRgRyuHmCJxZWrIdzYuOw=="],

    "@rollup/rollup-freebsd-x64": ["@rollup/rollup-freebsd-x64@4.63.1", "", { "os": "freebsd", "cpu": "x64" }, "sha512-mRJlqSRulVzcKq/LKA6ICSIc3K/l4fzlVn/gePn2nXIHy8seRi5z/eeRE0d/XMBxcMldiXtQTSpRj0tkkC3g8Q=="],

    "@rollup/rollup-linux-arm-gnueabihf": ["@rollup/rollup-linux-arm-gnueabihf@4.63.1", "", { "os": "linux", "cpu": "arm" }, "sha512-YDUNvVM85TI3g/1OpnqKP1h4NeW/j64DfWMf+G3M809xNk1bJSnpFp4sh83NpmVE5DXnkh8ULor4LTVZKoYLHw=="],

    "@rollup/rollup-linux-arm-musleabihf": ["@rollup/rollup-linux-arm-musleabihf@4.63.1", "", { "os": "linux", "cpu": "arm" }, "sha512-7Mcn71p9ZuQFAj+h+dhQXy/yeLePRS2yKRnmW1DijA9thKO5qap0GNOIQK4yQ6iP3SU0Mrb/yWo8h8vgRba8lw=="],

    "@rollup/rollup-linux-arm64-gnu": ["@rollup/rollup-linux-arm64-gnu@4.63.1", "", { "os": "linux", "cpu": "arm64" }, "sha512-4YiLQTX6U4CSl0L9cluep9A9W6UmTfqBDc2/CH6wlu54pl4E7Jn3cOD8oxzvBDEGk/JMKgJ47C8g+radF7mwvg=="],

    "@rollup/rollup-linux-arm64-musl": ["@rollup/rollup-linux-arm64-musl@4.63.1", "", { "os": "linux", "cpu": "arm64" }, "sha512-2ra8F7w8OquwZN9z2/fKFnli69wa8PLwaVzRMIPGb13ByMJwC28Fbp8YcVGoUhlYMTt7j5j9bNgpysrN2UM+vw=="],

    "@rollup/rollup-linux-loong64-gnu": ["@rollup/rollup-linux-loong64-gnu@4.63.1", "", { "os": "linux", "cpu": "none" }, "sha512-Sy20ncyhjmBP0Ml+UvQbimjlk6VFgjW5uNP+qqwHB00mTE8Bl2C1TuHTlRwK2YoXeZbee5lP2XevBWVkAQAtSQ=="],

    "@rollup/rollup-linux-loong64-musl": ["@rollup/rollup-linux-loong64-musl@4.63.1", "", { "os": "linux", "cpu": "none" }, "sha512-noITLp8oNjYliPnGWmLyelIHwULGqbHloQHGw1rtxbWhTuWooRpnZarZQJ1y9EUC4szuCusCc+HEpUtxpIwYvA=="],

    "@rollup/rollup-linux-ppc64-gnu": ["@rollup/rollup-linux-ppc64-gnu@4.63.1", "", { "os": "linux", "cpu": "ppc64" }, "sha512-hlxxXd+F1mWiAcaFR7Sv9ZQT6m6UfI8+Vy/kFJzztq2pDMU/0wZ9sish0iszNZvsQDo8Gc0i5yuFEOz5dDf6fA=="],

    "@rollup/rollup-linux-ppc64-musl": ["@rollup/rollup-linux-ppc64-musl@4.63.1", "", { "os": "linux", "cpu": "ppc64" }, "sha512-EF7OpqQTQ/BvGqLzUi4rEHuagCV9MugAUXSHemwPW5vxZ75RR+jxO/2j95Ph2dalMpFHSVECjRoioHZgA9zOYA=="],

    "@rollup/rollup-linux-riscv64-gnu": ["@rollup/rollup-linux-riscv64-gnu@4.63.1", "", { "os": "linux", "cpu": "none" }, "sha512-wQO3JesW9PRkwlabQ27y7sPfVOOTLRG73I4F2UYHG5PXun3J9U3y+b7ezVKSYbsvSKGQ1k1cq8Qlun4C9kLt3w=="],

    "@rollup/rollup-linux-riscv64-musl": ["@rollup/rollup-linux-riscv64-musl@4.63.1", "", { "os": "linux", "cpu": "none" }, "sha512-ouAGwhO6wHRXdnOVCOsB0tRFkA7nhNB2Nwax6oECXN0YiN8EYUTBAOudADOB1PI+yDL61TeNx/u7MVCzksNbkQ=="],

    "@rollup/rollup-linux-s390x-gnu": ["@rollup/rollup-linux-s390x-gnu@4.63.1", "", { "os": "linux", "cpu": "s390x" }, "sha512-q2R38Sn+1J8RxhfJ+T54wSWmyKXWec+9jgDfqO2AtArEqHO5R2aeayp5H5OYLr5UYDVGsVaZPEFUooMhYCdz5A=="],

    "@rollup/rollup-linux-x64-gnu": ["@rollup/rollup-linux-x64-gnu@4.63.1", "", { "os": "linux", "cpu": "x64" }, "sha512-gfI5T24WLLuFfSKw7Go/zDXjAAV0fny0swTaDv+WjK7vqcw4cRhFfdsyKL1n+ukI+ooBxn3bVQnyrn06WpI50w=="],

    "@rollup/rollup-linux-x64-musl": ["@rollup/rollup-linux-x64-musl@4.63.1", "", { "os": "linux", "cpu": "x64" }, "sha512-4h6XqthmB4Hspji84wvgk+ElodTsGj+dbZqHJHHtKxj4mYq0ANSEEPX9ys3moJueqsRjwpaJYH7874Itwnj2ow=="],

    "@rollup/rollup-openbsd-x64": ["@rollup/rollup-openbsd-x64@4.63.1", "", { "os": "openbsd", "cpu": "x64" }, "sha512-dlfCOa87o1VAYegLQ9EKilx2JCeRofiyPGhTCmqnuXZ6bMPiycO1rq1+sKoulAp7pGLIsTIw+1x5R+zgh5LhhA=="],

    "@rollup/rollup-openharmony-arm64": ["@rollup/rollup-openharmony-arm64@4.63.1", "", { "os": "none", "cpu": "arm64" }, "sha512-cjkLbOlfcm3QGhMM1J5zaZjsw1GggbN6rw9UTSSRrPrR1KkcXnN7Uq9rPw34xImQ9VOY9GN+6u2Zj80B9ptkcw=="],

    "@rollup/rollup-win32-arm64-msvc": ["@rollup/rollup-win32-arm64-msvc@4.63.1", "", { "os": "win32", "cpu": "arm64" }, "sha512-Li1KdUnWGE4N3e1F/B4RTB1ms+nG4WBgjByO46pkeBVX/2UBsY53xf5vK9WygVmnH3RwncIST7lkSdLSY6P9lg=="],

    "@rollup/rollup-win32-ia32-msvc": ["@rollup/rollup-win32-ia32-msvc@4.63.1", "", { "os": "win32", "cpu": "ia32" }, "sha512-t4ZYOSoLTgwhuFMrmTMLx/+i1DQVK7HYqMc6kY46EApwi8X0nIVphzdNoThU3xt6n+N5urG1/gxBdCaKDLavfg=="],

    "@rollup/rollup-win32-x64-gnu": ["@rollup/rollup-win32-x64-gnu@4.63.1", "", { "os": "win32", "cpu": "x64" }, "sha512-RgroPfMmKlD1RzSDxvwgcPiy2HNQKoYV7OmwIXDsk73uKW5t6B/V8KIy27SMv/FNXFo/oSBtWc9J0X7t91ezZg=="],

    "@rollup/rollup-win32-x64-msvc": ["@rollup/rollup-win32-x64-msvc@4.63.1", "", { "os": "win32", "cpu": "x64" }, "sha512-at8QVep6S3h5Y6gSbdGU06bRY5WJkf6WUduM9YtvYMbYhB1MOFfUgc6kehitQXzOtMSaT70q7f9ydPhpqu821w=="],

    "@tailwindcss/node": ["@tailwindcss/node@4.3.3", "", { "dependencies": { "@jridgewell/remapping": "^2.3.5", "enhanced-resolve": "^5.24.1", "jiti": "^2.7.0", "lightningcss": "1.32.0", "magic-string": "^0.30.21", "source-map-js": "^1.2.1", "tailwindcss": "4.3.3" } }, "sha512-/T8IKEsf9VTU6tLjgC7+sv2mOPtQxzE2jMw7u4Tt40Tx+QSZxpzh95/H6cMKoja9XuW7iMdLJYBB0o9G1CaAgg=="],

    "@tailwindcss/oxide": ["@tailwindcss/oxide@4.3.3", "", { "optionalDependencies": { "@tailwindcss/oxide-android-arm64": "4.3.3", "@tailwindcss/oxide-darwin-arm64": "4.3.3", "@tailwindcss/oxide-darwin-x64": "4.3.3", "@tailwindcss/oxide-freebsd-x64": "4.3.3", "@tailwindcss/oxide-linux-arm-gnueabihf": "4.3.3", "@tailwindcss/oxide-linux-arm64-gnu": "4.3.3", "@tailwindcss/oxide-linux-arm64-musl": "4.3.3", "@tailwindcss/oxide-linux-x64-gnu": "4.3.3", "@tailwindcss/oxide-linux-x64-musl": "4.3.3", "@tailwindcss/oxide-wasm32-wasi": "4.3.3", "@tailwindcss/oxide-win32-arm64-msvc": "4.3.3", "@tailwindcss/oxide-win32-x64-msvc": "4.3.3" } }, "sha512-krXjAikiaFSPaK/FkAQT5UTx3VormQaiZ5hBFlJZ9UFQGB/rwg1MZIhHAG9smMQRTdyJxP6Qt5MwMtdyU5FWrA=="],

    "@tailwindcss/oxide-android-arm64": ["@tailwindcss/oxide-android-arm64@4.3.3", "", { "os": "android", "cpu": "arm64" }, "sha512-Y85A2gmPSkl5Ve5qR86GL4HT509cFqQh1aes9p3sSkyTPwt0Pppf3GkwGe4JPACcRYjgJIEhQgM6dBClnr0NYw=="],

    "@tailwindcss/oxide-darwin-arm64": ["@tailwindcss/oxide-darwin-arm64@4.3.3", "", { "os": "darwin", "cpu": "arm64" }, "sha512-BiaWatpBcERQFDlOjRDpIVXuFK5PJez5SA4JMg6VYZdBYU+qKfV/vqjcIs+IYmtitf1xYQZTwXvU/8y4lfZUGw=="],

    "@tailwindcss/oxide-darwin-x64": ["@tailwindcss/oxide-darwin-x64@4.3.3", "", { "os": "darwin", "cpu": "x64" }, "sha512-fAeUqfV5ndhxRwai8cXGzdLvul9utWOmeTkv69unv4ZXixjn61Z+p9lCWdwOwA3TYboG3BwdVuN/RDjhBRl0mw=="],

    "@tailwindcss/oxide-freebsd-x64": ["@tailwindcss/oxide-freebsd-x64@4.3.3", "", { "os": "freebsd", "cpu": "x64" }, "sha512-iyf5bV6+wnAlflVeEy7R25dupxTNECZN5QMI0qNT6eT+EgaGdZcKhGkr5SdoaWiLJ3spLqIY9VCeSGrwmtg4kw=="],

    "@tailwindcss/oxide-linux-arm-gnueabihf": ["@tailwindcss/oxide-linux-arm-gnueabihf@4.3.3", "", { "os": "linux", "cpu": "arm" }, "sha512-aAYUprJAJQWWbRrPvtjdroZ56Md+JM8pMiopS6xGEwDfLhqj+2ver2p4nU4Mb3CRqcMmNBjo8KkUgcxhkzVQGQ=="],

    "@tailwindcss/oxide-linux-arm64-gnu": ["@tailwindcss/oxide-linux-arm64-gnu@4.3.3", "", { "os": "linux", "cpu": "arm64" }, "sha512-nDxldcEENOxZRzC2uu9jrutZdAAQtb+8WWDCSnWL1zvBk1+FN+x6MtDViPB5AJMfttVCUhehGWus3XBPgatM/w=="],

    "@tailwindcss/oxide-linux-arm64-musl": ["@tailwindcss/oxide-linux-arm64-musl@4.3.3", "", { "os": "linux", "cpu": "arm64" }, "sha512-Md44bD6veX/PC5iyF8cDVnw4HBIANZepRZZ7a8DQOvkfo5WUBwcp6iAuCUz23u+4SUkhJlD3eL7hNdW8ezd/kA=="],

    "@tailwindcss/oxide-linux-x64-gnu": ["@tailwindcss/oxide-linux-x64-gnu@4.3.3", "", { "os": "linux", "cpu": "x64" }, "sha512-tx7us1muwOKAKWao2v/GaafFeQboE6aj88vC6ziN2NCGcRm8gWUhwjzg+YdVB1e4boAtdtma4L43onunI6NS4w=="],

    "@tailwindcss/oxide-linux-x64-musl": ["@tailwindcss/oxide-linux-x64-musl@4.3.3", "", { "os": "linux", "cpu": "x64" }, "sha512-SJxX60smvHgasZoBy11dX6YRjXJFovwWBoedhbQPOBzgFWBHGB+TVPWB9BxzR7TTxU8FQZAI2AyiNCMzFm8Img=="],

    "@tailwindcss/oxide-wasm32-wasi": ["@tailwindcss/oxide-wasm32-wasi@4.3.3", "", { "dependencies": { "@emnapi/core": "^1.11.1", "@emnapi/runtime": "^1.11.1", "@emnapi/wasi-threads": "^1.2.2", "@napi-rs/wasm-runtime": "^1.1.4", "@tybys/wasm-util": "^0.10.2", "tslib": "^2.8.1" }, "cpu": "none" }, "sha512-jx1+rPhY/5Ympkktd656HBWEBLxP7dH06losBLjjf5vgCODXvi9KhtftWcMIwTFIDqBr7cRnQkdLnAG+IOlGvQ=="],

    "@tailwindcss/oxide-win32-arm64-msvc": ["@tailwindcss/oxide-win32-arm64-msvc@4.3.3", "", { "os": "win32", "cpu": "arm64" }, "sha512-3rc292Ca2ceK6Ulcc/bAVnTs/3nDtoPhyEKlgPv+yQJQi/JS/AMJlqzxvlDacL1nekbrcf6bTqp/jV4qgnPxNQ=="],

    "@tailwindcss/oxide-win32-x64-msvc": ["@tailwindcss/oxide-win32-x64-msvc@4.3.3", "", { "os": "win32", "cpu": "x64" }, "sha512-yJ0pwIVc/nYeGoV02WtsN8KYyLQv7kyI2wDnkezyJlGGjkd4QLwDGAwl47YpPJeuI0M0ObaXGSPjvWDPeTPggw=="],

    "@tailwindcss/vite": ["@tailwindcss/vite@4.3.3", "", { "dependencies": { "@tailwindcss/node": "4.3.3", "@tailwindcss/oxide": "4.3.3", "tailwindcss": "4.3.3" }, "peerDependencies": { "vite": "^5.2.0 || ^6 || ^7 || ^8" } }, "sha512-yYU8cogLeSh/ms2jh8Fj7jaba/EWa7Ja6GoUqYZaraEuCI5YS6ms6ObZgjjedm+jm6XZjdNRWBpPP6Z86oOxcw=="],

    "@types/babel__core": ["@types/babel__core@7.20.5", "", { "dependencies": { "@babel/parser": "^7.20.7", "@babel/types": "^7.20.7", "@types/babel__generator": "*", "@types/babel__template": "*", "@types/babel__traverse": "*" } }, "sha512-qoQprZvz5wQFJwMDqeseRXWv3rqMvhgpbXFfVyWhbx9X47POIA6i/+dXefEmZKoAgOaTdaIgNSMqMIU61yRyzA=="],

    "@types/babel__generator": ["@types/babel__generator@7.27.0", "", { "dependencies": { "@babel/types": "^7.0.0" } }, "sha512-ufFd2Xi92OAVPYsy+P4n7/U7e68fex0+Ee8gSG9KX7eo084CWiQ4sdxktvdl0bOPupXtVJPY19zk6EwWqUQ8lg=="],

    "@types/babel__template": ["@types/babel__template@7.4.4", "", { "dependencies": { "@babel/parser": "^7.1.0", "@babel/types": "^7.0.0" } }, "sha512-h/NUaSyG5EyxBIp8YRxo4RMe2/qQgvyowRwVMzhYhBCONbW8PUsg4lkFMrhgZhUe5z3L3MiLDuvyJ/CaPa2A8A=="],

    "@types/babel__traverse": ["@types/babel__traverse@7.28.0", "", { "dependencies": { "@babel/types": "^7.28.2" } }, "sha512-8PvcXf70gTDZBgt9ptxJ8elBeBjcLOAcOtoO/mPJjtji1+CdGbHgm77om1GrsPxsiE+uXIpNSK64UYaIwQXd4Q=="],

    "@types/body-parser": ["@types/body-parser@1.19.6", "", { "dependencies": { "@types/connect": "*", "@types/node": "*" } }, "sha512-HLFeCYgz89uk22N5Qg3dvGvsv46B8GLvKKo1zKG4NybA8U2DiEO3w9lqGg29t/tfLRJpJ6iQxnVw4OnB7MoM9g=="],

    "@types/connect": ["@types/connect@3.4.38", "", { "dependencies": { "@types/node": "*" } }, "sha512-K6uROf1LD88uDQqJCktA4yzL1YYAK6NgfsI0v/mTgyPKWsX1CnJ0XPSDhViejru1GcRkLWb8RlzFYJRqGUbaug=="],

    "@types/estree": ["@types/estree@1.0.9", "", {}, "sha512-GhdPgy1el4/ImP05X05Uw4cw2/M93BCUmnEvWZNStlCzEKME4Fkk+YpoA5OiHNQmoS7Cafb8Xa3Pya8m1Qrzeg=="],

    "@types/express": ["@types/express@4.17.25", "", { "dependencies": { "@types/body-parser": "*", "@types/express-serve-static-core": "^4.17.33", "@types/qs": "*", "@types/serve-static": "^1" } }, "sha512-dVd04UKsfpINUnK0yBoYHDF3xu7xVH4BuDotC/xGuycx4CgbP48X/KF/586bcObxT0HENHXEU8Nqtu6NR+eKhw=="],

    "@types/express-serve-static-core": ["@types/express-serve-static-core@4.19.9", "", { "dependencies": { "@types/node": "*", "@types/qs": "*", "@types/range-parser": "*", "@types/send": "*" } }, "sha512-QP2ESEe/ImWY0HDwNAnK9PvEffUyhLTnWkk7KXzHfyeWAnlrDe1fN77bXl6ia8KT3wPlmA7t9/VPRpnf4Ex9sg=="],

    "@types/http-errors": ["@types/http-errors@2.0.5", "", {}, "sha512-r8Tayk8HJnX0FztbZN7oVqGccWgw98T/0neJphO91KkmOzug1KkofZURD4UaD5uH8AqcFLfdPErnBod0u71/qg=="],

    "@types/mime": ["@types/mime@1.3.5", "", {}, "sha512-/pyBZWSLD2n0dcHE3hq8s8ZvcETHtEuF+3E7XVt0Ig2nvsVQXdghHVcEkIWjy9A0wKfTn97a/PSDYohKIlnP/w=="],

    "@types/node": ["@types/node@22.20.1", "", { "dependencies": { "undici-types": "~6.21.0" } }, "sha512-EANqOCF9QFyra+4pfxUcX9STKJpCLjMbObVzljIJomAWSnuSIEAvyzEU53GaajbXJEgdh0iEcPL+DGvpUd4k1Q=="],

    "@types/qs": ["@types/qs@6.15.1", "", {}, "sha512-GZHUBZR9hckSUhrxmp1nG6NwdpM9fCunJwyThLW1X3AyHgd9IlHb6VANpQQqDr2o/qQp6McZ3y/IA2rVzKzSbw=="],

    "@types/range-parser": ["@types/range-parser@1.2.7", "", {}, "sha512-hKormJbkJqzQGhziax5PItDUTMAM9uE2XXQmM37dyd4hVM+5aVl7oVxMVUiVQn2oCQFN/LKCZdvSM0pFRqbSmQ=="],

    "@types/react": ["@types/react@19.2.18", "", { "dependencies": { "csstype": "^3.2.2" } }, "sha512-AnzbBERsrLKtk2XSfTbYRLjQPdy116Sty4q+T+Bp3IC4l6jNBvreVPAHmpq9qhXQM7CXZPjLVmGMw9sy+hxQ3w=="],

    "@types/retry": ["@types/retry@0.12.0", "", {}, "sha512-wWKOClTTiizcZhXnPY4wikVAwmdYHp8q6DmC+EJUzAMsycb7HB32Kh9RN4+0gExjmPmZSAQjgURXIGATPegAvA=="],

    "@types/send": ["@types/send@1.2.1", "", { "dependencies": { "@types/node": "*" } }, "sha512-arsCikDvlU99zl1g69TcAB3mzZPpxgw0UQnaHeC1Nwb015xp8bknZv5rIfri9xTOcMuaVgvabfIRA7PSZVuZIQ=="],

    "@types/serve-static": ["@types/serve-static@1.15.10", "", { "dependencies": { "@types/http-errors": "*", "@types/node": "*", "@types/send": "<1" } }, "sha512-tRs1dB+g8Itk72rlSI2ZrW6vZg0YrLI81iQSTkMmOqnqCaNr/8Ek4VwWcN5vZgCYWbg/JJSGBlUaYGAOP73qBw=="],

    "@vitejs/plugin-react": ["@vitejs/plugin-react@5.2.0", "", { "dependencies": { "@babel/core": "^7.29.0", "@babel/plugin-transform-react-jsx-self": "^7.27.1", "@babel/plugin-transform-react-jsx-source": "^7.27.1", "@rolldown/pluginutils": "1.0.0-rc.3", "@types/babel__core": "^7.20.5", "react-refresh": "^0.18.0" }, "peerDependencies": { "vite": "^4.2.0 || ^5.0.0 || ^6.0.0 || ^7.0.0 || ^8.0.0" } }, "sha512-YmKkfhOAi3wsB1PhJq5Scj3GXMn3WvtQ/JC0xoopuHoXSdmtdStOpFrYaT1kie2YgFBcIe64ROzMYRjCrYOdYw=="],

    "accepts": ["accepts@1.3.8", "", { "dependencies": { "mime-types": "~2.1.34", "negotiator": "0.6.3" } }, "sha512-PYAthTa2m2VKxuvSD3DPC/Gy+U+sOA1LAuT8mkmRuvw+NACSaeXEQ+NHcVF7rONl6qcaxV3Uuemwawk+7+SJLw=="],

    "agent-base": ["agent-base@7.1.4", "", {}, "sha512-MnA+YT8fwfJPgBx3m60MNqakm30XOkyIoH1y6huTQvC0PwZG7ki8NacLBcrPbNoo8vEZy7Jpuk7+jMO+CUovTQ=="],

    "ansi-regex": ["ansi-regex@5.0.1", "", {}, "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ=="],

    "ansi-styles": ["ansi-styles@4.3.0", "", { "dependencies": { "color-convert": "^2.0.1" } }, "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg=="],

    "array-flatten": ["array-flatten@1.1.1", "", {}, "sha512-PCVAQswWemu6UdxsDFFX/+gVeYqKAod3D3UVm91jHwynguOwAvYPhx8nNlM++NqRcK6CxxpUafjmhIdKiHibqg=="],

    "autoprefixer": ["autoprefixer@10.5.5", "", { "dependencies": { "browserslist": "^4.28.9", "caniuse-lite": "^1.0.30001810", "fraction.js": "^5.3.4", "picocolors": "^1.1.1", "postcss-value-parser": "^4.2.0" }, "peerDependencies": { "postcss": "^8.1.0" }, "bin": { "autoprefixer": "bin/autoprefixer" } }, "sha512-uiRYvQYe/nNSzBJ7OUnd2/TZVsAdob3blml44teEpee9Cc1f4rGZFewO+JT3Wo8mgFOSzNqes4FHZn/Qz8WOuw=="],

    "base64-js": ["base64-js@1.5.1", "", {}, "sha512-AKpaYlHn8t4SVbOHCy+b5+KKgvR4vrsD8vbvrbiQJps7fKDTkjkDry6ji0rUJjC0kzbNePLwzxq8iypo41qeWA=="],

    "baseline-browser-mapping": ["baseline-browser-mapping@2.11.21", "", { "bin": { "baseline-browser-mapping": "dist/cli.cjs" } }, "sha512-uh8vpY/1/YyFkunIDFH/12p7/7VdPKA1hejMVEbdkEaWnUz0Hesvx5EbiU6XxjyHZIOju+ZMbQJkRh+es3/spQ=="],

    "bignumber.js": ["bignumber.js@9.3.1", "", {}, "sha512-Ko0uX15oIUS7wJ3Rb30Fs6SkVbLmPBAKdlm7q9+ak9bbIeFf0MwuBsQV6z7+X768/cHsfg+WlysDWJcmthjsjQ=="],

    "body-parser": ["body-parser@1.20.6", "", { "dependencies": { "bytes": "~3.1.2", "content-type": "~1.0.5", "debug": "2.6.9", "depd": "2.0.0", "destroy": "~1.2.0", "http-errors": "~2.0.1", "iconv-lite": "~0.4.24", "on-finished": "~2.4.1", "qs": "~6.15.1", "raw-body": "~2.5.3", "type-is": "~1.6.18", "unpipe": "~1.0.0" } }, "sha512-p5tAzS57i5MV9fZFDj9LeIiTZEufbSe2eDozP+ElheSUq1m74CRq1jI4mYNDdVs9vQztXFLuk/Gd6BWTdwRJ5g=="],

    "browserslist": ["browserslist@4.28.9", "", { "dependencies": { "baseline-browser-mapping": "^2.11.20", "caniuse-lite": "^1.0.30001810", "electron-to-chromium": "^1.5.420", "node-releases": "^2.0.54", "update-browserslist-db": "^1.3.2" }, "bin": { "browserslist": "cli.js" } }, "sha512-EWazOblFYUvlGZcfGhPUPmYh3nikUxBVb+y9MJun5f3hBi812X+8MSQTujLBtgK3cf51fJWbWfOjyeO954d+Eg=="],

    "buffer-equal-constant-time": ["buffer-equal-constant-time@1.0.1", "", {}, "sha512-zRpUiDwd/xk6ADqPMATG8vc9VPrkck7T07OIx0gnjmJAnHnTVXNQG3vfvWNuiZIkwu9KrKdA1iJKfsfTVxE6NA=="],

    "bytes": ["bytes@3.1.2", "", {}, "sha512-/Nf7TyzTx6S3yRJObOAV7956r8cr2+Oj8AC5dt8wSP3BQAoeX58NoHyCU8P8zGkNXStjTSi6fzO6F0pBdcYbEg=="],

    "call-bind-apply-helpers": ["call-bind-apply-helpers@1.0.2", "", { "dependencies": { "es-errors": "^1.3.0", "function-bind": "^1.1.2" } }, "sha512-Sp1ablJ0ivDkSzjcaJdxEunN5/XvksFJ2sMBFfq6x0ryhQV/2b/KwFe21cMpmHtPOSij8K99/wSfoEuTObmuMQ=="],

    "call-bound": ["call-bound@1.0.4", "", { "dependencies": { "call-bind-apply-helpers": "^1.0.2", "get-intrinsic": "^1.3.0" } }, "sha512-+ys997U96po4Kx/ABpBCqhA9EuxJaQWDQg7295H4hBphv3IZg0boBKuwYpt4YXp6MZ5AmZQnU/tyMTlRpaSejg=="],

    "caniuse-lite": ["caniuse-lite@1.0.30001810", "", {}, "sha512-TITQPUkaz+aVk5GL6NhOdwk1aEaNTSDPsGFWrTuhKGtjTF70jL/Oht2W4c6rXUe5fu7Ie19VIahAXHIIiWWNeg=="],

    "cliui": ["cliui@8.0.1", "", { "dependencies": { "string-width": "^4.2.0", "strip-ansi": "^6.0.1", "wrap-ansi": "^7.0.0" } }, "sha512-BSeNnyus75C4//NQ9gQt1/csTXyo/8Sb+afLAkzAptFuMsod9HFokGNudZpi/oQV73hnVK+sR+5PVRMd+Dr7YQ=="],

    "color-convert": ["color-convert@2.0.1", "", { "dependencies": { "color-name": "~1.1.4" } }, "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ=="],

    "color-name": ["color-name@1.1.4", "", {}, "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA=="],

    "content-disposition": ["content-disposition@0.5.4", "", { "dependencies": { "safe-buffer": "5.2.1" } }, "sha512-FveZTNuGw04cxlAiWbzi6zTAL/lhehaWbTtgluJh4/E95DqMwTmha3KZN1aAWA8cFIhHzMZUvLevkw5Rqk+tSQ=="],

    "content-type": ["content-type@1.0.5", "", {}, "sha512-nTjqfcBFEipKdXCv4YDQWCfmcLZKm81ldF0pAopTvyrFGVbcR6P/VAAd5G7N+0tTr8QqiU0tFadD6FK4NtJwOA=="],

    "convert-source-map": ["convert-source-map@2.0.0", "", {}, "sha512-Kvp459HrV2FEJ1CAsi1Ku+MY3kasH19TFykTz2xWmMeq6bk2NU3XXvfJ+Q61m0xktWwt+1HSYf3JZsTms3aRJg=="],

    "cookie": ["cookie@0.7.2", "", {}, "sha512-yki5XnKuf750l50uGTllt6kKILY4nQ1eNIQatoXEByZ5dWgnKqbnqmTrBE5B4N7lrMJKQ2ytWMiTO2o0v6Ew/w=="],

    "cookie-signature": ["cookie-signature@1.0.7", "", {}, "sha512-NXdYc3dLr47pBkpUCHtKSwIOQXLVn8dZEuywboCOJY/osA0wFSLlSawr3KN8qXJEyX66FcONTH8EIlVuK0yyFA=="],

    "csstype": ["csstype@3.2.3", "", {}, "sha512-z1HGKcYy2xA8AGQfwrn0PAy+PB7X/GSj3UVJW9qKyn43xWa+gl5nXmU4qqLMRzWVLFC8KusUX8T/0kCiOYpAIQ=="],

    "data-uri-to-buffer": ["data-uri-to-buffer@4.0.1", "", {}, "sha512-0R9ikRb668HB7QDxT1vkpuUBtqc53YyAwMwGeUFKRojY/NWKvdZ+9UYtRfGmhqNbRkTSVpMbmyhXipFFv2cb/A=="],

    "debug": ["debug@2.6.9", "", { "dependencies": { "ms": "2.0.0" } }, "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA=="],

    "depd": ["depd@2.0.0", "", {}, "sha512-g7nH6P6dyDioJogAAGprGpCtVImJhpPk/roCzdb3fIh61/s/nPsfR6onyMwkCAR/OlC3yBC0lESvUoQEAssIrw=="],

    "destroy": ["destroy@1.2.0", "", {}, "sha512-2sJGJTaXIIaR1w4iJSNoN0hnMY7Gpc/n8D4qSCJw8QqFWXf7cuAgnEHxBpweaVcPevC2l3KpjYCx3NypQQgaJg=="],

    "detect-libc": ["detect-libc@2.1.2", "", {}, "sha512-Btj2BOOO83o3WyH59e8MgXsxEQVcarkUOpEYrubB0urwnN10yQ364rsiByU11nZlqWYZm05i/of7io4mzihBtQ=="],

    "dotenv": ["dotenv@17.4.2", "", {}, "sha512-nI4U3TottKAcAD9LLud4Cb7b2QztQMUEfHbvhTH09bqXTxnSie8WnjPALV/WMCrJZ6UV/qHJ6L03OqO3LcdYZw=="],

    "dunder-proto": ["dunder-proto@1.0.1", "", { "dependencies": { "call-bind-apply-helpers": "^1.0.1", "es-errors": "^1.3.0", "gopd": "^1.2.0" } }, "sha512-KIN/nDJBQRcXw0MLVhZE9iQHmG68qAVIBg9CqmUYjmQIhgij9U5MFvrqkUL5FbtyyzZuOeOt0zdeRe4UY7ct+A=="],

    "ecdsa-sig-formatter": ["ecdsa-sig-formatter@1.0.11", "", { "dependencies": { "safe-buffer": "^5.0.1" } }, "sha512-nagl3RYrbNv6kQkeJIpt6NJZy8twLB/2vtz6yN9Z4vRKHN4/QZJIEbqohALSgwKdnksuY3k5Addp5lg8sVoVcQ=="],

    "ee-first": ["ee-first@1.1.1", "", {}, "sha512-WMwm9LhRUo+WUaRN+vRuETqG89IgZphVSNkdFgeb6sS/E4OrDIN7t48CAewSHXc6C8lefD8KKfr5vY61brQlow=="],

    "electron-to-chromium": ["electron-to-chromium@1.5.422", "", {}, "sha512-UvA/32XqrLDdZSn7Jllo1AYNcWji/G0d5M0GTViE7KoGBiMunw3a34Sb2KO4ZZyrSEhqsxFoVhWWJshdyfKqJA=="],

    "emoji-regex": ["emoji-regex@8.0.0", "", {}, "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A=="],

    "encodeurl": ["encodeurl@2.0.0", "", {}, "sha512-Q0n9HRi4m6JuGIV1eFlmvJB7ZEVxu93IrMyiMsGC0lrMJMWzRgx6WGquyfQgZVb31vhGgXnfmPNNXmxnOkRBrg=="],

    "enhanced-resolve": ["enhanced-resolve@5.24.5", "", { "dependencies": { "graceful-fs": "^4.2.4", "tapable": "^2.3.3" } }, "sha512-L1l8TNvomm6UVW5B253AGxQagSQr+vGwhMlrrfRS2qmhx46AMpMVJKQYLvWYbysTMY8VoicOvzHzoHMbyzB+4A=="],

    "es-define-property": ["es-define-property@1.0.1", "", {}, "sha512-e3nRfgfUZ4rNGL232gUgX06QNyyez04KdjFrF+LTRoOXmrOgFKDg4BCdsjW8EnT69eqdYGmRpJwiPVYNrCaW3g=="],

    "es-errors": ["es-errors@1.3.0", "", {}, "sha512-Zf5H2Kxt2xjTvbJvP2ZWLEICxA6j+hAmMzIlypy4xcBg1vKVnx89Wy0GbS+kf5cwCVFFzdCFh2XSCFNULS6csw=="],

    "es-object-atoms": ["es-object-atoms@1.1.2", "", { "dependencies": { "es-errors": "^1.3.0" } }, "sha512-HWcBoN6NileqtSydK2FqHbS/LoDd2pqrnQHLyJzBj4kOp/ky2MWMN694xOfkK8/SnUsW2DH7EfyVlydKCsm1Zw=="],

    "esbuild": ["esbuild@0.25.12", "", { "optionalDependencies": { "@esbuild/aix-ppc64": "0.25.12", "@esbuild/android-arm": "0.25.12", "@esbuild/android-arm64": "0.25.12", "@esbuild/android-x64": "0.25.12", "@esbuild/darwin-arm64": "0.25.12", "@esbuild/darwin-x64": "0.25.12", "@esbuild/freebsd-arm64": "0.25.12", "@esbuild/freebsd-x64": "0.25.12", "@esbuild/linux-arm": "0.25.12", "@esbuild/linux-arm64": "0.25.12", "@esbuild/linux-ia32": "0.25.12", "@esbuild/linux-loong64": "0.25.12", "@esbuild/linux-mips64el": "0.25.12", "@esbuild/linux-ppc64": "0.25.12", "@esbuild/linux-riscv64": "0.25.12", "@esbuild/linux-s390x": "0.25.12", "@esbuild/linux-x64": "0.25.12", "@esbuild/netbsd-arm64": "0.25.12", "@esbuild/netbsd-x64": "0.25.12", "@esbuild/openbsd-arm64": "0.25.12", "@esbuild/openbsd-x64": "0.25.12", "@esbuild/openharmony-arm64": "0.25.12", "@esbuild/sunos-x64": "0.25.12", "@esbuild/win32-arm64": "0.25.12", "@esbuild/win32-ia32": "0.25.12", "@esbuild/win32-x64": "0.25.12" }, "bin": { "esbuild": "bin/esbuild" } }, "sha512-bbPBYYrtZbkt6Os6FiTLCTFxvq4tt3JKall1vRwshA3fdVztsLAatFaZobhkBC8/BrPetoa0oksYoKXoG4ryJg=="],

    "escalade": ["escalade@3.2.0", "", {}, "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA=="],

    "escape-html": ["escape-html@1.0.3", "", {}, "sha512-NiSupZ4OeuGwr68lGIeym/ksIZMJodUGOSCZ/FSnTxcrekbvqrgdUxlJOMpijaKZVjAJrWrGs/6Jy8OMuyj9ow=="],

    "etag": ["etag@1.8.1", "", {}, "sha512-aIL5Fx7mawVa300al2BnEE4iNvo1qETxLrPI/o05L7z6go7fCw1J6EQmbK4FmJ2AS7kgVF/KEZWufBfdClMcPg=="],

    "express": ["express@4.22.2", "", { "dependencies": { "accepts": "~1.3.8", "array-flatten": "1.1.1", "body-parser": "~1.20.5", "content-disposition": "~0.5.4", "content-type": "~1.0.4", "cookie": "~0.7.1", "cookie-signature": "~1.0.6", "debug": "2.6.9", "depd": "2.0.0", "encodeurl": "~2.0.0", "escape-html": "~1.0.3", "etag": "~1.8.1", "finalhandler": "~1.3.1", "fresh": "~0.5.2", "http-errors": "~2.0.0", "merge-descriptors": "1.0.3", "methods": "~1.1.2", "on-finished": "~2.4.1", "parseurl": "~1.3.3", "path-to-regexp": "~0.1.12", "proxy-addr": "~2.0.7", "qs": "~6.15.1", "range-parser": "~1.2.1", "safe-buffer": "5.2.1", "send": "~0.19.0", "serve-static": "~1.16.2", "setprototypeof": "1.2.0", "statuses": "~2.0.1", "type-is": "~1.6.18", "utils-merge": "1.0.1", "vary": "~1.1.2" } }, "sha512-IuL+Elrou2ZvCFHs18/CIzy2Nzvo25nZ1/D2eIZlz7c+QUayAcYoiM2BthCjs+EBHVpjYjcuLDAiCWgeIX3X1Q=="],

    "extend": ["extend@3.0.2", "", {}, "sha512-fjquC59cD7CyW6urNXK0FBufkZcoiGG80wTuPujX590cB5Ttln20E2UB4S/WARVqhXffZl2LNgS+gQdPIIim/g=="],

    "faye-websocket": ["faye-websocket@0.11.4", "", { "dependencies": { "websocket-driver": ">=0.5.1" } }, "sha512-CzbClwlXAuiRQAlUyfqPgvPoNKTckTPGfwZV4ZdAhVcP2lh9KUxJg2b5GkE7XbjKQ3YJnQ9z6D9ntLAlB+tP8g=="],

    "fdir": ["fdir@6.5.0", "", { "peerDependencies": { "picomatch": "^3 || ^4" }, "optionalPeers": ["picomatch"] }, "sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg=="],

    "fetch-blob": ["fetch-blob@3.2.0", "", { "dependencies": { "node-domexception": "^1.0.0", "web-streams-polyfill": "^3.0.3" } }, "sha512-7yAQpD2UMJzLi1Dqv7qFYnPbaPx7ZfFK6PiIxQ4PfkGPyNyl2Ugx+a/umUonmKqjhM4DnfbMvdX6otXq83soQQ=="],

    "finalhandler": ["finalhandler@1.3.2", "", { "dependencies": { "debug": "2.6.9", "encodeurl": "~2.0.0", "escape-html": "~1.0.3", "on-finished": "~2.4.1", "parseurl": "~1.3.3", "statuses": "~2.0.2", "unpipe": "~1.0.0" } }, "sha512-aA4RyPcd3badbdABGDuTXCMTtOneUCAYH/gxoYRTZlIJdF0YPWuGqiAsIrhNnnqdXGswYk6dGujem4w80UJFhg=="],

    "firebase": ["firebase@12.18.0", "", { "dependencies": { "@firebase/ai": "2.15.0", "@firebase/analytics": "0.10.24", "@firebase/analytics-compat": "0.2.30", "@firebase/app": "0.16.1", "@firebase/app-check": "0.13.1", "@firebase/app-check-compat": "0.4.7", "@firebase/app-compat": "0.5.17", "@firebase/app-types": "0.9.6", "@firebase/auth": "1.13.5", "@firebase/auth-compat": "0.6.10", "@firebase/data-connect": "0.7.4", "@firebase/database": "1.1.5", "@firebase/database-compat": "2.1.7", "@firebase/firestore": "4.17.1", "@firebase/firestore-compat": "0.4.13", "@firebase/functions": "0.14.0", "@firebase/functions-compat": "0.5.0", "@firebase/installations": "0.6.24", "@firebase/installations-compat": "0.2.24", "@firebase/messaging": "0.13.2", "@firebase/messaging-compat": "0.2.29", "@firebase/performance": "0.7.14", "@firebase/performance-compat": "0.2.27", "@firebase/remote-config": "0.9.2", "@firebase/remote-config-compat": "0.2.29", "@firebase/storage": "0.14.5", "@firebase/storage-compat": "0.4.5", "@firebase/util": "1.15.3" } }, "sha512-XaL6tlE5Xd20ZDhckqOMIw+JJTET+wTdeZPxQ7ihc42oxRb7kWUyn/j1LO5V9dH1xq8Rv5R71Pv1fBCdIkt9Rw=="],

    "formdata-polyfill": ["formdata-polyfill@4.0.10", "", { "dependencies": { "fetch-blob": "^3.1.2" } }, "sha512-buewHzMvYL29jdeQTVILecSaZKnt/RJWjoZCF5OW60Z67/GmSLBkOFM7qh1PI3zFNtJbaZL5eQu1vLfazOwj4g=="],

    "forwarded": ["forwarded@0.2.0", "", {}, "sha512-buRG0fpBtRHSTCOASe6hD258tEubFoRLb4ZNA6NxMVHNw2gOcwHo9wyablzMzOA5z9xA9L1KNjk/Nt6MT9aYow=="],

    "fraction.js": ["fraction.js@5.3.4", "", {}, "sha512-1X1NTtiJphryn/uLQz3whtY6jK3fTqoE3ohKs0tT+Ujr1W59oopxmoEh7Lu5p6vBaPbgoM0bzveAW4Qi5RyWDQ=="],

    "framer-motion": ["framer-motion@12.43.0", "", { "dependencies": { "motion-dom": "^12.43.0", "motion-utils": "^12.39.0", "tslib": "^2.4.0" }, "peerDependencies": { "@emotion/is-prop-valid": "*", "react": "^18.0.0 || ^19.0.0", "react-dom": "^18.0.0 || ^19.0.0" }, "optionalPeers": ["@emotion/is-prop-valid", "react", "react-dom"] }, "sha512-1eaL3RvR/kAlbG7UYcpMptEyzPoENO0c6w7ZnB3/hh2vSAz/6uGAFn6fdoqTBguNstf3MsFhJHsD/0DHiclG+g=="],

    "fresh": ["fresh@0.5.2", "", {}, "sha512-zJ2mQYM18rEFOudeV4GShTGIQ7RbzA7ozbU9I/XBpm7kqgMywgmylMwXHxZJmkVoYkna9d2pVXVXPdYTP9ej8Q=="],

    "fsevents": ["fsevents@2.3.3", "", { "os": "darwin" }, "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw=="],

    "function-bind": ["function-bind@1.1.2", "", {}, "sha512-7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA=="],

    "gaxios": ["gaxios@7.3.1", "", { "dependencies": { "extend": "^3.0.2", "https-proxy-agent": "^7.0.1", "node-fetch": "^3.3.2" } }, "sha512-kB3rzJV7d9juLZh8/56QTXCwQfxyhdOMdyYk1HdQKFtF8TJTDTZQJtixWIwXdE9Jji91mC41DUNpjleo4L4eAQ=="],

    "gcp-metadata": ["gcp-metadata@8.1.2", "", { "dependencies": { "gaxios": "^7.0.0", "google-logging-utils": "^1.0.0", "json-bigint": "^1.0.0" } }, "sha512-zV/5HKTfCeKWnxG0Dmrw51hEWFGfcF2xiXqcA3+J90WDuP0SvoiSO5ORvcBsifmx/FoIjgQN3oNOGaQ5PhLFkg=="],

    "gensync": ["gensync@1.0.0-beta.2", "", {}, "sha512-3hN7NaskYvMDLQY55gnW3NQ+mesEAepTqlg+VEbj7zzqEMBVNhzcGYYeqFo/TlYz6eQiFcp1HcsCZO+nGgS8zg=="],

    "get-caller-file": ["get-caller-file@2.0.5", "", {}, "sha512-DyFP3BM/3YHTQOCUL/w0OZHR0lpKeGrxotcHWcqNEdnltqFwXVfhEBQ94eIo34AfQpo0rGki4cyIiftY06h2Fg=="],

    "get-intrinsic": ["get-intrinsic@1.3.0", "", { "dependencies": { "call-bind-apply-helpers": "^1.0.2", "es-define-property": "^1.0.1", "es-errors": "^1.3.0", "es-object-atoms": "^1.1.1", "function-bind": "^1.1.2", "get-proto": "^1.0.1", "gopd": "^1.2.0", "has-symbols": "^1.1.0", "hasown": "^2.0.2", "math-intrinsics": "^1.1.0" } }, "sha512-9fSjSaos/fRIVIp+xSJlE6lfwhES7LNtKaCBIamHsjr2na1BiABJPo0mOjjz8GJDURarmCPGqaiVg5mfjb98CQ=="],

    "get-proto": ["get-proto@1.0.1", "", { "dependencies": { "dunder-proto": "^1.0.1", "es-object-atoms": "^1.0.0" } }, "sha512-sTSfBjoXBp89JvIKIefqw7U2CCebsc74kiY6awiGogKtoSGbgjYE/G/+l9sF3MWFPNc9IcoOC4ODfKHfxFmp0g=="],

    "google-auth-library": ["google-auth-library@10.9.1", "", { "dependencies": { "base64-js": "^1.3.0", "ecdsa-sig-formatter": "^1.0.11", "gaxios": "^7.1.4", "gcp-metadata": "8.1.2", "google-logging-utils": "1.1.3", "jws": "^4.0.0" } }, "sha512-i1ydyHrqcIxXkWh/uBmVkzCvIuq5yiK2ATndIe5XxKholrG/MTYP9xGYka4sQhrbIAgGjL2B6NOE7rFaiF3fXw=="],

    "google-logging-utils": ["google-logging-utils@1.1.3", "", {}, "sha512-eAmLkjDjAFCVXg7A1unxHsLf961m6y17QFqXqAXGj/gVkKFrEICfStRfwUlGNfeCEjNRa32JEWOUTlYXPyyKvA=="],

    "gopd": ["gopd@1.2.0", "", {}, "sha512-ZUKRh6/kUFoAiTAtTYPZJ3hw9wNxx+BIBOijnlG9PnrJsCcSjs1wyyD6vJpaYtgnzDrKYRSqf3OO6Rfa93xsRg=="],

    "graceful-fs": ["graceful-fs@4.2.11", "", {}, "sha512-RbJ5/jmFcNNCcDV5o9eTnBLJ/HszWV0P73bc+Ff4nS/rJj+YaS6IGyiOL0VoBYX+l1Wrl3k63h/KrH+nhJ0XvQ=="],

    "has-symbols": ["has-symbols@1.1.0", "", {}, "sha512-1cDNdwJ2Jaohmb3sg4OmKaMBwuC48sYni5HUw2DvsC8LjGTLK9h+eb1X6RyuOHe4hT0ULCW68iomhjUoKUqlPQ=="],

    "hasown": ["hasown@2.0.4", "", { "dependencies": { "function-bind": "^1.1.2" } }, "sha512-T2UbfbBEF32wiepXIsMlTW9+dDYC6wMh/t/vYA4tuOMKqWz/n3vr1NFSxQiyP+zk2mXsoMA/i/7qV6LKut1t1A=="],

    "http-errors": ["http-errors@2.0.1", "", { "dependencies": { "depd": "~2.0.0", "inherits": "~2.0.4", "setprototypeof": "~1.2.0", "statuses": "~2.0.2", "toidentifier": "~1.0.1" } }, "sha512-4FbRdAX+bSdmo4AUFuS0WNiPz8NgFt+r8ThgNWmlrjQjt1Q7ZR9+zTlce2859x4KSXrwIsaeTqDoKQmtP8pLmQ=="],

    "http-parser-js": ["http-parser-js@0.5.10", "", {}, "sha512-Pysuw9XpUq5dVc/2SMHpuTY01RFl8fttgcyunjL7eEMhGM3cI4eOmiCycJDVCo/7O7ClfQD3SaI6ftDzqOXYMA=="],

    "https-proxy-agent": ["https-proxy-agent@7.0.6", "", { "dependencies": { "agent-base": "^7.1.2", "debug": "4" } }, "sha512-vK9P5/iUfdl95AI+JVyUuIcVtd4ofvtrOr3HNtM2yxC9bnMbEdp3x01OhQNnjb8IJYi38VlTE3mBXwcfvywuSw=="],

    "iconv-lite": ["iconv-lite@0.4.24", "", { "dependencies": { "safer-buffer": ">= 2.1.2 < 3" } }, "sha512-v3MXnZAcvnywkTUEZomIActle7RXXeedOR31wwl7VlyoXO4Qi9arvSenNQWne1TcRwhCL1HwLI21bEqdpj8/rA=="],

    "idb": ["idb@7.1.1", "", {}, "sha512-gchesWBzyvGHRO9W8tzUWFDycow5gwjvFKfyV9FF32Y7F50yZMp7mP+T2mJIWFx49zicqyC4uefHM17o6xKIVQ=="],

    "inherits": ["inherits@2.0.4", "", {}, "sha512-k/vGaX4/Yla3WzyMCvTQOXYeIHvqOKtnqBduzTHpzpQZzAskKMhZ2K+EnBiSM9zGSoIFeMpXKxa4dYeZIQqewQ=="],

    "ipaddr.js": ["ipaddr.js@1.9.1", "", {}, "sha512-0KI/607xoxSToH7GjN1FfSbLoU0+btTicjsQSWQlh/hZykN8KpmMf7uYwPW3R+akZ6R/w18ZlXSHBYXiYUPO3g=="],

    "is-fullwidth-code-point": ["is-fullwidth-code-point@3.0.0", "", {}, "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg=="],

    "jiti": ["jiti@2.7.0", "", { "bin": { "jiti": "lib/jiti-cli.mjs" } }, "sha512-AC/7JofJvZGrrneWNaEnJeOLUx+JlGt7tNa0wZiRPT4MY1wmfKjt2+6O2p2uz2+skll8OZZmJMNqeke7kKbNgQ=="],

    "js-tokens": ["js-tokens@4.0.0", "", {}, "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ=="],

    "jsesc": ["jsesc@3.1.0", "", { "bin": { "jsesc": "bin/jsesc" } }, "sha512-/sM3dO2FOzXjKQhJuo0Q173wf2KOo8t4I8vHy6lF9poUp7bKT0/NHE8fPX23PwfhnykfqnC2xRxOnVw5XuGIaA=="],

    "json-bigint": ["json-bigint@1.0.0", "", { "dependencies": { "bignumber.js": "^9.0.0" } }, "sha512-SiPv/8VpZuWbvLSMtTDU8hEfrZWg/mH/nV/b4o0CYbSxu1UIQPLdwKOCIyLQX+VIPO5vrLX3i8qtqFyhdPSUSQ=="],

    "json5": ["json5@2.2.3", "", { "bin": { "json5": "lib/cli.js" } }, "sha512-XmOWe7eyHYH14cLdVPoyg+GOH3rYX++KpzrylJwSW98t3Nk+U8XOl8FWKOgwtzdb8lXGf6zYwDUzeHMWfxasyg=="],

    "jwa": ["jwa@2.0.1", "", { "dependencies": { "buffer-equal-constant-time": "^1.0.1", "ecdsa-sig-formatter": "1.0.11", "safe-buffer": "^5.0.1" } }, "sha512-hRF04fqJIP8Abbkq5NKGN0Bbr3JxlQ+qhZufXVr0DvujKy93ZCbXZMHDL4EOtodSbCWxOqR8MS1tXA5hwqCXDg=="],

    "jws": ["jws@4.0.1", "", { "dependencies": { "jwa": "^2.0.1", "safe-buffer": "^5.0.1" } }, "sha512-EKI/M/yqPncGUUh44xz0PxSidXFr/+r0pA70+gIYhjv+et7yxM+s29Y+VGDkovRofQem0fs7Uvf4+YmAdyRduA=="],

    "lightningcss": ["lightningcss@1.32.0", "", { "dependencies": { "detect-libc": "^2.0.3" }, "optionalDependencies": { "lightningcss-android-arm64": "1.32.0", "lightningcss-darwin-arm64": "1.32.0", "lightningcss-darwin-x64": "1.32.0", "lightningcss-freebsd-x64": "1.32.0", "lightningcss-linux-arm-gnueabihf": "1.32.0", "lightningcss-linux-arm64-gnu": "1.32.0", "lightningcss-linux-arm64-musl": "1.32.0", "lightningcss-linux-x64-gnu": "1.32.0", "lightningcss-linux-x64-musl": "1.32.0", "lightningcss-win32-arm64-msvc": "1.32.0", "lightningcss-win32-x64-msvc": "1.32.0" } }, "sha512-NXYBzinNrblfraPGyrbPoD19C1h9lfI/1mzgWYvXUTe414Gz/X1FD2XBZSZM7rRTrMA8JL3OtAaGifrIKhQ5yQ=="],

    "lightningcss-android-arm64": ["lightningcss-android-arm64@1.32.0", "", { "os": "android", "cpu": "arm64" }, "sha512-YK7/ClTt4kAK0vo6w3X+Pnm0D2cf2vPHbhOXdoNti1Ga0al1P4TBZhwjATvjNwLEBCnKvjJc2jQgHXH0NEwlAg=="],

    "lightningcss-darwin-arm64": ["lightningcss-darwin-arm64@1.32.0", "", { "os": "darwin", "cpu": "arm64" }, "sha512-RzeG9Ju5bag2Bv1/lwlVJvBE3q6TtXskdZLLCyfg5pt+HLz9BqlICO7LZM7VHNTTn/5PRhHFBSjk5lc4cmscPQ=="],

    "lightningcss-darwin-x64": ["lightningcss-darwin-x64@1.32.0", "", { "os": "darwin", "cpu": "x64" }, "sha512-U+QsBp2m/s2wqpUYT/6wnlagdZbtZdndSmut/NJqlCcMLTWp5muCrID+K5UJ6jqD2BFshejCYXniPDbNh73V8w=="],

    "lightningcss-freebsd-x64": ["lightningcss-freebsd-x64@1.32.0", "", { "os": "freebsd", "cpu": "x64" }, "sha512-JCTigedEksZk3tHTTthnMdVfGf61Fky8Ji2E4YjUTEQX14xiy/lTzXnu1vwiZe3bYe0q+SpsSH/CTeDXK6WHig=="],

    "lightningcss-linux-arm-gnueabihf": ["lightningcss-linux-arm-gnueabihf@1.32.0", "", { "os": "linux", "cpu": "arm" }, "sha512-x6rnnpRa2GL0zQOkt6rts3YDPzduLpWvwAF6EMhXFVZXD4tPrBkEFqzGowzCsIWsPjqSK+tyNEODUBXeeVHSkw=="],

    "lightningcss-linux-arm64-gnu": ["lightningcss-linux-arm64-gnu@1.32.0", "", { "os": "linux", "cpu": "arm64" }, "sha512-0nnMyoyOLRJXfbMOilaSRcLH3Jw5z9HDNGfT/gwCPgaDjnx0i8w7vBzFLFR1f6CMLKF8gVbebmkUN3fa/kQJpQ=="],

    "lightningcss-linux-arm64-musl": ["lightningcss-linux-arm64-musl@1.32.0", "", { "os": "linux", "cpu": "arm64" }, "sha512-UpQkoenr4UJEzgVIYpI80lDFvRmPVg6oqboNHfoH4CQIfNA+HOrZ7Mo7KZP02dC6LjghPQJeBsvXhJod/wnIBg=="],

    "lightningcss-linux-x64-gnu": ["lightningcss-linux-x64-gnu@1.32.0", "", { "os": "linux", "cpu": "x64" }, "sha512-V7Qr52IhZmdKPVr+Vtw8o+WLsQJYCTd8loIfpDaMRWGUZfBOYEJeyJIkqGIDMZPwPx24pUMfwSxxI8phr/MbOA=="],

    "lightningcss-linux-x64-musl": ["lightningcss-linux-x64-musl@1.32.0", "", { "os": "linux", "cpu": "x64" }, "sha512-bYcLp+Vb0awsiXg/80uCRezCYHNg1/l3mt0gzHnWV9XP1W5sKa5/TCdGWaR/zBM2PeF/HbsQv/j2URNOiVuxWg=="],

    "lightningcss-win32-arm64-msvc": ["lightningcss-win32-arm64-msvc@1.32.0", "", { "os": "win32", "cpu": "arm64" }, "sha512-8SbC8BR40pS6baCM8sbtYDSwEVQd4JlFTOlaD3gWGHfThTcABnNDBda6eTZeqbofalIJhFx0qKzgHJmcPTnGdw=="],

    "lightningcss-win32-x64-msvc": ["lightningcss-win32-x64-msvc@1.32.0", "", { "os": "win32", "cpu": "x64" }, "sha512-Amq9B/SoZYdDi1kFrojnoqPLxYhQ4Wo5XiL8EVJrVsB8ARoC1PWW6VGtT0WKCemjy8aC+louJnjS7U18x3b06Q=="],

    "lodash.camelcase": ["lodash.camelcase@4.3.0", "", {}, "sha512-TwuEnCnxbc3rAvhf/LbG7tJUDzhqXyFnv3dtzLOPgCG/hODL7WFnsbwktkD7yUV0RrreP/l1PALq/YSg6VvjlA=="],

    "long": ["long@5.3.2", "", {}, "sha512-mNAgZ1GmyNhD7AuqnTG3/VQ26o760+ZYBPKjPvugO8+nLbYfX6TVpJPseBvopbdY+qpZ/lKUnmEc1LeZYS3QAA=="],

    "lru-cache": ["lru-cache@5.1.1", "", { "dependencies": { "yallist": "^3.0.2" } }, "sha512-KpNARQA3Iwv+jTA0utUVVbrh+Jlrr1Fv0e56GGzAFOXN7dk/FviaDW8LHmK52DlcH4WP2n6gI8vN1aesBFgo9w=="],

    "lucide-react": ["lucide-react@0.546.0", "", { "peerDependencies": { "react": "^16.5.1 || ^17.0.0 || ^18.0.0 || ^19.0.0" } }, "sha512-Z94u6fKT43lKeYHiVyvyR8fT7pwCzDu7RyMPpTvh054+xahSgj4HFQ+NmflvzdXsoAjYGdCguGaFKYuvq0ThCQ=="],

    "magic-string": ["magic-string@0.30.21", "", { "dependencies": { "@jridgewell/sourcemap-codec": "^1.5.5" } }, "sha512-vd2F4YUyEXKGcLHoq+TEyCjxueSeHnFxyyjNp80yg0XV4vUhnDer/lvvlqM/arB5bXQN5K2/3oinyCRyx8T2CQ=="],

    "math-intrinsics": ["math-intrinsics@1.1.0", "", {}, "sha512-/IXtbwEk5HTPyEwyKX6hGkYXxM9nbj64B+ilVJnC/R6B0pH5G4V3b0pVbL7DBj4tkhBAppbQUlf6F6Xl9LHu1g=="],

    "media-typer": ["media-typer@0.3.0", "", {}, "sha512-dq+qelQ9akHpcOl/gUVRTxVIOkAJ1wR3QAvb4RsVjS8oVoFjDGTc679wJYmUmknUF5HwMLOgb5O+a3KxfWapPQ=="],

    "merge-descriptors": ["merge-descriptors@1.0.3", "", {}, "sha512-gaNvAS7TZ897/rVaZ0nMtAyxNyi/pdbjbAwUpFQpN70GqnVfOiXpeUUMKRBmzXaSQ8DdTX4/0ms62r2K+hE6mQ=="],

    "methods": ["methods@1.1.2", "", {}, "sha512-iclAHeNqNm68zFtnZ0e+1L2yUIdvzNoauKU4WBA3VvH/vPFieF7qfRlwUZU+DA9P9bPXIS90ulxoUoCH23sV2w=="],

    "mime": ["mime@1.6.0", "", { "bin": { "mime": "cli.js" } }, "sha512-x0Vn8spI+wuJ1O6S7gnbaQg8Pxh4NNHb7KSINmEWKiPE4RKOplvijn+NkmYmmRgP68mc70j2EbeTFRsrswaQeg=="],

    "mime-db": ["mime-db@1.52.0", "", {}, "sha512-sPU4uV7dYlvtWJxwwxHD0PuihVNiE7TyAbQ5SWxDCB9mUYvOgroQOwYQQOKPJ8CIbE+1ETVlOoK1UC2nU3gYvg=="],

    "mime-types": ["mime-types@2.1.35", "", { "dependencies": { "mime-db": "1.52.0" } }, "sha512-ZDY+bPm5zTTF+YpCrAU9nK0UgICYPT0QtT1NZWFv4s++TNkcgVaT0g6+4R2uI4MjQjzysHB1zxuWL50hzaeXiw=="],

    "motion": ["motion@12.43.0", "", { "dependencies": { "framer-motion": "^12.43.0", "tslib": "^2.4.0" }, "peerDependencies": { "@emotion/is-prop-valid": "*", "react": "^18.0.0 || ^19.0.0", "react-dom": "^18.0.0 || ^19.0.0" }, "optionalPeers": ["@emotion/is-prop-valid", "react", "react-dom"] }, "sha512-BQgQbSa9Hn3/mtbib0MK53y6JSANa+YKUKlaYnWzAVDH424RYQ5LVpV3pNiWH00BA2z4ojsSdMzqT7g2FQwjuQ=="],

    "motion-dom": ["motion-dom@12.43.0", "", { "dependencies": { "motion-utils": "^12.39.0" } }, "sha512-azKON4d9S65PEoFUiQTMTgPheEmzf2QngdRc50AKfJp9Q9mmcBVw22c8eMq9k8kxOFHdL7+WZY7N/5F/lwiDag=="],

    "motion-utils": ["motion-utils@12.39.0", "", {}, "sha512-8nadJAJjTtqRkmRF36FoJTrywK9nnFmnPwnSMyxaOCU7GDjN9RTMJIxx9De8ErM+vpPhMccr/6fo5WciyQLnMQ=="],

    "ms": ["ms@2.0.0", "", {}, "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A=="],

    "nanoid": ["nanoid@3.3.18", "", { "bin": { "nanoid": "bin/nanoid.cjs" } }, "sha512-DTg4MJbGMWkfi6VZFdNt2/caMbQy4Ou+Op/hJQvGEWcnVfoA1QA+xzRKAzw9jD6+GVOOeYr/mIcuDSdug6F6+w=="],

    "negotiator": ["negotiator@0.6.3", "", {}, "sha512-+EUsqGPLsM+j/zdChZjsnX51g4XrHFOIXwfnCVPGlQk/k5giakcKsuxCObBRu6DSm9opw/O6slWbJdghQM4bBg=="],

    "node-domexception": ["node-domexception@1.0.0", "", {}, "sha512-/jKZoMpw0F8GRwl4/eLROPA3cfcXtLApP0QzLmUT/HuPCZWyB7IY9ZrMeKw2O/nFIqPQB3PVM9aYm0F312AXDQ=="],

    "node-fetch": ["node-fetch@3.3.2", "", { "dependencies": { "data-uri-to-buffer": "^4.0.0", "fetch-blob": "^3.1.4", "formdata-polyfill": "^4.0.10" } }, "sha512-dRB78srN/l6gqWulah9SrxeYnxeddIG30+GOqK/9OlLVyLg3HPnr6SqOWTWOXKRwC2eGYCkZ59NNuSgvSrpgOA=="],

    "node-releases": ["node-releases@2.0.54", "", {}, "sha512-YHs7BmmcsdAI5Ozuf8JZo6PT0mv2GIWC9vMfvUC3dp65M8hn7Ux8CPL+2oBI7juNuj9d0ndhTcznq2ODBps9cQ=="],

    "npm": ["npm@11.19.1", "", { "dependencies": { "@isaacs/string-locale-compare": "^1.1.0", "@npmcli/arborist": "^9.9.1", "@npmcli/config": "^10.12.0", "@npmcli/fs": "^5.0.0", "@npmcli/map-workspaces": "^5.0.3", "@npmcli/metavuln-calculator": "^9.0.3", "@npmcli/package-json": "^7.0.5", "@npmcli/promise-spawn": "^9.0.1", "@npmcli/redact": "^4.0.0", "@npmcli/run-script": "^10.0.4", "@sigstore/tuf": "^4.0.2", "abbrev": "^4.0.0", "archy": "~1.0.0", "cacache": "^20.0.4", "chalk": "^5.6.2", "ci-info": "^4.4.0", "fastest-levenshtein": "^1.0.16", "fs-minipass": "^3.0.3", "glob": "^13.0.6", "graceful-fs": "^4.2.11", "hosted-git-info": "^9.0.3", "ini": "^6.0.0", "init-package-json": "^8.2.5", "is-cidr": "^6.0.4", "json-parse-even-better-errors": "^5.0.0", "libnpmaccess": "^10.0.3", "libnpmdiff": "^8.1.12", "libnpmexec": "^10.3.2", "libnpmfund": "^7.0.26", "libnpmorg": "^8.0.1", "libnpmpack": "^9.1.13", "libnpmpublish": "^11.2.0", "libnpmsearch": "^9.0.1", "libnpmteam": "^8.0.2", "libnpmversion": "^8.0.4", "make-fetch-happen": "^15.0.6", "minimatch": "^10.2.5", "minipass": "^7.1.3", "minipass-pipeline": "^1.2.4", "ms": "^2.1.2", "node-gyp": "^12.4.0", "nopt": "^9.0.0", "npm-audit-report": "^7.0.0", "npm-install-checks": "^8.0.0", "npm-package-arg": "^13.0.2", "npm-pick-manifest": "^11.0.3", "npm-profile": "^12.0.2", "npm-registry-fetch": "^19.1.1", "npm-user-validate": "^4.0.0", "p-map": "^7.0.4", "pacote": "^21.5.1", "parse-conflict-json": "^5.0.1", "proc-log": "^6.1.0", "qrcode-terminal": "^0.12.0", "read": "^5.0.1", "semver": "^7.8.5", "spdx-expression-parse": "^4.0.0", "ssri": "^13.0.1", "supports-color": "^10.2.2", "tar": "^7.5.22", "text-table": "~0.2.0", "tiny-relative-date": "^2.0.2", "treeverse": "^3.0.0", "validate-npm-package-name": "^7.0.2", "which": "^6.0.1" }, "bin": { "npm": "bin/npm-cli.js", "npx": "bin/npx-cli.js" } }, "sha512-ztsxKxt/kkIaAs+2i0GU6I+DRmUdrNasxTZKJe9TCdSjKxlhah/4r/hl5ygMD6XAg1qZ9c2TNomR4qgOydp10g=="],

    "object-inspect": ["object-inspect@1.13.4", "", {}, "sha512-W67iLl4J2EXEGTbfeHCffrjDfitvLANg0UlX3wFUUSTx92KXRFegMHUVgSqE+wvhAbi4WqjGg9czysTV2Epbew=="],

    "on-finished": ["on-finished@2.4.1", "", { "dependencies": { "ee-first": "1.1.1" } }, "sha512-oVlzkg3ENAhCk2zdv7IJwd/QUD4z2RxRwpkcGY8psCVcCYZNq4wYnVWALHM+brtuJjePWiYF/ClmuDr8Ch5+kg=="],

    "p-retry": ["p-retry@4.6.2", "", { "dependencies": { "@types/retry": "0.12.0", "retry": "^0.13.1" } }, "sha512-312Id396EbJdvRONlngUx0NydfrIQ5lsYu0znKVUzVvArzEIt08V1qhtyESbGVd1FGX7UKtiFp5uwKZdM8wIuQ=="],

    "parseurl": ["parseurl@1.3.3", "", {}, "sha512-CiyeOxFT/JZyN5m0z9PfXw4SCBJ6Sygz1Dpl0wqjlhDEGGBP1GnsUVEL0p63hoG1fcj3fHynXi9NYO4nWOL+qQ=="],

    "path-to-regexp": ["path-to-regexp@0.1.13", "", {}, "sha512-A/AGNMFN3c8bOlvV9RreMdrv7jsmF9XIfDeCd87+I8RNg6s78BhJxMu69NEMHBSJFxKidViTEdruRwEk/WIKqA=="],

    "picocolors": ["picocolors@1.1.1", "", {}, "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA=="],

    "picomatch": ["picomatch@4.0.7", "", {}, "sha512-qcJu88Q2IWqJsDD529JKMdwGm/dvInW4HvQnRwiH9JtihJvzGOscDtHE3x1pBKeUOTysQ8kVmLnJ2kJu7yhcGA=="],

    "postcss": ["postcss@8.5.28", "", { "dependencies": { "nanoid": "^3.3.18", "picocolors": "^1.1.1", "source-map-js": "^1.2.1" } }, "sha512-RRuzqDtt5Y9h3quz5hWhK+TPnsmVs6WwSU6LkJMeY4HstUEDuYTG8UJSdawMRzmzAtV+KEoG8N3Qg2qLy5vM/A=="],

    "postcss-value-parser": ["postcss-value-parser@4.2.0", "", {}, "sha512-1NNCs6uurfkVbeXG4S8JFT9t19m45ICnif8zWLd5oPSZ50QnwMfK+H3jv408d4jw/7Bttv5axS5IiHoLaVNHeQ=="],

    "protobufjs": ["protobufjs@7.6.6", "", { "dependencies": { "@protobufjs/aspromise": "^1.1.2", "@protobufjs/base64": "^1.1.2", "@protobufjs/codegen": "^2.0.5", "@protobufjs/eventemitter": "^1.1.1", "@protobufjs/fetch": "^1.1.1", "@protobufjs/float": "^1.0.2", "@protobufjs/path": "^1.1.2", "@protobufjs/pool": "^1.1.0", "@protobufjs/utf8": "^1.1.1", "@types/node": ">=13.7.0", "long": "^5.3.2" } }, "sha512-dYDWdjSl5RNb7SgPxGQcRU+GtvP7s2fpkrY0r432PcOIaZ0/rBcxEZnQN67iJhFuQiVw754JDoPruPCNdGsbjg=="],

    "proxy-addr": ["proxy-addr@2.0.7", "", { "dependencies": { "forwarded": "0.2.0", "ipaddr.js": "1.9.1" } }, "sha512-llQsMLSUDUPT44jdrU/O37qlnifitDP+ZwrmmZcoSKyLKvtZxpyV0n2/bD/N4tBAAZ/gJEdZU7KMraoK1+XYAg=="],

    "qs": ["qs@6.15.3", "", { "dependencies": { "es-define-property": "^1.0.1", "side-channel": "^1.1.1" } }, "sha512-O9gl3zCl5h5blw1KGUzQKhA5oUXSl8rwUIM5o0S3nCXMliSvy5Dzx7/DJcI+SwgICv+IneSZwhBh1oSyEHA71A=="],

    "range-parser": ["range-parser@1.2.1", "", {}, "sha512-Hrgsx+orqoygnmhFbKaHE6c296J+HTAQXoxEF6gNupROmmGJRoyzfG3ccAveqCBrwr/2yxQ5BVd/GTl5agOwSg=="],

    "raw-body": ["raw-body@2.5.3", "", { "dependencies": { "bytes": "~3.1.2", "http-errors": "~2.0.1", "iconv-lite": "~0.4.24", "unpipe": "~1.0.0" } }, "sha512-s4VSOf6yN0rvbRZGxs8Om5CWj6seneMwK3oDb4lWDH0UPhWcxwOWw5+qk24bxq87szX1ydrwylIOp2uG1ojUpA=="],

    "re2js": ["re2js@2.8.6", "", {}, "sha512-xLgQil4kIUCrAzVk9fRSkxkFNwmygLFjVxXrLc65aE1F0+Zsb8rxumFBy4XKyvgMCTL6kilDq3EZ0piE2dP/Dg=="],

    "react": ["react@19.2.8", "", {}, "sha512-PWaYA1L/q9u2u7xYQi+Y3L3Yfnie7XyLeaJICV1MGD6LprsBxcAqGjYyr0eY3p+QdsA+x/Irkt4Qif8D63+Sbw=="],

    "react-dom": ["react-dom@19.2.8", "", { "dependencies": { "scheduler": "^0.27.0" }, "peerDependencies": { "react": "^19.2.8" } }, "sha512-rVprimfGBG3DR+Tq0IQG2DT5PxKth1WIGDmj5yPmlzr4YBe7uyE+Du4oVqTDXZSHGGGXRtTJEGSSePyQCMBglQ=="],

    "react-refresh": ["react-refresh@0.18.0", "", {}, "sha512-QgT5//D3jfjJb6Gsjxv0Slpj23ip+HtOpnNgnb2S5zU3CB26G/IDPGoy4RJB42wzFE46DRsstbW6tKHoKbhAxw=="],

    "require-directory": ["require-directory@2.1.1", "", {}, "sha512-fGxEI7+wsG9xrvdjsrlmL22OMTTiHRwAMroiEeMgq8gzoLC/PQr7RsRDSTLUg/bZAZtF+TVIkHc6/4RIKrui+Q=="],

    "retry": ["retry@0.13.1", "", {}, "sha512-XQBQ3I8W1Cge0Seh+6gjj03LbmRFWuoszgK9ooCpwYIrhhoO80pfq4cUkU5DkknwfOfFteRwlZ56PYOGYyFWdg=="],

    "rollup": ["rollup@4.63.1", "", { "dependencies": { "@types/estree": "1.0.9" }, "optionalDependencies": { "@napi-rs/lzma-linux-x64-gnu": "1.5.1", "@rollup/rollup-android-arm-eabi": "4.63.1", "@rollup/rollup-android-arm64": "4.63.1", "@rollup/rollup-darwin-arm64": "4.63.1", "@rollup/rollup-darwin-x64": "4.63.1", "@rollup/rollup-freebsd-arm64": "4.63.1", "@rollup/rollup-freebsd-x64": "4.63.1", "@rollup/rollup-linux-arm-gnueabihf": "4.63.1", "@rollup/rollup-linux-arm-musleabihf": "4.63.1", "@rollup/rollup-linux-arm64-gnu": "4.63.1", "@rollup/rollup-linux-arm64-musl": "4.63.1", "@rollup/rollup-linux-loong64-gnu": "4.63.1", "@rollup/rollup-linux-loong64-musl": "4.63.1", "@rollup/rollup-linux-ppc64-gnu": "4.63.1", "@rollup/rollup-linux-ppc64-musl": "4.63.1", "@rollup/rollup-linux-riscv64-gnu": "4.63.1", "@rollup/rollup-linux-riscv64-musl": "4.63.1", "@rollup/rollup-linux-s390x-gnu": "4.63.1", "@rollup/rollup-linux-x64-gnu": "4.63.1", "@rollup/rollup-linux-x64-musl": "4.63.1", "@rollup/rollup-openbsd-x64": "4.63.1", "@rollup/rollup-openharmony-arm64": "4.63.1", "@rollup/rollup-win32-arm64-msvc": "4.63.1", "@rollup/rollup-win32-ia32-msvc": "4.63.1", "@rollup/rollup-win32-x64-gnu": "4.63.1", "@rollup/rollup-win32-x64-msvc": "4.63.1", "fsevents": "~2.3.2" }, "bin": { "rollup": "dist/bin/rollup" } }, "sha512-3Df9jsstwhccuEfmAMi9l8XUh/GOkVObmFTU7CCVBysEbcOZLl84jCtaAZMcPiMz2EGKsATzQcU+Xr3n/wU6cg=="],

    "safe-buffer": ["safe-buffer@5.2.1", "", {}, "sha512-rp3So07KcdmmKbGvgaNxQSJr7bGVSVk5S9Eq1F+ppbRo70+YeaDxkw5Dd8NPN+GD6bjnYm2VuPuCXmpuYvmCXQ=="],

    "safer-buffer": ["safer-buffer@2.1.2", "", {}, "sha512-YZo3K82SD7Riyi0E1EQPojLz7kpepnSQI9IyPbHHg1XXXevb5dJI7tpyN2ADxGcQbHG7vcyRHk0cbwqcQriUtg=="],

    "scheduler": ["scheduler@0.27.0", "", {}, "sha512-eNv+WrVbKu1f3vbYJT/xtiF5syA5HPIMtf9IgY/nKg0sWqzAUEvqY/xm7OcZc/qafLx/iO9FgOmeSAp4v5ti/Q=="],

    "scripts": ["scripts@0.1.0", "", {}, "sha512-URMy4uj80+USxik0E+P7OeagdYGRM6vJQ+8zADRRNjcoIVdouxB7B60P4G4y20TizSGXdE0nAW5sSM1IIXa3hw=="],

    "semver": ["semver@6.3.1", "", { "bin": { "semver": "bin/semver.js" } }, "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA=="],

    "send": ["send@0.19.2", "", { "dependencies": { "debug": "2.6.9", "depd": "2.0.0", "destroy": "1.2.0", "encodeurl": "~2.0.0", "escape-html": "~1.0.3", "etag": "~1.8.1", "fresh": "~0.5.2", "http-errors": "~2.0.1", "mime": "1.6.0", "ms": "2.1.3", "on-finished": "~2.4.1", "range-parser": "~1.2.1", "statuses": "~2.0.2" } }, "sha512-VMbMxbDeehAxpOtWJXlcUS5E8iXh6QmN+BkRX1GARS3wRaXEEgzCcB10gTQazO42tpNIya8xIyNx8fll1OFPrg=="],

    "serve-static": ["serve-static@1.16.3", "", { "dependencies": { "encodeurl": "~2.0.0", "escape-html": "~1.0.3", "parseurl": "~1.3.3", "send": "~0.19.1" } }, "sha512-x0RTqQel6g5SY7Lg6ZreMmsOzncHFU7nhnRWkKgWuMTu5NN0DR5oruckMqRvacAN9d5w6ARnRBXl9xhDCgfMeA=="],

    "setprototypeof": ["setprototypeof@1.2.0", "", {}, "sha512-E5LDX7Wrp85Kil5bhZv46j8jOeboKq5JMmYM3gVGdGH8xFpPWXUMsNrlODCrkoxMEeNi/XZIwuRvY4XNwYMJpw=="],

    "side-channel": ["side-channel@1.1.1", "", { "dependencies": { "es-errors": "^1.3.0", "object-inspect": "^1.13.4", "side-channel-list": "^1.0.1", "side-channel-map": "^1.0.1", "side-channel-weakmap": "^1.0.2" } }, "sha512-6x6dK6zJdpTzF4sQeNYxwtvBzf6Eg4GtlesS94HOvTudUeyK2WXAaIfmDgsyslYrRBeFIlsi54AYsFGUuhmvrQ=="],

    "side-channel-list": ["side-channel-list@1.0.1", "", { "dependencies": { "es-errors": "^1.3.0", "object-inspect": "^1.13.4" } }, "sha512-mjn/0bi/oUURjc5Xl7IaWi/OJJJumuoJFQJfDDyO46+hBWsfaVM65TBHq2eoZBhzl9EchxOijpkbRC8SVBQU0w=="],

    "side-channel-map": ["side-channel-map@1.0.1", "", { "dependencies": { "call-bound": "^1.0.2", "es-errors": "^1.3.0", "get-intrinsic": "^1.2.5", "object-inspect": "^1.13.3" } }, "sha512-VCjCNfgMsby3tTdo02nbjtM/ewra6jPHmpThenkTYh8pG9ucZ/1P8So4u4FGBek/BjpOVsDCMoLA/iuBKIFXRA=="],

    "side-channel-weakmap": ["side-channel-weakmap@1.0.2", "", { "dependencies": { "call-bound": "^1.0.2", "es-errors": "^1.3.0", "get-intrinsic": "^1.2.5", "object-inspect": "^1.13.3", "side-channel-map": "^1.0.1" } }, "sha512-WPS/HvHQTYnHisLo9McqBHOJk2FkHO/tlpvldyrnem4aeQp4hai3gythswg6p01oSoTl58rcpiFAjF2br2Ak2A=="],

    "source-map-js": ["source-map-js@1.2.1", "", {}, "sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA=="],

    "start": ["start@5.1.0", "", {}, "sha512-lirwWQmvBC65bnxU3HzKx5m7vfZJZTx/FrKyPWbtobcvujGbinQQRrNodtcgkp4mTZ00umzDeg7lraN351l0aA=="],

    "statuses": ["statuses@2.0.2", "", {}, "sha512-DvEy55V3DB7uknRo+4iOGT5fP1slR8wQohVdknigZPMpMstaKJQWhwiYBACJE3Ul2pTnATihhBYnRhZQHGBiRw=="],

    "string-width": ["string-width@4.2.3", "", { "dependencies": { "emoji-regex": "^8.0.0", "is-fullwidth-code-point": "^3.0.0", "strip-ansi": "^6.0.1" } }, "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g=="],

    "strip-ansi": ["strip-ansi@6.0.1", "", { "dependencies": { "ansi-regex": "^5.0.1" } }, "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A=="],

    "stripe": ["stripe@22.6.1", "", { "peerDependencies": { "@types/node": ">=18" }, "optionalPeers": ["@types/node"] }, "sha512-hAKSkGeVt2u46TRYhmnvwmVHxBNtOCJnPjc+SH5sP2B2ypElYzAAY3Ljx0Ar8C2w8nfpFQiZ95qoDCDsFkXMTA=="],

    "supports-color": ["supports-color@10.2.2", "", {}, "sha512-SS+jx45GF1QjgEXQx4NJZV9ImqmO2NPz5FNsIHrsDjh2YsHnawpan7SNQ1o8NuhrbHZy9AZhIoCUiCeaW/C80g=="],

    "tailwindcss": ["tailwindcss@4.3.3", "", {}, "sha512-gOhV3P7ufE62QDGg1zVaTgCR+EtPv92k2nIhVcVKcLmxT1sUBsQGhnZj175j+MqRt4zLF7ic+sCYjfhxMxj7YQ=="],

    "tapable": ["tapable@2.3.3", "", {}, "sha512-uxc/zpqFg6x7C8vOE7lh6Lbda8eEL9zmVm/PLeTPBRhh1xCgdWaQ+J1CUieGpIfm2HdtsUpRv+HshiasBMcc6A=="],

    "tinyglobby": ["tinyglobby@0.2.17", "", { "dependencies": { "fdir": "^6.5.0", "picomatch": "^4.0.4" } }, "sha512-wXR/dYpcqKmfWpEdZjiKJOwCNFndD0DMnrW/cYjVGttEkBfVgcLFHoNrlj47mjOVic9yyNu65alsgF4NQyTa2g=="],

    "toidentifier": ["toidentifier@1.0.1", "", {}, "sha512-o5sSPKEkg/DIQNmH43V0/uerLrpzVedkUh8tGNvaeXpfpuwjKenlSox/2O/BTlZUtEe+JG7s5YhEz608PlAHRA=="],

    "tslib": ["tslib@2.8.1", "", {}, "sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w=="],

    "tsx": ["tsx@4.23.13", "", { "dependencies": { "esbuild": "~0.28.0" }, "optionalDependencies": { "fsevents": "~2.3.3" }, "bin": { "tsx": "dist/cli.mjs" } }, "sha512-BL5MGkRln6aDYhb0xbQlEAGw743BaZYWdbWtdJOBriYJboKgUUYCadFp2/FpBBZquBC/ezNBn7wMMPx7FDZUDw=="],

    "type-is": ["type-is@1.6.18", "", { "dependencies": { "media-typer": "0.3.0", "mime-types": "~2.1.24" } }, "sha512-TkRKr9sUTxEH8MdfuCSP7VizJyzRNMjj2J2do2Jr3Kym598JVdEksuzPQCnlFPW4ky9Q+iA+ma9BGm06XQBy8g=="],

    "typescript": ["typescript@5.8.3", "", { "bin": { "tsc": "bin/tsc", "tsserver": "bin/tsserver" } }, "sha512-p1diW6TqL9L07nNxvRMM7hMMw4c5XOo/1ibL4aAIGmSAt9slTE1Xgw5KWuof2uTOvCg9BY7ZRi+GaF+7sfgPeQ=="],

    "undici-types": ["undici-types@6.21.0", "", {}, "sha512-iwDZqg0QAGrg9Rav5H4n0M64c3mkR59cJ6wQp+7C4nI0gsmExaedaYLNO44eT4AtBBwjbTiGPMlt2Md0T9H9JQ=="],

    "unpipe": ["unpipe@1.0.0", "", {}, "sha512-pjy2bYhSsufwWlKwPc+l3cN7+wuJlK6uz0YdJEOlQDbl6jo/YlPi4mb8agUkVC8BF7V8NuzeyPNqRksA3hztKQ=="],

    "update-browserslist-db": ["update-browserslist-db@1.3.2", "", { "dependencies": { "escalade": "^3.2.0", "picocolors": "^1.1.1" }, "peerDependencies": { "browserslist": ">= 4.21.0" }, "bin": { "update-browserslist-db": "cli.js" } }, "sha512-UQ+MSxlhRm1bzjhU+DcuXfjFO1FzNtqhK5+9Yvlp90ItDLk5vT932A0rFu619nf7RVS+Y/VeaUW1jaRDqZ8VJw=="],

    "utils-merge": ["utils-merge@1.0.1", "", {}, "sha512-pMZTvIkT1d+TFGvDOqodOclx0QWkkgi6Tdoa8gC8ffGAAqz9pzPTZWAybbsHHoED/ztMtkv/VoYTYyShUn81hA=="],

    "vary": ["vary@1.1.2", "", {}, "sha512-BNGbWLfd0eUPabhkXUVm0j8uuvREyTh5ovRa/dyow/BqAbZJyC+5fU+IzQOzmAKzYqYRAISoRhdQr3eIZ/PXqg=="],

    "vite": ["vite@6.4.3", "", { "dependencies": { "esbuild": "^0.25.0", "fdir": "^6.4.4", "picomatch": "^4.0.2", "postcss": "^8.5.3", "rollup": "^4.34.9", "tinyglobby": "^0.2.13" }, "optionalDependencies": { "fsevents": "~2.3.3" }, "peerDependencies": { "@types/node": "^18.0.0 || ^20.0.0 || >=22.0.0", "jiti": ">=1.21.0", "less": "*", "lightningcss": "^1.21.0", "sass": "*", "sass-embedded": "*", "stylus": "*", "sugarss": "*", "terser": "^5.16.0", "tsx": "^4.8.1", "yaml": "^2.4.2" }, "optionalPeers": ["@types/node", "jiti", "less", "lightningcss", "sass", "sass-embedded", "stylus", "sugarss", "terser", "tsx", "yaml"], "bin": { "vite": "bin/vite.js" } }, "sha512-NTKlcQjlAK7MlQoyb6LgaqHc8sso/pVyUJYWMws3jg21uTJw/LddqIFPcPqP6PzpgbIcZyKI85sFE4HBrQDA8A=="],

    "web-streams-polyfill": ["web-streams-polyfill@3.3.3", "", {}, "sha512-d2JWLCivmZYTSIoge9MsgFCZrt571BikcWGYkjC1khllbTeDlGqZ2D8vD8E/lJa8WGWbb7Plm8/XJYV7IJHZZw=="],

    "web-vitals": ["web-vitals@4.2.4", "", {}, "sha512-r4DIlprAGwJ7YM11VZp4R884m0Vmgr6EAKe3P+kO0PPj3Unqyvv59rczf6UiGcb9Z8QxZVcqKNwv/g0WNdWwsw=="],

    "websocket-driver": ["websocket-driver@0.7.5", "", { "dependencies": { "http-parser-js": ">=0.5.1", "safe-buffer": ">=5.1.0", "websocket-extensions": ">=0.1.1" } }, "sha512-ZL2+3c7kMBdIRCMz6l8jQMHyGVxj+UL+xVk74Ombiciboca8rHa15L86B19E5oh1pL9Ii/uj54gtsIrZGMo6zA=="],

    "websocket-extensions": ["websocket-extensions@0.1.4", "", {}, "sha512-OqedPIGOfsDlo31UNwYbCFMSaO9m9G/0faIHj5/dZFDMFqPTcx6UwqyOy3COEaEOg/9VsGIpdqn62W5KhoKSpg=="],

    "wrap-ansi": ["wrap-ansi@7.0.0", "", { "dependencies": { "ansi-styles": "^4.0.0", "string-width": "^4.1.0", "strip-ansi": "^6.0.0" } }, "sha512-YVGIj2kamLSTxw6NsZjoBxfSwsn0ycdesmc4p+Q21c5zPuZ1pl+NfxVdxPtdHvmNVOQ6XSYG4AUtyt/Fi7D16Q=="],

    "ws": ["ws@8.21.3", "", { "peerDependencies": { "bufferutil": "^4.0.1", "utf-8-validate": ">=5.0.2" }, "optionalPeers": ["bufferutil", "utf-8-validate"] }, "sha512-201TZ/kPWxoPr/OKWjquZR1SWKXcvxdH+e1xrx89b3YbmzLMFCLfnaG1HFIgWzJOEWZ7MvpK++odZufgYR50Rw=="],

    "y18n": ["y18n@5.0.8", "", {}, "sha512-0pfFzegeDWJHJIAmTLRP2DwHjdF5s7jo9tuztdQxAhINCdvS+3nGINqPd00AphqJR/0LhANUS6/+7SCb98YOfA=="],

    "yallist": ["yallist@3.1.1", "", {}, "sha512-a4UGQaWPH59mOXUYnAG2ewncQS4i4F43Tv3JoAM+s2VDAmS9NsK8GpDMLrCHPksFT7h3K6TOoUNn2pb7RoXx4g=="],

    "yargs": ["yargs@17.7.3", "", { "dependencies": { "cliui": "^8.0.1", "escalade": "^3.1.1", "get-caller-file": "^2.0.5", "require-directory": "^2.1.1", "string-width": "^4.2.3", "y18n": "^5.0.5", "yargs-parser": "^21.1.1" } }, "sha512-GZtjxm/J/4TSxuL3FNYjCmLktBTnIw/rVmKSIyKeYAZpmJB2ig9VauCC5xsa82GNKVKDAqpOn3KVzNt0zmrU0g=="],

    "yargs-parser": ["yargs-parser@21.1.1", "", {}, "sha512-tVpsJW7DdjecAiFpbIB1e3qxIQsE6NoPc5/eTdrbbIC4h0LVsWhnoa3g+m2HclBIujHzsxZ4VJVA+GUuc2/LBw=="],

    "@babel/core/debug": ["debug@4.4.3", "", { "dependencies": { "ms": "^2.1.3" }, "peerDependencies": { "supports-color": "*" }, "optionalPeers": ["supports-color"] }, "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA=="],

    "@babel/traverse/debug": ["debug@4.4.3", "", { "dependencies": { "ms": "^2.1.3" }, "peerDependencies": { "supports-color": "*" }, "optionalPeers": ["supports-color"] }, "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA=="],

    "@grpc/grpc-js/@types/node": ["@types/node@26.4.1", "", { "dependencies": { "undici-types": "~8.3.0" } }, "sha512-k97ENvZWtvA6yqz5/FS6a7duDgOPEeOQOc2iKS/nY6mX6qJUKtLnWzQS+Xj6tXweyj6ZcTAK2Qecetnvi9nCLA=="],

    "@tailwindcss/oxide-wasm32-wasi/@emnapi/core": ["@emnapi/core@1.11.3", "", { "dependencies": { "@emnapi/wasi-threads": "1.2.3", "tslib": "^2.4.0" }, "bundled": true }, "sha512-zLpS5asjEb7lq8jYLq37N6XKaE41DIexlY1rF/z4/tIl3wo13Sqm28fRyfIsKZD+NZ8mM5RoKkpW/rBcuoSZSg=="],

    "@tailwindcss/oxide-wasm32-wasi/@emnapi/runtime": ["@emnapi/runtime@1.11.3", "", { "dependencies": { "tslib": "^2.4.0" }, "bundled": true }, "sha512-Xz4Tpyki7XyrpbUK1jR1AhdAdaXyhhY4lZ3neLodmhpuWfy2PAQN5B46sAiU4liOXGLkHypn/qU+jvfWSCYYLA=="],

    "@tailwindcss/oxide-wasm32-wasi/@emnapi/wasi-threads": ["@emnapi/wasi-threads@1.2.3", "", { "dependencies": { "tslib": "^2.4.0" }, "bundled": true }, "sha512-ELEBe8PsLvvJ6QMr0zLt8ffvOHW/dc1m3CEzNMg7aJUv3bMaoDtw2TXyDAwkYBuroxxuHEwhRTLJSe5sya547g=="],

    "@tailwindcss/oxide-wasm32-wasi/@napi-rs/wasm-runtime": ["@napi-rs/wasm-runtime@1.2.3", "", { "dependencies": { "@tybys/wasm-util": "^0.10.3" }, "peerDependencies": { "@emnapi/core": "^1.7.1 || ^2.0.0-alpha.4", "@emnapi/runtime": "^1.7.1 || ^2.0.0-alpha.4" }, "bundled": true }, "sha512-UMduMbqO5s5zF2NkNacMT/yK5Y5QiKvWr2+50bzIIxFDwVJ2h49b+oyjaCGPhJxd2/gC2x39EHv/gHVuu36x2Q=="],

    "@tailwindcss/oxide-wasm32-wasi/@tybys/wasm-util": ["@tybys/wasm-util@0.10.3", "", { "dependencies": { "tslib": "^2.4.0" }, "bundled": true }, "sha512-F3fo1MYrRJYL3zER0OUOmkutjr1Vp23m7OsSgp7nq4SP6OqX6C/56XFIPAl5bt3zaBRjmW7SGz3u/6LwFpYcOg=="],

    "@tailwindcss/oxide-wasm32-wasi/tslib": ["tslib@2.8.1", "", { "bundled": true }, "sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w=="],

    "@types/body-parser/@types/node": ["@types/node@26.4.1", "", { "dependencies": { "undici-types": "~8.3.0" } }, "sha512-k97ENvZWtvA6yqz5/FS6a7duDgOPEeOQOc2iKS/nY6mX6qJUKtLnWzQS+Xj6tXweyj6ZcTAK2Qecetnvi9nCLA=="],

    "@types/connect/@types/node": ["@types/node@26.4.1", "", { "dependencies": { "undici-types": "~8.3.0" } }, "sha512-k97ENvZWtvA6yqz5/FS6a7duDgOPEeOQOc2iKS/nY6mX6qJUKtLnWzQS+Xj6tXweyj6ZcTAK2Qecetnvi9nCLA=="],

    "@types/express-serve-static-core/@types/node": ["@types/node@26.4.1", "", { "dependencies": { "undici-types": "~8.3.0" } }, "sha512-k97ENvZWtvA6yqz5/FS6a7duDgOPEeOQOc2iKS/nY6mX6qJUKtLnWzQS+Xj6tXweyj6ZcTAK2Qecetnvi9nCLA=="],

    "@types/send/@types/node": ["@types/node@26.4.1", "", { "dependencies": { "undici-types": "~8.3.0" } }, "sha512-k97ENvZWtvA6yqz5/FS6a7duDgOPEeOQOc2iKS/nY6mX6qJUKtLnWzQS+Xj6tXweyj6ZcTAK2Qecetnvi9nCLA=="],

    "@types/serve-static/@types/node": ["@types/node@26.4.1", "", { "dependencies": { "undici-types": "~8.3.0" } }, "sha512-k97ENvZWtvA6yqz5/FS6a7duDgOPEeOQOc2iKS/nY6mX6qJUKtLnWzQS+Xj6tXweyj6ZcTAK2Qecetnvi9nCLA=="],

    "@types/serve-static/@types/send": ["@types/send@0.17.6", "", { "dependencies": { "@types/mime": "^1", "@types/node": "*" } }, "sha512-Uqt8rPBE8SY0RK8JB1EzVOIZ32uqy8HwdxCnoCOsYrvnswqmFZ/k+9Ikidlk/ImhsdvBsloHbAlewb2IEBV/Og=="],

    "https-proxy-agent/debug": ["debug@4.4.3", "", { "dependencies": { "ms": "^2.1.3" }, "peerDependencies": { "supports-color": "*" }, "optionalPeers": ["supports-color"] }, "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA=="],

    "npm/@gar/promise-retry": ["@gar/promise-retry@1.0.3", "", {}, "sha512-GmzA9ckNokPypTg10pgpeHNQe7ph+iIKKmhKu3Ob9ANkswreCx7R3cKmY781K8QK3AqVL3xVh9A42JvIAbkkSA=="],

    "npm/@isaacs/fs-minipass": ["@isaacs/fs-minipass@4.0.1", "", { "dependencies": { "minipass": "^7.0.4" } }, "sha512-wgm9Ehl2jpeqP3zw/7mo3kRHFp5MEDhqAdwy1fTGkHAwnkGOVsgpvQhL8B5n1qlb01jV3n/bI0ZfZp5lWA1k4w=="],

    "npm/@isaacs/string-locale-compare": ["@isaacs/string-locale-compare@1.1.0", "", { "bundled": true }, "sha512-SQ7Kzhh9+D+ZW9MA0zkYv3VXhIDNx+LzM6EJ+/65I3QY+enU6Itte7E5XX7EWrqLW2FN4n06GWzBnPoC3th2aQ=="],

    "npm/@npmcli/agent": ["@npmcli/agent@4.0.2", "", { "dependencies": { "agent-base": "^7.1.0", "http-proxy-agent": "^7.0.0", "https-proxy-agent": "^7.0.1", "lru-cache": "^11.2.1", "socks-proxy-agent": "^8.0.3" } }, "sha512-EUEuWAxnL07Sp5/iC/1X6Xj+XThUvnbei9zfRWZdEXa7lss9RTHMhAHBeg+MZ5To9s/gGaSI+UwZTPdYMvKSeg=="],

    "npm/@npmcli/arborist": ["@npmcli/arborist@9.9.1", "", { "dependencies": { "@gar/promise-retry": "^1.0.0", "@isaacs/string-locale-compare": "^1.1.0", "@npmcli/fs": "^5.0.0", "@npmcli/installed-package-contents": "^4.0.0", "@npmcli/map-workspaces": "^5.0.0", "@npmcli/metavuln-calculator": "^9.0.2", "@npmcli/name-from-folder": "^4.0.0", "@npmcli/node-gyp": "^5.0.0", "@npmcli/package-json": "^7.0.0", "@npmcli/query": "^5.0.0", "@npmcli/redact": "^4.0.0", "@npmcli/run-script": "^10.0.0", "bin-links": "^6.0.0", "cacache": "^20.0.1", "common-ancestor-path": "^2.0.0", "hosted-git-info": "^9.0.0", "json-stringify-nice": "^1.1.4", "lru-cache": "^11.2.1", "minimatch": "^10.0.3", "nopt": "^9.0.0", "npm-install-checks": "^8.0.0", "npm-package-arg": "^13.0.0", "npm-pick-manifest": "^11.0.1", "npm-registry-fetch": "^19.0.0", "pacote": "^21.0.2", "parse-conflict-json": "^5.0.1", "proc-log": "^6.0.0", "proggy": "^4.0.0", "promise-all-reject-late": "^1.0.0", "promise-call-limit": "^3.0.1", "semver": "^7.3.7", "ssri": "^13.0.0", "treeverse": "^3.0.0", "walk-up-path": "^4.0.0" }, "bundled": true, "bin": { "arborist": "bin/index.js" } }, "sha512-K0mr16xJ/yiTApeGIFbpgZSvJFOvxO2VJnCBhP543t9NTlHzgL+ewpG0kaWv9xkjeESAlRWHG9Q4lbT/LqHbWw=="],

    "npm/@npmcli/config": ["@npmcli/config@10.12.0", "", { "dependencies": { "@npmcli/map-workspaces": "^5.0.0", "@npmcli/package-json": "^7.0.0", "ci-info": "^4.0.0", "ini": "^6.0.0", "nopt": "^9.0.0", "proc-log": "^6.0.0", "semver": "^7.3.5", "walk-up-path": "^4.0.0" }, "bundled": true }, "sha512-bFkLY3PFzHmRa0pFRU4DQIV86pYi5oWycE6umTwuRzJv8MZ3eiJxtIYfl3pfNQvuLsjONccxhs9IcMhP/tCEBg=="],

    "npm/@npmcli/fs": ["@npmcli/fs@5.0.0", "", { "dependencies": { "semver": "^7.3.5" }, "bundled": true }, "sha512-7OsC1gNORBEawOa5+j2pXN9vsicaIOH5cPXxoR6fJOmH6/EXpJB2CajXOu1fPRFun2m1lktEFX11+P89hqO/og=="],

    "npm/@npmcli/git": ["@npmcli/git@7.0.2", "", { "dependencies": { "@gar/promise-retry": "^1.0.0", "@npmcli/promise-spawn": "^9.0.0", "ini": "^6.0.0", "lru-cache": "^11.2.1", "npm-pick-manifest": "^11.0.1", "proc-log": "^6.0.0", "semver": "^7.3.5", "which": "^6.0.0" } }, "sha512-oeolHDjExNAJAnlYP2qzNjMX/Xi9bmu78C9dIGr4xjobrSKbuMYCph8lTzn4vnW3NjIqVmw/f8BCfouqyJXlRg=="],

    "npm/@npmcli/installed-package-contents": ["@npmcli/installed-package-contents@4.0.0", "", { "dependencies": { "npm-bundled": "^5.0.0", "npm-normalize-package-bin": "^5.0.0" }, "bin": { "installed-package-contents": "bin/index.js" } }, "sha512-yNyAdkBxB72gtZ4GrwXCM0ZUedo9nIbOMKfGjt6Cu6DXf0p8y1PViZAKDC8q8kv/fufx0WTjRBdSlyrvnP7hmA=="],

    "npm/@npmcli/map-workspaces": ["@npmcli/map-workspaces@5.0.3", "", { "dependencies": { "@npmcli/name-from-folder": "^4.0.0", "@npmcli/package-json": "^7.0.0", "glob": "^13.0.0", "minimatch": "^10.0.3" }, "bundled": true }, "sha512-o2grssXo1e774E5OtEwwrgoszYRh0lqkJH+Pb9r78UcqdGJRDRfhpM8DvZPjzNLLNYeD/rNbjOKM3Ss5UABROw=="],

    "npm/@npmcli/metavuln-calculator": ["@npmcli/metavuln-calculator@9.0.3", "", { "dependencies": { "cacache": "^20.0.0", "json-parse-even-better-errors": "^5.0.0", "pacote": "^21.0.0", "proc-log": "^6.0.0", "semver": "^7.3.5" }, "bundled": true }, "sha512-94GLSYhLXF2t2LAC7pDwLaM4uCARzxShyAQKsirmlNcpidH89VA4/+K1LbJmRMgz5gy65E/QBBWQdUvGLe2Frg=="],

    "npm/@npmcli/name-from-folder": ["@npmcli/name-from-folder@4.0.0", "", {}, "sha512-qfrhVlOSqmKM8i6rkNdZzABj8MKEITGFAY+4teqBziksCQAOLutiAxM1wY2BKEd8KjUSpWmWCYxvXr0y4VTlPg=="],

    "npm/@npmcli/node-gyp": ["@npmcli/node-gyp@5.0.0", "", {}, "sha512-uuG5HZFXLfyFKqg8QypsmgLQW7smiRjVc45bqD/ofZZcR/uxEjgQU8qDPv0s9TEeMUiAAU/GC5bR6++UdTirIQ=="],

    "npm/@npmcli/package-json": ["@npmcli/package-json@7.0.5", "", { "dependencies": { "@npmcli/git": "^7.0.0", "glob": "^13.0.0", "hosted-git-info": "^9.0.0", "json-parse-even-better-errors": "^5.0.0", "proc-log": "^6.0.0", "semver": "^7.5.3", "spdx-expression-parse": "^4.0.0" }, "bundled": true }, "sha512-iVuTlG3ORq2iaVa1IWUxAO/jIp77tUKBhoMjuzYW2kL4MLN1bi/ofqkZ7D7OOwh8coAx1/S2ge0rMdGv8sLSOQ=="],

    "npm/@npmcli/promise-spawn": ["@npmcli/promise-spawn@9.0.1", "", { "dependencies": { "which": "^6.0.0" }, "bundled": true }, "sha512-OLUaoqBuyxeTqUvjA3FZFiXUfYC1alp3Sa99gW3EUDz3tZ3CbXDdcZ7qWKBzicrJleIgucoWamWH1saAmH/l2Q=="],

    "npm/@npmcli/query": ["@npmcli/query@5.0.0", "", { "dependencies": { "postcss-selector-parser": "^7.0.0" } }, "sha512-8TZWfTQOsODpLqo9SVhVjHovmKXNpevHU0gO9e+y4V4fRIOneiXy0u0sMP9LmS71XivrEWfZWg50ReH4WRT4aQ=="],

    "npm/@npmcli/redact": ["@npmcli/redact@4.0.0", "", { "bundled": true }, "sha512-gOBg5YHMfZy+TfHArfVogwgfBeQnKbbGo3pSUyK/gSI0AVu+pEiDVcKlQb0D8Mg1LNRZILZ6XG8I5dJ4KuAd9Q=="],

    "npm/@npmcli/run-script": ["@npmcli/run-script@10.0.4", "", { "dependencies": { "@npmcli/node-gyp": "^5.0.0", "@npmcli/package-json": "^7.0.0", "@npmcli/promise-spawn": "^9.0.0", "node-gyp": "^12.1.0", "proc-log": "^6.0.0" }, "bundled": true }, "sha512-mGUWr1uMnf0le2TwfOZY4SFxZGXGfm4Jtay/nwAa2FLNAKXUoUwaGwBMNH36UHPtinWfTSJ3nqFQr0091CxVGg=="],

    "npm/@sigstore/bundle": ["@sigstore/bundle@4.0.0", "", { "dependencies": { "@sigstore/protobuf-specs": "^0.5.0" } }, "sha512-NwCl5Y0V6Di0NexvkTqdoVfmjTaQwoLM236r89KEojGmq/jMls8S+zb7yOwAPdXvbwfKDlP+lmXgAL4vKSQT+A=="],

    "npm/@sigstore/core": ["@sigstore/core@3.2.1", "", {}, "sha512-qRsxPnCrbC/puegGxKuynfnxgLiHqWStrSjxkoB4YKqq3Z3s4cyZyj42ZdWFAEblNP65C+rBH8EuREHIXoi83g=="],

    "npm/@sigstore/protobuf-specs": ["@sigstore/protobuf-specs@0.5.2", "", {}, "sha512-SQqvFMt4V78fdjcDdYX6HbiVSOR4QK3ZgwCa2KOsopAgPIHy1rU5UDUmzLl02r5oyyaYcYHR1hpwDRk/yUe+Mw=="],

    "npm/@sigstore/sign": ["@sigstore/sign@4.1.1", "", { "dependencies": { "@gar/promise-retry": "^1.0.2", "@sigstore/bundle": "^4.0.0", "@sigstore/core": "^3.2.0", "@sigstore/protobuf-specs": "^0.5.0", "make-fetch-happen": "^15.0.4", "proc-log": "^6.1.0" } }, "sha512-Hf4xglukg0XXQ2RiD5vSoLjdPe8OBUPA8XeVjUObheuDcWdYWrnH/BNmxZCzkAy68MzmNCxXLeurJvs6hcP2OQ=="],

    "npm/@sigstore/tuf": ["@sigstore/tuf@4.0.2", "", { "dependencies": { "@sigstore/protobuf-specs": "^0.5.0", "tuf-js": "^4.1.0" }, "bundled": true }, "sha512-TCAzTy0xzdP79EnxSjq9KQ3eaR7+FmudLC6eRKknVKZbV7ZNlGLClAAQb/HMNJ5n2OBNk2GT1tEmU0xuPr+SLQ=="],

    "npm/@sigstore/verify": ["@sigstore/verify@3.1.1", "", { "dependencies": { "@sigstore/bundle": "^4.0.0", "@sigstore/core": "^3.2.1", "@sigstore/protobuf-specs": "^0.5.0" } }, "sha512-qv7+G3J2cc6wwFj3yKvXOamzqhMwSk1ogPGmhpS8iXllcPrJaIIBA+4HbttlHVu1pqWTdmaCH/WE7UOC51kdoA=="],

    "npm/@tufjs/canonical-json": ["@tufjs/canonical-json@2.0.0", "", {}, "sha512-yVtV8zsdo8qFHe+/3kw81dSLyF7D576A5cCFCi4X7B39tWT7SekaEFUnvnWJHz+9qO7qJTah1JbrDjWKqFtdWA=="],

    "npm/@tufjs/models": ["@tufjs/models@4.1.0", "", { "dependencies": { "@tufjs/canonical-json": "2.0.0", "minimatch": "^10.1.1" } }, "sha512-Y8cK9aggNRsqJVaKUlEYs4s7CvQ1b1ta2DVPyAimb0I2qhzjNk+A+mxvll/klL0RlfuIUei8BF7YWiua4kQqww=="],

    "npm/abbrev": ["abbrev@4.0.0", "", { "bundled": true }, "sha512-a1wflyaL0tHtJSmLSOVybYhy22vRih4eduhhrkcjgrWGnRfrZtovJ2FRjxuTtkkj47O/baf0R86QU5OuYpz8fA=="],

    "npm/agent-base": ["agent-base@7.1.4", "", {}, "sha512-MnA+YT8fwfJPgBx3m60MNqakm30XOkyIoH1y6huTQvC0PwZG7ki8NacLBcrPbNoo8vEZy7Jpuk7+jMO+CUovTQ=="],

    "npm/aproba": ["aproba@2.1.0", "", {}, "sha512-tLIEcj5GuR2RSTnxNKdkK0dJ/GrC7P38sUkiDmDuHfsHmbagTFAxDVIBltoklXEVIQ/f14IL8IMJ5pn9Hez1Ew=="],

    "npm/archy": ["archy@1.0.0", "", { "bundled": true }, "sha512-Xg+9RwCg/0p32teKdGMPTPnVXKD0w3DfHnFTficozsAgsvq2XenPJq/MYpzzQ/v8zrOyJn6Ds39VA4JIDwFfqw=="],

    "npm/balanced-match": ["balanced-match@4.0.4", "", {}, "sha512-BLrgEcRTwX2o6gGxGOCNyMvGSp35YofuYzw9h1IMTRmKqttAZZVU67bdb9Pr2vUHA8+j3i2tJfjO6C6+4myGTA=="],

    "npm/bin-links": ["bin-links@6.0.2", "", { "dependencies": { "cmd-shim": "^8.0.0", "npm-normalize-package-bin": "^5.0.0", "proc-log": "^6.0.0", "read-cmd-shim": "^6.0.0", "write-file-atomic": "^7.0.0" } }, "sha512-frE1t78WOwJ45PKV2cF2tNPjTcs9L1J9s6VkrV59wanRP4GlaomuxYPVma7BwthMg8WnfSory4w5PTE6FZZ81w=="],

    "npm/binary-extensions": ["binary-extensions@3.1.0", "", {}, "sha512-Jvvd9hy1w+xUad8+ckQsWA/V1AoyubOvqn0aygjMOVM4BfIaRav1NFS3LsTSDaV4n4FtcCtQXvzep1E6MboqwQ=="],

    "npm/brace-expansion": ["brace-expansion@5.0.9", "", { "dependencies": { "balanced-match": "^4.0.2" } }, "sha512-ScQ4IuvIEF1TMlP7Zt+vjJ//9zlPb2SDcxWxM3bk8s6t6GGdJ7KO1dCcTidOPJKePW30LE/2cT7wCyPho9/Wxg=="],

    "npm/cacache": ["cacache@20.0.4", "", { "dependencies": { "@npmcli/fs": "^5.0.0", "fs-minipass": "^3.0.0", "glob": "^13.0.0", "lru-cache": "^11.1.0", "minipass": "^7.0.3", "minipass-collect": "^2.0.1", "minipass-flush": "^1.0.5", "minipass-pipeline": "^1.2.4", "p-map": "^7.0.2", "ssri": "^13.0.0" }, "bundled": true }, "sha512-M3Lab8NPYlZU2exsL3bMVvMrMqgwCnMWfdZbK28bn3pK6APT/Te/I8hjRPNu1uwORY9a1eEQoifXbKPQMfMTOA=="],

    "npm/chalk": ["chalk@5.6.2", "", { "bundled": true }, "sha512-7NzBL0rN6fMUW+f7A6Io4h40qQlG+xGmtMxfbnH/K7TAtt8JQWVQK+6g0UXKMeVJoyV5EkkNsErQ8pVD3bLHbA=="],

    "npm/chownr": ["chownr@3.0.0", "", {}, "sha512-+IxzY9BZOQd/XuYPRmrvEVjF/nqj5kgT4kEq7VofrDoM1MxoRjEWkrCC3EtLi59TVawxTAn+orJwFQcrqEN1+g=="],

    "npm/ci-info": ["ci-info@4.4.0", "", { "bundled": true }, "sha512-77PSwercCZU2Fc4sX94eF8k8Pxte6JAwL4/ICZLFjJLqegs7kCuAsqqj/70NQF6TvDpgFjkubQB2FW2ZZddvQg=="],

    "npm/cidr-regex": ["cidr-regex@5.0.5", "", {}, "sha512-59tdLZcC+BJXa4C5rOmVSuJTy/UneqfJJtCraqwdx5BDHTkGrBtKCUl3u2uiCFvXu+wk0kVuX8axX7yHCZOI9w=="],

    "npm/cmd-shim": ["cmd-shim@8.0.0", "", {}, "sha512-Jk/BK6NCapZ58BKUxlSI+ouKRbjH1NLZCgJkYoab+vEHUY3f6OzpNBN9u7HFSv9J6TRDGs4PLOHezoKGaFRSCA=="],

    "npm/common-ancestor-path": ["common-ancestor-path@2.0.0", "", {}, "sha512-dnN3ibLeoRf2HNC+OlCiNc5d2zxbLJXOtiZUudNFSXZrNSydxcCsSpRzXwfu7BBWCIfHPw+xTayeBvJCP/D8Ng=="],

    "npm/content-type": ["content-type@2.1.0", "", {}, "sha512-mj7UPXE0jaqaOsukNZRUEfEi2AcL7C/vwmwcHV0O97eO1E1pxBZuyjlZrx5seTaNBg1U6+o35wpa35Qfcc+7ag=="],

    "npm/cssesc": ["cssesc@3.0.0", "", { "bin": { "cssesc": "bin/cssesc" } }, "sha512-/Tb/JcjK111nNScGob5MNtsntNM1aCNUDipB/TkwZFhyDrrE47SOx/18wF2bbjgc3ZzCSKW1T5nt5EbFoAz/Vg=="],

    "npm/debug": ["debug@4.4.3", "", { "dependencies": { "ms": "^2.1.3" }, "peerDependencies": { "supports-color": "*" }, "optionalPeers": ["supports-color"] }, "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA=="],

    "npm/diff": ["diff@8.0.4", "", {}, "sha512-DPi0FmjiSU5EvQV0++GFDOJ9ASQUVFh5kD+OzOnYdi7n3Wpm9hWWGfB/O2blfHcMVTL5WkQXSnRiK9makhrcnw=="],

    "npm/env-paths": ["env-paths@2.2.1", "", {}, "sha512-+h1lkLKhZMTYjog1VEpJNG7NZJWcuc2DDk/qsqSTRRCOXiLjeQ1d1/udrUGhqMxUgAlwKNZ0cf2uqan5GLuS2A=="],

    "npm/exponential-backoff": ["exponential-backoff@3.1.3", "", {}, "sha512-ZgEeZXj30q+I0EN+CbSSpIyPaJ5HVQD18Z1m+u1FXbAeT94mr1zw50q4q6jiiC447Nl/YTcIYSAftiGqetwXCA=="],

    "npm/fastest-levenshtein": ["fastest-levenshtein@1.0.16", "", { "bundled": true }, "sha512-eRnCtTTtGZFpQCwhJiUOuxPQWRXVKYDn0b2PeHfXL6/Zi53SLAzAHfVhVWK2AryC/WH05kGfxhFIPvTF0SXQzg=="],

    "npm/fdir": ["fdir@6.5.0", "", { "peerDependencies": { "picomatch": "^3 || ^4" }, "optionalPeers": ["picomatch"] }, "sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg=="],

    "npm/fs-minipass": ["fs-minipass@3.0.3", "", { "dependencies": { "minipass": "^7.0.3" }, "bundled": true }, "sha512-XUBA9XClHbnJWSfBzjkm6RvPsyg3sryZt06BEQoXcF7EK/xpGaQYJgQKDJSUH5SGZ76Y7pFx1QBnXz09rU5Fbw=="],

    "npm/glob": ["glob@13.0.6", "", { "dependencies": { "minimatch": "^10.2.2", "minipass": "^7.1.3", "path-scurry": "^2.0.2" }, "bundled": true }, "sha512-Wjlyrolmm8uDpm/ogGyXZXb1Z+Ca2B8NbJwqBVg0axK9GbBeoS7yGV6vjXnYdGm6X53iehEuxxbyiKp8QmN4Vw=="],

    "npm/graceful-fs": ["graceful-fs@4.2.11", "", { "bundled": true }, "sha512-RbJ5/jmFcNNCcDV5o9eTnBLJ/HszWV0P73bc+Ff4nS/rJj+YaS6IGyiOL0VoBYX+l1Wrl3k63h/KrH+nhJ0XvQ=="],

    "npm/hosted-git-info": ["hosted-git-info@9.0.3", "", { "dependencies": { "lru-cache": "^11.1.0" }, "bundled": true }, "sha512-Hc+ghLoSt6QaYZUv0WBiIvmMDZuZZ7oaDvdH8MbfOO4lOsxdXLEvuC6ePoGs9H1X9oCLyq6+NVN0MKqD+ydxyg=="],

    "npm/http-cache-semantics": ["http-cache-semantics@4.2.0", "", {}, "sha512-dTxcvPXqPvXBQpq5dUr6mEMJX4oIEFv6bwom3FDwKRDsuIjjJGANqhBuoAn9c1RQJIdAKav33ED65E2ys+87QQ=="],

    "npm/http-proxy-agent": ["http-proxy-agent@7.0.2", "", { "dependencies": { "agent-base": "^7.1.0", "debug": "^4.3.4" } }, "sha512-T1gkAiYYDWYx3V5Bmyu7HcfcvL7mUrTWiM6yOfa3PIphViJ/gFPbvidQ+veqSOHci/PxBcDabeUNCzpOODJZig=="],

    "npm/https-proxy-agent": ["https-proxy-agent@7.0.6", "", { "dependencies": { "agent-base": "^7.1.2", "debug": "4" } }, "sha512-vK9P5/iUfdl95AI+JVyUuIcVtd4ofvtrOr3HNtM2yxC9bnMbEdp3x01OhQNnjb8IJYi38VlTE3mBXwcfvywuSw=="],

    "npm/iconv-lite": ["iconv-lite@0.7.3", "", { "dependencies": { "safer-buffer": ">= 2.1.2 < 3.0.0" } }, "sha512-IKXpvIzjnC9XTAUbVBcMfGS0EPaIXtW6v+zr+RRp+hqULEpo0owZax6wyRwPOJbWbzjYspQwusTsfVr0ifh4uQ=="],

    "npm/ignore-walk": ["ignore-walk@8.0.0", "", { "dependencies": { "minimatch": "^10.0.3" } }, "sha512-FCeMZT4NiRQGh+YkeKMtWrOmBgWjHjMJ26WQWrRQyoyzqevdaGSakUaJW5xQYmjLlUVk2qUnCjYVBax9EKKg8A=="],

    "npm/ini": ["ini@6.0.0", "", { "bundled": true }, "sha512-IBTdIkzZNOpqm7q3dRqJvMaldXjDHWkEDfrwGEQTs5eaQMWV+djAhR+wahyNNMAa+qpbDUhBMVt4ZKNwpPm7xQ=="],

    "npm/init-package-json": ["init-package-json@8.2.5", "", { "dependencies": { "@npmcli/package-json": "^7.0.0", "npm-package-arg": "^13.0.0", "promzard": "^3.0.1", "read": "^5.0.1", "semver": "^7.7.2", "validate-npm-package-name": "^7.0.0" }, "bundled": true }, "sha512-IknQ+upLuJU6t3p0uo9wS3GjFD/1GtxIwcIGYOWR8zL2HxQeJwvxYTgZr9brJ8pyZ4kvpkebM8ZKcyqOeLOHSg=="],

    "npm/ip-address": ["ip-address@10.7.0", "", {}, "sha512-BGFsyJd5mpXp3rK6jIdADLNgpJUK1jnjzvYF8lK+VyDab9JAmqN0YOKDdP17HlgKb2+ehPgDc8EtnRLbGCAMhA=="],

    "npm/is-cidr": ["is-cidr@6.0.4", "", { "dependencies": { "cidr-regex": "^5.0.4" }, "bundled": true }, "sha512-tOIBU3QiXy0W4LvHbcKWAWSuQfGwDiEILphFCAZtDqj7C57uv3ClO6K8aNEGV4VTA7bWJlpQ0suKQkUe6Rd6ag=="],

    "npm/isexe": ["isexe@4.0.0", "", {}, "sha512-FFUtZMpoZ8RqHS3XeXEmHWLA4thH+ZxCv2lOiPIn1Xc7CxrqhWzNSDzD+/chS/zbYezmiwWLdQC09JdQKmthOw=="],

    "npm/json-parse-even-better-errors": ["json-parse-even-better-errors@5.0.0", "", { "bundled": true }, "sha512-ZF1nxZ28VhQouRWhUcVlUIN3qwSgPuswK05s/HIaoetAoE/9tngVmCHjSxmSQPav1nd+lPtTL0YZ/2AFdR/iYQ=="],

    "npm/json-stringify-nice": ["json-stringify-nice@1.1.4", "", {}, "sha512-5Z5RFW63yxReJ7vANgW6eZFGWaQvnPE3WNmZoOJrSkGju2etKA2L5rrOa1sm877TVTFt57A80BH1bArcmlLfPw=="],

    "npm/jsonparse": ["jsonparse@1.3.1", "", {}, "sha512-POQXvpdL69+CluYsillJ7SUhKvytYjW9vG/GKpnf+xP8UWgYEM/RaMzHHofbALDiKbbP1W8UEYmgGl39WkPZsg=="],

    "npm/just-diff": ["just-diff@6.0.2", "", {}, "sha512-S59eriX5u3/QhMNq3v/gm8Kd0w8OS6Tz2FS1NG4blv+z0MuQcBRJyFWjdovM0Rad4/P4aUPFtnkNjMjyMlMSYA=="],

    "npm/just-diff-apply": ["just-diff-apply@5.5.0", "", {}, "sha512-OYTthRfSh55WOItVqwpefPtNt2VdKsq5AnAK6apdtR6yCH8pr0CmSr710J0Mf+WdQy7K/OzMy7K2MgAfdQURDw=="],

    "npm/libnpmaccess": ["libnpmaccess@10.0.3", "", { "dependencies": { "npm-package-arg": "^13.0.0", "npm-registry-fetch": "^19.0.0" }, "bundled": true }, "sha512-JPHTfWJxIK+NVPdNMNGnkz4XGX56iijPbe0qFWbdt68HL+kIvSzh+euBL8npLZvl2fpaxo+1eZSdoG15f5YdIQ=="],

    "npm/libnpmdiff": ["libnpmdiff@8.1.12", "", { "dependencies": { "@npmcli/arborist": "^9.9.1", "@npmcli/installed-package-contents": "^4.0.0", "binary-extensions": "^3.0.0", "diff": "^8.0.2", "minimatch": "^10.0.3", "npm-package-arg": "^13.0.0", "pacote": "^21.0.2", "tar": "^7.5.1" }, "bundled": true }, "sha512-KUa13B4mSoWjRFDwWGs3baFlKqu83PH7CZzMCId3lm8LC6cqtQWKV7dvLQVtwJmxNG9sj1GkHFvjWqazrvZHJw=="],

    "npm/libnpmexec": ["libnpmexec@10.3.2", "", { "dependencies": { "@gar/promise-retry": "^1.0.0", "@npmcli/arborist": "^9.9.1", "@npmcli/package-json": "^7.0.0", "@npmcli/run-script": "^10.0.0", "ci-info": "^4.0.0", "npm-package-arg": "^13.0.0", "pacote": "^21.0.2", "proc-log": "^6.0.0", "read": "^5.0.1", "semver": "^7.3.7", "signal-exit": "^4.1.0", "walk-up-path": "^4.0.0" }, "bundled": true }, "sha512-C3+w0EuDdnjK4YM9flqouHhV2WpY/5OsmRHlFjmnsZNfL8UYCVnXApAJxJjJG85Ai9vhlXAYeFby1dXBbgTWLg=="],

    "npm/libnpmfund": ["libnpmfund@7.0.26", "", { "dependencies": { "@npmcli/arborist": "^9.9.1" }, "bundled": true }, "sha512-BZzYSRJTcyw1TI6lIwHStvfy9z1mNxyhFcJkAuZ8oqxHJPR9hEnbQ+Mx5Y/Hnl5zDKa9ZtHuYWSZhjFiY5R2XA=="],

    "npm/libnpmorg": ["libnpmorg@8.0.1", "", { "dependencies": { "aproba": "^2.0.0", "npm-registry-fetch": "^19.0.0" }, "bundled": true }, "sha512-/QeyXXg4hqMw0ESM7pERjIT2wbR29qtFOWIOug/xO4fRjS3jJJhoAPQNsnHtdwnCqgBdFpGQ45aIdFFZx2YhTA=="],

    "npm/libnpmpack": ["libnpmpack@9.1.13", "", { "dependencies": { "@npmcli/arborist": "^9.9.1", "@npmcli/run-script": "^10.0.0", "npm-package-arg": "^13.0.0", "pacote": "^21.0.2" }, "bundled": true }, "sha512-IyqC8vJcvBYkr8x6n7iZ+dbg2B8Vx1Drx5qk5QsKUmfU6CLb3HaqdMg7Z9Mqh8NlVQcsRVqVlgiNBcHZuYTWfQ=="],

    "npm/libnpmpublish": ["libnpmpublish@11.2.0", "", { "dependencies": { "@npmcli/package-json": "^7.0.0", "ci-info": "^4.0.0", "npm-package-arg": "^13.0.0", "npm-registry-fetch": "^19.0.0", "proc-log": "^6.0.0", "semver": "^7.3.7", "sigstore": "^4.0.0", "ssri": "^13.0.0" }, "bundled": true }, "sha512-fAEts7UCM2r1xhI82Dv9PK4gFGZoyD7Z5sfIwBQKoO/f67VNVDC0DeH3uH1Yi+T4kwt5iBuCKkZ5XcpxfvsGHQ=="],

    "npm/libnpmsearch": ["libnpmsearch@9.0.1", "", { "dependencies": { "npm-registry-fetch": "^19.0.0" }, "bundled": true }, "sha512-oKw58X415ERY/BOGV3jQPVMcep8YeMRWMzuuqB0BAIM5VxicOU1tQt19ExCu4SV77SiTOEoziHxGEgJGw3FBYQ=="],

    "npm/libnpmteam": ["libnpmteam@8.0.2", "", { "dependencies": { "aproba": "^2.0.0", "npm-registry-fetch": "^19.0.0" }, "bundled": true }, "sha512-ypLrDUQoi8EhG+gzx5ENMcYq23YjPV17Mfvx4nOnQiHOi8vp47+4GvZBrMsEM4yeHPwxguF/HZoXH4rJfHdH/w=="],

    "npm/libnpmversion": ["libnpmversion@8.0.4", "", { "dependencies": { "@npmcli/git": "^7.0.0", "@npmcli/run-script": "^10.0.0", "json-parse-even-better-errors": "^5.0.0", "proc-log": "^6.0.0", "semver": "^7.3.7" }, "bundled": true }, "sha512-5NiNpLxXkNeLHCYVTLxX/qRgdAoRAjiR0arFdVpQ5kZOJ2b0pHdXS9G3qC7uiqVsLa/gfQQIbQIEPdmSMKXF2A=="],

    "npm/lru-cache": ["lru-cache@11.5.2", "", {}, "sha512-4pfM1Ff0x50o0tQwb5ucw/RzNyD0/YJME6IVcStalZuMWxdt3sR3huStTtxz4PUmvZfRguvDejasvQ2kifR11g=="],

    "npm/make-fetch-happen": ["make-fetch-happen@15.0.6", "", { "dependencies": { "@gar/promise-retry": "^1.0.0", "@npmcli/agent": "^4.0.0", "@npmcli/redact": "^4.0.0", "cacache": "^20.0.1", "http-cache-semantics": "^4.1.1", "minipass": "^7.0.2", "minipass-fetch": "^5.0.0", "minipass-flush": "^1.0.5", "minipass-pipeline": "^1.2.4", "negotiator": "^1.0.0", "proc-log": "^6.0.0", "ssri": "^13.0.0" }, "bundled": true }, "sha512-Je0fLJ0F5atA7F+eIlLzk+Wkcl57JDf4kf+EW8xiP5E31xOQxkIxTbgf1Oi1Lw9tRI9UEMRdI5Vz2xTzoNU1Jw=="],

    "npm/minimatch": ["minimatch@10.2.6", "", { "dependencies": { "brace-expansion": "^5.0.8" }, "bundled": true }, "sha512-vpLQEs+VLCr1nU0BXS07maYoFwlDAH0gngQuuttxIwutDFEMHq2blX+8vpgxDdK3J1PwjCJiep77OitTZ4Ll1A=="],

    "npm/minipass": ["minipass@7.1.3", "", { "bundled": true }, "sha512-tEBHqDnIoM/1rXME1zgka9g6Q2lcoCkxHLuc7ODJ5BxbP5d4c2Z5cGgtXAku59200Cx7diuHTOYfSBD8n6mm8A=="],

    "npm/minipass-collect": ["minipass-collect@2.0.1", "", { "dependencies": { "minipass": "^7.0.3" } }, "sha512-D7V8PO9oaz7PWGLbCACuI1qEOsq7UKfLotx/C0Aet43fCUB/wfQ7DYeq2oR/svFJGYDHPr38SHATeaj/ZoKHKw=="],

    "npm/minipass-fetch": ["minipass-fetch@5.0.2", "", { "dependencies": { "minipass": "^7.0.3", "minipass-sized": "^2.0.0", "minizlib": "^3.0.1" }, "optionalDependencies": { "iconv-lite": "^0.7.2" } }, "sha512-2d0q2a8eCi2IRg/IGubCNRJoYbA1+YPXAzQVRFmB45gdGZafyivnZ5YSEfo3JikbjGxOdntGFvBQGqaSMXlAFQ=="],

    "npm/minipass-flush": ["minipass-flush@1.0.7", "", { "dependencies": { "minipass": "^3.0.0" } }, "sha512-TbqTz9cUwWyHS2Dy89P3ocAGUGxKjjLuR9z8w4WUTGAVgEj17/4nhgo2Du56i0Fm3Pm30g4iA8Lcqctc76jCzA=="],

    "npm/minipass-pipeline": ["minipass-pipeline@1.2.4", "", { "dependencies": { "minipass": "^3.0.0" }, "bundled": true }, "sha512-xuIq7cIOt09RPRJ19gdi4b+RiNvDFYe5JH+ggNvBqGqpQXcru3PcRmOZuHBKWK1Txf9+cQ+HMVN4d6z46LZP7A=="],

    "npm/minipass-sized": ["minipass-sized@2.0.0", "", { "dependencies": { "minipass": "^7.1.2" } }, "sha512-zSsHhto5BcUVM2m1LurnXY6M//cGhVaegT71OfOXoprxT6o780GZd792ea6FfrQkuU4usHZIUczAQMRUE2plzA=="],

    "npm/minizlib": ["minizlib@3.1.0", "", { "dependencies": { "minipass": "^7.1.2" } }, "sha512-KZxYo1BUkWD2TVFLr0MQoM8vUUigWD3LlD83a/75BqC+4qE0Hb1Vo5v1FgcfaNXvfXzr+5EhQ6ing/CaBijTlw=="],

    "npm/ms": ["ms@2.1.3", "", { "bundled": true }, "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA=="],

    "npm/mute-stream": ["mute-stream@3.0.0", "", {}, "sha512-dkEJPVvun4FryqBmZ5KhDo0K9iDXAwn08tMLDinNdRBNPcYEDiWYysLcc6k3mjTMlbP9KyylvRpd4wFtwrT9rw=="],

    "npm/negotiator": ["negotiator@1.1.0", "", { "dependencies": { "content-type": "^2.1.0" } }, "sha512-NMPBRMJgiQHjbd8phG3Vebdx4kZ1H121rbl5IkMqeOsahptB9BKo/d7oJ3zTXqTgagn2bWlNSXkh0QUGM31RYg=="],

    "npm/node-gyp": ["node-gyp@12.4.0", "", { "dependencies": { "env-paths": "^2.2.0", "exponential-backoff": "^3.1.1", "graceful-fs": "^4.2.6", "nopt": "^9.0.0", "proc-log": "^6.0.0", "semver": "^7.3.5", "tar": "^7.5.4", "tinyglobby": "^0.2.12", "undici": "^6.25.0", "which": "^6.0.0" }, "bundled": true, "bin": { "node-gyp": "bin/node-gyp.js" } }, "sha512-OMcPNvqTCFUnNaBlmdgq+lfNqY7gTiSmNRDjY3uAXRyudeKZEZxu3CLtjMQrx4zZxCX2b/mpNqTtwuCJgXhHkw=="],

    "npm/nopt": ["nopt@9.0.0", "", { "dependencies": { "abbrev": "^4.0.0" }, "bundled": true, "bin": { "nopt": "bin/nopt.js" } }, "sha512-Zhq3a+yFKrYwSBluL4H9XP3m3y5uvQkB/09CwDruCiRmR/UJYnn9W4R48ry0uGC70aeTPKLynBtscP9efFFcPw=="],

    "npm/npm-audit-report": ["npm-audit-report@7.0.0", "", { "bundled": true }, "sha512-bluLL4xwGr/3PERYz50h2Upco0TJMDcLcymuFnfDWeGO99NqH724MNzhWi5sXXuXf2jbytFF0LyR8W+w1jTI6A=="],

    "npm/npm-bundled": ["npm-bundled@5.0.0", "", { "dependencies": { "npm-normalize-package-bin": "^5.0.0" } }, "sha512-JLSpbzh6UUXIEoqPsYBvVNVmyrjVZ1fzEFbqxKkTJQkWBO3xFzFT+KDnSKQWwOQNbuWRwt5LSD6HOTLGIWzfrw=="],

    "npm/npm-install-checks": ["npm-install-checks@8.0.0", "", { "dependencies": { "semver": "^7.1.1" }, "bundled": true }, "sha512-ScAUdMpyzkbpxoNekQ3tNRdFI8SJ86wgKZSQZdUxT+bj0wVFpsEMWnkXP0twVe1gJyNF5apBWDJhhIbgrIViRA=="],

    "npm/npm-normalize-package-bin": ["npm-normalize-package-bin@5.0.0", "", {}, "sha512-CJi3OS4JLsNMmr2u07OJlhcrPxCeOeP/4xq67aWNai6TNWWbTrlNDgl8NcFKVlcBKp18GPj+EzbNIgrBfZhsag=="],

    "npm/npm-package-arg": ["npm-package-arg@13.0.2", "", { "dependencies": { "hosted-git-info": "^9.0.0", "proc-log": "^6.0.0", "semver": "^7.3.5", "validate-npm-package-name": "^7.0.0" }, "bundled": true }, "sha512-IciCE3SY3uE84Ld8WZU23gAPPV9rIYod4F+rc+vJ7h7cwAJt9Vk6TVsK60ry7Uj3SRS3bqRRIGuTp9YVlk6WNA=="],

    "npm/npm-packlist": ["npm-packlist@10.0.4", "", { "dependencies": { "ignore-walk": "^8.0.0", "proc-log": "^6.0.0" } }, "sha512-uMW73iajD8hiH4ZBxEV3HC+eTnppIqwakjOYuvgddnalIw2lJguKviK1pcUJDlIWm1wSJkchpDZDSVVsZEYRng=="],

    "npm/npm-pick-manifest": ["npm-pick-manifest@11.0.3", "", { "dependencies": { "npm-install-checks": "^8.0.0", "npm-normalize-package-bin": "^5.0.0", "npm-package-arg": "^13.0.0", "semver": "^7.3.5" }, "bundled": true }, "sha512-buzyCfeoGY/PxKqmBqn1IUJrZnUi1VVJTdSSRPGI60tJdUhUoSQFhs0zycJokDdOznQentgrpf8LayEHyyYlqQ=="],

    "npm/npm-profile": ["npm-profile@12.0.2", "", { "dependencies": { "npm-registry-fetch": "^19.0.0", "proc-log": "^6.1.0" }, "bundled": true }, "sha512-+OKkPvqvx83vRG8aIetzABI99e5uzZZ6HIS5zCr+oRPSuDL0Buk1KJh/LqyR0BuiWmLeDWGI77igNYipztLm1w=="],

    "npm/npm-registry-fetch": ["npm-registry-fetch@19.1.1", "", { "dependencies": { "@npmcli/redact": "^4.0.0", "jsonparse": "^1.3.1", "make-fetch-happen": "^15.0.0", "minipass": "^7.0.2", "minipass-fetch": "^5.0.0", "minizlib": "^3.0.1", "npm-package-arg": "^13.0.0", "proc-log": "^6.0.0" }, "bundled": true }, "sha512-TakBap6OM1w0H73VZVDf44iFXsOS3h+L4wVMXmbWOQroZgFhMch0juN6XSzBNlD965yIKvWg2dfu7NSiaYLxtw=="],

    "npm/npm-user-validate": ["npm-user-validate@4.0.0", "", { "bundled": true }, "sha512-TP+Ziq/qPi/JRdhaEhnaiMkqfMGjhDLoh/oRfW+t5aCuIfJxIUxvwk6Sg/6ZJ069N/Be6gs00r+aZeJTfS9uHQ=="],

    "npm/p-map": ["p-map@7.0.7", "", { "bundled": true }, "sha512-VaWRu2i4FJNRtiRWCuuQRgfQ1B7a6+gMSrO+3j0EQi/k0ULfS9kosRxGoiqwzIjZTDI02tGfk5mXXltLg6QtfQ=="],

    "npm/pacote": ["pacote@21.5.1", "", { "dependencies": { "@gar/promise-retry": "^1.0.0", "@npmcli/git": "^7.0.0", "@npmcli/installed-package-contents": "^4.0.0", "@npmcli/package-json": "^7.0.0", "@npmcli/promise-spawn": "^9.0.0", "@npmcli/run-script": "^10.0.0", "cacache": "^20.0.0", "fs-minipass": "^3.0.0", "minipass": "^7.0.2", "npm-package-arg": "^13.0.0", "npm-packlist": "^10.0.1", "npm-pick-manifest": "^11.0.1", "npm-registry-fetch": "^19.0.0", "proc-log": "^6.0.0", "sigstore": "^4.0.0", "ssri": "^13.0.0", "tar": "^7.4.3" }, "bundled": true, "bin": { "pacote": "bin/index.js" } }, "sha512-KvcJ9iy3crysCsgqc4+PknH/w6jkrp8JN36mpZBPwNaDRwTfMZD37YzRazNstiZUOhuF5pno9f78n9mEJBavwg=="],

    "npm/parse-conflict-json": ["parse-conflict-json@5.0.1", "", { "dependencies": { "json-parse-even-better-errors": "^5.0.0", "just-diff": "^6.0.0", "just-diff-apply": "^5.2.0" }, "bundled": true }, "sha512-ZHEmNKMq1wyJXNwLxyHnluPfRAFSIliBvbK/UiOceROt4Xh9Pz0fq49NytIaeaCUf5VR86hwQ/34FCcNU5/LKQ=="],

    "npm/path-scurry": ["path-scurry@2.0.2", "", { "dependencies": { "lru-cache": "^11.0.0", "minipass": "^7.1.2" } }, "sha512-3O/iVVsJAPsOnpwWIeD+d6z/7PmqApyQePUtCndjatj/9I5LylHvt5qluFaBT3I5h3r1ejfR056c+FCv+NnNXg=="],

    "npm/picomatch": ["picomatch@4.0.7", "", {}, "sha512-qcJu88Q2IWqJsDD529JKMdwGm/dvInW4HvQnRwiH9JtihJvzGOscDtHE3x1pBKeUOTysQ8kVmLnJ2kJu7yhcGA=="],

    "npm/postcss-selector-parser": ["postcss-selector-parser@7.1.6", "", { "dependencies": { "cssesc": "^3.0.0", "util-deprecate": "^1.0.2" } }, "sha512-7qASPzhKF2l2KLboRZux8CCTRMdGiV08vWmyKzPz22qZ7ZjQBOeY7rNzNoCLSUiftJ7HUq0GERHmxw/t0dCdMw=="],

    "npm/proc-log": ["proc-log@6.1.0", "", { "bundled": true }, "sha512-iG+GYldRf2BQ0UDUAd6JQ/RwzaQy6mXmsk/IzlYyal4A4SNFw54MeH4/tLkF4I5WoWG9SQwuqWzS99jaFQHBuQ=="],

    "npm/proggy": ["proggy@4.0.0", "", {}, "sha512-MbA4R+WQT76ZBm/5JUpV9yqcJt92175+Y0Bodg3HgiXzrmKu7Ggq+bpn6y6wHH+gN9NcyKn3yg1+d47VaKwNAQ=="],

    "npm/promise-all-reject-late": ["promise-all-reject-late@1.0.1", "", {}, "sha512-vuf0Lf0lOxyQREH7GDIOUMLS7kz+gs8i6B+Yi8dC68a2sychGrHTJYghMBD6k7eUcH0H5P73EckCA48xijWqXw=="],

    "npm/promise-call-limit": ["promise-call-limit@3.0.2", "", {}, "sha512-mRPQO2T1QQVw11E7+UdCJu7S61eJVWknzml9sC1heAdj1jxl0fWMBypIt9ZOcLFf8FkG995ZD7RnVk7HH72fZw=="],

    "npm/promzard": ["promzard@3.0.1", "", { "dependencies": { "read": "^5.0.0" } }, "sha512-M5mHhWh+Adz0BIxgSrqcc6GTCSconR7zWQV9vnOSptNtr6cSFlApLc28GbQhuN6oOWBQeV2C0bNE47JCY/zu3Q=="],

    "npm/qrcode-terminal": ["qrcode-terminal@0.12.0", "", { "bundled": true, "bin": { "qrcode-terminal": "./bin/qrcode-terminal.js" } }, "sha512-EXtzRZmC+YGmGlDFbXKxQiMZNwCLEO6BANKXG4iCtSIM0yqc/pappSx3RIKr4r0uh5JsBckOXeKrB3Iz7mdQpQ=="],

    "npm/read": ["read@5.0.1", "", { "dependencies": { "mute-stream": "^3.0.0" }, "bundled": true }, "sha512-+nsqpqYkkpet2UVPG8ZiuE8d113DK4vHYEoEhcrXBAlPiq6di7QRTuNiKQAbaRYegobuX2BpZ6QjanKOXnJdTA=="],

    "npm/read-cmd-shim": ["read-cmd-shim@6.0.0", "", {}, "sha512-1zM5HuOfagXCBWMN83fuFI/x+T/UhZ7k+KIzhrHXcQoeX5+7gmaDYjELQHmmzIodumBHeByBJT4QYS7ufAgs7A=="],

    "npm/safer-buffer": ["safer-buffer@2.1.2", "", {}, "sha512-YZo3K82SD7Riyi0E1EQPojLz7kpepnSQI9IyPbHHg1XXXevb5dJI7tpyN2ADxGcQbHG7vcyRHk0cbwqcQriUtg=="],

    "npm/semver": ["semver@7.8.5", "", { "bundled": true, "bin": { "semver": "bin/semver.js" } }, "sha512-Y7/KDsb8LjooZpwaqGyulO6DQlksgCncchHGk+sZIY4SBvUocMBEFH5Ur1fI4dV+Jvl0w6cjvucaIi40puRioA=="],

    "npm/signal-exit": ["signal-exit@4.1.0", "", {}, "sha512-bzyZ1e88w9O1iNJbKnOlvYTrWPDl46O1bG0D3XInv+9tkPrxrN8jUUTiFlDkkmKWgn1M6CfIA13SuGqOa9Korw=="],

    "npm/sigstore": ["sigstore@4.1.1", "", { "dependencies": { "@sigstore/bundle": "^4.0.0", "@sigstore/core": "^3.2.1", "@sigstore/protobuf-specs": "^0.5.0", "@sigstore/sign": "^4.1.1", "@sigstore/tuf": "^4.0.2", "@sigstore/verify": "^3.1.1" } }, "sha512-endqECJkfhozrXMK5ngu/UAA0xVcVEFdnHJCElGaExypjW+HK5i6zu3NteLoaX/iFbRUbC3+DjttQs0GARr+5w=="],

    "npm/smart-buffer": ["smart-buffer@4.2.0", "", {}, "sha512-94hK0Hh8rPqQl2xXc3HsaBoOXKV20MToPkcXvwbISWLEs+64sBq5kFgn2kJDHb1Pry9yrP0dxrCI9RRci7RXKg=="],

    "npm/socks": ["socks@2.8.10", "", { "dependencies": { "ip-address": "^10.1.1", "smart-buffer": "^4.2.0" } }, "sha512-e0VyvkVTwVYViNovRkZ9aodhxVlyoMn7eJhVUPxZ+eK9P/7CBkxvvsBOHqFPEH416726W8tLXXXjKwqgTErrCQ=="],

    "npm/socks-proxy-agent": ["socks-proxy-agent@8.0.5", "", { "dependencies": { "agent-base": "^7.1.2", "debug": "^4.3.4", "socks": "^2.8.3" } }, "sha512-HehCEsotFqbPW9sJ8WVYB6UbmIMv7kUUORIF2Nncq4VQvBfNBLibW9YZR5dlYCSUhwcD628pRllm7n+E+YTzJw=="],

    "npm/spdx-exceptions": ["spdx-exceptions@2.5.0", "", {}, "sha512-PiU42r+xO4UbUS1buo3LPJkjlO7430Xn5SVAhdpzzsPHsjbYVflnnFdATgabnLude+Cqu25p6N+g2lw/PFsa4w=="],

    "npm/spdx-expression-parse": ["spdx-expression-parse@4.0.0", "", { "dependencies": { "spdx-exceptions": "^2.1.0", "spdx-license-ids": "^3.0.0" }, "bundled": true }, "sha512-Clya5JIij/7C6bRR22+tnGXbc4VKlibKSVj2iHvVeX5iMW7s1SIQlqu699JkODJJIhh/pUu8L0/VLh8xflD+LQ=="],

    "npm/spdx-license-ids": ["spdx-license-ids@3.0.23", "", {}, "sha512-CWLcCCH7VLu13TgOH+r8p1O/Znwhqv/dbb6lqWy67G+pT1kHmeD/+V36AVb/vq8QMIQwVShJ6Ssl5FPh0fuSdw=="],

    "npm/ssri": ["ssri@13.0.1", "", { "dependencies": { "minipass": "^7.0.3" }, "bundled": true }, "sha512-QUiRf1+u9wPTL/76GTYlKttDEBWV1ga9ZXW8BG6kfdeyyM8LGPix9gROyg9V2+P0xNyF3X2Go526xKFdMZrHSQ=="],

    "npm/supports-color": ["supports-color@10.2.2", "", { "bundled": true }, "sha512-SS+jx45GF1QjgEXQx4NJZV9ImqmO2NPz5FNsIHrsDjh2YsHnawpan7SNQ1o8NuhrbHZy9AZhIoCUiCeaW/C80g=="],

    "npm/tar": ["tar@7.5.22", "", { "dependencies": { "@isaacs/fs-minipass": "^4.0.0", "chownr": "^3.0.0", "minipass": "^7.1.2", "minizlib": "^3.1.0", "yallist": "^5.0.0" }, "bundled": true }, "sha512-MFO/QzvtAOmJbkhOaCTvbGcFN9L9b+JunIsDwaKljSOdcLMea3NJ1k9Usz/rjdfSXTq4dfzfeS7W4p4YOAAHeA=="],

    "npm/text-table": ["text-table@0.2.0", "", { "bundled": true }, "sha512-N+8UisAXDGk8PFXP4HAzVR9nbfmVJ3zYLAWiTIoqC5v5isinhr+r5uaO8+7r3BMfuNIufIsA7RdpVgacC2cSpw=="],

    "npm/tiny-relative-date": ["tiny-relative-date@2.0.2", "", { "bundled": true }, "sha512-rGxAbeL9z3J4pI2GtBEoFaavHdO4RKAU54hEuOef5kfx5aPqiQtbhYktMOTL5OA33db8BjsDcLXuNp+/v19PHw=="],

    "npm/tinyglobby": ["tinyglobby@0.2.17", "", { "dependencies": { "fdir": "^6.5.0", "picomatch": "^4.0.4" } }, "sha512-wXR/dYpcqKmfWpEdZjiKJOwCNFndD0DMnrW/cYjVGttEkBfVgcLFHoNrlj47mjOVic9yyNu65alsgF4NQyTa2g=="],

    "npm/treeverse": ["treeverse@3.0.0", "", { "bundled": true }, "sha512-gcANaAnd2QDZFmHFEOF4k7uc1J/6a6z3DJMd/QwEyxLoKGiptJRwid582r7QIsFlFMIZ3SnxfS52S4hm2DHkuQ=="],

    "npm/tuf-js": ["tuf-js@4.1.0", "", { "dependencies": { "@tufjs/models": "4.1.0", "debug": "^4.4.3", "make-fetch-happen": "^15.0.1" } }, "sha512-50QV99kCKH5P/Vs4E2Gzp7BopNV+KzTXqWeaxrfu5IQJBOULRsTIS9seSsOVT8ZnGXzCyx55nYWAi4qJzpZKEQ=="],

    "npm/undici": ["undici@6.28.1", "", {}, "sha512-zWpdTVD54H48CIybL0rWQ3ukpb9d23wM7eH5RtfdmeP70cWHNjtfo7P4vZX+5CoDcO53J4Pu5uXp7lNfjc6DRA=="],

    "npm/util-deprecate": ["util-deprecate@1.0.2", "", {}, "sha512-EPD5q1uXyFxJpCrLnCc1nHnq3gOa6DZBocAIiI2TaSCA7VCJ1UJDMagCzIkXNsUYfD1daK//LTEQ8xiIbrHtcw=="],

    "npm/validate-npm-package-name": ["validate-npm-package-name@7.0.2", "", { "bundled": true }, "sha512-hVDIBwsRruT73PbK7uP5ebUt+ezEtCmzZz3F59BSr2F6OVFnJ/6h8liuvdLrQ88Xmnk6/+xGGuq+pG9WwTuy3A=="],

    "npm/walk-up-path": ["walk-up-path@4.0.0", "", {}, "sha512-3hu+tD8YzSLGuFYtPRb48vdhKMi0KQV5sn+uWr8+7dMEq/2G/dtLrdDinkLjqq5TIbIBjYJ4Ax/n3YiaW7QM8A=="],

    "npm/which": ["which@6.0.1", "", { "dependencies": { "isexe": "^4.0.0" }, "bundled": true, "bin": { "node-which": "bin/which.js" } }, "sha512-oGLe46MIrCRqX7ytPUf66EAYvdeMIZYn3WaocqqKZAxrBpkqHfL/qvTyJ/bTk5+AqHCjXmrv3CEWgy368zhRUg=="],

    "npm/write-file-atomic": ["write-file-atomic@7.0.1", "", { "dependencies": { "signal-exit": "^4.0.1" } }, "sha512-OTIk8iR8/aCRWBqvxrzxR0hgxWpnYBblY1S5hDWBQfk/VFmJwzmJgQFN3WsoUKHISv2eAwe+PpbUzyL1CKTLXg=="],

    "npm/yallist": ["yallist@5.0.0", "", {}, "sha512-YgvUTfwqyc7UXVMrB+SImsVYSmTS8X/tSrtdNZMImM+n7+QTriRXyXim0mBrTXNeqzVF0KWGgHPeiyViFFrNDw=="],

    "protobufjs/@types/node": ["@types/node@26.4.1", "", { "dependencies": { "undici-types": "~8.3.0" } }, "sha512-k97ENvZWtvA6yqz5/FS6a7duDgOPEeOQOc2iKS/nY6mX6qJUKtLnWzQS+Xj6tXweyj6ZcTAK2Qecetnvi9nCLA=="],

    "send/ms": ["ms@2.1.3", "", {}, "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA=="],

    "tsx/esbuild": ["esbuild@0.28.2", "", { "optionalDependencies": { "@esbuild/aix-ppc64": "0.28.2", "@esbuild/android-arm": "0.28.2", "@esbuild/android-arm64": "0.28.2", "@esbuild/android-x64": "0.28.2", "@esbuild/darwin-arm64": "0.28.2", "@esbuild/darwin-x64": "0.28.2", "@esbuild/freebsd-arm64": "0.28.2", "@esbuild/freebsd-x64": "0.28.2", "@esbuild/linux-arm": "0.28.2", "@esbuild/linux-arm64": "0.28.2", "@esbuild/linux-ia32": "0.28.2", "@esbuild/linux-loong64": "0.28.2", "@esbuild/linux-mips64el": "0.28.2", "@esbuild/linux-ppc64": "0.28.2", "@esbuild/linux-riscv64": "0.28.2", "@esbuild/linux-s390x": "0.28.2", "@esbuild/linux-x64": "0.28.2", "@esbuild/netbsd-arm64": "0.28.2", "@esbuild/netbsd-x64": "0.28.2", "@esbuild/openbsd-arm64": "0.28.2", "@esbuild/openbsd-x64": "0.28.2", "@esbuild/openharmony-arm64": "0.28.2", "@esbuild/sunos-x64": "0.28.2", "@esbuild/win32-arm64": "0.28.2", "@esbuild/win32-ia32": "0.28.2", "@esbuild/win32-x64": "0.28.2" }, "bin": { "esbuild": "bin/esbuild" } }, "sha512-HKVLS8dvII+xoKW9kmqxbRKrnWEXfJJr/FZhhJmiqIB0e053QNYFqOBouTMO/k5sID4MvCiUCvv8b9M4h32wIA=="],

    "@babel/core/debug/ms": ["ms@2.1.3", "", {}, "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA=="],

    "@babel/traverse/debug/ms": ["ms@2.1.3", "", {}, "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA=="],

    "@grpc/grpc-js/@types/node/undici-types": ["undici-types@8.3.0", "", {}, "sha512-j375ScV60dom+YkPFIfTLcOiPxkN/buHz5GobjLhixFuANaNs3C9l4GmrWqejgXWJ7BbJcFYpTEUkS1Ge8bpZQ=="],

    "@types/body-parser/@types/node/undici-types": ["undici-types@8.3.0", "", {}, "sha512-j375ScV60dom+YkPFIfTLcOiPxkN/buHz5GobjLhixFuANaNs3C9l4GmrWqejgXWJ7BbJcFYpTEUkS1Ge8bpZQ=="],

    "@types/connect/@types/node/undici-types": ["undici-types@8.3.0", "", {}, "sha512-j375ScV60dom+YkPFIfTLcOiPxkN/buHz5GobjLhixFuANaNs3C9l4GmrWqejgXWJ7BbJcFYpTEUkS1Ge8bpZQ=="],

    "@types/express-serve-static-core/@types/node/undici-types": ["undici-types@8.3.0", "", {}, "sha512-j375ScV60dom+YkPFIfTLcOiPxkN/buHz5GobjLhixFuANaNs3C9l4GmrWqejgXWJ7BbJcFYpTEUkS1Ge8bpZQ=="],

    "@types/send/@types/node/undici-types": ["undici-types@8.3.0", "", {}, "sha512-j375ScV60dom+YkPFIfTLcOiPxkN/buHz5GobjLhixFuANaNs3C9l4GmrWqejgXWJ7BbJcFYpTEUkS1Ge8bpZQ=="],

    "@types/serve-static/@types/node/undici-types": ["undici-types@8.3.0", "", {}, "sha512-j375ScV60dom+YkPFIfTLcOiPxkN/buHz5GobjLhixFuANaNs3C9l4GmrWqejgXWJ7BbJcFYpTEUkS1Ge8bpZQ=="],

    "https-proxy-agent/debug/ms": ["ms@2.1.3", "", {}, "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA=="],

    "npm/minipass-flush/minipass": ["minipass@3.3.6", "", { "dependencies": { "yallist": "^4.0.0" } }, "sha512-DxiNidxSEK+tHG6zOIklvNOwm3hvCrbUrdtzY74U6HKTJxvIDfOUL5W5P2Ghd3DTkhhKPYGqeNUIh5qcM4YBfw=="],

    "npm/minipass-pipeline/minipass": ["minipass@3.3.6", "", { "dependencies": { "yallist": "^4.0.0" } }, "sha512-DxiNidxSEK+tHG6zOIklvNOwm3hvCrbUrdtzY74U6HKTJxvIDfOUL5W5P2Ghd3DTkhhKPYGqeNUIh5qcM4YBfw=="],

    "protobufjs/@types/node/undici-types": ["undici-types@8.3.0", "", {}, "sha512-j375ScV60dom+YkPFIfTLcOiPxkN/buHz5GobjLhixFuANaNs3C9l4GmrWqejgXWJ7BbJcFYpTEUkS1Ge8bpZQ=="],

    "tsx/esbuild/@esbuild/aix-ppc64": ["@esbuild/aix-ppc64@0.28.2", "", { "os": "aix", "cpu": "ppc64" }, "sha512-XExcO+dvLKvVtNTibSTBej1NCAbaGhWn9Ww1ZPx80qsahhPFe/8jgWP0IchNe0F3HwkU7n8ejhH8bjonqht8mQ=="],

    "tsx/esbuild/@esbuild/android-arm": ["@esbuild/android-arm@0.28.2", "", { "os": "android", "cpu": "arm" }, "sha512-kXXoiPVVGQcnIYGOeaovwOURpniDBpSq4A03qkQ+BMQqtGG6HYap3xne9C1O1yo4TR3qxlCX5IqqmX6fFo2Lqg=="],

    "tsx/esbuild/@esbuild/android-arm64": ["@esbuild/android-arm64@0.28.2", "", { "os": "android", "cpu": "arm64" }, "sha512-5YfKeeI8qWfBZIX+u2xZC3Zlb3Os/gLS2sbEKM+I4ZOcsWmHS2WLysCcQZDAFRslDUU5Oiq44gf6PYN1vGwG5A=="],

    "tsx/esbuild/@esbuild/android-x64": ["@esbuild/android-x64@0.28.2", "", { "os": "android", "cpu": "x64" }, "sha512-O387ite7SzUyCcy3JQX4P4bLtEA7bLLkx+esve5JHnyYfNTxcVpXZo9jhdB0lTKN44gztELTdU7nS8Nr16Fs1Q=="],

    "tsx/esbuild/@esbuild/darwin-arm64": ["@esbuild/darwin-arm64@0.28.2", "", { "os": "darwin", "cpu": "arm64" }, "sha512-n4KqkOQrraxHJcgjM1RvwbigfQKIKJVpM7xp+KsxiyUSrRdIXnt73VhrPAx0fV44hgfmIVKjxMN9J1t5jySVkw=="],

    "tsx/esbuild/@esbuild/darwin-x64": ["@esbuild/darwin-x64@0.28.2", "", { "os": "darwin", "cpu": "x64" }, "sha512-uq6suIWYP37qzGddBKPw5QEQPi6HiLGsO7UmkpfyaYNQ3D+rN6w6WfwH+nuqcGXWvawGwxOEroO4YGnFh95azw=="],

    "tsx/esbuild/@esbuild/freebsd-arm64": ["@esbuild/freebsd-arm64@0.28.2", "", { "os": "freebsd", "cpu": "arm64" }, "sha512-n+I0BTSRIoy+d6RPKnEVwql5UwBJolytvY4mAOIEJorKlqgPII8ix6slVVrfZ5Tnj7glIZvloylbB/EJPMWEXw=="],

    "tsx/esbuild/@esbuild/freebsd-x64": ["@esbuild/freebsd-x64@0.28.2", "", { "os": "freebsd", "cpu": "x64" }, "sha512-78XJTJkvPs0kz2w61301PJjXl4g7q3JqiYMZ/M/yVI73EHBrCRTgkhu9oqG7vPqq+a/yadEW8aD+agKlk5xrmg=="],

    "tsx/esbuild/@esbuild/linux-arm": ["@esbuild/linux-arm@0.28.2", "", { "os": "linux", "cpu": "arm" }, "sha512-XlDnu2q5yoqems+xay6wSAcg9DDD7K9RLKZEBOMZm3ckNpJBvOX20tSfby8KfrrhINDyv9V2YVZKY/SpoGJI8w=="],

    "tsx/esbuild/@esbuild/linux-arm64": ["@esbuild/linux-arm64@0.28.2", "", { "os": "linux", "cpu": "arm64" }, "sha512-pW4AC0P3it8c7do9MVM4p51FzHzdM/TZrerurgRcHJ2WTa1VQ1CIq18xncfpBJw4ojkiZZrKW2yIBWBP92j6Ug=="],

    "tsx/esbuild/@esbuild/linux-ia32": ["@esbuild/linux-ia32@0.28.2", "", { "os": "linux", "cpu": "ia32" }, "sha512-CYbnj78HsIeA+DhgUKgFCfvNsTHFhMMrinUrMZpDXJXKN8T3XViTZ/+wtHeVxEWY8ewSzTFN+nRmSwO2tZaLUQ=="],

    "tsx/esbuild/@esbuild/linux-loong64": ["@esbuild/linux-loong64@0.28.2", "", { "os": "linux", "cpu": "none" }, "sha512-buwkd8nsph4R+ajRvw0qM5Hja/TXQow3ptzWO2EbG/cqcIkHloRrdlBtQlshyYGTNFvfkfJ5tpPLVkY4DtsPfQ=="],

    "tsx/esbuild/@esbuild/linux-mips64el": ["@esbuild/linux-mips64el@0.28.2", "", { "os": "linux", "cpu": "none" }, "sha512-ZVykbDyk7519VwiNb9Lcj9m8XM6v5V9uKPvrEMkkEedVewf+0itkhahp4HDpgERXhwLRpWFypsGbG/J8s0QjJA=="],

    "tsx/esbuild/@esbuild/linux-ppc64": ["@esbuild/linux-ppc64@0.28.2", "", { "os": "linux", "cpu": "ppc64" }, "sha512-CAXl+Dtd9UUuJd8pKKdwh6MLm3MUMiqMPmhZ3tTSXPqfyQ3vDl6R5hZdZ/kYojK4ofXtdfSv1tFq8XzWx3heNQ=="],

    "tsx/esbuild/@esbuild/linux-riscv64": ["@esbuild/linux-riscv64@0.28.2", "", { "os": "linux", "cpu": "none" }, "sha512-GeXCej4IQtU1B+QlDV8W/RRvbzI3O/Stss+/bCXv4lZls5WGRtu2a+3JkA3i4qIUlMXpcHebWpF8AkJhATowuA=="],

    "tsx/esbuild/@esbuild/linux-s390x": ["@esbuild/linux-s390x@0.28.2", "", { "os": "linux", "cpu": "s390x" }, "sha512-3H1weTYZPxt/WOhByszQZybS9w5lKzUn1FDMsgEChbHWQwHYQQRfBxgCcZvPhjHfKyJjIievvMmEUawJrdY9Dg=="],

    "tsx/esbuild/@esbuild/linux-x64": ["@esbuild/linux-x64@0.28.2", "", { "os": "linux", "cpu": "x64" }, "sha512-4xTZr1FUmSoQW4XIWmit3tzQrUTZM+N3P0XV8xROKYF50XfI7xeO90+1bZvNwxIufQ9hDQVRJH5YhgPVF8A/HQ=="],

    "tsx/esbuild/@esbuild/netbsd-arm64": ["@esbuild/netbsd-arm64@0.28.2", "", { "os": "none", "cpu": "arm64" }, "sha512-sSATRjPeDBg3pdgHoQfoYBob11Kk1FGa9lui5RIHZCoCkJa9QKlvl3/vKz2usCmYYjs7ymJR/2Nnsqe+Hjt5nw=="],

    "tsx/esbuild/@esbuild/netbsd-x64": ["@esbuild/netbsd-x64@0.28.2", "", { "os": "none", "cpu": "x64" }, "sha512-lqnzCV+mM0gIADaKihiCg6ifgfU2L3h5E33rNQBN1Y4MaVGnzryzmvvf7UHxprpQdE8hpqLolJ9Rl+SkIRDpyw=="],

    "tsx/esbuild/@esbuild/openbsd-arm64": ["@esbuild/openbsd-arm64@0.28.2", "", { "os": "openbsd", "cpu": "arm64" }, "sha512-AL2qJILH7lNjrDmCQDvdxMfAUIv8KMNZOvrwAQ8i8//ntL9FflhOyMJ8OZSMBb8/AWXe3/5v5S20y3zCoZWKoQ=="],

    "tsx/esbuild/@esbuild/openbsd-x64": ["@esbuild/openbsd-x64@0.28.2", "", { "os": "openbsd", "cpu": "x64" }, "sha512-QtiuPytchRyC4rwUKhexJdQKvDuZ6hWloi3igqPQNUJCS1/v9EiO3UTOXR6A3FoMo4fnAKbWJdqaIwhOzh8qEw=="],

    "tsx/esbuild/@esbuild/openharmony-arm64": ["@esbuild/openharmony-arm64@0.28.2", "", { "os": "none", "cpu": "arm64" }, "sha512-WkhYDmpTjLvGlScA1rwjRUmhl4k8oXR3cIbtqWmELgU/dFeHHlEllxDvdWcNJV9rbzCexB5vz8gtNewWLgCT7Q=="],

    "tsx/esbuild/@esbuild/sunos-x64": ["@esbuild/sunos-x64@0.28.2", "", { "os": "sunos", "cpu": "x64" }, "sha512-GPMSkTOtMnv2U2F8gxe4Io6qmVs+YKyp832Etqqxr0hFngmXQ3rzwytelm3GIn7T4VviRUlf3sOgBOiTdvaf7g=="],

    "tsx/esbuild/@esbuild/win32-arm64": ["@esbuild/win32-arm64@0.28.2", "", { "os": "win32", "cpu": "arm64" }, "sha512-PIhhEkE9uPBleRBrQEJpUn7MBnibZzbGzYWPmY3x+YoVg/95zbjB4CxPPOQ8l5tYYM4mMaCthF8/1DIfBQQyWQ=="],

    "tsx/esbuild/@esbuild/win32-ia32": ["@esbuild/win32-ia32@0.28.2", "", { "os": "win32", "cpu": "ia32" }, "sha512-YmJbfTlvU7Sdn9BB+4PRES4oB6pxgS37MAONj+hBr/cpXS1aBPKXxNnDbu+QCWPj0o9dgyxeq79g6c5P8KeuYA=="],

    "tsx/esbuild/@esbuild/win32-x64": ["@esbuild/win32-x64@0.28.2", "", { "os": "win32", "cpu": "x64" }, "sha512-5ebpxr3nWMzrL/rnUI755Jkuee0bHL/Gq0WTF9lvcpv73wAp5eu8MfBUgWK9bhWvZjj7yX8etf/8tI8Ney695g=="],

    "npm/minipass-flush/minipass/yallist": ["yallist@4.0.0", "", {}, "sha512-3wdGidZyq5PB084XLES5TpOSRA3wjXAlIWMhum2kRcv/41Sn2emQ0dycQW4uZXLejwKvg6EsvbdlVL+FYEct7A=="],

    "npm/minipass-pipeline/minipass/yallist": ["yallist@4.0.0", "", {}, "sha512-3wdGidZyq5PB084XLES5TpOSRA3wjXAlIWMhum2kRcv/41Sn2emQ0dycQW4uZXLejwKvg6EsvbdlVL+FYEct7A=="],
  }
}

```

### FULL SOURCE FOR: `compile_notebooklm.py`
```python
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

```

### FULL SOURCE FOR: `index.html`
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fort Smith Scrap & Cleanup</title>
    <meta name="description" content="Simple dispatch portal for scrap metal, appliance removals, and general landfill cleanup hauling with live cost pricing estimation, PDF slip printing, and email crew dispatch." />
    <meta property="og:title" content="Fort Smith Scrap & Cleanup" />
    <meta property="og:description" content="Simple dispatch portal for scrap metal, appliance removals, and general landfill cleanup hauling with live cost pricing estimation, PDF slip printing, and email crew dispatch." />
    <link rel="icon" type="image/png" href="/assets/img/logo.png" />
    <script>
      // Capture and cancel third-party script errors or sandboxed iframe environment security exceptions
      window.addEventListener('error', function(e) {
        var isFb = e.filename && (e.filename.indexOf('facebook') !== -1 || e.filename.indexOf('fb') !== -1);
        if (e.message === 'Script error.' || !e.filename || isFb) {
          console.warn('Handled cross-origin iframe security error:', e.message, 'at', e.filename);
          e.preventDefault();
          e.stopPropagation();
          return true;
        }
      }, true);

      window.addEventListener('unhandledrejection', function(e) {
        var reasonStr = e.reason ? String(e.reason) : '';
        if (reasonStr.indexOf('facebook') !== -1 || reasonStr.indexOf('Script error') !== -1 || reasonStr.indexOf('FB') !== -1) {
          console.warn('Handled cross-origin promise rejection:', reasonStr);
          e.preventDefault();
          e.stopPropagation();
          return true;
        }
      }, true);
    </script>
  </head>
  <body class="bg-slate-50 text-slate-900 antialiased">
    <!-- Meta Facebook SDK setup -->
    <div id="fb-root"></div>
    <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js"></script>
    
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

```

### FULL SOURCE FOR: `scode.py`
```python
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

```

### FULL SOURCE FOR: `server.ts`
```typescript
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Increase payload limit for base64 photo uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Shared server-side Gemini client using the recommended modern SDK
  let ai: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }

  // 1. API Endpoint: Analyze junk image using Gemini
  app.post("/api/analyze-junk", async (req, res) => {
    try {
      const { image, mimeType } = req.body;
      if (!image || !mimeType) {
        return res.status(400).json({ error: "Missing image or mimeType parameters." });
      }

      if (!process.env.GEMINI_API_KEY || !ai) {
        console.log("[Gemini Image Scan] No GEMINI_API_KEY present, generating intelligent mock scan analysis.");
        return res.json({
          detectedItems: {
            mattress: 0,
            couch: 1,
            appliance: 0,
            tv_monitor: 0,
            tire: 0,
            yard_bag: 3
          },
          itemTags: [
            { name: "3-Cushion Fabric Sofa", quantity: 1, category: "Furniture", isHeavy: true },
            { name: "Heavy Contractor Bags", quantity: 3, category: "Trash", isHeavy: false },
            { name: "Scrap Lumber & Trim", quantity: 1, category: "Construction", isHeavy: false }
          ],
          loadType: "truck",
          truckLoadFraction: "1/2 Truck Bed",
          volumeCubicYards: 4.5,
          weightEstimate: "Medium (~650 lbs)",
          primaryDebrisType: "Household & Bulky Furniture",
          estimatedLaborHours: 2,
          crewRecommendation: "2-Person Lifting Crew",
          safetyFlags: ["Bulky sofa requires 2-person carry", "Curbside access available"],
          recyclableDetected: true,
          confidenceScore: 0.95,
          briefAnalysis: "AI scanner identified 1 large sofa, 3 contractor bags of debris, and scrap lumber. Suitable for standard heavy-duty truck bed.",
          suggestedDescription: "Curbside pickup of 1 three-cushion fabric sofa, 3 heavy-duty contractor trash bags, and assorted scrap wood boards. Easy truck access."
        });
      }

      const prompt = `You are an expert junk removal dispatcher and hazardous debris estimator for Titan Junk Removal in Fort Smith, Arkansas.
Carefully examine this photo of debris, scrap, trash, or discarded items and provide a thorough, professional assessment:

1. Identify specific landfill-tracked items:
   - mattress: count of mattresses / box springs (0 or more)
   - couch: count of sofas, sectionals, or recliners (0 or more)
   - appliance: count of refrigerators, washers, dryers, stoves (0 or more)
   - tv_monitor: count of televisions or computer monitors (0 or more)
   - tire: count of automotive or trailer tires (0 or more)
   - yard_bag: count of yard bags or contractor trash bags (0 or more)

2. Provide an itemized list of specific objects seen (itemTags) with item name, quantity, category (e.g., "Furniture", "Appliance", "Metal Scrap", "Construction", "Yard Waste", "Household", "Electronics"), and whether it is heavy (isHeavy: boolean).

3. Recommend the optimal haul vehicle: "truck" (standard 8-foot heavy-duty pickup bed up to 6 cubic yards) or "trailer" (large 14-foot dump trailer for >6 cubic yards or heavy renovation piles).

4. Estimate the truck load fraction (e.g., "1/4 Truck Bed", "1/2 Truck Bed", "Full Bed", "Requires 14-ft Dump Trailer").

5. Estimate volume in cubic yards (e.g. 1.5, 3.0, 5.5, 10.0).

6. Estimate weight category (e.g., "Light (< 400 lbs)", "Medium (400 - 1,000 lbs)", "Heavy (1,000+ lbs)").

7. Classify the primary debris type (e.g., "Furniture & Clutter", "Construction / Remodel", "Yard & Greenery", "Metal / Salvage").

8. Estimate labor hours needed for 2 people to lift, load, tarp, and sweep the area (integer between 1 and 8).

9. Recommend crew size & handling needs (e.g., "1-Person Quick Load", "2-Person Heavy Lifting Crew").

10. Note any safety flags or obstacles (e.g., "Glass or sharp edges present", "Requires 2-person lift", "Curbside easy access", "Freon appliance handling").

11. Note if any recyclable or scrap metal is detected (boolean).

12. Assign a confidence score between 0.80 and 0.99.

13. Provide a concise 1-2 sentence professional dispatch summary in "briefAnalysis".

14. Provide a clear, clean customer description in "suggestedDescription" ready for a work order ticket.

Return ONLY a valid JSON object matching the requested schema.`;

      const imagePart = {
        inlineData: {
          mimeType: mimeType,
          data: image,
        },
      };

      let modelName = "gemini-3.8-flash";
      let response;
      
      try {
        response = await ai.models.generateContent({
          model: modelName,
          contents: [imagePart, { text: prompt }],
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                detectedItems: {
                  type: Type.OBJECT,
                  properties: {
                    mattress: { type: Type.INTEGER },
                    couch: { type: Type.INTEGER },
                    appliance: { type: Type.INTEGER },
                    tv_monitor: { type: Type.INTEGER },
                    tire: { type: Type.INTEGER },
                    yard_bag: { type: Type.INTEGER },
                  },
                  required: ["mattress", "couch", "appliance", "tv_monitor", "tire", "yard_bag"],
                },
                itemTags: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      quantity: { type: Type.INTEGER },
                      category: { type: Type.STRING },
                      isHeavy: { type: Type.BOOLEAN },
                    },
                    required: ["name", "quantity", "category", "isHeavy"],
                  },
                },
                loadType: { type: Type.STRING },
                truckLoadFraction: { type: Type.STRING },
                volumeCubicYards: { type: Type.NUMBER },
                weightEstimate: { type: Type.STRING },
                primaryDebrisType: { type: Type.STRING },
                estimatedLaborHours: { type: Type.INTEGER },
                crewRecommendation: { type: Type.STRING },
                safetyFlags: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                recyclableDetected: { type: Type.BOOLEAN },
                confidenceScore: { type: Type.NUMBER },
                briefAnalysis: { type: Type.STRING },
                suggestedDescription: { type: Type.STRING },
              },
              required: [
                "detectedItems",
                "itemTags",
                "loadType",
                "truckLoadFraction",
                "volumeCubicYards",
                "weightEstimate",
                "primaryDebrisType",
                "estimatedLaborHours",
                "crewRecommendation",
                "safetyFlags",
                "recyclableDetected",
                "confidenceScore",
                "briefAnalysis",
                "suggestedDescription",
              ],
            },
          },
        });
      } catch (genErr: any) {
        console.warn("Primary model gemini-3.8-flash failed, falling back to gemini-2.5-flash:", genErr?.message);
        modelName = "gemini-2.5-flash";
        response = await ai.models.generateContent({
          model: modelName,
          contents: [imagePart, { text: prompt }],
          config: {
            responseMimeType: "application/json",
          },
        });
      }

      const text = response?.text;
      if (!text) {
        throw new Error("No response received from Gemini API.");
      }

      const result = JSON.parse(text.trim());
      return res.json(result);
    } catch (error: any) {
      console.error("Gemini Error:", error);
      return res.status(500).json({ error: error.message || "Failed to analyze photo" });
    }
  });

  // API Endpoint: Add booking to Google Calendar
  app.post("/api/add-to-calendar", async (req, res) => {
    try {
      const { title, description, date, timeSlot, address, clientName, accessToken } = req.body;
      
      if (!accessToken) {
        console.log(`[Google Calendar Simulation] Booking added for ${clientName} on ${date} (${timeSlot}) at ${address}`);
        return res.json({
          success: true,
          simulated: true,
          message: "Saved to local schedule. Connect Google Calendar via OAuth to write directly to your real calendar."
        });
      }

      // Calculate start and end times based on selected date and time slot
      // Morning is 8 AM to 12 PM, Afternoon is 12 PM to 4 PM
      const startHour = timeSlot === "morning" ? "08:00:00" : "12:00:00";
      const endHour = timeSlot === "morning" ? "12:00:00" : "16:00:00";
      
      const startDateTime = `${date}T${startHour}-05:00`; // Arkansas Central Time offset
      const endDateTime = `${date}T${endHour}-05:00`;

      const event = {
        summary: title || `Titan Junk Pick Up - ${clientName}`,
        location: address,
        description: `${description || "No description provided."}\n\nClient Name: ${clientName}\nTime Slot: ${timeSlot}`,
        start: {
          dateTime: startDateTime,
          timeZone: "America/Chicago"
        },
        end: {
          dateTime: endDateTime,
          timeZone: "America/Chicago"
        }
      };

      const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(event)
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error("Google Calendar API Error:", errText);
        throw new Error(`Google Calendar API response error: ${response.statusText}`);
      }

      const result = await response.json();
      return res.json({ success: true, eventId: result.id, message: "Successfully synced with Google Calendar!" });
    } catch (error: any) {
      console.error("Calendar Sync Error:", error);
      return res.status(500).json({ error: error.message || "Failed to sync event with Google Calendar." });
    }
  });

  // 2. API Endpoint: Create Stripe checkout session
  app.post("/api/create-checkout-session", async (req, res) => {
    try {
      const { items, total, contactEmail } = req.body;
      const stripeKey = process.env.STRIPE_SECRET_KEY;

      if (!stripeKey) {
        // If Stripe secret key is not set, we instruct the client to use our gorgeous high-fidelity checkout simulation
        return res.json({
          simulated: true,
          message: "Stripe key not configured. Using high-fidelity local checkout simulation.",
        });
      }

      const stripe = new Stripe(stripeKey, {
        apiVersion: "2025-02-18-preview" as any,
      });

      // Construct line items
      const lineItems = [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Fort Smith Scrap & Cleanup Dispatched Hauling Service",
              description: `Junk pickup & environmental landfill transfer. Items: ${items}`,
            },
            unit_amount: Math.round(total * 100), // Stripe expects cents
          },
          quantity: 1,
        },
      ];

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        customer_email: contactEmail || undefined,
        success_url: `${req.headers.origin}?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}?checkout=cancelled`,
      });

      return res.json({ id: session.id, url: session.url });
    } catch (error: any) {
      console.error("Stripe Session Error:", error);
      return res.status(500).json({ error: error.message || "Failed to initiate Stripe session" });
    }
  });

  // Serve static files / Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.use("/assets", express.static(path.join(process.cwd(), "public", "assets")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

```

### FULL SOURCE FOR: `vite.config.ts`
```typescript
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

```

### FULL SOURCE FOR: `public/_redirects`
```text
/* /index.html 200

```

### FULL SOURCE FOR: `public/checkout.css`
```css
* {
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}

form {
  width: 35vw;
  min-width: 500px;
  align-self: center;
  box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
    0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
  border-radius: 7px;
  padding: 40px;
  margin-top: auto;
  margin-bottom: auto;
  overflow: scroll;
}

.hidden {
  display: none;
}

#payment-message {
  color: #df1b41;
  font-size: 16px;
  line-height: 20px;
  padding-top: 12px;
  text-align: center;
}

#payment-element {
  margin-bottom: 24px;
  margin-top: 16px;
}

#email {
  border-radius: 5px;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(0, 0, 0, 0.02);
  display: block;
  margin-top: 0.25rem;
  padding: 0.75rem;
  background-color: #ffffff;
  color: #30313d;
  border: 1px solid #e5e5e5;
  height: 44px;
  transform: none;
  opacity: 1;
  position: inherit;
  outline: none;
  width: 100%;
}

#email:focus {
  border: 1px solid hsl(210, 96%, 45%);
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(0, 0, 0, 0.02), 0 0 0 3px rgba(5, 112, 222, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.08);
}

#email-errors {
  margin-top: 4px;
  color: #df1b41;
}

#email.error {
  color: #df1b41;
  border: 1px solid #df1b41;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(0, 0, 0, 0.02), 0 0 0 3px rgba(223, 27, 65, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.08);
}

/* Buttons and links */
button {
  background: #0055de;
  font-family: Arial, sans-serif;
  color: #ffffff;
  border-radius: 4px;
  border: 0;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: block;
  transition: all 0.2s ease;
  box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
  width: 100%;
}
button:hover {
  filter: contrast(115%);
}
button:disabled {
  opacity: 0.5;
  cursor: default;
}

/* spinner/processing state, errors */
.spinner,
.spinner:before,
.spinner:after {
  border-radius: 50%;
}
.spinner {
  color: #ffffff;
  font-size: 22px;
  text-indent: -99999px;
  margin: 0px auto;
  position: relative;
  width: 20px;
  height: 20px;
  box-shadow: inset 0 0 0 2px;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
.spinner:before,
.spinner:after {
  position: absolute;
  content: "";
}
.spinner:before {
  width: 10.4px;
  height: 20.4px;
  background: #0055de;
  border-radius: 20.4px 0 0 20.4px;
  top: -0.2px;
  left: -0.2px;
  -webkit-transform-origin: 10.4px 10.2px;
  transform-origin: 10.4px 10.2px;
  -webkit-animation: loading 2s infinite ease 1.5s;
  animation: loading 2s infinite ease 1.5s;
}
.spinner:after {
  width: 10.4px;
  height: 10.2px;
  background: #0055de;
  border-radius: 0 10.2px 10.2px 0;
  top: -0.1px;
  left: 10.2px;
  -webkit-transform-origin: 0px 10.2px;
  transform-origin: 0px 10.2px;
  -webkit-animation: loading 2s infinite ease;
  animation: loading 2s infinite ease;
}

@-webkit-keyframes loading {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes loading {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@media only screen and (max-width: 600px) {
  form {
    width: 80vw;
    min-width: initial;
  }
}
```

### FULL SOURCE FOR: `public/checkout.html`
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Accept a payment</title>
    <meta name="description" content="A demo of a payment on Stripe" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="checkout.css" />
    <script src="https://js.stripe.com/dahlia/stripe.js"></script>
    <script src="checkout.js" defer></script>
  </head>
  <body>
    <!-- Display a payment form -->
    <form id="payment-form">
      <div id="contact-details-element">
        <!--Stripe.js injects the Contact Details Element-->
      </div>
      <h4>Payment</h4>
      <div id="payment-element">
        <!--Stripe.js injects the Payment Element-->
      </div>
      <button id="submit">
        <div class="spinner hidden" id="spinner"></div>
        <span id="button-text">Pay now</span>
      </button>
      <div id="payment-message" class="hidden"></div>
    </form>
  </body>
</html>
```

### FULL SOURCE FOR: `public/checkout.js`
```javascript
// This is your test publishable API key.
const stripe = Stripe("pk_test_51Ts91gI9GutSRpy72t5pwhvk4AIh5DLZ0ND0LSHbJ1eZn35vDdkfUEkvdz7VMdfS7xn69ujjMqUQ6OKfUFynlIZh00WUbAWYTM");

let checkout;
let actions;
initialize();

document
  .querySelector("#payment-form")
  .addEventListener("submit", handleSubmit);

// Fetches a Checkout Session and captures the client secret
async function initialize() {
  const promise = fetch("/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  })
    .then((r) => r.json())
    .then((r) => r.clientSecret);

  const appearance = {
    theme: 'stripe',
  };

  checkout = stripe.initCheckoutElementsSdk({
    clientSecret: promise,
    elementsOptions: { appearance },
  });

  checkout.on('change', (session) => {
    // Handle changes to the checkout session
    document.getElementById('submit').disabled = !session.canConfirm;
  });

  const loadActionsResult = await checkout.loadActions();
  if (loadActionsResult.type === 'success') {
    actions = loadActionsResult.actions;
    const session = loadActionsResult.actions.getSession();
    document.querySelector("#button-text").textContent = `Pay ${
      session.total.total.amount
    } now`;
  }

  const contactDetailsElement = checkout.createContactDetailsElement();
  contactDetailsElement.mount("#contact-details-element");

  const paymentElement = checkout.createPaymentElement();
  paymentElement.mount("#payment-element");
}

async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);

  const confirmResult = await actions.confirm();

  // This point will only be reached if there is an immediate error when
  // confirming the payment. Otherwise, your customer will be redirected to
  // your `return_url`. For some payment methods like iDEAL, your customer will
  // be redirected to an intermediate site first to authorize the payment, then
  // redirected to the `return_url`.
  if (confirmResult.type === 'error') {
    showMessage(confirmResult.error.message);
  }

  setLoading(false);
}

// ------- UI helpers -------

function showMessage(messageText) {
  const messageContainer = document.querySelector("#payment-message");

  messageContainer.classList.remove("hidden");
  messageContainer.textContent = messageText;
}

// Show a spinner on payment submission
function setLoading(isLoading) {
  if (isLoading) {
    // Disable the button and show a spinner
    document.querySelector("#submit").disabled = true;
    document.querySelector("#spinner").classList.remove("hidden");
    document.querySelector("#button-text").classList.add("hidden");
  } else {
    document.querySelector("#submit").disabled = false;
    document.querySelector("#spinner").classList.add("hidden");
    document.querySelector("#button-text").classList.remove("hidden");
  }
}
```

### FULL SOURCE FOR: `public/complete.css`
```css
* {
    box-sizing: border-box;
  }

body {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  height: 100vh;
  width: 100vw;
}

form {
  width: 35vw;
  min-width: 500px;
  align-self: center;
  box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
    0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
  border-radius: 7px;
  padding: 40px;
  margin-top: auto;
  margin-bottom: auto;
  overflow: scroll;
}

/* Payment status page */
#payment-status {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    row-gap: 30px;
    width: 30vw;
    min-width: 500px;
    min-height: 380px;
    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
    opacity: 0;
    animation: fadeInAnimation 1s ease forwards;
  }

  #status-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }

  h2 {
    margin: 0;
    color: #30313D;
    text-align: center;
  }

  a {
    text-decoration: none;
    font-size: 16px;
    font-weight: 600;
    font-family: Arial, sans-serif;
    display: block;
  }
  a:hover {
    filter: contrast(120%);
  }

  #details-table {
    overflow-x: auto;
    width: 100%;
  }

  table {
    width: 100%;
    font-size: 14px;
    border-collapse: collapse;
  }
  table tbody tr:first-child td {
    border-top: 1px solid #E6E6E6; /* Top border */
    padding-top: 10px;
  }
  table tbody tr:last-child td {
    border-bottom: 1px solid #E6E6E6; /* Bottom border */
  }
  td {
    padding-bottom: 10px;
  }

  .TableContent {
    text-align: right;
    color: #6D6E78;
  }

  .TableLabel {
    font-weight: 600;
    color: #30313D;
  }

  #view-details {
    color: #0055DE;
  }

  #retry-button {
    text-align: center;
    background: #0055DE;
    color: #ffffff;
    border-radius: 4px;
    border: 0;
    padding: 12px 16px;
    transition: all 0.2s ease;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    width: 100%;
  }

  @-webkit-keyframes loading {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes loading {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes fadeInAnimation {
    to {
        opacity: 1;
    }
  }

  @media only screen and (max-width: 600px) {
    form, #payment-status{
      width: 80vw;
      min-width: initial;
    }
  }
```

### FULL SOURCE FOR: `public/complete.html`
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Order Status</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="complete.css" />
    <script src="https://js.stripe.com/dahlia/stripe.js"></script>
    <script src="complete.js" defer></script>
  </head>
  <body>
    <!-- Display the order status -->
    <div id="payment-status">
        <div id="status-icon"></div>
        <h2 id="status-text"></h2>
        <div id="details-table">
          <table>
            <tbody>
              <tr>
                <td class="TableLabel">Status</td>
                <td id="intent-status" class="TableContent"></td>
              </tr>
               <tr>
                <td class="TableLabel">Payment Intent ID</td>
                <td id="intent-id" class="TableContent"></td>
              </tr>
              <tr>
                <td class="TableLabel">Payment status</td>
                <td id="session-status" class="TableContent"></td>
              </tr>
              <tr>
                <td class="TableLabel">Payment Intent status</td>
                <td id="payment-intent-status" class="TableContent"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <a href="#" id="view-details" rel="noopener noreferrer" target="_blank">View details 
          <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.125 3.49998C2.64175 3.49998 2.25 3.89173 2.25 4.37498V11.375C2.25 11.8582 2.64175 12.25 3.125 12.25H10.125C10.6082 12.25 11 11.8582 11 11.375V9.62498C11 9.14173 11.3918 8.74998 11.875 8.74998C12.3582 8.74998 12.75 9.14173 12.75 9.62498V11.375C12.75 12.8247 11.5747 14 10.125 14H3.125C1.67525 14 0.5 12.8247 0.5 11.375V4.37498C0.5 2.92524 1.67525 1.74998 3.125 1.74998H4.875C5.35825 1.74998 5.75 2.14173 5.75 2.62498C5.75 3.10823 5.35825 3.49998 4.875 3.49998H3.125Z" fill="#0055DE"/>            <path d="M8.66672 0C8.18347 0 7.79172 0.391751 7.79172 0.875C7.79172 1.35825 8.18347 1.75 8.66672 1.75H11.5126L4.83967 8.42295C4.49796 8.76466 4.49796 9.31868 4.83967 9.66039C5.18138 10.0021 5.7354 10.0021 6.07711 9.66039L12.7501 2.98744V5.83333C12.7501 6.31658 13.1418 6.70833 13.6251 6.70833C14.1083 6.70833 14.5001 6.31658 14.5001 5.83333V0.875C14.5001 0.391751 14.1083 0 13.6251 0H8.66672Z" fill="#0055DE"/></svg>
        </a>
        <a id="retry-button" href="/checkout.html">Test another payment</a>
    </div>
  </body>
</html>
```

### FULL SOURCE FOR: `public/complete.js`
```javascript
// ------- UI Resources -------
const SuccessIcon =
`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0,2)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.4695 0.232963C15.8241 0.561287 15.8454 1.1149 15.5171 1.46949L6.14206 11.5945C5.97228 11.7778 5.73221 11.8799 5.48237 11.8748C5.23253 11.8698 4.99677 11.7582 4.83452 11.5681L0.459523 6.44311C0.145767 6.07557 0.18937 5.52327 0.556912 5.20951C0.924454 4.89575 1.47676 4.93936 1.79051 5.3069L5.52658 9.68343L14.233 0.280522C14.5613 -0.0740672 15.1149 -0.0953599 15.4695 0.232963Z" fill="white"/>
  </g>
</svg>`;

const ErrorIcon =
`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M1.25628 1.25628C1.59799 0.914573 2.15201 0.914573 2.49372 1.25628L8 6.76256L13.5063 1.25628C13.848 0.914573 14.402 0.914573 14.7437 1.25628C15.0854 1.59799 15.0854 2.15201 14.7437 2.49372L9.23744 8L14.7437 13.5063C15.0854 13.848 15.0854 14.402 14.7437 14.7437C14.402 15.0854 13.848 15.0854 13.5063 14.7437L8 9.23744L2.49372 14.7437C2.15201 15.0854 1.59799 15.0854 1.25628 14.7437C0.914573 14.402 0.914573 13.848 1.25628 13.5063L6.76256 8L1.25628 2.49372C0.914573 2.15201 0.914573 1.59799 1.25628 1.25628Z" fill="white"/>
</svg>`;

const InfoIcon =
`<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M10 1.5H4C2.61929 1.5 1.5 2.61929 1.5 4V10C1.5 11.3807 2.61929 12.5 4 12.5H10C11.3807 12.5 12.5 11.3807 12.5 10V4C12.5 2.61929 11.3807 1.5 10 1.5ZM4 0C1.79086 0 0 1.79086 0 4V10C0 12.2091 1.79086 14 4 14H10C12.2091 14 14 12.2091 14 10V4C14 1.79086 12.2091 0 10 0H4Z" fill="white"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.25 7C5.25 6.58579 5.58579 6.25 6 6.25H7.25C7.66421 6.25 8 6.58579 8 7V10.5C8 10.9142 7.66421 11.25 7.25 11.25C6.83579 11.25 6.5 10.9142 6.5 10.5V7.75H6C5.58579 7.75 5.25 7.41421 5.25 7Z" fill="white"/>
  <path d="M5.75 4C5.75 3.31075 6.31075 2.75 7 2.75C7.68925 2.75 8.25 3.31075 8.25 4C8.25 4.68925 7.68925 5.25 7 5.25C6.31075 5.25 5.75 4.68925 5.75 4Z" fill="white"/>
</svg>`;

// ------- UI helpers -------
function setSessionDetails(session) {
  let statusText = "Something went wrong, please try again.";
  let iconColor = "#DF1B41";
  let icon = ErrorIcon;


  if (!session) {
    console.log("No session found");
    setErrorState();
    return;
  }

  switch (session.status) {
    case "complete":
      statusText = "Payment succeeded";
      iconColor = "#30B130";
      icon = SuccessIcon;
      break;
    case "open":
      statusText = "Payment failed";
      iconColor = "#DF1B41";
      icon = ErrorIcon;
      break;
    default:
      break;
  }

  document.querySelector("#status-icon").style.backgroundColor = iconColor;
  document.querySelector("#status-icon").innerHTML = icon;
  document.querySelector("#status-text").textContent= statusText;
  document.querySelector("#intent-status").textContent = session.status;
  document.querySelector("#session-status").textContent = session.payment_status;
  if (session.payment_intent_id) {
    document.querySelector("#intent-id").textContent = session.payment_intent_id;
    document.querySelector("#payment-intent-status").textContent = session.payment_intent_status;
    document.querySelector("#view-details").href = `https://dashboard.stripe.com/payments/${session.payment_intent_id}`;
  } else if (session.subscription_id) {
    document.querySelector("#intent-id").closest("tr").querySelector("td").textContent = "Subscription ID";
    document.querySelector("#intent-id").textContent = session.subscription_id;
    document.querySelector("#payment-intent-status").closest("tr").querySelector("td").textContent = "Subscription Status";
    document.querySelector("#payment-intent-status").textContent = session.subscription_status;
    document.querySelector("#view-details").href = `https://dashboard.stripe.com/subscriptions/${session.subscription_id}`;
  } else {
    document.querySelector("#intent-id").closest("tr").classList.add("hidden");
    document.querySelector("#payment-intent-status").closest("tr").classList.add("hidden");
    document.querySelector("#view-details").classList.add("hidden");
  }
}

function setErrorState() {
  document.querySelector("#status-icon").style.backgroundColor = "#DF1B41";
  document.querySelector("#status-icon").innerHTML = ErrorIcon;
  document.querySelector("#status-text").textContent= "Something went wrong, please try again.";
  document.querySelector("#details-table").classList.add("hidden");
  document.querySelector("#view-details").classList.add("hidden");
}

initialize();

async function initialize() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const sessionId = urlParams.get("session_id");
  if (!sessionId) {
    console.log("No session ID found");
    setErrorState();
    return;
  }
  const response = await fetch(`/session-status?session_id=${sessionId}`);
  const session = await response.json();

  setSessionDetails(session);
}
```

### FULL SOURCE FOR: `public/data-deletion.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>User Data Deletion Instructions - River Valley Cleanup Crew</title>
  <link rel="icon" type="image/png" href="/assets/img/logo.png" />
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-50 text-slate-800 antialiased font-sans leading-relaxed">
  <div class="max-w-4xl mx-auto px-4 py-10 sm:py-16">
    <!-- Brand Header -->
    <div class="flex items-center space-x-3.5 border-b border-slate-200 pb-6 mb-8">
      <img src="/assets/img/logo.png" alt="River Valley Cleanup Crew" class="w-12 h-12 object-contain rounded-lg p-1 bg-slate-900 border border-[#ff6600]" />
      <div>
        <h1 class="text-2xl font-black uppercase text-slate-950 tracking-tight">River Valley <span class="text-[#ff6600]">Cleanup</span> Crew</h1>
        <p class="text-xs font-mono text-slate-500 font-bold uppercase">Fort Smith, Arkansas • Meta Facebook Data Deletion Instructions</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="prose prose-slate max-w-none space-y-6 text-sm sm:text-base">
      <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2">
        <p class="text-xs font-mono text-slate-400 font-bold uppercase">Meta Platform Policy Compliance (Section 4.f)</p>
        <p class="text-slate-600">
          In compliance with Meta Facebook Platform Policies, River Valley Cleanup Crew provides this automated guide for users who wish to remove the app from their Facebook account and request deletion of all associated data.
        </p>
      </div>

      <section class="space-y-3">
        <h2 class="text-lg font-black uppercase text-slate-900 border-l-4 border-[#ff6600] pl-3">Step-by-Step Instructions to Remove Facebook Access</h2>
        <ol class="list-decimal pl-6 space-y-2 text-slate-700">
          <li>Log in to your <strong>Facebook account</strong> on a web browser or the Facebook mobile app.</li>
          <li>Go to your Facebook profile <strong>Settings & Privacy</strong> &gt; <strong>Settings</strong>.</li>
          <li>Scroll down in the left navigation menu and select <strong>Apps and Websites</strong>.</li>
          <li>Locate <strong>River Valley Cleanup Crew</strong> in your list of connected applications.</li>
          <li>Click the <strong>Remove</strong> button next to River Valley Cleanup Crew.</li>
          <li>Check the box if prompted to delete all posts, videos, or events that River Valley Cleanup Crew may have accessed, and click <strong>Remove</strong> to confirm.</li>
        </ol>
      </section>

      <section class="space-y-3">
        <h2 class="text-lg font-black uppercase text-slate-900 border-l-4 border-[#ff6600] pl-3">Request Immediate Purge of Your Data from Our Systems</h2>
        <p class="text-slate-700">
          If you want our dispatch team to immediately purge your service quotes, tickets, uploaded debris photos, and customer contact records from our database, please contact our support team with your name, phone number, or ticket number:
        </p>
        <div class="bg-slate-100 p-4 rounded-lg border border-slate-200 text-sm font-mono text-slate-700 space-y-1">
          <p class="font-bold text-slate-900">Data Protection Officer - River Valley Cleanup Crew</p>
          <p>Email: <a href="mailto:dispatch@rivervalleycleanupcrew.com?subject=Facebook%20Data%20Deletion%20Request" class="text-[#ff6600] underline font-bold">dispatch@rivervalleycleanupcrew.com</a></p>
          <p>Phone: (479) 222-1311</p>
          <p class="text-xs text-slate-500 pt-1">Requests are verified and processed within 48 business hours.</p>
        </div>
      </section>
    </div>

    <!-- Back to App Link -->
    <div class="mt-10 pt-6 border-t border-slate-200 flex justify-between items-center text-xs font-mono">
      <a href="/" class="bg-[#ff6600] hover:bg-orange-600 text-black font-black uppercase px-4 py-2 rounded-lg transition-colors">
        ← Back to Booking App
      </a>
      <span class="text-slate-400">© 2026 River Valley Cleanup Crew</span>
    </div>
  </div>
</body>
</html>

```

### FULL SOURCE FOR: `public/privacy.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Privacy Policy - River Valley Cleanup Crew</title>
  <link rel="icon" type="image/png" href="/assets/img/logo.png" />
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-50 text-slate-800 antialiased font-sans leading-relaxed">
  <div class="max-w-4xl mx-auto px-4 py-10 sm:py-16">
    <!-- Brand Header -->
    <div class="flex items-center space-x-3.5 border-b border-slate-200 pb-6 mb-8">
      <img src="/assets/img/logo.png" alt="River Valley Cleanup Crew" class="w-12 h-12 object-contain rounded-lg p-1 bg-slate-900 border border-[#ff6600]" />
      <div>
        <h1 class="text-2xl font-black uppercase text-slate-950 tracking-tight">River Valley <span class="text-[#ff6600]">Cleanup</span> Crew</h1>
        <p class="text-xs font-mono text-slate-500 font-bold uppercase">Fort Smith, Arkansas • Official Privacy Policy</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="prose prose-slate max-w-none space-y-6 text-sm sm:text-base">
      <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2">
        <p class="text-xs font-mono text-slate-400 font-bold uppercase">Effective Date: September 2026</p>
        <p class="text-slate-600">
          River Valley Cleanup Crew ("we," "our," or "us") operates the junk removal, cleanout estimator, and dispatch scheduling application located in Fort Smith, Arkansas. This Privacy Policy informs users of our policies regarding the collection, use, and disclosure of personal data when you interact with our website, use our debris estimation tools, or book hauling services.
        </p>
      </div>

      <section class="space-y-3">
        <h2 class="text-lg font-black uppercase text-slate-900 border-l-4 border-[#ff6600] pl-3">1. Information We Collect</h2>
        <p>We only collect information necessary to provide accurate junk removal estimates, dispatch our hauling crew, and communicate service statuses:</p>
        <ul class="list-disc pl-6 space-y-1 text-slate-700">
          <li><strong>Contact Details:</strong> Your name, phone number, physical pickup address in the Fort Smith / River Valley region, and email address.</li>
          <li><strong>Authentication Information:</strong> When signing in via Google or Facebook Login, we receive your public profile identifier, name, and primary email address as authorized by your OAuth permissions.</li>
          <li><strong>Debris Uploads & Manifests:</strong> Photographs or descriptions of junk and waste you submit to help calculate truck or trailer capacity.</li>
          <li><strong>Payment Information:</strong> Credit card transactions are processed directly through certified PCI-compliant providers (such as Stripe). We do not store full credit card numbers on our servers.</li>
        </ul>
      </section>

      <section class="space-y-3">
        <h2 class="text-lg font-black uppercase text-slate-900 border-l-4 border-[#ff6600] pl-3">2. How We Use Your Information</h2>
        <p>Your information is used strictly to fulfill junk removal and estate cleanout operations:</p>
        <ul class="list-disc pl-6 space-y-1 text-slate-700">
          <li>To calculate accurate distance, mileage, and volume estimates based on Sebastian County landfill rates.</li>
          <li>To dispatch our Dodge Ram 2500 heavy-duty pickup and tandem utility trailer to your location.</li>
          <li>To provide real-time SMS or phone updates regarding crew arrival, on-site progress, and completion receipts.</li>
          <li>To maintain service tickets for warranty, disposal documentation, and municipal recycling records.</li>
        </ul>
      </section>

      <section class="space-y-3">
        <h2 class="text-lg font-black uppercase text-slate-900 border-l-4 border-[#ff6600] pl-3">3. No Sale of Personal Data</h2>
        <p class="text-slate-700">
          We will never sell, rent, or trade your personal information to third parties, advertisers, or data brokers. Your data is solely used to facilitate your requested junk removal service.
        </p>
      </section>

      <section class="space-y-3">
        <h2 class="text-lg font-black uppercase text-slate-900 border-l-4 border-[#ff6600] pl-3">4. Third-Party Service Providers</h2>
        <p>We work with trusted partners to support client-side and cloud features:</p>
        <ul class="list-disc pl-6 space-y-1 text-slate-700">
          <li><strong>Meta (Facebook) & Google:</strong> For secure customer and operator single sign-on authentication.</li>
          <li><strong>Cloudflare Pages:</strong> For ultra-fast, SSL-encrypted static web hosting.</li>
          <li><strong>Stripe:</strong> For secure credit card tokenization and authorization.</li>
        </ul>
      </section>

      <section class="space-y-3">
        <h2 class="text-lg font-black uppercase text-slate-900 border-l-4 border-[#ff6600] pl-3">5. Data Retention & Deletion Rights</h2>
        <p class="text-slate-700">
          You have the right to request the deletion of your contact information, service history, and uploaded debris photos at any time. For automated instructions on deleting data linked through your Facebook account, please review our <a href="/data-deletion.html" class="text-[#ff6600] font-bold underline">Facebook Data Deletion Instructions</a>.
        </p>
      </section>

      <section class="space-y-3">
        <h2 class="text-lg font-black uppercase text-slate-900 border-l-4 border-[#ff6600] pl-3">6. Contact Us</h2>
        <div class="bg-slate-100 p-4 rounded-lg border border-slate-200 text-sm font-mono text-slate-700 space-y-1">
          <p class="font-bold text-slate-900">River Valley Cleanup Crew Operations</p>
          <p>Fort Smith & River Valley, Arkansas</p>
          <p>Phone: (479) 222-1311</p>
          <p>Email: <a href="mailto:dispatch@rivervalleycleanupcrew.com" class="text-[#ff6600] underline">dispatch@rivervalleycleanupcrew.com</a></p>
        </div>
      </section>
    </div>

    <!-- Back to App Link -->
    <div class="mt-10 pt-6 border-t border-slate-200 flex justify-between items-center text-xs font-mono">
      <a href="/" class="bg-[#ff6600] hover:bg-orange-600 text-black font-black uppercase px-4 py-2 rounded-lg transition-colors">
        ← Back to Booking App
      </a>
      <span class="text-slate-400">© 2026 River Valley Cleanup Crew</span>
    </div>
  </div>
</body>
</html>

```

### FULL SOURCE FOR: `public/terms.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Terms & Conditions - River Valley Cleanup Crew</title>
  <link rel="icon" type="image/png" href="/assets/img/logo.png" />
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-50 text-slate-800 antialiased font-sans leading-relaxed">
  <div class="max-w-4xl mx-auto px-4 py-10 sm:py-16">
    <!-- Brand Header -->
    <div class="flex items-center space-x-3.5 border-b border-slate-200 pb-6 mb-8">
      <img src="/assets/img/logo.png" alt="River Valley Cleanup Crew" class="w-12 h-12 object-contain rounded-lg p-1 bg-slate-900 border border-[#ff6600]" />
      <div>
        <h1 class="text-2xl font-black uppercase text-slate-950 tracking-tight">River Valley <span class="text-[#ff6600]">Cleanup</span> Crew</h1>
        <p class="text-xs font-mono text-slate-500 font-bold uppercase">Fort Smith, Arkansas • Terms & Conditions of Service</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="prose prose-slate max-w-none space-y-6 text-sm sm:text-base">
      <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2">
        <p class="text-xs font-mono text-slate-400 font-bold uppercase">Effective Date: September 2026</p>
        <p class="text-slate-600">
          These Terms & Conditions ("Agreement") govern junk removal, hauling, demolition sweep-outs, and estate cleanout services provided by River Valley Cleanup Crew in Fort Smith, Arkansas, and neighboring River Valley areas. By scheduling a service dispatch through our website or portal, you agree to the following terms.
        </p>
      </div>

      <section class="space-y-3">
        <h2 class="text-lg font-black uppercase text-slate-900 border-l-4 border-[#ff6600] pl-3">1. Scope of Work & Rig Capabilities</h2>
        <p class="text-slate-700">
          Our dispatch operations utilize our heavy-duty Dodge Ram 2500 pickup truck and tandem-axle utility flatbed trailer. Load types are estimated based on cubic volume and weight constraints compliant with Arkansas Department of Transportation regulations.
        </p>
      </section>

      <section class="space-y-3">
        <h2 class="text-lg font-black uppercase text-slate-900 border-l-4 border-[#ff6600] pl-3">2. Property Access & Right of Entry</h2>
        <p class="text-slate-700">
          The customer grants River Valley Cleanup Crew, its crew members, and vehicle equipment authorized right of entry onto the designated property, driveway, or cleanout structure at the scheduled date and time window. The customer agrees to provide unobstructed access, secure pets, and ensure clearance for our truck and trailer.
        </p>
      </section>

      <section class="space-y-3">
        <h2 class="text-lg font-black uppercase text-slate-900 border-l-4 border-[#ff6600] pl-3">3. Excluded & Hazardous Materials</h2>
        <p class="text-slate-700">
          In strict compliance with Sebastian County Environmental Ordinances and Arkansas Department of Environmental Quality (ADEQ) regulations, we <strong>cannot</strong> accept or transport:
        </p>
        <ul class="list-disc pl-6 space-y-1 text-slate-700">
          <li>Hazardous chemicals, wet paint cans, motor oils, fuels, or industrial solvents.</li>
          <li>Pressurized tanks, propane cylinders, or explosive/flammable materials.</li>
          <li>Friable asbestos or biohazardous/medical waste.</li>
        </ul>
        <p class="text-slate-600 text-xs italic">
          Automotive tires, freon-bearing cooling units, and large electronic screens may be subject to mandated municipal disposal surcharges.
        </p>
      </section>

      <section class="space-y-3">
        <h2 class="text-lg font-black uppercase text-slate-900 border-l-4 border-[#ff6600] pl-3">4. Estimates, Pricing, & Payment Terms</h2>
        <p class="text-slate-700">
          Estimates provided through our online tool are calculated from baseline item counts, mileage, and volume. If on-site inspection reveals substantially different volume, hazardous conditions, or weight overages, our crew lead will provide an amended on-site quote before loading begins.
        </p>
        <p class="text-slate-700">
          Payment is due upon completion of loading or via authorized card tokenization. We accept major credit cards and cash upon arrival.
        </p>
      </section>

      <section class="space-y-3">
        <h2 class="text-lg font-black uppercase text-slate-900 border-l-4 border-[#ff6600] pl-3">5. Disposal & Recycling Ownership</h2>
        <p class="text-slate-700">
          Upon loading onto our truck or trailer, all debris, scrap, and items become the responsibility of River Valley Cleanup Crew for lawful transport, salvage, donation, or landfill disposal at certified Arkansas facilities.
        </p>
      </section>

      <section class="space-y-3">
        <h2 class="text-lg font-black uppercase text-slate-900 border-l-4 border-[#ff6600] pl-3">6. Contact & Licensing Information</h2>
        <div class="bg-slate-100 p-4 rounded-lg border border-slate-200 text-sm font-mono text-slate-700 space-y-1">
          <p class="font-bold text-slate-900">River Valley Cleanup Crew</p>
          <p>Licensed Commercial Hauler • Insured Liability</p>
          <p>Fort Smith, Arkansas</p>
          <p>Dispatch Hotline: (479) 222-1311</p>
          <p>Email: <a href="mailto:dispatch@rivervalleycleanupcrew.com" class="text-[#ff6600] underline">dispatch@rivervalleycleanupcrew.com</a></p>
        </div>
      </section>
    </div>

    <!-- Back to App Link -->
    <div class="mt-10 pt-6 border-t border-slate-200 flex justify-between items-center text-xs font-mono">
      <a href="/" class="bg-[#ff6600] hover:bg-orange-600 text-black font-black uppercase px-4 py-2 rounded-lg transition-colors">
        ← Back to Booking App
      </a>
      <span class="text-slate-400">© 2026 River Valley Cleanup Crew</span>
    </div>
  </div>
</body>
</html>

```

### FULL SOURCE FOR: `src/index.css`
```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700;800&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Space Grotesk", sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
}

@media print {
  body {
    background: white !important;
    color: black !important;
    font-size: 14pt;
  }
  .no-print {
    display: none !important;
  }
  .print-only {
    display: block !important;
  }
  .print-container {
    box-shadow: none !important;
    border: none !important;
    padding: 0 !important;
    margin: 0 !important;
    width: 100% !important;
    max-width: 100% !important;
  }
}

.print-only {
  display: none;
}

@keyframes scanline {
  0% {
    top: 0%;
    opacity: 0.8;
  }
  50% {
    top: 96%;
    opacity: 1;
  }
  100% {
    top: 0%;
    opacity: 0.8;
  }
}

.animate-scanline {
  animation: scanline 2.2s ease-in-out infinite;
}


```

### FULL SOURCE FOR: `src/main.tsx`
```typescript
import React, { Component, ErrorInfo, ReactNode, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              !
            </div>
            <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
            <p className="text-slate-300 text-sm mb-4">
              {this.state.error?.message || "An unexpected error occurred while loading the application."}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="bg-[#ff6600] text-black font-bold px-4 py-2 rounded-lg text-sm hover:brightness-110 transition cursor-pointer"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);


```

### FULL SOURCE FOR: `src/types.ts`
```typescript
export interface ScrapItem {
  id: string;
  label: string;
  icon: string;
  category: 'appliance' | 'metal' | 'structure' | 'other';
}

export interface PickupRequest {
  ticketNumber: string;
  createdAt: string;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  locationOnProperty: string;
  preferredDate: string;
  preferredTimeWindow: 'morning' | 'afternoon' | 'anytime';
  selectedItems: { [id: string]: number }; // item id -> quantity or 1 for checked
  customItemDescription?: string;
  estimatedLoadSize: 'small' | 'medium' | 'large_trailer';
  specialInstructions: string;
  dispatchEmail: string;
  
  // Custom cleanup and cost calculations added for general cleanup service
  serviceType: 'scrap' | 'cleanup';
  distanceMiles: number;
  isUncovered: boolean;
  wasteType: 'trash' | 'yard' | 'special' | 'none';
  estimatedWeightTons: number;
  isResidentFLAT: boolean;
  truckMpg: number;
  gasPricePerGallon: number;
  baseLaborRate: number;
  calculatedGasCost: number;
  calculatedDumpFee: number;
  calculatedLaborFee: number;
  calculatedTotal: number;
}

export const SCRAP_ITEMS_CATALOG: ScrapItem[] = [
  { id: 'refrigerator', label: 'Refrigerator / Freezer', icon: 'Refrigerator', category: 'appliance' },
  { id: 'washer', label: 'Washing Machine', icon: 'WashingMachine', category: 'appliance' },
  { id: 'dryer', label: 'Clothes Dryer', icon: 'Wind', category: 'appliance' },
  { id: 'oven', label: 'Stove / Oven / Range', icon: 'Flame', category: 'appliance' },
  { id: 'dishwasher', label: 'Dishwasher', icon: 'Droplets', category: 'appliance' },
  { id: 'water_heater', label: 'Water Heater / Tank', icon: 'Gauge', category: 'appliance' },
  { id: 'ac_unit', label: 'A/C Unit / HVAC', icon: 'Snowflake', category: 'appliance' },
  { id: 'microwave', label: 'Microwave / Small Appliances', icon: 'Zap', category: 'appliance' },
  { id: 'grill_mower', label: 'BBQ Grill / Lawnmower', icon: 'Wrench', category: 'metal' },
  { id: 'random_metal', label: 'Random Scrap Metal / Pipes', icon: 'Anvil', category: 'metal' },
  { id: 'shed_structure', label: 'Old Shed / Metal Structure', icon: 'Home', category: 'structure' },
  { id: 'other', label: 'Other Metal Items', icon: 'Box', category: 'other' }
];

```

### FULL SOURCE FOR: `src/vite-env.d.ts`
```typescript
/// <reference types="vite/client" />

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

```

### FULL SOURCE FOR: `src/lib/firebase.ts`
```typescript
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import { 
  getAuth, 
  GoogleAuthProvider, 
  FacebookAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from "firebase/auth";

// Safe, fallback configuration
const firebaseConfig = {
  apiKey: (import.meta as any).env.VITE_FIREBASE_API_KEY || "mock-api-key",
  authDomain: (import.meta as any).env.VITE_FIREBASE_AUTH_DOMAIN || "mock-app.firebaseapp.com",
  projectId: (import.meta as any).env.VITE_FIREBASE_PROJECT_ID || "mock-app",
  storageBucket: (import.meta as any).env.VITE_FIREBASE_STORAGE_BUCKET || "mock-app.appspot.com",
  messagingSenderId: (import.meta as any).env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: (import.meta as any).env.VITE_FIREBASE_APP_ID || "1:1234:web:1234"
};

export const isRealFirebase = !!(import.meta as any).env.VITE_FIREBASE_API_KEY && (import.meta as any).env.VITE_FIREBASE_API_KEY !== "mock-api-key";

let app: any = null;
let db: any = null;
let auth: any = null;

if (isRealFirebase) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
    auth = getAuth(app);
    console.log("Firebase initialized successfully with real credentials.");
  } catch (e) {
    console.warn("Firebase initialization failed, falling back to local database & demo auth:", e);
  }
}

export interface DispatchJob {
  id: string;
  ticketNumber: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  address: string;
  zipCode: string;
  selectedDate: string;
  timeSlot: 'morning' | 'afternoon';
  haulType: 'truck' | 'trailer' | 'appliance';
  status: 'scheduled' | 'dispatched' | 'on_site' | 'disposal_run' | 'completed';
  priceTotal: number;
  paymentTerms: string;
  paymentStatus: 'paid' | 'pending';
  timestamp: string;
  notes?: string;
  items?: Record<string, number>;
  appliances?: Record<string, boolean>;
  specialNotes?: string;
}

// Initial sample jobs for operator showcase
const SAMPLE_JOBS: DispatchJob[] = [
  {
    id: "job-101",
    ticketNumber: "TKT-782104",
    clientName: "David Miller",
    clientPhone: "(479) 420-9182",
    clientEmail: "david.miller@fortsmithrealty.com",
    address: "3412 Free Ferry Rd",
    zipCode: "72903",
    selectedDate: new Date().toISOString().split('T')[0],
    timeSlot: "morning",
    haulType: "trailer",
    status: "on_site",
    priceTotal: 385.00,
    paymentTerms: "stripe",
    paymentStatus: "paid",
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    notes: "Estate liquidation. 14ft tandem trailer parked in wide driveway. 2 mattresses and 4 contractor bags loaded.",
    items: { mattress: 2, couch: 1, yard_bag: 4 },
    specialNotes: "Side gate code is #4412. Watch out for flower beds."
  },
  {
    id: "job-102",
    ticketNumber: "TKT-551930",
    clientName: "Sarah Jenkins",
    clientPhone: "(479) 785-3341",
    clientEmail: "sarah.j@rivervalleyliving.com",
    address: "810 Towson Ave",
    zipCode: "72901",
    selectedDate: new Date().toISOString().split('T')[0],
    timeSlot: "afternoon",
    haulType: "truck",
    status: "dispatched",
    priceTotal: 185.00,
    paymentTerms: "arrival",
    paymentStatus: "pending",
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    notes: "Curbside bulky furniture pickup. Heavy oak dresser and box spring.",
    items: { couch: 1, yard_bag: 2 }
  },
  {
    id: "job-103",
    ticketNumber: "TKT-992014",
    clientName: "Commercial River Storage",
    clientPhone: "(479) 222-8874",
    clientEmail: "storageops@rivervalleystorage.net",
    address: "5200 S 74th St",
    zipCode: "72903",
    selectedDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    timeSlot: "morning",
    haulType: "trailer",
    status: "scheduled",
    priceTotal: 620.00,
    paymentTerms: "stripe",
    paymentStatus: "paid",
    timestamp: new Date().toISOString(),
    notes: "2 defaulted commercial units (Units 104 and 106). Full sweep-out required for same-day re-rental.",
    items: { mattress: 3, couch: 2, yard_bag: 6 }
  }
];

// Simple local fallback database using localStorage
const localDb = {
  getDocs(colName: string): DispatchJob[] {
    const existing = localStorage.getItem(colName);
    if (!existing) {
      localStorage.setItem(colName, JSON.stringify(SAMPLE_JOBS));
      return SAMPLE_JOBS;
    }
    try {
      return JSON.parse(existing);
    } catch {
      return SAMPLE_JOBS;
    }
  },
  addDoc(colName: string, data: any): DispatchJob {
    const current = localDb.getDocs(colName);
    const docWithId = {
      id: `local-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      status: 'scheduled',
      ...data
    };
    current.unshift(docWithId);
    localStorage.setItem(colName, JSON.stringify(current));
    return docWithId;
  },
  updateDoc(colName: string, id: string, updates: Partial<DispatchJob>): boolean {
    const current = localDb.getDocs(colName);
    const idx = current.findIndex(j => j.id === id || j.ticketNumber === id);
    if (idx !== -1) {
      current[idx] = { ...current[idx], ...updates };
      localStorage.setItem(colName, JSON.stringify(current));
      return true;
    }
    return false;
  }
};

export async function saveBookingToDatabase(booking: any) {
  const dataToSave: Partial<DispatchJob> = {
    ...booking,
    ticketNumber: booking.ticketNumber || `TKT-${Math.floor(100000 + Math.random() * 900000)}`,
    status: 'scheduled',
    timestamp: new Date().toISOString(),
  };

  if (db && isRealFirebase) {
    try {
      const colRef = collection(db, "bookings");
      const docRef = await addDoc(colRef, dataToSave);
      localDb.addDoc("bookings", { ...dataToSave, id: docRef.id });
      return { success: true, id: docRef.id, ticketNumber: dataToSave.ticketNumber, isMock: false };
    } catch (e: any) {
      console.error("Failed to save to real Firebase, fallback to local storage:", e);
      const localDoc = localDb.addDoc("bookings", dataToSave);
      return { success: true, id: localDoc.id, ticketNumber: localDoc.ticketNumber, isMock: true, error: e.message };
    }
  } else {
    const localDoc = localDb.addDoc("bookings", dataToSave);
    return { success: true, id: localDoc.id, ticketNumber: localDoc.ticketNumber, isMock: true };
  }
}

export async function getAllBookings(): Promise<DispatchJob[]> {
  if (db && isRealFirebase) {
    try {
      const querySnapshot = await getDocs(collection(db, "bookings"));
      if (!querySnapshot.empty) {
        return querySnapshot.docs.map(d => ({ id: d.id, ...d.data() } as DispatchJob));
      }
    } catch (e) {
      console.error("Error fetching bookings from real Firebase:", e);
    }
  }
  return localDb.getDocs("bookings");
}

export async function updateBookingStatus(
  jobId: string, 
  newStatus: DispatchJob['status'], 
  notes?: string
): Promise<boolean> {
  const updates: Partial<DispatchJob> = { status: newStatus };
  if (notes !== undefined) updates.notes = notes;

  if (db && isRealFirebase) {
    try {
      const jobRef = doc(db, "bookings", jobId);
      await updateDoc(jobRef, updates as any);
    } catch (e) {
      console.warn("Could not update remote Firebase, updating local copy:", e);
    }
  }
  return localDb.updateDoc("bookings", jobId, updates);
}

export async function getBookingCountForAddressAndDate(address: string, date: string): Promise<number> {
  const bookings = await getAllBookings();
  const matching = bookings.filter((b: any) => 
    b.selectedDate === date && 
    b.contactAddress?.trim().toLowerCase() === address.trim().toLowerCase()
  );
  return matching.length;
}

// -------------------------------------------------------------
// Authentication Services (Google, Facebook & Demo Operator/Client)
// -------------------------------------------------------------
export interface AuthUserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  provider: 'google' | 'facebook' | 'demo';
  role: 'operator' | 'customer';
}

export type AuthUser = AuthUserProfile;

export function getCurrentAuthUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem('rvcc_auth_user');
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn("Failed to parse auth user:", e);
  }
  return null;
}

export function setStoredAuthUser(user: AuthUser | null): void {
  try {
    if (user) {
      localStorage.setItem('rvcc_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('rvcc_auth_user');
    }
  } catch (e) {
    console.warn("Failed to set stored auth user:", e);
  }
}

export async function signInWithGoogleAuth(): Promise<AuthUserProfile> {
  let profile: AuthUserProfile;
  if (auth && isRealFirebase) {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      profile = {
        uid: user.uid,
        displayName: user.displayName || "Google User",
        email: user.email || "",
        photoURL: user.photoURL || undefined,
        provider: 'google',
        role: user.email?.includes('rivervalley') || user.email?.includes('admin') ? 'operator' : 'customer'
      };
      setStoredAuthUser(profile);
      return profile;
    } catch (e: any) {
      console.warn("Google Sign-In with real Firebase failed/cancelled, using simulated profile:", e);
    }
  }
  // Seamless client-side demo fallback
  profile = {
    uid: "google-demo-" + Date.now(),
    displayName: "Travis Wayne (Google)",
    email: "travis.wayne@rivervalleycrew.com",
    photoURL: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120",
    provider: 'google',
    role: 'operator'
  };
  setStoredAuthUser(profile);
  return profile;
}

export async function signInWithFacebookAuth(asAdmin: boolean = false): Promise<AuthUserProfile> {
  let profile: AuthUserProfile;
  if (auth && isRealFirebase) {
    try {
      const provider = new FacebookAuthProvider();
      if (asAdmin) {
        provider.addScope('pages_show_list');
        provider.addScope('pages_read_engagement');
        provider.addScope('pages_manage_posts');
      }
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      profile = {
        uid: user.uid,
        displayName: user.displayName || (asAdmin ? "River Valley Page Admin" : "Facebook User"),
        email: user.email || "",
        photoURL: user.photoURL || undefined,
        provider: 'facebook',
        role: asAdmin ? 'operator' : 'customer'
      };
      setStoredAuthUser(profile);
      return profile;
    } catch (e: any) {
      console.warn("Facebook Sign-In with real Firebase failed/cancelled, using simulated profile:", e);
    }
  }
  // Seamless client-side demo fallback
  profile = {
    uid: "fb-" + (asAdmin ? "admin-" : "client-") + Date.now(),
    displayName: asAdmin ? "RVCC Page Admin (Facebook)" : "Jane Cooper (Meta)",
    email: asAdmin ? "dispatch@rivervalleycrew.com" : "jane.cooper@rivervalleymail.com",
    photoURL: asAdmin 
      ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120"
      : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120",
    provider: 'facebook',
    role: asAdmin ? 'operator' : 'customer'
  };
  setStoredAuthUser(profile);
  return profile;
}

export async function signOutAuth(): Promise<void> {
  setStoredAuthUser(null);
  if (auth && isRealFirebase) {
    try {
      await firebaseSignOut(auth);
    } catch (e) {
      console.warn("Sign out warning:", e);
    }
  }
}

```
