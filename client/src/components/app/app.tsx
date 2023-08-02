import { Route, Routes } from 'react-router-dom';
import { Notes } from '../notes/notes';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Notes />}/>
      </Routes>
    </>
  )
};

export default App;