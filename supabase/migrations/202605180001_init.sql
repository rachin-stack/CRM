create extension if not exists "pgcrypto";

create table organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table profiles (
  id uuid primary key,
  organization_id uuid references organizations(id),
  full_name text,
  role text not null check (role in ('admin','sales_manager','sales_agent','field_executive','social_media_manager')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table team_members (id uuid primary key default gen_random_uuid(), organization_id uuid references organizations(id), user_id uuid not null, role text not null, created_at timestamptz default now(), updated_at timestamptz default now());
create table lead_sources (id uuid primary key default gen_random_uuid(), organization_id uuid references organizations(id), name text not null, created_at timestamptz default now(), updated_at timestamptz default now());
create table leads (id uuid primary key default gen_random_uuid(), organization_id uuid references organizations(id), full_name text not null, phone text not null, email text, source text not null, interested_property_type text, budget_min numeric, budget_max numeric, preferred_location text, status text default 'New', temperature text default 'Cold', assigned_agent_id uuid, notes text, next_follow_up_at timestamptz, last_contacted_at timestamptz, created_at timestamptz default now(), updated_at timestamptz default now());
create table properties (id uuid primary key default gen_random_uuid(), organization_id uuid references organizations(id), title text not null, location text, address text, property_type text, price numeric, size_sqft numeric, bedrooms int, bathrooms int, floor int, furnishing_status text, availability_status text default 'Available', description text, amenities text[], owner_info text, notes text, created_at timestamptz default now(), updated_at timestamptz default now());
create table property_images (id uuid primary key default gen_random_uuid(), organization_id uuid references organizations(id), property_id uuid references properties(id) on delete cascade, image_url text not null, created_at timestamptz default now(), updated_at timestamptz default now());
create table property_documents (id uuid primary key default gen_random_uuid(), organization_id uuid references organizations(id), property_id uuid references properties(id) on delete cascade, document_url text not null, created_at timestamptz default now(), updated_at timestamptz default now());
create table lead_property_shares (id uuid primary key default gen_random_uuid(), organization_id uuid references organizations(id), lead_id uuid references leads(id), property_id uuid references properties(id), channel text, message text, created_at timestamptz default now(), updated_at timestamptz default now());
create table activities (id uuid primary key default gen_random_uuid(), organization_id uuid references organizations(id), lead_id uuid references leads(id), user_id uuid, type text, payload jsonb default '{}'::jsonb, created_at timestamptz default now(), updated_at timestamptz default now());
create table calls (id uuid primary key default gen_random_uuid(), organization_id uuid references organizations(id), lead_id uuid references leads(id), agent_id uuid, call_sid text, conference_sid text, status text, duration int, recording_url text, started_at timestamptz, ended_at timestamptz, outcome text, created_at timestamptz default now(), updated_at timestamptz default now());
create table messages (id uuid primary key default gen_random_uuid(), organization_id uuid references organizations(id), lead_id uuid references leads(id), sender_id uuid, channel text, body text, status text, created_at timestamptz default now(), updated_at timestamptz default now());
create table followups (id uuid primary key default gen_random_uuid(), organization_id uuid references organizations(id), lead_id uuid references leads(id), assigned_to uuid, due_at timestamptz, type text, status text default 'pending', template_name text, notes text, created_at timestamptz default now(), updated_at timestamptz default now());
create table attendance (id uuid primary key default gen_random_uuid(), organization_id uuid references organizations(id), user_id uuid, check_in_time timestamptz, check_out_time timestamptz, check_in_latitude numeric, check_in_longitude numeric, check_out_latitude numeric, check_out_longitude numeric, status text, notes text, created_at timestamptz default now(), updated_at timestamptz default now());
create table social_posts (id uuid primary key default gen_random_uuid(), organization_id uuid references organizations(id), assigned_to uuid, post_type text, caption text, media_url text, status text default 'Draft', scheduled_at timestamptz, notes text, created_at timestamptz default now(), updated_at timestamptz default now());
create table tasks (id uuid primary key default gen_random_uuid(), organization_id uuid references organizations(id), assigned_to uuid, title text, status text, due_at timestamptz, metadata jsonb default '{}'::jsonb, created_at timestamptz default now(), updated_at timestamptz default now());
create table integration_settings (id uuid primary key default gen_random_uuid(), organization_id uuid references organizations(id), key text, value_encrypted text, created_at timestamptz default now(), updated_at timestamptz default now());
create table notifications (id uuid primary key default gen_random_uuid(), organization_id uuid references organizations(id), user_id uuid, type text, title text, body text, read_at timestamptz, created_at timestamptz default now(), updated_at timestamptz default now());

alter table organizations enable row level security;
alter table profiles enable row level security;
alter table team_members enable row level security;
alter table leads enable row level security;
alter table properties enable row level security;

create policy org_isolation_org on organizations for all using (id in (select organization_id from profiles where id = auth.uid()));
create policy org_isolation_profiles on profiles for all using (organization_id in (select organization_id from profiles where id = auth.uid()));
create policy org_isolation_team on team_members for all using (organization_id in (select organization_id from profiles where id = auth.uid()));
create policy org_isolation_leads on leads for all using (organization_id in (select organization_id from profiles where id = auth.uid()));
create policy org_isolation_properties on properties for all using (organization_id in (select organization_id from profiles where id = auth.uid()));
