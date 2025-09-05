-- Create admin_teams table
CREATE TABLE public.admin_teams (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(name)
);

-- Create admin_team_members table
CREATE TABLE public.admin_team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_team_id UUID NOT NULL REFERENCES public.admin_teams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.user_registration_requests(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'member', 'viewer')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(admin_team_id, user_id)
);

-- Enable RLS on admin_teams
ALTER TABLE public.admin_teams ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_teams
CREATE POLICY "Anyone can view admin teams" 
ON public.admin_teams 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage admin teams" 
ON public.admin_teams 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Enable RLS on admin_team_members
ALTER TABLE public.admin_team_members ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_team_members
CREATE POLICY "Anyone can view admin team members" 
ON public.admin_team_members 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage admin team members" 
ON public.admin_team_members 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Create trigger for automatic timestamp updates on admin_teams
CREATE TRIGGER update_admin_teams_updated_at
BEFORE UPDATE ON public.admin_teams
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();