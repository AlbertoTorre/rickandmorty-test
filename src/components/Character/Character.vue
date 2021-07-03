<template>
    <div>
        <section class="section">
            <div class="container">
                <p class="title is-4 has-text-left">{{characterData.name}}</p>
                <div class="columns">
                    <div class="column is-4">
                        <img :src="characterData.image" alt="">
                    </div>
                    <div class="column is-8 has-text-left">
                        <p class="is-size-4"><b>Status:</b> {{characterData.status}}</p>
                        <p class="is-size-4"><b>Gender:</b> {{characterData.gender}}</p>
                        <p class="is-size-4"><b>Origin:</b> {{(characterData.origin) ? characterData.origin.name : ''}}</p>
                        <p class="is-size-4"><b>Species:</b> {{characterData.species}}</p>
                    </div>
                </div>
                <p class="title is-4 has-text-left">Episodios donde aparecio</p>
                <div class="columns is-multiline overflow-custom p-3" v-if="episodes.length">
                    <div class="column is-one-quarter border-color p-2" 
                        :key="'e'+idx" v-for="(episode, idx) in episodes">
                        <p class="title is-6">{{episode.name}}</p>
                        <p class="subtitle is-6">{{episode.air_date}}</p>
                    </div>
                </div>
                <p class="title is-4 has-text-left">Personajes interesantes</p>
                <characters :characterList="interestingCharacters" />
                <router-link to="/" class="card-footer-item">Return Home</router-link>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import Characters from "@/components/Character/Characters.vue";
import axios from 'axios'

@Component({
    components: {
        Characters,
    },
})
export default class Character extends Vue {
    @Prop() private characterData: any;

    episodes: any = [];
    interestingCharacters: any = [];
    baseUrlEpisode = "https://rickandmortyapi.com/api/episode";
    baseUrlCharacter = "https://rickandmortyapi.com/api/character";

    @Watch('characterData')
    onCharacterDataChanged(value: any) {
        if ( value ) {
            let params: any = "";
            value.episode.forEach( (route: string) => {
                let id = route.split('episode/')[1];
                params+=`${id},`;
            })

            axios.get(`${this.baseUrlEpisode}/${params}`)
            .then( (res) => {
                this.episodes = res.data
            });
        }
    }

    created () {
        axios.get(`${this.baseUrlCharacter}/${this.getThreeNumberInt()}`)
        .then( (res) => {
            this.interestingCharacters = res.data
        });
    }

    getThreeNumberInt (): string {
        let n = 0, params = "";
        while(n < 3){
            params+=`${this.getRandomInt(1,100)},`;
            n++;
        }
        return params;        
    }

    getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min)) + min;
    }    
}
</script>

<style lang="scss" scoped>
.border-color {
    border: 1px solid #ccc;
}
.overflow-custom {
    overflow: auto;
    min-height: 95px;
    max-height: 250px;
}
</style>