/* Importar as configurações do servidor */
var app = require('./config/server');

/* parametrizar a porta de escuta */
var server = app.listen(80, function(){
    console.log('Servidor Online...');
});

/* Ativa a escuta do socket io para receber diversos protocolos pela porta 80 */
var io = require('socket.io').listen(server);

// atribui io para variável global app
app.set('io', io);

/* Criar a conexão por websocket */
io.on('connection', function(socket){

      console.log('Usuário conectou');

      // Evento disparado quando o usuário sai da página do chat
      socket.on('disconnect', function(){
          console.log('Usuário desconectou.. ');
      });

      // Evento disparado quando o cliente envia uma mensagem
      socket.on('msgParaServidor', function(data){
            /* Dialogos */
            // Envia mensagem para de volta para o servidor
            socket.emit('msgParaCliente',
                {apelido: data.apelido, mensagem: data.mensagem}
            );
            // Envia mensagem para todos os clientes
            socket.broadcast.emit('msgParaCliente',
              {apelido: data.apelido, mensagem: data.mensagem}
            );

            /* participantes do chat */
            if(parseInt(data.apelido_atualizado_nos_clientes) == 0){
                  socket.emit('participantesParaCliente',
                      {apelido: data.apelido}
                  );
                  // Envia mensagem para todos os clientes
                  socket.broadcast.emit('participantesParaCliente',
                    {apelido: data.apelido}
                  );
            };


    });

});
