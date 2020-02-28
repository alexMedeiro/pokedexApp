import { Component } from '@angular/core';
import { DadosService } from '../servicos/dados.service';
import { Route, Router } from '@angular/router';
import { IPokemon } from '../interfaces/IPpokemon';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public listaPokemons = [
    
    {
      numero: '001',
      nome: 'Bulbasaur',
      tipos: ['Grass', 'Poison'],
      img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png'
    },

    {
      numero: '007',
      nome: 'Squirtle',
      tipos: ['Walter'],
      img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png'
    },

    {
      numero: '004',
      nome: 'Charmander',
      tipos: ['Fire'],
      img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png'
    },

    
    {
      numero: '025',
      nome: 'Pikachu',
      tipos: ['Electric'],
      img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png'
    },

    {
      numero: '006',
      nome: 'Charizard',
      tipos: ['Fire'],
      img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png'
    },

    {
      numero: '011',
      nome: 'Metapod',
      tipos: ['Bug'],
      img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/011.png'
    },

    {
      numero: '015',
      nome: 'Beedril',
      tipos: ['Bug'],
      img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/015.png'
    },

    {
      numero: '052',
      nome: 'Meowth',
      tipos: ['Normal'],
      img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/052.png'
    },

    
    {
      numero: '064',
      nome: 'Kadabra',
      tipos: ['Psychic'],
      img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/064.png'
    },

    {
      numero: '066',
      nome: 'Machop',
      tipos: ['Fighting'],
      img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/066.png'
    },
];

public listaFiltrada =[];
  constructor( public dadosService : DadosService, public router :Router) {
    this.resetarLista();

  }

  abrirDadosPokemon(pokemon : IPokemon){
    // salva os dados  do pokemon no DB Virtual
    this.dadosService.setDados('dadosPokemon', pokemon);

    // Abre a pagina para exibir os dados.
    this.router.navigateByUrl('/dados-pokemon');

  }

  private resetarLista(){
    this.listaFiltrada = this.listaPokemons;
  }

  public buscarPokemon(evento:any){
    let busca = evento.target.value;

      this.resetarLista();

      if(busca && busca.trim() != ''){
        this.listaFiltrada = this.listaFiltrada.filter(dados =>{

          if (dados.numero.toLowerCase(). indexOf(busca.toLowerCase()) > -1){
            return true;
          }
      
          if (dados.nome.toLowerCase(). indexOf(busca.toLowerCase()) > -1){
            return true;
          }
          return false;
        });
      }

    

  }


}
