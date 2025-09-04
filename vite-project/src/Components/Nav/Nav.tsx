
export default function Nav() {
  return (
    <nav className="top-nav">
      <a className="brand" href="#">
        <img src="/logo.png" alt="Pixell River Financial logo" />
        <span>Pixell River Financial</span>
      </a>

      <ul className="nav-links">
        <li><a href="#employees">Employees</a></li>
        <li><a href="#organization">Organization</a></li>
      </ul>
    </nav>
  );
}
