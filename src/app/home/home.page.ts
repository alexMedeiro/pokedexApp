import { Component } from '@angular/core';
import { DadosService } from '../servicos/dados.service';
import { Route, Router } from '@angular/router';
import { IPokemon } from '../interfaces/IPpokemon';
import { PokemonApiService } from '../servico/pokemon-api.service';




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

public listaPokemonApi = [];
public totalPokemons;
public offset = 0;
public limit = 10 ;
public paginaAtual = 0;
  constructor( 
    public dadosService : DadosService,
     public router :Router,
     public pokeApi: PokemonApiService) {

    this.resetarLista();

     this.buscarPokemons(this.offset, this.limit);

     }
  
  

  public buscarPokemons(offset, limit){

    if(this.offset <= offset){
      this.paginaAtual++;
      
    }else{
      this.paginaAtual--;
    }
    //atualiza o offset geral
    this.offset = offset;
  
   
    
    this.pokeApi.buscaPokemons(offset, limit
      ).subscribe(dados=>{
    console.log(dados);
        // Limpa a lista para exibir 
    this.listaPokemonApi = [];

    //Pega somente o total de pokemons
   this.totalPokemons = dados['count'];
   //Pega somente a lista de pokemons 
   let listaApi = dados['results'];

        // percorre a lista e busaca na Api todos os dados do pokemon
        for(let item of listaApi){
          this.pokeApi.buscaPokemon(item.url).subscribe(dado =>{
            //adicona os dados dos pokemon ao final da lista
             this.listaPokemonApi.push(dado);
          });
        }
        // Atualiza a listaFiltrada comos pokemons buscados
        this.resetarLista();


    })
  }

  abrirDadosPokemon(pokemon : IPokemon){
    // salva os dados  do pokemon no DB Virtual
    this.dadosService.setDados('dadosPokemon', pokemon);

    // Abre a pagina para exibir os dados.
    this.router.navigateByUrl('/dados-pokemon');

  }

  private resetarLista(){
    //this.listaFiltrada = this.listaPokemons;

    this.listaFiltrada = this.listaPokemonApi;

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
