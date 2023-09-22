import Header from '../components/Header';
import Gallery from '../components/Gallery';
import { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null); // Add error message state
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      await createUserWithEmailAndPassword(auth, 'user@example.com', '1Password');
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (e) {
      console.error(e.message);
      setErrorMessage('Invalid email or password'); // Set error message on login failure

      setTimeout(() => {
        setErrorMessage(null);
      }, 2000);
    }
  };

  return (
    <div className='mx-8'>
      <Header />
      {user ? (
        <Gallery />
      ) : (
        <div className='flex h-screen items-center justify-center'>
          {errorMessage && ( // Display error message if it exists
            <div className='bg-red-500 text-white p-4 rounded-md mb-4 absolute top-4 right-0'>
              {errorMessage}
            </div>
          )}
          <form
            className='flex flex-col gap-8 items-start border-2 p-16 max-w-[400px] w-[90%] border-black rounded-md'
            onSubmit={(e) => handleLogin(e)}
          >
            <div className='flex flex-col gap-4 w-full'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                id='email'
                placeholder='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='border-2 px-4 py-2 placeholder:text-black bg-[#f2f2f2] border-black rounded-md outline-none'
              />
            </div>
            <div className='flex flex-col gap-4 w-full'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                placeholder='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='border-2 px-4 py-2 placeholder:text-black bg-[#f2f2f2] border-black rounded-md outline-none'
              />
            </div>
            <button className='w-full bg-[#212121] text-white px-4 py-2 rounded-md'>Login</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
