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
import logOut from '../../images/profile/log-out.svg';
import changeImage from '../../images/profile/change-photo.svg';
import star from '../../images/profile/star-rate.svg';
import styles from './styles.module.scss';
import TitleAbout from '@/app/components/ProfilePage/TitleAbout';
import AboutDescription from '@/app/components/ProfilePage/AboutDescription';
import Label from '@/app/components/SignIn/Label';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '@/app/REDUX/Auth/selector';
import { useTranslation } from '../../../i18n/client';

const calculateAge = (birthDate: string) => {
  const currentDate = new Date();
  const birthDateUser = new Date(birthDate);
  let age = currentDate.getFullYear() - birthDateUser.getFullYear();
  const monthDiff = currentDate.getMonth() - birthDateUser.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDateUser.getDate())) {
    age--;
  }

  return age;
}

const ProfileContainer = ({ lng }) => {
  const userData = useSelector(selectUser);
  const birthDateUser = calculateAge(userData?.birthday?.split('.').reverse().join('.') as string);
  const url = `https:${userData?.avatarURL as string}`;
  const gender = userData?.gender as string;

  return (
    <Block className='profile'>
      <Container>
        <Block className={styles['profile__content']}>

          <Block className={styles['profile__block-title']}>
            <Title>Profile</Title>
            <Link href='/'>
              <Image
                width={24}
                height={24}
                src={logOut}
                alt={'picture log out'}
              />
            </Link>
          </Block>

          <Block className={styles['profile__block-edit']}>
            <Block className={styles['profile__block-image']}>
              <Image className={styles['profile__block-image']} src={url} width='88' height='88' alt={'User Image'} priority={true} />
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
              <Link className={styles['profile__edit-profile']} href={`/${lng}/profile-edit`}>Edit</Link>
            </Block>
          </Block>

          <Block className={styles['profile__inform']}>
            <List>
              <ListItem>Age</ListItem>
              <Block className={styles['profile__inform-value']}>{birthDateUser} y.o</Block>
            </List>

            <List>
              <ListItem>Gender</ListItem>
              <Block className={styles['profile__inform-value']}>
                {gender?.charAt(0).toUpperCase() + gender?.slice(1)}
              </Block>
            </List>

            <List>
              <ListItem>Language</ListItem>
              <Block className={styles['profile__inform-value']}>UKR</Block>
            </List>
          </Block>

          <Block className={styles['profile__about']}>
            <TitleAbout>About</TitleAbout>
            <AboutDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              In reiciendis harum unde facilis necessitatibus?
              uasi ipsum, cupiditate, incidunt expedita ex in earum voluptatem
              quaerat quibusdam repellat, numquam quos vel asperiores!
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

export default ProfileContainer;