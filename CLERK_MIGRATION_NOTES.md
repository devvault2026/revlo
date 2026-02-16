# Clerk Integration Migration Notes

successfully integrated Clerk for authentication in your React/Vite application! 

## Key Changes
1. **Installed `@clerk/clerk-react`**: Replaced Supabase Auth.
2. **Updated `.env.local`**: Renamed `NEXT_PUBLIC_` key to `VITE_` key for Client compatibility.
3. **Modified `src/main.tsx`**: Wrapped the application in `ClerkProvider`.
4. **Updated `AuthContext.tsx`**: Now uses Clerk hooks (`useUser`, `useAuth`) instead of Supabase.
5. **Replaced Pages**: `LoginPage.tsx` and `RegisterPage.tsx` now use Clerk's pre-built `<SignIn />` and `<SignUp />` components.
6. **Disabled Supabase Auth**: Helper functions in `src/lib/supabase.ts` now throw errors to prevent accidental usage.

## Next Steps (Critical)

### 1. Database Connection (Supabase Data)
Currently, your application allows users to sign in with Clerk, but your Supabase database (Leads, Settings, etc.) still expects Supabase Authentication (or specific RLS policies).
- **If you are keeping Supabase DB**: You must "Exchange Clerk Token for Supabase Token".
  - Go to Clerk Dashboard -> Integrations -> Supabase.
  - Set up the JWT Template.
  - Update your code to fetch the token: `await getToken({ template: 'supabase' })`.
  - Pass this token to your `supabase` client.

### 2. User ID Mismatch
- Clerk uses IDs like `user_2...`.
- Supabase mostly uses UUIDs (`0000-0000...`).
- **Action**: You may need to update your Supabase Database schema (`user_id` columns) to accept `text` instead of `uuid`, OR use a mapping table.

### 3. Profile Data
- The app relied on a `profiles` table. This is currently disconnected.
- You should either:
  - Create a mechanism to sync Clerk users to your `profiles` table (via Webhooks).
  - Or refactor the frontend to store profile data in Clerk `publicMetadata`.

### 4. Admin Roles
- `ProtectedRoute` checked `profile.role`. This is currently disabled (profile is null).
- **Action**: Set up Roles in Clerk (Organizations or Metadata) and update `ProtectedRoute.tsx` to check `user.publicMetadata.role`.

Your authentication flow is now powered by Clerk! 🚀
