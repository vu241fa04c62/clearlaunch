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
