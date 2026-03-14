type NavbarProps = {
  title: string
}

export const Navbar = ({ title }: NavbarProps) => {
  return (
    <header className="navbar">
      <div className="navbar-content">
        <h1 className="navbar-title">{title}</h1>
      </div>
    </header>
  )
}
