import Sidebar from './Sidebar'
import Header from './Header'

function MainLayout({ children, title = 'BellaAgenda' }) {
  return (
    <div className="min-h-screen bg-[#f7f3ee]">
      <Sidebar />

      <div className="ml-64 min-h-screen">
        <Header title={title} />

        <main className="p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default MainLayout