import { WebClientService } from "./web-client/creator/WebClientService";

export class FooService {
  constructor(private readonly webClientService: WebClientService) {}

  async getName(url: string) {
    return await this.webClientService
      .create()
      .get()
      .url(url)
      .retrieve()
      .then((response) => response.toEntity(FooDto));
  }
}
class FooDto {
  name: string;
}
