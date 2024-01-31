import { ReactElement } from 'react';
import styles from './page.module.scss';

const BlockButton = ({ children }: { children: ReactElement | ReactElement[] }) => {
  return (
    <div className={styles['block-button']}>{children}</div>
  )
}

export default BlockButton;