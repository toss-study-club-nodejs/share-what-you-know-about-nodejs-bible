import { WebClient } from "../WebClient";

export abstract class WebClientService {
  abstract create(url?: string): WebClient;
}
