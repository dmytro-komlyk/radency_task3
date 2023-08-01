import { Route, Routes } from 'react-router-dom';
import { Tasks } from '../tasks/tasks';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Tasks />}/>
      </Routes>
    </>
  )
};

export default App;