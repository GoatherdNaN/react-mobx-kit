import React from 'react'
import styles from './index.less'

const PageHeaderWrapper = props => (
  <div className={styles.pageWrapper}>
    { !!props.title && <div className={styles.title}>{props.title}</div> }
    <div>{props.children}</div>
  </div>
)

export default PageHeaderWrapper