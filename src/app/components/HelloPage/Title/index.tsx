import styles from './page.module.scss';

const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    <h1 className={styles.title}>{children}</h1>
  )
}

export default Title;
