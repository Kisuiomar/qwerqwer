import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';
import Post from './models/Post.js';

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Подключено к MongoDB');

    await User.deleteMany();
    await Post.deleteMany();
    console.log('🗑️ Старые данные удалены');

    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = await User.create({ 
      fullName: 'Omar Zhumabay', 
      username: 'omar', 
      email: 'omar@example.com', 
      passwordHash: hashedPassword 
    });
    console.log('👤 Пользователь создан');

    const post = await Post.create({
      title: 'Тестовый заголовок',
      text: 'Это тестовый пост',
      user: user._id,
      tags: ['тест', 'mongoose', 'seed'],
      viewsCount: 0,
      imageUrl: '',
      createdAt: new Date()
    });
    console.log('📝 Пост добавлен');

    console.log('🚀 Seed успешно завершен');
    process.exit();
  } catch (error) {
    console.error('❌ Ошибка при заполнении:', error);
    process.exit(1);
  }
}

seedDatabase();
