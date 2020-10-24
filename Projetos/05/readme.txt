- Acessando o bash do Docker
docker exec -it "ID" /bin/bash

- Rodando o container
docker run --name diariodb -p 27015:27017 -d mongo

- Git para o Heroku
Incluir node_molues no .gitignore para não entrar no pacote de versionamento

Iniciaando repositório git
git init 

Adicionando todos os arquivos em um pacote de versionamento
git add .

Finaliza pacote para subir
git commit -am "initial commit"
