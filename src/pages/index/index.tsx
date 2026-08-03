import './index.scss';
import { useNavigate } from 'react-router';

export default function IndexPage() {
  const navigate = useNavigate();
  function toMyPage() {
    navigate('/my')
  }
  return (
    <>
      <div>Here is in Index Page</div>
      <button onClick={toMyPage}>To My Page</button>
    </>
  )
}