const bcrypt = require('bcryptjs');
const User = require('./models/user');

const adminEmail = 'raghurk@gmail.com';
const adminPassword = 'admin@123';

async function createAdmin() {
  try {
    const existing = await User.findOne({ email: adminEmail });
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    if (existing) {
      existing.password = hashedPassword;
      existing.role = 'admin';
      existing.name = existing.name || 'Admin';
      await existing.save();
      console.log(`Updated existing admin user: ${adminEmail}`);
    } else {
      await User.create({
        name: 'Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
      });
      console.log(`Created admin user: ${adminEmail}`);
    }
  } catch (error) {
    console.error('Failed to create/update admin user:', error.message);
    throw error;
  }
}

if (require.main === module) {
  createAdmin()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

module.exports = createAdmin;
