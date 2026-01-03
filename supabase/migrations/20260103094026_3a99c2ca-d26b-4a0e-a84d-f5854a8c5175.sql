-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  username TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- Create palettes table
CREATE TABLE public.palettes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  colors JSONB NOT NULL DEFAULT '[]'::jsonb,
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  likes_count INTEGER NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on palettes
ALTER TABLE public.palettes ENABLE ROW LEVEL SECURITY;

-- Palettes are publicly viewable
CREATE POLICY "Palettes are viewable by everyone" ON public.palettes FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create palettes" ON public.palettes FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update their own palettes" ON public.palettes FOR UPDATE USING (auth.uid() = created_by);
CREATE POLICY "Users can delete their own palettes" ON public.palettes FOR DELETE USING (auth.uid() = created_by);

-- Create user_favorites table
CREATE TABLE public.user_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  palette_id UUID REFERENCES public.palettes(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, palette_id)
);

-- Enable RLS on user_favorites
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;

-- User favorites policies
CREATE POLICY "Users can view their own favorites" ON public.user_favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can add to favorites" ON public.user_favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove from favorites" ON public.user_favorites FOR DELETE USING (auth.uid() = user_id);

-- Create user_collections table
CREATE TABLE public.user_collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on user_collections
ALTER TABLE public.user_collections ENABLE ROW LEVEL SECURITY;

-- User collections policies
CREATE POLICY "Users can view their own collections" ON public.user_collections FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create collections" ON public.user_collections FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own collections" ON public.user_collections FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own collections" ON public.user_collections FOR DELETE USING (auth.uid() = user_id);

-- Create collection_palettes junction table
CREATE TABLE public.collection_palettes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id UUID REFERENCES public.user_collections(id) ON DELETE CASCADE NOT NULL,
  palette_id UUID REFERENCES public.palettes(id) ON DELETE CASCADE NOT NULL,
  added_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(collection_id, palette_id)
);

-- Enable RLS on collection_palettes
ALTER TABLE public.collection_palettes ENABLE ROW LEVEL SECURITY;

-- Collection palettes policies (users can manage palettes in their collections)
CREATE POLICY "Users can view palettes in their collections" ON public.collection_palettes 
FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.user_collections WHERE id = collection_id AND user_id = auth.uid())
);
CREATE POLICY "Users can add palettes to their collections" ON public.collection_palettes 
FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.user_collections WHERE id = collection_id AND user_id = auth.uid())
);
CREATE POLICY "Users can remove palettes from their collections" ON public.collection_palettes 
FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.user_collections WHERE id = collection_id AND user_id = auth.uid())
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_collections_updated_at
  BEFORE UPDATE ON public.user_collections
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, username)
  VALUES (new.id, new.raw_user_meta_data ->> 'username');
  RETURN new;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert some initial trending palettes
INSERT INTO public.palettes (name, colors, category, tags, likes_count, is_featured) VALUES
('Sunset Vibes', '["#FF6B6B", "#FEC89A", "#FFD93D", "#6BCB77", "#4D96FF"]', 'Nature', ARRAY['warm', 'vibrant', 'sunset'], 245, true),
('Ocean Breeze', '["#0077B6", "#00B4D8", "#90E0EF", "#CAF0F8", "#03045E"]', 'Nature', ARRAY['cool', 'calm', 'ocean'], 189, true),
('Forest Dream', '["#2D6A4F", "#40916C", "#52B788", "#74C69D", "#95D5B2"]', 'Nature', ARRAY['green', 'natural', 'forest'], 156, true),
('Berry Crush', '["#7209B7", "#B5179E", "#F72585", "#FF4D6D", "#FF758F"]', 'Mood', ARRAY['vibrant', 'energetic', 'pink'], 203, true),
('Midnight Sky', '["#1A1A2E", "#16213E", "#0F3460", "#533483", "#E94560"]', 'Mood', ARRAY['dark', 'elegant', 'night'], 178, true),
('Pastel Paradise', '["#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF"]', 'Style', ARRAY['pastel', 'soft', 'gentle'], 267, true),
('Neon Nights', '["#00FF87", "#00D9FF", "#FF00FF", "#FF0080", "#FFFF00"]', 'Style', ARRAY['neon', 'bright', 'electric'], 134, true),
('Earthy Tones', '["#582F0E", "#7F4F24", "#936639", "#A68A64", "#B6AD90"]', 'Nature', ARRAY['earth', 'brown', 'natural'], 98, false),
('Cotton Candy', '["#FFC6FF", "#E7C6FF", "#C8B6FF", "#B8C0FF", "#BBD0FF"]', 'Style', ARRAY['pastel', 'purple', 'soft'], 145, true),
('Autumn Leaves', '["#D62828", "#F77F00", "#FCBF49", "#EAE2B7", "#003049"]', 'Nature', ARRAY['autumn', 'warm', 'fall'], 167, true),
('Minimalist Gray', '["#212529", "#343A40", "#495057", "#6C757D", "#ADB5BD"]', 'Style', ARRAY['minimal', 'gray', 'professional'], 89, false),
('Tropical Punch', '["#FF6B35", "#F7C59F", "#2EC4B6", "#011627", "#FDFFFC"]', 'Nature', ARRAY['tropical', 'bright', 'summer'], 212, true);