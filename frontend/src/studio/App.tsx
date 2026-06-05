import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import StudioHome from './pages/StudioHome'
import StudioEditor from './pages/StudioEditor'

/** 独立 studio.html 入口（主工作台请使用 /ppt） */
export default function StudioApp() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<StudioHome />} />
        <Route path="/p/:projectId" element={<StudioEditor />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}
