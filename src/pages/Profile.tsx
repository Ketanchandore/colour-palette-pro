import { useEffect, useState, useRef } from "react";
import { User, Mail, Calendar, Palette, Heart, Settings, Shield, Bell, Sparkles, TrendingUp, Eye, Edit3, Camera, Award, Zap, Check, X, Crown, Star, Gem } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription, SUBSCRIPTION_CONFIG } from "@/hooks/useSubscription";
import { toast } from "sonner";

interface ProfileData {
  username: string | null;
  avatar_url: string | null;
  cover_url: string | null;
  selected_theme: string | null;
}

interface Stats {
  palettesCreated: number;
  favorites: number;
}

// Premium Themes Configuration
const premiumThemes = [
  {
    id: 'default',
    name: 'Classic',
    description: 'Clean and professional',
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
    accent: 'bg-violet-500',
    free: true,
  },
  {
    id: 'ocean',
    name: 'Ocean Breeze',
    description: 'Calm and refreshing',
    gradient: 'from-cyan-500 via-blue-500 to-indigo-600',
    accent: 'bg-cyan-500',
    free: false,
  },
  {
    id: 'sunset',
    name: 'Golden Sunset',
    description: 'Warm and vibrant',
    gradient: 'from-orange-400 via-rose-500 to-purple-600',
    accent: 'bg-orange-500',
    free: false,
  },
  {
    id: 'forest',
    name: 'Emerald Forest',
    description: 'Natural and grounded',
    gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
    accent: 'bg-emerald-500',
    free: false,
  },
];

