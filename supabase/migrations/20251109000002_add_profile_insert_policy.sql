-- Create a policy to allow authenticated users to insert their own profile.
-- This is necessary for the 'upsert' operation to work when a profile does not yet exist for a user.
CREATE POLICY "Users can create their own profile."
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);
