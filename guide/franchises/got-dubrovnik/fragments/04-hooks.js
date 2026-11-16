// ganchos da franquia: lugares que o core usa por função (não pelo nome)
const FX={
 entry:'pile',            // portão principal: onde o modo teste começa e o lugar padrão sem GPS
 target:'jesuit',         // alvo padrão da bússola
 far:'trsteno',farLabel:'Trsteno', // excursão longe do centro: fica fora do mapa desenhado e ganha um atalho no mapa
 boatFrom:{lokrum:'oldport'},      // navegar até o ponto de saída do barco em vez da ilha
 airWalk:['srd'],         // entre os lugares "de transporte", os que ainda dá para ir a pé
 fitOld:['gradac','lovr','minceta','ploce','walls','oldport'], // enquadramento "cidade velha" do mapa desenhado
 compassMarks:['lovr','minceta','bokar','srd','lokrum','reitor','ploce','pile'], // pontos de referência no horizonte da bússola
 bell:'jesuit'            // lugar com o botão do sino da Caminhada da Vergonha (opcional: null)
};
