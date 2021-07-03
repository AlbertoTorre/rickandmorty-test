<template>
    <div class="columns is-desktop">
        <div class="column is-12">
            <p class="title is-4 has-text-left">{{characterData.name}}</p>
            <div class="columns">
                <div class="column">
                    <img :src="characterData.image" alt="">
                </div>
                <div class="column has-text-left">
                    <p class="is-size-4"><b>Status:</b> {{characterData.status}}</p>
                    <p class="is-size-4"><b>Gender:</b> {{characterData.gender}}</p>
                    <p class="is-size-4"><b>Origin:</b> {{characterData.origin.name}}</p>
                    <p class="is-size-4"><b>Species:</b> {{characterData.species}}</p>
                </div>
            </div>
            <p class="title is-4 has-text-left">Episodios donde aparecio</p>
            <div class="columns is-multiline is-mobile" v-if="episodes.length">
                <div class="column is-4-tablet is-4-desktop border-color p-2 m-3" 
                    :key="'e'+idx" v-for="(episode, idx) in episodes">
                    <h5>{{episode.name}}</h5><p>{{episode.air_date}}</p>  
                </div>
            </div>
            <router-link to="/" class="card-footer-item">Return Home</router-link>
        </div>
    </div>

</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import axios from 'axios'

@Component
export default class Character extends Vue {
    @Prop() private characterData: any;

    episodes: any = [];

    @Watch('characterData')
    onCharacterDataChanged(value: any) {
        if ( value ) {
            value.episode.forEach( async (route: any) => {
                await axios.get(route)
                .then( (res) => {
                    this.episodes.push(res.data)
                });
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.border-color {
    border: 1px solid #444;
}
</style>