# EstateFlow CRM

Mobile-first real estate CRM built with Next.js 15 + Supabase.

## Architecture
- `app/`: App Router screens and API routes.
- `lib/services`: adapters (`callService`, `messageService`, `emailService`, `leadAssignmentService`, `propertyShareService`, `attendanceService`, `socialPostService`) supporting dry-run mode.
- `supabase/migrations`: schema + RLS migration.
- `scripts/seed.ts`: demo seed data.

## Setup
1. `npm install`
2. Copy `.env.example` to `.env.local`.
3. Run SQL migration in Supabase SQL editor: `supabase/migrations/202605180001_init.sql`.
4. Seed: `npm run db:seed`.
5. Start: `npm run dev`.

## Deploy
- Push to GitHub and import into Vercel.
- Add environment variables in Vercel project settings.
- Set Supabase URL/keys and Twilio credentials.

## Webhook test
```bash
curl -X POST http://localhost:3000/api/webhooks/leads \
-H 'content-type: application/json' \
-d '{"fullName":"Rahul Sharma","phone":"+919999999999","email":"rahul@example.com","source":"36 Acre","propertyType":"Apartment","budgetMin":7500000,"budgetMax":12000000,"preferredLocation":"Gurgaon"}'
```

## Twilio bridge flow
Current implementation includes dry-run simulation and extension points for live Twilio conference bridging.
