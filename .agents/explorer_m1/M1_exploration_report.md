# Exploration Report - Milestone 1

## Summary of Findings
- **Git Repository Status (E:\Presion)**: On branch `main`, clean history (1 commit: `0b71e54 Add blood pressure tracker app`). Pending changes exist: staged Supabase migration for table privileges/RLS (`001_blood_pressure_readings.sql`) and unstaged changes adding Google OAuth, dark-mode styling, and page redirects.
- **Next.js Auth & Redirects**: The root `middleware.ts` runs on all paths (excluding static assets) and delegates to `src/lib/supabase-middleware.ts`, which refreshes the session using Supabase SSR `createServerClient`. Redirection checks are implemented at the page/route level (`src/app/page.tsx`, `src/app/login/page.tsx`, and `src/app/auth/confirm/route.ts`).
- **package.json & Port Config**: `E:\Presion\package.json` defines dev/start scripts on port `3011` (`"dev": "next dev -p 3011"`).
- **Browser Automation / Screenshots**: No playwright, puppeteer, or similar browser automation tool or script exists in either `E:\Presion` or `E:\Portafolio`.

---

## 1. Observation

### Git Repository Status in E:\Presion
- **Command Run**: `git status`
- **Output**:
  ```
  On branch main
  Your branch is up to date with 'origin/main'.

  Changes to be committed:
    (use "git restore --staged <file>..." to unstage)
  	modified:   supabase/migrations/001_blood_pressure_readings.sql

  Changes not staged for commit:
    (use "git add <file>..." to update what will be committed)
    (use "git restore <file>..." to discard changes in working directory)
  	modified:   next-env.d.ts
  	modified:   src/app/auth/confirm/route.ts
  	modified:   src/app/page.tsx
  	modified:   src/components/dashboard.tsx
  	modified:   src/components/login-form.tsx
  	modified:   src/lib/config.ts
  ```
- **Staged Changes (`git diff --cached`)**:
  `supabase/migrations/001_blood_pressure_readings.sql` has updated privileges and RLS policy adjustments:
  ```sql
  revoke all on table public.blood_pressure_readings from anon, authenticated;
  grant usage on schema public to authenticated;
  grant select, insert, update, delete on table public.blood_pressure_readings to authenticated;
  
  -- Policy edits replace `auth.uid() = user_id` with `(select auth.uid()) = user_id`
  ```
- **Unstaged Changes (`git diff`)**:
  - `src/lib/config.ts`: Adds `getAppBaseUrl()` helper reading `process.env.NEXT_PUBLIC_APP_BASE_URL` with a fallback.
  - `src/app/auth/confirm/route.ts`: Adds check for `code` param and call to `supabase.auth.exchangeCodeForSession(code)`.
  - `src/app/page.tsx`: Handles `code` and `token_hash` query params for OAuth/MagicLink redirects, redirects unauthenticated users to `/login`.
  - `src/components/login-form.tsx`: Integrates Google Sign-In button and uses `getAppBaseUrl()` for the redirect url. Colors are updated for dark mode theme.
  - `src/components/dashboard.tsx`: Dark mode style modifications (e.g. `bg="gray.900"`, white text, etc.).

### Middleware and Redirection Files in E:\Presion
- **File**: `E:\Presion\middleware.ts`
  ```typescript
  import type { NextRequest } from "next/server";
  import { updateSession } from "@/lib/supabase-middleware";

  export async function middleware(request: NextRequest) {
    return updateSession(request);
  }

  export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"]
  };
  ```
- **File**: `E:\Presion\src\lib\supabase-middleware.ts`
  Uses `@supabase/ssr` `createServerClient` and calls `await supabase.auth.getUser()` to refresh session. Returns standard response with updated cookies. No redirects are implemented here.
- **File**: `E:\Presion\src\app\page.tsx`
  Redirects unauthenticated users to login, and redirects OAuth code confirmations:
  ```typescript
  export default async function Home({ searchParams }: HomeProps) {
    const params = await searchParams;
    if (params.code) {
      redirect(`/auth/confirm?code=${encodeURIComponent(params.code)}`);
    }
    // ...
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      redirect("/login");
    }
    return <Dashboard email={user.email ?? "Usuario"} />;
  }
  ```
