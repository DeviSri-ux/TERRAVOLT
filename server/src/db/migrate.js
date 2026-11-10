const db = require('./database');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT UNIQUE NOT NULL, password TEXT NOT NULL, language TEXT DEFAULT 'en', distance_unit TEXT DEFAULT 'km', created_at DATETIME DEFAULT CURRENT_TIMESTAMP)", (err) => { if (err) console.error(err); });

  db.run("CREATE TABLE IF NOT EXISTS saved_locations (id TEXT PRIMARY KEY, user_id TEXT, name TEXT NOT NULL, label TEXT, lat REAL, lng REAL, address TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES users(id))", (err) => { if (err) console.error(err); });

  db.run("CREATE TABLE IF NOT EXISTS journeys (id TEXT PRIMARY KEY, user_id TEXT, is_guest INTEGER DEFAULT 0, source_name TEXT, source_lat REAL, source_lng REAL, dest_name TEXT, dest_lat REAL, dest_lng REAL, distance_km REAL, vehicle_type TEXT, emissions_g REAL, route_data TEXT, status TEXT DEFAULT 'completed', completed_at DATETIME DEFAULT CURRENT_TIMESTAMP)", (err) => { if (err) console.error(err); });

  db.run("CREATE TABLE IF NOT EXISTS memories (id TEXT PRIMARY KEY, user_id TEXT, journey_id TEXT, title TEXT, note TEXT, photos TEXT, is_favorite INTEGER DEFAULT 0, is_private INTEGER DEFAULT 1, shared_token TEXT, source_name TEXT, dest_name TEXT, distance_km REAL, journey_date DATETIME, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES users(id), FOREIGN KEY (journey_id) REFERENCES journeys(id))", (err) => { if (err) console.error(err); });

  console.log('Database tables created');
});

setTimeout(() => { db.close(); }, 1000);
