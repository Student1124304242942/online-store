import { Link } from "react-router-dom";
import { LinksProps } from "./Links.props";
import cl from "classnames";
import style from './Links.module.css'

const Links = ({firstLink, secondLink, link}: LinksProps) => {
  return (
    <div className={cl(style['links-parent'])}>
        <Link className={cl(style['link1'])} to={link}>{firstLink}</Link>
        <Link className={cl(style['link2'])} to={link}>{secondLink}</Link>      
    </div>
  )
}

export default Links
