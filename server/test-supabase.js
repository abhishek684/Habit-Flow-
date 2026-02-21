require('dotenv').config();
const supabase = require('./config/supabase');

async function testConnection() {
    console.log('--- Supabase Connection Test ---');
    console.log('URL:', process.env.SUPABASE_URL);

    try {
        // Test 1: Simple query to check connection
        console.log('\nTest 1: Querying users table...');
        const { data, error, status } = await supabase
            .from('users')
            .select('count', { count: 'exact', head: true });

        if (error) {
            console.error('❌ Connection error:', error.message);
            console.error('Status code:', status);
        } else {
            console.log('✅ Connection successful!');
            console.log('Status code:', status);
        }

        // Test 2: List tables (optional, might fail if RLS is on)
        console.log('\nTest 2: Fetching one user (to verify RLS/data)...');
        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('id')
            .limit(1);

        if (userError) {
            console.warn('⚠️ Could not fetch users (this might be due to RLS):', userError.message);
        } else {
            console.log('✅ Data fetch successful!');
        }

    } catch (err) {
        console.error('❌ Unexpected error:', err.message);
    }
}

testConnection();
