<template>
    <div>
        <section class="section p-0">
            <div class="container">
                <div class="columns is-multiline is-mobile is-centered">
                    <div class="column is-4-tablet is-4-desktop" 
                        :key="'c'+idx" v-for="(character, idx) in characterList">
                        <a :href="'/detail?id='+character.id" class="card-footer-item">
                            <div class="card is-flex-wrap-wrap">
                                <div class="card-image">
                                    <figure class="image is-4by3">
                                        <img :src="character.image" alt="Placeholder image">
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <div class="media">
                                        <div class="media-left">
                                            <p class="title is-6"> {{character.name}} </p>
                                        </div>
                                    </div>

                                    <div class="content has-text-left">
                                        <b> Estado: </b>{{character.status}} <br>
                                        <b> Origen: </b>{{character.status}}
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Characters extends Vue {
    @Prop() private characterList: any;
}
</script>
