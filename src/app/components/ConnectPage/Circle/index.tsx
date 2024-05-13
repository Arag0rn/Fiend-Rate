import React, { ReactElement } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

const Circle = ({
  children,
  isConnected,
  search,
  call,
  pathname,
  lng,
}: {
  children: ReactElement | ReactElement[],
  isConnected?: boolean,
  search?: boolean,
  call: boolean,
  pathname: string,
  lng: any,
}) => {
  return (
    <div className={classNames(styles['circle'], {
      [styles['circle-connected']]: isConnected && !search && !call,
      [styles['circle-call']]: call && !isConnected && !search && pathname === `/${lng}/connect/authorized`,
      // [styles['circle-group']]: group && !call && !search && !isConnected,
      [styles['circle-notAuth']]: call && pathname === `/${lng}/connect/notAuthorized`,
    })}>{children}</div>
  )
}

export default Circle;