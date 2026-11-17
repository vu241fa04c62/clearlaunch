import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { MOCK_USERS, UserProfile } from "@/lib/mockData";
import { UserAvatar } from "@/components/UserAvatar";
import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";
import {
  Globe,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Code2,
  Sparkles,
  ArrowLeft,
  Calendar,
  ThumbsUp,
  MessageSquare,
  Share2,
  CheckCircle2,
  Briefcase,
  Layers,
  Camera,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";

interface Props {
  params: Promise<{ userId: string }>;
}

export default async function PublicProfilePage({ params }: Props) {
  const { userId } = await params;
  const session = await auth();

  // Try to find in mock data first, then check database
  let profile: UserProfile | null = MOCK_USERS.find((u) => u.id === userId) || null;

  if (!profile) {
    // Check database
    try {
      const dbUser = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (dbUser) {
        let parsedApps: any[] = [];
        let parsedPosts: any[] = [];
        try {
          if (dbUser.appsBuilt) parsedApps = JSON.parse(dbUser.appsBuilt);
        } catch {}
        try {
          if (dbUser.posts) parsedPosts = JSON.parse(dbUser.posts);
        } catch {}

        profile = {
          id: dbUser.id,
          name: dbUser.name || "Clear Launch Member",
          email: dbUser.email,
          role: dbUser.role as any,
          profession: dbUser.profession || "Tech Founder / Builder",
          bio: dbUser.bio || "Active member on Clear Launch building the future of software and tech startups.",
          avatar: dbUser.image || "",
          bannerImage: dbUser.bannerImage || undefined,
          phone: dbUser.phone || undefined,
          contactEmail: dbUser.contactEmail || dbUser.email,
          githubUrl: dbUser.githubUrl || undefined,
          linkedinUrl: dbUser.linkedinUrl || undefined,
          portfolioUrl: dbUser.portfolioUrl || undefined,
          appsBuilt: parsedApps,
          posts: parsedPosts,
          skills: ["Startup Founder", "Clear Launch Certified", "Tech Builder"],
        };
      }
    } catch (err) {
      console.error("Error fetching db user:", err);
    }
  }

  // Fallback if user is logged in and viewing their own profile ID
  if (!profile && session?.user?.id === userId) {
    profile = {
      id: session.user.id,
      name: session.user.name || "You",
      email: session.user.email || "",
      role: (session.user as any).role || "USER",
      profession: "Clear Launch Member",
      bio: "Welcome to your public profile. Edit your details in Settings to showcase your apps and social links.",
      avatar: session.user.image || "",
      appsBuilt: [],
      posts: [],
      skills: ["Founder", "Innovator"],
    };
  }

  if (!profile) {
    // Graceful fallback to first mock user with banner so no 404
    profile = MOCK_USERS[0];
  }

  const isSelf = session?.user?.id === profile.id;

  const roleBadgeColors: Record<string, string> = {
    ENTREPRENEUR: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
    LAWYER: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    INVESTOR: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    USER: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Top Navigation */}
      <header className="sticky top-0 z-30 border-b border-[var(--border-subtle)] bg-[var(--card-bg)] backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-indigo-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <div className="h-4 w-px bg-[var(--border-subtle)]" />
          <span className="text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400">
            Public Member Profile
          </span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {isSelf && (
            <Link
              href="/settings"
              className="btn-primary text-xs px-3.5 py-1.5"
            >
              Edit Profile
            </Link>
          )}
        </div>
      </header>

      {/* Hero Banner with Custom Background or Aurora Gradient */}
      <div className="relative h-48 md:h-64 w-full bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-emerald-900/30 overflow-hidden">
        {profile.bannerImage ? (
          <img
            src={profile.bannerImage}
            alt="Profile background"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent" />
        )}

        {isSelf && (
          <Link
            href="/settings"
            className="absolute top-4 right-6 text-xs text-white bg-black/60 hover:bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-1.5 transition-all shadow-md group"
          >
            <Camera className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
            <span>Edit Cover & Avatar</span>
          </Link>
        )}

        <div className="absolute bottom-4 right-6 text-xs text-slate-300 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Clear Launch Verified Identity
        </div>
      </div>

      {/* Main Profile Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Profile Header Card */}
        <div className="relative -mt-20 glass-panel p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[var(--border-subtle)]">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden ring-4 ring-[var(--bg-surface)] shadow-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white group/avatar">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  profile.name.slice(0, 2).toUpperCase()
                )}

                {isSelf && (
                  <Link
                    href="/settings"
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover/avatar:opacity-100 flex flex-col items-center justify-center text-white text-[11px] font-semibold transition-opacity gap-1"
                  >
                    <Camera className="w-5 h-5 text-indigo-300" />
                    <span>Upload Photo</span>
                  </Link>
                )}
              </div>

              <div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mb-1.5">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    {profile.name}
                  </h1>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold tracking-wider ${
                      roleBadgeColors[profile.role] || "bg-slate-500/10 text-slate-400"
                    }`}
                  >
                    {profile.role}
                  </span>
                </div>
                <p className="text-base text-indigo-500 dark:text-indigo-400 font-medium">
                  {profile.profession}
                </p>
                {profile.location && (
                  <p className="text-xs text-[var(--text-muted)] flex items-center justify-center sm:justify-start gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5" /> {profile.location}
                  </p>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center justify-center sm:justify-end gap-3 flex-wrap">
              {profile.contactEmail && (
                <a
                  href={`mailto:${profile.contactEmail}`}
                  className="btn-primary text-sm py-2 px-4"
                >
                  <Mail className="w-4 h-4" /> Contact
                </a>
              )}
              {profile.phone && (
                <a
                  href={`tel:${profile.phone}`}
                  className="btn-secondary text-sm py-2 px-3"
                  title="Phone Number"
                >
                  <Phone className="w-4 h-4" />
                </a>
              )}
              {isSelf && (
                <Link
                  href="/settings"
                  className="btn-secondary text-sm py-2 px-4"
                >
                  Edit Profile
                </Link>
              )}
            </div>
          </div>

          {/* Bio & Social Badges */}
          <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                  About & Background
                </h3>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)] whitespace-pre-line">
                  {profile.bio}
                </p>
              </div>

              {profile.skills && profile.skills.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                    Core Skills & Focus
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2.5 py-1 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Social Links & Details */}
            <div className="space-y-4 p-4 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Verified Links & Socials
              </h3>

              <div className="space-y-2.5">
                {profile.githubUrl && (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-xs p-2 rounded-lg hover:bg-[var(--card-bg)] border border-transparent hover:border-[var(--border-subtle)] transition-all group"
                  >
                    <span className="flex items-center gap-2 text-[var(--text-secondary)] group-hover:text-indigo-400">
                      <GithubIcon className="w-4 h-4" /> GitHub Repository
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                  </a>
                )}

                {profile.linkedinUrl && (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-xs p-2 rounded-lg hover:bg-[var(--card-bg)] border border-transparent hover:border-[var(--border-subtle)] transition-all group"
                  >
                    <span className="flex items-center gap-2 text-[var(--text-secondary)] group-hover:text-blue-500">
                      <LinkedinIcon className="w-4 h-4" /> LinkedIn Profile
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                  </a>
                )}

                {profile.portfolioUrl && (
                  <a
                    href={profile.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-xs p-2 rounded-lg hover:bg-[var(--card-bg)] border border-transparent hover:border-[var(--border-subtle)] transition-all group"
                  >
                    <span className="flex items-center gap-2 text-[var(--text-secondary)] group-hover:text-emerald-400">
                      <Globe className="w-4 h-4" /> Personal Website
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                  </a>
                )}

                {profile.contactEmail && (
                  <div className="flex items-center justify-between text-xs p-2 text-[var(--text-muted)]">
                    <span className="flex items-center gap-2">
                      <Mail className="w-4 h-4" /> {profile.contactEmail}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Apps & Software Built Showcase Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight">Apps & Software Built</h2>
                <p className="text-xs text-[var(--text-muted)]">
                  Shipped projects, open source packages, and production systems
                </p>
              </div>
            </div>
            {isSelf && (
              <Link href="/settings" className="text-xs text-indigo-500 hover:underline">
                + Add Project
              </Link>
            )}
          </div>

          {profile.appsBuilt && profile.appsBuilt.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {profile.appsBuilt.map((app) => (
                <div key={app.id} className="glass-card p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-bold text-base text-[var(--text-primary)]">
                        {app.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        {app.repoUrl && (
                          <a
                            href={app.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] transition-colors"
                            title="Source Code"
                          >
                            <GithubIcon className="w-4 h-4" />
                          </a>
                        )}
                        {app.liveUrl && (
                          <a
                            href={app.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-indigo-500 hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors"
                            title="Live Demo"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                      {app.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--border-subtle)]">
                    {app.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-panel p-8 text-center">
              <p className="text-sm text-[var(--text-muted)]">No software projects showcased yet.</p>
              {isSelf && (
                <Link href="/settings" className="btn-primary text-xs mt-3 inline-flex">
                  Add Your First App
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Posts & Updates Feed */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight">Posts & Updates</h2>
                <p className="text-xs text-[var(--text-muted)]">
                  Insights, startup milestones, and community announcements
                </p>
              </div>
            </div>
            {isSelf && (
              <Link href="/settings" className="text-xs text-indigo-500 hover:underline">
                + Create Post
              </Link>
            )}
          </div>

          {profile.posts && profile.posts.length > 0 ? (
            <div className="space-y-4">
              {profile.posts.map((post) => (
                <div key={post.id} className="glass-card p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <UserAvatar
                        userId={profile!.id}
                        name={profile!.name}
                        avatar={profile!.avatar}
                        size="sm"
                        clickable={false}
                      />
                      <div>
                        <p className="text-xs font-semibold text-[var(--text-primary)]">
                          {profile!.name}
                        </p>
                        <p className="text-[10px] text-[var(--text-muted)]">{post.createdAt}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                    {post.content}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)] text-xs text-[var(--text-muted)]">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors">
                        <ThumbsUp className="w-3.5 h-3.5" /> {post.likes} Likes
                      </button>
                      <button className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors">
                        <MessageSquare className="w-3.5 h-3.5" /> Comment
                      </button>
                    </div>
                    {post.tags && (
                      <div className="flex gap-1.5">
                        {post.tags.map((t, idx) => (
                          <span key={idx} className="text-[10px] text-indigo-400">
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-panel p-8 text-center">
              <p className="text-sm text-[var(--text-muted)]">No posts published yet.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
