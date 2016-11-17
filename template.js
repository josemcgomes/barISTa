var pin = "";
var contribuinte = 0;
var contribuinte_texto = "";

function toggleVisible(id) {
  var element = document.getElementById(id);
  if (element.style.display !== 'none') {
    element.style.display = 'none';
  }
  else {
    element.style.display = 'block';
  }
}

function manageOtherLists(a){
  if (a == 1){
    a = 'block';
  }
  else{
    a = 'none';
  }
  document.getElementById('pedido_2_header').style.display = a;
  document.getElementById('pedido_2_tabela').style.display = a;
  document.getElementById('pedido_3_header').style.display = a;
  document.getElementById('pedido_3_tabela').style.display = a;
  document.getElementById('pedido_4_header').style.display = a;
  document.getElementById('pedido_4_tabela').style.display = a;
}

// função que controla o pagamento por moedas: pagar 1 a 1, exceto no fim
function paymoney(){
  var to_pay = Number(document.getElementById('pagamento_restante').innerHTML.slice(0, -1));

  if (to_pay > 1) {
    to_pay = to_pay - 1;
  }
  else if (to_pay <=1){
    to_pay = 0;
  }
  document.getElementById('pagamento_restante').innerHTML = to_pay.toFixed(2) + '€';
  if (to_pay == 0){
    openPass('pagamento_concluido');
  }
}

function insertNumber(a){
  pin = pin + a;
  document.getElementById('codigo').innerHTML = document.getElementById('codigo').innerHTML + "*";
}
function correctPin(){
  document.getElementById('codigo').innerHTML = document.getElementById('codigo').innerHTML.slice(0, -1);
  pin = pin.slice(0, -1);
}
function writeNumber(a){
  contribuinte_texto = contribuinte_texto + a;
  document.getElementById('codigo_contribuinte').innerHTML = document.getElementById('codigo_contribuinte').innerHTML + a;
  document.getElementById('codigo_contribuinte_2').innerHTML = document.getElementById('codigo_contribuinte_2').innerHTML + a;
}
function correctContribuinte(){
  document.getElementById('codigo_contribuinte').innerHTML = document.getElementById('codigo_contribuinte').innerHTML.slice(0, -1);
  document.getElementById('codigo_contribuinte_2').innerHTML = document.getElementById('codigo_contribuinte_2').innerHTML.slice(0, -1);
  contribuinte_texto = contribuinte_texto.slice(0, -1);
}

function checkPin(){
  if (pin == '1337') {
    openPass('pagamento_concluido');
  }
  else{
    openPass('pagamento_falhado');
  }
  pin = "";
  document.getElementById('codigo').innerHTML = " ";
}

function corrigirContribuinte(){
  contribuinte = 0;
  closeNav('pagamento_contribuinte_2');
  closeNav('pagamento_contribuinte_3');
  openPass('pagamento_contribuinte_2');
}
function continuarPagamento(){
  document.getElementById('pagamento_contribuinte_1').style.height = "45%";
}

function openNav(a) {
    document.getElementById(a).style.height = "100%";
}

