# VIGNAN'S FOUNDATION FOR SCIENCE, TECHNOLOGY & RESEARCH
**(Deemed to be University) — Estd. u/s 3 of UGC Act 1956**
### DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING
---

**Course Code & Title:** 24CS810 – Modern Front-End Frameworks and SPA Development  
**Academic Year / Semester:** 2026–2027  
**Laboratory Record / Project Submission**

| Field | Student Details |
|:---|:---|
| **NAME OF STUDENT** | **TELAPROLU ARUN TEJA** |
| **REGISTER NUMBER** | **241FA04C62** |
| **SECTION** | **2** |
| **PROJECT TITLE** | **CLEAR LAUNCH 🚀: AI Legal Compliance Navigator & Startup Marketplace** |

<br />

**FACULTY SIGNATURE:** ___________________________ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **DATE OF SUBMISSION:** _______________

---

## 1. AIM
To design, architect, and develop a modern, production-grade Single Page Application (SPA) and full-stack web platform entitled **"Clear Launch"** using **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **Framer Motion**. The system aims to guide startup founders from raw ideation to legal company incorporation by integrating:
1. An AI-assisted regulatory and legal compliance engine utilizing Google Gemini generative models.
2. A dual-theme UI architecture ("Cyber Obsidian" Dark Mode and "Alabaster & Royal" Light Mode) with persistent state toggling via `next-themes`.
3. An interactive step-by-step Company Builder roadmap and directory of official Government registration portals (MCA, Startup India, Udyam MSME, GST, IP India).
4. Direct consultation booking and simulated end-to-end encrypted messaging with verified Bar Council Legal Advocates.
5. An always-accessible e-commerce marketplace for software boilerplates, fine-tuned AI agents, and IoT hardware dev kits.
6. Role-Based Access Control (RBAC) with secure session handling via Auth.js v5 (NextAuth), Prisma ORM, and SQLite persistence.

---

## 2. SOFTWARE REQUIREMENTS

* **Operating System:** Microsoft Windows 10 / Windows 11 (64-bit)
* **Frontend Framework & Libraries:**
  * Next.js 16.3.6 (React App Router Architecture)
  * React 19.2.8 & React-DOM 19.2.8
  * Framer Motion (Declarative animations, transitions, and micro-interactions)
  * Lucide React 1.47.0 (Vector Icon System)
  * Next-Themes 0.4.6 (Persistent Client-Side Theme Synchronization)
* **Styling Framework:**
  * Tailwind CSS v4 (Engineered with `@theme inline`, custom `@custom-variant dark`, CSS custom properties, and glassmorphic utility classes)
  * Custom Webkit Autofill Style Overrides
* **Backend Runtime & API:**
  * Node.js v20+ Runtime Environment
  * Next.js Server Components & Route Handlers (`app/api/*`)
  * Edge-Compatible Middleware for RBAC Route Protection
* **Database & Persistence:**
  * SQLite Embedded Relational Database (`dev.db`)
  * Prisma ORM v6.19.3 (Prisma Client & Prisma Engine)
* **Authentication & Security:**
  * Auth.js v5 (NextAuth beta 5.0.0-beta.32) with JWT Strategy
  * `@auth/prisma-adapter` for database synchronization
  * bcryptjs (Salted Password Hashing, 12 rounds)
  * Zod v4 (Strong runtime request schema validation)
* **Artificial Intelligence Engine:**
  * `@google/genai` (Google Gemini 2.0 Flash / Pro SDK with fallback mock analyzer)
* **Development & Tooling:**
  * Visual Studio Code (IDE)
  * Google Chrome / Edge Chromium (Developer Tools)
  * Node Package Manager (npm v10+)
  * Git Version Control

---

## 3. OBJECTIVE
1. To implement an end-to-end SPA featuring client-side navigation, dynamic routes, and server-rendered data fetching with zero reload latency using Next.js App Router and React 19.
2. To enforce Role-Based Access Control across four distinct operational personas (`ENTREPRENEUR`, `LAWYER`, `INVESTOR`, `USER`) preventing unauthorized traversal using Next.js Edge Middleware.
3. To engineer an interactive AI Legal Navigator that takes plain-text startup business ideas, processes industry risk parameters, and returns categorized statutory compliance checklists, geographical suitability indices, and direct government application links.
4. To build an interactive, full CRUD user profile management module supporting custom photo avatar uploading, cover banner image previewing, project showcase portfolio tracking, and community update publishing.
5. To eliminate UI layout shifts and browser autofill bugs using glassmorphism, responsive CSS grid layouts, and high-contrast dual-theme tokens ("Cyber Obsidian" / "Alabaster & Royal").

---

## 4. PROJECT STRUCTURE

