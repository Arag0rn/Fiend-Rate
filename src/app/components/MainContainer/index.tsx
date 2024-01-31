import styles from './page.module.scss';

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>{children}</div>
  )
}

export default Container;
