"use client";

import Link from "next/link";
import Image from "next/image";

interface UserAvatarProps {
  userId: string;
  name: string;
  avatar?: string;
  role?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showName?: boolean;
  subtitle?: string;
  clickable?: boolean;
  className?: string;
}

export function UserAvatar({
  userId,
  name,
  avatar,
  role,
  size = "md",
  showName = false,
  subtitle,
  clickable = true,
  className = "",
}: UserAvatarProps) {
  const sizeClasses = {
    sm: "w-7 h-7 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-xl",
  };

  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "CL";

  const avatarContent = (
    <div className={`flex items-center gap-2.5 ${clickable ? "group cursor-pointer" : ""} ${className}`}>
      <div
        className={`relative ${sizeClasses[size]} rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center font-semibold border transition-all duration-200 ${
          clickable
            ? "group-hover:scale-105 group-hover:border-indigo-400 group-hover:shadow-md group-hover:shadow-indigo-500/20"
            : ""
        } border-slate-300 dark:border-slate-700 bg-gradient-to-tr from-indigo-500/20 to-emerald-500/20 text-indigo-600 dark:text-indigo-400`}
      >
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>

      {showName && (
        <div className="min-w-0 text-left">
          <p
            className={`font-medium truncate transition-colors text-slate-900 dark:text-slate-100 ${
              clickable ? "group-hover:text-indigo-600 dark:group-hover:text-indigo-400" : ""
            } ${size === "sm" ? "text-xs" : size === "lg" ? "text-base font-semibold" : "text-sm"}`}
          >
            {name}
          </p>
          {(subtitle || role) && (
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
              {subtitle || role}
            </p>
          )}
        </div>
      )}
    </div>
  );

  if (clickable && userId) {
    return (
      <Link href={`/profile/${userId}`} className="inline-flex">
        {avatarContent}
      </Link>
    );
  }

  return avatarContent;
}
