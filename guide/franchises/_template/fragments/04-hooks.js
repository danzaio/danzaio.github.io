// ganchos da franquia: lugares que o core usa por função (ver docs/ARCHITECTURE.md)
const FX={
 entry:'centro',          // TODO: portão/praça principal — onde o modo teste começa
 target:'centro',         // TODO: alvo padrão da bússola
 far:null,farLabel:'',    // excursão longe do centro (id) com atalho no mapa; null = nenhuma
 boatFrom:{},             // {destino:'embarque'} quando se chega de barco/teleférico
 airWalk:[],              // lugares de AIR aonde ainda dá para ir a pé
 fitOld:['centro','mirante'], // lugares que enquadram o centro no mapa desenhado
 compassMarks:['mirante'],    // referências no horizonte da bússola
 bell:null                // lugar com o botão especial (sino); null = sem
};
