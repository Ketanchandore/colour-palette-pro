import { useEffect, useState } from "react";
import { User, Mail, Calendar, Palette, Heart, Settings, Shield, Bell, Sparkles, TrendingUp, Eye, Edit3, Camera, Award, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface ProfileData {
  username: string | null;
  avatar_url: string | null;
}

interface Stats {
  palettesCreated: number;
  favorites: number;
}

export default function Profile() {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [stats, setStats] = useState<Stats>({ palettesCreated: 0, favorites: 0 });
  const [username, setUsername] = useState("");
  const [saving, setSaving] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchStats();
    }
  }, [user]);

  async function fetchProfile() {
    if (!user) return;

    const { data } = await supabase
      .from("profiles")
      .select("username, avatar_url")
      .eq("user_id", user.id)
      .maybeSingle();

    if (data) {
      setProfile(data);
      setUsername(data.username || "");
    }
  }

  async function fetchStats() {
    if (!user) return;

    const [palettesResult, favoritesResult] = await Promise.all([
      supabase
        .from("palettes")
        .select("id", { count: "exact", head: true })
        .eq("created_by", user.id),
      supabase
        .from("user_favorites")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id),
    ]);

    setStats({
      palettesCreated: palettesResult.count || 0,
      favorites: favoritesResult.count || 0,
    });
  }

  async function updateProfile() {
    if (!user) return;

    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ username })
      .eq("user_id", user.id);

    if (error) {
      toast.error("Failed to update profile");
    } else {
      toast.success("Profile updated!");
      setProfile((prev) => (prev ? { ...prev, username } : null));
    }
    setSaving(false);
  }

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading) {
    return (
      <MainLayout>
        <div className="p-6 lg:p-8 flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </MainLayout>
    );
  }

  const memberSince = user?.created_at ? new Date(user.created_at) : new Date();
  const daysActive = Math.floor((Date.now() - memberSince.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <MainLayout>
      <div className="p-6 lg:p-8 space-y-8 max-w-5xl">
        {/* Hero Profile Card */}
        <div className="relative bg-card rounded-3xl border border-border overflow-hidden shadow-lg">
          {/* Animated Gradient Cover */}
          <div className="h-40 relative overflow-hidden">
            <div className="absolute inset-0 gradient-hero opacity-90" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
            
            {/* Floating Elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
            <div className="absolute bottom-4 left-1/4 w-16 h-16 bg-primary/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: "0.5s" }} />
            <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-secondary/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: "1s" }} />
            
            {/* Edit Cover Button */}
            <button className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-xl backdrop-blur-sm transition-all group">
              <Camera className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Profile Content */}
          <div className="px-6 pb-6 -mt-16 relative">
            <div className="flex flex-col md:flex-row md:items-end gap-4">
              {/* Avatar with Edit */}
              <div className="relative group">
                <div className="w-28 h-28 rounded-2xl gradient-primary flex items-center justify-center text-4xl font-bold text-white shadow-glow-md ring-4 ring-card">
                  {user?.email?.[0].toUpperCase()}
                </div>
                <button className="absolute -bottom-2 -right-2 p-2 bg-primary rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <Edit3 className="w-4 h-4 text-white" />
                </button>
                {/* Online Status */}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full ring-2 ring-card" />
              </div>
              
              {/* User Info */}
              <div className="flex-1 mt-4 md:mt-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-2xl font-display font-bold text-foreground">
                    {profile?.username || user?.email?.split("@")[0]}
                  </h2>
                  <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Pro User
                  </span>
                </div>
                <p className="text-muted-foreground">{user?.email}</p>
                <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Member since {memberSince.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="rounded-xl">
                  <Eye className="w-4 h-4 mr-1" />
                  View Public
                </Button>
                <Button size="sm" className="rounded-xl gradient-primary text-white hover:opacity-90">
                  <Edit3 className="w-4 h-4 mr-1" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card rounded-2xl border border-border p-5 hover:shadow-lg transition-shadow group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-3xl font-bold text-foreground">{stats.palettesCreated}</p>
            <p className="text-sm text-muted-foreground">Palettes Created</p>
          </div>
          
          <div className="bg-card rounded-2xl border border-border p-5 hover:shadow-lg transition-shadow group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-3xl font-bold text-foreground">{stats.favorites}</p>
            <p className="text-sm text-muted-foreground">Favorites</p>
          </div>
          
          <div className="bg-card rounded-2xl border border-border p-5 hover:shadow-lg transition-shadow group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6 text-white" />
              </div>
              <Zap className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-3xl font-bold text-foreground">{daysActive}</p>
            <p className="text-sm text-muted-foreground">Days Active</p>
          </div>
          
          <div className="bg-card rounded-2xl border border-border p-5 hover:shadow-lg transition-shadow group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <Sparkles className="w-4 h-4 text-teal-500" />
            </div>
            <p className="text-3xl font-bold text-foreground">Level 3</p>
            <p className="text-sm text-muted-foreground">Creator Rank</p>
          </div>
        </div>

        {/* Settings Cards */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Account Settings */}
          <div className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold">Account Settings</h3>
                <p className="text-sm text-muted-foreground">Manage your personal info</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">Username</Label>
                <div className="flex gap-2">
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="rounded-xl"
                  />
                  <Button
                    onClick={updateProfile}
                    disabled={saving || username === profile?.username}
                    className="gradient-primary text-white hover:opacity-90 rounded-xl"
                  >
                    {saving ? "..." : "Save"}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Email Address</Label>
                <Input value={user?.email || ""} disabled className="rounded-xl bg-muted" />
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Verified and cannot be changed
                </p>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold">Notifications</h3>
                <p className="text-sm text-muted-foreground">Control your alerts</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">Get instant alerts</p>
                  </div>
                </div>
                <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
              </div>
            </div>
          </div>
        </div>

        {/* Security & Sign Out */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-display font-bold">Security</h3>
              <p className="text-sm text-muted-foreground">Manage your account security</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" className="rounded-xl flex-1">
              <Shield className="w-4 h-4 mr-2" />
              Change Password
            </Button>
            <Button 
              variant="outline" 
              onClick={handleSignOut}
              className="rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10 flex-1"
            >
              Sign Out of Account
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