- **File**: `E:\Presion\src\app\login\page.tsx`
  Redirects logged-in users back to root:
  ```typescript
  if (user) {
    redirect("/");
  }
  ```
- **File**: `E:\Presion\src\app\auth\confirm\route.ts`
  Exchanges OAuth code or OTP token hashes for session:
  ```typescript
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) redirect("/");
  }
  ```

### package.json Scripts and Ports
- **E:\Presion\package.json**:
  - Dev Script: `"dev": "next dev -p 3011"`
  - Start Script: `"start": "next start -p 3011"`
  - Configured Port: `3011`
- **E:\Portafolio\package.json**:
  - Dev Script: `"dev": "vite"` (defaults to `5173` or similar Vite default, no port specified).

### Existing Browser Automation Scripts
- Searched both `E:\Presion` and `E:\Portafolio` for Playwright, Puppeteer, Cypress, Selenium, or screenshotting utility files/dependencies.
- **Results**:
  - No dependencies or devDependencies matching browser automation packages exist in either project.
  - No config files (like `playwright.config.ts`) exist.
  - The script `E:\Portafolio\scripts\generate-cv-en.py` uses `reportlab` canvas to build the PDF programmatically, not browser automation.
  - The script `E:\Portafolio\scripts\copy-pages-fallback.mjs` is a file copy utility.

---

## 2. Logic Chain

1. **Git Repository Status**: Running `git status` and `git diff` showed that the codebase is mid-development. Staged changes are dedicated to database privileges and RLS performance tweaks. Unstaged changes focus on integrating Google OAuth sign-in flow, dark mode interface adjustments, and server components query params redirection handling.
2. **Next.js Auth & Redirects**: Viewing `middleware.ts` and `src/lib/supabase-middleware.ts` confirms the middleware ONLY refreshes the cookie-based session by calling `supabase.auth.getUser()`. All redirection logic is decentralized into Next.js components/routes:
   - Root dashboard (`/` or `page.tsx`) forces `/login` if unauthenticated.
   - Login page (`/login` or `login/page.tsx`) forces `/` if authenticated.
   - Route handler (`/auth/confirm` or `auth/confirm/route.ts`) handles OTP/OAuth code exchange and redirects back to `/`.
3. **Port Numbers**: Checking `"scripts"` in `package.json` for E:\Presion reveals the `-p 3011` flag is explicitly appended to both `dev` and `start` scripts. E:\Portafolio has standard `vite` command without a hardcoded port.
4. **Automation Scripts**: Checked all javascript, typescript, python files, and package.json configurations. ReportLab was the only document-generation tool found. No browser automation or screenshot-capturing libraries are installed or scripted.

---

## 3. Caveats
- We did not verify if the Next.js port `3011` is currently in use on the local system.
- We assumed the dev server is run using `npm run dev` and respects the script parameters.
- We did not check global system utilities or tools outside of these two specific repository directories.

---

## 4. Conclusion
- The `E:\Presion` project is configured to run locally on port `3011`.
- Authentication and session handling are built with Supabase SSR, redirecting unauthenticated users to `/login` via page-level Next.js redirect checks.
- If we need automated screenshot testing or browser automation for these projects, we will need to install automation dependencies (e.g. `playwright` or `puppeteer`) and author custom scripts from scratch.

---

## 5. Verification Method

- **Verify Git Status**: Run `git status` in `E:\Presion` to see pending files.
- **Verify Middleware and Redirect Logic**: Inspect the code files `E:\Presion\middleware.ts`, `E:\Presion\src\lib\supabase-middleware.ts`, `E:\Presion\src\app\page.tsx`, and `E:\Presion\src\app\auth\confirm\route.ts`.
- **Verify Configured Ports**: View `E:\Presion\package.json` line 7 and 9. Run `npm run dev` in `E:\Presion` and check the console output to confirm that it binds to `http://localhost:3011`.
