<div align="center">
  <h2>Rocket.Q</h2>
  <img src="./screenshots/final-1.png">
  <p>Central de Perguntas Anônimas.</p>
</div>

## :rocket: Tecnologias utilizadas

- HTML
- CSS
- JS
- NodeJS
- EJS
- MySQL/MariaDB (Banco de Dados)

---

## :computer: Como baixar o projeto e iniciar o projeto

```bash
  // Clonar o repositório
  $ git clone https://github.com/jjoaovitor7/rocketq

  // Entrar no diretório
  $ cd rocketq

  // Criar o Banco de Dados
  $ mysql -u <user> -p
  MariaDB [(none)]> CREATE DATABASE IF NOT EXISTS <database_name>;
  MariaDB [(none)]> exit

  // Criar as tabelas no Banco de Dados
  $ node src/db/init.js

  // Iniciar o servidor
  $ node src/server.js
```

---
