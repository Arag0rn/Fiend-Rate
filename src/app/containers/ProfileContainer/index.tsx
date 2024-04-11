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
import { PrivatRote } from '@/app/components/PrivateRote';
import { Dispatch } from '@/app/REDUX/store';
import { logOut } from '@/app/REDUX/Auth/operations';


// const calculateAge = (birthDate: string) => {
//   const currentDate = new Date();
//   const birthDateUser = new Date(birthDate);
//   let age = currentDate.getFullYear() - birthDateUser.getFullYear();
//   const monthDiff = currentDate.getMonth() - birthDateUser.getMonth();

//   if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDateUser.getDate())) {
//     age--;
//   }

//   return age;
// }

const ProfileContainer = ({ lng }) => {
  const userData = useSelector(selectUser);
  const dispatch: Dispatch = useDispatch();

  return (
    <Block className='profile'>
      <Container>
        <Block className={styles['profile__content']}>

          <Block className={styles['profile__block-title']}>
            <Title>Profile</Title>
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
              <Link className={styles['profile__edit-profile']} href='/profile-edit'>Edit</Link>
            </Block>
          </Block>

          <Block className={styles['profile__inform']}>
            <List>
              <ListItem>Age</ListItem>
              <Block className={styles['profile__inform-value']}> y.o</Block>
            </List>

            <List>
              <ListItem>Gender</ListItem>
              <Block className={styles['profile__inform-value']}>
              {userData?.gender}
              </Block>
            </List>

            <List>
              <ListItem>Language</ListItem>
              <Block className={styles['profile__inform-value']}>{userData?.language}</Block>
            </List>
          </Block>

          <Block className={styles['profile__about']}>
            <TitleAbout>About</TitleAbout>
            <AboutDescription>
            {userData?.about}
            </AboutDescription>
          </Block>

          <Block className={styles['profile__feedback']}>
            <Link className={styles['profile__link']} href='/'>Privacy Policy</Link>
            <Link className={styles['profile__link']} href='/'>Terms & Conditions</Link>
            <Link className={styles['profile__link']} href='/'>Feedback</Link>
          </Block>
          <Navbar style={{ paddingLeft: 10, paddingRight: 10 }} />
        </Block>
      </Container>
    </Block>
  )
}
export default PrivatRote(ProfileContainer);