```text
clearlaunch/
├── prisma/
│   ├── dev.db                       # Local SQLite database
│   └── schema.prisma                # Relational schema (User, Role, ComplianceCheck)
├── public/
│   └── favicon.ico                  # Application brand icon
├── src/
│   ├── app/
│   │   ├── advocates/
│   │   │   └── page.tsx             # Legal Advocates Directory & Consultation Booking
│   │   ├── ai-cofounder/
│   │   │   └── page.tsx             # AI Co-Founder Redirect handler
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/
│   │   │   │   └── route.ts         # Auth.js route handler
│   │   │   ├── compliance/
│   │   │   │   └── route.ts         # AI Legal Compliance analysis endpoint
│   │   │   ├── profile/
│   │   │   │   └── route.ts         # Profile CRUD and avatar/banner endpoint
│   │   │   └── register/
│   │   │       └── route.ts         # New user registration & bcrypt hashing endpoint
│   │   ├── dashboard/
│   │   │   ├── layout.tsx           # Authenticated layout with Sidebar & AI Co-Founder
│   │   │   ├── advisor/
│   │   │   │   └── page.tsx         # Legal Advisor Dashboard
│   │   │   ├── advocates/
│   │   │   │   └── page.tsx         # Dashboard link to Advocates
│   │   │   ├── ai-cofounder/
│   │   │   │   └── page.tsx         # Fullscreen AI Co-Founder Workspace
│   │   │   ├── explore/
│   │   │   │   ├── page.tsx         # Explorer General Dashboard
│   │   │   │   └── startups/
│   │   │   │       └── page.tsx     # Verified Startups Directory
│   │   │   ├── founder/
│   │   │   │   ├── page.tsx         # Entrepreneur/Founder Dashboard
│   │   │   │   └── compliance/
│   │   │   │       └── page.tsx     # AI Legal Compliance Intake & Report UI
│   │   │   ├── investor/
│   │   │   │   └── page.tsx         # Investor Dashboard & Deal Flow
│   │   │   ├── launchpad/
│   │   │   │   └── page.tsx         # Dashboard link to Launchpad
│   │   │   └── products/
│   │   │       └── page.tsx         # Dashboard link to Marketplace
│   │   ├── explore-startups/
│   │   │   └── page.tsx             # Public Startups Directory
│   │   ├── launchpad/
│   │   │   └── page.tsx             # Company Builder Wizard & Govt Portal Directory
│   │   ├── login/
│   │   │   └── page.tsx             # Dual-theme Login interface with autofill fix
│   │   ├── products/
│   │   │   └── page.tsx             # Global Products Marketplace (Software/AI/Hardware)
│   │   ├── profile/
│   │   │   ├── edit/
│   │   │   │   └── page.tsx         # Redirect to settings
│   │   │   └── [userId]/
│   │   │       └── page.tsx         # Interactive Public Member Profile View
│   │   ├── register/
│   │   │   └── page.tsx             # Role-selection registration form
│   │   ├── settings/
│   │   │   └── page.tsx             # Profile CRUD & Avatar/Cover Photo Upload
│   │   ├── globals.css              # Theme tokens, glassmorphism, animations
│   │   ├── layout.tsx               # Root HTML wrapper with ThemeProvider
│   │   └── page.tsx                 # High-impact Landing Page with Aurora effects
│   ├── components/
│   │   ├── AiCoFounderWidget.tsx    # Floating persistent AI Co-Founder widget
│   │   ├── BackgroundEffects.tsx    # Animated aurora mesh gradient component
│   │   ├── Sidebar.tsx              # Role-aware responsive navigation sidebar
│   │   ├── SocialIcons.tsx          # Custom SVG GitHub & LinkedIn brand icons
│   │   ├── StartupsDirectory.tsx    # Reusable directory with filters & deal sheet modal
│   │   ├── ThemeProvider.tsx        # Next-themes client wrapper
│   │   ├── ThemeToggle.tsx          # Animated Sun/Moon theme switcher button
│   │   └── UserAvatar.tsx           # Reusable clickable avatar component
│   ├── lib/
│   │   ├── db.ts                    # Prisma Client global singleton
│   │   └── mockData.ts              # Seed database records (Users, Startups, Portals)
│   ├── types/
│   │   └── next-auth.d.ts           # TypeScript type augmentations for Session & JWT
│   ├── auth.config.ts               # Edge-compatible NextAuth configuration
│   ├── auth.ts                      # Full Node.js NextAuth configuration
│   └── middleware.ts                # Edge RBAC middleware router
├── .env                             # Environment configuration
├── package.json                     # Dependency manifests & build scripts
├── postcss.config.mjs               # PostCSS Tailwind plugin configuration
└── tsconfig.json                    # TypeScript compiler options
```

---

## 5. SOURCE CODE

### 5.1 DATABASE & BACKEND AUTHENTICATION

#### `prisma/schema.prisma`
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

enum Role {
  ENTREPRENEUR
  LAWYER
  INVESTOR
  USER
}