function openPass(a) {
  if (a == 'confirmar_envio'){
    var x = document.getElementById('tabela_pedido_tbody').rows.length;
    if (x==0){
      document.getElementById('pedido_vazio').style.height = "45%";
    }
    else{
      document.getElementById(a).style.height = "45%";
    }
  }
  else if (a == 'confirmar_limpar'){
    var x = document.getElementById('tabela_pedido_tbody').rows.length;
    if (x == 0) {
      document.getElementById('limpar_pedido_vazio').style.height = "45%";
      return;
    }
    else{
      document.getElementById(a).style.height = "45%";
    }
  }
  else if (a == 'pedido_atendido'){
    document.getElementById(a).style.height = "45%";
    closeNav('pedido_enviado');
    closeNav('confirmar_envio');
    setTimeout("closeNav('pedido_atendido')", 3000);
    openPass('pagamento_principal_2')
  }
  else if (a == 'pagamento_contribuinte_1'){
    var x = document.getElementById('tabela_pedido_tbody').rows.length;
    if (x != 0){
      openPass('pagamento_pedido_nao_vazio');
    }
    else{
      document.getElementById(a).style.height = "45%";
    }
  }
  else if (a == 'pagamento_contribuinte_2'){
    if (contribuinte == 1){
      openPass('pagamento_quem');
    }
    else if (contribuinte == 0){
      document.getElementById(a).style.height = "45%";
      closeNav('pagamento_contribuinte_confirmar');
    }
  }
  else if (a == 'pagamento_contribuinte_confirmar'){
    document.getElementById('contribuinte_inserido').innerHTML = contribuinte_texto;
    document.getElementById(a).style.height = "45%";
  }
  else if (a == 'pagamento_dinheiro'){
    document.getElementById(a).style.height = "45%";
    document.getElementById('pagamento_restante').innerHTML = document.getElementById('preco_total_valor').innerHTML.slice(0, -1) + '€';
    var to_pay = Number(document.getElementById('pagamento_restante').innerHTML.slice(0, -1));
    var to_pay_2 = to_pay;
    console.log(to_pay);
  }
  else if (a == 'pagamento_concluido'){
    // limpa o histórico
    var tabela = document.getElementById('tabela_pedido_historico_tbody');
    var x = tabela.rows.length;
    for (x; x>0; x--){
      tabela.deleteRow(x-1);
    }

    // fecha todos os flyouts
    document.getElementById(a).style.height = "45%";
    closeNav('pagamento_principal_2');
    closeNav('pagamento_contribuinte_1');
    closeNav('pagamento_contribuinte_2');
    closeNav('pagamento_quem');
    closeNav('pagamento_tipo');
    closeNav('pagamento_dinheiro');
    closeNav('pagamento_cartao');
    closeNav('pagamento_cartao_2');
    closeNav('pagamento_nfc');
    closeNav('pagamento_pedido_nao_vazio');
    document.getElementById('pedido_historico_header').style.display = 'none';
    document.getElementById('pedido_historico_tabela').style.display = 'none';
    setTimeout("closeNav('pagamento_concluido')", 4000);
  }
  else if (a == 'pagamento_tipo_dividir'){
    updatePriceAllLists(4);
    document.getElementById('pedido_2_header').style.display = 'block';
    document.getElementById('pedido_2_tabela').style.display = 'block';
    document.getElementById('pedido_3_header').style.display = 'block';
    document.getElementById('pedido_3_tabela').style.display = 'block';
    document.getElementById('pedido_4_header').style.display = 'block';
    document.getElementById('pedido_4_tabela').style.display = 'block';
    document.getElementById('pagamento_tipo').style.height = "45%";
  }
  else if (a == 'pagamento_tipo_todos'){
    updatePriceAllLists(1);
    manageOtherLists(1);
    document.getElementById('pagamento_tipo').style.height = "45%";
  }
  else if (a == 'pagamento_quem'){
    if (contribuinte_texto != ""){
      contribuinte = 1;
      document.getElementById('mudar_contribuinte').style.display = 'block';
    }
    document.getElementById('pedido_header').style.display = 'none';
    document.getElementById('pedido_tabela').style.display = 'none';
    document.getElementById(a).style.height = "45%";
    updatePrice();
  }
  else if (a == 'pagamento_cartao_2'){
    document.getElementById('codigo').innerHTML = ' ';
    document.getElementById(a).style.height = "45%";
  }
  else{
    document.getElementById(a).style.height = "45%";
  }
}

function closeNav(a) {
  if (a == 'pagamento_tipo'){
    updatePrice();
    manageOtherLists(0);
    document.getElementById(a).style.height = "0%";
  }
  else if (a == 'pagamento_quem'){
    document.getElementById('pedido_header').style.display = 'block';
    document.getElementById('pedido_tabela').style.display = 'block';
    closeNav('pagamento_pedido_nao_vazio');
    closeNav('pagamento_contribuinte_1');
    closeNav('pagamento_contribuinte_2');
    closeNav('pagamento_contribuinte_3');
    closeNav('pagamento_contribuinte_confirmar');
    document.getElementById(a).style.height = "0%";
  }
  else if (a == 'pagamento_cartao_2'){
    document.getElementById('codigo').innerHTML = ' ';
    document.getElementById(a).style.height = "0%";
    closeNav('pagamento_cartao');
  }
  else if (a == 'pagamento_contribuinte_1'){
    document.getElementById('pedido_header').style.display = 'block';
    document.getElementById('pedido_tabela').style.display = 'block';
    updatePrice();
    document.getElementById(a).style.height = "0%";
  }
  else if (a == 'pagamento_contribuinte_2'){
    document.getElementById('codigo_contribuinte').innerHTML = ' ';
    document.getElementById('codigo_contribuinte_2').innerHTML = ' ';
    contribuinte_texto = "";
    document.getElementById(a).style.height = "0%";
    closeNav('pagamento_contribuinte_1');
  }
  else if (a == 'pagamento_contribuinte_3'){
    document.getElementById('codigo_contribuinte').innerHTML = ' ';
    document.getElementById('codigo_contribuinte_2').innerHTML = ' ';
    contribuinte_texto = "";
    document.getElementById(a).style.height = "0%";
    closeNav('pagamento_contribuinte_1');
  }
  else{
    console.log(contribuinte);
    document.getElementById(a).style.height = "0%";
  }
}

