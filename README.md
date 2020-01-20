# Desafio Fundação CERTI

Repositório para o desafio da Fundação CERTI

# Como rodar

Clone o repositório
```
foo@bar:~$ git clone https://github.com/AdrianoTosetto/desafio-certi
```
Dentro da raiz do projeto crie a imagem:

```
docker build -t tosetto/desafio-certi .
```
Para subir o container

```
docker run -p 3000:3000 tosetto/desafio-certi
```

Para testar:

```
curl http://localhost:3000/:numero
```
Ou acessar:
[http://localhost:3000/:numero](http://localhost:3000/:numero)
