
CREATE TABLE public.cgpa_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name text,
  branch text,
  semester text,
  sgpa numeric,
  cgpa numeric,
  percentage numeric,
  calculation_type text NOT NULL DEFAULT 'sgpa',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.cgpa_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view cgpa_logs" ON public.cgpa_logs
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can insert cgpa_logs" ON public.cgpa_logs
  FOR INSERT WITH CHECK (true);