function enviarPedido(){
  // verifica se o pedido está vazio
  var x = document.getElementById('tabela_pedido_tbody').rows.length;
  if (x==0){
    document.getElementById('pedido_vazio').style.height = "45%";
    return;
  }
  // se não estiver, confirma o envio e move o pedido para o histórico
  else{
    // move o pedido para o histórico
    var tabela_pedido = document.getElementById('tabela_pedido_tbody');
    var tabela_historico = document.getElementById('tabela_pedido_historico_tbody');
    var x = document.getElementById('tabela_pedido_tbody').rows.length;
    var y = document.getElementById('tabela_pedido_historico_tbody').rows.length;
    for (var i = 0; i < x; i++){
      var controlo = 0;
      for (var j = 0; j < y; j++){
        // verifica se o item a adicionar ao histórico já lá está
        if (tabela_historico.rows[j].cells[1].innerHTML == tabela_pedido.rows[i].cells[1].innerHTML){
          // se estiver atualiza
          tabela_historico.rows[j].cells[0].innerHTML = Number(tabela_historico.rows[j].cells[0].innerHTML) + Number(tabela_pedido.rows[i].cells[0].innerHTML);
          tabela_historico.rows[j].cells[2].innerHTML = Number(tabela_historico.rows[j].cells[2].innerHTML) + Number(tabela_pedido.rows[i].cells[2].innerHTML);
          controlo = 1;
        }
      }
      if (controlo == 0) {
        // chegámos ao fim da iteração e não houve correspondência, portanto adiciona-se uma linha nova
        var row = tabela_historico.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = tabela_pedido.rows[i].cells[0].innerHTML;
        cell2.innerHTML = tabela_pedido.rows[i].cells[1].innerHTML;
        cell3.innerHTML = tabela_pedido.rows[i].cells[2].innerHTML;
      }
    }

    clearList();
    document.getElementById('pedido_historico_header').style.display = 'block';
    document.getElementById('pedido_historico_tabela').style.display = 'block';
    // apresenta mensagem de sucesso
    document.getElementById('confirmar_envio').style.height = "45%";
    document.getElementById('pedido_enviado').style.height = "45%";
    setTimeout("openPass('pedido_atendido')", 3000);
  }
}

// Funções para adicionar item à lista do pedido-------------------------------

function showPedidoControlo(name, preco){
  document.getElementById('pedido_controlo').style.height = "100%";
  document.getElementById('pedido_controlo_nome').innerHTML = name;
  document.getElementById('pedido_controlo_quantidade').innerHTML = 1;
  document.getElementById('pedido_controlo_preco').innerHTML = preco;
  document.getElementById('pedido_controlo_preco_total').innerHTML = preco;
}

function mudarPedido(name, qtd, preco_total){
  document.getElementById('pedido_controlo_mudar').style.height = "100%";
  document.getElementById('pedido_controlo_mudar_nome').innerHTML = name;
  document.getElementById('pedido_controlo_mudar_quantidade').innerHTML = qtd;
  document.getElementById('pedido_controlo_mudar_preco').innerHTML = ((preco_total*100/qtd)/100);
  document.getElementById('pedido_controlo_mudar_preco_total').innerHTML = preco_total;

}

function aumentarQtd(){
  var timesClicked = document.getElementById('pedido_controlo_quantidade').innerHTML;
  timesClicked++;
  document.getElementById('pedido_controlo_quantidade').innerHTML = timesClicked;
  preco = timesClicked*document.getElementById('pedido_controlo_preco').innerHTML;
  document.getElementById('pedido_controlo_preco_total').innerHTML = preco.toFixed(2);

}

