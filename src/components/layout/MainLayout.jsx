import Sidebar from './Sidebar'
import Header from './Header'

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f7f3ee]">
      <Sidebar />

      <div className="ml-56 min-h-screen">
        <Header />

        <main className="p-6">
          <div className="mx-auto max-w-6xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default MainLayout