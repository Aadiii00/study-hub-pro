
-- 1. Remove sensitive student_name from cgpa_logs
ALTER TABLE public.cgpa_logs DROP COLUMN IF EXISTS student_name;

-- 2. Lock down notes_requests SELECT; expose sanitized view via RPC
DROP POLICY IF EXISTS "Anyone can view notes requests" ON public.notes_requests;

CREATE POLICY "Admins can view notes requests"
ON public.notes_requests
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE OR REPLACE FUNCTION public.get_public_notes_requests()
RETURNS TABLE (
  id uuid,
  branch text,
  semester integer,
  subject text,
  module text,
  description text,
  status text,
  created_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id, branch, semester, subject, module, description, status, created_at
  FROM public.notes_requests
  ORDER BY created_at DESC
  LIMIT 50;
$$;

GRANT EXECUTE ON FUNCTION public.get_public_notes_requests() TO anon, authenticated;

-- 3. Prevent privilege escalation on user_roles (restrictive policy)
CREATE POLICY "Only admins can insert roles"
ON public.user_roles
AS RESTRICTIVE
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- 4. Remove broad public listing on notes storage bucket
-- Public file downloads via public URL still work without this policy.
DROP POLICY IF EXISTS "Anyone can view notes files" ON storage.objects;
