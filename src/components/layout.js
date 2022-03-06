import * as React from "react"
import { Link } from "gatsby"
import ReactTooltip from "react-tooltip"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()} Kevin Hernandez.
        <span data-for={"toolTip1"} data-place={"top"} data-tip={"Except where otherwise noted, the blog posts on this site are licensed under the Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) License by the author."}> Some rights reserved. </span>
        <ReactTooltip id="toolTip1" />
      </footer>
    </div>
  )
}

export default Layout
