import Link from "next/link";
import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <Link href="/">&#127968;</Link>
          </li>
          <li>
            <Link href="/new-pokemon">Add New Pokemon</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
