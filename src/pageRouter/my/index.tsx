export { default as Component } from '@/pages/my'

// 强制命名 导出loader （可选）
export async function loader() {
  console.log('Page Index loader', arguments);
  await new Promise((res) => setTimeout(res, 10 * 1000))
  return { data: 'test Data' };
}

export function ErrorBoundary() {
  return <div>错误内容</div>
}