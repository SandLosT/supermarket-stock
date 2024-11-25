import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha: password }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Login bem-sucedido:', data); // Confirme que o front-end recebe o JSON correto
            navigate('/controle');
        } else {
            setError(data.mensagem || 'Erro desconhecido.');
        }
    } catch (err) {
        console.error('Erro na requisição:', err);
        setError('Erro no servidor. Tente novamente mais tarde.');
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="login">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>} {/* Exibe mensagens de erro */}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading} // Desabilita o botão enquanto está carregando
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </div>
    </div>
  );
}

export default Login;
