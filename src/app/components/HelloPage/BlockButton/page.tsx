import styles from './page.module.scss';

const BlockButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles['block-button']}>{children}</div>
  )
}

export default BlockButton;