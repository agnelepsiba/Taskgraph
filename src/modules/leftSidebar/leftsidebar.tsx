import React from 'react'
import user from "../../styles/images/user.png"
import styles from "../home.module.scss"
export default function LeftSidebar() {
    return (
        <>
            <div className={styles.logoArea}>Logo</div><ul className={styles.menu}>
                <li className={styles.active}>Dashboard</li>
                <li>Teams</li>
                <li>Projects</li>
                <li>Calenders</li>
                <li>Documents</li>
                <li>Reports</li>
                <li>Invoices</li>
                <li>Availability</li>
                <li>Integration</li>
                <li>Daved Items</li>
                <li>Projects</li>
                <li>Notifications</li>
            </ul><div className={styles.userProfile}>
                <div className={styles.avatar}>
                    <img src={user} alt="" />
                    <span>User Name</span>
                </div>
            </div>
        </>
    )
}
