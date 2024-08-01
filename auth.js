import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mkayoundsyjpvbejcvnh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkZnFsZ3lnYWdxc2NkaHZ3dWNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA0ODU0MjgsImV4cCI6MjAxNjA2MTQyOH0.XiWOps8ZL9ExxOU5EE4y3Le-YxUR6_NxO6kYKmzlCvs';
const supabase = createClient(supabaseUrl, supabaseKey);

export const signIn = (email, password) => supabase.auth.signIn({ email, password });
export const signUp = (email, password) => supabase.auth.signUp({ email, password });
export const signOut = () => supabase.auth.signOut();
