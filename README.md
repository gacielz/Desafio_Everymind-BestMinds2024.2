# Desafio_Everymind-BestMinds2024.2

Infelizmente não foi alcançado o objetivo de desenvolver APIs a tempo, porém, 
mesmo com chamadas diretas ao database para realização de CRUD, o sistema está
funcional e atende a todos os requisitos do desafio.

Na tela de início (index), é possível realizar login de forma convencional (com email
e senha), selecionar a opção "Esqueci minha senha", que envia um email de redefinição para
o email digitado no campo, e, selecionar a opção "Registrar", caso ainda não seja
cadastrado (Esta função foi desenvolvida para fins de testes, pois, por se tratar de um
sistema próprio, o ideal seria desenvolver outra interface para gerenciamento de
usuários, impedindo que qualquer um possa se cadastrar e acessar os registros da
empresa), que redireciona para a tela de registro, onde é possível se cadastrar com
email e senha válidos.
Na tela home, uma tabela é exibida com todos os registros de produtos presentes no database.
Ao clicar em um registro (linha), o usuário é redirecionado a tela em que é possível 
fazer o update do item selecionado. Ao passar o cursor do mouse sobre o item, aparece o
botão "Remover", que se selecionado, exibe um alerta, que se confirmado, remove o item 
do database e da tabela. E, por fim, o botão de adicionar produto, quando acionado, 
redireciona para a tela de registrar um novo produto, que permite preencher os dados
do novo registro e salva-lo no database, vindo este a ser exibido na tabela da home.
O botão Logout, que fica no canto superior direito da tela, realiza o logout do usuário
quando acionado.

Usuário existente:
Login: teste@gmail.com
Senha: 123456
