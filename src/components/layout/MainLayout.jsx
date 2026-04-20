import Sidebar from './Sidebar'
import Header from './Header'

function MainLayout({ children, title = 'BellaAgenda' }) {
  return (
    <div className="min-h-screen bg-[#f7f3ee] flex">
      <Sidebar />

      <div className="flex-1 ml-64">
        <Header title={title} />

        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default MainLayout