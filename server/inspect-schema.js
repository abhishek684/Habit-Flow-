require('dotenv').config();
const supabase = require('./config/supabase');

async function inspectSchema() {
    console.log('--- Inspecting habits table schema ---');
    try {
        const { data, error } = await supabase
            .from('habits')
            .select('*')
            .limit(1);

        if (error) {
            console.error('❌ Error fetching habit:', error.message);
            return;
        }

        if (data && data.length > 0) {
            console.log('Sample habit keys:', Object.keys(data[0]));
            console.log('Full sample habit:', data[0]);
        } else {
            console.log('No habits found to inspect schema.');
        }
    } catch (err) {
        console.error('❌ Unexpected error:', err.message);
    }
}

inspectSchema();
