-- Create function to increment download count
CREATE OR REPLACE FUNCTION public.increment_download_count(note_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.notes 
  SET download_count = download_count + 1 
  WHERE id = note_id;
END;
$$;