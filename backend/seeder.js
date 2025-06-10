// backend/seeder.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import bcrypt from 'bcryptjs';
import connectDB from './config/db.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import products from './data/products.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    // Create admin user with your credentials
    const adminUser = await User.create({
      name: 'Pratik',
      email: 'kapepratik07@gmail.com',
      password: bcrypt.hashSync('1234567890', 10),
      isAdmin: true,
    });

    // Attach admin user to each product
    const sampleProducts = products.map((product) => ({
      ...product,
      user: adminUser._id,
      reviews: [
        {
          name: adminUser.name,
          rating: product.rating,
          comment:
            'The clothes are very beautiful and stylish, in line with current trends',
          user: adminUser._id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    }));

    await Product.insertMany(sampleProducts);

    console.log('✅ Data Imported'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log('🗑️ Data Destroyed'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

// Run with `node seeder.js` or `node seeder.js -d`
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
