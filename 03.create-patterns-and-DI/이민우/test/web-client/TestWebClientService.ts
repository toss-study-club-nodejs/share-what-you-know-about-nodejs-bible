
import { StubWebClient } from './StubWebClient';
import { WebClient } from "../../src/web-client/http/WebClient";
import { WebClientService } from "../../src/web-client/WebClientService";

export class TestWebClientService extends WebClientService {
  create(url?: string): WebClient {
    return StubWebClient.getInstance(url);
  }
}
