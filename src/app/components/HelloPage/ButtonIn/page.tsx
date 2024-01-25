import styles from './page.module.scss';

const ButtonIn = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className={styles['button-in']}>{children}</button>
  )
}

export default ButtonIn