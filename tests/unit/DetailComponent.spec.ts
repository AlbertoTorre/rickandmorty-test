import { shallowMount } from "@vue/test-utils";
import Detail from "@/views/Detail.vue";

describe("Detail.vue", () => {
  
  const $route = {
    path: '/detail?id=8',
    query:{ id: 8 }
  }

  const character = {
    name: "Adjudicator Rick",
    status:"Dead",
    species:"Human",
    type:"",
    gender:"Male",
    origin:{"name":"unknown","url":""},
    location:{"name":"Citadel of Ricks","url":"https://rickandmortyapi.com/api/location/3"},
    image:"https://rickandmortyapi.com/api/character/avatar/8.jpeg",
    episode:["https://rickandmortyapi.com/api/episode/28"],
    url:"https://rickandmortyapi.com/api/character/8",
    created:"2017-11-04T20:03:34.737Z"
  };

  const wrapper = shallowMount(Detail,{
    propsData:{
      characterData: character
    },
    mocks: {
      $route
    }
  });

  const text = wrapper.find('p')

  it("renders name panel static", () => {
    expect(text.text()).toMatch('Rick And Morty');
  });

  it("Load var characterData", () => {
    expect( wrapper.vm.$data.characterData ).toHaveLength;
  });

  it("The change of the $route has an id parameter equal to 8", () => {
    expect( wrapper.vm.$route.query.id ).toEqual(8);
  });
});
