import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/auth/Login';
import Dashboard from './pages/cms/Dashboard';
import Pages from './pages/cms/Pages';
import FileManager from './pages/cms/FileManager';
import Settings from './pages/cms/Settings';
import Users from './pages/cms/Users';
import AuthLayout from './components/layouts/AuthLayout';
import CmsLayout from './components/layouts/CmsLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<Navigate to="login" replace />} />
          <Route index path="login" element={<Login />} />
        </Route>

        {/* CMS */}
        <Route path="/" element={<CmsLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="" element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="pages" element={<Pages />} />
          <Route path="files" element={<FileManager />} />

          {/* USERS CRUD */}
          <Route path="users" element={<Users />} />
          <Route path="users/create" element={<Users />} />
          <Route path="users/:id" element={<Users />} />
          <Route path="users/:id/edit" element={<Users />} />

          <Route path="settings" element={<Settings />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;