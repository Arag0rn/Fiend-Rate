'use client';
import Container from '@/app/components/Container';
import Title from '@/app/components/HelloPage/Title';
import Navbar from '@/app/components/NavBar/Navbar';
import List from '@/app/components/ProfilePage/List';
import ListItem from '@/app/components/ProfilePage/ListItem';
import UserName from '@/app/components/ProfilePage/UserName';
import Block from '@/app/components/SignIn/Block';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logOutImg from '../../images/profile/log-out.svg';
import image from '../../images/profile/image-user.svg';
import changeImage from '../../images/profile/change-photo.svg';
import star from '../../images/profile/star-rate.svg';
import styles from './styles.module.scss';
import TitleAbout from '@/app/components/ProfilePage/TitleAbout';
import AboutDescription from '@/app/components/ProfilePage/AboutDescription';
import Label from '@/app/components/SignIn/Label';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '@/app/REDUX/Auth/selector';
import { Dispatch } from '@/app/REDUX/store';
import { logOut } from '@/app/REDUX/Auth/operations';
import { useTranslation } from '@/i18n/client';


const calculateAge = (birthDate: string | undefined) => {
  if (!birthDate) return 0;
  const currentDate = new Date();
  const birthDateUser = new Date(birthDate.split('.').reverse().join('.'));
  let age = currentDate.getFullYear() - birthDateUser.getFullYear();
  const monthDiff = currentDate.getMonth() - birthDateUser.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDateUser.getDate())) {
    age--;
  }

  return age;
}

const ProfileContainer = ({ lng }) => {
  const { t } = useTranslation(lng, 'profile');
  const userData = useSelector(selectUser);
  const dispatch: Dispatch = useDispatch();

  return (
    <Block className='profile'>
      <Container>
        <Block className={styles['profile__content']}>

          <Block className={styles['profile__block-title']}>
            <Title>{t("title")}</Title>
            <div onClick={() => dispatch(logOut())}>
              <Image 
                width={24}
                height={24}
                src={logOutImg}
                alt={'picture log out'}
              />
              </div>
          </Block>

          <Block className={styles['profile__block-edit']}>
            <Block className={styles['profile__block-image']}>
              <Image className={styles['profile__block-image']} src={image} width='88' height='88' alt={'User Image'} priority={true} />
              <Label className={styles['profile__upload']} htmlFor='file'>
                <Block className={styles['profile__image-change']}>
                    <input
                      className={styles['profile__opacity']}
                      type="file"
                      name="file"
                      id="file"
                    />
                  <Image
                    className={styles['profile__upload']}
                    width={15.96}
                    height={15.96}
                    src={changeImage}
                    alt={'Change Image'}
                  />
                </Block>
              </Label>
            </Block>

            <Block className='profile__user-name'>
              <UserName>{userData?.username}</UserName>
              <Block className={styles['profile__block-rate']}>
                <Image width={17} height={16} src={star} alt={'Star'} />
                <Block className={styles['profile__number']}>4.0</Block>
              </Block>
              <Link className={styles['profile__edit-profile']} href='/profile-edit'>{t("edit")}</Link>
            </Block>
          </Block>

          <Block className={styles['profile__inform']}>
            <List>
              <ListItem>{t("age")}</ListItem>
              <Block className={styles['profile__inform-value']}>{calculateAge(userData?.birthday)}</Block>
            </List>

            <List>
              <ListItem>{t("gender")}</ListItem>
              <Block className={styles['profile__inform-value']}>
              {userData?.gender}
              </Block>
            </List>

            <List>
              <ListItem>{t("lng")}</ListItem>
              <Block className={styles['profile__inform-value']}>{userData?.language}</Block>
            </List>
          </Block>

          <Block className={styles['profile__about']}>
            <TitleAbout>{t("about")}</TitleAbout>
            <AboutDescription>
            {userData?.about}
            </AboutDescription>
          </Block>

          <Block className={styles['profile__feedback']}>
            <Link className={styles['profile__link']} href='/'>{t("privacy")}</Link>
            <Link className={styles['profile__link']} href='/'>{t("terms")}</Link>
            <Link className={styles['profile__link']} href='/'>{t("feedback")}</Link>
          </Block>
          <Navbar style={{ paddingLeft: 10, paddingRight: 10 }} />
        </Block>
      </Container>
    </Block>
  )
}
export default ProfileContainer;