model User {
  id             String    @id @default(cuid())
  name           String?
  email          String    @unique
  emailVerified  DateTime?
  image          String?
  bannerImage    String?
  hashedPassword String?
  role           Role      @default(USER)
  bio            String?
  profession     String?
  phone          String?
  contactEmail   String?
  githubUrl      String?
  linkedinUrl    String?
  portfolioUrl   String?
  appsBuilt      String?
  posts          String?
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt

  accounts         Account[]
  sessions         Session[]
  complianceChecks ComplianceCheck[]
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

model ComplianceCheck {
  id            String   @id @default(cuid())
  userId        String
  prompt        String
  industry      String?
  dataUsage     String?
  businessModel String?
  results       Json?
  createdAt     DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

#### `src/lib/db.ts`
```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

#### `src/auth.config.ts`
```typescript
import type { NextAuthConfig } from "next-auth";

export default {
  providers: [],
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        (session.user as any).role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig;
```

#### `src/auth.ts`
```typescript
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/db";
import authConfig from "@/auth.config";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.hashedPassword) return null;

        const passwordsMatch = await bcrypt.compare(password, user.hashedPassword);
        if (!passwordsMatch) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.image,
        };
      },
    }),
  ],
});
```

#### `src/middleware.ts`
```typescript
import NextAuth from "next-auth";
import authConfig from "@/auth.config";

const { auth } = NextAuth(authConfig);

