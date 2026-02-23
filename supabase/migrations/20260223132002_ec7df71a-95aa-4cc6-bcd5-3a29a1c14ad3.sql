
-- Create notes_requests table
CREATE TABLE public.notes_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  branch TEXT NOT NULL,
  semester INTEGER NOT NULL,
  subject TEXT NOT NULL,
  module TEXT,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.notes_requests ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a request (public form)
CREATE POLICY "Anyone can submit notes request"
ON public.notes_requests
FOR INSERT
WITH CHECK (true);

-- Anyone can view requests (community transparency)
CREATE POLICY "Anyone can view notes requests"
ON public.notes_requests
FOR SELECT
USING (true);

-- Only admins can update status
CREATE POLICY "Admins can update requests"
ON public.notes_requests
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete
CREATE POLICY "Admins can delete requests"
ON public.notes_requests
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));
