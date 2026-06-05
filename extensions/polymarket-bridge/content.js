/**
 * Polymarket Bridge - Content Script
 * 作为网页和扩展背景脚本之间的桥梁
 */

// 监听来自网页的消息
window.addEventListener('message', (event) => {
  // 只处理来自当前页面的消息
  if (event.source !== window) return;

  const data = event.data;
  if (!data || data.type !== 'POLYMARKET_BRIDGE_REQUEST') return;

  console.log('[ContentScript] Received request from page:', data.payload);

  // 转发消息到 background script
  chrome.runtime.sendMessage(data.payload, (response) => {
    console.log('[ContentScript] Got response from background:', response);

    // 将响应发回给网页
    window.postMessage({
      type: 'POLYMARKET_BRIDGE_RESPONSE',
      payload: response,
      requestId: data.requestId
    }, '*');
  });
});

// 通知网页 content script 已加载
window.postMessage({
  type: 'POLYMARKET_BRIDGE_READY',
  payload: { available: true }
}, '*');

console.log('[ContentScript] Polymarket Bridge content script loaded');