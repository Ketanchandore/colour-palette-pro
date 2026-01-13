import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, Award, Crown, Star, Gem, TrendingUp, Users, Zap, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LeaderboardEntry {
  user_id: string;
  username: string | null;
  avatar_url: string | null;
  total_usage: number;
  rank: number;
  tier: 'free' | 'silver' | 'gold' | 'diamond';
}

const tierLabels: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  silver: { label: 'Starter', color: 'bg-gradient-to-r from-slate-400 to-gray-500 text-white', icon: <Star className="w-3 h-3" /> },
  gold: { label: 'Pro', color: 'bg-gradient-to-r from-amber-400 to-yellow-500 text-white', icon: <Crown className="w-3 h-3" /> },
  diamond: { label: 'Elite', color: 'bg-gradient-to-r from-cyan-400 to-purple-500 text-white', icon: <Gem className="w-3 h-3" /> },
};

const rankIcons = [
  <Trophy className="w-6 h-6 text-yellow-500" />,
  <Medal className="w-6 h-6 text-gray-400" />,
  <Award className="w-6 h-6 text-amber-600" />,
];

export default function Leaderboard() {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRank, setUserRank] = useState<LeaderboardEntry | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      // Get usage data with profiles
      const { data: usageData, error: usageError } = await supabase
        .from('usage_tracking')
        .select('user_id, tool_usage_count')
        .order('tool_usage_count', { ascending: false })
        .limit(100);

      if (usageError) throw usageError;

      // Get profiles for these users
      const userIds = usageData?.map(u => u.user_id) || [];
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('user_id, username, avatar_url')
        .in('user_id', userIds);

      // Get subscriptions for these users
      const { data: subscriptionsData } = await supabase
        .from('subscriptions')
        .select('user_id, tier, is_active')
        .in('user_id', userIds)
        .eq('is_active', true);

      // Aggregate usage per user (sum all months)
      const userUsage = new Map<string, number>();
      usageData?.forEach(u => {
        const current = userUsage.get(u.user_id) || 0;
        userUsage.set(u.user_id, current + u.tool_usage_count);
      });

      // Create leaderboard entries
      const entries: LeaderboardEntry[] = Array.from(userUsage.entries())
        .map(([userId, totalUsage]) => {
          const profile = profilesData?.find(p => p.user_id === userId);
          const subscription = subscriptionsData?.find(s => s.user_id === userId);
          return {
            user_id: userId,
            username: profile?.username || null,
            avatar_url: profile?.avatar_url || null,
            total_usage: totalUsage,
            rank: 0,
            tier: (subscription?.tier as 'free' | 'silver' | 'gold' | 'diamond') || 'free',
          };
        })
        .sort((a, b) => b.total_usage - a.total_usage)
        .map((entry, index) => ({ ...entry, rank: index + 1 }));

      setLeaderboard(entries.slice(0, 50));
      setLastUpdated(new Date());

      // Find current user's rank
      if (user) {
        const userEntry = entries.find(e => e.user_id === user.id);
        setUserRank(userEntry || null);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-white font-medium">
            <Trophy className="w-5 h-5" />
            Leaderboard
          </div>
          <h1 className="text-4xl font-display font-bold">
            Top Color Creators
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            See who's using Colour Pine the most! Rankings update every 24 hours.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-6 h-6 mx-auto text-primary mb-2" />
              <p className="text-2xl font-bold">{leaderboard.length}</p>
              <p className="text-xs text-muted-foreground">Active Users</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-6 h-6 mx-auto text-emerald-500 mb-2" />
              <p className="text-2xl font-bold">{leaderboard[0]?.total_usage || 0}</p>
              <p className="text-xs text-muted-foreground">Top Score</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Zap className="w-6 h-6 mx-auto text-amber-500 mb-2" />
              <p className="text-2xl font-bold">{userRank?.rank || '-'}</p>
              <p className="text-xs text-muted-foreground">Your Rank</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <RefreshCw className="w-6 h-6 mx-auto text-blue-500 mb-2" />
              <p className="text-sm font-medium">{lastUpdated.toLocaleTimeString()}</p>
              <p className="text-xs text-muted-foreground">Last Updated</p>
            </CardContent>
          </Card>
        </div>

        {/* Your Rank Card */}
        {userRank && (
          <Card className="border-2 border-primary bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
                  #{userRank.rank}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">You</span>
                    {userRank.tier !== 'free' && tierLabels[userRank.tier] && (
                      <Badge className={cn("text-xs gap-1", tierLabels[userRank.tier].color)}>
                        {tierLabels[userRank.tier].icon}
                        {tierLabels[userRank.tier].label}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{userRank.total_usage} total uses</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Leaderboard List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              Top 50 Users
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : leaderboard.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No users yet. Be the first to use the tools!
              </div>
            ) : (
              <div className="divide-y divide-border">
                {leaderboard.map((entry, index) => (
                  <motion.div
                    key={entry.user_id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className={cn(
                      "flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors",
                      entry.user_id === user?.id && "bg-primary/5"
                    )}
                  >
                    {/* Rank */}
                    <div className="w-10 text-center">
                      {index < 3 ? (
                        rankIcons[index]
                      ) : (
                        <span className="text-lg font-bold text-muted-foreground">#{entry.rank}</span>
                      )}
                    </div>

                    {/* Avatar */}
                    {entry.avatar_url ? (
                      <img
                        src={entry.avatar_url}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center text-white font-bold",
                        index === 0 ? "bg-gradient-to-br from-yellow-400 to-amber-500" :
                        index === 1 ? "bg-gradient-to-br from-gray-400 to-slate-500" :
                        index === 2 ? "bg-gradient-to-br from-amber-600 to-orange-600" :
                        "bg-gradient-to-br from-primary to-secondary"
                      )}>
                        {(entry.username || 'U')[0].toUpperCase()}
                      </div>
                    )}

                    {/* Name and Badge */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium truncate">
                          {entry.username || `User ${entry.user_id.slice(0, 8)}`}
                        </span>
                        {entry.tier !== 'free' && tierLabels[entry.tier] && (
                          <Badge className={cn("text-xs gap-1", tierLabels[entry.tier].color)}>
                            {tierLabels[entry.tier].icon}
                            {tierLabels[entry.tier].label}
                          </Badge>
                        )}
                        {entry.user_id === user?.id && (
                          <Badge variant="outline" className="text-xs">You</Badge>
                        )}
                      </div>
                    </div>

                    {/* Score */}
                    <div className="text-right">
                      <span className="font-bold text-lg">{entry.total_usage}</span>
                      <p className="text-xs text-muted-foreground">uses</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Refresh Button */}
        <div className="text-center">
          <Button onClick={fetchLeaderboard} disabled={loading} variant="outline">
            <RefreshCw className={cn("w-4 h-4 mr-2", loading && "animate-spin")} />
            Refresh Rankings
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}