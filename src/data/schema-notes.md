# Data Model Notes

These are implementation notes for the Supabase schema. They are intentionally compact so the schema can evolve as the MVP UI becomes real.

## Tables

- `profiles`: Supabase auth user profile, display name, admin flag.
- `trips`: initiator, destination, purpose, fixed dates, flexible date window, trip status.
- `trip_members`: trip, profile when account exists, email, phone, role, edit permission.
- `family_units`: trip, label, created by initiator.
- `travelers`: trip, family unit, traveler type, nickname/full name, age group/exact age, citizenship country, passport expiration date.
- `minor_responsible_adults`: minor traveler, adult trip member.
- `accessibility_needs`: traveler, selected needs, notes.
- `dietary_needs`: traveler, allergies, dietary restrictions, picky eater notes.
- `medical_contacts`: traveler, doctor/pharmacy/emergency support contacts. Private by row-level security.
- `bookings`: owner traveler or family unit, trip, booking type, non-sensitive visible fields, sensitive private fields.
- `dues`: trip, traveler/member, amount, description, status, managed by initiator.
- `destination_content`: destination, content type, body, source URL, last reviewed date, admin managed.
- `trip_packets`: generated checklist, emergency plan, daily summaries, summary cards, PDF status.
- `ai_chats`: private to asking adult.
- `ai_group_note_suggestions`: suggested non-sensitive notes, category, status, approved by.
- `checklist_items`: trip, generated from traveler/destination data, due timing, completed status.

## Privacy Defaults

- Medical contacts are visible only to the adult traveler who owns them.
- Minor medical contacts are visible to assigned responsible adults.
- Sensitive booking fields are visible only to the owner or authorized responsible adults.
- Adult AI chats are private by default.
- Shared trip surfaces show only non-sensitive coordination details.
- Passport numbers and passport photos are not stored.
- Prescription details and prescription images are not stored.
- File uploads are not part of MVP.

## Row-Level Security Direction

Every table should have row-level security enabled. Policies should start conservative:

- Trip members can read non-sensitive trip coordination data for their trip.
- Trip initiator can manage trip structure, family units, dues, and edit permissions.
- Adults can manage their own profile and sensitive fields.
- Responsible adults can manage allowed minor fields.
- Admins can manage destination content only.

