import * as React from "react"
import styles from "./Layout.module.css"

const Layout = ({ children }) => {
	return (
		<React.Fragment>
			<h1 className={styles.title}>Hopechain test 🚀</h1>
			{children}
		</React.Fragment>
	)
}

export default Layout
