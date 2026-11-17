"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Globe,
  Code2,
  Plus,
  Trash2,
  Save,
  Loader2,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  ExternalLink,
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
  const router = useRouter();
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

  // New App Form State
  const [showAddApp, setShowAddApp] = useState(false);
  const [newAppTitle, setNewAppTitle] = useState("");
  const [newAppDesc, setNewAppDesc] = useState("");
  const [newAppTech, setNewAppTech] = useState("");
  const [newAppLive, setNewAppLive] = useState("");
  const [newAppRepo, setNewAppRepo] = useState("");

  // New Post Form State
  const [showAddPost, setShowAddPost] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostTags, setNewPostTags] = useState("");

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

            if (data.user.appsBuilt) {
              try {
                setAppsBuilt(JSON.parse(data.user.appsBuilt));
              } catch {}
            }
            if (data.user.posts) {
              try {
                setPosts(JSON.parse(data.user.posts));
              } catch {}
            }
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

      if (!res.ok) {
        throw new Error("Failed to save profile");
      }

      setSuccessMsg("Profile and portfolio successfully updated!");
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  const handleAddApp = () => {
    if (!newAppTitle.trim()) return;

    const newApp: AppItem = {
      id: "app-" + Date.now(),
      title: newAppTitle.trim(),
      description: newAppDesc.trim(),
      techStack: newAppTech
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      liveUrl: newAppLive.trim() || undefined,
      repoUrl: newAppRepo.trim() || undefined,
    };

    setAppsBuilt([newApp, ...appsBuilt]);
    setNewAppTitle("");
    setNewAppDesc("");
    setNewAppTech("");
    setNewAppLive("");
    setNewAppRepo("");
    setShowAddApp(false);
  };

  const handleDeleteApp = (id: string) => {
    setAppsBuilt(appsBuilt.filter((a) => a.id !== id));
  };

  const handleAddPost = () => {
    if (!newPostContent.trim()) return;

    const newPost: PostItem = {
      id: "post-" + Date.now(),
      content: newPostContent.trim(),
      createdAt: "Just now",
      likes: 0,
      tags: newPostTags
        .split(",")
        .map((t) => t.trim().replace(/^#/, ""))
        .filter(Boolean),
    };

    setPosts([newPost, ...posts]);
    setNewPostContent("");
    setNewPostTags("");
    setShowAddPost(false);
  };

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter((p) => p.id !== id));
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
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-[var(--border-subtle)] bg-[var(--card-bg)] backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-indigo-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <div className="h-4 w-px bg-[var(--border-subtle)]" />
          <h1 className="text-base font-bold">Profile & Account Settings</h1>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {userId && (
            <Link
              href={`/profile/${userId}`}
              className="btn-secondary text-xs px-3.5 py-1.5 flex items-center gap-1.5"
            >
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

        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3 text-sm">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSaveProfile} className="space-y-8">
          {/* Profile Picture & Background Banner Upload */}
          <div className="glass-panel p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
                <Camera className="w-5 h-5 text-indigo-500" /> Profile Picture & Background Cover
              </h2>
              <p className="text-xs text-[var(--text-muted)]">
                Upload your custom avatar and header background banner. Supported formats: JPG, PNG, WebP.
              </p>
            </div>

            {/* Background Banner Preview & Upload */}
            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-2 flex items-center justify-between">
                <span>Profile Background Banner (Recommended: 1200 x 350)</span>
                {bannerImage && (
                  <button
                    type="button"
                    onClick={() => setBannerImage("")}
                    className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove Custom Banner
                  </button>
                )}
              </label>

              <div className="relative h-44 sm:h-52 w-full rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-slate-900 group">
                {bannerImage ? (
                  <img
                    src={bannerImage}
                    alt="Cover Banner Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-indigo-900/50 via-purple-900/40 to-emerald-900/40 flex flex-col items-center justify-center p-4 text-center">
                    <ImageIcon className="w-8 h-8 text-indigo-400/70 mb-2" />
                    <p className="text-xs font-semibold text-white/90">No custom background banner uploaded</p>
                    <p className="text-[11px] text-white/50 mt-0.5">Clear Launch default aurora gradient is currently active</p>
                  </div>
                )}

                {/* Upload Action Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity backdrop-blur-xs">
                  <label className="btn-primary text-xs px-4 py-2 flex items-center gap-2 cursor-pointer shadow-lg">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Banner Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBannerFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Or enter banner URL */}
              <div className="mt-2.5 flex items-center gap-2">
                <input
                  type="url"
                  value={bannerImage}
                  onChange={(e) => setBannerImage(e.target.value)}
                  placeholder="Or paste an image URL for your banner (https://...)"
                  className="w-full px-3 py-1.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Profile Picture Avatar Upload */}
            <div className="pt-4 border-t border-[var(--border-subtle)]">
              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-3">
                Profile Avatar Photo
              </label>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                {/* Avatar Preview */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden ring-4 ring-[var(--bg-surface-elevated)] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-xl flex-shrink-0 group">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="Avatar Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{name ? name.slice(0, 2).toUpperCase() : "CL"}</span>
                  )}

                  <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-[10px] font-semibold transition-opacity gap-1 cursor-pointer">
                    <Camera className="w-4 h-4 text-indigo-300" />
                    <span>Change</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Avatar Actions & Controls */}
                <div className="flex-1 space-y-2.5 text-center sm:text-left w-full">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                    <label className="btn-primary text-xs px-3.5 py-2 flex items-center gap-1.5 cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Choose Photo File</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarFileChange}
                        className="hidden"
                      />
                    </label>

                    {avatar && (
                      <button
                        type="button"
                        onClick={() => setAvatar("")}
                        className="btn-secondary text-xs px-3 py-2 text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove Photo
                      </button>
                    )}
                  </div>

                  <p className="text-[11px] text-[var(--text-muted)]">
                    Square JPG, PNG, or WebP recommended. Maximum file size: 5MB.
                  </p>

                  <div>
                    <input
                      type="url"
                      value={avatar}
                      onChange={(e) => setAvatar(e.target.value)}
                      placeholder="Or paste an avatar photo URL (https://...)"
                      className="w-full px-3 py-1.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="glass-panel p-6 sm:p-8">
            <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-500" /> Basic Details & Bio
            </h2>
            <p className="text-xs text-[var(--text-muted)] mb-6">
              This information is displayed publicly on your Clear Launch member profile.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-sm focus:border-indigo-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
                  Role / Profession
                </label>
                <input
                  type="text"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  placeholder="e.g. AI Systems Architect / Founder"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-sm focus:border-indigo-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
                  Bio & Professional Summary
                </label>
                <textarea
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Share your background, what you are building, previous startup exits, or what you are looking for..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-sm focus:border-indigo-500 focus:outline-none transition-colors resize-none"
                />
              </div>
            </div>
          </div>

          {/* Contact & Socials */}
          <div className="glass-panel p-6 sm:p-8">
            <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
              <Globe className="w-5 h-5 text-emerald-500" /> Contact & Social Links
            </h2>
            <p className="text-xs text-[var(--text-muted)] mb-6">
              Help co-founders, legal advocates, and investors get in touch with you.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> Public Contact Email
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="founder@startup.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-sm focus:border-indigo-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> Phone Number (Optional)
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-sm focus:border-indigo-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 flex items-center gap-1.5">
                  <GithubIcon className="w-3.5 h-3.5" /> GitHub Profile URL
                </label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/username"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-sm focus:border-indigo-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 flex items-center gap-1.5">
                  <LinkedinIcon className="w-3.5 h-3.5" /> LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-sm focus:border-indigo-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" /> Personal Website / Portfolio URL
                </label>
                <input
                  type="url"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  placeholder="https://myportfolio.dev"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-sm focus:border-indigo-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Apps & Software Built Manager */}
          <div className="glass-panel p-6 sm:p-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Code2 className="w-5 h-5 text-indigo-500" /> Apps & Software Built
              </h2>
              <button
                type="button"
                onClick={() => setShowAddApp(!showAddApp)}
                className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> {showAddApp ? "Cancel" : "Add App"}
              </button>
            </div>
            <p className="text-xs text-[var(--text-muted)] mb-6">
              Showcase software, repositories, or hardware kits you have created.
            </p>

            {/* Add App Form */}
            {showAddApp && (
              <div className="p-4 rounded-xl bg-[var(--bg-surface-elevated)] border border-indigo-500/30 mb-6 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  New Project Showcase
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-[var(--text-muted)] mb-1">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      value={newAppTitle}
                      onChange={(e) => setNewAppTitle(e.target.value)}
                      placeholder="e.g. NextAuth Starter"
                      className="w-full px-3 py-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--text-muted)] mb-1">
                      Tech Stack (comma separated)
                    </label>
                    <input
                      type="text"
                      value={newAppTech}
                      onChange={(e) => setNewAppTech(e.target.value)}
                      placeholder="Next.js, Tailwind, Prisma"
                      className="w-full px-3 py-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--text-muted)] mb-1">
                      Live URL (optional)
                    </label>
                    <input
                      type="url"
                      value={newAppLive}
                      onChange={(e) => setNewAppLive(e.target.value)}
                      placeholder="https://app.dev"
                      className="w-full px-3 py-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--text-muted)] mb-1">
                      Repo Link (optional)
                    </label>
                    <input
                      type="url"
                      value={newAppRepo}
                      onChange={(e) => setNewAppRepo(e.target.value)}
                      placeholder="https://github.com/..."
                      className="w-full px-3 py-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs text-[var(--text-muted)] mb-1">
                      Brief Description
                    </label>
                    <textarea
                      rows={2}
                      value={newAppDesc}
                      onChange={(e) => setNewAppDesc(e.target.value)}
                      placeholder="What problem does this solve and what is its architecture?"
                      className="w-full px-3 py-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs focus:outline-none resize-none"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={handleAddApp}
                    className="btn-primary text-xs px-4 py-1.5"
                  >
                    Save Project to List
                  </button>
                </div>
              </div>
            )}

            {/* List of existing apps */}
            {appsBuilt.length > 0 ? (
              <div className="space-y-3">
                {appsBuilt.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]"
                  >
                    <div>
                      <h4 className="font-semibold text-sm">{app.title}</h4>
                      <p className="text-xs text-[var(--text-secondary)] line-clamp-1">
                        {app.description}
                      </p>
                      <div className="flex gap-1.5 mt-1.5">
                        {app.techStack.map((tech, i) => (
                          <span
                            key={i}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--card-bg)] text-[var(--text-muted)] font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteApp(app.id)}
                      className="p-2 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Remove App"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[var(--text-muted)] italic">
                No apps listed yet. Click &quot;Add App&quot; above to showcase your work.
              </p>
            )}
          </div>

          {/* Posts & Updates Manager */}
          <div className="glass-panel p-6 sm:p-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-purple-500" /> Posts & Milestones
              </h2>
              <button
                type="button"
                onClick={() => setShowAddPost(!showAddPost)}
                className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> {showAddPost ? "Cancel" : "New Post"}
              </button>
            </div>
            <p className="text-xs text-[var(--text-muted)] mb-6">
              Post startup updates, funding milestones, or hiring calls.
            </p>

            {/* Add Post Form */}
            {showAddPost && (
              <div className="p-4 rounded-xl bg-[var(--bg-surface-elevated)] border border-purple-500/30 mb-6 space-y-3">
                <textarea
                  rows={3}
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Share a thought, milestone, or question with the Clear Launch community..."
                  className="w-full px-3 py-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs focus:outline-none resize-none"
                />
                <input
                  type="text"
                  value={newPostTags}
                  onChange={(e) => setNewPostTags(e.target.value)}
                  placeholder="Tags (comma separated, e.g. launch, hiring, legal)"
                  className="w-full px-3 py-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs focus:outline-none"
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleAddPost}
                    className="btn-primary text-xs px-4 py-1.5"
                  >
                    Publish Post to List
                  </button>
                </div>
              </div>
            )}

            {/* List of existing posts */}
            {posts.length > 0 ? (
              <div className="space-y-3">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-start justify-between p-3.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]"
                  >
                    <div>
                      <p className="text-xs text-[var(--text-secondary)] mb-1">
                        {post.content}
                      </p>
                      <div className="flex gap-2 text-[10px] text-[var(--text-muted)]">
                        <span>{post.createdAt}</span>
                        {post.tags?.map((t, idx) => (
                          <span key={idx} className="text-indigo-400">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeletePost(post.id)}
                      className="p-1.5 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Delete Post"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[var(--text-muted)] italic">
                No posts created yet.
              </p>
            )}
          </div>

          {/* Submit Action */}
          <div className="sticky bottom-6 z-20 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary px-8 py-3 text-sm flex items-center gap-2 shadow-xl shadow-indigo-500/25 cursor-pointer disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving Changes...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Save Profile Details
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
