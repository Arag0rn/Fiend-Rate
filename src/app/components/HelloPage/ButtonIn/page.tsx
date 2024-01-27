import { MouseEventHandler } from 'react';
import styles from './page.module.scss';

const ButtonIn = ({ children, onClick }: {
  children: React.ReactNode,
  onClick: MouseEventHandler<HTMLButtonElement>,
}) => {
  return (
    <button onClick={onClick} className={styles['button-in']}>{children}</button>
  )
}

export default ButtonIn;
