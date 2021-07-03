import http from "./HttpRequest";

class RmCharacterDataService {

  findById(id: string) {
    return http.get(`/character/${id}`);
  }

  getAll() {
    return http.get('/character');
  }

  getPage(page: number) {
    return http.get(`/character?page=${page}`);
  }

  findByNameOrStatusOrGender(data: any) { 
    let params = new URLSearchParams(data);
    let route = `/character?${params.toString()}`
    
    return http.get(route);
  }
}

export default new RmCharacterDataService();