function reduzirQtd(){
  var timesClicked = document.getElementById('pedido_controlo_quantidade').innerHTML;
  // var preco = document.getElementById('pedido_controlo_preco').innerHTML;
  if (timesClicked>1) {
    timesClicked--;
  }
  document.getElementById('pedido_controlo_quantidade').innerHTML = timesClicked;
  preco = timesClicked*document.getElementById('pedido_controlo_preco').innerHTML;
  document.getElementById('pedido_controlo_preco_total').innerHTML = preco.toFixed(2);

}

function aumentarQtdMudar(){
  var timesClicked1 = document.getElementById('pedido_controlo_mudar_quantidade').innerHTML;
  // var preco = document.getElementById('pedido_controlo_preco').innerHTML;
  // var timesClicked = 1; //se quiser que comece sempre em 1
  timesClicked1++;
  document.getElementById('pedido_controlo_mudar_quantidade').innerHTML = timesClicked1;
  preco = timesClicked1*document.getElementById('pedido_controlo_mudar_preco').innerHTML;
  document.getElementById('pedido_controlo_mudar_preco_total').innerHTML = preco.toFixed(2);

}

function reduzirQtdMudar(){
  var timesClicked1 = document.getElementById('pedido_controlo_mudar_quantidade').innerHTML;
  // var preco = document.getElementById('pedido_controlo_preco').innerHTML;
  if (timesClicked1>1) {
    timesClicked1--;
  }
  document.getElementById('pedido_controlo_mudar_quantidade').innerHTML = timesClicked1;
  preco = timesClicked1*document.getElementById('pedido_controlo_mudar_preco').innerHTML;
  document.getElementById('pedido_controlo_mudar_preco_total').innerHTML = preco.toFixed(2);

}

function mudarQtd(){
  qtd = document.getElementById('pedido_controlo_mudar_quantidade').innerHTML;
  nome = document.getElementById('pedido_controlo_mudar_nome').innerHTML;
  preco = document.getElementById('pedido_controlo_mudar_preco_total').innerHTML;
  var tabela = document.getElementById('tabela_pedido_tbody');
  var x = document.getElementById('tabela_pedido_tbody').rows.length;
  for (var i = 0; i < x; i++){
    if (tabela.rows[i].cells[1].innerHTML == nome){
      tabela.rows[i].cells[0].innerHTML = Number(qtd);
      tabela.rows[i].cells[2].innerHTML = Number(preco);
      updatePrice();
      closeNav('pedido_controlo_mudar');
      return;
    }
  }
}

function adicionarItem(nome, preco) {
  var tabela = document.getElementById('tabela_pedido_tbody');
  // verificar se o item ja existe
  var x = document.getElementById('tabela_pedido_tbody').rows.length;
  console.log(x);
  var z = 0;
  for (var i = 0; i < x; i++){
    if (tabela.rows[i].cells[1].innerHTML == nome){
      z = 1;
      tabela.rows[i].cells[0].innerHTML = 1 + Number(tabela.rows[i].cells[0].innerHTML);
      novo_preco = Number(preco) + Number(tabela.rows[i].cells[2].innerHTML);
      tabela.rows[i].cells[2].innerHTML = novo_preco.toFixed(2);
      updatePrice();
      closeNav('pedido_controlo');
      return;
    }
  }
  // Se não existir
  if (z==0){
    var row = tabela.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = 1;
    cell2.innerHTML = nome;
    cell3.innerHTML = preco;
    cell4.innerHTML = "✖";
    // $(row).on("click", function(){
    //   mudarPedido(cell2.innerHTML, cell1.innerHTML, cell3.innerHTML)
    // });
    $(cell1).on("click", function(){
      mudarPedido(cell2.innerHTML, cell1.innerHTML, cell3.innerHTML)
    });
    $(cell2).on("click", function(){
      mudarPedido(cell2.innerHTML, cell1.innerHTML, cell3.innerHTML)
    });
    $(cell3).on("click", function(){
      mudarPedido(cell2.innerHTML, cell1.innerHTML, cell3.innerHTML)
    });
    $(cell4).on("click", function(){
      confirmarRemover(cell2.innerHTML);
    });
    updatePrice();
    closeNav('pedido_controlo');
  }

}

function confirmarRemover(a){
  openNav('confirmar_remover');
  document.getElementById('confirmar_remover_nome').innerHTML = a;
}

