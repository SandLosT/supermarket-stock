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
    console.log(email, senha);

    try { 
        const response = await fetch("http://localhost:3000/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        });

        const data = await response.json();
        if (data.token) {
            localStorage.setItem('token', data.token);
            login(); // 🔥 Chama login() para atualizar o contexto
            navigate('/controle'); // Redireciona para a página de controle
        } else {
            setError('Credenciais inválidas. Tente novamente.');
        }
    } catch (err) {
        setError('Erro ao tentar fazer login. Tente novamente.');
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
