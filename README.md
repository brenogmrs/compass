# Compass UOL

## Scrips
- Instalar dependências: `npm install`
- Testes: `npm run test`
- Rodar o projeto: `docker-compose up`

---

# Cliente
### Estrutura:

- `id`: id do cliente
- `city_id`: id da cidade 
- `gender`: genero do cliente
- `full_name`: nome completo do cliente
- `birth_date`: data de nascimento do cliente

## Rotas

### Criar um cliente

#### Request:
- Método: `POST`
- URL: `http://localhost:3000/api/customer`
- Body:
```
{
    "city_id": "9d09cfca-7144-4118-8fc8-2c44a939d95b",
    "gender": "M",
    "full_name": "Bilbo Baggins",
    "birth_date": "1954-06-29"
}
```

### lista clientes pelo nome

#### Request:
- Método: `GET`
- URL: `http://localhost:3000/api/customer/name?full_name=<nome_do_cliente>`

### lista um cliente pelo id

#### Request:
- Método: `GET`
- URL: `http://localhost:3000/api/customer/<id_do_cliente>`


### Atualiza um cliente

#### Request:
- Método: `PUT`
- URL: `http://localhost:3000/api/customer/<id_do_cliente>`
- Body:
```
{
    "full_name": "Gandalf The Grey",
}
```

### Deleta um cliente

#### Request:
- Método: `DELETE`
- URL: `http://localhost:3000/api/customer/<id_do_cliente>`

---

# Cidade
### Estrutura:

- `id`: id do cidade
- `name`: nome da cidade 
- `uf`: unidade federativa da cidade

## Rotas

### Criar uma cidade

#### Request:
- Método: `POST`
- URL: `http://localhost:3000/api/city`
- Body:
```
{
    "name": "Belo Horizonte",
    "uf": "MG"
}
```

### lista cidade pelo nome

#### Request:
- Método: `GET`
- URL: `http://localhost:3000/api/city/name?name=<nome_da_cidade>`

### lista cidades pela uf

#### Request:
- Método: `GET`
- URL: `http://localhost:3000/api/city/uf?uf=<uf_da_cidade>`

