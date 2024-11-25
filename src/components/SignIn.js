import React, { useState } from 'react';
import './SignIn.css';

function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
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

    // 로그인 로직
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (
      storedUser &&
      storedUser.email === formData.email &&
      storedUser.password === formData.password
    ) {
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
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2>로그인</h2>
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
        <label>
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
          />
          아이디 기억하기
        </label>
        <button type="submit">로그인</button>
        <p>
          회원가입이 필요하신가요? <a href="/signup">회원가입</a>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
