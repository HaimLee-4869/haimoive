import React, { useState } from 'react';
import './SignIn.css';

function SignIn() {
  const [isSignUp, setIsSignUp] = useState(false); // 로그인/회원가입 전환 상태
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
    termsAgreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      // 회원가입 로직
      if (!formData.termsAgreed) {
        alert('약관에 동의해야 합니다.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
        return;
      }
      localStorage.setItem('user', JSON.stringify({ email: formData.email, password: formData.password }));
      alert('회원가입 성공! 로그인하세요.');
      setIsSignUp(false); // 로그인 화면으로 전환
    } else {
      // 로그인 로직
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser && storedUser.email === formData.email && storedUser.password === formData.password) {
        alert('로그인 성공!');
        if (formData.rememberMe) {
          localStorage.setItem('authToken', 'loggedIn');
        } else {
          sessionStorage.setItem('authToken', 'loggedIn');
        }
        window.location.href = '/'; // 메인 페이지로 이동
      } else {
        alert('로그인 실패: 이메일 또는 비밀번호를 확인하세요.');
      }
    }
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2>{isSignUp ? '회원가입' : '로그인'}</h2>
        <input
          type="email"
          name="email"
          placeholder="이메일"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {isSignUp && (
          <>
            <input
              type="password"
              name="confirmPassword"
              placeholder="비밀번호 확인"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <label>
              <input
                type="checkbox"
                name="termsAgreed"
                checked={formData.termsAgreed}
                onChange={handleChange}
              />
              약관에 동의합니다.
            </label>
          </>
        )}
        {!isSignUp && (
          <label>
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            아이디 기억하기
          </label>
        )}
        <button type="submit">{isSignUp ? '회원가입' : '로그인'}</button>
        <p onClick={() => setIsSignUp(!isSignUp)} className="toggle-form">
          {isSignUp ? '로그인 화면으로 돌아가기' : '회원가입 하러 가기'}
        </p>
      </form>
    </div>
  );
}

export default SignIn;