const ROLE_DASHBOARD_MAP: Record<string, string> = {
  ENTREPRENEUR: "/dashboard/founder",
  LAWYER: "/dashboard/advisor",
  INVESTOR: "/dashboard/investor",
  USER: "/dashboard/explore",
};

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const pathname = nextUrl.pathname;

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/settings")) {
    if (!isLoggedIn) {
      return Response.redirect(new URL("/login", nextUrl));
    }
  }

  if (pathname === "/dashboard" || pathname === "/dashboard/") {
    const userRole = (req.auth?.user as any)?.role as string;
    const targetDashboard = ROLE_DASHBOARD_MAP[userRole] || "/dashboard/explore";
    return Response.redirect(new URL(targetDashboard, nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
```

---

### 5.2 SERVERLESS API ROUTES

#### `src/app/api/register/route.ts`
```typescript
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/db";

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["ENTREPRENEUR", "LAWYER", "INVESTOR", "USER"]),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      const errMsg =
        (parsed.error as any).issues?.[0]?.message ||
        (parsed.error as any).errors?.[0]?.message ||
        "Invalid input parameters";
      return NextResponse.json({ error: errMsg }, { status: 400 });
    }

    const { name, email, password, role } = parsed.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
        role,
      },
    });

    return NextResponse.json(
      {
        message: "Account created successfully",
        user: { id: user.id, email: user.email, role: user.role },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

#### `src/app/api/profile/route.ts`
```typescript
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        bannerImage: true,
        role: true,
        bio: true,
        profession: true,
        phone: true,
        contactEmail: true,
        githubUrl: true,
        linkedinUrl: true,
        portfolioUrl: true,
        appsBuilt: true,
        posts: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Profile GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      name,
      image,
      bannerImage,
      bio,
      profession,
      phone,
      contactEmail,
      githubUrl,
      linkedinUrl,
      portfolioUrl,
      appsBuilt,
      posts,
    } = body;

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: name !== undefined ? name : undefined,
        image: image !== undefined ? image : undefined,
        bannerImage: bannerImage !== undefined ? bannerImage : undefined,
        bio: bio !== undefined ? bio : undefined,
        profession: profession !== undefined ? profession : undefined,
        phone: phone !== undefined ? phone : undefined,
        contactEmail: contactEmail !== undefined ? contactEmail : undefined,
        githubUrl: githubUrl !== undefined ? githubUrl : undefined,
        linkedinUrl: linkedinUrl !== undefined ? linkedinUrl : undefined,
        portfolioUrl: portfolioUrl !== undefined ? portfolioUrl : undefined,
        appsBuilt: appsBuilt !== undefined ? JSON.stringify(appsBuilt) : undefined,
        posts: posts !== undefined ? JSON.stringify(posts) : undefined,
      },
    });

    return NextResponse.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
```

#### `src/app/api/compliance/route.ts`
```typescript
import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

const complianceSchema = z.object({
  idea: z.string().min(10, "Please provide a more detailed description"),
  targetRegion: z.string().optional(),
  businessModel: z.enum(["B2C", "B2B", "B2B2C", "D2C"]).default("B2C"),
});

function generateMockResults(idea: string, region?: string, model?: string) {
  const targetRegion = region || "United States / India";
  return {
    summary: `Based on your idea — "${idea.substring(0, 100)}..." — key regulatory requirements for operating in ${targetRegion} under a ${model || "B2C"} model have been processed.`,
    geographicalSuitability: {
      recommended: [
        { region: "India (DPIIT Recognized)", reason: "3-year Section 80-IAC tax holiday, 80% trademark rebate, and priority government procurement." },
        { region: "United States (Delaware C-Corp)", reason: "Global standard for venture capital financing and clear IP assignment frameworks." },
        { region: "Singapore (ACRA Pte Ltd)", reason: "Strategic APAC hub with streamlined double-taxation treaties and fintech sandboxes." },
      ],
      cautionary: [
        { region: "European Union", reason: "Strict GDPR and EU AI Act conformity assessments require designated DPO and risk audits." },
        { region: "China", reason: "Mandatory data localization, cross-border transmission limits, and ICP licensing requirements." },
      ],
    },
    complianceChecklist: [
      { item: "SPICe+ Part A & B Incorporation", category: "Corporate Law", priority: "HIGH", description: "Integrated web form for DIN, PAN, TAN, EPFO, ESIC, and corporate bank account opening." },
      { item: "Data Privacy & Consent Architecture", category: "Data Protection", priority: "HIGH", description: "Implement explicit opt-in telemetry and user consent mechanisms under DPDP Act / GDPR." },
      { item: "Trademark Application (Form TM-A)", category: "Intellectual Property", priority: "HIGH", description: "Protect word mark, device logo, and software brand identity with an 80% startup rebate." },
      { item: "Master Services Agreement & ToS", category: "Consumer Protection", priority: "MEDIUM", description: "Draft platform Terms of Service, Privacy Policy, and Service Level Agreements (SLA)." },
      { item: "GST Registration & E-Invoicing", category: "Taxation", priority: "MEDIUM", description: "Required for inter-state digital commerce and e-commerce software distribution." },
    ],
    actionableLinks: [
      { title: "MCA Portal (Ministry of Corporate Affairs)", url: "https://www.mca.gov.in", description: "Official SPICe+ company incorporation portal." },
      { title: "Startup India Hub (DPIIT)", url: "https://www.startupindia.gov.in", description: "Tax exemptions, mentor connect, and startup recognition." },
      { title: "IP India Trademarks Portal", url: "https://ipindia.gov.in", description: "Online TM-A filing and trademark search registry." },
      { title: "Udyam MSME Registration Portal", url: "https://udyamregistration.gov.in", description: "Zero-cost paperless MSME registration certificate." },
    ],
  };
}

async function analyzeWithGemini(idea: string, region?: string, model?: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return generateMockResults(idea, region, model);

  try {
    const { GoogleGenAI } = await import("@google/genai");
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `You are a startup legal compliance analyst. Return strictly valid JSON analyzing this idea:
Idea: ${idea}
Region: ${region || "Global"}
Model: ${model || "B2C"}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const cleanedText = (response.text || "").replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    return JSON.parse(cleanedText);
  } catch (err) {
    return generateMockResults(idea, region, model);
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = complianceSchema.safeParse(body);

    if (!parsed.success) {
      const errMsg =
        (parsed.error as any).issues?.[0]?.message ||
        (parsed.error as any).errors?.[0]?.message ||
        "Invalid input parameters";
      return NextResponse.json({ error: errMsg }, { status: 400 });
    }

    const { idea, targetRegion, businessModel } = parsed.data;
    const results = await analyzeWithGemini(idea, targetRegion, businessModel);

    await prisma.complianceCheck.create({
      data: {
        userId: session.user.id,
        prompt: idea,
        industry: targetRegion || null,
        dataUsage: null,
        businessModel,
        results: results as any,
      },
    });

    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    console.error("Compliance check error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
```

---

### 5.3 STYLING, THEME SYSTEM & REUSABLE COMPONENTS

#### `src/app/globals.css`
```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

:root {
  /* Light Mode ("Alabaster & Royal") */
  --bg-primary: #F8FAFC;
  --bg-surface: #FFFFFF;
  --bg-surface-elevated: #F1F5F9;
  --border-subtle: #E2E8F0;
  --border-prominent: #CBD5E1;
  --text-primary: #0F172A;
  --text-secondary: #475569;
  --text-muted: #94A3B8;

  --accent-primary: #2563EB;
  --accent-primary-hover: #1D4ED8;
  --accent-secondary: #7C3AED;
  --accent-success: #059669;
  --accent-glow: rgba(37, 99, 235, 0.15);

  --card-bg: rgba(255, 255, 255, 0.92);
  --card-border: rgba(226, 232, 240, 0.9);
  --card-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.05);
}

.dark {
  /* Dark Mode ("Cyber Obsidian") */
  --bg-primary: #090D16;
  --bg-surface: #0F172A;
  --bg-surface-elevated: #1E293B;
  --border-subtle: rgba(51, 65, 85, 0.6);
  --border-prominent: rgba(99, 102, 241, 0.35);
  --text-primary: #F8FAFC;
  --text-secondary: #CBD5E1;
  --text-muted: #64748B;

  --accent-primary: #6366F1;
  --accent-primary-hover: #818CF8;
  --accent-secondary: #10B981;
  --accent-success: #10B981;
  --accent-glow: rgba(99, 102, 241, 0.25);

  --card-bg: rgba(15, 23, 42, 0.65);
  --card-border: rgba(51, 65, 85, 0.7);
  --card-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.5);
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-geist-sans), system-ui, sans-serif;
  transition: background-color 0.3s ease, color 0.3s ease;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}

