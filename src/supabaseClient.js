// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mkayoundsyjpvbejcvnh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rYXlvdW5kc3lqcHZiZWpjdm5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk1MzkwNTgsImV4cCI6MjAxNTExNTA1OH0.RVVkcFxkfycYdSwoAfkONPmaDfgzAd-9DVZUHWn13ps';

export const supabase = createClient(supabaseUrl, supabaseKey);
