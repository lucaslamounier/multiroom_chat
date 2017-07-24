module.exports.iniciaChat = function(application, req, res){

      var dadosForm = req.body;

      req.assert('apelido', 'O nome ou apelido é obrigatório').notEmpty();
      req.assert('apelido', 'O nome ou apelido deve conter entre 3 e 5 caracteres ').len(3, 15);

      // Obtem os erros de validação do formulário
      var errors = req.validationErrors();

      if(errors){
          res.render("index", {validacao: errors});
          return;
      }

      application.get('io').emit(
        'msgParaCliente',
        {apelido: dadosForm.apelido, mensagem: ' acabou de entrar no chat'}
      );

      res.render("chat", {dadosForm: dadosForm});
};
