import { useEffect, useState } from "react";
import { User, Mail, Calendar, Palette, Heart, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

  return (
    <MainLayout>
      <div className="p-6 lg:p-8 space-y-8 max-w-4xl">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Profile
            </h1>
          </div>
          <p className="text-muted-foreground">
            Manage your account settings
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          {/* Cover */}
          <div className="h-32 gradient-hero" />

          {/* Profile Info */}
          <div className="p-6 -mt-16">
            <div className="flex flex-col md:flex-row md:items-end gap-4">
              <div className="w-24 h-24 rounded-2xl gradient-primary flex items-center justify-center text-3xl font-bold text-white shadow-glow-md">
                {user?.email?.[0].toUpperCase()}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-display font-bold text-foreground">
                  {profile?.username || user?.email?.split("@")[0]}
                </h2>
                <p className="text-muted-foreground">{user?.email}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="p-4 bg-muted rounded-xl">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Palette className="w-4 h-4" />
                  <span className="text-sm">Palettes</span>
                </div>
                <p className="text-2xl font-bold">{stats.palettesCreated}</p>
              </div>
              <div className="p-4 bg-muted rounded-xl">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">Favorites</span>
                </div>
                <p className="text-2xl font-bold">{stats.favorites}</p>
              </div>
              <div className="p-4 bg-muted rounded-xl">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">Email</span>
                </div>
                <p className="text-sm font-medium truncate">{user?.email}</p>
              </div>
              <div className="p-4 bg-muted rounded-xl">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Joined</span>
                </div>
                <p className="text-sm font-medium">
                  {user?.created_at
                    ? new Date(user.created_at).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center gap-2 mb-6">
            <Settings className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-display font-bold">Account Settings</h3>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="flex gap-2">
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="max-w-md"
                />
                <Button
                  onClick={updateProfile}
                  disabled={saving || username === profile?.username}
                  className="gradient-primary text-white hover:opacity-90"
                >
                  {saving ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input value={user?.email || ""} disabled className="max-w-md" />
              <p className="text-xs text-muted-foreground">
                Email cannot be changed
              </p>
            </div>

            <div className="pt-4 border-t border-border">
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="text-destructive hover:text-destructive"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
