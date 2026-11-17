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
  const targetRegion = region || "United States";
  return {
    summary: `Based on your idea — "${idea.substring(0, 100)}..." — we've identified key regulatory requirements for operating in ${targetRegion} as a ${model || "B2C"} business. This analysis covers data privacy, industry-specific licensing, and consumer protection regulations.`,
    geographicalSuitability: {
      recommended: [
        {
          region: "United States (Delaware)",
          reason: "Business-friendly incorporation laws, strong tech ecosystem, and established regulatory frameworks.",
        },
        {
          region: "Singapore",
          reason: "Progressive fintech and tech regulations, strategic APAC location, and startup-friendly policies.",
        },
        {
          region: "United Kingdom",
          reason: "FCA sandbox for innovative business models, access to European markets, and strong legal system.",
        },
      ],
      cautionary: [
        {
          region: "European Union",
          reason: "Strict GDPR compliance required. Additional regulations for AI and health data under consideration.",
        },
        {
          region: "China",
          reason: "Complex licensing requirements, data localization mandates, and foreign ownership restrictions.",
        },
      ],
    },
    complianceChecklist: [
      {
        item: "Business Registration & Incorporation",
        category: "Corporate Law",
        priority: "HIGH" as const,
        description: "Register your business entity (LLC, C-Corp, etc.) in your target jurisdiction. Delaware C-Corp recommended for startups seeking VC funding.",
      },
      {
        item: "Data Privacy Compliance (GDPR/CCPA)",
        category: "Data Protection",
        priority: "HIGH" as const,
        description: "Implement privacy policies, data processing agreements, and user consent mechanisms. Appoint a DPO if processing EU citizen data.",
      },
      {
        item: "Industry-Specific Licensing",
        category: "Regulatory",
        priority: "HIGH" as const,
        description: "Obtain required licenses based on your industry (e.g., healthcare: HIPAA compliance, fintech: money transmitter license, food: FDA registration).",
      },
      {
        item: "Terms of Service & User Agreements",
        category: "Consumer Protection",
        priority: "MEDIUM" as const,
        description: "Draft comprehensive Terms of Service, Privacy Policy, and End User License Agreement (EULA) for your platform.",
      },
      {
        item: "Intellectual Property Protection",
        category: "IP Law",
        priority: "MEDIUM" as const,
        description: "File for trademark protection, consider provisional patents for novel technology, and implement trade secret protocols.",
      },
      {
        item: "Tax Registration & Compliance",
        category: "Tax Law",
        priority: "MEDIUM" as const,
        description: "Register for federal and state tax IDs, understand sales tax obligations, and set up proper accounting systems.",
      },
      {
        item: "Employment & Contractor Laws",
        category: "Labor Law",
        priority: "LOW" as const,
        description: "Ensure compliance with employment laws, proper contractor classification (1099 vs W-2), and equity compensation regulations.",
      },
    ],
    actionableLinks: [
      {
        title: "U.S. Small Business Administration — Business Guide",
        url: "https://www.sba.gov/business-guide",
        description: "Official U.S. government resource for starting and managing a business.",
      },
      {
        title: "Delaware Division of Corporations",
        url: "https://corp.delaware.gov/",
        description: "Register a Delaware corporation or LLC online.",
      },
      {
        title: "GDPR Official Text & Resources",
        url: "https://gdpr.eu/",
        description: "Complete guide to GDPR compliance for businesses handling EU citizen data.",
      },
      {
        title: "USPTO — Trademark Electronic Application System",
        url: "https://www.uspto.gov/trademarks",
        description: "File trademark applications to protect your brand.",
      },
      {
        title: "IRS — Employer Identification Number",
        url: "https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online",
        description: "Apply for a federal EIN for tax purposes.",
      },
    ],
  };
}

async function analyzeWithGemini(idea: string, region?: string, model?: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return generateMockResults(idea, region, model);
  }

  try {
    const { GoogleGenAI } = await import("@google/genai");
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `You are a legal compliance analyst for startups. Analyze the following startup idea and provide a comprehensive legal compliance assessment.

Startup Idea: ${idea}
Target Region: ${region || "Global"}
Business Model: ${model || "B2C"}

Respond ONLY with valid JSON in this exact format (no markdown, no code fences, just raw JSON):
{
  "summary": "Brief 2-3 sentence summary of the key regulatory considerations.",
  "geographicalSuitability": {
    "recommended": [
      { "region": "Region Name", "reason": "Why this region is suitable" }
    ],
    "cautionary": [
      { "region": "Region Name", "reason": "Why caution is needed" }
    ]
  },
  "complianceChecklist": [
    {
      "item": "Requirement name",
      "category": "Category (e.g., Data Protection, Corporate Law)",
      "priority": "HIGH or MEDIUM or LOW",
      "description": "Detailed description of the requirement"
    }
  ],
  "actionableLinks": [
    {
      "title": "Resource title",
      "url": "https://actual-government-or-official-url.com",
      "description": "What this resource helps with"
    }
  ]
}

Provide at least 3 recommended regions, 2 cautionary regions, 5-7 compliance items with realistic priorities, and 4-5 actionable links to real government or official resources.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const text = response.text || "";
    // Clean the response - remove any markdown code fences if present
    const cleanedText = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const parsed = JSON.parse(cleanedText);
    return parsed;
  } catch (error) {
    console.error("Gemini API error:", error);
    // Fallback to mock data if API fails
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

    // Run AI analysis
    const results = await analyzeWithGemini(idea, targetRegion, businessModel);

    // Save to database
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
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
