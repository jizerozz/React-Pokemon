import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from './Button/Button';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  signOut,
} from 'firebase/auth';
import app from '../firebase';

const initialUserData = (): User | null => {
  const StoredData = localStorage.getItem('userData');
  return StoredData ? JSON.parse(StoredData) : null;
};

const NavBar = () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [show, setShow] = useState(false);
  const [userData, setuserData] = useState<User | null>(initialUserData);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setuserData(result.user);
        localStorage.setItem('userData', JSON.stringify(result.user));
      })
      .catch((error) => console.error(error));
  };

  const listener = () => {
    if (window.scrollY > 50) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', listener);

    return () => {
      window.removeEventListener('scroll', listener);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      } else if (user && pathname === '/login') {
        navigate('/');
      }
      setuserData(user);
    });
    return () => {
      unsubscribe();
    };
  }, [pathname, navigate]);

  const handleLogout = () => {
    console.log(auth);
    signOut(auth)
      .then(() => {
        setuserData(null);
        navigate('/login');
      })
      .catch((error) => alert(error.message));
  };

  return (
    <NavWrapper show={show}>
      <Logo>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png`}
          alt="pokelogo"
          onClick={() => {
            window.location.href = '/';
          }}
        />
      </Logo>
      {pathname === '/login' ? (
        <Button btnType="sm" color="red-500" onClick={handleAuth}>
          로그인
        </Button>
      ) : (
        <SignOut>
          <UserImg
            src={userData?.photoURL || ''}
            alt={userData?.displayName || ''}
          />
          <Dropdown>
            <span onClick={handleLogout}>로그아웃</span>
          </Dropdown>
        </SignOut>
      )}
    </NavWrapper>
  );
};

const NavWrapper = styled.nav<{ show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  background-color: ${(props) => (props.show ? '#090b13' : 'transparent')};
`;

const Logo = styled.a`
  padding: 0;
  width: 50px;
  margin-top: 4px;
  margin-left: 10px;
  cursor: pointer;

  img {
    width: 100%;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0/50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
  color: white;
  transition: opacity 0.3s ease-in-out;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover ${Dropdown} {
    opacity: 1;
  }
`;

const UserImg = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;
export default NavBar;
