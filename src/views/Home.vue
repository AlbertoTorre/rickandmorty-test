<template>
  <div class="columns is-mobile is-centered">
    <nav class="panel column is-half p-0 pb-6" >
      <p class="panel-heading">Rick And Morty</p>
      <div class="panel-block">
        <p class="control has-icons-left">
          <input class="input" type="text" placeholder="Buscar..." 
                  v-model="filter.name"
                  @keyup.13="loadFilter">
          <span class="icon is-left">
            <i class="fas fa-search" aria-hidden="true"></i>
          </span>
        </p>
      </div>
      <div class="panel-block">
        <div class="columns">
          <div class="column">Filtrado por:</div>
          <div class="column">
            <b-field>
                <b-select placeholder="Status" @input="statusChange" :value="filter.status">
                    <option v-for="option in statuses" 
                        :value="option.name" 
                        :key="option.id">
                        {{nameNotFilter(option.name)}}
                    </option>
                </b-select>
            </b-field>
          </div>
          <div class="column">
              <b-field>
                  <b-select placeholder="Gender" @input="genderChange" :value="filter.gender">
                      <option v-for="option in genders" 
                              :value="option.name" 
                              :key="option.id"> 
                          {{nameNotFilter(option.name)}} 
                      </option>
                  </b-select>
              </b-field>
          </div>
        </div>
      </div>
      <characters :characterList="characterList" />
      <article class="message is-warning" v-show="!characterList.length">
        <div class="message-body">
            Cargando datos, espere un momento...
        </div>
      </article>
    </nav>
    <div class="fixed-bottom">
      <b-pagination
          :total="total" :range-before="2" :range-after="2"
          :current="filter.current" order="is-centered" 
          size="is-small" @change="changePage" icon-pack="far"
          icon-prev="chevron-left" icon-next="chevron-right" :per-page="20" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RmCharacterDataService from "@/services/RmCharacterDataService";
import Characters from "@/components/Character/Characters.vue"; // @ is an alias to /src
import {get,set} from "local-storage";

@Component({
  components: {
    Characters,
  },
})
export default class Home extends Vue {
  characterList = [];

  private statuses = [
    {id: "", name: ""},
    {id: 1, name: "alive"},
    {id: 2, name: "dead"},
    {id: 3, name: "unknown"}
  ];

  private genders = [
    {id: "", name: ""},
    {id: 1, name: "female"},
    {id: 2, name: "male"},
    {id: 3, name: "genderless"},
    {id: 4, name: "unknown"}
  ];

  filter = {
    status: "",
    gender: "",
    name: "",
    current: 1
  };

  total = 0;
  pages = 0;

  mounted (): void {
    let data = JSON.parse(get<string>("data"))
    if ( data && ( data.name || data.status || data.gender ) ) {
      this.filter = Object.assign({}, this.filter, data)
      this.loadFilter()
    } else {
      this.response(RmCharacterDataService.getAll());      
    }
  }

  response (data: any ) {
      this.characterList = []
      return data.then( (res: any ) => {
          if (res.status == 200) {
            this.total = res.data.info.count;
            this.pages = res.data.info.pages;
            this.characterList = res.data.results;
          } else {
            console.error("Ocurrio un error inesperado.");
          }
      })
      .catch( (e: any) => {
          this.total = 0;
          this.pages = 0;
          this.characterList = [];
          console.error(e);
      });  
  }

  loadFilter (): void {
    set<string>("data", JSON.stringify(this.filter));
    return this.response(RmCharacterDataService.findByNameOrStatusOrGender(this.filter));
  }

  changePage (page: number): void {
    this.filter.current = page;
    set<string>("data", JSON.stringify(this.filter));

    this.response(RmCharacterDataService.getPage(page));
  }

  statusChange (status: string): void {
    this.filter.status = status;
    this.loadFilter()
  }

  genderChange (gender: string): void {
    this.filter.gender = gender;
    this.loadFilter()
  }

  nameNotFilter (val: string): string {
    return val ? val : "Sin Filtro"
  }
}
</script>

<style lang="scss" scoped>
.fixed-bottom {
    position: fixed;
    bottom: 0;
    background-color: #ffffffe0;
    padding: 5px;
    width: 100%;
}
</style>