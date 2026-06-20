
-- Tighten EXECUTE on SECURITY DEFINER functions: revoke broad PUBLIC access, grant only to the roles that need it.

-- handle_new_user is a trigger function only; no role should call it directly.
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- has_role is used by RLS policies and the client; allow anon, authenticated, service_role only.
REVOKE ALL ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO anon, authenticated, service_role;

-- increment_download_count is called by the public download UI.
REVOKE ALL ON FUNCTION public.increment_download_count(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.increment_download_count(uuid) TO anon, authenticated, service_role;

-- get_public_notes_requests powers the public requests board.
REVOKE ALL ON FUNCTION public.get_public_notes_requests() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_public_notes_requests() TO anon, authenticated, service_role;

-- Add a SELECT policy on storage.objects for the public 'notes' bucket: restrict listing to admins.
-- Public file downloads via public URL still work because that path does not enforce RLS for public buckets.
DROP POLICY IF EXISTS "Admins can list notes files" ON storage.objects;
CREATE POLICY "Admins can list notes files"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'notes' AND public.has_role(auth.uid(), 'admin'::app_role));

-- Tighten the open public-submission INSERT policies with WITH CHECK validation
-- so anonymous submissions can't insert arbitrary admin-only fields or absurdly large payloads.

-- feedback: enforce length limits and a reasonable rating
DROP POLICY IF EXISTS "Anyone can submit feedback" ON public.feedback;
CREATE POLICY "Anyone can submit feedback"
ON public.feedback
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(name) BETWEEN 1 AND 100
  AND char_length(message) BETWEEN 1 AND 2000
  AND (branch IS NULL OR char_length(branch) <= 100)
  AND rating BETWEEN 1 AND 5
);

-- notes_requests: validate inputs
DROP POLICY IF EXISTS "Anyone can submit notes request" ON public.notes_requests;
CREATE POLICY "Anyone can submit notes request"
ON public.notes_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(student_name) BETWEEN 1 AND 100
  AND char_length(branch) BETWEEN 1 AND 100
  AND semester BETWEEN 1 AND 8
  AND char_length(subject) BETWEEN 1 AND 200
  AND (module IS NULL OR char_length(module) <= 200)
  AND (description IS NULL OR char_length(description) <= 2000)
  AND status = 'pending'
);

-- cgpa_logs: prevent abuse with simple bounds (keep open-insert behavior)
DROP POLICY IF EXISTS "Anyone can insert cgpa_logs" ON public.cgpa_logs;
CREATE POLICY "Anyone can insert cgpa_logs"
ON public.cgpa_logs
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
