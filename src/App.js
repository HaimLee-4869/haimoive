import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Home from './components/Home';
import Popular from './components/Popular';
import Login from './components/Login';
import Signup from './components/Signup';
import Wishlist from './components/Wishlist';
import Search from './components/Search';
import './App.css';

function AnimatedRoutes() {
  const location = useLocation();
  const isLoggedIn = !!(localStorage.getItem('authToken') || sessionStorage.getItem('authToken'));

  if (!isLoggedIn && location.pathname !== '/login' && location.pathname !== '/signup') {
    // 로그인되지 않은 상태에서 SignIn 또는 SignUp이 아닌 페이지 접근 시 이동
    return <Navigate to="/signin" replace />;
  }

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Routes location={location}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          {/* 기본적으로 없는 경로에 대한 처리 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}


function App() {
  return (
    <Router basename="/haimoive">
      <AnimatedRoutes />
    </Router>
  );
}

export default App;