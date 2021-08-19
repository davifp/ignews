import { SignInButton } from '../SignInButton/index';
import { ActiveLink } from '../ActiveLink';
import Image from 'next/image';

import logoPicture from '../../../public/images/logo.svg';

import styles from './styles.module.scss';

export function Header() {

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image src={logoPicture} alt="Logo ig.news" />
        <nav>
          <ActiveLink activeClassName={styles.active} href='/'>
            <a>Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href='/posts'>
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  );
}
