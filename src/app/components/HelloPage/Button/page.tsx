import styles from './page.module.scss';

const Button = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className={styles.button}>{children}</button>
  )
}

export default Button;
