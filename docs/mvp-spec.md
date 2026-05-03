# Ternwise MVP

## Product Promise

Ternwise helps groups plan travel by handling the high-consequence details people forget: emergency planning, documents, embassy and consulate guidance, medical contacts, accessibility, food needs, packing, and shared trip coordination.

## MVP Audience

The MVP supports domestic group travel plus one international destination. It should work well for families, friend groups, seniors, travelers with accessibility needs, adults traveling with minors, and mixed-age groups.

## MVP Destinations

- Orlando, Florida
- New York City, New York
- Yellowstone National Park
- Cancun, Mexico for international travelers age 21+

These destinations deliberately test different travel patterns: family/theme park, dense urban, remote/outdoor, and international documentation/safety.

## Core Scope

- Login required before trip creation.
- Sign in with Google and Apple through Supabase Auth.
- One trip initiator owns the trip setup.
- Adults join lightly with email and phone.
- The trip initiator can grant edit permissions to adults.
- Family units exist for organizing adults, minors, bookings, and privacy boundaries.
- Minors require at least one assigned responsible adult.
- Responsible adults are assigned manually.
- Traveler profiles may use nickname plus age group, or full name plus exact age.
- Age groups: infant, toddler, child, teen, young adult, adult, senior.
- Accessibility needs are first-class profile inputs.
- Dietary restrictions, allergies, and picky-eater notes are used for food guidance.
- Medical contact numbers are stored per traveler, but prescription details, passport numbers, passport photos, and uploaded files are not stored in the MVP.
- Sensitive info is shown only to the owner or authorized responsible adults. Shared views expose non-sensitive coordination details only.

## Trip Setup

The initiator enters:

- Destination
- Fixed dates or flexible date range
- Trip purpose
- Traveler profiles
- Family units
- Responsible adults for minors
- Manual flight and hotel details
- Simple dues

Future pricing features should be supported by the data shape, but MVP does not connect to live flight or hotel search.

## AI Scope

MVP includes AI from day one.

The app should generate:

- Personalized checklist
- Brief day-by-day summaries
- Accommodation guidance
- Food guidance
- Emergency planning
- Summary cards
- Private AI answers for adult travelers

AI should use:

- Traveler profiles
- Trip details
- Curated destination content
- The generated trip packet/PDF as a source of truth

For domestic trips, AI primarily uses saved trip data and curated destination content. For international trips, AI should reference official/current sources for passport, visa, embassy/consulate, emergency, safety, and health guidance where relevant.

AI chats are private by default. If an answer contains a useful non-sensitive group note, AI may suggest adding it to the shared trip plan, but the user must approve first. Approved notes are categorized into sections such as food, safety, accessibility, documents, dues, and daily plan.

## Admin Scope

MVP includes multiple admin users.

Admins can manage destination content only:

- Emergency contacts
- Packing and medicine reminders
- Documents and ID requirements
- Weather and seasonal notes
- Local safety tips
- Accessibility guidance
- Food guidance
- Daily summary templates

Admins do not manage users or trips in MVP.

## Emergency And Offline

Emergency info is a major MVP feature and must be available offline in the installed PWA/mobile app.

Emergency planning includes:

- Nearest hospital/urgent care guidance
- Local emergency numbers
- Embassy/consulate guidance for Cancun
- What to do if separated
- Medical team contact reminders
- Destination-specific safety notes

## PDF And Summary Cards

The MVP should generate in-app summary cards for the most-used information. PDF export is planned for checklist and emergency plan portability, and the generated PDF can later become a source for AI deck/card generation.

## Dues

MVP includes simple dues tracking without payment processing.

- Trip initiator manages dues.
- All adults can view dues.
- Payment collection is a later phase.

## Not In MVP

- Live hotel search
- Live flight search
- Push notifications
- File uploads
- Passport numbers/photos
- Prescription images/details
- Real payment processing
- Fine-grained guardian permissions
- User/trip support admin screens
- Sponsored restaurant ranking

## Legal And Safety Posture

The app must show a planning-assistance disclaimer. Users must verify medical, legal, passport, visa, embassy, emergency, and safety information with official sources.

Future sponsored placements must be clearly labeled as sponsored or ads.
