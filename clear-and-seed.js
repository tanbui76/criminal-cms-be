const { createConnection } = require('typeorm');
const config = require('config');

async function clearData() {
  const dbConfig = config.get('db');

  const connection = await createConnection({
    type: 'postgres',
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    entities: [__dirname + '/dist/**/*.entity.{js,ts}'],
    synchronize: false
  });

  console.log('🧹 Đang xóa dữ liệu cũ...');

  try {
    // Xóa theo thứ tự để tránh lỗi foreign key
    await connection.query('DELETE FROM criminal_profile_types;');
    console.log('✅ Đã xóa criminal_profile_types');

    await connection.query('DELETE FROM criminals;');
    console.log('✅ Đã xóa criminals');

    await connection.query('DELETE FROM "profileTypes";');
    console.log('✅ Đã xóa profileTypes');

    console.log('🎉 Đã xóa tất cả dữ liệu thành công!');
  } catch (error) {
    console.error('❌ Lỗi khi xóa dữ liệu:', error.message);
    throw error;
  } finally {
    await connection.close();
  }
}

async function runSeeds() {
  console.log('\n🌱 Bắt đầu chạy seeds...');

  const { spawn } = require('child_process');

  // Chạy profile-type seed
  await new Promise((resolve, reject) => {
    console.log('\n🚀 Đang chạy: run-profile-type-seed.js');
    const child = spawn('node', ['run-profile-type-seed.js'], {
      stdio: 'inherit',
      cwd: __dirname
    });

    child.on('close', (code) => {
      if (code === 0) {
        console.log('✅ Hoàn thành: run-profile-type-seed.js');
        resolve();
      } else {
        reject(new Error(`Profile-type seed failed with exit code ${code}`));
      }
    });
  });

  // Chạy criminal seed
  await new Promise((resolve, reject) => {
    console.log('\n🚀 Đang chạy: run-criminal-seed.js');
    const child = spawn('node', ['run-criminal-seed.js'], {
      stdio: 'inherit',
      cwd: __dirname
    });

    child.on('close', (code) => {
      if (code === 0) {
        console.log('✅ Hoàn thành: run-criminal-seed.js');
        resolve();
      } else {
        reject(new Error(`Criminal seed failed with exit code ${code}`));
      }
    });
  });
}

async function main() {
  try {
    console.log('🔄 Bắt đầu quy trình clear và seed...\n');

    // Bước 1: Clear data
    await clearData();

    // Bước 2: Chạy seeds
    await runSeeds();

    console.log(
      '\n🎉 Hoàn thành! Dữ liệu đã được clear và seed lại thành công!'
    );
  } catch (error) {
    console.error('\n💥 Có lỗi xảy ra:', error.message);
    process.exit(1);
  }
}

main();
