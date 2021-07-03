import { useHistory } from 'react-router-dom';
import api from '../../config/axiosConfig';

const Home = () => {
  const history = useHistory();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await api.get('/logout');

      if (res.status === 200) {
        history.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={(e) => handleLogout(e)}>
        <button type='submit'>Log Out</button>
      </form>
    </div>
  );
};

export default Home;