/* Fix input autofill background overrides */
input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
  -webkit-text-fill-color: var(--text-primary) !important;
  -webkit-box-shadow: 0 0 0px 1000px var(--bg-surface) inset !important;
  box-shadow: 0 0 0px 1000px var(--bg-surface) inset !important;
  transition: background-color 5000s ease-in-out 0s !important;
  border-color: var(--border-prominent) !important;
}

.glass-panel {
  background: var(--card-bg);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid var(--card-border);
  box-shadow: var(--card-shadow);
  border-radius: 1rem;
}

.glass-card {
  background: var(--card-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--card-border);
  box-shadow: var(--card-shadow);
  border-radius: 0.875rem;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.glass-card:hover {
  border-color: var(--accent-primary);
  transform: translateY(-2px);
  box-shadow: 0 12px 35px -8px var(--accent-glow);
}

.btn-primary {
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  color: #FFFFFF;
  font-weight: 600;
  border-radius: 0.75rem;
  padding: 0.65rem 1.4rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.25s ease;
  box-shadow: 0 4px 14px 0 var(--accent-glow);
  cursor: pointer;
}

.btn-secondary {
  background: var(--bg-surface);
  color: var(--text-primary);
  border: 1px solid var(--border-subtle);
  font-weight: 500;
  border-radius: 0.75rem;
  padding: 0.65rem 1.4rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  cursor: pointer;
}
```

#### `src/components/ThemeToggle.tsx`
```tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-xl border border-slate-700/50 bg-slate-800/40 flex items-center justify-center opacity-50 ${className}`}>
        <Moon className="w-4 h-4 text-slate-400" />
      </div>
    );
  }

  const isDark = resolvedTheme === "dark" || theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className={`relative group p-2 rounded-xl transition-all duration-300 border backdrop-blur-md cursor-pointer ${
        isDark
          ? "bg-slate-900/80 border-slate-700/80 text-amber-300 hover:border-amber-400/50 hover:bg-slate-800 shadow-lg"
          : "bg-white/90 border-slate-200 text-indigo-600 hover:border-indigo-400/60 hover:bg-slate-50 shadow-sm"
      } ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 transition-transform duration-300 rotate-0 scale-100 text-amber-400 group-hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 transition-transform duration-300 rotate-0 scale-100 text-indigo-600 group-hover:-rotate-12" />
        )}
      </div>
    </button>
  );
}
```

#### `src/components/BackgroundEffects.tsx`
```tsx
"use client";

import { motion } from "framer-motion";

export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          x: [0, 50, 0],
          y: [0, -40, 0],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -left-32 w-96 md:w-[32rem] h-96 md:h-[32rem] rounded-full blur-[100px] bg-gradient-to-br from-indigo-500/30 to-purple-600/25 dark:from-indigo-600/30 dark:to-violet-700/25"
      />
      <motion.div
        animate={{
          scale: [1.1, 0.95, 1.1],
          x: [0, -60, 0],
          y: [0, 50, 0],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/3 -right-32 w-96 md:w-[34rem] h-96 md:h-[34rem] rounded-full blur-[110px] bg-gradient-to-bl from-emerald-500/25 to-teal-500/20 dark:from-emerald-500/20 dark:to-cyan-600/20"
      />
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />
    </div>
  );
}
```

---

### 5.4 APPLICATION INTERFACE PAGES

#### `src/app/settings/page.tsx` (Profile Picture & Cover Banner Upload)
```tsx
"use client";

import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Globe,
  Code2,
  Plus,
  Trash2,
  Save,
  Loader2,
  CheckCircle2,
  ArrowLeft,
  MessageSquare,
  Eye,
  Camera,
  Upload,
  Image as ImageIcon,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

interface AppItem {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  repoUrl?: string;
}