export default function Profile() {
  const { user, loading: authLoading, signOut } = useAuth();
  const { tier, level, isSubscribed } = useSubscription();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [stats, setStats] = useState<Stats>({ palettesCreated: 0, favorites: 0 });
  const [username, setUsername] = useState("");
  const [saving, setSaving] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  
  // Image upload states
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  
  // Modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPublicModal, setShowPublicModal] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);
  
  // Selected theme
  const [selectedTheme, setSelectedTheme] = useState('default');

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
      .select("username, avatar_url, cover_url, selected_theme")
      .eq("user_id", user.id)
      .maybeSingle();

    if (data) {
      setProfile(data as ProfileData);
      setUsername(data.username || "");
      setSelectedTheme(data.selected_theme || 'default');
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
      setShowEditModal(false);
    }
    setSaving(false);
  }

  async function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    if (!user || !event.target.files || event.target.files.length === 0) return;
    
    const file = event.target.files[0];
    const fileExt = file.name.split('.').pop();
    const filePath = `${user.id}/avatar.${fileExt}`;
    
    setUploadingAvatar(true);
    
    try {
      // Delete old avatar if exists
      await supabase.storage.from('avatars').remove([`${user.id}/avatar.png`, `${user.id}/avatar.jpg`, `${user.id}/avatar.jpeg`, `${user.id}/avatar.webp`]);
      
      // Upload new avatar
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });
      
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
      
      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: urlData.publicUrl })
        .eq('user_id', user.id);
      
      if (updateError) throw updateError;
      
      setProfile((prev) => prev ? { ...prev, avatar_url: urlData.publicUrl } : null);
      toast.success("Avatar updated successfully!");
    } catch (error: any) {
      toast.error("Failed to upload avatar: " + error.message);
    } finally {
      setUploadingAvatar(false);
    }
  }

  async function uploadCover(event: React.ChangeEvent<HTMLInputElement>) {
    if (!user || !event.target.files || event.target.files.length === 0) return;
    
    const file = event.target.files[0];
    const fileExt = file.name.split('.').pop();
    const filePath = `${user.id}/cover.${fileExt}`;
    
    setUploadingCover(true);
    
    try {
      // Delete old cover if exists
      await supabase.storage.from('covers').remove([`${user.id}/cover.png`, `${user.id}/cover.jpg`, `${user.id}/cover.jpeg`, `${user.id}/cover.webp`]);
      
      // Upload new cover
      const { error: uploadError } = await supabase.storage
        .from('covers')
        .upload(filePath, file, { upsert: true });
      
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data: urlData } = supabase.storage
        .from('covers')
        .getPublicUrl(filePath);
      
      // Update profile with new cover URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ cover_url: urlData.publicUrl })
        .eq('user_id', user.id);
      
      if (updateError) throw updateError;
      
      setProfile((prev) => prev ? { ...prev, cover_url: urlData.publicUrl } : null);
      toast.success("Cover updated successfully!");
    } catch (error: any) {
      toast.error("Failed to upload cover: " + error.message);
    } finally {
      setUploadingCover(false);
    }
  }

  async function updateTheme(themeId: string) {
    if (!user) return;
    
    const { error } = await supabase
      .from('profiles')
      .update({ selected_theme: themeId })
      .eq('user_id', user.id);
    
    if (error) {
      toast.error("Failed to update theme");
    } else {
      setSelectedTheme(themeId);
      setProfile((prev) => prev ? { ...prev, selected_theme: themeId } : null);
      toast.success("Theme updated!");
    }
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
  const currentTheme = premiumThemes.find(t => t.id === selectedTheme) || premiumThemes[0];

  return (
    <MainLayout>
      <div className="p-6 lg:p-8 space-y-8 max-w-5xl">
        {/* Hidden file inputs */}
        <input 
          type="file" 
          ref={avatarInputRef} 
          onChange={uploadAvatar} 
          accept="image/*" 
          className="hidden" 
        />
        <input 
          type="file" 
          ref={coverInputRef} 
          onChange={uploadCover} 
          accept="image/*" 
          className="hidden" 
        />

        {/* Hero Profile Card */}
        <div className="relative bg-card rounded-3xl border border-border overflow-hidden shadow-lg">
          {/* Animated Gradient Cover */}
          <div className="h-40 relative overflow-hidden">
            {profile?.cover_url ? (
              <img 
                src={profile.cover_url} 
                alt="Cover" 
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <div className={`absolute inset-0 bg-gradient-to-r ${currentTheme.gradient} opacity-90`} />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
              </>
            )}
            
            {/* Floating Elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
            <div className="absolute bottom-4 left-1/4 w-16 h-16 bg-primary/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: "0.5s" }} />
            <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-secondary/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: "1s" }} />
            
            {/* Edit Cover Button */}
            <button 
              onClick={() => coverInputRef.current?.click()}
              disabled={uploadingCover}
              className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-xl backdrop-blur-sm transition-all group z-10"
            >
              {uploadingCover ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Camera className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              )}
            </button>
          </div>

          {/* Profile Content */}
          <div className="px-6 pb-6 -mt-16 relative">
            <div className="flex flex-col md:flex-row md:items-end gap-4">
              {/* Avatar with Edit */}
              <div className="relative group">
                {profile?.avatar_url ? (
                  <img 
                    src={profile.avatar_url} 
                    alt="Avatar" 
                    className="w-28 h-28 rounded-2xl object-cover shadow-glow-md ring-4 ring-card"
                  />
                ) : (
                  <div className={`w-28 h-28 rounded-2xl bg-gradient-to-br ${currentTheme.gradient} flex items-center justify-center text-4xl font-bold text-white shadow-glow-md ring-4 ring-card`}>
                    {user?.email?.[0].toUpperCase()}
                  </div>
                )}
                <button 
                  onClick={() => avatarInputRef.current?.click()}
                  disabled={uploadingAvatar}
                  className="absolute -bottom-2 -right-2 p-2 bg-primary rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {uploadingAvatar ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Edit3 className="w-4 h-4 text-white" />
                  )}
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
                  {isSubscribed && (
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full flex items-center gap-1 ${
                      tier === 'diamond' ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white' :
                      tier === 'gold' ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-white' :
                      'bg-gradient-to-r from-slate-400 to-gray-500 text-white'
                    }`}>
                      {tier === 'diamond' ? <Gem className="w-3 h-3" /> : tier === 'gold' ? <Crown className="w-3 h-3" /> : <Star className="w-3 h-3" />}
                      {tier.charAt(0).toUpperCase() + tier.slice(1)} User
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground">{user?.email}</p>
                <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Member since {memberSince.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-xl"
                  onClick={() => setShowPublicModal(true)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View Public
                </Button>
                <Button 
                  size="sm" 
                  className={`rounded-xl bg-gradient-to-r ${currentTheme.gradient} text-white hover:opacity-90`}
                  onClick={() => setShowEditModal(true)}
                >
                  <Edit3 className="w-4 h-4 mr-1" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Themes Section */}
        <div className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold">Premium Themes</h3>
                <p className="text-sm text-muted-foreground">Personalize your profile experience</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="rounded-xl" onClick={() => setShowThemeModal(true)}>
              View All
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {premiumThemes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => updateTheme(theme.id)}
                className={`relative p-4 rounded-xl border-2 transition-all ${
                  selectedTheme === theme.id 
                    ? 'border-primary shadow-lg scale-105' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className={`h-12 rounded-lg bg-gradient-to-r ${theme.gradient} mb-3`} />
                <p className="font-medium text-sm">{theme.name}</p>
                <p className="text-xs text-muted-foreground">{theme.description}</p>
                {selectedTheme === theme.id && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
                {!theme.free && selectedTheme !== theme.id && (
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-amber-500/10 text-amber-500 text-[10px] font-bold rounded">
                    PRO
                  </div>
                )}
              </button>
            ))}
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
            <p className="text-3xl font-bold text-foreground">Level {level}</p>
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
                    className={`bg-gradient-to-r ${currentTheme.gradient} text-white hover:opacity-90 rounded-xl`}
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

      {/* Edit Profile Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>Update your profile information</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Profile Photo</Label>
              <div className="flex items-center gap-4">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="Avatar" className="w-16 h-16 rounded-xl object-cover" />
                ) : (
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${currentTheme.gradient} flex items-center justify-center text-xl font-bold text-white`}>
                    {user?.email?.[0].toUpperCase()}
                  </div>
                )}
                <Button variant="outline" size="sm" onClick={() => avatarInputRef.current?.click()}>
                  Change Photo
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Cover Image</Label>
              <div className="flex items-center gap-4">
                {profile?.cover_url ? (
                  <img src={profile.cover_url} alt="Cover" className="w-24 h-12 rounded-lg object-cover" />
                ) : (
                  <div className={`w-24 h-12 rounded-lg bg-gradient-to-r ${currentTheme.gradient}`} />
                )}
                <Button variant="outline" size="sm" onClick={() => coverInputRef.current?.click()}>
                  Change Cover
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-username">Username</Label>
              <Input
                id="edit-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </div>
            <Button 
              onClick={updateProfile} 
              disabled={saving}
              className={`w-full bg-gradient-to-r ${currentTheme.gradient} text-white`}
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Public Profile Modal */}
      <Dialog open={showPublicModal} onOpenChange={setShowPublicModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Public Profile Preview</DialogTitle>
            <DialogDescription>This is how others see your profile</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="rounded-2xl border border-border overflow-hidden">
              <div className={`h-24 bg-gradient-to-r ${currentTheme.gradient} relative`}>
                {profile?.cover_url && (
                  <img src={profile.cover_url} alt="Cover" className="w-full h-full object-cover" />
                )}
              </div>
              <div className="p-4 -mt-8">
                <div className="flex items-end gap-4">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="Avatar" className="w-16 h-16 rounded-xl object-cover ring-4 ring-card" />
                  ) : (
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${currentTheme.gradient} flex items-center justify-center text-xl font-bold text-white ring-4 ring-card`}>
                      {user?.email?.[0].toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-lg">{profile?.username || user?.email?.split("@")[0]}</h3>
                    <p className="text-sm text-muted-foreground">{stats.palettesCreated} palettes • {stats.favorites} favorites</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-muted rounded-xl">
              <p className="text-sm text-muted-foreground text-center">
                Your public profile link:
                <br />
                <code className="text-primary font-mono text-xs">colourpine.com/u/{profile?.username || user?.email?.split("@")[0]}</code>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Theme Selection Modal */}
      <Dialog open={showThemeModal} onOpenChange={setShowThemeModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-500" />
              Premium Themes
            </DialogTitle>
            <DialogDescription>Choose a theme that matches your style</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            {premiumThemes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => {
                  updateTheme(theme.id);
                  setShowThemeModal(false);
                }}
                className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                  selectedTheme === theme.id 
                    ? 'border-primary shadow-lg' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className={`h-16 rounded-lg bg-gradient-to-r ${theme.gradient} mb-3`} />
                <p className="font-semibold">{theme.name}</p>
                <p className="text-sm text-muted-foreground">{theme.description}</p>
                {selectedTheme === theme.id && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
                {!theme.free && (
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-amber-500 text-white text-xs font-bold rounded">
                    PRO
                  </div>
                )}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
