# App

GymPass Style App

## RFs (Requisitos funcionais) 

- [x] Deve aer possivel se cadastrar;
- [x] Deve aer possivel se autenticar;
- [x] Deve aer possivel obter o perfil de usuario logado ;
- [x] Deve aer possivel o numero de check-ins realizados pelo usuario;
- [x] Deve aer possivel o usuario obter seu historico de check-ins;
- [x] Deve aer possivel o usuario buscar academias proximas ate 10 km;
- [x] Deve aer possivel o usuario buscar academias pelo nome;
- [x] Deve aer possivel o usuario realizar check-in em uma academia;
- [x] Deve aer possivel validar o check-in de um usuario;
- [x] Deve aer possivel cadastrar uma academia;

## RNs (Regras ne negocio)

- [x] O usuario não deve poder se cadastrar com email duplicado;
- [x] O usuario não pode fazer dois check-in no mesmo dia;
- [x] O usuario não pode fazer check-in se nao estiver perto (100m) da academia;
- [x] O check-in so pode ser validado ate 20 min apos criado;
- [x] O check-in so pode ser validado por administradores;
- [x] A academia so pode ser cadastrada por administradores;



## RNFs (Requisitos Não-funcionais) 

- [x] A senha do usuario precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas as listas de dados precisam estaqr paginadas com 20 items por pagina;
- [x] O usuario deve ser identificado por um JWT (JSON Web Token)



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

#supabase
estou utilizando o supabase versao graturita,
ele pode pousar o projeto as vezes 
o link e https://supabase.com/dashboard/project/lbftsxdjaxjkkiunqani


#prisma 
Ao alterar o arquivo schema.prisma onde e possivel criar tabelas e relacoes entre elas 
deve rodar o comando 
npx prisma migrate dev, que vai vertificar a base e se tiver alteraceos sera realizada, deve se dar um nome para a migrate, 

para ver a base pode usar o npx prisma studio


## Passo a passo para adicionar uma nova funcionalidade 
nesse caso vou criar a funcionalidade de lista de tarefas
onde sera possivel criar nova tarefa, editar, listar, e marcar como comcluido

- editar o rquivo schema.prisma para adicionar uma nova tabela ou alterar 
model Todos {
  id          String   @id @default(uuid())
  text        String
  isCompleted Boolean  @default(false)
  created_at  DateTime @default(now())
  updatedAt   DateTime @default(now())

  @@map("todos")
}

- comando npx prisma migrate dev para de fato realizar a alteracao na base 
- comando npx prisma db pull para atualizar o  Prisma Client

- parte de repositories criar os arquivos repositories/in-memory/in-memory-todos-repository.ts 
, repositories/prisma/prisma-todos-repository.ts e todos-repository.ts


- parte de use case 
nessa parte devera ser cirado um arquivo para cada funcionalidade e os arquivos de testes unitarios

- parte http
nessa parte que criamos a rota de fato, na pasta controlers 


api esta postada em 
https://dashboard.render.com/

endereco externo api 
https://fabianoobispoapi.onrender.com

banco de dados postgres 
esta em https://neon.tech/ 

fornt esta no vercel 
