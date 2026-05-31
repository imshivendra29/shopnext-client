"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Camera, Check, ChevronRight, Eye, EyeOff,
  KeyRound, Loader2, LogOut, Phone, User, X,
} from "lucide-react";
import { useAuth } from "@/features/auth/AuthContext";
import {
  changePassword,
  getProfile,
  logoutUser,
  updateProfile,
} from "@/features/auth/api/auth.service";

// ─── Types ───────────────────────────────────────────────
type Tab = "profile" | "password";
type Msg = { type: "success" | "error" | ""; text: string };

// ─── OTP Modal ───────────────────────────────────────────
function OtpModal({
  phone,
  onVerify,
  onClose,
}: {
  phone: string;
  onVerify: () => void;
  onClose: () => void;
}) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [sent, setSent] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSend = () => setSent(true);

  const handleChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) inputs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0)
      inputs.current[i - 1]?.focus();
  };

  const handleVerify = () => {
    setVerifying(true);
    setError("");
    // OTP backend band hai — always pass
    setTimeout(() => {
      setVerifying(false);
      onVerify();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-bold text-zinc-900">Verify Phone</h3>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
          >
            <X size={16} />
          </button>
        </div>

        {!sent ? (
          <>
            <p className="mb-5 text-sm text-zinc-500">
              OTP will be sent to{" "}
              <span className="font-semibold text-zinc-900">{phone}</span>
            </p>
            <button
              onClick={handleSend}
              className="w-full rounded-xl bg-[#0B1220] py-3 text-sm font-semibold text-white hover:bg-black"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <p className="mb-5 text-sm text-zinc-500">
              Enter 6-digit OTP sent to{" "}
              <span className="font-semibold text-zinc-900">{phone}</span>
            </p>

            {/* OTP boxes */}
            <div className="mb-4 flex gap-2 justify-center">
              {otp.map((val, i) => (
                <input
                  key={i}
                  ref={(el) => { inputs.current[i] = el; }}
                  value={val}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  maxLength={1}
                  className="h-12 w-10 rounded-xl border border-zinc-200 text-center text-lg font-bold text-zinc-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                />
              ))}
            </div>

            {error && (
              <p className="mb-3 text-center text-xs text-red-500">{error}</p>
            )}

            <button
              onClick={handleVerify}
              disabled={verifying || otp.some((d) => !d)}
              className="w-full rounded-xl bg-[#0B1220] py-3 text-sm font-semibold text-white hover:bg-black disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {verifying && <Loader2 size={15} className="animate-spin" />}
              {verifying ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              onClick={() => setSent(false)}
              className="mt-3 w-full text-center text-xs text-zinc-400 hover:text-zinc-600"
            >
              Resend OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Field Row ────────────────────────────────────────────
function FieldRow({
  label,
  value,
  onChange,
  onSave,
  saving,
  msg,
  type = "text",
  disabled = false,
  placeholder = "",
  note = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onSave: () => void;
  saving: boolean;
  msg: Msg;
  type?: string;
  disabled?: boolean;
  placeholder?: string;
  note?: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-4">
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
          className={`flex-1 rounded-xl border px-4 py-2.5 text-sm text-zinc-900 outline-none transition
            ${disabled
              ? "border-zinc-100 bg-zinc-100 text-zinc-400 cursor-not-allowed"
              : "border-zinc-200 bg-white focus:border-zinc-400"
            }`}
        />
        {!disabled && (
          <button
            onClick={onSave}
            disabled={saving}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0B1220] text-white hover:bg-black disabled:opacity-50"
          >
            {saving
              ? <Loader2 size={15} className="animate-spin" />
              : <ChevronRight size={16} />
            }
          </button>
        )}
      </div>
      {note && <p className="mt-1.5 text-xs text-zinc-400">{note}</p>}
      {msg.text && (
        <p className={`mt-1.5 text-xs font-medium ${msg.type === "success" ? "text-green-600" : "text-red-500"}`}>
          {msg.type === "success" ? "✓ " : "✗ "}{msg.text}
        </p>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────
export default function ProfilePage() {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const fileRef = useRef<HTMLInputElement>(null);

  const [tab, setTab] = useState<Tab>("profile");
  const [pageLoading, setPageLoading] = useState(true);

  // Field states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  // Per-field saving + msg
  const [nameSaving, setNameSaving] = useState(false);
  const [nameMsg, setNameMsg] = useState<Msg>({ type: "", text: "" });

  const [phoneSaving, setPhoneSaving] = useState(false);
  const [phoneMsg, setPhoneMsg] = useState<Msg>({ type: "", text: "" });
  const [showOtp, setShowOtp] = useState(false);
  const [pendingPhone, setPendingPhone] = useState("");

  const [dobSaving, setDobSaving] = useState(false);
  const [dobMsg, setDobMsg] = useState<Msg>({ type: "", text: "" });

  const [avatarSaving, setAvatarSaving] = useState(false);
  const [avatarMsg, setAvatarMsg] = useState<Msg>({ type: "", text: "" });

  // Password states
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [pwSaving, setPwSaving] = useState(false);
  const [pwMsg, setPwMsg] = useState<Msg>({ type: "", text: "" });

  // Fresh fetch — no cache
  const fetchFresh = async () => {
    const data = await getProfile();
    setName(data.name ?? "");
    setEmail(data.email ?? "");
    setPhone(data.phone ?? "");
    setDob(data.dateOfBirth ? data.dateOfBirth.slice(0, 10) : "");
    setAvatarUrl(data.profileImageUrl ?? "");
    setAvatarFile(null);
    setAvatarPreview("");
  };

  useEffect(() => {
    fetchFresh().finally(() => setPageLoading(false));  
  }, []);

  // Generic field updater
  const saveField = async (
    fd: FormData,
    setSaving: (v: boolean) => void,
    setMsg: (m: Msg) => void,
    successText: string
  ) => {
    try {
      setSaving(true);
      setMsg({ type: "", text: "" });
      await updateProfile(fd);
      await fetchFresh();
      await refreshUser();
      setMsg({ type: "success", text: successText });
    } catch {
      setMsg({ type: "error", text: "Update failed. Try again." });
    } finally {
      setSaving(false);
    }
  };

  const handleNameSave = () => {
    if (!name.trim()) return setNameMsg({ type: "error", text: "Name cannot be empty." });
    const fd = new FormData();
    fd.append("Name", name);
    saveField(fd, setNameSaving, setNameMsg, "Name updated.");
  };

  const handlePhoneSave = () => {
    if (!phone.trim()) return setPhoneMsg({ type: "error", text: "Phone cannot be empty." });
    setPendingPhone(phone);
    setShowOtp(true);
  };

  const handleOtpVerified = async () => {
    setShowOtp(false);
    const fd = new FormData();
    fd.append("Phone", pendingPhone);
    saveField(fd, setPhoneSaving, setPhoneMsg, "Phone updated.");
  };

const handleDobSave = () => {
  if (!dob) return setDobMsg({ type: "error", text: "Please select a date." });
  const fd = new FormData();
  fd.append("DateOfBirth", dob); // "2000-01-15"
  saveField(fd, setDobSaving, setDobMsg, "Date of birth updated.");
};
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleAvatarSave = async () => {
    if (!avatarFile) return;
    const fd = new FormData();
    fd.append("ProfileImage", avatarFile);
    saveField(fd, setAvatarSaving, setAvatarMsg, "Photo updated.");
  };

  const handlePasswordSave = async () => {
    if (newPw !== confirmPw)
      return setPwMsg({ type: "error", text: "Passwords do not match." });
    if (newPw.length < 6)
      return setPwMsg({ type: "error", text: "Minimum 6 characters." });
    try {
      setPwSaving(true);
      setPwMsg({ type: "", text: "" });
      await changePassword({ currentPassword: currentPw, newPassword: newPw });
      setCurrentPw(""); setNewPw(""); setConfirmPw("");
      setPwMsg({ type: "success", text: "Password changed successfully." });
    } catch {
      setPwMsg({ type: "error", text: "Current password is incorrect." });
    } finally {
      setPwSaving(false);
    }
  };

  const handleLogout = () => {
    logoutUser();
    router.push("/");
  };

  const displayAvatar = avatarPreview || avatarUrl;

  if (pageLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="animate-spin text-zinc-300" size={36} />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-8">
      <div className="mx-auto max-w-xl">

        {/* Header */}
        <div className="mb-6 rounded-2xl border border-zinc-200 bg-white p-5">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="h-16 w-16 overflow-hidden rounded-2xl bg-amber-100 flex items-center justify-center">
                {displayAvatar ? (
                  <img src={displayAvatar} alt="avatar" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-2xl font-bold text-amber-600">
                    {name?.[0]?.toUpperCase() ?? "U"}
                  </span>
                )}
              </div>
              <button
                onClick={() => fileRef.current?.click()}
                className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-lg bg-[#0B1220] text-white border-2 border-white"
              >
                <Camera size={11} />
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="font-bold text-zinc-900 truncate">{name}</p>
              <p className="text-xs text-zinc-500 truncate">{email}</p>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-xl border border-zinc-200 px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-50 shrink-0"
            >
              <LogOut size={13} /> Logout
            </button>
          </div>

          {/* Avatar save row */}
          {avatarFile && (
            <div className="mt-3 flex items-center gap-3 rounded-xl bg-amber-50 border border-amber-100 px-4 py-2.5">
              <p className="flex-1 text-xs text-amber-700">New photo selected</p>
              <button
                onClick={handleAvatarSave}
                disabled={avatarSaving}
                className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-black hover:bg-amber-400 disabled:opacity-60"
              >
                {avatarSaving ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                {avatarSaving ? "Saving..." : "Save Photo"}
              </button>
              <button onClick={() => { setAvatarFile(null); setAvatarPreview(""); }} className="text-zinc-400 hover:text-zinc-600">
                <X size={14} />
              </button>
            </div>
          )}
          {avatarMsg.text && (
            <p className={`mt-2 text-xs font-medium ${avatarMsg.type === "success" ? "text-green-600" : "text-red-500"}`}>
              {avatarMsg.text}
            </p>
          )}
        </div>

        {/* Tabs */}
        <div className="mb-5 flex gap-1 rounded-xl bg-zinc-100 p-1">
          {([
            { key: "profile", icon: <User size={14} />, label: "Edit Profile" },
            { key: "password", icon: <KeyRound size={14} />, label: "Password" },
          ] as const).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition ${
                tab === t.key ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-700"
              }`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {tab === "profile" && (
          <div className="space-y-3">
            <FieldRow
              label="Full Name"
              value={name}
              onChange={setName}
              onSave={handleNameSave}
              saving={nameSaving}
              msg={nameMsg}
              placeholder="Your name"
            />
            <FieldRow
              label="Email"
              value={email}
              onChange={() => {}}
              onSave={() => {}}
              saving={false}
              msg={{ type: "", text: "" }}
              disabled
              note="Email cannot be changed."
            />
            <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-4">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Phone Number
              </label>
              <div className="flex items-center gap-2">
                <div className="flex flex-1 items-center overflow-hidden rounded-xl border border-zinc-200 bg-white">
                  <Phone size={15} className="ml-3 shrink-0 text-zinc-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 XXXXXXXXXX"
                    className="flex-1 bg-transparent px-3 py-2.5 text-sm text-zinc-900 outline-none"
                  />
                </div>
                <button
                  onClick={handlePhoneSave}
                  disabled={phoneSaving}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0B1220] text-white hover:bg-black disabled:opacity-50"
                >
                  {phoneSaving ? <Loader2 size={15} className="animate-spin" /> : <ChevronRight size={16} />}
                </button>
              </div>
              {phoneMsg.text && (
                <p className={`mt-1.5 text-xs font-medium ${phoneMsg.type === "success" ? "text-green-600" : "text-red-500"}`}>
                  {phoneMsg.type === "success" ? "✓ " : "✗ "}{phoneMsg.text}
                </p>
              )}
            </div>

            <FieldRow
              label="Date of Birth"
              value={dob}
              onChange={setDob}
              onSave={handleDobSave}
              saving={dobSaving}
              msg={dobMsg}
              type="date"
            />
          </div>
        )}

        {/* Password Tab */}
        {tab === "password" && (
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 space-y-4">
            {pwMsg.text && (
              <div className={`rounded-xl px-4 py-3 text-sm font-medium ${
                pwMsg.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
              }`}>
                {pwMsg.text}
              </div>
            )}

            {[
              { label: "Current Password", val: currentPw, set: setCurrentPw, show: showCurrent, toggle: () => setShowCurrent(p => !p) },
              { label: "New Password", val: newPw, set: setNewPw, show: showNew, toggle: () => setShowNew(p => !p) },
            ].map((f) => (
              <div key={f.label}>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700">{f.label}</label>
                <div className="flex items-center rounded-xl border border-zinc-200 px-4 focus-within:border-zinc-400">
                  <input
                    type={f.show ? "text" : "password"}
                    value={f.val}
                    onChange={(e) => f.set(e.target.value)}
                    className="flex-1 bg-transparent py-3 text-sm text-zinc-900 outline-none"
                  />
                  <button onClick={f.toggle} className="text-zinc-400 hover:text-zinc-600">
                    {f.show ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
            ))}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">Confirm New Password</label>
              <input
                type="password"
                value={confirmPw}
                onChange={(e) => setConfirmPw(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 outline-none focus:border-zinc-400"
              />
            </div>

            <button
              onClick={handlePasswordSave}
              disabled={pwSaving}
              className="w-full rounded-xl bg-[#0B1220] py-3 text-sm font-semibold text-white hover:bg-black disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {pwSaving && <Loader2 size={15} className="animate-spin" />}
              {pwSaving ? "Changing..." : "Change Password"}
            </button>
          </div>
        )}
      </div>

      {/* OTP Modal */}
      {showOtp && (
        <OtpModal
          phone={pendingPhone}
          onVerify={handleOtpVerified}
          onClose={() => setShowOtp(false)}
        />
      )}
    </main>
  );
}