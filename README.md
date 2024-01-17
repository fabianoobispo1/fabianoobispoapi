# App

GymPass Style App

## RFs (Requisitos funcionais) 

- [ ] Deve aer possivel se cadastrar;
- [ ] Deve aer possivel se autenticar;
- [ ] Deve aer possivel obter o perfil de usuario logado ;
- [ ] Deve aer possivel o numero de check-ins realizados pelo usuario;
- [ ] Deve aer possivel o usuario obter seu historico de check-ins;
- [ ] Deve aer possivel o usuario buscar academias proximas;
- [ ] Deve aer possivel o usuario buscar academias pelo nome;
- [ ] Deve aer possivel o usuario realizar check-in em uma academia;
- [ ] Deve aer possivel validar o check-in de um usuario;
- [ ] Deve aer possivel cadastrar uma academia;

## RNs (Regras ne negocio)

- [ ] O usuario não deve poder se cadastrar com email duplicado;
- [ ] O usuario não pode fazer dois check-in no mesmo dia;
- [ ] O usuario não pode fazer check-in se nao estiver perto (100m) da academia;
- [ ] O check-in so pode ser validado ate 20 min apos criado;
- [ ] O check-in so pode ser validado por administradores;
- [ ] A academia so pode ser cadastrada por administradores;



## RNFs (Requisitos Não-funcionais) 

- [ ] A senha do usuario precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas as listas de dados precisam estaqr paginadas com 20 items por pagina;
- [ ] O usuario deve ser identificado por um JWT (JSON Web Token)



Imperadores Style App
Sera feito durante o GymPass

## RFs (Requisitos funcionais) 

- [ ] Deve aer possivel se cadastrar;
- [ ] Deve aer possivel se autenticar;
- [ ] Deve aer possivel obter o perfil de usuario logado ;


## RNs (Regras ne negocio)

## RNFs (Requisitos Não-funcionais) 

- [ ] A senha do usuario precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas as listas de dados precisam estaqr paginadas com 20 items por pagina;
- [ ] O usuario deve ser identificado por um JWT (JSON Web Token)





### Desenvolvimento 

Estou utilizando docker 
apos a instalacao, para usar a base de dados em porstgres usso esse comando 
docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql:latest

OU

executar o compose 
docker compose up 

que vai baixar e instalar a imagem postgres da bitnami empresa que presa por segurnaca
ja passo os parametros de usuario senha e database a ser criada, e a porta para onde vai apontar essa nova instancia do docker 

para ver o que esta rodano no docker 
docker ps 
usnado o docker ps -a lista todos ja baixados 

e para rodar o que acabamos de criar e 
docker start api-solid-pg


#prisma 
Ao alterar o arquivo schema.prisma onde e possivel criar tabelas e relacoes entre elas 
deve rodar o comando 
npx prisma migrate dev, que vai vertificar a base e se tiver alteraceos sera realizada, deve se dar um nome para a migrate, 

para ver a base pode usar o npx prisma studio


