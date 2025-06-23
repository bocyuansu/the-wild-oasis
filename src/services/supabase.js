import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://pdlvugtsyidfwvdxtlka.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkbHZ1Z3RzeWlkZnd2ZHh0bGthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0OTAzNzksImV4cCI6MjA1NzA2NjM3OX0.JFVnmjm3uDNiy3V1k3XLvum1BmjPwOwTc8XzAwj4mJ8';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
