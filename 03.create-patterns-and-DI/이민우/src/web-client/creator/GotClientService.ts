import { WebClientService } from "./WebClientService";
import { WebClient } from "../WebClient";
import { GotClient } from "../GotClient";

export class GotClientService extends WebClientService {
  create(url?: string): WebClient {
    return new GotClient(url);
  }
}
