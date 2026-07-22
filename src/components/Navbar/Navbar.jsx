import "./Navbar.css";
import navigation from "../../data/navigation";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        JP
      </div>

      <ul className="nav-links">

    {navigation.map((item)=>(
        <li key={item.id}>
            {item.title}
        </li>
    ))}

</ul>

      <button className="nav-btn">
        Start a Conversation
      </button>

    </nav>
  );
}

export default Navbar;