function removerItem(){
  nome = document.getElementById('confirmar_remover_nome').innerHTML;
  var tabela = document.getElementById('tabela_pedido_tbody');
  var x = document.getElementById('tabela_pedido_tbody').rows.length;
  for (var i = 0; i < x; i++){
    if (tabela.rows[i].cells[1].innerHTML == nome){
        tabela.deleteRow(i);
      updatePrice();
      closeNav('confirmar_remover');
      closeNav('pedido_controlo_mudar');
      return;
    }
  }
}
// ----------------------------------------------------------------------------

// Controlo das listas
function updatePrice(){
  // para fazer isto é preciso fazer um for na tabela para percorrer todos os
  // preços e somar numa variável local. depois concatena-se com € e substitui-se
  // o valor que estava por esse
  // esta função chama-se ao fim de todas as operações que chamem a lista
  if (document.getElementById('pedido_tabela').style.display != 'none'){
    //para não mudar o preço enquanto caso se selecione algo enquanto se paga
    var x = document.getElementById('tabela_pedido_tbody').rows.length;
    var tabela = document.getElementById('tabela_pedido_tbody');

    var valor = 0;
    for (var i = 0; i < x; i++){
      console.log(tabela.rows[i].cells[2].innerHTML);
      valor += Number(tabela.rows[i].cells[2].innerHTML);
    }
    var x = document.getElementById('tabela_pedido_historico_tbody').rows.length;
    var tabela = document.getElementById('tabela_pedido_historico_tbody');
    for (var i = 0; i < x; i++){
      console.log(tabela.rows[i].cells[2].innerHTML);
      valor += Number(tabela.rows[i].cells[2].innerHTML);
    }
    console.log(typeof valor);
    valor = valor.toFixed(2);
    document.getElementById('preco_total_valor').innerHTML = valor+'€';
  }
  else if(document.getElementById('pedido_tabela').style.display == 'none'){
    valor = 0;
    var x = document.getElementById('tabela_pedido_historico_tbody').rows.length;
    var tabela = document.getElementById('tabela_pedido_historico_tbody');
    for (var i = 0; i < x; i++){
      console.log(tabela.rows[i].cells[2].innerHTML);
      valor += Number(tabela.rows[i].cells[2].innerHTML);
    }
    console.log(typeof valor);
    valor = valor.toFixed(2);
    document.getElementById('preco_total_valor').innerHTML = valor+'€';
  }
}

function updatePriceAllLists(a){
  // atualiza o preço percorrendo todas as tabelas e depois divide por 4

  var valor = 0;
  // percorre histórico
  var tabela = document.getElementById('tabela_pedido_historico_tbody');
  var x = tabela.rows.length;
  for (var i = 0; i < x; i++){
    console.log(tabela.rows[i].cells[2].innerHTML);
    valor += Number(tabela.rows[i].cells[2].innerHTML);
  }
  // percorre mesa 2
  var tabela = document.getElementById('tabela_pedido_2_tbody');
  var x = tabela.rows.length;
  for (var i = 0; i < x; i++){
    console.log(tabela.rows[i].cells[2].innerHTML);
    valor += Number(tabela.rows[i].cells[2].innerHTML);
  }
  // mesa 3
  var tabela = document.getElementById('tabela_pedido_3_tbody');
  var x = tabela.rows.length;
  for (var i = 0; i < x; i++){
    console.log(tabela.rows[i].cells[2].innerHTML);
    valor += Number(tabela.rows[i].cells[2].innerHTML);
  }
  // mesa 4
  var tabela = document.getElementById('tabela_pedido_4_tbody');
  var x = tabela.rows.length;
  for (var i = 0; i < x; i++){
    console.log(tabela.rows[i].cells[2].innerHTML);
    valor += Number(tabela.rows[i].cells[2].innerHTML);
  }
  valortotal=(valor/a);
  valortotal=valortotal.toFixed(2);
  document.getElementById('preco_total_valor').innerHTML = valortotal+'€';
}

function clearList(){
  var x = document.getElementById('tabela_pedido_tbody').rows.length;
  var tabela = document.getElementById('tabela_pedido_tbody');
  for (x; x>0; x--){
    tabela.deleteRow(x-1);
  }
  updatePrice();
  closeNav('confirmar_limpar');
}

//função de sair
function cancel(){
  contribuinte = 0;
  document.getElementById('mudar_contribuinte').style.display = 'none';
  clearList();
  closeNav('confirmar_cancelar');
  openNav('start_screen');
}
