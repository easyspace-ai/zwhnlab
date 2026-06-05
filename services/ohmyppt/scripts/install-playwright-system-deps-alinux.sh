#!/usr/bin/env bash
# Install system libraries for Playwright Chromium on Alibaba Cloud Linux 3 / RHEL 8+
# when dnf/yum segfaults. Uses mirrors.aliyun.com RPMs + rpm -Uvh.
#
# Usage (as root):
#   bash scripts/install-playwright-system-deps-alinux.sh

set -euo pipefail

if [[ "${EUID:-0}" -ne 0 ]]; then
  echo "请使用 root 运行: sudo bash $0"
  exit 1
fi

WORKDIR="${PLAYWRIGHT_RPMS_DIR:-/tmp/playwright-rpms}"
OS_BASE="${ALINUX_OS_PACKAGES:-https://mirrors.aliyun.com/alinux/3/os/x86_64/Packages}"
UPD_BASE="${ALINUX_UPD_PACKAGES:-https://mirrors.aliyun.com/alinux/3/updates/x86_64/Packages}"

# atk 若系统已是 updates 里的新版本，不要再从 os 装旧 rpm（会冲突且阻断 at-spi2-*）
OPTIONAL_PACKAGES=(atk)
REQUIRED_PACKAGES=(
  libpciaccess
  libdrm
  libwayland-server
  libxshmfence
  libXtst
  at-spi2-core
  at-spi2-atk
  mesa-libgbm
)

CHROME_BIN="${PLAYWRIGHT_CHROME_BIN:-}"
if [[ -z "$CHROME_BIN" ]]; then
  CHROME_BIN=$(find /root/.cache/ms-playwright -name chrome-headless-shell -type f 2>/dev/null | head -1 || true)
fi

mkdir -p "$WORKDIR"
cd "$WORKDIR"

fetch_latest_rpm_name() {
  local pkg="$1"
  local html name base
  html=$(curl -fsSL "$UPD_BASE/" && curl -fsSL "$OS_BASE/")
  name=$(echo "$html" | grep -oE "${pkg}-[0-9][^\"<>]+\.x86_64\.rpm" | sort -V | tail -1 || true)
  if [[ -z "$name" ]]; then
    return 1
  fi
  for base in "$UPD_BASE" "$OS_BASE"; do
    if curl -fsI "${base}/${name}" 2>/dev/null | head -1 | grep -qE 'HTTP/[0-9.]+ 200'; then
      echo "${name}|${base}"
      return 0
    fi
  done
  return 1
}

download_package() {
  local pkg="$1"
  local info name base
  if ! info=$(fetch_latest_rpm_name "$pkg"); then
    echo "错误: 在镜像中未找到包 $pkg"
    return 1
  fi
  name="${info%%|*}"
  base="${info##*|}"
  echo "下载 ${name} (from ${base##*/}) ..."
  curl -fSL -o "$name" "${base}/${name}"
}

should_skip_atk() {
  if rpm -q atk &>/dev/null; then
    echo "跳过 atk RPM（系统已安装 $(rpm -q atk | head -1)）"
    return 0
  fi
  return 1
}

echo "==> 工作目录: $WORKDIR"
echo "==> 当前相关 RPM 状态:"
rpm -qa 2>/dev/null | grep -E '^(atk|at-spi2|mesa-libgbm|libdrm)-' || echo "  (尚未安装 at-spi2 / mesa-libgbm)"

echo "==> 从阿里云镜像下载 RPM（优先 updates 最新版）..."

rm -f ./*.rpm 2>/dev/null || true

failed=()
for pkg in "${REQUIRED_PACKAGES[@]}"; do
  if ! download_package "$pkg"; then
    failed+=("$pkg")
  fi
done

if ! should_skip_atk; then
  download_package atk || failed+=(atk)
fi

if [[ ${#failed[@]} -gt 0 ]]; then
  echo "以下包下载失败: ${failed[*]}"
  exit 1
fi

# 已装新 atk 时删除目录里的旧 atk rpm，避免降级冲突
if should_skip_atk; then
  rm -f ./atk-*.rpm 2>/dev/null || true
fi

echo "==> 将安装:"
ls -1 ./*.rpm

echo "==> 安装 RPM (rpm -Uvh) ..."
if ! rpm -Uvh --nosignature ./*.rpm; then
  echo ""
  echo "安装失败。常见原因: 仍有未下载的依赖。"
  echo "请把完整错误贴出，或尝试仅装三个主包（不降级 atk）:"
  echo "  rpm -Uvh --nosignature ./at-spi2-*.rpm ./mesa-libgbm-*.rpm ./lib*.rpm"
  exit 1
fi

echo "==> 安装后 RPM 状态:"
rpm -qa | grep -E '^(atk|at-spi2|mesa-libgbm)-' || true

echo "==> 库文件位置:"
for f in libatk-bridge-2.0.so.0 libatspi.so.0 libgbm.so.1; do
  found=$(find /usr/lib64 /lib64 -name "$f" 2>/dev/null | head -1 || true)
  if [[ -n "$found" ]]; then
    echo "  OK $f -> $found"
  else
    echo "  MISSING $f"
  fi
done

echo "==> 刷新动态库缓存 (ldconfig) ..."
ldconfig

if [[ -n "$CHROME_BIN" && -x "$CHROME_BIN" ]]; then
  echo "==> 检查 Chromium 依赖: $CHROME_BIN"
  missing=$(ldd "$CHROME_BIN" | grep 'not found' || true)
  if [[ -n "$missing" ]]; then
    echo "仍有缺失库:"
    echo "$missing"
    exit 1
  fi
  echo "Chromium 系统依赖已满足 (ldd 无 not found)。"
else
  echo "未找到 Playwright chromium 二进制，跳过 ldd 检查。"
fi

echo ""
echo "完成。请重启 ohmyppt 服务后再试 PPTX 导出。"
