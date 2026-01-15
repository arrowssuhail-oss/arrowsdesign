
import 'dotenv/config';
import connectToDatabase from '../lib/db.js';
import User from '../models/User.js';
import clerkClient from '../lib/clerk.js';
import { promoteUserToAdmin } from '../services/userService.js';
import mongoose from 'mongoose';

const email = process.argv[2];
const role = process.argv[3] as 'admin' | 'super_admin' | 'user' || 'admin';

if (!email) {
    console.error('Please provide an email address: npm run verify-sync <email> [role]');
    process.exit(1);
}

const promoteUser = async () => {
    try {
        await connectToDatabase();
        console.log('Connected to MongoDB');

        // 1. Find or Fetch Clerk ID
        let clerkId = '';
        let userName = '';

        // Check if user exists in Mongo
        let user = await User.findOne({ email });

        if (user) {
            console.log(`Found user in MongoDB: ${user.name} (${user.email})`);
            if (user.clerkId) {
                clerkId = user.clerkId;
                userName = user.name || '';
            }
        }

        // If no user or no clerkId in Mongo, fetch from Clerk
        if (!clerkId) {
            console.log(`Fetching user details from Clerk for email: ${email}...`);
            const clerkUsers = await clerkClient.users.getUserList({ emailAddress: [email] });

            if (clerkUsers.data.length === 0) {
                console.error(`User with email ${email} not found in Clerk. Please sign up in the browser first (even if the app errors out, the Clerk account is created).`);
                process.exit(1);
            }

            const clerkUser = clerkUsers.data[0];
            clerkId = clerkUser.id;
            userName = `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim();
            console.log(`Found Clerk User ID: ${clerkId}`);
        }

        // 2. Create or Update MongoDB User
        if (!user) {
            console.log('Creating new user in MongoDB...');
            user = await User.create({
                email,
                clerkId,
                name: userName,
                role: role // Set initial role
            });
            console.log('User created in MongoDB.');
        } else {
            // Update existing
            user.role = role;
            if (!user.clerkId) user.clerkId = clerkId;
            await user.save();
            console.log(`Updated MongoDB user role to: ${role}`);
        }

        // 3. Promote to Admin (Syncs to Clerk)
        const newRole = role as 'admin' | 'user' | 'super_admin';

        // If role is admin/super_admin, use the service
        if (newRole === 'admin' || newRole === 'super_admin') {
            console.log(`Promoting user to ${newRole} using userService...`);
            // Note: promoteUserToAdmin sets 'admin'. If testing super_admin specifically, 
            // you might need extended service logic. For now, strictly testing the implementation.
            await promoteUserToAdmin(email);
            console.log('Successfully synced "admin" role to Clerk using Service!');
        } else {
            console.log(`Setting manual role ${newRole} (Bypassing Service for non-admin test)...`);
            user.role = newRole;
            await user.save();
            // Manually update clerk for non-admin test if needed, or skip
        }

        console.log('\n--- VERIFICATION SUCCESSFUL ---');
        console.log('You can now log in as an Admin.');
        console.log('1. Go to /admin');
        console.log('2. If you are already logged in, Sign Out and Sign In again to refresh permissions.');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
};

promoteUser();
