import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1><Link to="/">Netflix Clone</Link></h1>
      <nav>
        <Link to="/popular">Popular</Link>
        <Link to="/search">Search</Link>
        <Link to="/wishlist">Wishlist</Link>
      </nav>
    </header>
  );
};

export default Header;