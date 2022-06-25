import Link from "next/link";
import classes from "./MainNavigation.module.css";
import { useRouter } from "next/router";

function MainNavigation() {

  const path = useRouter().pathname

  return (
    <header className={classes.header}>
      <nav>
        <ul className={path.includes("new-pokemon") ? classes.newPokemon : ""}>
          <li>
            <Link href="/">&#127968;</Link>
          </li>
          {!path.includes("new-pokemon") && <li>
            <Link href="/new-pokemon">Add New Pokemon</Link>
          </li>}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
