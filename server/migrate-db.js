const supabase = require('./config/supabase');

async function migrate() {
    console.log('Starting migration...');

    // We use .rpc() if we have a function, but since we want to run raw SQL ALTER,
    // we usually do this in the dashboard.
    // However, for automation, we can try to use the query builder if it allows it
    // or just notify the user.

    console.log('Please run the following SQL in your Supabase SQL Editor:');
    console.log(`
        ALTER TABLE habits ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'General';
        ALTER TABLE habits ADD COLUMN IF NOT EXISTS priority TEXT DEFAULT 'Medium';
    `);
}

migrate();
