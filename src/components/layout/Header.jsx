function Header({ title }) {
  return (
    <header className="header">
      <div>
        <h1>{title}</h1>
        <p>Organize seus atendimentos com mais praticidade</p>
      </div>

      <div className="header-user">
        <div className="header-user-avatar">R</div>
        <div>
          <strong>Raymora</strong>
          <span>Administrador(a)</span>
        </div>
      </div>
    </header>
  )
}

export default Header