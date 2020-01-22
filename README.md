# Desafio Fundação CERTI

Repositório para o desafio da Fundação CERTI

# Como rodar

Clone o repositório
```
foo@bar:~$ git clone https://github.com/AdrianoTosetto/desafio-certi
```
Dentro da raiz do projeto crie a imagem: <sup>[1](#myfootnote1)</sup>

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
Exemplo:
```
http://localhost:3000/999888777666555
```

Retorno:
```
{
  "ok": true,
  "extenso": "novecentos e noventa e nove trilhões e oitocentos e oitenta e oito bilhões e setecentos e setenta e sete milhões e seiscentos e sessenta e seis mil e quinhentos e cinquenta e cinco"
}
```

Ou acessar:
[http://localhost:3000/:numero](http://localhost:3000/:numero)

<a name="myfootnote1">1</a>: Caso o `build` da imagem trave em algum ponto, basta interromper o `build` e remover a imagem com o comando:
```
docker image rm <id da imagem>
```
Depois de removida a imagem, precisa apenas repetir o comando de `build`
