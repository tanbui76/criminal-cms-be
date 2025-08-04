const { spawn } = require('child_process');
const path = require('path');

async function runScript(scriptPath) {
  return new Promise((resolve, reject) => {
    console.log(`\n🚀 Đang chạy: ${scriptPath}`);
    
    const child = spawn('node', [scriptPath], {
      stdio: 'inherit',
      cwd: __dirname
    });

    child.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ Hoàn thành: ${scriptPath}`);
        resolve();
      } else {
        console.error(`❌ Lỗi khi chạy: ${scriptPath} (exit code: ${code})`);
        reject(new Error(`Script ${scriptPath} failed with exit code ${code}`));
      }
    });

    child.on('error', (error) => {
      console.error(`❌ Lỗi khi chạy: ${scriptPath}`, error);
      reject(error);
    });
  });
}

async function runAllSeeds() {
  console.log('🌱 Bắt đầu chạy tất cả seeds...\n');
  
  try {
    // Chạy profile-type seed trước
    await runScript('run-profile-type-seed.js');
    
    // Sau đó chạy criminal seed
    await runScript('run-criminal-seed.js');
    
    console.log('\n🎉 Tất cả seeds đã hoàn thành thành công!');
  } catch (error) {
    console.error('\n💥 Có lỗi xảy ra:', error.message);
    process.exit(1);
  }
}

runAllSeeds(); 