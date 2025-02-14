import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NewContact from './pages/NewContact';
import EditContact from './pages/EditContact';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/new" element={<NewContact />} />
      <Route path="/edit/:id" element={<EditContact />} />
    </Routes>
  );
}