interface PostItem {
  id: string;
  content: string;
  createdAt: string;
  likes: number;
  tags?: string[];
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [profession, setProfession] = useState("");
  const [bio, setBio] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [appsBuilt, setAppsBuilt] = useState<AppItem[]>([]);
  const [posts, setPosts] = useState<PostItem[]>([]);

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("Profile picture should be less than 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleBannerFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      setErrorMsg("Background banner should be less than 8MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setBannerImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setUserId(data.user.id);
            setName(data.user.name || "");
            setEmail(data.user.email || "");
            setAvatar(data.user.image || "");
            setBannerImage(data.user.bannerImage || "");
            setProfession(data.user.profession || "");
            setBio(data.user.bio || "");
            setContactEmail(data.user.contactEmail || data.user.email || "");
            setPhone(data.user.phone || "");
            setGithubUrl(data.user.githubUrl || "");
            setLinkedinUrl(data.user.linkedinUrl || "");
            setPortfolioUrl(data.user.portfolioUrl || "");
            if (data.user.appsBuilt) setAppsBuilt(JSON.parse(data.user.appsBuilt));
            if (data.user.posts) setPosts(JSON.parse(data.user.posts));
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          image: avatar,
          bannerImage,
          profession,
          bio,
          contactEmail,
          phone,
          githubUrl,
          linkedinUrl,
          portfolioUrl,
          appsBuilt,
          posts,
        }),
      });

      if (!res.ok) throw new Error("Failed to save profile");

      setSuccessMsg("Profile, avatar, and banner successfully updated!");
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <header className="sticky top-0 z-30 border-b border-[var(--border-subtle)] bg-[var(--card-bg)] backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-indigo-500">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <div className="h-4 w-px bg-[var(--border-subtle)]" />
          <h1 className="text-base font-bold">Profile & Account Settings</h1>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {userId && (
            <Link href={`/profile/${userId}`} className="btn-secondary text-xs px-3.5 py-1.5 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" /> View Public Profile
            </Link>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {successMsg && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center gap-3 text-sm">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSaveProfile} className="space-y-8">
          {/* Banner & Avatar Upload Card */}
          <div className="glass-panel p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
              <Camera className="w-5 h-5 text-indigo-500" /> Profile Picture & Background Cover
            </h2>

            {/* Banner */}
            <div>
              <div className="relative h-44 sm:h-52 w-full rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-slate-900 group">
                {bannerImage ? (
                  <img src={bannerImage} alt="Cover Banner Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-indigo-900/50 via-purple-900/40 to-emerald-900/40 flex flex-col items-center justify-center p-4">
                    <ImageIcon className="w-8 h-8 text-indigo-400/70 mb-2" />
                    <p className="text-xs font-semibold text-white/90">Default aurora gradient is active</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity">
                  <label className="btn-primary text-xs px-4 py-2 flex items-center gap-2 cursor-pointer shadow-lg">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Banner Image</span>
                    <input type="file" accept="image/*" onChange={handleBannerFileChange} className="hidden" />
                  </label>
                </div>
              </div>
            </div>

            {/* Avatar */}
            <div className="flex items-center gap-5 pt-4 border-t border-[var(--border-subtle)]">
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-[var(--bg-surface-elevated)] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-xl flex-shrink-0 group">
                {avatar ? (
                  <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span>{name ? name.slice(0, 2).toUpperCase() : "CL"}</span>
                )}
                <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-[10px] font-semibold transition-opacity gap-1 cursor-pointer">
                  <Camera className="w-4 h-4 text-indigo-300" />
                  <span>Change</span>
                  <input type="file" accept="image/*" onChange={handleAvatarFileChange} className="hidden" />
                </label>
              </div>

              <div className="space-y-2">
                <label className="btn-primary text-xs px-3.5 py-2 inline-flex items-center gap-1.5 cursor-pointer">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose Photo File</span>
                  <input type="file" accept="image/*" onChange={handleAvatarFileChange} className="hidden" />
                </label>
                <p className="text-[11px] text-[var(--text-muted)]">Square JPG, PNG, or WebP. Max 5MB.</p>
              </div>
            </div>
          </div>

          {/* Basic Fields */}
          <div className="glass-panel p-6 sm:p-8 space-y-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-500" /> Bio & Identity
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-sm"
              />
              <input
                type="text"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                placeholder="Profession / Role"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-sm"
              />
            </div>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Professional summary..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-sm resize-none"
            />
          </div>

          <div className="flex justify-end">
            <button type="submit" disabled={saving} className="btn-primary px-8 py-3 text-sm flex items-center gap-2">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Profile Details
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
```

#### `src/app/launchpad/page.tsx` (Company Builder Roadmap & Govt Portals)
```tsx
"use client";

import { useState } from "react";
import { MOCK_GOVT_PORTALS } from "@/lib/mockData";
import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";
import {
  FileText,
  CheckCircle2,
  Clock,
  ExternalLink,
  Award,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from "lucide-react";

export default function LaunchpadPage() {
  const [activeStage, setActiveStage] = useState<number>(1);
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({
    pan: true,
    aadhaar: true,
  });

  const legalDocs = [
    { id: "pan", name: "Permanent Account Number (PAN)", portal: "Income Tax / NSDL" },
    { id: "aadhaar", name: "Aadhaar Card (Linked with Mobile)", portal: "UIDAI" },
    { id: "dsc", name: "Class 3 Digital Signature Certificate (DSC)", portal: "Certifying Authority" },
    { id: "din", name: "Director Identification Number (DIN)", portal: "MCA Portal (SPICe+)" },
    { id: "moa", name: "Memorandum & Articles of Association (MOA/AOA)", portal: "MCA e-MOA (INC-33)" },
    { id: "name", name: "SPICe+ Part A Name Reservation", portal: "mca.gov.in" },
    { id: "gst", name: "GST Registration Certificate", portal: "gst.gov.in" },
    { id: "msme", name: "Udyam MSME Registration Certificate", portal: "udyamregistration.gov.in" },
    { id: "tm", name: "Trademark Registration (Form TM-A)", portal: "ipindia.gov.in" },
    { id: "startupindia", name: "DPIIT Startup India Recognition", portal: "startupindia.gov.in" },
  ];

  const toggleDoc = (id: string) => {
    setCheckedDocs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checkedDocs).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / legalDocs.length) * 100);

  const stages = [
    { step: 1, title: "Idea Validation & Entity Selection", description: "Pvt Ltd, LLP, OPC, or Sole Proprietorship comparison." },
    { step: 2, title: "Digital Signatures & Identity Credentials", description: "Class 3 DSC USB tokens and Aadhaar mobile OTP validation." },
    { step: 3, title: "Name Reservation (SPICe+ Part A)", description: "MCA name availability clearance across Class 9, 35, and 42 trademarks." },
    { step: 4, title: "Integrated Incorporation Filing (SPICe+ Part B)", description: "e-MOA, e-AOA, PAN, TAN, and instant corporate bank account opening." },
    { step: 5, title: "Post-Incorporation Compliance & DPIIT Benefits", description: "Section 80-IAC 3-year tax exemption and Udyam priority lending." },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <header className="sticky top-0 z-30 border-b border-[var(--border-subtle)] bg-[var(--card-bg)] backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">Clear Launch🚀</Link>
        <ThemeToggle />
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        {/* Readiness Tracker */}
        <div className="glass-panel p-6 sm:p-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-500" /> Legal Document Readiness Tracker
            </h2>
            <span className="text-2xl font-black text-emerald-400">{progressPercent}%</span>
          </div>

          <div className="w-full bg-[var(--bg-surface-elevated)] h-2.5 rounded-full overflow-hidden mb-6">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500" style={{ width: `${progressPercent}%` }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {legalDocs.map((doc) => (
              <button
                key={doc.id}
                type="button"
                onClick={() => toggleDoc(doc.id)}
                className={`p-3 rounded-xl border text-left text-xs transition-all ${
                  checkedDocs[doc.id]
                    ? "bg-emerald-500/10 border-emerald-500/30 font-semibold"
                    : "bg-[var(--bg-surface)] border-[var(--border-subtle)]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className={`w-4 h-4 ${checkedDocs[doc.id] ? "text-emerald-400" : "text-slate-500"}`} />
                  <span>{doc.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Portals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_GOVT_PORTALS.map((portal) => (
            <div key={portal.id} className="glass-card p-6 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-indigo-400">{portal.category}</span>
                <h3 className="font-bold text-base mt-1">{portal.name}</h3>
                <p className="text-xs text-[var(--text-secondary)] mt-2">{portal.description}</p>
              </div>
              <div className="pt-4 border-t border-[var(--border-subtle)] flex justify-between items-center mt-4">
                <span className="text-xs text-emerald-400 font-bold">{portal.feeEstimate}</span>
                <a href={portal.url} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1">
                  Visit Portal <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
```

---

## 6. OUTPUT & TEST CASES

### 6.1 TEST CASES AND VERIFICATION MATRIX

| Test ID | Module Tested | Test Input / Action | Expected Result | Status |
|:---:|:---|:---|:---|:---:|
| **TC-01** | User Authentication | Valid credentials submitted at `/login` | Password verified with bcrypt; JWT token generated; redirected to role dashboard. | **PASS** |
| **TC-02** | Input Autofill Override | Browser autofill triggered on login inputs | Custom CSS `:-webkit-autofill` ensures transparent/glassmorphic background with no white flash. | **PASS** |
| **TC-03** | Edge RBAC Middleware | Unauthenticated user navigates directly to `/dashboard/founder` | Request intercepted; 307 temporary redirect issued to `/login`. | **PASS** |
| **TC-04** | Dual Theme Toggling | Click Sun/Moon button in navbar | Theme class toggles between `.dark` (Cyber Obsidian) and default light (Alabaster & Royal) without hydration mismatch. | **PASS** |
| **TC-05** | Startups Directory Route | Click "Explore Startups" link in sidebar | Loads `/dashboard/explore/startups` without 404; renders filterable cards and deal sheet modal. | **PASS** |
| **TC-06** | AI Legal Compliance Check | Input healthcare drone delivery startup prompt | Generates structured statutory breakdown (HIPAA, FDA, DPDP Act) and recommended jurisdictions. | **PASS** |
| **TC-07** | Profile Photo & Banner Upload | Choose 2MB JPG photo and PNG cover banner in `/settings` | FileReader converts files to Data URLs; persists to SQLite via `/api/profile`; renders on `/profile/[userId]`. | **PASS** |
| **TC-08** | Products Marketplace | Filter by "AI Models & Agents" category | Renders filtered product cards with pricing, verified seller links, and opens simulated escrow checkout modal. | **PASS** |
| **TC-09** | Legal Advocate Consultation | Click "Book Call" on Adv. Meera Sen card | Modal collects date, time slot, and filing details; outputs confirmed booking receipt. | **PASS** |
| **TC-10** | Persistent AI Co-Founder | Pitch startup idea into floating widget | Analyzes market viability, gives "GO (88/100)" recommendation, and suggests complementary co-founders. | **PASS** |

---

### 6.2 OUTPUT SCREENSHOT PLACEHOLDERS

```text
+----------------------------------------------------------------------------------------------------+
|                                                                                                    |
|                                         [ FIGURE 1 ]                                               |
|                    LANDING PAGE WITH AURORA MESH GRADIENT & DUAL-THEME NAVBAR                      |
|                                                                                                    |
|    (Paste screenshot of http://localhost:3000 showing hero title, CTAs, and trust metrics here)    |
|                                                                                                    |
+----------------------------------------------------------------------------------------------------+
```

```text
+----------------------------------------------------------------------------------------------------+
|                                                                                                    |
|                                         [ FIGURE 2 ]                                               |
|                     ROLE-BASED USER REGISTRATION & PERSONA SELECTION INTERFACE                     |
|                                                                                                    |
| (Paste screenshot of http://localhost:3000/register showing Entrepreneur/Lawyer/Investor cards)   |
|                                                                                                    |
+----------------------------------------------------------------------------------------------------+
```

```text
+----------------------------------------------------------------------------------------------------+
|                                                                                                    |
|                                         [ FIGURE 3 ]                                               |
|                   AUTHENTICATION & LOGIN INTERFACE (FIXED AUTOFILL & STYLING)                      |
|                                                                                                    |
|       (Paste screenshot of http://localhost:3000/login showing cyber obsidian glass card)         |
|                                                                                                    |
+----------------------------------------------------------------------------------------------------+
```

```text
+----------------------------------------------------------------------------------------------------+
|                                                                                                    |
|                                         [ FIGURE 4 ]                                               |
|                       VERIFIED STARTUPS DIRECTORY & DEAL SHEET MODAL VIEW                          |
|                                                                                                    |
|   (Paste screenshot of http://localhost:3000/dashboard/explore/startups showing filtered cards)   |
|                                                                                                    |
+----------------------------------------------------------------------------------------------------+
```

```text
+----------------------------------------------------------------------------------------------------+
|                                                                                                    |
|                                         [ FIGURE 5 ]                                               |
|                      AI LEGAL COMPLIANCE NAVIGATOR & STATUTORY REPORT OUTPUT                       |
|                                                                                                    |
|  (Paste screenshot of http://localhost:3000/dashboard/founder/compliance with generated report)   |
|                                                                                                    |
+----------------------------------------------------------------------------------------------------+
```

```text
+----------------------------------------------------------------------------------------------------+
|                                                                                                    |
|                                         [ FIGURE 6 ]                                               |
|                 STARTUP LAUNCHPAD, DOCUMENT TRACKER & OFFICIAL GOVT PORTALS                        |
|                                                                                                    |
|  (Paste screenshot of http://localhost:3000/launchpad showing 5-stage roadmap & MCA portal cards) |
|                                                                                                    |
+----------------------------------------------------------------------------------------------------+
```

```text
+----------------------------------------------------------------------------------------------------+
|                                                                                                    |
|                                         [ FIGURE 7 ]                                               |
|                 VERIFIED LEGAL ADVOCATES DIRECTORY & IN-APP CONSULTATION CHAT                      |
|                                                                                                    |
|    (Paste screenshot of http://localhost:3000/advocates showing Bar Council verified cards)       |
|                                                                                                    |
+----------------------------------------------------------------------------------------------------+
```

```text
+----------------------------------------------------------------------------------------------------+
|                                                                                                    |
|                                         [ FIGURE 8 ]                                               |
|                GLOBAL PRODUCTS MARKETPLACE (SOFTWARE, AI PIPELINES & HARDWARE)                     |
|                                                                                                    |
|     (Paste screenshot of http://localhost:3000/products showing product cards & checkout modal)   |
|                                                                                                    |
+----------------------------------------------------------------------------------------------------+
```

```text
+----------------------------------------------------------------------------------------------------+
|                                                                                                    |
|                                         [ FIGURE 9 ]                                               |
|                USER PROFILE SETTINGS (CUSTOM AVATAR & BACKGROUND BANNER UPLOAD)                    |
|                                                                                                    |
|   (Paste screenshot of http://localhost:3000/settings showing live photo and cover upload boxes)  |
|                                                                                                    |
+----------------------------------------------------------------------------------------------------+
```

```text
+----------------------------------------------------------------------------------------------------+
|                                                                                                    |
|                                         [ FIGURE 10 ]                                              |
|                INTERACTIVE PUBLIC MEMBER PROFILE VIEW WITH APPS BUILT & POSTS                      |
|                                                                                                    |
|   (Paste screenshot of http://localhost:3000/profile/[userId] showing verified public showcase)   |
|                                                                                                    |
+----------------------------------------------------------------------------------------------------+
```

---
**END OF RECORD DOCUMENT**
