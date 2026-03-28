import Sidebar from './Sidebar'
import Header from './Header'

function MainLayout({ children, title = 'BellaAgenda' }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-content">
        <Header title={title} />
        <main className="page-content">{children}</main>
      </div>
    </div>
  )
}

export default MainLayout