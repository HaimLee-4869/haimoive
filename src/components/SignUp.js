import React, { useState } from 'react';
import { hashPassword } from '../services/tmdbApi'; // TMDB API 사용
import './SignUp.css';

function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    termsAgreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 이메일 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('유효한 이메일 주소를 입력하세요.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    if (!formData.termsAgreed) {
      alert('약관에 동의해야 합니다.');
      return;
    }

    try {
      // 비밀번호 해싱 후 저장
      const hashedPassword = await hashPassword(formData.password);
      localStorage.setItem(
        'user',
        JSON.stringify({ email: formData.email, password: hashedPassword })
      );
      alert('회원가입 성공! 로그인 페이지로 이동합니다.');
      window.location.href = '/signin'; // 로그인 페이지로 이동
    } catch (error) {
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>회원가입</h2>
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
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default SignUp;
