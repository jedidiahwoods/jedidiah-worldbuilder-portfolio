import { Route, Routes } from 'react-router-dom'
import { Scene } from './scene/Scene'
import { Header } from './ui/Header'
import { HeroOverlay } from './ui/HeroOverlay'
import { RealmOverlay } from './ui/RealmOverlay'
import { ProjectPage } from './ui/ProjectPage'

export default function App() {
  return (
    <>
      <Scene />
      <Header />
      <Routes>
        <Route path="/" element={<HeroOverlay />} />
        <Route path="/physical" element={<RealmOverlay realm="physical" />} />
        <Route path="/digital" element={<RealmOverlay realm="digital" />} />
        <Route path="/project/:slug" element={<ProjectPage />} />
        <Route path="*" element={<HeroOverlay />} />
      </Routes>
    </>
  )
}
