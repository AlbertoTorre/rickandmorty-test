<template>
  <div class="columns is-mobile is-centered">
    <nav class="panel column is-half p-0" >
      <p class="panel-heading">Rick And Morty</p>
      <character :characterData="characterData" v-if="characterData" />
      <article class="message is-warning" v-show="characterData && characterData.length">
        <div class="message-body">
            Cargando datos, espere un momento...
        </div>
      </article>
    </nav>
    <div class="fixed-bottom">

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RmCharacterDataService from "@/services/RmCharacterDataService";
import Character from "@/components/Character/Character.vue"; // @ is an alias to /src

@Component({
  components: {
    Character,
  },
})
export default class Home extends Vue {
  
  characterData = []

  created () {
    let  id = this.$route.query.id;
    RmCharacterDataService.findById( id )
    .then( (res: any ) => {
        if (res.status == 200) {
            this.characterData = res.data;
        } else {
            console.error("Ocurrio un error inesperado.");
        }
    })
    .catch( (e: any) => {
        this.characterData = [];
        console.error(e);
    })
  }
}
</script>