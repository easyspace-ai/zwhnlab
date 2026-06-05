/**
 * Polymarket Bridge - Popup Script
 */

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('input');
  const fetchBtn = document.getElementById('fetchBtn');
  const result = document.getElementById('result');
  const status = document.getElementById('status');

  fetchBtn.addEventListener('click', async () => {
    const value = input.value.trim();
    if (!value) {
      showError('请输入 Polymarket 链接或 slug');
      return;
    }

    fetchBtn.disabled = true;
    fetchBtn.textContent = '获取中...';
    result.style.display = 'none';

    try {
      const response = await chrome.runtime.sendMessage({
        type: 'FETCH_SAVE_DATA',
        input: value
      });

      if (response.success) {
        showResult(response.data);
      } else {
        showError(response.error || '获取失败');
      }
    } catch (err) {
      showError(err.message || '请求失败');
    } finally {
      fetchBtn.disabled = false;
      fetchBtn.textContent = '获取数据';
    }
  });

  function showResult(data) {
    result.className = 'result';
    result.style.display = 'block';
    result.textContent = JSON.stringify(data, null, 2);
  }

  function showError(msg) {
    result.className = 'result error';
    result.style.display = 'block';
    result.textContent = msg;
  }

  // 测试连接
  chrome.runtime.sendMessage({ type: 'CHECK_PLUGIN' }, (response) => {
    if (!response || !response.available) {
      status.className = 'status error';
      status.textContent = '插件未就绪';
    }
  });
});