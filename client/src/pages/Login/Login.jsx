import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Auten/AuthContext'; // Importa o contexto de autenticação

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Obtém a função login do contexto


  const handleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await login(email, senha);
      navigate('/controle');
    } catch (err) {
      setError(err.message || 'Credenciais inválidas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login">
        <h2>Login</h2>
        {error && <div className="error">{error}</div>}
        <div className="form-group">
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
            />
          </div>

          <div>
            <label>Senha:</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
            />
          </div>

          <button onClick={handleLogin} disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
