import { WebClient } from "./http/WebClient";

export abstract class WebClientService {
  abstract create(url?: string): WebClient;
}
