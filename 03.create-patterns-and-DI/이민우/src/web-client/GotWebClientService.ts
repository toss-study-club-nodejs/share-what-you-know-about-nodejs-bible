import { WebClientService } from "./WebClientService";
import { WebClient } from "./http/WebClient";
import { GotClient } from "./http/GotClient";

export class GotWebClientService extends WebClientService {
  create(url?: string): WebClient {
    return new GotClient(url);
  }
}
