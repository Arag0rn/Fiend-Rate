import { ReactElement } from 'react';
import styles from './styles.module.scss';

const BlockButton = ({ children }: { children: ReactElement | ReactElement[] }) => {
  return (
    <div className={styles['block-button']}>{children}</div>
  )
}

export default BlockButton;